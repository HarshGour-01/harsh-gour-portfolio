import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { createReadStream } from 'node:fs'
import { extname, join, normalize } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(fileURLToPath(new URL('.', import.meta.url)), 'dist')
const port = Number(process.env.PORT || 3000)
const mime = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.svg': 'image/svg+xml', '.json': 'application/json; charset=utf-8', '.ico': 'image/x-icon', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp' }

function json(response, status, body) { response.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' }); response.end(JSON.stringify(body)) }
function readBody(request) { return new Promise((resolve, reject) => { let data = ''; request.on('data', (chunk) => { data += chunk; if (data.length > 100_000) reject(new Error('Payload too large')) }); request.on('end', () => resolve(data)); request.on('error', reject) }) }

const server = createServer(async (request, response) => {
  const url = new URL(request.url || '/', `http://${request.headers.host || 'localhost'}`)
  if (url.pathname === '/health') return json(response, 200, { ok: true })
  if (url.pathname === '/api/contact' && request.method === 'POST') {
    try {
      const body = JSON.parse(await readBody(request))
      const valid = body && typeof body.name === 'string' && typeof body.email === 'string' && typeof body.subject === 'string' && typeof body.message === 'string' && body.name.trim() && body.subject.trim() && body.message.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)
      if (!valid) return json(response, 400, { message: 'Please provide a valid name, email, subject and message.' })
      if (!process.env.CONTACT_ENDPOINT) return json(response, 501, { message: 'Contact delivery is not configured yet. Please connect a real endpoint before sending.' })
      const upstream = await fetch(process.env.CONTACT_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: body.name.trim(), email: body.email.trim(), subject: body.subject.trim(), message: body.message.trim() }) })
      if (!upstream.ok) return json(response, 502, { message: 'The delivery service did not accept the message.' })
      return json(response, 200, { ok: true })
    } catch { return json(response, 400, { message: 'The message could not be read. Please try again.' }) }
  }
  if (request.method !== 'GET' && request.method !== 'HEAD') return json(response, 405, { message: 'Method not allowed' })
  const safePath = normalize(url.pathname).replace(/^\.\.(\/|\\|$)/, '')
  let filePath = join(root, safePath === '/' ? 'index.html' : safePath)
  try { const file = await stat(filePath); if (file.isDirectory()) filePath = join(filePath, 'index.html'); await stat(filePath) } catch { filePath = join(root, 'index.html') }
  response.writeHead(200, { 'Content-Type': mime[extname(filePath)] || 'application/octet-stream', 'Cache-Control': extname(filePath) === '.html' ? 'no-cache' : 'public, max-age=31536000' })
  createReadStream(filePath).pipe(response)
})
server.listen(port, '0.0.0.0', () => console.log(`Harsh Gour portfolio listening on ${port}`))
