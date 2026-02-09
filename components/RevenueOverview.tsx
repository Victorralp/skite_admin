'use client';

import { Card, CardContent } from '@/components/ui/card';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import CustomDropdown from '@/components/ui/CustomDropdown';

// Revenue Trend Data
const revenueTrendData = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  revenue: Math.floor(Math.random() * 2000000) + 2000000
}));

// Transaction Volume Data
const transactionVolumeData = Array.from({ length: 15 }, (_, i) => ({
  day: i + 1,
  volume: Math.floor(Math.random() * 600) + 600
}));

// Revenue Breakdown Data
const revenueBreakdownData = [
  { name: 'Courses', value: 46, color: '#FFBEDD' },
  { name: 'eBooks', value: 22, color: '#FF9A9A' },
  { name: 'Webinars', value: 18, color: '#9DAAFF' },
  { name: 'Templates', value: 14, color: '#9AC3FF' }
];

const formatCurrency = (value: number) => {
  if (value >= 1000000) {
    return `₦${(value / 1000000).toFixed(0)}M`;
  }
  return `₦${(value / 1000).toFixed(0)}K`;
};

export default function RevenueOverview() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 w-full">
      {/* Revenue Trend Title */}
      <h3 className="font-['Neue_Montreal'] font-medium text-base leading-[19px] text-[#2B2834] w-full z-10">
        Revenue Trend
      </h3>

      {/* Charts Container */}
      <div className="flex flex-col items-start gap-1 w-full bg-[#F9F9FB] rounded-xl p-1">
        {/* Daily Revenue Chart */}
        <Card className="w-full min-h-[285px] rounded-lg bg-white border-none shadow-none">
          <CardContent className="p-4 flex flex-col gap-2">
            <div className="flex justify-between items-center h-[30px]">
              <span className="font-['Neue_Montreal'] font-medium text-xs leading-none text-[#2B2834]">
                Daily Revenue
              </span>
              <CustomDropdown
                options={['Today', 'Last 7 days', 'Last 30 days', 'Last 90 days']}
                defaultLabel="Last 30 days"
                width="103px"
              />
            </div>
            <div className="w-full h-0 border border-[#EBEBEB]" />
            <div className="h-[207px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueTrendData}>
                  <defs>
                    <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="rgba(71, 166, 99, 0.052)" />
                      <stop offset="100%" stopColor="rgba(71, 166, 99, 0)" />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#EBEBEB" vertical={false} opacity={0.1} />
                  <XAxis
                    dataKey="day"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#A5A1AF', fontSize: 12 }}
                    ticks={[1, 15, 30]}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#A5A1AF', fontSize: 12 }}
                    tickFormatter={formatCurrency}
                    ticks={[0, 2000000, 4000000]}
                    width={40}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #EBEBEB',
                      borderRadius: '8px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    }}
                    formatter={(value: number | undefined) => [formatCurrency(value || 0), 'Revenue']}
                    labelFormatter={(label) => `Day ${label}`}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#47A663"
                    strokeWidth={2}
                    fill="url(#revenueGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Transaction Volume and Revenue Breakdown Row */}
        <div className="flex flex-row items-center gap-1 w-full">
          {/* Transaction Volume Chart */}
          <Card className="flex-[2_1_600px] h-[281px] rounded-lg bg-white border-none shadow-none">
            <CardContent className="p-4 flex flex-col gap-2">
              <div className="flex justify-between items-center h-[30px]">
                <span className="font-['Neue_Montreal'] font-medium text-xs leading-none text-[#2B2834]">
                  Transaction Volume
                </span>
                <CustomDropdown
                  options={['Today', 'This week', 'This month', 'This year']}
                  defaultLabel="This month"
                  width="94px"
                />
              </div>
              <div className="w-full h-0 border border-[#EBEBEB]" />
              <div className="h-[207px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={transactionVolumeData}>
                    <defs>
                      <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="rgba(219, 216, 228, 0.3)" />
                        <stop offset="100%" stopColor="#DBD8E4" />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#D9D9D9" vertical={false} opacity={0.1} />
                    <XAxis
                      dataKey="day"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#A5A1AF', fontSize: 12 }}
                      ticks={[1, 15, 30]}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#A5A1AF', fontSize: 12 }}
                      ticks={[0, 600, 1200]}
                      width={40}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #EBEBEB',
                        borderRadius: '8px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                      }}
                      cursor={{ fill: 'rgba(0,0,0,0.05)' }}
                    />
                    <Bar
                      dataKey="volume"
                      fill="url(#barGradient)"
                      radius={[4, 4, 1, 1]}
                      maxBarSize={40}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Revenue Breakdown Pie Chart */}
          <Card className="flex-[1_1_350px] h-[281px] rounded-lg bg-white border-none shadow-none">
            <CardContent className="p-4 flex flex-col gap-2">
              <div className="flex justify-between items-center h-[30px]">
                <span className="font-['Neue_Montreal'] font-medium text-xs leading-none text-[#2B2834]">
                  Revenue Breakdown by Product Type
                </span>
                <CustomDropdown
                  options={['Today', 'This week', 'This month', 'All time']}
                  defaultLabel="All time"
                  width="74px"
                />
              </div>
              <div className="w-full h-0 border border-[#EBEBEB]" />
              <div className="flex items-center justify-center gap-8 py-2 px-3 h-[203px]">
                <div className="w-[187px] h-[187px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={revenueBreakdownData}
                        cx="50%"
                        cy="50%"
                        innerRadius={10}
                        outerRadius={93}
                        paddingAngle={0}
                        dataKey="value"
                        stroke="#FFFFFF"
                        strokeWidth={1}
                      >
                        {revenueBreakdownData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#FFFFFF',
                          border: '1px solid #EBEBEB',
                          borderRadius: '8px',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                        }}
                        formatter={(value: number | undefined) => [`${value || 0}%`, '']}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex flex-col justify-center items-start gap-[17px]">
                  {revenueBreakdownData.map((item) => (
                    <div key={item.name} className="flex items-center gap-1">
                      <div
                        className="w-3 h-3 rounded"
                        style={{ backgroundColor: item.color }}
                      />
                      <div className="flex items-center gap-[5px]">
                        <span className="font-['Neue_Montreal'] font-normal text-xs leading-none text-black">
                          {item.name}
                        </span>
                        <span className="font-['Neue_Montreal'] font-normal text-xs leading-none text-black/40">
                          {item.value}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
