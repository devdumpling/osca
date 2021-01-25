const { GCLOUD_CREDENTIALS } = process.env
const gcc = JSON.parse(GCLOUD_CREDENTIALS || '[]')
const credentials = {
  type: 'service_account',
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  project_id: gcc[0],
  private_key_id: gcc[1],
  private_key: `-----BEGIN PRIVATE KEY-----\n${gcc[2]}\n-----END PRIVATE KEY-----\n`,
  client_email: gcc[3],
  client_id: gcc[4],
  client_x509_cert_url: gcc[5]
}

export {
  hash,
  credentials
}

// 53-bit hash used for unique entryId for a given email and lotteryId (e.g. Spring 2020)
// https://stackoverflow.com/a/52171480
function hash (str, seed = 0) {
  str = typeof str === 'string' ? str : JSON.stringify(str)
  let h1 = 0xdeadbeef ^ seed
  let h2 = 0x41c6ce57 ^ seed
  for (let i = 0, ch; i < str.length; i++) {
    ch = str.charCodeAt(i)
    h1 = Math.imul(h1 ^ ch, 2654435761)
    h2 = Math.imul(h2 ^ ch, 1597334677)
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909)
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909)
  return 4294967296 * (2097151 & h2) + (h1 >>> 0)
}
