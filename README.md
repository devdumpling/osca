# OSCA

Work in Progress

## Configuration

Set the root host for the Preview and Production Vercel environments. If in a local development environment (e.g. the Development Vercal environment), this should be set to e.g. localhost:3000. Currently, we assume that all branches are deployed as subdomains.

```
NEXT_PUBLIC_HOST=osca.coop 
```

If you need branch-specific environment variables for Vercel deployments, you can set overrides by appending `_{BRANCH}` in your Vercel environment configuration. For example, if you set `CLIENT_SECRET_DEVELOPMENT` in the Vercel dashboard, all deployments from the `development` branch can access it from `CLIENT_SECRET` from the server. Any existing `CLIENT_SECRET` variable is overwritten.

If you need a branch-specific _public_ environment variable, then just prepend with `NEXT_PUBLIC_` like usual (this is [Vercel's convention](https://nextjs.org/docs/basic-features/environment-variables#exposing-environment-variables-to-the-browser) for handling public and private environment variables). For example, `NEXT_PUBLIC_CLIENT_ID_DEVELOPMENT` will be available from the browser as `NEXT_PUBLIC_CLIENT_ID` in `development` deployments.

Note: make sure the 'Automatically expose System Environment Variables' option is checked in your Vercel project configuration, under Environment Variables.

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

It is stored as a JSON array, which can be obtained from the data in `credentials.json`.

```
GCLOUD_CREDENTIALS=["project_id","private_key*","client_email"]
```

* `private_key` should _not_ be wrapped by `-----BEGIN PRIVATE KEY-----\n` and `\n-----END PRIVATE KEY-----\n`

#### Tina CMS

```
SIGNING_KEY= # for nextjs preview: `openssl rand -base64 32`
GITHUB_CLIENT_SECRET{_ENV}=
NEXT_PUBLIC_GITHUB_CLIENT_ID{_ENV}=
NEXT_PUBLIC_REPO_FULL_NAME=lukeburns/osca
NEXT_PUBLIC_BASE_BRANCH=main
```

where `_ENV = '' || '_DEVELOPMENT' || '_STAGING' || '_LOCAL`. Unforunately, Github requires a separate oAuth client for each redirect url, which requires environment variables for each