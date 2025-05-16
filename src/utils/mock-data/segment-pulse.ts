
/**
 * Mock data and types for Segment Pulse Panel
 */
export interface SegmentMetric {
  segment: string
  kpi: string
  value: number
  change: string
  trend: 'up' | 'down' | 'flat'
}

export interface LeaderInsight {
  segment: string
  topPerformer: string
  growth: string
  lastUpdated: string
}

export interface SegmentPulseMockData {
  segmentMetrics: SegmentMetric[]
  leaderInsights: LeaderInsight[]
}

const segmentPulseMockData: SegmentPulseMockData = {
  segmentMetrics: [
    { segment: 'Tech', kpi: 'ROI', value: 14.1, change: '+0.7%', trend: 'up' },
    { segment: 'Healthcare', kpi: 'ROI', value: 9.8, change: '+0.2%', trend: 'up' },
    { segment: 'Finance', kpi: 'ROI', value: 7.5, change: '-0.1%', trend: 'down' },
    { segment: 'Energy', kpi: 'ROI', value: 6.3, change: '0%', trend: 'flat' },
  ],
  leaderInsights: [
    {
      segment: 'Tech',
      topPerformer: 'AlphaVision',
      growth: '+5.2%',
      lastUpdated: '2024-03-21T08:00:00Z',
    },
    {
      segment: 'Healthcare',
      topPerformer: 'BioGenex',
      growth: '+2.1%',
      lastUpdated: '2024-03-21T08:15:00Z',
    },
    {
      segment: 'Finance',
      topPerformer: 'SafeBank',
      growth: '+1.3%',
      lastUpdated: '2024-03-21T08:30:00Z',
    },
    {
      segment: 'Energy',
      topPerformer: 'GreenGrid',
      growth: '+0.9%',
      lastUpdated: '2024-03-21T08:45:00Z',
    },
  ],
}

export default segmentPulseMockData
