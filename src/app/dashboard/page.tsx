
import dashboardMockData from '@/utils/mock-data/dashboard'
import { KpiCard } from '@/components/ui/kpi-card'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function DashboardPage() {
  return (
    <main className="px-4 py-8 md:px-16 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-2 tracking-tight">Executive Dashboard</h1>
      <p className="mb-6 text-muted-foreground max-w-2xl">
        Strategic KPIs, real-time alerts, and recent activity for rapid decision making.
      </p>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {dashboardMockData.kpis.map((kpi) => (
          <KpiCard
            key={kpi.id}
            label={kpi.label}
            value={kpi.value}
            trend={kpi.trend}
            change={kpi.change}
            unit={kpi.unit}
          />
        ))}
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Alerts */}
        <Card className="bg-gradient-to-br from-red-50 to-white dark:from-neutral-900 dark:to-neutral-800 shadow-lg">
          <CardHeader>
            <CardTitle>Alerts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {dashboardMockData.alerts.map((alert) => (
              <Alert key={alert.id} variant={alert.type === 'critical' ? 'destructive' : alert.type}>
                <Badge variant={
                  alert.type === 'critical'
                    ? 'destructive'
                    : alert.type === 'warning'
                      ? 'warning'
                      : 'secondary'
                }>
                  {alert.type.toUpperCase()}
                </Badge>
                <AlertTitle className="mt-1">{alert.message}</AlertTitle>
                <AlertDescription className="text-xs text-muted-foreground">
                  {new Date(alert.timestamp).toLocaleString()}
                </AlertDescription>
              </Alert>
            ))}
          </CardContent>
        </Card>
        {/* Recent Actions */}
        <Card className="bg-gradient-to-br from-slate-100 to-white dark:from-neutral-900 dark:to-neutral-800 shadow-lg">
          <CardHeader>
            <CardTitle>Recent Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="divide-y divide-muted">
              {dashboardMockData.actions.map((action) => (
                <li key={action.id} className="py-3 flex items-center justify-between">
                  <span>
                    <span className="font-semibold">{action.user}</span>{' '}
                    <span className="text-muted-foreground">{action.action}</span>
                  </span>
                  <span className={`text-xs ml-2 ${action.status === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                    {action.status.charAt(0).toUpperCase() + action.status.slice(1)}
                  </span>
                  <span className="ml-4 text-xs text-muted-foreground">
                    {new Date(action.timestamp).toLocaleString()}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
