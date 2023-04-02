const fs = require('fs')
const d = process.argv.slice(2).join(' ')

if (!fs.existsSync(d)) fs.mkdirSync(d)
const base = 'C:\\Users\\Alsto\\OneDrive\\Desktop\\Vault\\Coding\\javascript\\myDrawing\\base\\'

for (let f of fs.readdirSync(base)) {
	if (f == 'drawing.js') continue
	fs.createReadStream(base+f).pipe(fs.createWriteStream(d+'/'+f))
}