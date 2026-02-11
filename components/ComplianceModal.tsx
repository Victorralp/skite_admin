'use client';

import { X, ExternalLink } from 'lucide-react';
import { useState } from 'react';

interface ComplianceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ComplianceModal({ isOpen, onClose }: ComplianceModalProps) {
  const [userDataRetention, setUserDataRetention] = useState('2 Years');
  const [transactionLogsRetention, setTransactionLogsRetention] = useState('7 Years');
  const [contentRetention, setContentRetention] = useState('90 days');
  const [profanityFilter, setProfanityFilter] = useState(true);
  const [autoRemoveContent, setAutoRemoveContent] = useState(true);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end"
      onClick={onClose}
    >
      <div 
        className="flex flex-col items-start w-[400px] h-full bg-white shadow-xl overflow-hidden animate-slide-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex flex-col items-start px-6 py-6 gap-4 w-full">
          <div className="flex flex-row justify-between items-start w-full">
            <button
              onClick={onClose}
              className="flex flex-row items-center px-2 py-1.5 gap-1.5 bg-surface-secondary rounded-md hover:bg-gray-200 transition-colors"
            >
              <X className="w-4 h-4 text-text-primary" strokeWidth={1.5} />
              <span className="text-body-sm text-[#17181C]">
                Close
              </span>
            </button>

            <button className="flex flex-row justify-center items-center px-4 py-1.5 h-7 bg-gradient-to-b from-brand-primary to-brand-purple rounded-lg shadow-button-inset hover:opacity-90 transition-opacity">
              <span className="text-body-sm text-white">
                Save
              </span>
            </button>
          </div>

          <h2 className="text-lg font-bold leading-[22px] text-[#17181C]">
            Compliance Settings
          </h2>
        </div>

        <div className="w-full h-px border-t border-border-secondary" />

        {/* Content */}
        <div className="flex flex-col items-center px-6 py-6 gap-2 w-full overflow-y-auto">
          {/* Privacy Policy */}
          <div className="flex flex-col items-start p-4 gap-3 w-full bg-surface-secondary rounded-lg">
            <h3 className="text-[13.5px] font-bold leading-4 text-text-primary w-full">
              Privacy Policy
            </h3>

            <div className="flex flex-row items-center gap-3 w-full">
              <div className="flex flex-row items-center gap-0.5 flex-1">
                <a 
                  href="#" 
                  className="text-body-sm text-text-brand underline hover:no-underline"
                >
                  Privacy Policy
                </a>
                <ExternalLink className="w-3.5 h-3.5 text-text-brand" strokeWidth={1} />
              </div>

              <button className="flex flex-row justify-center items-center px-3 py-1.5 h-7 bg-white border border-border-primary rounded-lg shadow-button-inset hover:bg-gray-50 transition-colors">
                <span className="text-body-sm text-[#353A44]">
                  Update Policy
                </span>
              </button>
            </div>
          </div>

          {/* Data Retention */}
          <div className="flex flex-col items-start p-4 gap-2 w-full bg-surface-secondary rounded-lg">
            <h3 className="text-[13.5px] font-bold leading-4 text-text-primary w-full">
              Data Retention
            </h3>

            <div className="flex flex-col items-start w-full">
              {/* User Data */}
              <div className="flex flex-row items-center py-2 gap-4 w-full border-b border-border-primary">
                <label className="text-body-sm-regular text-text-secondary flex-1">
                  User Data
                </label>
                <div className="relative">
                  <select
                    value={userDataRetention}
                    onChange={(e) => setUserDataRetention(e.target.value)}
                    className="appearance-none flex flex-row items-center px-3 py-2 w-[95px] h-[30px] bg-white border border-border-primary shadow-sm rounded-md text-xs font-medium text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-primary cursor-pointer"
                  >
                    <option value="1 Year">1 Year</option>
                    <option value="2 Years">2 Years</option>
                    <option value="3 Years">3 Years</option>
                    <option value="5 Years">5 Years</option>
                  </select>
                  <svg
                    className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none"
                    width="10"
                    height="5"
                    viewBox="0 0 10 5"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M0 0L5 5L10 0H0Z" fill="#DBDBDB" />
                  </svg>
                </div>
              </div>

              {/* Transaction Logs */}
              <div className="flex flex-row items-center py-2 gap-4 w-full border-b border-border-primary">
                <label className="text-body-sm-regular text-text-secondary flex-1">
                  Transaction Logs
                </label>
                <div className="relative">
                  <select
                    value={transactionLogsRetention}
                    onChange={(e) => setTransactionLogsRetention(e.target.value)}
                    className="appearance-none flex flex-row items-center px-3 py-2 w-[95px] h-[30px] bg-white border border-border-primary shadow-sm rounded-md text-xs font-medium text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-primary cursor-pointer"
                  >
                    <option value="5 Years">5 Years</option>
                    <option value="7 Years">7 Years</option>
                    <option value="10 Years">10 Years</option>
                  </select>
                  <svg
                    className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none"
                    width="10"
                    height="5"
                    viewBox="0 0 10 5"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M0 0L5 5L10 0H0Z" fill="#DBDBDB" />
                  </svg>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-row items-center pt-2 gap-4 w-full">
                <label className="text-body-sm-regular text-text-secondary flex-1">
                  Content
                </label>
                <div className="relative">
                  <select
                    value={contentRetention}
                    onChange={(e) => setContentRetention(e.target.value)}
                    className="appearance-none flex flex-row items-center px-3 py-2 w-[95px] h-[30px] bg-white border border-border-primary shadow-sm rounded-md text-xs font-medium text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-primary cursor-pointer"
                  >
                    <option value="30 days">30 days</option>
                    <option value="90 days">90 days</option>
                    <option value="180 days">180 days</option>
                    <option value="1 Year">1 Year</option>
                  </select>
                  <svg
                    className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none"
                    width="10"
                    height="5"
                    viewBox="0 0 10 5"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M0 0L5 5L10 0H0Z" fill="#DBDBDB" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Content Moderation */}
          <div className="flex flex-col items-start p-4 gap-2 w-full bg-surface-secondary rounded-lg">
            <h3 className="text-[13.5px] font-bold leading-4 text-text-primary w-full">
              Content Moderation
            </h3>

            <div className="flex flex-col items-start w-full">
              {/* Profanity Filter */}
              <div className="flex flex-row items-center py-2 gap-4 w-full border-b border-border-primary">
                <label className="text-body-sm-regular text-text-secondary flex-1">
                  Profanity Filter
                </label>
                <button
                  onClick={() => setProfanityFilter(!profanityFilter)}
                  className={`flex flex-row justify-end items-center p-0.5 w-8 h-5 rounded-full transition-colors ${
                    profanityFilter ? 'bg-[#34C759]' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`w-4 h-4 bg-white rounded-full shadow-md transition-transform ${
                      profanityFilter ? 'translate-x-0' : '-translate-x-3'
                    }`}
                  />
                </button>
              </div>

              {/* Auto-remove non-consensual content */}
              <div className="flex flex-row items-center pt-2 gap-4 w-full">
                <label className="text-body-sm-regular text-text-secondary flex-1">
                  Auto-remove non-consensual content
                </label>
                <button
                  onClick={() => setAutoRemoveContent(!autoRemoveContent)}
                  className={`flex flex-row justify-end items-center p-0.5 w-8 h-5 rounded-full transition-colors ${
                    autoRemoveContent ? 'bg-[#34C759]' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`w-4 h-4 bg-white rounded-full shadow-md transition-transform ${
                      autoRemoveContent ? 'translate-x-0' : '-translate-x-3'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}