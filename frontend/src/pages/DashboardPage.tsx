import { FileText, TrendingUp, Target, Users, ArrowUpRight, ArrowDownRight, Clock, CheckCircle2, AlertCircle, Eye, BarChart3, Upload } from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import Card from '@/components/ui/Card';
import StatusBadge from '@/components/ui/StatusBadge';
import { dashboardAreaData, dashboardBarData, recentDocs } from '@/data/mockData';

const stats = [
  {
    label: 'Total Documents',
    value: '2,847',
    change: '+12.5%',
    up: true,
    icon: FileText,
    color: '#1F7A63',
    bg: '#1F7A6310',
    desc: 'All time processed',
  },
  {
    label: 'Documents Today',
    value: '148',
    change: '+8.2%',
    up: true,
    icon: TrendingUp,
    color: '#3B82F6',
    bg: '#3B82F610',
    desc: 'Since midnight',
  },
  {
    label: 'Extraction Accuracy',
    value: '98.5%',
    change: '+2.1%',
    up: true,
    icon: Target,
    color: '#F59E0B',
    bg: '#F59E0B10',
    desc: '30-day average',
  },
  {
    label: 'Active Users',
    value: '34',
    change: '-3.1%',
    up: false,
    icon: Users,
    color: '#8B5CF6',
    bg: '#8B5CF610',
    desc: 'This month',
  },
];

const pieData = [
  { name: 'Aadhaar', value: 35, color: '#1F7A63' },
  { name: 'PAN Card', value: 25, color: '#22C55E' },
  { name: 'Invoice', value: 20, color: '#3B82F6' },
  { name: 'Certificate', value: 15, color: '#F59E0B' },
  { name: 'Other', value: 5, color: '#8B5CF6' },
];

const recentActivity = [
  { action: 'Uploaded 5 invoices', user: 'Rahul S.', time: '2 min ago', icon: Upload, color: '#1F7A63' },
  { action: 'Exported CSV report', user: 'Priya D.', time: '15 min ago', icon: BarChart3, color: '#3B82F6' },
  { action: 'Processed PAN card batch', user: 'Amit K.', time: '1 hr ago', icon: CheckCircle2, color: '#22C55E' },
  { action: 'Failed extraction — retrying', user: 'System', time: '2 hr ago', icon: AlertCircle, color: '#EF4444' },
  { action: 'New user joined team', user: 'Admin', time: '3 hr ago', icon: Users, color: '#8B5CF6' },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-dark">Dashboard</h1>
          <p className="text-sm text-gray mt-1">
            Welcome back, Rahul! Here's your document processing overview.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-green-50 text-green-600 text-xs font-semibold px-3 py-2 rounded-lg border border-green-100">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> System Online
          </div>
          <select className="bg-white border border-border rounded-lg px-3 py-2 text-sm text-gray focus:outline-none focus:ring-2 focus:ring-primary-dark/20">
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>Last 90 Days</option>
            <option>This Year</option>
          </select>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Card key={s.label} className="p-5 hover:shadow-lg transition-shadow group">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform" style={{ background: s.bg }}>
                <s.icon className="w-6 h-6" style={{ color: s.color }} />
              </div>
              <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${s.up ? 'text-green-600 bg-green-50' : 'text-red-500 bg-red-50'}`}>
                {s.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {s.change}
              </div>
            </div>
            <p className="text-3xl font-extrabold text-dark mb-1">{s.value}</p>
            <p className="text-sm font-medium text-dark mb-0.5">{s.label}</p>
            <p className="text-xs text-gray">{s.desc}</p>
          </Card>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Area chart — 2 cols */}
        <Card className="lg:col-span-2 p-5">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-sm font-semibold text-dark">Documents Processed Over Time</h3>
              <p className="text-xs text-gray mt-0.5">Daily processing volume trend</p>
            </div>
            <div className="flex items-center gap-1 bg-primary-soft rounded-lg p-1">
              <button className="text-xs px-3 py-1.5 rounded-md bg-white shadow-sm text-dark font-medium">Weekly</button>
              <button className="text-xs px-3 py-1.5 rounded-md text-gray hover:text-dark">Monthly</button>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={dashboardAreaData}>
              <defs>
                <linearGradient id="colorDocs" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1F7A63" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#1F7A63" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#6B7280' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#6B7280' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #E5E7EB', fontSize: '13px', boxShadow: '0 10px 25px rgba(0,0,0,0.08)' }} />
              <Area type="monotone" dataKey="docs" stroke="#1F7A63" strokeWidth={2.5} fill="url(#colorDocs)" dot={{ r: 4, fill: '#1F7A63' }} />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* Pie chart */}
        <Card className="p-5">
          <h3 className="text-sm font-semibold text-dark mb-1">Document Types</h3>
          <p className="text-xs text-gray mb-4">Distribution of processed documents</p>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={4} dataKey="value">
                {pieData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #E5E7EB', fontSize: '12px' }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {pieData.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: item.color }} />
                  <span className="text-gray">{item.name}</span>
                </div>
                <span className="font-semibold text-dark">{item.value}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Bar chart + Activity */}
      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-5">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-sm font-semibold text-dark">Extraction Success Rate</h3>
              <p className="text-xs text-gray mt-0.5">Success vs failed extractions per day</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={dashboardBarData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#6B7280' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#6B7280' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #E5E7EB', fontSize: '13px', boxShadow: '0 10px 25px rgba(0,0,0,0.08)' }} />
              <Bar dataKey="success" fill="#22C55E" radius={[4, 4, 0, 0]} name="Success %" />
              <Bar dataKey="failed" fill="#FCA5A5" radius={[4, 4, 0, 0]} name="Failed %" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Recent Activity */}
        <Card className="p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-sm font-semibold text-dark">Recent Activity</h3>
              <p className="text-xs text-gray mt-0.5">Team activity feed</p>
            </div>
            <button className="text-xs text-primary-dark font-semibold hover:underline">View All</button>
          </div>
          <div className="space-y-4">
            {recentActivity.map((a, i) => (
              <div key={i} className="flex items-start gap-3 group">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: a.color + '12' }}>
                  <a.icon className="w-4 h-4" style={{ color: a.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-dark truncate">{a.action}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] text-gray">{a.user}</span>
                    <span className="text-[10px] text-gray">•</span>
                    <span className="text-[10px] text-gray flex items-center gap-1"><Clock className="w-2.5 h-2.5" />{a.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Recent documents */}
      <Card className="overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <div>
            <h3 className="text-sm font-semibold text-dark">Recent Documents</h3>
            <p className="text-xs text-gray mt-0.5">Latest processed documents and their status</p>
          </div>
          <button className="text-xs text-primary-dark font-semibold hover:underline flex items-center gap-1">
            View All <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-primary-soft/70">
                <th className="text-left py-3 px-5 text-xs font-medium text-gray uppercase tracking-wider">Document</th>
                <th className="text-left py-3 px-5 text-xs font-medium text-gray uppercase tracking-wider">Type</th>
                <th className="text-left py-3 px-5 text-xs font-medium text-gray uppercase tracking-wider">Language</th>
                <th className="text-left py-3 px-5 text-xs font-medium text-gray uppercase tracking-wider">Status</th>
                <th className="text-left py-3 px-5 text-xs font-medium text-gray uppercase tracking-wider">Time</th>
                <th className="text-left py-3 px-5 text-xs font-medium text-gray uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody>
              {[
                ...recentDocs,
                { name: 'Birth Certificate — Baby Kumar', type: 'Certificate', status: 'Completed' as const, time: '45 min ago', lang: 'Hindi' },
                { name: 'GST Invoice — Sharma Traders', type: 'Invoice', status: 'Completed' as const, time: '1 hr ago', lang: 'English' },
                { name: 'Driving License — Amit J.', type: 'ID Document', status: 'Processing' as const, time: '2 hr ago', lang: 'English' },
              ].map((doc, i) => (
                <tr key={i} className="border-t border-gray-50 hover:bg-primary-soft/30 transition">
                  <td className="py-3.5 px-5 font-medium text-dark flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary-deep/5 flex items-center justify-center flex-shrink-0">
                      <FileText className="w-4 h-4 text-primary-dark" />
                    </div>
                    <span className="truncate max-w-[200px]">{doc.name}</span>
                  </td>
                  <td className="py-3.5 px-5 text-gray text-xs">{doc.type}</td>
                  <td className="py-3.5 px-5 text-gray text-xs">{'lang' in doc ? doc.lang : 'English'}</td>
                  <td className="py-3.5 px-5"><StatusBadge status={doc.status} /></td>
                  <td className="py-3.5 px-5 text-gray text-xs">{doc.time}</td>
                  <td className="py-3.5 px-5">
                    <button className="p-1.5 rounded-lg hover:bg-primary-deep/10 text-gray hover:text-primary-dark transition" title="View">
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between px-5 py-3 border-t border-border bg-primary-soft/30">
          <p className="text-xs text-gray">Showing 8 of 2,847 documents</p>
          <div className="flex items-center gap-1">
            {[1, 2, 3, '...', 142].map((p, i) => (
              <button
                key={i}
                className={`w-8 h-8 rounded-lg text-xs font-medium transition ${
                  p === 1 ? 'bg-primary-dark text-white' : 'hover:bg-gray-100 text-gray'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
