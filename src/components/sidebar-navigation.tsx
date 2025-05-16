'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  ChartBarIcon,
  WrenchScrewdriverIcon,
  SignalIcon,
  BoltIcon,
  ChartPieIcon,
  XMarkIcon,
  Bars3Icon,
  LockClosedIcon,
} from '@heroicons/react/24/outline'

const navigationItems = [
  {
    name: "Executive Overview",
    href: "/",
    icon: ChartBarIcon,
  },
  {
    name: "Fleet & Telematics Segment",
    href: "/segment-pulse",
    icon: ChartBarIcon,
  },
  {
    name: "EV & Charging",
    href: "/ev",
    icon: WrenchScrewdriverIcon,
  },
  {
    name: "Signal Preview",
    href: "/signal-preview",
    icon: SignalIcon,
  },
  {
    name: "Portfolio Optimization",
    href: "/portfolio-optimization",
    icon: ChartPieIcon,
  },
  {
    name: "Simulation Output",
    href: "/simulation-output",
    icon: BoltIcon,
    disabled: true, // Example of a disabled route
  },
  {
    name: "Fueling Infrastructure",
    href: "/fueling-infrastructure",
    icon: WrenchScrewdriverIcon,
    disabled: true,
  },
  {
    name: "Diagnostics & Tools",
    href: "/diagnostics",
    icon: WrenchScrewdriverIcon,
    disabled: true, 
  },
  {
    name: "Alternative Fuels",
    href: "/alternative-fuels",
    icon: BoltIcon,
    disabled: true, // Example of a disabled route
  },
  {
    name: "Car Wash & Site Tech",
    href: "/car-wash",
    icon: SignalIcon,
    disabled: true, // Example of a disabled route
  }
]

export function SidebarNavigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  
  // Close sidebar when route changes (mobile)
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Close sidebar when pressing escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  // Prevent scrolling when sidebar is open on mobile
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }
    
    return () => {
      document.body.classList.remove('overflow-hidden')
    }
  }, [isOpen])

  // Render navigation item based on whether it's disabled or not
  const renderNavItem = (item:any) => {
    const Icon = item.icon
    const isActive = pathname === item.href
    
    // Common styles for both enabled and disabled items
    const commonStyles = `
      group flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all
    `
    
    // If the item is disabled, render a div instead of a Link
    if (item.disabled) {
      return (
        <div
          key={item.name}
          className={`${commonStyles} cursor-not-allowed opacity-60 bg-gray-50 dark:bg-gray-800/50`}
          title="This section is currently unavailable"
        >
          <Icon className="w-5 h-5" />
          <span>{item.name}</span>
          <LockClosedIcon className="w-4 h-4 ml-auto" />
        </div>
      )
    }
    
    // Otherwise, render a clickable Link
    return (
      <Link
        key={item.name}
        href={item.href}
        className={`
          ${commonStyles}
          ${isActive 
            ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300' 
            : 'hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-blue-600'}
        `}
      >
        <Icon 
          className={`w-5 h-5 ${isActive ? 'text-blue-600 dark:text-blue-400' : ''} group-hover:text-blue-600`} 
        />
        <span>{item.name}</span>
      </Link>
    )
  }

  return (
    <>
      {/* Mobile toggle button */}
      <div className="lg:hidden">
        <button 
          type="button" 
          onClick={() => setIsOpen(true)}
          className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="Open navigation menu"
        >
          <Bars3Icon className="w-6 h-6" />
        </button>
      </div>

      {/* Desktop sidebar - always visible */}
      <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:pt-16 lg:z-10">
        <div className="flex flex-col flex-grow bg-white dark:bg-gray-900 border-r border-r-foreground/10 pt-6 pb-4 overflow-y-auto">
          <div className="mt-6 flex-1 px-3 space-y-1">
            {navigationItems.map((item) => (
              <div key={item.name}>
                {renderNavItem(item)}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile sidebar - overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 z-40 lg:hidden" onClick={() => setIsOpen(false)} />
      )}

      {/* Mobile sidebar - slide over */}
      <div className={`
        fixed inset-y-0 left-0 flex flex-col w-72 bg-white dark:bg-gray-900 z-50 transform transition-transform duration-300 ease-in-out lg:hidden
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex items-center justify-between px-4 py-3 border-b border-b-foreground/10">
          <h2 className="text-xl font-semibold">Navigation</h2>
          <button 
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={() => setIsOpen(false)}
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto pt-5 pb-4">
          <div className="px-3 space-y-1">
            {navigationItems.map((item) => (
              <div key={item.name}>
                {renderNavItem(item)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}