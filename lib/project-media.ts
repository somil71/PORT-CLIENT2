import type { DriveResource } from './types'

function normalizeUrl(url?: string) {
  return url?.trim() || null
}

export function getYouTubeVideoId(url?: string) {
  if (!url) return null

  try {
    const parsed = new URL(url)

    if (parsed.hostname.includes('youtu.be')) {
      return parsed.pathname.slice(1) || null
    }

    if (parsed.pathname.includes('/shorts/')) {
      const parts = parsed.pathname.split('/').filter(Boolean)
      return parts[parts.length - 1] ?? null
    }

    return parsed.searchParams.get('v')
  } catch {
    return null
  }
}

export function getYouTubeThumbnail(url?: string) {
  const videoId = getYouTubeVideoId(url)
  return videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : null
}

export function getYouTubeEmbedUrl(url?: string) {
  const videoId = getYouTubeVideoId(url)
  return videoId ? `https://www.youtube.com/embed/${videoId}` : null
}

export function getDriveFileId(url?: string) {
  if (!url) return null

  const fileMatch = url.match(/\/d\/([^/]+)/)
  if (fileMatch?.[1]) {
    return fileMatch[1]
  }

  try {
    const parsed = new URL(url)
    return parsed.searchParams.get('id')
  } catch {
    return null
  }
}

export function getDriveThumbnail(url?: string, size = 'w1600') {
  const fileId = getDriveFileId(url)
  return fileId ? `https://lh3.googleusercontent.com/d/${fileId}=${size}` : null
}

export function getResourceKind(resource: DriveResource) {
  const type = resource.type.toLowerCase()
  const mime = resource.mime_type?.toLowerCase() ?? ''
  const source = `${resource.view_url} ${resource.embed_url ?? ''}`.toLowerCase()

  if (type.includes('youtube') || source.includes('youtu')) return 'youtube'
  if (mime.includes('photoshop') || resource.title.toLowerCase().endsWith('.psd')) return 'doc'
  if (type.includes('gif') || mime.includes('gif')) return 'gif'
  if (type.includes('image') || mime.startsWith('image/')) return 'image'
  if (type.includes('video') || mime.startsWith('video/') || source.includes('/preview')) return 'video'
  if (type.includes('pdf') || mime.includes('pdf')) return 'pdf'
  return 'doc'
}

export function getResourcePreviewImage(resource: DriveResource) {
  const kind = getResourceKind(resource)
  const embedUrl = normalizeUrl(resource.embed_url)
  const viewUrl = normalizeUrl(resource.view_url)

  if (kind === 'youtube') {
    return getYouTubeThumbnail(viewUrl ?? embedUrl ?? undefined)
  }

  if (kind === 'image' || kind === 'gif') {
    return getDriveThumbnail(embedUrl ?? viewUrl ?? undefined)
  }

  return getDriveThumbnail(embedUrl ?? viewUrl ?? undefined)
}

export function pickProjectPreviewResource(
  resources: DriveResource[],
  heroResourceTitle?: string
) {
  if (!resources.length) return null

  if (heroResourceTitle) {
    const heroResource = resources.find((resource) => resource.title === heroResourceTitle)
    if (heroResource) {
      return heroResource
    }
  }

  const preferredKinds = ['image', 'gif', 'video', 'pdf', 'youtube']

  for (const kind of preferredKinds) {
    const match = resources.find((resource) => getResourceKind(resource) === kind)
    if (match) {
      return match
    }
  }

  return resources[0]
}
