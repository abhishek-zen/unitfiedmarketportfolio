
'use client'

import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import * as React from 'react'

interface DataPoint {
  timestamp: string
  value: number
}

interface TrendVisualizationProps {
  data: DataPoint[]
}

export function TrendVisualization({ data }: TrendVisualizationProps) {
  return (
    <div className="w-full h-[220px] bg-gradient-to-t from-slate-50 via-white to-slate-50 dark:from-neutral-900 dark:to-neutral-800 rounded-xl shadow-md p-2">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorSignal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0284c7" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#38bdf8" stopOpacity={0.15}/>
            </linearGradient>
          </defs>
          <XAxis dataKey="timestamp" hide />
          <YAxis hide />
          <Tooltip />
          <Legend />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#0284c7"
            fillOpacity={1}
            fill="url(#colorSignal)"
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
