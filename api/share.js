require('isomorphic-fetch');

export default async function handler(req, res){
  let submission = await fetch(
    'https://airtable-forms-proxy.hackclub.dev/api/appkLNuFRfepUgABB/Submissions/',
    {
      method: 'POST',
      body: JSON.stringify(req.body),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    }
  )
  submission = await submission.json()
  console.log(submission)
  res.json(submission)
}