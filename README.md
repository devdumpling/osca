# OSCA

Work in Progress

## Configuration

#### Auth0

Setup Application in Auth0 as a Regular Web App (not Single Page App). Add the following environment variables for Auth0 to the Vercel project. These are only accessible to functions (not the the public facing client).

Configuration for Auth0 application:

```
Application Login URI: https://osca.coop
Allowed Callback URLs: https://osca.coop/api/auth/callback/auth0, http://localhost:3000/api/auth/callback/auth0
Allowed Logout URLs: https://osca.coop, http://localhost:3000
Allowed Web Origins: https://osca.coop, http://localhost:3000
```

Vercel environment configuration:

```
AUTH0_CLIENT_ID=
AUTH0_CLIENT_SECRET=
AUTH0_DOMAIN=
NEXTAUTH_URL=https://osca.coop # for live production site, when we're ready
```

#### Google oAuth

Create and configure an oAuth client in Google Cloud Platform.

Google oAuth Client configuration:

```
Authorized Javascript Origins: https://osca-coop.auth0.com
Authorized Redirect Origins: https://osca-coop.auth0.com/login/callback
```

Add Google oAuth client id and secret to connection in the Auth0 dashboard.

#### Google Firebase (Firestore)

Create a Firebase project (or add Firebase to existing GCP project). Enable Firestore. Go to Settings -> Service Accounts and click Generate new private key. This will save a JSON file, let's call it `credentials.json` for convenience.

In NodeJS, run the following:

```js
Buffer.from(JSON.stringify(require('./credentials.json')).toString('base64')
```

And add the (rather long) string to the Vecel environment configuration:

```
GCLOUD_CREDENTIALS=
```

#### Tina CMS

```
GITHUB_CLIENT_SECRET=
SIGNING_KEY= # for nextjs preview: `openssl rand -base64 32`
NEXT_PUBLIC_GITHUB_CLIENT_ID=
NEXT_PUBLIC_REPO_FULL_NAME=lukeburns/osca
NEXT_PUBLIC_BASE_BRANCH=main
```
