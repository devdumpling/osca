import { Firestore } from '@google-cloud/firestore'

const { GCLOUD_CREDENTIALS } = process.env
const credentials = JSON.parse(Buffer.from(GCLOUD_CREDENTIALS || '', 'base64').toString())
const firestore = new Firestore({
  projectId: credentials.project_id,
  credentials
})
const lotteriesRef = firestore.collection('lotteries')

export default async (req, res) => {
  let query = lotteriesRef
  const id = req.query.id || req.query.lotteryId
  if (id) {
    const lotteryRef = await query.doc(id).get()
    if (!lotteryRef.exists) {
      return res.status(200).json([])
    } else {
      return res.status(200).json([parseDoc(lotteryRef)])
    }
  }
  Object.keys(req.query).forEach(field => {
    query = query.where(field, '==', req.query[field])
  })
  const snapshot = await query.get()
  const lotteries = snapshot.docs.map(parseDoc)
  return res.status(200).json(lotteries)
}

function parseDoc (doc) {
  return {
    ...Object.entries(doc.data()).reduce((prev, [key, value]) => ({ ...prev, [key]: parseValue(value, key) }), {}),
    lotteryId: doc.id,
    now: Date.now()
  }
}

function parseValue (value, key) {
  if (value.toMillis) {
    return value.toMillis() // convert to unix timestamp
  }
  return value
}