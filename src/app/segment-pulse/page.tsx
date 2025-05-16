"use client";
import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from 'recharts';
import { ArrowTrendingUpIcon, ArrowTrendingDownIcon, ChartBarIcon, UserGroupIcon, CurrencyDollarIcon, SignalIcon, StarIcon, TruckIcon } from '@heroicons/react/24/outline';

// Types
interface SegmentOverview {
  currentMarketShare: number;
  customerRetention: number;
  avgRevenuePerUser: number;
  totalUnits: number;
  monthlyRecurringRevenue: number;
  churnRate: number;
  netPromoterScore: number;
  customerSatisfaction: number;
}

interface Competitor {
  name: string;
  marketShare: number;
  trend: 'up' | 'down' | 'stable';
  trendChange: number;
  strengths: string[];
  weaknesses: string[];
  recentMoves: string[];
}

interface ProductPerformance {
  name: string;
  revenue: number;
  growth: number;
  units: number;
  satisfaction: number;
  churnRate: number;
}

interface CustomerSegment {
  segment: string;
  percentage: number;
  avgRevenue: number;
  retention: number;
  growthRate: number;
}

interface MarketSignal {
  signal: string;
  impact: 'high' | 'medium' | 'low';
  probability: number;
  timeframe: string;
  source: string;
  implication: string;
}

interface RegionalData {
  region: string;
  marketShare: number;
  revenue: number;
  growth: number;
  units: number;
}

interface FleetTelematicsData {
  businessUnit: string;
  reportDate: string;
  overview: SegmentOverview;
  competitorAnalysis: Competitor[];
  productPerformance: { products: ProductPerformance[] };
  customerInsights: {
    segments: CustomerSegment[];
    topVerticals: Array<{ vertical: string; percentage: number }>;
  };
  marketSignals: MarketSignal[];
  regionalBreakdown: RegionalData[];
}

// Mock Data
const mockData: FleetTelematicsData = {
  businessUnit: "Teletrac Navman",
  reportDate: "2025-05-16",
  overview: {
    currentMarketShare: 15.3,
    customerRetention: 94.7,
    avgRevenuePerUser: 2847,
    totalUnits: 487000,
    monthlyRecurringRevenue: 1385000000,
    churnRate: 2.1,
    netPromoterScore: 68,
    customerSatisfaction: 4.6
  },
  competitorAnalysis: [
    {
      name: "Samsara",
      marketShare: 22.1,
      trend: "up",
      trendChange: 1.2,
      strengths: ["AI features", "Pricing aggressiveness"],
      weaknesses: ["Integration complexity", "Customer support"],
      recentMoves: ["Acquired dashcam company", "40% price reduction on basic plans"]
    },
    {
      name: "Geotab",
      marketShare: 18.9,
      trend: "stable",
      trendChange: 0.1,
      strengths: ["Open platform", "Data analytics"],
      weaknesses: ["User interface", "Mobile app"],
      recentMoves: ["Launched EV fleet tools", "Partnered with Microsoft"]
    },
    {
      name: "Verizon Connect",
      marketShare: 12.4,
      trend: "down",
      trendChange: -1.8,
      strengths: ["Network coverage", "Enterprise sales"],
      weaknesses: ["Innovation lag", "High costs"],
      recentMoves: ["Workforce reduction", "Focus on enterprise only"]
    },
    {
      name: "Teletrac Navman",
      marketShare: 15.3,
      trend: "stable",
      trendChange: 0.3,
      strengths: ["Route optimization", "Compliance features"],
      weaknesses: ["Market penetration", "Brand recognition"],
      recentMoves: ["AI driver coaching launch", "European expansion"]
    }
  ],
  productPerformance: {
    products: [
      {
        name: "TN360 Platform",
        revenue: 892000000,
        growth: 8.3,
        units: 423000,
        satisfaction: 4.5,
        churnRate: 1.8
      },
      {
        name: "DIRECTOR Platform",
        revenue: 345000000,
        growth: 12.1,
        units: 64000,
        satisfaction: 4.7,
        churnRate: 1.2
      },
      {
        name: "Mobile Solutions",
        revenue: 148000000,
        growth: 22.4,
        units: 89000,
        satisfaction: 4.4,
        churnRate: 2.1
      }
    ]
  },
  customerInsights: {
    segments: [
      {
        segment: "Large Enterprise (1000+ vehicles)",
        percentage: 18,
        avgRevenue: 45000,
        retention: 97.2,
        growthRate: 5.5
      },
      {
        segment: "Mid-Market (100-999 vehicles)",
        percentage: 35,
        avgRevenue: 8500,
        retention: 95.1,
        growthRate: 11.3
      },
      {
        segment: "Small Business (10-99 vehicles)",
        percentage: 47,
        avgRevenue: 1200,
        retention: 92.8,
        growthRate: 15.7
      }
    ],
    topVerticals: [
      { vertical: "Transportation & Logistics", percentage: 42 },
      { vertical: "Construction", percentage: 18 },
      { vertical: "Field Services", percentage: 15 },
      { vertical: "Government", percentage: 12 },
      { vertical: "Utilities", percentage: 8 },
      { vertical: "Others", percentage: 5 }
    ]
  },
  marketSignals: [
    {
      signal: "AI-powered predictive maintenance demand surge",
      impact: "high",
      probability: 89,
      timeframe: "6 months",
      source: "Industry analysis",
      implication: "Opportunity to lead in predictive analytics"
    },
    {
      signal: "ELD mandate compliance rates plateauing",
      impact: "medium",
      probability: 76,
      timeframe: "12 months",
      source: "Government data",
      implication: "Need to focus on value-add features"
    },
    {
      signal: "Electric vehicle integration requirements increasing",
      impact: "high",
      probability: 92,
      timeframe: "3 months",
      source: "Customer surveys",
      implication: "Accelerate EV fleet management capabilities"
    }
  ],
  regionalBreakdown: [
    {
      region: "North America",
      marketShare: 18.2,
      revenue: 975000000,
      growth: 6.7,
      units: 312000
    },
    {
      region: "Europe",
      marketShare: 11.8,
      revenue: 298000000,
      growth: 14.2,
      units: 98000
    },
    {
      region: "Asia-Pacific",
      marketShare: 8.5,
      revenue: 112000000,
      growth: 28.5,
      units: 77000
    }
  ]
};

// Colors for charts
const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];

// Components
const MetricCard: React.FC<{ title: string; value: string | number; trend?: number; icon: React.ReactNode; suffix?: string }> = 
  ({ title, value, trend, icon, suffix = '' }) => {
  return (
    <div className="bg-white shadow-md border border-gray-200 rounded-xl p-6 hover:translate-y-[-2px] transition-all duration-300">
      <div className="flex items-center justify-between">
        <div className="p-2 bg-blue-100 rounded-lg">
          {icon}
        </div>
        {trend !== undefined && (
          <div className={`flex items-center ${trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {trend >= 0 ? <ArrowTrendingUpIcon className="w-4 h-4" /> : <ArrowTrendingDownIcon className="w-4 h-4" />}
            <span className="text-sm font-medium ml-1">{Math.abs(trend)}%</span>
          </div>
        )}
      </div>
      <div className="mt-4">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        <p className="text-2xl font-bold text-gray-800 mt-1">{value}{suffix}</p>
      </div>
    </div>
  );
};

const CompetitorCard: React.FC<Competitor> = ({ name, marketShare, trend, trendChange, strengths, weaknesses, recentMoves }) => {
  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="bg-white shadow-md border border-gray-200 rounded-xl p-6 hover:scale-105 transition-all duration-300">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
        <div className="text-right">
          <p className="text-2xl font-bold text-gray-800">{marketShare}%</p>
          <p className={`text-sm ${getTrendColor(trend)}`}>
            {trend === 'up' ? '+' : trend === 'down' ? '' : ''}{trendChange}%
          </p>
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
          <p className="text-xs font-medium text-red-700 mb-1">Weaknesses</p>
          <div className="flex flex-wrap gap-1">
            {weaknesses.map((weakness, idx) => (
              <span key={idx} className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-md">
                {weakness}
              </span>
            ))}
          </div>
        </div>
        
        <div>
          <p className="text-xs font-medium text-blue-700 mb-1">Recent Moves</p>
          <ul className="text-xs text-gray-600 space-y-1">
            {recentMoves.map((move, idx) => (
              <li key={idx} className="flex items-start">
                <span className="w-1 h-1 bg-blue-600 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                {move}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const MarketSignalCard: React.FC<MarketSignal> = ({ signal, impact, probability, timeframe, source, implication }) => {
  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-red-100 text-red-700';
      case 'medium': return 'bg-orange-100 text-orange-700';
      case 'low': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="bg-white shadow-md border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
      <div className="flex justify-between items-start mb-3">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getImpactColor(impact)}`}>
          {impact.toUpperCase()} IMPACT
        </span>
        <span className="text-right">
          <div className="text-lg font-bold text-gray-800">{probability}%</div>
          <div className="text-xs text-gray-500">Probability</div>
        </span>
      </div>
      
      <h3 className="text-sm font-semibold text-gray-800 mb-2">{signal}</h3>
      <p className="text-xs text-gray-600 mb-3">{implication}</p>
      
      <div className="flex justify-between items-center">
        <span className="text-xs text-blue-600">{source}</span>
        <span className="text-xs text-gray-500">{timeframe}</span>
      </div>
    </div>
  );
};

// Main Component
export default function FleetTelematicsSegment() {
  const [data, setData] = useState<FleetTelematicsData>(mockData);
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen w-full h-full bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Fleet & Telematics</h1>
            <p className="text-gray-600 mt-1">{data.businessUnit} - {data.reportDate}</p>
          </div>
          <div className="flex items-center space-x-4">
            <TruckIcon className="w-8 h-8 text-blue-600" />
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="bg-white shadow-sm sticky top-0 z-10 px-6 py-3">
        <div className="flex overflow-x-auto space-x-2 w-full">
          {['overview', 'competitors', 'products', 'customers', 'signals', 'regions'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap capitalize transition-all duration-200 ${
                activeTab === tab
                  ? 'bg-blue-600 text-white shadow'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Content based on active tab */}
      <div className="p-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Overview Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <MetricCard
                title="Market Share"
                value={data.overview.currentMarketShare}
                suffix="%"
                icon={<ChartBarIcon className="w-6 h-6" />}
              />
              <MetricCard
                title="Customer Retention"
                value={data.overview.customerRetention}
                suffix="%"
                icon={<UserGroupIcon className="w-6 h-6" />}
              />
              <MetricCard
                title="Avg Revenue/User"
                value={`$${data.overview.avgRevenuePerUser.toLocaleString()}`}
                icon={<CurrencyDollarIcon className="w-6 h-6" />}
              />
              <MetricCard
                title="Total Units"
                value={data.overview.totalUnits.toLocaleString()}
                icon={<SignalIcon className="w-6 h-6" />}
              />
            </div>

            {/* Additional Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <MetricCard
                title="Monthly Recurring Revenue"
                value={`$${(data.overview.monthlyRecurringRevenue / 1000000).toFixed(0)}M`}
                icon={<CurrencyDollarIcon className="w-6 h-6" />}
              />
              <MetricCard
                title="Churn Rate"
                value={data.overview.churnRate}
                suffix="%"
                icon={<ArrowTrendingDownIcon className="w-6 h-6" />}
              />
              <MetricCard
                title="Net Promoter Score"
                value={data.overview.netPromoterScore}
                icon={<StarIcon className="w-6 h-6" />}
              />
              <MetricCard
                title="Customer Satisfaction"
                value={data.overview.customerSatisfaction}
                suffix="/5"
                icon={<StarIcon className="w-6 h-6" />}
              />
            </div>
          </div>
        )}

        {activeTab === 'competitors' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">Competitive Landscape</h2>
            
            {/* Market Share Chart */}
            <div className="bg-white shadow-md border border-gray-200 rounded-xl p-6">
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
                      nameKey="name"
                      label={({ name, marketShare }) => `${name}: ${marketShare}%`}
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

            {/* Competitor Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.competitorAnalysis.map((competitor, index) => (
                <CompetitorCard key={index} {...competitor} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">Product Performance</h2>
            
            {/* Revenue Chart */}
            <div className="bg-white shadow-md border border-gray-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Revenue by Product</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.productPerformance.products}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis dataKey="name" stroke="#6B7280" />
                    <YAxis tickFormatter={(value) => `$${value / 1000000}M`} stroke="#6B7280" />
                    <Tooltip 
                      formatter={(value: number) => [`$${(value / 1000000).toFixed(0)}M`, 'Revenue']}
                      labelStyle={{ color: '#000' }}
                    />
                    <Bar dataKey="revenue" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Product Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {data.productPerformance.products.map((product, index) => (
                <div key={index} className="bg-white shadow-md border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">{product.name}</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Revenue</span>
                      <span className="text-gray-800 font-semibold">${(product.revenue / 1000000).toFixed(0)}M</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Growth</span>
                      <span className="text-green-600 font-semibold">+{product.growth}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Units</span>
                      <span className="text-gray-800 font-semibold">{product.units.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Satisfaction</span>
                      <span className="text-gray-800 font-semibold">{product.satisfaction}/5</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Churn Rate</span>
                      <span className="text-orange-600 font-semibold">{product.churnRate}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'customers' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">Customer Insights</h2>
            
            {/* Customer Segments */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white shadow-md border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Customer Segments</h3>
                <div className="space-y-4">
                  {data.customerInsights.segments.map((segment, index) => (
                    <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-800 font-medium">{segment.segment}</span>
                        <span className="text-blue-600 font-semibold">{segment.percentage}%</span>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Avg Revenue</p>
                          <p className="text-gray-800 font-semibold">${segment.avgRevenue.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Retention</p>
                          <p className="text-green-600 font-semibold">{segment.retention}%</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Growth Rate</p>
                          <p className="text-blue-600 font-semibold">+{segment.growthRate}%</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white shadow-md border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Industry Verticals</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={data.customerInsights.topVerticals}
                        cx="50%"
                        cy="50%"
                        outerRadius={120}
                        dataKey="percentage"
                        nameKey="vertical"
                        label={({ vertical, percentage }) => `${vertical}: ${percentage}%`}
                      >
                        {data.customerInsights.topVerticals.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'signals' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">Market Signals</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.marketSignals.map((signal, index) => (
                <MarketSignalCard key={index} {...signal} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'regions' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">Regional Performance</h2>
            
            {/* Regional Chart */}
            <div className="bg-white shadow-md border border-gray-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Revenue by Region</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.regionalBreakdown}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis dataKey="region" stroke="#6B7280" />
                    <YAxis tickFormatter={(value) => `$${value / 1000000}M`} stroke="#6B7280" />
                    <Tooltip 
                      formatter={(value: number) => [`$${(value / 1000000).toFixed(0)}M`, 'Revenue']}
                      labelStyle={{ color: '#000' }}
                    />
                    <Bar dataKey="revenue" fill="#10B981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Regional Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {data.regionalBreakdown.map((region, index) => (
                <div key={index} className="bg-white shadow-md border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">{region.region}</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Market Share</span>
                      <span className="text-gray-800 font-semibold">{region.marketShare}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Revenue</span>
                      <span className="text-gray-800 font-semibold">${(region.revenue / 1000000).toFixed(0)}M</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Growth</span>
                      <span className="text-green-600 font-semibold">+{region.growth}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Units</span>
                      <span className="text-gray-800 font-semibold">{region.units.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
