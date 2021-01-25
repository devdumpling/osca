const nextEnv = require('next-env')

// Configure subdomains for branches, if different
const subdomains = {
  development: 'dev'
}

const withNextEnv = nextEnv({ serverPrefix: '' }) // match prefix convention as vercel for compatibility

// This configuration does THREE separate things:

// 1. Set branch-specific environment variable overrides
// Example: if on the development branch, NEXT_PUBLIC_URL_DEVELOPMENT overrides NEXT_PUBLIC_URL
const branch = process.env.VERCEL_GITHUB_COMMIT_REF || 'local'
if (branch) {
  console.log(`${branch}: Processing '${branch}' branch overrides...`)
  if (branch == 'local') {
    console.log(`${branch}: Not on Vercel deployment, so you must be local. Branch is considered 'local' for overrides, but you probably won't need this unless it helps you stay organized.`)
  }
  const BRANCH = branch.toUpperCase()
  Object.entries(process.env).map(([key, val]) => {
    let _key
    if (key.indexOf(`_${BRANCH}`) > -1 && key.indexOf(`_${BRANCH}`) === key.length - `_${BRANCH}`.length) {
      _key = key.slice(0, key.indexOf(`_${BRANCH}`))
      process.env[_key] = val
      console.log(`${key} -> ${_key}`)
    }
  })
}

// 2. Two options for dealing setting a branch-dependent NEXTAUTH_URL variable for Vercel deployments:
//    (1) Define NEXTAUTH_URL_{BRANCH} for each branch explicitly in Vercel
//    (2) Define NEXT_PUBLIC_HOST once (e.g. 'osca.coop', but not 'dev.osca.coop')
// If option (2), then below we set NEXTAUTH_URL={protocol}://{branch}.{host}
if (!process.env.NEXTAUTH_URL) {
  // Be sure to set NEXT_PUBLIC_HOST to root host (e.g. 'osca.coop' but not 'dev.osca.coop')
  const VERCEL_HOST = process.env.VERCEL_URL ? (new URL(process.env.VERCEL_URL)).host : undefined
  const HOST = process.env.NEXT_PUBLIC_HOST || VERCEL_HOST || `localhost:${process.env.PORT || '3000'}`
  const PROTOCOL = process.env.PROTOCOL || (branch === 'local' ? 'http' : 'https') // assumes no ssl in local dev environment

  // Set Auth URL based on branch
  if (branch === 'main' || branch === 'local') {
    process.env.NEXTAUTH_URL = `${PROTOCOL}://${HOST}`
  } else {
    process.env.NEXTAUTH_URL = `${PROTOCOL}://${subdomain(branch)}.${HOST}`
  }
}

// 3. Set base branch for CMS to current deployment branch, if not set. Otherwise, falls back to 'development'.
if (!process.env.NEXT_PUBLIC_BASE_BRANCH) {
  process.env.NEXT_PUBLIC_BASE_BRANCH = process.env.VERCEL_GITHUB_COMMIT_REF || 'development'
}

module.exports = withNextEnv()

function subdomain (branch) {
  return subdomains[branch] || branch
}
