"use client";
import { TrendingDownIcon, TrendingUpIcon, AlertTriangleIcon, BellIcon, ArrowBigRight } from 'lucide-react';
import React from 'react';
import { useState, useEffect } from 'react';


// Types
interface KPIMetric {
  id: string;
  metric: string;
  currentValue: number;
  previousValue: number;
  trend: 'up' | 'down' | 'stable';
  unit: string;
  description: string;
}

interface Alert {
  id: string;
  priority: 'high' | 'medium' | 'low';
  type: string;
  title: string;
  description: string;
  impactedBU: string;
  confidence: number;
  timestamp: string;
  estimatedImpact: string;
  actionRequired: boolean;
}

interface RecentAction {
  id: string;
  actionType: string;
  description: string;
  amount?: number;
  from?: string;
  to?: string;
  partners?: string[];
  status: string;
  outcome: string;
  date: string;
  category: string;
}

interface BusinessUnit {
  name: string;
  healthScore: number;
  contribution: number;
  trend: 'up' | 'down' | 'stable';
}

interface DashboardData {
  timestamp: string;
  kpis: KPIMetric[];
  alerts: Alert[];
  recentActions: RecentAction[];
  portfolioHealth: {
    overallScore: number;
    riskLevel: string;
    diversificationIndex: number;
    synergiesRealized: number;
    businessUnits: BusinessUnit[];
  };
}

// Mock Data
const mockData: DashboardData = {
  timestamp: "2025-05-16T10:30:00Z",
  kpis: [
    {
      id: "portfolio-synergy",
      metric: "Portfolio Synergy Score",
      currentValue: 8.2,
      previousValue: 7.8,
      trend: "up",
      unit: "/10",
      description: "Cross-BU collaboration effectiveness"
    },
    {
      id: "revenue-growth",
      metric: "Total Revenue Growth",
      currentValue: 12.4,
      previousValue: 10.8,
      trend: "up",
      unit: "%",
      description: "YoY growth across all business units"
    },
    {
      id: "esg-score",
      metric: "ESG Compliance Score",
      currentValue: 94,
      previousValue: 92,
      trend: "up",
      unit: "/100",
      description: "Environmental, Social, Governance rating"
    },
    {
      id: "market-share",
      metric: "Weighted Market Share",
      currentValue: 18.6,
      previousValue: 18.2,
      trend: "up",
      unit: "%",
      description: "Average market share across segments"
    }
  ],
  alerts: [
    {
      id: "1",
      priority: "high",
      type: "competitive_threat",
      title: "ChargePoint announces 30% price reduction",
      description: "Major competitor price cut affecting EV charging segment",
      impactedBU: "Driivz",
      confidence: 92,
      timestamp: "2025-05-16T09:15:00Z",
      estimatedImpact: "$15M potential revenue impact",
      actionRequired: true
    },
    {
      id: "2",
      priority: "medium",
      type: "opportunity",
      title: "EU announces €2.3B hydrogen infrastructure funding",
      description: "New funding opportunities for alt-fuel infrastructure",
      impactedBU: "ANGI Energy Systems",
      confidence: 87,
      timestamp: "2025-05-16T08:45:00Z",
      estimatedImpact: "$50M potential opportunity",
      actionRequired: false
    },
    {
      id: "3",
      priority: "medium",
      type: "risk",
      title: "Supply chain disruption in semiconductor sector",
      description: "Potential delays in telematics hardware production",
      impactedBU: "Teletrac Navman",
      confidence: 78,
      timestamp: "2025-05-16T07:30:00Z",
      estimatedImpact: "2-3 month production delay",
      actionRequired: true
    }
  ],
  recentActions: [
    {
      id: "1",
      actionType: "Portfolio Rebalancing",
      description: "Shifted investment from legacy fueling to EV charging",
      amount: 50000000,
      from: "Gilbarco Veeder-Root",
      to: "Driivz",
      status: "approved",
      outcome: "+2.3% ROI improvement",
      date: "2025-05-15",
      category: "investment"
    },
    {
      id: "2",
      actionType: "Strategic Partnership",
      description: "Joint venture with Shell for hydrogen fueling stations",
      amount: 25000000,
      partners: ["ANGI Energy Systems", "Shell"],
      status: "in-progress",
      outcome: "pending",
      date: "2025-05-14",
      category: "partnership"
    },
    {
      id: "3",
      actionType: "Product Launch",
      description: "New AI-powered diagnostic platform rollout",
      from: "Matco Tools",
      status: "completed",
      outcome: "+8% market share in Q2",
      date: "2025-05-10",
      category: "product"
    }
  ],
  portfolioHealth: {
    overallScore: 87,
    riskLevel: "moderate",
    diversificationIndex: 0.82,
    synergiesRealized: 0.76,
    businessUnits: [
      { name: "Teletrac Navman", healthScore: 92, contribution: 18.5, trend: "stable" },
      { name: "Driivz", healthScore: 88, contribution: 12.3, trend: "up" },
      { name: "Gilbarco Veeder-Root", healthScore: 85, contribution: 28.7, trend: "down" },
      { name: "Matco Tools", healthScore: 89, contribution: 15.4, trend: "up" },
      { name: "ANGI Energy Systems", healthScore: 83, contribution: 8.2, trend: "up" },
      { name: "DRB Systems", healthScore: 86, contribution: 6.9, trend: "stable" }
    ]
  }
};

// Components
const KPICard: React.FC<KPIMetric> = ({ metric, currentValue, previousValue, trend, unit, description }) => {
  const percentage = ((currentValue - previousValue) / previousValue * 100);
  const isPositive = trend === 'up';

  return (
    <div className="bg-white shadow-md border border-gray-100 rounded-xl p-6 hover:translate-y-[-4px] transition-all duration-300 hover:shadow-xl">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-600">{metric}</h3>
        <div className={`p-2 rounded-lg ${isPositive ? 'bg-green-100' : 'bg-red-100'}`}>
          {isPositive ? (
            <TrendingUpIcon className="w-4 h-4 text-green-500" />
          ) : (
            <TrendingDownIcon className="w-4 h-4 text-red-500" />
          )}
        </div>
      </div>
      
      <div className="mt-4">
        <div className="flex items-baseline">
          <span className="text-2xl font-bold text-gray-800">
            {currentValue}{unit}
          </span>
          <span className={`ml-2 text-sm ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
            {isPositive ? '+' : ''}{percentage.toFixed(1)}%
          </span>
        </div>
        <p className="text-xs text-gray-500 mt-1">{description}</p>
      </div>
    </div>
  );
};

const AlertCard: React.FC<Alert> = ({ priority, title, description, impactedBU, confidence, timestamp, estimatedImpact, actionRequired }) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-500 bg-red-50';
      case 'medium': return 'border-orange-500 bg-orange-50';
      default: return 'border-blue-500 bg-blue-50';
    }
  };

  return (
    <div className={`p-4 rounded-lg border-l-4 ${getPriorityColor(priority)} hover:shadow-md transition-all duration-200`}>
      <div className="flex items-start">
        <AlertTriangleIcon className="w-5 h-5 text-gray-700 mt-0.5 mr-3" />
        <div className="flex-1">
          <h3 className="font-medium text-gray-900">{title}</h3>
          <p className="text-sm text-gray-600 mt-1">{description}</p>
          <p className="text-sm text-gray-600 mt-1">Impact: {impactedBU}</p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-gray-500">Confidence: {confidence}%</span>
            <span className="text-xs text-gray-500">{estimatedImpact}</span>
          </div>
        </div>
        {actionRequired && (
          <button className="ml-4 px-3 py-1 text-xs bg-red-600 text-white rounded-md hover:bg-red-700">
            Action Required
          </button>
        )}
      </div>
    </div>
  );
};

const ActionCard: React.FC<RecentAction> = ({ actionType, description, amount, from, to, status, outcome, date, category }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'text-green-600 bg-green-100';
      case 'completed': return 'text-blue-600 bg-blue-100';
      case 'in-progress': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-blue-500">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-gray-800">{actionType}</h3>
          <p className="text-sm text-gray-600 mt-1">{description}</p>
          {amount && (
            <p className="text-sm text-gray-500 mt-1">
              Amount: ${(amount / 1000000).toFixed(0)}M
            </p>
          )}
          {from && to && (
            <p className="text-sm text-gray-500">
              From: {from} → To: {to}
            </p>
          )}
        </div>
        <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(status)}`}>
          {status}
        </span>
      </div>
      <div className="mt-3 flex justify-between items-center">
        <span className="text-xs text-gray-400">{date}</span>
        <span className="text-sm text-green-600">{outcome}</span>
      </div>
    </div>
  );
};

const PortfolioHealthCard: React.FC<{ data: DashboardData['portfolioHealth'] }> = ({ data }) => {
  return (
    <div className="bg-white shadow-md border border-gray-100 rounded-xl p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Portfolio Health</h2>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-center">
          <div className="text-3xl font-bold text-gray-900">{data.overallScore}</div>
          <div className="text-sm text-gray-500">Overall Score</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-orange-500 capitalize">{data.riskLevel}</div>
          <div className="text-sm text-gray-500">Risk Level</div>
        </div>
      </div>

      <div className="space-y-3">
        {data.businessUnits.map((bu, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-800">{bu.name}</span>
                <span className="text-sm text-gray-500">{bu.contribution}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: `${(bu.healthScore / 100) * 100}%` }}
                ></div>
              </div>
            </div>
            <div className="ml-4">
              {bu.trend === 'up' ? (
                <TrendingUpIcon className="w-4 h-4 text-green-500" />
              ) : bu.trend === 'down' ? (
                <TrendingDownIcon className="w-4 h-4 text-red-500" />
              ) : (
                <ArrowBigRight className="w-4 h-4 text-gray-500" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Main Dashboard Component
export default function ExecutiveDashboard() {
  const [data, setData] = useState<DashboardData>(mockData);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      // Simulate small changes in KPIs
      setData(prevData => ({
        ...prevData,
        timestamp: new Date().toISOString()
      }));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const refreshData = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 p-6">
      {/* Header */}
      <header className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Executive Dashboard</h1>
          <p className="text-gray-500 mt-1">
            Last updated: {new Date(data.timestamp).toLocaleString()}
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={refreshData}
            disabled={loading}
            className="bg-gray-100 p-2 text-gray-600 hover:bg-gray-200 rounded-lg transition-all duration-200"
          >
            <ArrowBigRight className={`w-6 h-6 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <div className="relative">
            <button className="bg-gray-100 p-2 text-gray-600 hover:bg-gray-200 rounded-lg transition-all duration-200">
              <BellIcon className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>
          </div>
        </div>
      </header>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {data.kpis.map((kpi) => (
          <KPICard key={kpi.id} {...kpi} />
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Alerts */}
        <div className="lg:col-span-2">
          <div className="bg-white shadow-md border border-gray-100 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Strategic Alerts</h2>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {data.alerts.map((alert) => (
                <AlertCard key={alert.id} {...alert} />
              ))}
            </div>
          </div>
        </div>

        {/* Portfolio Health */}
        <div>
          <PortfolioHealthCard data={data.portfolioHealth} />
        </div>
      </div>

      {/* Recent Actions */}
      <div className="bg-white shadow-md border border-gray-100 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Strategic Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.recentActions.map((action) => (
            <ActionCard key={action.id} {...action} />
          ))}
        </div>
      </div>
    </div>
  );
}