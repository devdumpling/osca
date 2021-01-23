import { getSession } from 'next-auth/client'
import { Firestore } from '@google-cloud/firestore'
import { userQualifies } from '../../../utils'

const { GCLOUD_CREDENTIALS } = process.env
const credentials = JSON.parse(Buffer.from(GCLOUD_CREDENTIALS || '', 'base64').toString())
const firestore = new Firestore({
  projectId: credentials.project_id,
  credentials
})
const entries = firestore.collection('lottery-entries')

export default async (req, res) => {
  let session
  try {
    // Get user session
    session = await getSession({ req })
  } catch (error) {
    return res.status(500).json({ error: `Could not get user session: ${error}` }) 
  }

  if (session) {
    const lotteryId = req.query.lotteryId ? req.query.lotteryId.toLowerCase() : undefined
    const email = req.query.email ? req.query.email.toLowerCase().replace(/ /g, '+') : undefined

    let query = entries
    if (email) {
      query = query.where('email', '==', email)
    }
    if (lotteryId) {
      query = query.where('lotteryId', '==', lotteryId)
    }
    const snapshot = await query.get()
    const entrants = snapshot.docs
      .map(doc => ({ ...doc.data(), entryId: doc.id }))
      .filter(userQualifies)
    res.status(200).json(entrants)
  } else {
    res.status(401).json({ error: 'Not authorized' })
  }
}
