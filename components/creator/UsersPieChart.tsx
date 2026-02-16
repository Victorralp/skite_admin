'use client';

import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Creators', value: 14, color: '#FC552E' },
  { name: 'Users', value: 86, color: '#4682B8' }
];

const TOTAL_USERS = 1248;

export default function UsersPieChart() {
  return (
    <div className="flex min-h-[271px] w-full flex-col items-center justify-center gap-4 rounded-xl border border-border-primary bg-white p-6">
      <div className="relative aspect-square w-full max-w-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              startAngle={90}
              endAngle={450}
              innerRadius={60}
              outerRadius={95}
              paddingAngle={1}
              dataKey="value"
              stroke="#FFFFFF"
              strokeWidth={1}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color}
                  stroke="#FFFFFF"
                  strokeWidth={1}
                  style={{ borderRadius: '4px', opacity: 1 }}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-sans text-[18px] font-bold leading-[22px] text-text-primary">
            {TOTAL_USERS.toLocaleString()}
          </span>
          <span className="font-sans text-caption-lg-regular text-[rgba(0,0,0,0.4)]">
            Users
          </span>
        </div>
      </div>

      <div className="flex w-full flex-wrap items-center justify-center gap-4">
        <div className="flex items-center gap-1">
          <div className="h-3 w-3 rounded bg-[#4682B8]" />
          <div className="flex items-center gap-1">
            <span className="font-sans text-caption-lg-regular text-black">Users</span>
            <span className="font-sans text-caption-lg-regular text-[rgba(0,0,0,0.4)]">86%</span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <div className="h-3 w-3 rounded bg-[#FC552E]" />
          <div className="flex items-center gap-1">
            <span className="font-sans text-caption-lg-regular text-black">Creators</span>
            <span className="font-sans text-caption-lg-regular text-[rgba(0,0,0,0.4)]">14%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
