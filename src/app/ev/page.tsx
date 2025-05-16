"use client";
import React, { useState, useEffect } from 'react';
import {
  BoltIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  GlobeAltIcon,
  LightBulbIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  BanknotesIcon
} from '@heroicons/react/24/outline';
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

// Types
interface ChargingOverview {
  totalStations: number;
  totalPorts: number;
  networkUtilization: number;
  energyDispatched: string;
  averageSessionDuration: number;
  revenuePerKWh: number;
  customerSatisfactionScore: number;
  uptimePercentage: number;
}

interface Competitor {
  competitor: string;
  marketShare: number;
  stations: number;
  ports: number;
  trend: 'up' | 'down' | 'stable';
  recentActions: string[];
  strengths: string[];
  challenges: string[];
}

interface EnergyManagement {
  gridIntegration: {
    smartChargingEnabled: number;
    loadBalancing: number;
    demandResponse: number;
    renewableIntegration: number;
  };
  energySources: Array<{ source: string; percentage: number }>;
  peakDemandManagement: {
    peakShaving: number;
    valleyFilling: number;
    timeOfUseOptimization: number;
  };
}

interface CustomerSegment {
  segment: string;
  percentage: number;
  avgSessionValue: number;
  utilization: number;
  growth: number;
}

interface MarketOpportunity {
  opportunity: string;
  value: number;
  probability: number;
  timeframe: string;
  requirements: string[];
  competitiveAdvantage: string;
}

interface RegulatoryItem {
  regulation: string;
  status: 'Active' | 'Implementation' | 'Pending';
  impact: 'High' | 'Medium' | 'Low';
  complianceScore: number;
  keyRequirements: string[];
}

interface EVChargingData {
  businessUnits: string[];
  reportDate: string;
  overview: ChargingOverview;
  competitorAnalysis: Competitor[];
  energyManagement: EnergyManagement;
  customerSegments: CustomerSegment[];
  marketOpportunities: MarketOpportunity[];
  regulatoryEnvironment: RegulatoryItem[];
}

// Mock Data
const mockData: EVChargingData = {
  businessUnits: ["Driivz", "Sparkion"],
  reportDate: "2025-05-16",
  overview: {
    totalStations: 45000,
    totalPorts: 87500,
    networkUtilization: 72.8,
    energyDispatched: "125 GWh",
    averageSessionDuration: 47,
    revenuePerKWh: 0.35,
    customerSatisfactionScore: 4.2,
    uptimePercentage: 96.8
  },
  competitorAnalysis: [
    {
      competitor: "ChargePoint",
      marketShare: 28.5,
      stations: 65000,
      ports: 118000,
      trend: "down",
      recentActions: [
        "30% price reduction announced",
        "Partnership with Mercedes for HPC network",
        "AI-powered dynamic pricing rollout"
      ],
      strengths: ["Network size", "Brand recognition"],
      challenges: ["Profitability pressure", "Reliability issues"]
    },
    {
      competitor: "EVgo",
      marketShare: 15.2,
      stations: 850,
      ports: 3600,
      trend: "stable",
      recentActions: [
        "Partnership with General Motors",
        "Expansion into workplace charging",
        "Subscription model launch"
      ],
      strengths: ["Premium locations", "Fast charging focus"],
      challenges: ["Limited network size", "High costs"]
    },
    {
      competitor: "Electrify America",
      marketShare: 12.8,
      stations: 3500,
      ports: 15000,
      trend: "up",
      recentActions: [
        "Volkswagen Group backing",
        "Tesla adapter rollout",
        "Renewable energy sourcing"
      ],
      strengths: ["High-power charging", "Strategic locations"],
      challenges: ["Limited brand recognition", "Reliability concerns"]
    },
    {
      competitor: "Vontier (Driivz)",
      marketShare: 8.7,
      stations: 12000,
      ports: 28500,
      trend: "up",
      recentActions: [
        "Smart grid integration upgrade",
        "Fleet charging solutions",
        "Hydrogen fuel cell integration"
      ],
      strengths: ["Software platform", "Grid integration"],
      challenges: ["Network expansion speed", "Brand awareness"]
    }
  ],
  energyManagement: {
    gridIntegration: {
      smartChargingEnabled: 89,
      loadBalancing: 94,
      demandResponse: 67,
      renewableIntegration: 78
    },
    energySources: [
      { source: "Grid", percentage: 52 },
      { source: "Solar", percentage: 28 },
      { source: "Wind", percentage: 12 },
      { source: "Battery Storage", percentage: 8 }
    ],
    peakDemandManagement: {
      peakShaving: 85,
      valleyFilling: 72,
      timeOfUseOptimization: 91
    }
  },
  customerSegments: [
    {
      segment: "Public Charging",
      percentage: 45,
      avgSessionValue: 12.50,
      utilization: 68,
      growth: 32.1
    },
    {
      segment: "Workplace Charging",
      percentage: 25,
      avgSessionValue: 8.75,
      utilization: 89,
      growth: 45.8
    },
    {
      segment: "Fleet Charging",
      percentage: 20,
      avgSessionValue: 45.00,
      utilization: 94,
      growth: 67.2
    },
    {
      segment: "Residential",
      percentage: 10,
      avgSessionValue: 3.25,
      utilization: 62,
      growth: 28.5
    }
  ],
  marketOpportunities: [
    {
      opportunity: "Federal Infrastructure Investment Act funding",
      value: 2300000000,
      probability: 85,
      timeframe: "6-12 months",
      requirements: ["NEVI compliance", "US manufacturing"],
      competitiveAdvantage: "Existing fleet relationships"
    },
    {
      opportunity: "Corporate sustainability mandates",
      value: 850000000,
      probability: 92,
      timeframe: "3-6 months",
      requirements: ["Workplace charging solutions", "Carbon reporting"],
      competitiveAdvantage: "Integrated energy management"
    },
    {
      opportunity: "Utility grid services revenue",
      value: 450000000,
      probability: 78,
      timeframe: "12-18 months",
      requirements: ["Grid interconnection", "Demand response capability"],
      competitiveAdvantage: "Advanced DERMS integration"
    }
  ],
  regulatoryEnvironment: [
    {
      regulation: "NEVI Formula Program Requirements",
      status: "Active",
      impact: "High",
      complianceScore: 92,
      keyRequirements: ["97% uptime", "4+ ports per station", "150kW minimum"]
    },
    {
      regulation: "IRA Clean Fuel Credits",
      status: "Implementation", 
      impact: "Medium",
      complianceScore: 87,
      keyRequirements: ["Renewable sourcing", "Carbon accounting"]
    }
  ]
};

// Colors for charts
const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];

// Components
const MetricCard: React.FC<{ title: string; value: string | number; icon: React.ReactNode; trend?: string; suffix?: string }> = 
  ({ title, value, icon, trend, suffix = '' }) => {
  return (
    <div className="bg-white shadow-md border border-gray-100 rounded-xl p-6 hover:translate-y-[-2px] transition-all duration-300">
      <div className="flex items-center justify-between">
        <div className="p-2 bg-blue-100 rounded-lg">
        {icon}
        </div>
        {trend && (
          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
            {trend}
          </span>
        )}
      </div>
      <div className="mt-4">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <p className="text-2xl font-bold text-gray-800 mt-1">{value}{suffix}</p>
      </div>
    </div>
  );
};

const CompetitorCard: React.FC<Competitor> = ({ competitor, marketShare, stations, ports, trend, recentActions, strengths, challenges }) => {
  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return '↗';
      case 'down': return '↘';
      default: return '→';
    }
  };

  return (
    <div className="bg-white shadow-md border border-gray-100 rounded-xl p-6 hover:scale-105 transition-all duration-300">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-800">{competitor}</h3>
        <div className="text-right">
          <p className="text-2xl font-bold text-gray-800">{marketShare}%</p>
          <p className={`text-sm ${getTrendColor(trend)}`}>
            {getTrendIcon(trend)} {trend}
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-xs text-gray-500">Stations</p>
          <p className="text-gray-800 font-semibold">{stations.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Ports</p>
          <p className="text-gray-800 font-semibold">{ports.toLocaleString()}</p>
        </div>
      </div>
      
      <div className="space-y-3">
        <div>
          <p className="text-xs font-medium text-green-700 mb-1">Strengths</p>
          <div className="flex flex-wrap gap-1">
            {strengths.map((strength, idx) => (
              <span key={idx} className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-md">
                {strength}
              </span>
            ))}
          </div>
        </div>
        
        <div>
          <p className="text-xs font-medium text-red-700 mb-1">Challenges</p>
          <div className="flex flex-wrap gap-1">
            {challenges.map((challenge, idx) => (
              <span key={idx} className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-md">
                {challenge}
              </span>
            ))}
          </div>
        </div>
        
        <div>
          <p className="text-xs font-medium text-blue-700 mb-1">Recent Actions</p>
          <ul className="text-xs text-gray-600 space-y-1">
            {recentActions.map((action, idx) => (
              <li key={idx} className="flex items-start">
                <span className="w-1 h-1 bg-blue-600 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                {action}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const OpportunityCard: React.FC<MarketOpportunity> = ({ opportunity, value, probability, timeframe, requirements, competitiveAdvantage }) => {
  return (
    <div className="bg-white shadow-md border border-gray-100 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-800">{opportunity}</h3>
        <div className="text-right">
          <div className="text-xl font-bold text-green-600">${(value / 1000000000).toFixed(1)}B</div>
          <div className="text-xs text-gray-500">Value</div>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Probability</span>
          <span className="text-sm font-semibold text-gray-800">{probability}%</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Timeframe</span>
          <span className="text-sm font-semibold text-gray-800">{timeframe}</span>
        </div>
        
        <div>
          <p className="text-xs font-medium text-blue-700 mb-2">Requirements</p>
          <div className="flex flex-wrap gap-1">
            {requirements.map((req, idx) => (
              <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-md">
                {req}
              </span>
            ))}
          </div>
        </div>
        
        <div>
          <p className="text-xs font-medium text-green-700 mb-1">Competitive Advantage</p>
          <p className="text-xs text-gray-600">{competitiveAdvantage}</p>
        </div>
      </div>
    </div>
  );
};

const RegulatoryCard: React.FC<RegulatoryItem> = ({ regulation, status, impact, complianceScore, keyRequirements }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-700';
      case 'Implementation': return 'bg-orange-100 text-orange-700';
      case 'Pending': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High': return 'text-red-600';
      case 'Medium': return 'text-orange-600';
      case 'Low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="bg-white shadow-md border border-gray-100 rounded-xl p-6">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-800">{regulation}</h3>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
          {status}
        </span>
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Impact Level</span>
          <span className={`text-sm font-semibold ${getImpactColor(impact)}`}>{impact}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Compliance Score</span>
          <span className="text-sm font-semibold text-gray-800">{complianceScore}%</span>
        </div>
        
        <div>
          <p className="text-xs font-medium text-blue-700 mb-2">Key Requirements</p>
          <ul className="text-xs text-gray-600 space-y-1">
            {keyRequirements.map((req, idx) => (
              <li key={idx} className="flex items-start">
                <CheckCircleIcon className="w-3 h-3 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                {req}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

// Main Component
export default function EVChargingSegment() {
  const [data, setData] = useState<EVChargingData>(mockData);
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <header className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">EV Charging & Energy</h1>
            <p className="text-gray-500 mt-1">
              {data.businessUnits.join(', ')} - {data.reportDate}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <BoltIcon className="w-8 h-8 text-green-600" />
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="flex overflow-x-auto pb-4 mb-6">
        <div className="flex space-x-2 min-w-full">
          {['overview', 'competitors', 'energy', 'customers', 'opportunities', 'regulatory'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap capitalize transition-all duration-200 ${
                activeTab === tab
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Content based on active tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Overview Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
              title="Total Stations"
              value={data.overview.totalStations.toLocaleString()}
              icon={<BoltIcon className="w-6 h-6 text-green-600" />}
            />
            <MetricCard
              title="Total Ports"
              value={data.overview.totalPorts.toLocaleString()}
              icon={<ChartBarIcon className="w-6 h-6 text-blue-600" />}
            />
            <MetricCard
              title="Network Utilization"
              value={data.overview.networkUtilization}
              suffix="%"
              icon={<LightBulbIcon className="w-6 h-6 text-yellow-600" />}
            />
            <MetricCard
              title="Energy Dispatched"
              value={data.overview.energyDispatched}
              icon={<BanknotesIcon className="w-6 h-6 text-purple-600" />}
            />
          </div>

          {/* Additional Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
              title="Avg Session Duration"
              value={data.overview.averageSessionDuration}
              suffix=" min"
              icon={<ChartBarIcon className="w-6 h-6 text-indigo-600" />}
            />
            <MetricCard
              title="Revenue per kWh"
              value={`$${data.overview.revenuePerKWh}`}
              icon={<CurrencyDollarIcon className="w-6 h-6 text-green-600" />}
            />
            <MetricCard
              title="Customer Satisfaction"
              value={data.overview.customerSatisfactionScore}
              suffix="/5"
              icon={<CheckCircleIcon className="w-6 h-6 text-blue-600" />}
            />
            <MetricCard
              title="Network Uptime"
              value={data.overview.uptimePercentage}
              suffix="%"
              icon={<CheckCircleIcon className="w-6 h-6 text-green-600" />}
            />
          </div>
        </div>
      )}

      {activeTab === 'competitors' && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-800">Competitive Landscape</h2>
          
          {/* Market Share Chart */}
          <div className="bg-white shadow-md border border-gray-100 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Market Share Distribution</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data.competitorAnalysis}
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    dataKey="marketShare"
                    nameKey="competitor"
                    label={({ competitor, marketShare }) => `${competitor}: ${marketShare}%`}
                  >
                    {data.competitorAnalysis.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Competitor Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.competitorAnalysis.map((competitor, index) => (
              <CompetitorCard key={index} {...competitor} />
            ))}
          </div>
        </div>
      )}

      {activeTab === 'energy' && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-800">Energy Management</h2>
          
          {/* Grid Integration Metrics */}
          <div className="bg-white shadow-md border border-gray-100 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Grid Integration Capabilities</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(data.energyManagement.gridIntegration).map(([key, value]) => (
                <div key={key} className="text-center">
                  <div className="text-2xl font-bold text-gray-800">{value}%</div>
                  <div className="text-sm text-gray-500 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Energy Sources */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white shadow-md border border-gray-100 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Energy Sources</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={data.energyManagement.energySources}
                      cx="50%"
                      cy="50%"
                      outerRadius={120}
                      dataKey="percentage"
                      nameKey="source"
                      label={({ source, percentage }) => `${source}: ${percentage}%`}
                    >
                      {data.energyManagement.energySources.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white shadow-md border border-gray-100 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Peak Demand Management</h3>
              <div className="space-y-4">
                {Object.entries(data.energyManagement.peakDemandManagement).map(([key, value]) => (
                  <div key={key}>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                      <span className="text-gray-800 font-semibold">{value}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${value}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'customers' && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-800">Customer Segments</h2>
          
          {/* Customer Segment Chart */}
          <div className="bg-white shadow-md border border-gray-100 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Segment Distribution</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.customerSegments}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="segment" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip
                    formatter={(value, name) => [value + (name === 'percentage' ? '%' : ''), name]}
                    labelStyle={{ color: '#000' }}
                  />
                  <Legend />
                  <Bar dataKey="percentage" fill="#3B82F6" name="Market Share %" />
                  <Bar dataKey="growth" fill="#10B981" name="Growth Rate %" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Segment Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.customerSegments.map((segment, index) => (
              <div key={index} className="bg-white shadow-md border border-gray-100 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">{segment.segment}</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Market Share</span>
                    <span className="text-gray-800 font-semibold">{segment.percentage}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Avg Session Value</span>
                    <span className="text-gray-800 font-semibold">${segment.avgSessionValue}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Utilization</span>
                    <span className="text-gray-800 font-semibold">{segment.utilization}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Growth Rate</span>
                    <span className="text-green-600 font-semibold">+{segment.growth}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'opportunities' && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-800">Market Opportunities</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {data.marketOpportunities.map((opportunity, index) => (
              <OpportunityCard key={index} {...opportunity} />
            ))}
          </div>
        </div>
      )}

      {activeTab === 'regulatory' && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-800">Regulatory Environment</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.regulatoryEnvironment.map((regulation, index) => (
              <RegulatoryCard key={index} {...regulation} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}