// Configure subdomains for branches, if different
const subdomains = {
  development: 'dev'
}

// This configuration does THREE separate things:

// 1. Set branch-specific environment variable overrides
// Example: if on the development branch, NEXT_PUBLIC_URL_DEVELOPMENT overrides NEXT_PUBLIC_URL
console.log(process.env.VERCEL_GITHUB_COMMIT_REF)
console.log(process.env)
const withBranchEnv = require('next-branch-env')({
  branch: process.env.VERCEL_GITHUB_COMMIT_REF
})
const branch = process.env.NEXT_PUBLIC_BRANCH
console.log(`branch=${branch}`)

// 2. Two options for dealing setting a branch-dependent NEXTAUTH_URL variable for Vercel deployments:
//    (1) Define NEXTAUTH_URL_{BRANCH} for each branch explicitly in Vercel
//    (2) Define NEXT_PUBLIC_HOST once (e.g. 'osca.coop', but not 'dev.osca.coop')
// If option (2), then below we set NEXTAUTH_URL={protocol}://{branch}.{host}
if (!process.env.NEXTAUTH_URL) {
  // Be sure to set NEXT_PUBLIC_HOST to root host (e.g. 'osca.coop' but not 'dev.osca.coop')
  const PROTOCOL = process.env.PROTOCOL || (branch ? 'https' : 'http') // assumes (1) no branch means localhost and (2) that there's no ssl in local dev environment, so probably better just to set PROTOCOL accordingly
  const VERCEL_HOST = process.env.VERCEL_URL ? (new URL(`https://${process.env.VERCEL_URL}`)).host : undefined
  const HOST = process.env.NEXT_PUBLIC_HOST || VERCEL_HOST || `localhost:${process.env.PORT || '3000'}`

  // Set Auth URL based on branch
  if (branch === 'main' || !branch) {
    process.env.NEXTAUTH_URL = `${PROTOCOL}://${HOST}`
  } else {
    process.env.NEXTAUTH_URL = `${PROTOCOL}://${subdomain(branch)}.${HOST}`
  }
}
console.log(`nextauthurl=${process.env.NEXTAUTH_URL}`)

// 3. Set base branch for CMS to current deployment branch, if not set. Otherwise, falls back to 'development'.
if (!process.env.NEXT_PUBLIC_BASE_BRANCH) {
  process.env.NEXT_PUBLIC_BASE_BRANCH = process.env.NEXT_PUBLIC_BRANCH || 'development'
}
console.log(`basebranch=${process.env.NEXT_PUBLIC_BASE_BRANCH}`)

module.exports = withBranchEnv()

function subdomain (branch) {
  return subdomains[branch] || branch
}
