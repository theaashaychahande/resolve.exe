import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
} from 'recharts';
import Card from '@/components/ui/Card';
import {
  dailyDocsData,
  docTypeData,
  PIE_COLORS,
  langDistData,
  LANG_COLORS,
  monthlyTrendData,
} from '@/data/mockData';

const summaryCards = [
  { label: 'Total This Week', value: '404', sub: '+12% vs last week' },
  { label: 'Avg. per Day', value: '57.7', sub: 'Documents processed' },
  { label: 'Peak Day', value: 'Thursday', sub: '89 documents' },
  { label: 'Success Rate', value: '96.8%', sub: '+1.2% improvement' },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-black">Analytics</h1>
        <p className="text-sm text-gray mt-1">
          Insights and statistics about your document processing.
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid sm:grid-cols-4 gap-4">
        {summaryCards.map((c) => (
          <Card key={c.label} className="p-5">
            <p className="text-sm text-gray mb-1">{c.label}</p>
            <p className="text-2xl font-bold text-black">{c.value}</p>
            <p className="text-xs text-primary-dark font-medium mt-1">{c.sub}</p>
          </Card>
        ))}
      </div>

      {/* Charts grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Daily documents */}
        <Card className="p-5">
          <h3 className="text-sm font-semibold text-dark mb-4">Documents Processed Per Day</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={dailyDocsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis
                dataKey="day"
                tick={{ fontSize: 12, fill: '#6B7280' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 12, fill: '#6B7280' }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: '12px',
                  border: '1px solid #E5E7EB',
                  fontSize: '13px',
                }}
              />
              <Bar dataKey="docs" fill="#1F7A63" radius={[6, 6, 0, 0]} name="Documents" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Document types */}
        <Card className="p-5">
          <h3 className="text-sm font-semibold text-dark mb-4">
            Most Extracted Document Types
          </h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={docTypeData}
                cx="50%"
                cy="50%"
                innerRadius={65}
                outerRadius={100}
                paddingAngle={4}
                dataKey="value"
              >
                {docTypeData.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  borderRadius: '12px',
                  border: '1px solid #E5E7EB',
                  fontSize: '13px',
                }}
              />
              <Legend
                verticalAlign="bottom"
                iconType="circle"
                iconSize={8}
                formatter={(value: string) => (
                  <span className="text-xs text-gray-600">{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* Language distribution */}
        <Card className="p-5">
          <h3 className="text-sm font-semibold text-dark mb-4">Language Distribution</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={langDistData}
                cx="50%"
                cy="50%"
                innerRadius={65}
                outerRadius={100}
                paddingAngle={4}
                dataKey="value"
              >
                {langDistData.map((_, i) => (
                  <Cell key={i} fill={LANG_COLORS[i]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  borderRadius: '12px',
                  border: '1px solid #E5E7EB',
                  fontSize: '13px',
                }}
              />
              <Legend
                verticalAlign="bottom"
                iconType="circle"
                iconSize={8}
                formatter={(value: string) => (
                  <span className="text-xs text-gray-600">{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* Monthly trend */}
        <Card className="p-5">
          <h3 className="text-sm font-semibold text-dark mb-4">Monthly Trend</h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={monthlyTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 12, fill: '#6B7280' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                yAxisId="left"
                tick={{ fontSize: 12, fill: '#6B7280' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                domain={[90, 100]}
                tick={{ fontSize: 12, fill: '#6B7280' }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: '12px',
                  border: '1px solid #E5E7EB',
                  fontSize: '13px',
                }}
              />
              <Legend
                iconType="circle"
                iconSize={8}
                formatter={(value: string) => (
                  <span className="text-xs text-gray-600">{value}</span>
                )}
              />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="docs"
                stroke="#1F7A63"
                strokeWidth={2.5}
                dot={{ r: 4, fill: '#1F7A63' }}
                name="Documents"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="accuracy"
                stroke="#22C55E"
                strokeWidth={2.5}
                dot={{ r: 4, fill: '#22C55E' }}
                name="Accuracy %"
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
}
