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
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

// Group rows by folder parts after the initial "portfolio"
const groups = new Map()
for (const row of rows) {
  const folder = String(row['Folder Path'] || '')
  const parts = folder.split('›').map((p) => p.trim()).filter(Boolean)
  // remove leading 'portfolio' if present
  if (parts[0] && parts[0].toLowerCase().startsWith('portfolio')) parts.shift()
  const key = parts.join(' › ') || 'uncategorized'
  if (!groups.has(key)) groups.set(key, [])
  groups.get(key).push(row)
}

console.log('Found groups:', groups.size)

const existingIds = new Set(content.projects.map((p) => p.id))
const newProjects = []
for (const [key, items] of groups) {
  const title = key
  const id = slugify(title)
  if (existingIds.has(id)) continue

  // infer year from most recent modified date, default to 2026
  const lastDates = items.map((r) => r['Last Modified']).filter(Boolean)
  let year = 2026
  if (lastDates.length) {
    // Excel serial numbers may be present; if numeric convert
    const nums = lastDates.map((d) => (typeof d === 'number' ? d : Date.parse(d))).filter(Boolean)
    if (nums.length) {
      const max = Math.max(...nums)
      const date = new Date(max)
      if (!isNaN(date.getFullYear())) year = date.getFullYear()
    }
  }

  // determine media_type by presence of video/image
  const hasVideo = items.some((r) => String(r['MIME Type'] || '').includes('video') || String(r['File Name'] || '').toLowerCase().includes('.mp4'))
  const hasImage = items.some((r) => String(r['MIME Type'] || '').startsWith('image'))
  const media_type = hasVideo ? 'Video' : hasImage ? 'Image' : 'Files'

  const project = {
    id,
    title,
    slug: id,
    categories: ['freelance-academic'],
    year,
    type: 'Project',
    media_type,
    summary: `Imported project for ${title}`,
    detail_line: `Imported from Drive folder: ${title}`,
    description: `Auto-imported project. Contains ${items.length} files from Drive.`,
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

  newProjects.push(project)
}

console.log('New projects to add:', newProjects.length)

if (!newProjects.length) {
  console.log('No new projects to add.')
  process.exit(0)
}

// Backup content.json
fs.copyFileSync(contentPath, contentPath + '.bak')

content.projects = content.projects.concat(newProjects)
fs.writeFileSync(contentPath, JSON.stringify(content, null, 2))
console.log('Wrote updated content.json with', content.projects.length, 'projects')
