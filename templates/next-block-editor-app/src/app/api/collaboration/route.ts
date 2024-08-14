import jsonwebtoken from 'jsonwebtoken'

const defaultToken = 'NONE_PROVIDED'
const JWT_SECRET = process.env?.TIPTAP_COLLAB_SECRET ?? defaultToken

export async function POST(): Promise<Response> {
  if (JWT_SECRET === defaultToken) {
    return new Response(JSON.stringify({ token: defaultToken }))
  }
  const jwt = await jsonwebtoken.sign(
    {
      /* object to be encoded in the JWT */
    },
    JWT_SECRET,
  )

  return new Response(JSON.stringify({ token: jwt }))
}
