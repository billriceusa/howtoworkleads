// Drive headless Chrome via CDP (no deps) to open the Resources hover menu and screenshot it.
import { spawn } from 'child_process'
import fs from 'fs'

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const URL = process.argv[2] || 'https://howtoworkleads.com/'
const OUT = process.argv[3] || '/tmp/resources-menu.png'
const PORT = 9223

const sleep = (ms) => new Promise(r => setTimeout(r, ms))

const chrome = spawn(CHROME, [
  '--headless=new', '--disable-gpu', '--no-sandbox', '--hide-scrollbars',
  `--remote-debugging-port=${PORT}`, '--window-size=1440,1000',
  '--force-device-scale-factor=2', 'about:blank',
])
chrome.on('error', e => { console.error('chrome spawn error', e); process.exit(1) })

async function getWs() {
  for (let i = 0; i < 40; i++) {
    try {
      const r = await fetch(`http://localhost:${PORT}/json`)
      const targets = await r.json()
      const page = targets.find(t => t.type === 'page')
      if (page?.webSocketDebuggerUrl) return page.webSocketDebuggerUrl
    } catch {}
    await sleep(250)
  }
  throw new Error('no CDP page target')
}

async function main() {
  const wsUrl = await getWs()
  const ws = new WebSocket(wsUrl)
  await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej })

  let id = 0
  const pending = new Map()
  const events = []
  ws.onmessage = (m) => {
    const msg = JSON.parse(m.data)
    if (msg.id && pending.has(msg.id)) { pending.get(msg.id)(msg); pending.delete(msg.id) }
    else if (msg.method) events.push(msg)
  }
  const send = (method, params = {}) => new Promise((res) => { const i = ++id; pending.set(i, res); ws.send(JSON.stringify({ id: i, method, params })) })
  const waitEvent = async (method, ms = 15000) => {
    const t0 = Date.now()
    while (Date.now() - t0 < ms) { const e = events.find(e => e.method === method); if (e) return e; await sleep(100) }
    return null
  }

  await send('Page.enable')
  await send('Runtime.enable')
  await send('Page.navigate', { url: URL })
  await waitEvent('Page.loadEventFired')
  await sleep(2500) // hydrate

  // Hover the Resources nav trigger -> React onMouseEnter opens the dropdown
  const hover = await send('Runtime.evaluate', {
    returnByValue: true,
    expression: `(() => {
      const links = [...document.querySelectorAll('header a, nav a')];
      const t = links.find(a => a.getAttribute('href') === '/resources' && /resources/i.test(a.textContent));
      if (!t) return { ok:false, reason:'trigger not found' };
      const wrap = t.closest('div') || t.parentElement;
      const fire = (el, type) => el && el.dispatchEvent(new MouseEvent(type, { bubbles:true, cancelable:true, view:window }));
      [t, wrap].forEach(el => { fire(el,'mouseover'); fire(el,'mouseenter'); fire(el,'mousemove'); });
      const r = t.getBoundingClientRect();
      return { ok:true, x:r.x, y:r.y };
    })()`,
  })
  await sleep(700)

  const shot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false })
  if (!shot.result?.data) throw new Error('no screenshot data')
  fs.writeFileSync(OUT, Buffer.from(shot.result.data, 'base64'))
  console.log('hover:', JSON.stringify(hover.result?.value), '-> wrote', OUT, fs.statSync(OUT).size, 'bytes')
  ws.close(); chrome.kill()
}
main().then(() => process.exit(0)).catch(e => { console.error('FAIL', e); chrome.kill(); process.exit(1) })
