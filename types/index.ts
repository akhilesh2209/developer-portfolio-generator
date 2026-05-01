// Navigation types
export type NavItem = {
  href: string
  label: string
  icon?: string
}

// Portfolio types
export type Template = {
  id: number
  name: string
  description: string
  features: string[]
  selected?: boolean
}

export type Project = {
  id: string
  name: string
  description: string
  url: string
  stars: number
  language: string
  visibility: 'public' | 'private'
}

export type Portfolio = {
  id: string
  title: string
  description: string
  template: string
  projects: Project[]
  published: boolean
  publishedUrl?: string
  viewCount: number
  lastUpdated: Date
}

// User types
export type User = {
  id: string
  email: string
  name: string
  avatar?: string
  bio?: string
  location?: string
  github?: string
  twitter?: string
  linkedin?: string
  createdAt: Date
}

// Analytics types
export type AnalyticsEvent = {
  id: string
  userId: string
  type: 'view' | 'click' | 'download'
  portfolioId: string
  timestamp: Date
  metadata?: Record<string, unknown>
}

export type AnalyticsStats = {
  totalViews: number
  totalClicks: number
  uniqueVisitors: number
  downloads: number
  lastUpdated: Date
}

// Component props types
export type BaseComponentProps = {
  className?: string
  children?: React.ReactNode
}

export type AnimationProps = BaseComponentProps & {
  delay?: number
  duration?: number
  variant?: 'fadeIn' | 'slideUp' | 'scaleIn'
}

// Response types
export type ApiResponse<T = unknown> = {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export type PaginatedResponse<T = unknown> = ApiResponse<{
  items: T[]
  total: number
  page: number
  pageSize: number
}>
