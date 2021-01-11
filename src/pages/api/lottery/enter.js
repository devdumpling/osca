import { getSession } from 'next-auth/client'
import faunadb, { query as q } from 'faunadb'
import { hash, userQualifies, currentLotteryId } from '../../../utils'

const { FAUNADB_SECRET: secret } = process.env

// Cache fauna client
let client

if (secret) {
  client = new faunadb.Client({ secret })
}

export default async (req, res) => {
  let session
  try {
    // Get user session
    session = await getSession({ req })
  } catch (error) { 
    return res.status(500).json({ error }) 
  }

  if (session) {
    if (!client) {
      return res.status(500).json({ error: new Error('Failed to connect to database :(') })
    }
    const user = session.user
    const email = user.email
    const lotteryId = (req.query.lotteryId || currentLotteryId).toLowerCase()

    if (userQualifies(user)) {
      let data = {
        email,
        lotteryId
      }
      const entryId = hash(data)
      data = { ...data, entryId }

      let result
      try {
        result = await client.query(
          q.Create(q.Collection('lottery-entries'), { data })
        )
        res.status(200).json({ entry: result.data })
      } catch (error) {
        if (error.message === 'instance not unique') {
          res.status(200).json({ entry: data })
        } else {
          res.status(500).json({ error })
        }
      }
    } else {
      res.status(401).json({ error: 'Unqualified to enter lottery' })
    }
  } else {
    res.status(401).json({ error: 'Not authorized' })
  }
}
