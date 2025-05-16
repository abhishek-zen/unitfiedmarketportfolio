
'use client'

import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from 'recharts'
import * as React from 'react'

interface SegmentMetric {
  segment: string
  kpi: string
  value: number
  change: string
  trend: 'up' | 'down' | 'flat'
}

interface SegmentChartProps {
  data: SegmentMetric[]
}

export function SegmentChart({ data }: SegmentChartProps) {
  return (
    <div className="w-full h-[240px] bg-gradient-to-t from-green-50 via-white to-green-50 dark:from-neutral-900 dark:to-neutral-800 rounded-xl shadow-md p-2">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="segment" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" name="ROI" fill="#22c55e" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
