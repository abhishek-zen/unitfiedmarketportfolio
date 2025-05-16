
'use client'

import { Card, CardContent, CardHeader, CardTitle } from './card'
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react'
import { cn } from '@/lib/utils'
import * as React from 'react'

interface KpiCardProps {
  label: string
  value: string | number
  trend: 'up' | 'down' | 'flat'
  change: string
  unit?: string
}

export function KpiCard({ label, value, trend, change, unit }: KpiCardProps) {
  const icon =
    trend === 'up'
      ? <ArrowUpRight className="h-5 w-5 text-green-500" />
      : trend === 'down'
        ? <ArrowDownRight className="h-5 w-5 text-red-500" />
        : <Minus className="h-5 w-5 text-muted-foreground" />

  return (
    <Card className="shadow-lg rounded-xl border-0 bg-gradient-to-br from-white via-slate-50 to-slate-100 dark:from-neutral-900 dark:to-neutral-800 transition-all">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold text-muted-foreground">{label}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="flex items-end gap-2">
          <span className="text-3xl font-bold text-primary">{value}{unit && <span className="ml-1 text-lg text-muted-foreground">{unit}</span>}</span>
          <span className={cn(
            "text-sm font-medium",
            trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-muted-foreground'
          )}>{change}</span>
        </div>
      </CardContent>
    </Card>
  )
}
