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
    <div className="flex gap-1 flex-wrap w-full">
      {/* Transaction Volume Bar Chart */}
      <Card className="flex-[2_1_600px] h-[281px] rounded-lg bg-white p-0 border-none shadow-none">
        <CardContent className="pt-4 pr-4 pb-3 pl-4 flex flex-col gap-2 h-full">
          <div className="flex justify-between items-center">
            <h3 className="font-sans text-xs font-medium leading-none tracking-normal text-text-main">Transaction Volume</h3>
            <CustomDropdown options={['Today', 'Yesterday', 'Last 7 days']} defaultLabel="Today" />
          </div>
          <div className="w-full h-0 border border-border-subtle"></div>
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
      <Card className="flex-[1_1_350px] h-[281px] rounded-lg p-0 border-none shadow-none">
        <CardContent className="p-4 flex flex-col gap-2 h-full">
          <div className="flex justify-between items-center">
            <h3 className="font-sans text-xs font-medium leading-none tracking-normal text-text-main">Revenue Breakdown by Product Type</h3>
            <CustomDropdown options={['Today', 'This Week', 'This Month']} defaultLabel="Today" />
          </div>
          <div className="w-full h-0 border border-border-subtle"></div>
          <div className="flex items-center gap-6">
            <div className="w-[187px] h-[187px]">
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
                    className="flex-shrink-0 w-3 h-3 rounded bg-[var(--item-color)]"
                    style={{ backgroundColor: item.color } as React.CSSProperties}
                  />
                  <div className="text-sm flex items-center">
                    <span className="mr-2 font-sans font-normal text-xs leading-none tracking-normal text-black">{item.label}</span>
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
