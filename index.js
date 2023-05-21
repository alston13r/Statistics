const fs = require('fs')
const http = require('http')
let portNum = 8080
let usables = []
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
for (let d of [htmlDirectory, styleDirectory, scriptDirectory, faviconDirectory]) {
  fs.readdir(d, (err, files) => {
    if (err) throw err
    usables.push(...files.map(x => x = d+x))
  })
}
http.createServer((req, res) => {
  let url = req.url.split('/')
  if (url[1] == 'keepalive') {
    res.statusCode = 200
    res.end('I\'m alive!')
    console.log('Got pinged so I ponged!')
    return
  }
  url = url.slice(url.length-2)
  let type = typeEquiv.html
  let location = htmlDirectory+'index.html'
  switch (url[0]) {
    case '':
      type = typeEquiv.page
      location = htmlDirectory+'index.html'
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
    case 'others':
      if (url[1] == 'favicon') {
        type = typeEquiv.favicon
        location = faviconDirectory+'favicon.ico'
      }
      break
    default:
      res.statusCode = 404
      fs.createReadStream(htmlDirectory+'error.html').pipe(res)
        .once('finish', res.end)
        .on('error', console.log)
      return
  }
  res.writeHead(200, {'Content-Type': type})
  if (usables.indexOf(location) != -1) {
    fs.createReadStream(location).pipe(res)
      .once('finish', res.end)
      .on('error', console.log)
  } else {
    fs.createReadStream(htmlDirectory+'error.html').pipe(res)
      .once('finish', res.end)
      .on('error', console.log)
  }
}).listen(portNum, () => {
  console.log(`Listening on port ${portNum}`)
})