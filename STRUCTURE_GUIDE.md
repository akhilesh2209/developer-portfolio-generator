# Clean Next.js Project Structure Guide

## Summary

The AI Developer Portfolio Generator has been successfully refactored into a clean, scalable Next.js project structure. All code is now organized by feature and purpose, making it easy to navigate, maintain, and extend.

**Key Principle: No UI/UX changes. Only code organization and structure improvements.**

## Quick Reference

### Component Imports
```typescript
// Layout components (header, footer, sidebar, theme)
import { Navbar, Footer, DashboardSidebar } from '@/components/layout'

// Shared components (command palette, loaders, empty states)
import { CommandPalette, SkeletonLoader, EmptyState } from '@/components/shared'

// Animation utilities
import { FadeInUp, containerVariants } from '@/components/animations'
```

### Constants & Utils
```typescript
// Navigation and app constants
import { NAVIGATION_ITEMS, DASHBOARD_NAV_ITEMS, PRICING_PLANS } from '@/lib/constants'

// Animation configs
import { ANIMATION_DURATIONS, animationVariants } from '@/lib/animations'

// Utility functions
import { cn } from '@/lib/utils'
```

### Types
```typescript
// Type definitions
import type { Portfolio, User, AnalyticsStats, NavItem } from '@/types'
```

### Custom Hooks
```typescript
// Custom hooks
import { useNavigation } from '@/hooks'
```

## Folder Structure

```
project-root/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Authentication routes
│   │   ├── login/
│   │   ├── signup/
│   │   └── layout.tsx
│   ├── (landing)/                # Public landing pages
│   │   ├── page.tsx              # Home
│   │   ├── pricing/
│   │   ├── demo/
│   │   ├── docs/
│   │   └── layout.tsx
│   ├── dashboard/                # Protected dashboard
│   │   ├── page.tsx
│   │   ├── projects/
│   │   ├── templates/
│   │   ├── analytics/
│   │   ├── deploy/
│   │   ├── resume/
│   │   ├── settings/
│   │   └── layout.tsx
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Redirects to landing
│   └── globals.css
│
├── components/                   # Reusable React components
│   ├── ui/                       # shadcn/ui components
│   ├── layout/                   # Layout components
│   │   ├── navbar.tsx            # Header
│   │   ├── footer.tsx            # Footer
│   │   ├── dashboard-sidebar.tsx # Dashboard nav
│   │   ├── theme-provider.tsx    # Theme setup
│   │   ├── theme-toggle.tsx      # Dark/light toggle
│   │   └── index.ts              # Barrel export
│   ├── animations/               # Framer Motion wrappers
│   │   ├── fade-in-up.tsx        # Animation component
│   │   └── index.ts              # Barrel export
│   └── shared/                   # Utility components
│       ├── command-palette.tsx   # Cmd+K palette
│       ├── skeleton-loader.tsx   # Loading skeleton
│       ├── empty-states.tsx      # Empty states
│       └── index.ts              # Barrel export
│
├── hooks/                        # Custom React hooks
│   ├── useNavigation.ts          # Navigation utilities
│   └── index.ts                  # Barrel export
│
├── lib/                          # Utilities and constants
│   ├── utils.ts                  # Utility functions (cn)
│   ├── constants.ts              # App constants
│   └── animations.ts             # Animation configs
│
├── types/                        # TypeScript definitions
│   └── index.ts                  # All types
│
├── PROJECT_STRUCTURE.md          # Detailed structure docs
├── REFACTORING_NOTES.md          # Change details
└── STRUCTURE_GUIDE.md            # This file
```

## Organization Philosophy

### By Purpose, Not By Type
- ❌ DON'T: `/components/buttons/`, `/components/inputs/`, `/components/layouts/`
- ✅ DO: `/components/layout/`, `/components/shared/`, `/components/analytics/`

### Feature-Based With Shared Components
- **Layout components** → `/components/layout/`
- **Reusable utilities** → `/components/shared/`
- **Feature-specific** → `/components/[feature]/` (future)

### Centralized Configuration
- **App constants** → `/lib/constants.ts`
- **Animation configs** → `/lib/animations.ts`
- **Type definitions** → `/types/index.ts`

### Clear Exports
- Every folder with multiple files has an `index.ts`
- Barrel exports make importing easy and organized
- No deep import paths needed

## Key Files & Their Purpose

### `/components/layout/index.ts`
```typescript
export { Navbar } from './navbar'
export { Footer } from './footer'
export { DashboardSidebar } from './dashboard-sidebar'
export { ThemeProvider } from './theme-provider'
export { ThemeToggle } from './theme-toggle'
```
Single import for all layout components.

### `/lib/constants.ts`
Centralized constants:
- Navigation items
- Dashboard nav items
- Pricing plans
- Features
- Templates
- Social links

**Benefit:** Change navigation structure in one place, used everywhere.

### `/lib/animations.ts`
Animation configuration:
- Duration constants
- Easing functions
- Animation variants
- Common animation patterns

**Benefit:** Consistent animations across the app, easy to update.

### `/types/index.ts`
All TypeScript definitions:
- Navigation types
- Portfolio types
- User types
- Analytics types
- API response types

**Benefit:** Type safety throughout the app.

## Working with This Structure

### Adding a New Page
```
1. Create folder: app/[feature]/
2. Add layout.tsx if needed
3. Add page.tsx
4. Import components from barrel exports
```

### Adding a New Component
```
1. Determine if it's layout, shared, or feature-specific
2. Create in appropriate folder
3. If multiple related components, create subfolder with index.ts
4. Import existing utilities and types
```

### Adding a New Constant
```
1. Add to lib/constants.ts
2. Import in components/pages where needed
3. Use TypeScript const assertions for type safety
```

### Adding a New Type
```
1. Add to types/index.ts
2. Import as: import type { MyType } from '@/types'
3. Use in components and utilities
```

### Adding a Custom Hook
```
1. Create in hooks/[hookName].ts
2. Export from hooks/index.ts
3. Use as: import { useMyHook } from '@/hooks'
```

## Import Examples

### Before Refactoring
```typescript
// Scattered imports from different locations
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { DashboardSidebar } from '@/components/dashboard-sidebar'
import { FadeInUp } from '@/components/animations'
import { CommandPalette } from '@/components/command-palette'
```

### After Refactoring
```typescript
// Organized barrel exports
import { Navbar, Footer, DashboardSidebar } from '@/components/layout'
import { FadeInUp } from '@/components/animations'
import { CommandPalette } from '@/components/shared'

// Or with constants
import { DASHBOARD_NAV_ITEMS } from '@/lib/constants'

// And types
import type { Portfolio, User } from '@/types'

// And custom hooks
import { useNavigation } from '@/hooks'
```

## Maintained Features

✅ All original features preserved:
- Framer Motion animations
- Recharts analytics visualizations
- Dark/light mode toggle
- Command palette (Ctrl+K / Cmd+K)
- Responsive mobile design
- Dashboard with sidebar
- Template builder
- All pages and layouts

## Scalability Path

### Phase 1 (Current) ✅
- Organized layout components
- Shared utility components
- Animation utilities
- Constants and types

### Phase 2 (Optional)
- Create feature folders:
  - `/components/dashboard/`
  - `/components/templates/`
  - `/components/analytics/`
  - `/components/resume/`
- Move feature-specific components

### Phase 3 (Optional)
- Add `/lib/api/` for API calls
- Add `/lib/hooks/` for business logic hooks
- Add `/__tests__/` for tests

## Development Tips

### Finding Components
1. Check `/components/layout/` for structural components
2. Check `/components/shared/` for reusable utilities
3. Check `/components/animations/` for Framer Motion wrappers
4. Check `/components/ui/` for shadcn components

### Finding Constants
- Check `/lib/constants.ts` first
- Check `/lib/animations.ts` for animation constants

### Understanding Types
- All types in `/types/index.ts`
- Import as: `import type { Type } from '@/types'`

### Custom Hooks
- Check `/hooks/index.ts` for available hooks
- Import as: `import { useHook } from '@/hooks'`

## Performance Notes

- Barrel exports enable tree-shaking
- Components organized for code splitting
- Constants separated from components
- Types don't increase bundle size
- Animations configs separate from runtime code

## Maintenance Notes

- Update navigation in `/lib/constants.ts`
- Update animations in `/lib/animations.ts`
- Update types in `/types/index.ts`
- Keep related components together
- Use barrel exports for new component groups

## Migration Checklist for Team

- [x] Components organized by purpose
- [x] Barrel exports created
- [x] All imports updated
- [x] Constants file created
- [x] Types file created
- [x] Hooks folder created
- [x] Documentation complete
- [ ] Team trained on structure
- [ ] Code review completed
- [ ] Tests passing

## Questions?

Refer to:
1. `PROJECT_STRUCTURE.md` - Detailed folder structure
2. `REFACTORING_NOTES.md` - What changed and why
3. `STRUCTURE_GUIDE.md` - This guide
4. Component files - They show the patterns in action
