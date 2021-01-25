import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

const auth0 = Providers.Auth0({
  clientId: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  domain: process.env.AUTH0_DOMAIN
})

// show login prompt if logged out.
// by default, auth0 reauthenticates the most recent session, which is either convenient or annoying.
auth0.authorizationUrl = auth0.authorizationUrl += '&prompt=login'

export default async (req, res) => {
  console.log({
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    customVar: process.env.customVar
  })
  return NextAuth(req, res, { 
    providers: [ auth0 ]
  })
}