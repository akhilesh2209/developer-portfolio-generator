'use client'

import { motion } from 'framer-motion'

export function SkeletonLoader() {
  const loadingAnimation = {
    initial: { opacity: 0.6 },
    animate: { opacity: 1 },
    transition: { duration: 1.5, repeat: Infinity, repeatType: 'reverse' }
  }

  return (
    <motion.div
      className="bg-muted rounded-lg h-12 w-full"
      variants={loadingAnimation}
      initial="initial"
      animate="animate"
    />
  )
}

export function SkeletonCard() {
  const loadingAnimation = {
    initial: { opacity: 0.6 },
    animate: { opacity: 1 },
    transition: { duration: 1.5, repeat: Infinity, repeatType: 'reverse' }
  }

  return (
    <motion.div
      className="bg-card border border-border rounded-lg p-6 space-y-4"
      variants={loadingAnimation}
      initial="initial"
      animate="animate"
    >
      <div className="h-6 bg-muted rounded-lg w-2/3" />
      <div className="h-4 bg-muted rounded-lg w-full" />
      <div className="h-4 bg-muted rounded-lg w-5/6" />
    </motion.div>
  )
}

export function SkeletonLine({ width = 'w-full' }: { width?: string }) {
  const loadingAnimation = {
    initial: { opacity: 0.6 },
    animate: { opacity: 1 },
    transition: { duration: 1.5, repeat: Infinity, repeatType: 'reverse' }
  }

  return (
    <motion.div
      className={`h-4 bg-muted rounded-lg ${width}`}
      variants={loadingAnimation}
      initial="initial"
      animate="animate"
    />
  )
}
