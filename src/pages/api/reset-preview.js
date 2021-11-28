// TODO -- see if things work with this deleted... i think this was tina?

export default async function handler(req, res)  {
  res.clearPreviewData()
  res.status(200).end()
}
