
import signalPreviewMockData from '@/utils/mock-data/signal-preview'
import { TrendVisualization } from '@/components/ui/trend-visualization'
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export default function SignalPreviewPage() {
  return (
    <main className="px-4 py-8 md:px-16 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-2 tracking-tight">Signal Preview Panel</h1>
      <p className="mb-6 text-muted-foreground max-w-2xl">
        Visualize live signal data, AI-detected trends, and run new simulations on demand.
      </p>
      <section className="mb-8">
        <Card className="bg-gradient-to-br from-sky-50 to-white dark:from-neutral-900 dark:to-neutral-800 shadow-lg">
          <CardHeader>
            <CardTitle>Live Signal Metric</CardTitle>
          </CardHeader>
          <CardContent>
            <TrendVisualization data={signalPreviewMockData.liveSignals.map(d => ({ timestamp: d.timestamp.slice(11, 16), value: d.value }))} />
            <div className="flex items-center gap-4 mt-4">
              <span className="font-mono text-lg text-primary">
                Current: {signalPreviewMockData.liveSignals.at(-1)?.value}
              </span>
              <Button variant="secondary" size="sm" className="ml-auto">
                Run Simulation
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
      <section>
        <Card className="bg-gradient-to-br from-blue-50 to-white dark:from-neutral-900 dark:to-neutral-800 shadow-lg">
          <CardHeader>
            <CardTitle>AI Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {signalPreviewMockData.aiTrends.map((trend, idx) => (
                <div key={trend.label} className="flex items-center gap-4 bg-white/80 dark:bg-black/40 rounded-lg p-3 shadow">
                  <Badge variant={
                    trend.direction === 'bullish'
                      ? 'default'
                      : trend.direction === 'bearish'
                        ? 'destructive'
                        : 'secondary'
                  } className="min-w-[70px] text-center">{trend.direction.toUpperCase()}</Badge>
                  <span className="flex-1 font-medium">{trend.label}</span>
                  <span className="font-mono text-primary">{Math.round(trend.confidence * 100)}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
