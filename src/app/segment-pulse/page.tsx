
import segmentPulseMockData from '@/utils/mock-data/segment-pulse'
import { SegmentChart } from '@/components/ui/segment-chart'
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card'

export default function SegmentPulsePage() {
  return (
    <main className="px-4 py-8 md:px-16 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-2 tracking-tight">Segment Pulse Panel</h1>
      <p className="mb-6 text-muted-foreground max-w-2xl">
        Market segments at-a-glance, with actionable insights from leading performers.
      </p>
      <section className="mb-8">
        <Card className="bg-gradient-to-br from-green-50 to-white dark:from-neutral-900 dark:to-neutral-800 shadow-lg">
          <CardHeader>
            <CardTitle>Segment Analytics (ROI)</CardTitle>
          </CardHeader>
          <CardContent>
            <SegmentChart data={segmentPulseMockData.segmentMetrics} />
          </CardContent>
        </Card>
      </section>
      <section>
        <Card className="bg-gradient-to-br from-lime-50 to-white dark:from-neutral-900 dark:to-neutral-800 shadow-lg">
          <CardHeader>
            <CardTitle>Leader Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {segmentPulseMockData.leaderInsights.map((insight) => (
                <li key={insight.segment} className="flex flex-col sm:flex-row sm:items-center justify-between bg-white/80 dark:bg-black/40 rounded-lg p-3 shadow">
                  <span className="font-semibold">{insight.segment}</span>
                  <span className="text-muted-foreground">Top: <b>{insight.topPerformer}</b></span>
                  <span className="text-green-600">{insight.growth}</span>
                  <span className="text-xs text-muted-foreground sm:ml-4">{new Date(insight.lastUpdated).toLocaleString()}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
