
"use client"

import * as React from "react"
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"
import Link from "next/link"

// --- Existing NavigationMenu code above, unchanged ---

export const NavigationMenu = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Root
    ref={ref}
    className={cn("relative z-10 flex max-w-max flex-1 items-center justify-center", className)}
    {...props}
  />
))
NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName

// ... other exports (List, Item, Trigger etc.) remain unchanged ...

export function NavigationMenuDemo() {
  return (
    <NavigationMenu>
      <NavigationMenuPrimitive.List className="flex gap-4">
        <NavigationMenuPrimitive.Item>
          <Link href="/dashboard" className="font-medium px-3 py-2 rounded hover:bg-accent transition-colors">Dashboard</Link>
        </NavigationMenuPrimitive.Item>
        <NavigationMenuPrimitive.Item>
          <Link href="/signal-preview" className="font-medium px-3 py-2 rounded hover:bg-accent transition-colors">Signal Preview</Link>
        </NavigationMenuPrimitive.Item>
        <NavigationMenuPrimitive.Item>
          <Link href="/segment-pulse" className="font-medium px-3 py-2 rounded hover:bg-accent transition-colors">Segment Pulse</Link>
        </NavigationMenuPrimitive.Item>
        <NavigationMenuPrimitive.Item>
          <Link href="/portfolio-optimization" className="font-medium px-3 py-2 rounded hover:bg-accent transition-colors">Portfolio Optimization</Link>
        </NavigationMenuPrimitive.Item>
        {/* Append other nav items here, such as AuthButton, as per design */}
      </NavigationMenuPrimitive.List>
    </NavigationMenu>
  )
}
