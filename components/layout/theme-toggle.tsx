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
      <div className="h-9 w-9 rounded-lg border border-white/5 bg-white/[0.02]" />
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
          'border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/20',
          'focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/50'
        )}
        aria-label={`Current theme: ${theme}. Click to change.`}
      >
        {/* Icon with smooth rotation */}
        <div className="relative w-5 h-5 transition-transform duration-500 ease-out">
          {/* Sun icon */}
          <Sun 
            className={cn(
              'absolute inset-0 h-5 w-5 text-amber-400 transition-all duration-300',
              isLight 
                ? 'opacity-100 rotate-0 scale-100' 
                : 'opacity-0 rotate-90 scale-75'
            )} 
          />
          
          {/* Moon icon */}
          <Moon 
            className={cn(
              'absolute inset-0 h-5 w-5 text-indigo-400 transition-all duration-300',
              isDark 
                ? 'opacity-100 rotate-0 scale-100' 
                : 'opacity-0 -rotate-90 scale-75'
            )} 
          />
          
          {/* System/Monitor icon */}
          <Monitor 
            className={cn(
              'absolute inset-0 h-5 w-5 text-cyan-400 transition-all duration-300',
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
          isLight ? 'bg-amber-400 shadow-lg shadow-amber-400/50' : 'bg-amber-400/20'
        )} />
        <div className={cn(
          'h-1.5 w-1.5 rounded-full transition-all duration-300',
          isDark ? 'bg-indigo-400 shadow-lg shadow-indigo-400/50' : 'bg-indigo-400/20'
        )} />
        <div className={cn(
          'h-1.5 w-1.5 rounded-full transition-all duration-300',
          isSystem ? 'bg-cyan-400 shadow-lg shadow-cyan-400/50' : 'bg-cyan-400/20'
        )} />
      </div>

      {/* Tooltip on hover */}
      <div className={cn(
        'absolute top-full mt-2 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap',
        'bg-gray-900/95 border border-white/10 text-gray-300 backdrop-blur-xl shadow-xl',
        'transition-all duration-200 pointer-events-none',
        isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'
      )}>
        <div className="flex items-center gap-2">
          {isDark && <><Moon className="h-3 w-3 text-indigo-400" /> Dark Mode</>}
          {isLight && <><Sun className="h-3 w-3 text-amber-400" /> Light Mode</>}
          {isSystem && <><Monitor className="h-3 w-3 text-cyan-400" /> System</>}
          <span className="text-gray-500">·</span>
          <span className="text-gray-500">Click to change</span>
        </div>
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 border-l border-t border-white/10 rotate-45" />
      </div>
    </div>
  )
}