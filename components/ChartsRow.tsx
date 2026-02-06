'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
  Legend
} from 'recharts';
import { transactionVolume, transactionLabels, pieLegend } from '@/data/dashboard';

const barData = transactionLabels.map((label, index) => ({
  time: label,
  volume: transactionVolume[index]
}));

const pieData = pieLegend.map((item) => ({
  name: item.label,
  value: parseInt(item.value),
  color: item.color
}));

import CustomDropdown from '@/components/ui/CustomDropdown';

// ... (imports remain same, ensure CustomDropdown is imported or available)

export default function ChartsRow() {
  return (
    <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', width: '100%' }}>
      {/* Transaction Volume Bar Chart */}
      <Card style={{ flex: '2 1 600px', height: '281px', borderRadius: '8px', background: '#FFFFFF', padding: 0 }}>
        <CardContent style={{ paddingTop: '16px', paddingRight: '16px', paddingBottom: '12px', paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '8px', height: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontFamily: 'Neue Montreal', fontSize: '12px', fontWeight: 500, lineHeight: '100%', letterSpacing: '0%', color: '#2B2834' }}>Transaction Volume</h3>
            <CustomDropdown options={['Today', 'Yesterday', 'Last 7 days']} defaultLabel="Today" />
          </div>
          <div style={{ width: '100%', height: '0px', border: '1px solid #EBEBEB' }}></div>
          <div className="h-[207px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                {/* ... chart details ... */}
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6b4dff" />
                    <stop offset="100%" stopColor="#cbbcff" />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis
                  dataKey="time"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
                  width={40}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                  }}
                  cursor={{ fill: 'hsl(var(--muted) / 0.3)' }}
                />
                <Bar
                  dataKey="volume"
                  fill="url(#barGradient)"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Revenue Breakdown Pie Chart */}
      <Card style={{ flex: '1 1 350px', height: '281px', borderRadius: '8px', padding: 0 }}>
        <CardContent style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px', height: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontFamily: 'Neue Montreal', fontSize: '12px', fontWeight: 500, lineHeight: '100%', letterSpacing: '0%', color: '#2B2834' }}>Revenue Breakdown by Product Type</h3>
            <CustomDropdown options={['Today', 'This Week', 'This Month']} defaultLabel="Today" />
          </div>
          <div style={{ width: '100%', height: '0px', border: '1px solid #EBEBEB' }}></div>
          <div className="flex items-center gap-6">
            <div style={{ width: '187px', height: '187px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={0}
                    outerRadius={90}
                    paddingAngle={0}
                    dataKey="value"
                    stroke="#FFFFFF"
                    strokeWidth={1}
                    cornerRadius={4}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    }}
                    formatter={(value?: number) => [`${value}%`, '']}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 space-y-3">
              {pieLegend.map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <span
                    className="flex-shrink-0"
                    style={{ width: '12px', height: '12px', borderRadius: '4px', background: item.color }}
                  />
                  <div className="text-sm flex items-center">
                    <span style={{
                      fontFamily: 'Neue Montreal',
                      fontWeight: 400,
                      fontSize: '12px',
                      lineHeight: '100%',
                      letterSpacing: '0%',
                      color: '#000000'
                    }} className="mr-2">{item.label}</span>
                    <span className="text-[#989898]">{item.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
