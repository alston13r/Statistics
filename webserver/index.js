const fs = require('fs')
const http = require('http')
let portNum = 8080
http.createServer((req, res) => {
  let fileName = req.url
  let accept = req.headers.accept
  switch (fileName) {
    case '/':
      res.writeHead(200, {'Content-Type': 'text/html'})
      fs.createReadStream('../pages/home/index.html').pipe(res).once('finish', res.end).on('error', console.log)
      break
    case '/favicon.ico':
      res.writeHead(200, {'Content-Type': 'image/ico'})
      fs.createReadStream('./favicon.ico').pipe(res).once('finish', res.end).on('error', console.log)
      break
    case '/keepAlive':
      res.statusCode = 200
      res.end('I\'m alive')
      break
    default:
      let type = accept.split(',')[0]
      console.log(type, fileName)
      res.writeHead(200, {'Content-Type': type})
      fs.createReadStream('..'+fileName, 'utf8').pipe(res).once('finish', res.end).on('error', console.log)
      break
  }
}).listen(portNum, () => {
  console.log(`Listening on port ${portNum}`)
})