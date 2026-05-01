# Project Structure

This document outlines the organized folder structure of the AI Developer Portfolio Generator application.

## Overview

```
/app                          # Next.js App Router pages
/components                   # React components (organized by feature)
/hooks                        # Custom React hooks
/lib                          # Utilities, constants, and helpers
/types                        # TypeScript type definitions
```

## Detailed Structure

### `/app` - Next.js Pages & Layouts

```
/app
  /(auth)/                    # Authentication routes (grouped route)
    layout.tsx
    /login
      page.tsx                # Sign in page
    /signup
      page.tsx                # Registration page
  /(landing)/                 # Landing/marketing routes (grouped route)
    layout.tsx                # Shared layout with Navbar & Footer
    page.tsx                  # Home page
    /pricing
      page.tsx                # Pricing page
    /demo
      page.tsx                # Demo/templates showcase
    /docs
      page.tsx                # Documentation
  /dashboard/                 # Protected dashboard routes
    layout.tsx                # Dashboard layout with Sidebar
    page.tsx                  # Dashboard overview
    /projects
      page.tsx                # Projects list
      /new
        page.tsx              # Create new project
    /templates
      page.tsx                # Choose template
      /[id]
        /edit
          page.tsx            # Edit template
    /analytics
      page.tsx                # Analytics dashboard
    /deploy
      page.tsx                # Deployment options
    /resume
      page.tsx                # Resume generator
    /settings
      page.tsx                # Account settings
  layout.tsx                  # Root layout with ThemeProvider
  page.tsx                    # Redirects to /(landing)
  globals.css                 # Global styles with custom animations
```

### `/components` - Reusable React Components

Components are organized by feature/purpose rather than by type:

```
/components
  /ui/                        # shadcn/ui components (auto-generated)
  /layout/                    # Layout components
    navbar.tsx                # Header navigation with mobile menu
    footer.tsx                # Footer with links & social
    dashboard-sidebar.tsx     # Dashboard navigation sidebar
    theme-provider.tsx        # Next-themes wrapper
    theme-toggle.tsx          # Dark/light mode toggle
    index.ts                  # Barrel export
  /animations/                # Animation utilities & wrappers
    fade-in-up.tsx            # FadeInUp wrapper component
    index.ts                  # Barrel export with all variants
  /shared/                    # Shared utility components
    command-palette.tsx       # Cmd+K command palette (Ctrl+K)
    skeleton-loader.tsx       # Loading skeleton screens
    empty-states.tsx          # Empty state UI components
    index.ts                  # Barrel export
```

### `/lib` - Utilities & Constants

```
/lib
  utils.ts                    # Utility functions (cn, etc.)
  constants.ts                # App constants (navigation, pricing, features)
  animations.ts               # Animation constants and variants
```

### `/types` - TypeScript Definitions

```
/types
  index.ts                    # All type definitions
    - NavItem, Template, Project, Portfolio
    - User, AnalyticsEvent, AnalyticsStats
    - ApiResponse, PaginatedResponse
    - Component prop types
```

### `/hooks` - Custom React Hooks

```
/hooks
  useNavigation.ts            # Navigation utilities (active path, navigate)
  index.ts                    # Barrel export
```

## Import Patterns

### Importing Components

```typescript
// Layout components
import { Navbar, Footer, DashboardSidebar } from '@/components/layout'

// Shared components
import { CommandPalette, SkeletonLoader, EmptyState } from '@/components/shared'

// Animation components
import { FadeInUp, containerVariants } from '@/components/animations'

// UI components (shadcn)
import { Button } from '@/components/ui/button'
```

### Importing from lib

```typescript
// Constants
import { NAVIGATION_ITEMS, DASHBOARD_NAV_ITEMS, PRICING_PLANS } from '@/lib/constants'

// Animation configs
import { ANIMATION_DURATIONS, animationVariants } from '@/lib/animations'

// Utilities
import { cn } from '@/lib/utils'
```

### Importing types

```typescript
import type { Portfolio, User, AnalyticsStats } from '@/types'
```

### Using custom hooks

```typescript
import { useNavigation } from '@/hooks'

const { navigate, isActive, pathname } = useNavigation()
```

## Component Organization Guide

### When to create a new component:

1. **Layout Components** (`/components/layout/`)
   - Header, Footer, Sidebar, Navigation
   - Main page structure components
   - Theme & global UI controllers

2. **Shared/Utility Components** (`/components/shared/`)
   - Reusable across multiple features
   - Command palette, loaders, empty states
   - Cross-cutting concerns

3. **Animation Wrappers** (`/components/animations/`)
   - Reusable animation containers
   - Framer Motion wrapper components
   - Animation variants & configs

4. **Feature Components** (future expansion)
   - `/components/dashboard/` - Dashboard-specific UI
   - `/components/templates/` - Template builder components
   - `/components/analytics/` - Analytics visualization
   - `/components/resume/` - Resume generator components

## Best Practices

### Component Exports
- Use barrel exports (`index.ts`) for organized imports
- Group related components in subfolders
- Export types alongside components

### Constants & Configuration
- Store all magic strings in `/lib/constants.ts`
- Keep animation configs in `/lib/animations.ts`
- Use TypeScript const assertions for type safety

### Type Safety
- Define types in `/types/index.ts`
- Use prop types for all components
- Export component prop types alongside definitions

### Custom Hooks
- Keep hooks in `/hooks/` directory
- One hook per file (unless tightly coupled)
- Export from barrel file for easy importing

## Adding New Features

When adding a new feature:

1. Create new pages in `/app/[feature]/`
2. Create feature-specific components in `/components/[feature]/` (if needed)
3. Add types to `/types/index.ts`
4. Add constants/config to appropriate file in `/lib/`
5. Create custom hooks in `/hooks/` (if needed)
6. Update barrel exports (`index.ts` files)

## File Naming Conventions

- **Components**: PascalCase (`Navbar.tsx`, `CommandPalette.tsx`)
- **Hooks**: camelCase with `use` prefix (`useNavigation.ts`)
- **Utils/Constants**: camelCase (`constants.ts`, `animations.ts`)
- **Types**: camelCase (`index.ts` - types are inline)
- **Pages**: lowercase or PascalCase (Next.js convention)

## Performance Considerations

- Components are organized to enable code splitting
- Barrel exports allow selective imports
- Animation configs are separated from components for tree-shaking
- Type definitions are in a single file for clarity but don't increase bundle
