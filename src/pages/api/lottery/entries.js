import { getSession } from 'next-auth/client'
import faunadb, { query as q } from 'faunadb'
import { userQualifies } from '../../../utils'

const { FAUNADB_SECRET: secret } = process.env

// Cache fauna client
let client

if (secret) {
  client = new faunadb.Client({ secret })
}

export default async (req, res) => {
  // try {
  // Get user session
  const session = await getSession({ req })

  if (session) {
    if (!client) {
      return res.status(500).json({ error: new Error('Failed to connect to database :(') })
    }

    const lotteryId = req.query.lotteryId ? req.query.lotteryId.toLowerCase() : undefined
    const email = req.query.email ? req.query.email.toLowerCase().replace(/ /g, '+') : undefined

    console.log(`lotteryId = ${lotteryId}`)
    console.log(`email = ${email}`)

    let lotteryQuery
    if (email && lotteryId) {
      lotteryQuery = q.Intersection(
        q.Match(q.Index('entryByEmail'), email),
        q.Match(q.Index('entryByLotteryId'), lotteryId)
      )
    } else {
      if (email) {
        lotteryQuery = q.Match(q.Index('entryByEmail'), email)
      } else if (lotteryId) {
        lotteryQuery = q.Match(q.Index('entryByLotteryId'), lotteryId)
      } else {
        lotteryQuery = q.Documents(q.Collection('lottery-entries'))
      }
    }
    const { data } = await client.query(
      q.Map(
        q.Paginate(lotteryQuery),
        q.Lambda(x => q.Get(x))
      )
    )
    const entrants = data
      .map(x => x.data)
      .filter(userQualifies)

    res.status(200).json({ entrants })
  } else {
    res.status(401).json({ error: 'Not authorized' })
  }
  // } catch (error) {
  //   res.status(500).json({ error })
  // }
}
