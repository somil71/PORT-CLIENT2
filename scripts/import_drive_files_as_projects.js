const fs = require('fs')
const path = require('path')

const rowsPath = path.resolve(__dirname, '../tmp/drive_rows.json')
const contentPath = path.resolve(__dirname, '../lib/content.json')

if (!fs.existsSync(rowsPath)) {
  console.error('drive rows not found:', rowsPath)
  process.exit(1)
}
if (!fs.existsSync(contentPath)) {
  console.error('content.json not found:', contentPath)
  process.exit(1)
}

const rows = JSON.parse(fs.readFileSync(rowsPath, 'utf8'))
const content = JSON.parse(fs.readFileSync(contentPath, 'utf8'))

function slugify(s) {
  return String(s)
    .toLowerCase()
    .replace(/\.[^/.]+$/, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

const existingIds = new Set(content.projects.map((p) => p.id))
const toAdd = []

for (const row of rows) {
  const mime = String(row['MIME Type'] || '').toLowerCase()
  if (!mime.startsWith('image') && !mime.startsWith('video')) continue

  const fileName = String(row['File Name'] || 'unnamed')
  const folder = String(row['Folder Path'] || '')
  const title = fileName
  const id = slugify(folder + ' ' + fileName)
  if (existingIds.has(id)) continue

  const year = 2026
  const media_type = mime.startsWith('video') ? 'Video' : 'Image'

  const project = {
    id,
    title,
    slug: id,
    categories: ['imported'],
    year,
    type: 'Imported',
    media_type,
    summary: `Imported file ${fileName}`,
    detail_line: `Imported from Drive: ${folder}`,
    description: `Auto-imported from Drive export. Source file: ${fileName}`,
    role: 'Imported',
    team: 'Solo',
    client: 'Imported',
    goal: '',
    target_audience: '',
    outcome: '',
    tools: [],
    color_mood: '',
    metadata: { featured_homepage: false, in_showreel: false, detail_page: false },
    resource_group_slugs: [],
  }

  toAdd.push(project)
  existingIds.add(id)
}

console.log('Image/video files to add as projects:', toAdd.length)
if (!toAdd.length) process.exit(0)

fs.copyFileSync(contentPath, contentPath + '.bak2')
content.projects = content.projects.concat(toAdd)
fs.writeFileSync(contentPath, JSON.stringify(content, null, 2))
console.log('Wrote', content.projects.length, 'projects to content.json')
