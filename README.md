# OSCA

Work in Progress

## Configuration

#### Auth0

Setup Application in Auth0 as a Regular Web App (not Single Page App). Add the following environment variables for Auth0 to the Vercel project. These are only accessible to functions (not the the public facing client).

```
AUTH0_CLIENT_ID=
AUTH0_CLIENT_SECRET=
AUTH0_DOMAIN=
GCLOUD_CREDENTIALS= # Buffer.from(JSON.stringify(credentials)).toString('base64')
NEXTAUTH_URL=https://osca.coop # for live production site, when we're ready
```

#### Google oAuth

Create and configure a oAuth client in Google Cloud Platform, and setup in Auth0 settings.

#### Tina CMS

```
GITHUB_CLIENT_SECRET=
SIGNING_KEY= # for nextjs preview: `openssl rand -base64 32`
NEXT_PUBLIC_GITHUB_CLIENT_ID=
NEXT_PUBLIC_REPO_FULL_NAME=lukeburns/osca
NEXT_PUBLIC_BASE_BRANCH=main
```
