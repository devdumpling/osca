import dynamic from 'next/dynamic'
// import NextAuth from 'next-auth'
// import Providers from 'next-auth/providers'

let NextAuth
let Providers
let auth0

console.log({
  NEXTAUTH_URL: process.env.NEXTAUTH_URL
})

export default async (req, res) => {
  console.log({
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    req: true
  })
  if (!NextAuth || !auth0) {
    import('next-auth').then(n => {
      NextAuth = n.default

      import('next-auth/providers').then(p => {
        Providers = p.default

        auth0 = Providers.Auth0({
          clientId: process.env.AUTH0_CLIENT_ID,
          clientSecret: process.env.AUTH0_CLIENT_SECRET,
          domain: process.env.AUTH0_DOMAIN
        })
        
        // show login prompt if logged out.
        // by default, auth0 reauthenticates the most recent session, which is either convenient or annoying.
        auth0.authorizationUrl = auth0.authorizationUrl += '&prompt=login'

        console.log({
          NEXTAUTH_URL: process.env.NEXTAUTH_URL,
          dynamic: true
        })
  
        NextAuth(req, res, { 
          providers: [ auth0 ]
        })
      }).catch(err => console.error('error Providers', err))
    }).catch(err => console.error('error NextAuth', err))
  } else {
    return NextAuth(req, res, { 
      providers: [ auth0 ]
    })
  }
}