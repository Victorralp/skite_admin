'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { cn } from '@/lib/utils';

const revenueData = [
  { day: '1', revenue: 2400000 },
  { day: '3', revenue: 1800000 },
  { day: '5', revenue: 3200000 },
  { day: '7', revenue: 2800000 },
  { day: '9', revenue: 4100000 },
  { day: '11', revenue: 3600000 },
  { day: '13', revenue: 4800000 },
  { day: '15', revenue: 5200000 },
  { day: '17', revenue: 4400000 },
  { day: '19', revenue: 6100000 },
  { day: '21', revenue: 5800000 },
  { day: '23', revenue: 6400000 },
  { day: '25', revenue: 7200000 },
  { day: '27', revenue: 6800000 },
  { day: '29', revenue: 7800000 },
  { day: '30', revenue: 8200000 }
];

const formatCurrency = (value: number) => {
  if (value >= 1000000) {
    return `₦${(value / 1000000).toFixed(1)}M`;
  }
  return `₦${(value / 1000).toFixed(0)}K`;
};

export default function RevenueTrend() {
  return (
    <section className="w-full">
      <Card className="w-full min-h-[285px] rounded-lg p-0 bg-white border-none shadow-none">
        <CardContent className="p-4 flex flex-col gap-2 h-full">
          <div className="w-full h-[30px] flex justify-between items-center">
            <div className="font-sans text-xs font-medium leading-none tracking-normal text-text-main">Daily Revenue</div>

            {/* Custom Dropdown Trigger & Menu */}
            <div className="relative group">
              {/* Trigger Button */}
              <button className="w-[69px] h-[30px] flex items-center py-[5px] pl-2.5 pr-[7px] bg-white border border-border-subtle rounded-lg shadow-[0px_1px_4.8px_rgba(0,0,0,0.03)] cursor-pointer gap-1">
                <span className="font-sans font-normal text-xs leading-[14px] text-text-muted whitespace-nowrap">Today</span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M5.83337 7.5L10 11.6667L14.1667 7.5H5.83337Z" fill="#5F5971" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              <div className="hidden group-hover:flex absolute right-0 top-[34px] z-50 rounded-lg flex-col overflow-hidden bg-white w-[114px] h-[165px] border border-border-subtle shadow-[0px_116px_46px_rgba(0,0,0,0.01),0px_65px_39px_rgba(0,0,0,0.05),0px_29px_29px_rgba(0,0,0,0.09),0px_7px_16px_rgba(0,0,0,0.1)] p-0">
                {['Today', 'Yesterday', 'Last 7 days', 'Last 30 days', 'Custom'].map((item, i) => (
                  <div key={item} className={cn(
                    "w-[114px] h-[33px] flex items-center px-4 py-2 gap-2.5 bg-white cursor-pointer hover:bg-surface",
                    i < 4 && "border-b border-border-subtle"
                  )}>
                    <span className="font-sans font-normal text-[13.5px] leading-4 text-text-muted">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="w-full h-0 border border-border-subtle"></div>
          <div className="h-[207px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6ac19a" stopOpacity={0.25} />
                    <stop offset="100%" stopColor="#6ac19a" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                  tickFormatter={formatCurrency}
                  width={60}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                  }}
                  labelStyle={{ color: 'hsl(var(--muted-foreground))', marginBottom: 4 }}
                  formatter={(value: number | undefined) => [formatCurrency(value || 0), 'Revenue']}
                  labelFormatter={(label) => `Day ${label}`}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#6ac19a"
                  strokeWidth={2}
                  fill="url(#revenueGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
