const fs = require('fs')
const path = require('path')

const drivePath = path.resolve(__dirname, '../lib/drive-files.json')
const contentPath = path.resolve(__dirname, '../lib/content.json')

if (!fs.existsSync(drivePath)) {
  console.error('drive-files.json not found:', drivePath)
  process.exit(1)
}
if (!fs.existsSync(contentPath)) {
  console.error('content.json not found:', contentPath)
  process.exit(1)
}

const driveRows = JSON.parse(fs.readFileSync(drivePath, 'utf8'))
const content = JSON.parse(fs.readFileSync(contentPath, 'utf8'))

function slugify(s) {
  return String(s)
    .toLowerCase()
    .replace(/\s*›\s*/g, ' ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

// Build folder -> group slug map (matching logic in lib/content.ts)
const folderToGroup = new Map()
for (const row of driveRows) {
  const folder = String(row['Folder Path'] || '')
  const parts = folder.split('›').map((p) => p.trim()).filter(Boolean)
  const key = (parts[1] ?? parts[0] ?? 'archive').toLowerCase()
  const slug = (key.replace(/\s+/g, '-'))
  folderToGroup.set(folder, slug)
}

// Helper to find slug by matching a folder-like string
function findSlugForFolderText(text) {
  if (!text) return undefined
  // try exact match of known folder strings
  for (const [folder, slug] of folderToGroup.entries()) {
    if (text.includes(folder) || folder.includes(text)) return slug
  }
  // try by simple key
  const parts = text.split('›').map((p) => p.trim()).filter(Boolean)
  const key = (parts[1] ?? parts[0] ?? '').toLowerCase()
  if (!key) return undefined
  return key.replace(/\s+/g, '-')
}

const existingIds = new Set(content.projects.map((p) => p.id))
let added = 0

// Map projects to resource groups
for (const project of content.projects) {
  if (!project.resource_group_slugs || project.resource_group_slugs.length === 0) {
    const searchText = (project.detail_line || project.description || project.summary || '').toString()
    const slug = findSlugForFolderText(searchText)
    if (slug) {
      project.resource_group_slugs = [slug]
    }
  }
}

// Import remaining non-image/video rows as projects
for (const row of driveRows) {
  const mime = String(row['MIME Type'] || '').toLowerCase()
  const isMedia = mime.startsWith('image') || mime.startsWith('video')
  if (isMedia) continue

  const folder = String(row['Folder Path'] || '')
  const fileName = String(row['File Name'] || 'file')
  const id = slugify(folder + ' ' + fileName)
  if (existingIds.has(id)) continue

  const title = fileName
  const year = 2026
  const media_type = 'Files'
  const groupSlug = folderToGroup.get(folder) || slugify(folder)

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
    resource_group_slugs: groupSlug ? [groupSlug] : [],
  }

  content.projects.push(project)
  existingIds.add(id)
  added++
}

// Backup and write
fs.copyFileSync(contentPath, contentPath + '.bak3')
fs.writeFileSync(contentPath, JSON.stringify(content, null, 2))
console.log('Updated content.json. Projects:', content.projects.length, 'Added non-media projects:', added)
