
/**
 * Mock data and types for the Home Dashboard (Executive Overview)
 */
export interface KpiData {
  id: string
  label: string
  value: string | number
  trend: 'up' | 'down' | 'flat'
  change: string
  unit?: string
}

export interface AlertSummary {
  id: string
  type: 'info' | 'warning' | 'critical'
  message: string
  timestamp: string
}

export interface ActionLog {
  id: string
  action: string
  user: string
  timestamp: string
  status: 'success' | 'failed'
}

export interface DashboardMockData {
  kpis: KpiData[]
  alerts: AlertSummary[]
  actions: ActionLog[]
}

const dashboardMockData: DashboardMockData = {
  kpis: [
    {
      id: 'roi',
      label: 'ROI YTD',
      value: '12.8',
      trend: 'up',
      change: '+1.4%',
      unit: '%',
    },
    {
      id: 'volatility',
      label: 'Volatility',
      value: '2.3',
      trend: 'down',
      change: '-0.2%',
      unit: '%',
    },
    {
      id: 'total-signals',
      label: 'Signals Processed',
      value: 1842,
      trend: 'up',
      change: '+28',
    },
    {
      id: 'anomalies',
      label: 'Anomalies Detected',
      value: 7,
      trend: 'flat',
      change: '0',
    },
  ],
  alerts: [
    {
      id: 'alert-1',
      type: 'critical',
      message: 'Portfolio drawdown exceeded 5% threshold in Segment A.',
      timestamp: '2024-03-21T09:20:00Z',
    },
    {
      id: 'alert-2',
      type: 'warning',
      message: 'Market volatility spike detected for Tech sector.',
      timestamp: '2024-03-21T08:45:00Z',
    },
    {
      id: 'alert-3',
      type: 'info',
      message: 'AI optimization routine completed successfully.',
      timestamp: '2024-03-20T19:00:00Z',
    },
  ],
  actions: [
    {
      id: 'action-1',
      action: 'Rebalanced Portfolio',
      user: 'Alex Chen',
      timestamp: '2024-03-20T17:03:00Z',
      status: 'success',
    },
    {
      id: 'action-2',
      action: 'Triggered Signal Simulation',
      user: 'Priya Mehta',
      timestamp: '2024-03-20T16:51:00Z',
      status: 'success',
    },
    {
      id: 'action-3',
      action: 'AI Model Update',
      user: 'System',
      timestamp: '2024-03-20T15:22:00Z',
      status: 'success',
    },
  ],
}

export default dashboardMockData
