'use client';

import { Card, CardContent } from '@/components/ui/card';
import { overviewMetrics } from '@/data/dashboard';
import { TrendingUp } from 'lucide-react';

export default function Overview() {
  return (
    <div className="w-full flex flex-col gap-2 items-start">
      <h2 className="font-sans font-bold text-xl leading-6 -tracking-[0.01em] text-text-main m-0">Overview</h2>

      <div className="w-full flex items-start gap-2 flex-wrap">
        {overviewMetrics.map((metric) => (
          <div key={metric.title} className="min-w-[214px] h-24 bg-white border border-border-subtle rounded-lg box-border flex flex-col p-4 gap-3 grow">
            <div className="flex flex-col gap-1 w-[182px] h-10">
              <span className="font-sans font-normal text-xs leading-[14px] text-text-muted">{metric.title}</span>
              <span className="font-sans font-medium text-lg leading-[22px] text-text-main">{metric.value}</span>
            </div>

            <span className="font-sans font-normal text-[10px] leading-3 text-success-text">{metric.delta}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
