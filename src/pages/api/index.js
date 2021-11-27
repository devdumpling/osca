import { getSession } from 'next-auth/react'

export default async (req, res) => {
  // Get session from cookies!
  let session = await getSession({ req })
  if (session) {
    // Signed in
    const { user } = session

    // Check lottery qualification based on email
    const domain = user.email.split('@')[1]
    if (domain === 'gmail.com') {
      session = { ...session, lottery: { qualification: true } }
    }
    res.json(session)
  } else {
    // Not Signed in
    res.status(401).json({ error: 'Not authorized' })
  }
  res.end()
}
