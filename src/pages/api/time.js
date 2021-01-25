export default function (_, res) {
  console.log({
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    customVar: process.env.customVar
  })
  return res.send(Date.now())
}
