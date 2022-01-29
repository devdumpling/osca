// Configure subdomains for branches, if different
const subdomains = {
  development: "dev",
};

// This configuration does THREE separate things:

// 1. Set branch-specific environment variable overrides
// Example: if on the development branch, NEXT_PUBLIC_URL_DEVELOPMENT overrides NEXT_PUBLIC_URL
const withBranchEnv = require("next-branch-env")({
  verbose: true,
  branch: "dev",
  expose: "BRANCH",
  publicPrefix: "NEXTAUTH_",
});
const branch = process.env.BRANCH;

// 2. Two options for dealing setting a branch-dependent NEXTAUTH_URL variable for Vercel deployments:
//    (1) Define NEXTAUTH_URL_{BRANCH} for each branch explicitly in Vercel
//    (2) Define NEXT_PUBLIC_HOST once (e.g. 'osca.coop', but not 'dev.osca.coop')
// If option (2), then below we set NEXTAUTH_URL={protocol}://{branch}.{host}
if (!process.env.NEXTAUTH_URL) {
  // Be sure to set NEXT_PUBLIC_HOST to root host (e.g. 'osca.coop' but not 'dev.osca.coop')
  const PROTOCOL = process.env.PROTOCOL || "https"; // set to http if on localhost!
  const VERCEL_HOST = process.env.VERCEL_URL
    ? new URL(`https://${process.env.VERCEL_URL}`).host
    : undefined;
  const HOST =
    process.env.NEXT_PUBLIC_HOST ||
    VERCEL_HOST ||
    `localhost:${process.env.PORT || "3000"}`;

  // Set Auth URL based on branch
  if (branch === "main" || !branch) {
    process.env.NEXTAUTH_URL = `${PROTOCOL}://${HOST}/api/auth/`;
  } else {
    process.env.NEXTAUTH_URL = `${PROTOCOL}://${subdomain(
      branch
    )}.${HOST}/api/auth/`;
  }
}

// 3. Set base branch for CMS to current deployment branch, if not set. Otherwise, falls back to 'development'.
if (!process.env.NEXT_PUBLIC_BASE_BRANCH) {
  process.env.NEXT_PUBLIC_BASE_BRANCH = process.env.BRANCH || "development";
}

module.exports = withBranchEnv({
  env: {
    // needed to expose NEXTAUTH_URL on e.g. /api/time
    // but this does not make it available in the next-auth module, specifically on Vercel deployments for some reason
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  },
});

function subdomain(branch) {
  return subdomains[branch] || branch;
}

// Domains for image exports
module.exports = {
  images: {
    domains: ["localhost"],
  },
};
