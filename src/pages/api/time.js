export default function (_, res) {
  console.log(`3 NEXTAUTH_URL=${process.env.NEXTAUTH_URL}`)
  return res.send(Date.now())
}
