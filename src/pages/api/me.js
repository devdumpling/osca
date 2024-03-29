import { getSession } from 'next-auth/react'
import { Firestore } from '@google-cloud/firestore'
import { credentials } from '../../utils'

const firestore = new Firestore({
  projectId: credentials.project_id,
  credentials
})
const permissionsRef = firestore.collection('user-permissions')

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

  if (session && session.user) {
    const userRef = await permissionsRef.doc(session.user.email).get()
    if (userRef.exists) {
      const permissions = userRef.data()
      return res.status(200).json(permissions)
    }

    return res.status(200).json({})
  } else {
    return res.status(401).json({ error: 'Not logged in' })
  }
}