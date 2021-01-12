import { getSession } from 'next-auth/client'
import { Firestore } from '@google-cloud/firestore'
import { hash, userQualifies, currentLotteryId } from '../../../utils'

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
    const user = session.user
    const email = user.email
    const lotteryId = (req.query.lotteryId || currentLotteryId).toLowerCase()
    const entryMetadata = JSON.parse(req.body || req.query.entryMetadata || '{}')

    if (userQualifies(user)) {
      try {
        const data = { email, lotteryId, entryMetadata }
        const entryId = hash(email + lotteryId).toString()
        await entries.doc(entryId).set(data)
        res.status(200).json({ ...data, entryId })
      } catch (error) {
        res.status(500).json({ error: `Could not create entry: ${error}` })
      }
    } else {
      res.status(401).json({ error: 'Unqualified to enter lottery' })
    }
  } else {
    res.status(401).json({ error: 'Not authorized' })
  }
}
