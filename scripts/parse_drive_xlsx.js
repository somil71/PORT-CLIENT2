const xlsx = require('xlsx')
const fs = require('fs')
const path = require('path')

const input = path.resolve(__dirname, '../Drive File Links Export.xlsx')
const out = path.resolve(__dirname, '../tmp/drive_rows.json')

if (!fs.existsSync(input)) {
  console.error('Input XLSX not found:', input)
  process.exit(1)
}

const wb = xlsx.readFile(input)
console.log('Sheets:', wb.SheetNames)

let rows = []
for (const name of wb.SheetNames) {
  const sheet = wb.Sheets[name]
  const sheetRows = xlsx.utils.sheet_to_json(sheet, { defval: null })
  console.log(' -', name, 'rows:', sheetRows.length)
  rows = rows.concat(sheetRows)
}

fs.mkdirSync(path.dirname(out), { recursive: true })
fs.writeFileSync(out, JSON.stringify(rows, null, 2))
console.log('Wrote', rows.length, 'rows to', out)
