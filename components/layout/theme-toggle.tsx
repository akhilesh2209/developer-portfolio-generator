'use client'

import { Moon, Sun, Monitor, Laptop } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="h-9 w-9 rounded-lg border border-border bg-muted/30" />
    )
  }

  const isDark = theme === 'dark'
  const isLight = theme === 'light'
  const isSystem = theme === 'system'

  const cycleTheme = () => {
    if (theme === 'light') setTheme('dark')
    else if (theme === 'dark') setTheme('system')
    else setTheme('light')
  }

  return (
    <div className="relative">
      <button
        onClick={cycleTheme}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={cn(
          'relative h-9 w-9 rounded-lg border transition-all duration-200 flex items-center justify-center',
          'border-border bg-muted/30 hover:bg-muted/50 hover:border-primary/30',
          'focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/50'
        )}
        aria-label={`Current theme: ${theme}. Click to change.`}
      >
        {/* Icon with smooth rotation */}
        <div className="relative w-5 h-5 transition-transform duration-500 ease-out">
          {/* Sun icon */}
          <Sun 
            className={cn(
              'absolute inset-0 h-5 w-5 text-amber-500 transition-all duration-300',
              isLight 
                ? 'opacity-100 rotate-0 scale-100' 
                : 'opacity-0 rotate-90 scale-75'
            )} 
          />
          
          {/* Moon icon */}
          <Moon 
            className={cn(
              'absolute inset-0 h-5 w-5 text-indigo-500 transition-all duration-300',
              isDark 
                ? 'opacity-100 rotate-0 scale-100' 
                : 'opacity-0 -rotate-90 scale-75'
            )} 
          />
          
          {/* System/Monitor icon */}
          <Monitor 
            className={cn(
              'absolute inset-0 h-5 w-5 text-cyan-500 transition-all duration-300',
              isSystem 
                ? 'opacity-100 rotate-0 scale-100' 
                : 'opacity-0 rotate-90 scale-75'
            )} 
          />
        </div>
      </button>

      {/* Theme indicator dot */}
      <div className="absolute -top-0.5 -right-0.5 flex gap-0.5">
        <div className={cn(
          'h-1.5 w-1.5 rounded-full transition-all duration-300',
          isLight ? 'bg-amber-500 shadow-lg shadow-amber-500/50' : 'bg-amber-500/20'
        )} />
        <div className={cn(
          'h-1.5 w-1.5 rounded-full transition-all duration-300',
          isDark ? 'bg-indigo-500 shadow-lg shadow-indigo-500/50' : 'bg-indigo-500/20'
        )} />
        <div className={cn(
          'h-1.5 w-1.5 rounded-full transition-all duration-300',
          isSystem ? 'bg-cyan-500 shadow-lg shadow-cyan-500/50' : 'bg-cyan-500/20'
        )} />
      </div>

      {/* Tooltip on hover */}
      <div className={cn(
        'absolute top-full mt-2 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap',
        'bg-popover border border-border text-foreground backdrop-blur-xl shadow-xl',
        'transition-all duration-200 pointer-events-none',
        isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'
      )}>
        <div className="flex items-center gap-2">
          {isDark && <><Moon className="h-3 w-3 text-indigo-500" /> Dark Mode</>}
          {isLight && <><Sun className="h-3 w-3 text-amber-500" /> Light Mode</>}
          {isSystem && <><Monitor className="h-3 w-3 text-cyan-500" /> System</>}
          <span className="text-muted-foreground">·</span>
          <span className="text-muted-foreground">Click to change</span>
        </div>
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-popover border-l border-t border-border rotate-45" />
      </div>
    </div>
  )
}