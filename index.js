const fs = require('fs')
const http = require('http')
let portNum = 8080
const typeEquiv = {
  'favicon': 'image/ico',
  'style' : 'text/css',
  'script': 'text/javascript',
  'page': 'text/html'
}
const resourceDirectory = './pageResources/'
const htmlDirectory = resourceDirectory+'pages/'
const styleDirectory = resourceDirectory+'styles/'
const scriptDirectory = resourceDirectory+'scripts/'
const faviconDirectory = resourceDirectory+'others/'
http.createServer((req, res) => {
  let url = req.url.split('/')
  if (url[1] == 'keepalive') {
    res.statusCode = 200
    res.end('I\'m alive!')
    console.log('Got pinged so I ponged!')
    return
  }
  url = url.slice(url.length-2)
  let type = 'text/plain'
  let location = htmlDirectory+'index.html'
  switch (url[0]) {
    case '':
      if (url[1] == 'favicon') {
        type = typeEquiv.favicon
        location = faviconDirectory+'favicon.ico'
      } else {
        type = typeEquiv.page
        location = htmlDirectory+'index.html'
      }
      break
    case 'styles':
      type = typeEquiv.style
      location = styleDirectory+url[1]+'.css'
      break
    case 'distributions':
      type = typeEquiv.page
      location = htmlDirectory+url[1]+'.html'
      break
    case 'scripts':
      type = typeEquiv.script
      location = scriptDirectory+url[1]+'.js'
      break
    default:
      type = 'text/plain'
      location = htmlDirectory+'index.html'
      break
  }
  res.writeHead(200, {'Content-Type': type})
  fs.createReadStream(location).pipe(res)
    .once('finish', res.end)
    .on('error', console.log)
}).listen(portNum, () => {
  console.log(`Listening on port ${portNum}`)
})