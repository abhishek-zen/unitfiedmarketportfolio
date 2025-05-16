
import portfolioOptimizationMockData from '@/utils/mock-data/portfolio-optimization'
import { PortfolioChart } from '@/components/ui/portfolio-chart'
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card'

export default function PortfolioOptimizationPage() {
  return (
    <main className="px-4 py-8 md:px-16 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-2 tracking-tight">Portfolio Optimization</h1>
      <p className="mb-6 text-muted-foreground max-w-2xl">
        Compare your current allocation to AI-optimized targets. Drill down for key insights.
      </p>
      <section className="mb-8">
        <Card className="bg-gradient-to-br from-blue-50 to-white dark:from-neutral-900 dark:to-neutral-800 shadow-lg">
          <CardHeader>
            <CardTitle>Current vs Optimal Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <PortfolioChart data={portfolioOptimizationMockData.distributions} />
            <div className="flex flex-wrap gap-4 mt-6">
              {portfolioOptimizationMockData.distributions.map((dist) => (
                <div key={dist.asset} className="flex flex-col border rounded-lg px-3 py-2 min-w-[120px] items-center bg-white/80 dark:bg-black/40 shadow">
                  <span className="font-semibold">{dist.asset}</span>
                  <span className="text-primary font-mono">{dist.allocation}%</span>
                  <span className="text-xs text-muted-foreground">Optimal: {dist.optimal}%</span>
                  <span className={`text-xs ${dist.change.startsWith('+') ? 'text-green-600' : dist.change.startsWith('-') ? 'text-red-600' : 'text-muted-foreground'}`}>{dist.change}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>
      <section>
        <Card className="bg-gradient-to-br from-amber-50 to-white dark:from-neutral-900 dark:to-neutral-800 shadow-lg">
          <CardHeader>
            <CardTitle>Asset Drilldowns</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-6">
              {portfolioOptimizationMockData.drilldowns.map((drill) => (
                <div key={drill.asset} className="bg-white/80 dark:bg-black/40 rounded-xl shadow px-4 py-3 min-w-[180px]">
                  <div className="font-semibold mb-2">{drill.asset}</div>
                  <ul className="space-y-1">
                    {drill.breakdown.map((item) => (
                      <li key={item.name} className="flex justify-between">
                        <span>{item.name}</span>
                        <span className="font-mono">{item.value}%</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
