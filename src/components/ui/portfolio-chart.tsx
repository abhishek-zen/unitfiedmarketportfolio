
'use client'

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import * as React from 'react'

interface DistributionMetric {
  asset: string
  allocation: number
  optimal: number
  change: string
}

interface PortfolioChartProps {
  data: DistributionMetric[]
}

const COLORS = ['#0ea5e9', '#22d3ee', '#38bdf8', '#a7f3d0', '#fde68a']

export function PortfolioChart({ data }: PortfolioChartProps) {
  return (
    <div className="w-full h-[220px] bg-gradient-to-t from-blue-50 via-white to-blue-50 dark:from-neutral-900 dark:to-neutral-800 rounded-xl shadow-md p-2">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="allocation"
            nameKey="asset"
            cx="50%"
            cy="50%"
            outerRadius={72}
            label={({ name }) => name}
            isAnimationActive
          >
            {data.map((entry, idx) => (
              <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
