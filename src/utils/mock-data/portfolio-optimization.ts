
/**
 * Mock data and types for Portfolio Optimization View
 */
export interface DistributionMetric {
  asset: string
  allocation: number
  optimal: number
  change: string
}

export interface DrilldownDetail {
  asset: string
  breakdown: { name: string; value: number }[]
}

export interface PortfolioOptimizationMockData {
  distributions: DistributionMetric[]
  drilldowns: DrilldownDetail[]
}

const portfolioOptimizationMockData: PortfolioOptimizationMockData = {
  distributions: [
    { asset: 'Tech', allocation: 34, optimal: 36, change: '+2%' },
    { asset: 'Healthcare', allocation: 24, optimal: 22, change: '-2%' },
    { asset: 'Finance', allocation: 18, optimal: 20, change: '+2%' },
    { asset: 'Energy', allocation: 14, optimal: 12, change: '-2%' },
    { asset: 'Other', allocation: 10, optimal: 10, change: '0%' },
  ],
  drilldowns: [
    {
      asset: 'Tech',
      breakdown: [
        { name: 'AlphaVision', value: 16 },
        { name: 'CodeNova', value: 10 },
        { name: 'NextBit', value: 8 },
      ],
    },
    {
      asset: 'Healthcare',
      breakdown: [
        { name: 'BioGenex', value: 12 },
        { name: 'MediCore', value: 7 },
        { name: 'CurePath', value: 5 },
      ],
    },
  ],
}

export default portfolioOptimizationMockData
