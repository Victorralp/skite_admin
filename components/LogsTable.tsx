'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

type LogCategory = 'Admin Actions' | 'System Events' | 'Authentication Logs';

type AdminLogEntry = {
  id: string;
  timestamp: string;
  admin: string;
  section: string;
  action: string;
  target: string;
  details: string;
  ipAddress: string;
};

type SystemEventEntry = {
  id: string;
  timestamp: string;
  eventType: string;
  component: string;
  message: string;
  severity: 'Critical' | 'Warning' | 'Info' | 'Success';
  details: string;
};

type AuthLogEntry = {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  message: string;
  userAgent: string;
  ipAddress: string;
  status: 'Failed' | 'Success';
};

const AUTH_LOG_STORAGE_KEY = 'skite_latest_auth_log';

const adminActionsLogs: AdminLogEntry[] = [
  {
    id: '1',
    timestamp: '12.03.2025 00:23',
    admin: 'Chuka Nwosu',
    section: 'Support Center',
    action: 'End Session',
    target: 'Action targeted to',
    details: 'Breakdown of action',
    ipAddress: '197.210.XX.XX'
  },
  {
    id: '2',
    timestamp: '12.03.2025 00:23',
    admin: 'Iniobong Umoh',
    section: 'Creators',
    action: 'End Session',
    target: 'Action targeted to',
    details: 'Breakdown of action',
    ipAddress: '197.210.XX.XX'
  },
  {
    id: '3',
    timestamp: '12.03.2025 00:23',
    admin: 'Kayode Ajayi',
    section: 'Products',
    action: 'Approve',
    target: 'Action targeted to',
    details: 'Breakdown of action',
    ipAddress: '197.210.XX.XX'
  },
  {
    id: '4',
    timestamp: '12.03.2025 00:23',
    admin: 'Abimbola Adefemi',
    section: 'Live',
    action: 'End Session',
    target: 'Action targeted to',
    details: 'Breakdown of action',
    ipAddress: '197.210.XX.XX'
  },
  {
    id: '5',
    timestamp: '12.03.2025 00:23',
    admin: 'System',
    section: 'Payouts',
    action: 'Reject',
    target: 'Action targeted to',
    details: 'Breakdown of action',
    ipAddress: '197.210.XX.XX'
  }
];

const systemEventsLogs: SystemEventEntry[] = [
  {
    id: '1',
    timestamp: '12.03.2025 00:23',
    eventType: 'Payment',
    component: 'PostgreSQL',
    message: 'Webhook received',
    severity: 'Critical',
    details: 'Breakdown of action'
  },
  {
    id: '2',
    timestamp: '12.03.2025 00:23',
    eventType: 'Milestone',
    component: 'PostgreSQL',
    message: 'Webhook received',
    severity: 'Warning',
    details: 'Breakdown of action'
  },
  {
    id: '3',
    timestamp: '12.03.2025 00:23',
    eventType: 'Payment',
    component: 'PostgreSQL',
    message: 'Webhook received',
    severity: 'Warning',
    details: 'Breakdown of action'
  },
  {
    id: '4',
    timestamp: '12.03.2025 00:23',
    eventType: 'Payment',
    component: 'PostgreSQL',
    message: 'Webhook received',
    severity: 'Info',
    details: 'Breakdown of action'
  },
  {
    id: '5',
    timestamp: '12.03.2025 00:23',
    eventType: 'Database',
    component: 'PostgreSQL',
    message: 'Webhook received',
    severity: 'Success',
    details: 'Breakdown of action'
  }
];

const authenticationLogs: AuthLogEntry[] = [
  {
    id: '1',
    timestamp: '12.03.2025 00:23',
    user: 'Bola Ahmed',
    action: 'Login',
    message: 'Invalid password',
    userAgent: 'Suspicious Bot',
    ipAddress: '197.210.45.67',
    status: 'Failed'
  },
  {
    id: '2',
    timestamp: '12.03.2025 00:23',
    user: 'Bola Ahmed',
    action: 'Login',
    message: 'Login successful',
    userAgent: 'Chrome 120 (Lagos)',
    ipAddress: '197.210.45.67',
    status: 'Success'
  },
  {
    id: '3',
    timestamp: '12.03.2025 00:23',
    user: 'Bola Ahmed',
    action: 'Login',
    message: 'Login successful',
    userAgent: 'Chrome 120 (Lagos)',
    ipAddress: '197.210.45.67',
    status: 'Success'
  },
  {
    id: '4',
    timestamp: '12.03.2025 00:23',
    user: 'Bola Ahmed',
    action: 'Login',
    message: 'Login successful',
    userAgent: 'Chrome 120 (Lagos)',
    ipAddress: '197.210.45.67',
    status: 'Success'
  },
  {
    id: '5',
    timestamp: '12.03.2025 00:23',
    user: 'Bola Ahmed',
    action: 'Login',
    message: 'Login successful',
    userAgent: 'Chrome 120 (Lagos)',
    ipAddress: '197.210.45.67',
    status: 'Success'
  }
];

function parseStoredAuthLog(raw: string | null): AuthLogEntry | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Partial<AuthLogEntry>;
    if (
      typeof parsed.id !== 'string' ||
      typeof parsed.timestamp !== 'string' ||
      typeof parsed.user !== 'string' ||
      typeof parsed.action !== 'string' ||
      typeof parsed.message !== 'string' ||
      typeof parsed.userAgent !== 'string' ||
      typeof parsed.ipAddress !== 'string' ||
      (parsed.status !== 'Failed' && parsed.status !== 'Success')
    ) {
      return null;
    }
    return parsed as AuthLogEntry;
  } catch {
    return null;
  }
}

const AuthStatusBadge = ({ status }: { status: AuthLogEntry['status'] }) => {
  const config = {
    Failed: {
      bg: '#FBECEB',
      color: '#CD110A',
      label: 'Failed',
      icon: (
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path d="M5 0.833L8.333 8.333H1.667L5 0.833Z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M5 3.333V5.833M5 7.5H5.004" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    Success: {
      bg: '#E7F3EF',
      color: '#239B73',
      label: 'Success',
      icon: (
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <circle cx="5" cy="5" r="4.5" stroke="currentColor" strokeWidth="1"/>
          <path d="M3.5 5L4.5 6L6.5 4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    }
  };

  const { bg, color, label, icon } = config[status];

  return (
    <div
      className="flex items-center justify-center gap-0.5 px-1.5 py-0.5 rounded"
      style={{ backgroundColor: bg }}
    >
      <div style={{ color }}>
        {icon}
      </div>
      <span
        className="font-['Neue_Montreal'] font-medium text-[10px] leading-3"
        style={{ color }}
      >
        {label}
      </span>
    </div>
  );
};

const SeverityBadge = ({ severity }: { severity: SystemEventEntry['severity'] }) => {
  const config = {
    Critical: {
      bg: '#FBECEB',
      color: '#CD110A',
      label: 'Critical',
      icon: (
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path d="M5 0.833L8.333 8.333H1.667L5 0.833Z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M5 3.333V5.833M5 7.5H5.004" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    Warning: {
      bg: '#FFF3EB',
      color: '#FB6A00',
      label: 'Warning',
      icon: (
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path d="M4.16676 8.65792C3.8042 8.57531 3.45595 8.43924 3.13342 8.25417M5.83342 1.34375C6.66182 1.53295 7.40144 1.99779 7.9312 2.66217C8.46095 3.32655 8.74944 4.1511 8.74944 5.00083C8.74944 5.85056 8.46095 6.67512 7.9312 7.3395C7.40144 8.00388 6.66182 8.46872 5.83342 8.65792M1.90801 7.12292C1.68096 6.79256 1.50836 6.42793 1.39676 6.04292M1.30176 4.37583C1.36842 3.98 1.49676 3.605 1.67676 3.26125L1.74717 3.13417M2.87801 1.90875C3.26809 1.64078 3.70537 1.44907 4.16676 1.34375M5.00009 3.33417V5.00083M5.00009 6.6675V6.67167" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    Info: {
      bg: '#E7F3EF',
      color: '#239B73',
      label: 'Info',
      icon: (
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <circle cx="5" cy="5" r="4.5" stroke="currentColor" strokeWidth="1"/>
          <path d="M3.5 5L4.5 6L6.5 4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    Success: {
      bg: '#E7F3EF',
      color: '#239B73',
      label: 'Success',
      icon: (
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <circle cx="5" cy="5" r="4.5" stroke="currentColor" strokeWidth="1"/>
          <path d="M3.5 5L4.5 6L6.5 4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    }
  };

  const { bg, color, label, icon } = config[severity];

  return (
    <div
      className="flex items-center justify-center gap-0.5 px-1.5 py-0.5 rounded"
      style={{ backgroundColor: bg }}
    >
      <div style={{ color }}>
        {icon}
      </div>
      <span
        className="font-['Neue_Montreal'] font-medium text-[10px] leading-3"
        style={{ color }}
      >
        {label}
      </span>
    </div>
  );
};

interface LogsTableProps {
  category: LogCategory;
}

export default function LogsTable({ category }: LogsTableProps) {
  const [latestAuthLog, setLatestAuthLog] = useState<AuthLogEntry | null>(null);

  useEffect(() => {
    const latest = parseStoredAuthLog(localStorage.getItem(AUTH_LOG_STORAGE_KEY));
    setLatestAuthLog(latest);
  }, []);

  // Render different table layouts based on category
  if (category === 'System Events') {
    return (
      <div className="flex flex-col items-start p-1 gap-1 w-full bg-[#F9F9FB] rounded-lg">
        {/* Table Header */}
        <div className="flex items-center px-6 py-2 gap-4 w-full h-[30px]">
          <span className="font-['Neue_Montreal'] font-medium text-xs leading-[14px] text-[#2B2834] w-[140px]">
            Timestamp
          </span>
          <span className="font-['Neue_Montreal'] font-medium text-xs leading-[14px] text-[#2B2834] w-[120px]">
            Event Type
          </span>
          <span className="font-['Neue_Montreal'] font-medium text-xs leading-[14px] text-[#2B2834] w-[120px]">
            Component
          </span>
          <span className="font-['Neue_Montreal'] font-medium text-xs leading-[14px] text-[#2B2834] flex-1 min-w-[150px]">
            Message
          </span>
          <span className="font-['Neue_Montreal'] font-medium text-xs leading-[14px] text-[#2B2834] w-[80px]">
            Severity
          </span>
          <span className="font-['Neue_Montreal'] font-medium text-xs leading-[14px] text-[#2B2834] flex-1 min-w-[150px]">
            Details
          </span>
        </div>

        {/* Table Body */}
        <div className="flex flex-col items-start w-full bg-white border border-[#EBEBEB] rounded-lg overflow-hidden">
          {systemEventsLogs.map((log, index) => (
            <div
              key={log.id}
              className={cn(
                'flex items-center px-6 py-3 gap-4 w-full h-10 bg-white',
                index < systemEventsLogs.length - 1 && 'border-b border-[#EBEBEB]'
              )}
            >
              <span className="font-['Neue_Montreal'] font-normal text-xs leading-[14px] text-[#5F5971] w-[140px]">
                {log.timestamp}
              </span>
              <span className="font-['Neue_Montreal'] font-normal text-[13.5px] leading-4 text-[#2B2834] w-[120px]">
                {log.eventType}
              </span>
              <span className="font-['Neue_Montreal'] font-normal text-[13.5px] leading-4 text-[#2B2834] w-[120px]">
                {log.component}
              </span>
              <span className="font-['Neue_Montreal'] font-normal text-[13.5px] leading-4 text-[#2B2834] flex-1 min-w-[150px] truncate">
                {log.message}
              </span>
              <div className="w-[80px] flex justify-start">
                <SeverityBadge severity={log.severity} />
              </div>
              <span className="font-['Neue_Montreal'] font-normal text-[13.5px] leading-4 text-[#2B2834] flex-1 min-w-[150px] truncate">
                {log.details}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Admin Actions and Authentication Logs use different layouts
  if (category === 'Authentication Logs') {
    const authLogs = latestAuthLog
      ? [latestAuthLog, ...authenticationLogs]
      : authenticationLogs;

    return (
      <div className="flex flex-col items-start p-1 gap-1 w-full bg-[#F9F9FB] rounded-lg">
        {/* Table Header */}
        <div className="flex items-center px-6 py-2 gap-4 w-full h-[30px]">
          <span className="font-['Neue_Montreal'] font-medium text-xs leading-[14px] text-[#2B2834] w-[140px]">
            Timestamp
          </span>
          <span className="font-['Neue_Montreal'] font-medium text-xs leading-[14px] text-[#2B2834] flex-1 min-w-[120px]">
            User
          </span>
          <span className="font-['Neue_Montreal'] font-medium text-xs leading-[14px] text-[#2B2834] w-[100px]">
            Action
          </span>
          <span className="font-['Neue_Montreal'] font-medium text-xs leading-[14px] text-[#2B2834] flex-1 min-w-[170px]">
            Message
          </span>
          <span className="font-['Neue_Montreal'] font-medium text-xs leading-[14px] text-[#2B2834] flex-1 min-w-[150px]">
            User Agent
          </span>
          <span className="font-['Neue_Montreal'] font-medium text-xs leading-[14px] text-[#2B2834] w-[120px]">
            IP Address
          </span>
          <span className="font-['Neue_Montreal'] font-medium text-xs leading-[14px] text-[#2B2834] w-[80px]">
            Status
          </span>
        </div>

        {/* Table Body */}
        <div className="flex flex-col items-start w-full bg-white border border-[#EBEBEB] rounded-lg overflow-hidden">
          {authLogs.map((log, index) => (
            <div
              key={log.id}
              className={cn(
                'flex items-center px-6 py-3 gap-4 w-full h-10 bg-white',
                index < authLogs.length - 1 && 'border-b border-[#EBEBEB]',
                latestAuthLog?.id === log.id && 'bg-surface-active'
              )}
            >
              <span className="font-['Neue_Montreal'] font-normal text-xs leading-[14px] text-[#5F5971] w-[140px]">
                {log.timestamp}
              </span>
              <span className="font-['Neue_Montreal'] font-normal text-[13.5px] leading-4 text-[#2B2834] flex-1 min-w-[120px] truncate">
                {log.user}
              </span>
              <span className="font-['Neue_Montreal'] font-normal text-[13.5px] leading-4 text-[#2B2834] w-[100px]">
                {log.action}
              </span>
              <span className="font-['Neue_Montreal'] font-normal text-[13.5px] leading-4 text-[#2B2834] flex-1 min-w-[170px] truncate">
                {log.message}
              </span>
              <span className="font-['Neue_Montreal'] font-normal text-[13.5px] leading-4 text-[#2B2834] flex-1 min-w-[150px] truncate">
                {log.userAgent}
              </span>
              <span className="font-['Neue_Montreal'] font-normal text-[13.5px] leading-4 text-[#2B2834] w-[120px]">
                {log.ipAddress}
              </span>
              <div className="w-[80px] flex justify-start">
                <AuthStatusBadge status={log.status} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Admin Actions layout
  const logs = adminActionsLogs;

  return (
    <div className="flex flex-col items-start p-1 gap-1 w-full bg-[#F9F9FB] rounded-lg">
      {/* Table Header */}
      <div className="flex items-center px-6 py-2 gap-4 w-full h-[30px]">
        <span className="font-['Neue_Montreal'] font-medium text-xs leading-[14px] text-[#2B2834] w-[140px]">
          Timestamp
        </span>
        <span className="font-['Neue_Montreal'] font-medium text-xs leading-[14px] text-[#2B2834] flex-1 min-w-[120px]">
          Admin
        </span>
        <span className="font-['Neue_Montreal'] font-medium text-xs leading-[14px] text-[#2B2834] w-[100px]">
          Section
        </span>
        <span className="font-['Neue_Montreal'] font-medium text-xs leading-[14px] text-[#2B2834] w-[100px]">
          Action
        </span>
        <span className="font-['Neue_Montreal'] font-medium text-xs leading-[14px] text-[#2B2834] flex-1 min-w-[120px]">
          Target
        </span>
        <span className="font-['Neue_Montreal'] font-medium text-xs leading-[14px] text-[#2B2834] flex-1 min-w-[150px]">
          Details
        </span>
        <span className="font-['Neue_Montreal'] font-medium text-xs leading-[14px] text-[#2B2834] w-[120px]">
          IP Address
        </span>
      </div>

      {/* Table Body */}
      <div className="flex flex-col items-start w-full bg-white border border-[#EBEBEB] rounded-lg overflow-hidden">
        {logs.map((log, index) => (
          <div
            key={log.id}
            className={cn(
              'flex items-center px-6 py-3 gap-4 w-full h-10 bg-white',
              index < logs.length - 1 && 'border-b border-[#EBEBEB]'
            )}
          >
            <span className="font-['Neue_Montreal'] font-normal text-xs leading-[14px] text-[#5F5971] w-[140px]">
              {log.timestamp}
            </span>
            <span className="font-['Neue_Montreal'] font-normal text-[13.5px] leading-4 text-[#2B2834] flex-1 min-w-[120px] truncate">
              {log.admin}
            </span>
            <span className="font-['Neue_Montreal'] font-normal text-[13.5px] leading-4 text-[#2B2834] w-[100px]">
              {log.section}
            </span>
            <span className="font-['Neue_Montreal'] font-normal text-[13.5px] leading-4 text-[#2B2834] w-[100px]">
              {log.action}
            </span>
            <span className="font-['Neue_Montreal'] font-normal text-[13.5px] leading-4 text-[#2B2834] flex-1 min-w-[120px] truncate">
              {log.target}
            </span>
            <span className="font-['Neue_Montreal'] font-normal text-[13.5px] leading-4 text-[#2B2834] flex-1 min-w-[150px] truncate">
              {log.details}
            </span>
            <span className="font-['Neue_Montreal'] font-normal text-[13.5px] leading-4 text-[#2B2834] w-[120px]">
              {log.ipAddress}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
