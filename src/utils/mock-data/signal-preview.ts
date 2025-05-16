
/**
 * Mock data and types for Signal Preview Panel
 */
export interface LiveSignalMetric {
  timestamp: string
  value: number
  trend: 'up' | 'down' | 'flat'
}

export interface AiTrend {
  label: string
  confidence: number
  direction: 'bullish' | 'bearish' | 'neutral'
}

export interface SignalPreviewMockData {
  liveSignals: LiveSignalMetric[]
  aiTrends: AiTrend[]
}

const signalPreviewMockData: SignalPreviewMockData = {
  liveSignals: [
    { timestamp: '2024-03-21T09:00:00Z', value: 74.2, trend: 'up' },
    { timestamp: '2024-03-21T09:05:00Z', value: 73.9, trend: 'down' },
    { timestamp: '2024-03-21T09:10:00Z', value: 74.6, trend: 'up' },
    { timestamp: '2024-03-21T09:15:00Z', value: 75.3, trend: 'up' },
    { timestamp: '2024-03-21T09:20:00Z', value: 74.8, trend: 'down' },
  ],
  aiTrends: [
    { label: 'Momentum', confidence: 0.88, direction: 'bullish' },
    { label: 'Volatility', confidence: 0.66, direction: 'neutral' },
    { label: 'Liquidity', confidence: 0.72, direction: 'bullish' },
    { label: 'Sentiment', confidence: 0.53, direction: 'bearish' },
  ],
}

export default signalPreviewMockData
