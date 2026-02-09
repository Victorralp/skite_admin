'use client';

import { useState } from 'react';
import LogsTable from './LogsTable';

type LogCategory = 'Admin Actions' | 'System Events' | 'Authentication Logs';

export default function LogsOverview() {
  const [activeCategory, setActiveCategory] = useState<LogCategory>('Authentication Logs');

  const categories: LogCategory[] = ['Admin Actions', 'System Events', 'Authentication Logs'];

  return (
    <div className="flex flex-col items-start gap-6 w-full max-w-[1230px]">
      {/* Page Title */}
      <h1 className="font-['Neue_Montreal'] font-bold text-[20px] leading-[24px] tracking-[-0.01em] text-[#2B2834]">
        Logs
      </h1>

      {/* Category Tabs */}
      <div className="flex flex-row items-center gap-2 w-full">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`flex flex-row justify-center items-center px-4 py-2 gap-2.5 flex-1 h-8 rounded-md transition-colors ${
              activeCategory === category
                ? 'bg-white border border-[#5F2EFC]'
                : 'bg-white border border-[#EBEBEB]'
            }`}
          >
            <span
              className={`font-['Neue_Montreal'] text-[13.5px] leading-4 ${
                activeCategory === category
                  ? 'font-medium text-[#5F2EFC]'
                  : 'font-normal text-[#5F5971]'
              }`}
            >
              {category}
            </span>
          </button>
        ))}
      </div>

      {/* Logs Table */}
      <LogsTable category={activeCategory} />
    </div>
  );
}
