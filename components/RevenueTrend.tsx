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
    <section style={{ width: '100%' }}>
      <Card style={{ width: '100%', minHeight: '285px', borderRadius: '8px', padding: 0 }}>
        <CardContent style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px', height: '100%' }}>
          <div style={{ width: '100%', height: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontFamily: 'Neue Montreal', fontSize: '12px', fontWeight: 500, lineHeight: '100%', letterSpacing: '0%', color: '#2B2834' }}>Daily Revenue</div>

            {/* Custom Dropdown Trigger & Menu */}
            <div className="relative group">
              {/* Trigger Button */}
              <button style={{
                width: '69px', // Approx width based on text 'Today' + icon
                height: '30px',
                display: 'flex',
                alignItems: 'center',
                padding: '5px 7px 5px 10px',
                backgroundColor: '#FFFFFF',
                border: '1px solid #EBEBEB',
                borderRadius: '8px',
                boxShadow: '0px 1px 4.8px rgba(0, 0, 0, 0.03)',
                cursor: 'pointer',
                gap: '4px'
              }}>
                <span style={{
                  fontFamily: 'Neue Montreal',
                  fontWeight: 400,
                  fontSize: '12px',
                  lineHeight: '14px',
                  color: '#5F5971',
                  whiteSpace: 'nowrap'
                }}>Today</span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M5.83337 7.5L10 11.6667L14.1667 7.5H5.83337Z" fill="#5F5971" />
                </svg>
              </button>

              {/* Dropdown Menu (Hidden by default, shown on hover/focus-within - simplistic implementation for now, or state based if needed. Using group-hover for simplicity per CSS request urgency) */}
              <div className="hidden group-hover:flex absolute right-0 top-[34px] z-50 rounded-[8px] flex-col overflow-hidden bg-white"
                style={{
                  width: '114px',
                  // Height 165px from spec (33px * 5 items)
                  height: '165px',
                  border: '1px solid #EBEBEB',
                  boxShadow: '0px 116px 46px rgba(0, 0, 0, 0.01), 0px 65px 39px rgba(0, 0, 0, 0.05), 0px 29px 29px rgba(0, 0, 0, 0.09), 0px 7px 16px rgba(0, 0, 0, 0.1)',
                  padding: '0px'
                }}
              >
                {['Today', 'Yesterday', 'Last 7 days', 'Last 30 days', 'Custom'].map((item, i) => (
                  <div key={item} style={{
                    width: '114px',
                    height: '33px',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '8px 16px 8px 16px', // "padding: 8px 24px 8px 16px" in spec, adjusted right padding for fit/text
                    gap: '10px',
                    backgroundColor: '#FFFFFF',
                    borderBottom: i < 4 ? '0.2px solid #EBEBEB' : 'none', // Apply separator logic
                    cursor: 'pointer'
                  }} className="hover:bg-gray-50">
                    <span style={{
                      fontFamily: 'Neue Montreal',
                      fontWeight: 400,
                      fontSize: '13.5px',
                      lineHeight: '16px',
                      color: '#5F5971'
                    }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div style={{ width: '100%', height: '0px', border: '1px solid #EBEBEB' }}></div>
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
