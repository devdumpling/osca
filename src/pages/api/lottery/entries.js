import { getSession } from 'next-auth/client'
import { Firestore } from '@google-cloud/firestore'

const { GCLOUD_CREDENTIALS } = process.env
const credentials = JSON.parse(Buffer.from(GCLOUD_CREDENTIALS || '', 'base64').toString())
const firestore = new Firestore({
  projectId: credentials.project_id,
  credentials
})
const entriesRef = firestore.collection('lottery-entries')

const authlist = [
  'luke@starter.org',
  'devon.wells.a@gmail.com'
]

function authorized (session, req) {
  const email = req.query.email ? req.query.email.toLowerCase().replace(/ /g, '+') : undefined
  return session &&
         session.user &&
         (authlist.indexOf(session.user.email) >= 0 || session.user.email === email)
}

export default async (req, res) => {
  let session
  try {
    // Get user session
    session = await getSession({ req })
  } catch (error) {
    return res.status(500).json({
      error: `Could not get user session: ${error}`
    })
  }

  if (authorized(session, req)) {
    let query = entriesRef
    const id = req.query.id || req.query.entryId
    if (id) {
      const entryRef = await query.doc(id).get()
      if (!entryRef.exists) {
        return res.status(200).json({})
      } else {
        return res.status(200).json([parseDoc(entryRef)])
      }
    }
    Object.keys(req.query).forEach(field => {
      query = query.where(field, '==', req.query[field])
    })
    const snapshot = await query.get()
    const entrants = snapshot.docs.map(doc => ({
      ...doc.data(),
      entryId: doc.id
    }))
    res.status(200).json(entrants)
  } else {
    res.status(401).json({
      error: 'Not authorized'
    })
  }
}
