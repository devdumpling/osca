import { getSession } from 'next-auth/react'
import { Firestore } from '@google-cloud/firestore'
import { hash, credentials } from '../../../utils'

const firestore = new Firestore({
  projectId: credentials.project_id,
  credentials
})
const entriesRef = firestore.collection('lottery-entries')
const lotteriesRef = firestore.collection('lotteries')
const usersRef = firestore.collection('users')

function authorize (session) {
  return session
}

function qualified (userRef, lotteryRef) {
  return true
  // below checks user profile to see if they qualify
  // if (userRef.exists) {
  //   const userData = userRef.data()
  //   return userRef.exists && userData.tnumber && userData.year
  // } else {
  //   return false
  // }
}

export default async (req, res) => {
  const timestamp = Date.now()

  let session
  try {
    // Get user session
    session = await getSession({ req })
  } catch (error) {
    return res.status(500).json({
      error: `Could not get user session: ${error}`
    })
  }

  if (authorize(session)) {
    const user = session.user
    const email = user.email

    const userRef = await usersRef.doc(email).get()
    const userData = userRef.exists ? userRef.data() : {}

    const lotteryId = req.query.id || req.query.lotteryId
    if (!lotteryId) {
      return res.status(422).json({
        error: 'Lottery ID not provided'
      })
    }

    const lotteryRef = await lotteriesRef.doc(lotteryId).get()
    if (!lotteryRef.exists) {
      return res.status(200).json({
        error: `Lottery with ID '${lotteryId}' does not exist`
      })
    }

    const lottery = lotteryRef.data()
    if (!lottery.active) {
      return res.status(200).json({
        error: `Lottery with ID '${lotteryId}' is not active`
      })
    }

    if (!qualified(userRef, lotteryRef)) {
      return res.status(422).json({
        error: `Not qualified to enter lottery ${lotteryId}`
      })
    }

    const deadline = lottery.end ? lottery.end.toMillis() : null
    if (lottery.end && timestamp > deadline) {
      return res.status(200).json({
        error: `Submission timestamp ${timestamp} later than deadline for '${lotteryId}' lottery: ${deadline}`
      })
    }

    const start = lottery.start ? lottery.start.toMillis() : null
    if (lottery.start && timestamp < start) {
      return res.status(200).json({
        error: `Submission timestamp ${timestamp} earlier than start time for '${lotteryId}' lottery: ${start.toMillis()}`
      })
    }

    const entryMetadata = JSON.parse(req.body || req.query.entryMetadata || '{}')
    const data = { email, lotteryId, entryMetadata, userData, timestamp }
    const entryId = hash(email + lotteryId).toString()
    try {
      await entriesRef.doc(entryId).set(data)
      res.status(200).json({
        ...data,
        entryId
      })
    } catch (error) {
      res.status(500).json({
        error: `Could not create entry: ${error}`
      })
    }
  } else {
    res.status(401).json({
      error: 'Not authorized'
    })
  }
}
