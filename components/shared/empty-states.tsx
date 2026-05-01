'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Github, Settings, Rocket, Palette, BarChart3, FileText } from 'lucide-react'
import Link from 'next/link'

interface EmptyStateProps {
  type: 'repositories' | 'analytics' | 'portfolio' | 'templates' | 'resume' | 'projects'
  onAction?: () => void
}

export function EmptyState({ type, onAction }: EmptyStateProps) {
  const states = {
    repositories: {
      icon: Github,
      title: 'No repositories found',
      description: 'Connect your GitHub account to automatically sync your projects',
      action: 'Connect GitHub',
      color: 'from-orange-500/20 to-orange-600/20'
    },
    analytics: {
      icon: BarChart3,
      title: 'Analytics coming soon',
      description: 'Share your portfolio to start tracking visitor analytics and engagement',
      action: 'Share Portfolio',
      color: 'from-blue-500/20 to-blue-600/20'
    },
    portfolio: {
      icon: Palette,
      title: 'No portfolio generated yet',
      description: 'Create your first portfolio by selecting a template and customizing it',
      action: 'Get Started',
      href: '/dashboard/templates',
      color: 'from-purple-500/20 to-purple-600/20'
    },
    templates: {
      icon: Palette,
      title: 'Choose a template',
      description: 'Select one of our professionally designed templates to get started',
      action: 'Browse Templates',
      color: 'from-pink-500/20 to-pink-600/20'
    },
    resume: {
      icon: FileText,
      title: 'No resume generated',
      description: 'Generate a professional resume from your portfolio data',
      action: 'Generate Resume',
      href: '/dashboard/resume',
      color: 'from-green-500/20 to-green-600/20'
    },
    projects: {
      icon: Rocket,
      title: 'No projects yet',
      description: 'Import projects from GitHub or add them manually to your portfolio',
      action: 'Add Project',
      href: '/dashboard/projects/new',
      color: 'from-blue-500/20 to-blue-600/20'
    }
  }

  const state = states[type]
  const Icon = state.icon

  return (
    <motion.div
      className={`relative overflow-hidden rounded-lg border border-border p-12 text-center bg-gradient-to-br ${state.color}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Animated background elements */}
      <motion.div
        className="absolute inset-0 opacity-10"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      >
        <Icon className="w-64 h-64 mx-auto opacity-10" />
      </motion.div>

      <div className="relative z-10">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
          className="flex justify-center mb-4"
        >
          <div className="p-4 rounded-full bg-primary/20">
            <Icon className="w-8 h-8 text-primary" />
          </div>
        </motion.div>

        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl font-semibold mb-2"
        >
          {state.title}
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-muted-foreground mb-6 max-w-md mx-auto"
        >
          {state.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {state.href ? (
            <Button asChild>
              <Link href={state.href}>{state.action}</Link>
            </Button>
          ) : (
            <Button onClick={onAction}>{state.action}</Button>
          )}
        </motion.div>
      </div>
    </motion.div>
  )
}
