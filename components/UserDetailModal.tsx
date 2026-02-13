'use client';

import { useState, useEffect } from 'react';
import {
  getAdminUserTransactions,
  getUserLogs,
  type AdminUserTransactionItem,
  type UserLogItem
} from '@/lib/api';

type UserDetailModalProps = {
  user: any;
  isOpen: boolean;
  onClose: () => void;
};

export default function UserDetailModal({ user, isOpen, onClose }: UserDetailModalProps) {
  const [activeTab, setActiveTab] = useState<'profile' | 'activity' | 'purchases' | 'subscriptions'>('profile');
  const [activityLogs, setActivityLogs] = useState<UserLogItem[]>([]);
  const [activitySearch, setActivitySearch] = useState('');
  const [activityPage, setActivityPage] = useState(1);
  const [activityMeta, setActivityMeta] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1
  });
  const [isActivityLoading, setIsActivityLoading] = useState(false);
  const [activityError, setActivityError] = useState<string | null>(null);
  const [transactions, setTransactions] = useState<AdminUserTransactionItem[]>([]);
  const [transactionPage, setTransactionPage] = useState(1);
  const [transactionMeta, setTransactionMeta] = useState({
    total: 0,
    page: 1,
    limit: 20,
    totalPages: 1,
    hasNext: false,
    hasPrev: false
  });
  const [isTransactionsLoading, setIsTransactionsLoading] = useState(false);
  const [transactionsError, setTransactionsError] = useState<string | null>(null);
  const [subscriptions, setSubscriptions] = useState<AdminUserTransactionItem[]>([]);
  const [subscriptionsPage, setSubscriptionsPage] = useState(1);
  const [subscriptionsMeta, setSubscriptionsMeta] = useState({
    total: 0,
    page: 1,
    limit: 20,
    totalPages: 1,
    hasNext: false,
    hasPrev: false
  });
  const [isSubscriptionsLoading, setIsSubscriptionsLoading] = useState(false);
  const [subscriptionsError, setSubscriptionsError] = useState<string | null>(null);
  const statusValue = String(user?.status ?? '').toLowerCase();
  const statusLabel =
    statusValue === 'inactive'
      ? 'Inactive'
      : statusValue === 'pending'
        ? 'Pending'
        : 'Active';
  const statusTone =
    statusLabel === 'Inactive'
      ? 'bg-surface-danger text-text-danger'
      : statusLabel === 'Pending'
        ? 'bg-surface-warning text-text-warning'
        : 'bg-surface-success text-text-success';

  const formatIsoDate = (value?: string) => {
    if (!value) return '—';
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) return '—';
    return parsed.toLocaleDateString('en-NG');
  };

  const formatIsoDateTime = (value?: string) => {
    if (!value) return '—';
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) return '—';
    return parsed.toLocaleString('en-NG', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || activeTab !== 'activity') return;
    if (!user?.apiId) return;

    let isMounted = true;
    const fetchLogs = async () => {
      setIsActivityLoading(true);
      try {
        const response = await getUserLogs({
          user: user.apiId,
          search: activitySearch.trim() || undefined,
          page: activityPage,
          limit: 10
        });
        if (!isMounted) return;
        setActivityLogs(response.data);
        setActivityMeta(response.meta);
        setActivityError(null);
      } catch (error) {
        if (!isMounted) return;
        setActivityLogs([]);
        setActivityError(
          error instanceof Error && error.message.trim().length > 0
            ? error.message
            : 'Unable to load user activity logs.'
        );
      } finally {
        if (isMounted) {
          setIsActivityLoading(false);
        }
      }
    };

    void fetchLogs();

    return () => {
      isMounted = false;
    };
  }, [activeTab, activityPage, activitySearch, isOpen, user?.apiId]);

  useEffect(() => {
    if (!isOpen || activeTab !== 'purchases') return;
    if (!user?.apiId) return;

    let isMounted = true;
    const fetchTransactions = async () => {
      setIsTransactionsLoading(true);
      try {
        const response = await getAdminUserTransactions({
          customerId: user.apiId,
          page: transactionPage,
          limit: 20
        });
        if (!isMounted) return;
        setTransactions(response.transactions);
        setTransactionMeta(response.pagination);
        setTransactionsError(null);
      } catch (error) {
        if (!isMounted) return;
        setTransactions([]);
        setTransactionsError(
          error instanceof Error && error.message.trim().length > 0
            ? error.message
            : 'Unable to load user transactions.'
        );
      } finally {
        if (isMounted) {
          setIsTransactionsLoading(false);
        }
      }
    };

    void fetchTransactions();

    return () => {
      isMounted = false;
    };
  }, [activeTab, isOpen, transactionPage, user?.apiId]);

  useEffect(() => {
    if (!isOpen || activeTab !== 'subscriptions') return;
    if (!user?.apiId) return;

    let isMounted = true;
    const fetchSubscriptions = async () => {
      setIsSubscriptionsLoading(true);
      try {
        const response = await getAdminUserTransactions({
          customerId: user.apiId,
          page: subscriptionsPage,
          limit: 20
        });
        if (!isMounted) return;
        setSubscriptions(response.transactions);
        setSubscriptionsMeta(response.pagination);
        setSubscriptionsError(null);
      } catch (error) {
        if (!isMounted) return;
        setSubscriptions([]);
        setSubscriptionsError(
          error instanceof Error && error.message.trim().length > 0
            ? error.message
            : 'Unable to load user subscriptions.'
        );
      } finally {
        if (isMounted) {
          setIsSubscriptionsLoading(false);
        }
      }
    };

    void fetchSubscriptions();

    return () => {
      isMounted = false;
    };
  }, [activeTab, isOpen, subscriptionsPage, user?.apiId]);

  useEffect(() => {
    if (!isOpen) return;
    setActivityPage(1);
    setActivitySearch('');
    setActivityLogs([]);
    setActivityError(null);
    setActivityMeta({
      total: 0,
      page: 1,
      limit: 10,
      totalPages: 1
    });
    setTransactionPage(1);
    setTransactions([]);
    setTransactionsError(null);
    setTransactionMeta({
      total: 0,
      page: 1,
      limit: 20,
      totalPages: 1,
      hasNext: false,
      hasPrev: false
    });
    setSubscriptionsPage(1);
    setSubscriptions([]);
    setSubscriptionsError(null);
    setSubscriptionsMeta({
      total: 0,
      page: 1,
      limit: 20,
      totalPages: 1,
      hasNext: false,
      hasPrev: false
    });
    setActiveTab('profile');
  }, [isOpen, user?.id]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-end z-50 overflow-hidden"
      onClick={onClose}
    >
      <div 
        className="w-[600px] h-full bg-white flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 h-16">
          <h2 className="text-heading-sm text-text-primary">User Details</h2>
          <button 
            onClick={onClose}
            className="flex items-center gap-1.5 px-2 py-1.5 bg-surface-secondary rounded-md h-7"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 12L11.96 4M12 12L4.04 4" stroke="var(--brand-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-caption-lg text-text-brand">Close</span>
          </button>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-border-secondary" />

        {/* Content */}
        <div className="flex-1 flex flex-col overflow-y-auto">
          {/* User Info Section */}
          <div className="flex flex-col px-6 py-6 gap-3">
            {/* User Header */}
            <div className="flex items-center gap-2">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-12 h-12 rounded-full object-cover"
                  onError={(event) => {
                    event.currentTarget.style.display = 'none';
                  }}
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gray-200" />
              )}
              <div className="flex-1 flex flex-col justify-center gap-0.5">
                <div className="flex items-center gap-2">
                  <span className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-caption-sm ${statusTone}`}>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M1.25 5C1.25 5.49246 1.347 5.98009 1.53545 6.43506C1.72391 6.89003 2.00013 7.30343 2.34835 7.65165C2.69657 7.99987 3.10997 8.27609 3.56494 8.46455C4.01991 8.653 4.50754 8.75 5 8.75C5.49246 8.75 5.98009 8.653 6.43506 8.46455C6.89003 8.27609 7.30343 7.99987 7.65165 7.65165C7.99987 7.30343 8.27609 6.89003 8.46455 6.43506C8.653 5.98009 8.75 5.49246 8.75 5C8.75 4.50754 8.653 4.01991 8.46455 3.56494C8.27609 3.10997 7.99987 2.69657 7.65165 2.34835C7.30343 2.00013 6.89003 1.72391 6.43506 1.53545C5.98009 1.347 5.49246 1.25 5 1.25C4.50754 1.25 4.01991 1.347 3.56494 1.53545C3.10997 1.72391 2.69657 2.00013 2.34835 2.34835C2.00013 2.69657 1.72391 3.10997 1.53545 3.56494C1.347 4.01991 1.25 4.50754 1.25 5Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M3.75 5.00033L4.58333 5.83366L6.25 4.16699" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {statusLabel}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-body-lg text-text-primary">{user.name}</span>
                  <span className="text-caption-md italic text-text-tertiary">{user.username || '@unknown'}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-1 px-4 py-3.5 bg-surface-primary border border-border-primary rounded-lg h-8 shadow-button-inset">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.57129 5.14267L6.22462 8.24533C6.86662 8.67267 7.18729 8.88667 7.53396 8.97C7.84062 9.04333 8.15996 9.04333 8.46596 8.97C8.81262 8.88667 9.13329 8.67267 9.77529 8.24533L14.4286 5.14267M4.77129 13H11.2286C12.3486 13 12.9086 13 13.3366 12.782C13.7127 12.5901 14.0184 12.2842 14.21 11.908C14.4286 11.48 14.4286 10.92 14.4286 9.8V6.2C14.4286 5.08 14.4286 4.52 14.2106 4.092C14.0189 3.71569 13.7129 3.40974 13.3366 3.218C12.9086 3 12.3486 3 11.2286 3H4.77129C3.65129 3 3.09129 3 2.66329 3.218C2.28723 3.40986 1.98153 3.71579 1.78996 4.092C1.57129 4.52 1.57129 5.08 1.57129 6.2V9.8C1.57129 10.92 1.57129 11.48 1.78929 11.908C1.98103 12.2843 2.28698 12.5903 2.66329 12.782C3.09129 13 3.65129 13 4.77129 13Z" stroke="var(--text-secondary)" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-body-sm text-text-primary">Send email</span>
                </button>
                <button className="flex items-center justify-center w-8 h-8 bg-surface-primary border border-border-primary rounded-lg shadow-button-inset">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <circle cx="10" cy="10" r="1.5" fill="var(--text-primary)"/>
                    <circle cx="4" cy="10" r="1.5" fill="var(--text-primary)"/>
                    <circle cx="16" cy="10" r="1.5" fill="var(--text-primary)"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Badges */}
            <div className="flex items-center gap-1.5">
              <div className="flex items-center gap-1 px-2.5 py-1.5 bg-surface-secondary rounded-full h-7">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.16665 1.66699C5.16665 1.53438 5.11397 1.40721 5.02021 1.31344C4.92644 1.21967 4.79926 1.16699 4.66665 1.16699C4.53404 1.16699 4.40687 1.21967 4.3131 1.31344C4.21933 1.40721 4.16665 1.53438 4.16665 1.66699V2.72033C3.20665 2.79699 2.57732 2.98499 2.11465 3.44833C1.65132 3.91099 1.46332 4.54099 1.38599 5.50033H14.614C14.5367 4.54033 14.3487 3.91099 13.8853 3.44833C13.4227 2.98499 12.7927 2.79699 11.8333 2.71966V1.66699C11.8333 1.53438 11.7806 1.40721 11.6869 1.31344C11.5931 1.21967 11.4659 1.16699 11.3333 1.16699C11.2007 1.16699 11.0735 1.21967 10.9798 1.31344C10.886 1.40721 10.8333 1.53438 10.8333 1.66699V2.67566C10.39 2.66699 9.89265 2.66699 9.33332 2.66699H6.66665C6.10732 2.66699 5.60999 2.66699 5.16665 2.67566V1.66699Z" fill="var(--brand-primary)"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M1.33325 8C1.33325 7.44067 1.33325 6.94333 1.34192 6.5H14.6579C14.6666 6.94333 14.6666 7.44067 14.6666 8V9.33333C14.6666 11.8473 14.6666 13.1047 13.8853 13.8853C13.1039 14.666 11.8473 14.6667 9.33325 14.6667H6.66659C4.15259 14.6667 2.89525 14.6667 2.11459 13.8853C1.33392 13.104 1.33325 11.8473 1.33325 9.33333V8ZM11.3333 9.33333C11.5101 9.33333 11.6796 9.2631 11.8047 9.13807C11.9297 9.01305 11.9999 8.84348 11.9999 8.66667C11.9999 8.48986 11.9297 8.32029 11.8047 8.19526C11.6796 8.07024 11.5101 8 11.3333 8C11.1564 8 10.9869 8.07024 10.8618 8.19526C10.7368 8.32029 10.6666 8.48986 10.6666 8.66667C10.6666 8.84348 10.7368 9.01305 10.8618 9.13807C10.9869 9.2631 11.1564 9.33333 11.3333 9.33333ZM11.3333 12C11.5101 12 11.6796 11.9298 11.8047 11.8047C11.9297 11.6797 11.9999 11.5101 11.9999 11.3333C11.9999 11.1565 11.9297 10.987 11.8047 10.8619C11.6796 10.7369 11.5101 10.6667 11.3333 10.6667C11.1564 10.6667 10.9869 10.7369 10.8618 10.8619C10.7368 10.987 10.6666 11.1565 10.6666 11.3333C10.6666 11.5101 10.7368 11.6797 10.8618 11.8047C10.9869 11.9298 11.1564 12 11.3333 12ZM8.66659 8.66667C8.66659 8.84348 8.59635 9.01305 8.47132 9.13807C8.3463 9.2631 8.17673 9.33333 7.99992 9.33333C7.82311 9.33333 7.65354 9.2631 7.52851 9.13807C7.40349 9.01305 7.33325 8.84348 7.33325 8.66667C7.33325 8.48986 7.40349 8.32029 7.52851 8.19526C7.65354 8.07024 7.82311 8 7.99992 8C8.17673 8 8.3463 8.07024 8.47132 8.19526C8.59635 8.32029 8.66659 8.48986 8.66659 8.66667ZM8.66659 11.3333C8.66659 11.5101 8.59635 11.6797 8.47132 11.8047C8.3463 11.9298 8.17673 12 7.99992 12C7.82311 12 7.65354 11.9298 7.52851 11.8047C7.40349 11.6797 7.33325 11.5101 7.33325 11.3333C7.33325 11.1565 7.40349 10.987 7.52851 10.8619C7.65354 10.7369 7.82311 10.6667 7.99992 10.6667C8.17673 10.6667 8.3463 10.7369 8.47132 10.8619C8.59635 10.987 8.66659 11.1565 8.66659 11.3333ZM4.66659 9.33333C4.8434 9.33333 5.01297 9.2631 5.13799 9.13807C5.26301 9.01305 5.33325 8.84348 5.33325 8.66667C5.33325 8.48986 5.26301 8.32029 5.13799 8.19526C5.01297 8.07024 4.8434 8 4.66659 8C4.48977 8 4.32021 8.07024 4.19518 8.19526C4.07016 8.32029 3.99992 8.48986 3.99992 8.66667C3.99992 8.84348 4.07016 9.01305 4.19518 9.13807C4.32021 9.2631 4.48977 9.33333 4.66659 9.33333ZM4.66659 12C4.8434 12 5.01297 11.9298 5.13799 11.8047C5.26301 11.6797 5.33325 11.5101 5.33325 11.3333C5.33325 11.1565 5.26301 10.987 5.13799 10.8619C5.01297 10.7369 4.8434 10.6667 4.66659 10.6667C4.48977 10.6667 4.32021 10.7369 4.19518 10.8619C4.07016 10.987 3.99992 11.1565 3.99992 11.3333C3.99992 11.5101 4.07016 11.6797 4.19518 11.8047C4.32021 11.9298 4.48977 12 4.66659 12Z" fill="var(--brand-primary)"/>
                </svg>
                <span className="text-body-sm text-text-primary">
                  Joined {formatIsoDate(user.joinedAtIso) !== '—' ? formatIsoDate(user.joinedAtIso) : user.joined}
                </span>
              </div>
              <div className="flex items-center gap-1 px-2.5 py-1.5 bg-surface-secondary rounded-full h-7">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.3333 2.22627C12.3388 2.80684 13.1752 3.63995 13.7598 4.64314C14.3444 5.64632 14.6568 6.78478 14.6662 7.94583C14.6756 9.10687 14.3816 10.2502 13.8133 11.2627C13.245 12.2752 12.4221 13.1217 11.4261 13.7185C10.4301 14.3152 9.2955 14.6415 8.13465 14.665C6.97381 14.6885 5.82695 14.4084 4.80762 13.8524C3.78829 13.2965 2.93183 12.484 2.32303 11.4953C1.71423 10.5066 1.37419 9.37608 1.33659 8.2156L1.33325 7.9996L1.33659 7.7836C1.37392 6.63226 1.70895 5.51024 2.30901 4.52693C2.90907 3.54362 3.75369 2.73257 4.76051 2.17286C5.76734 1.61314 6.90202 1.32387 8.05392 1.33323C9.20583 1.34259 10.3357 1.65027 11.3333 2.22627ZM7.99992 3.9996C7.83663 3.99962 7.67903 4.05957 7.557 4.16808C7.43498 4.27659 7.35702 4.4261 7.33792 4.58827L7.33325 4.66627V7.9996L7.33925 8.08694C7.35445 8.2026 7.39974 8.31225 7.47059 8.40494L7.52859 8.4716L9.52859 10.4716L9.59125 10.5263C9.70817 10.617 9.85194 10.6662 9.99992 10.6662C10.1479 10.6662 10.2917 10.617 10.4086 10.5263L10.4713 10.4709L10.5266 10.4083C10.6173 10.2914 10.6665 10.1476 10.6665 9.9996C10.6665 9.85162 10.6173 9.70785 10.5266 9.59094L10.4713 9.52827L8.66659 7.72294V4.66627L8.66192 4.58827C8.64281 4.4261 8.56486 4.27659 8.44283 4.16808C8.32081 4.05957 8.16321 3.99962 7.99992 3.9996Z" fill="var(--brand-primary)"/>
                </svg>
                <span className="text-body-sm text-text-primary">
                  Last active {formatIsoDate(user.lastActiveIso)}
                </span>
              </div>
            </div>

            {/* Stats Box */}
            <div className="flex justify-between items-center px-4 py-4 bg-surface-secondary border border-border-primary rounded-lg h-16">
              <div className="flex flex-col items-center gap-2">
                <span className="text-caption-sm text-text-tertiary">Total Spent</span>
                <span className="text-body-sm text-text-primary">₦{Number(user.spent ?? 0).toLocaleString('en-NG')}</span>
              </div>
              <div className="w-px h-9 bg-border-primary" />
              <div className="flex flex-col items-center gap-2">
                <span className="text-caption-sm text-text-tertiary">Total Spend Count</span>
                <span className="text-body-sm text-text-primary">{Number(user.purchases ?? 0)}</span>
              </div>
              <div className="w-px h-9 bg-border-primary" />
              <div className="flex flex-col items-center gap-2">
                <span className="text-caption-sm text-text-tertiary">Subscriptions</span>
                <span className="text-body-sm text-text-primary">{Number(user.subscriptions ?? 0)} active</span>
              </div>
              <div className="w-px h-9 bg-border-primary" />
              <div className="flex flex-col items-center gap-2">
                <span className="text-caption-sm text-text-tertiary">Hubs</span>
                <span className="text-body-sm text-text-primary">2</span>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex w-full h-10">
            <button 
              onClick={() => setActiveTab('profile')}
              className="flex-1 flex flex-col justify-center items-center pt-2.5 gap-3"
            >
              <span className={`text-body-sm ${activeTab === 'profile' ? 'text-text-primary' : 'text-text-tertiary'}`}>Profile</span>
              <div className={`w-full h-0.5 ${activeTab === 'profile' ? 'bg-brand-primary border-2 border-brand-primary' : 'bg-border-primary border border-border-primary'}`} />
            </button>
            <button 
              onClick={() => setActiveTab('activity')}
              className="flex-1 flex flex-col justify-center items-center pt-2.5 gap-3"
            >
              <span className={`text-body-sm ${activeTab === 'activity' ? 'text-text-primary' : 'text-text-tertiary'}`}>Activity</span>
              <div className={`w-full h-0.5 ${activeTab === 'activity' ? 'bg-brand-primary border-2 border-brand-primary' : 'bg-border-primary border border-border-primary'}`} />
            </button>
            <button 
              onClick={() => setActiveTab('purchases')}
              className="flex-1 flex flex-col justify-center items-center pt-2.5 gap-3"
            >
              <span className={`text-body-sm ${activeTab === 'purchases' ? 'text-text-primary' : 'text-text-tertiary'}`}>Purchases</span>
              <div className={`w-full h-0.5 ${activeTab === 'purchases' ? 'bg-brand-primary border-2 border-brand-primary' : 'bg-border-primary border border-border-primary'}`} />
            </button>
            <button 
              onClick={() => setActiveTab('subscriptions')}
              className="flex-1 flex flex-col justify-center items-center pt-2.5 gap-3"
            >
              <span className={`text-body-sm ${activeTab === 'subscriptions' ? 'text-text-primary' : 'text-text-tertiary'}`}>Subscriptions</span>
              <div className={`w-full h-0.5 ${activeTab === 'subscriptions' ? 'bg-brand-primary border-2 border-brand-primary' : 'bg-border-primary border border-border-primary'}`} />
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 'profile' && (
            <div className="flex flex-col px-6 py-6 gap-3 bg-surface-secondary flex-1">
              <div className="flex flex-col gap-1">
                <ProfileField icon="user" label="First Name" value={user.firstName || '—'} />
                <ProfileField icon="user" label="Last Name" value={user.lastName || '—'} />
                <ProfileField icon="user" label="User Name" value={user.username || '—'} />
                <ProfileField icon="mail" label="Email Address" value={user.email || '—'} />
                <ProfileField icon="calendar" label="Date of Birth" value={formatIsoDate(user.dob)} />
                <ProfileField
                  icon="gender"
                  label="Gender"
                  value={user.gender ? `${user.gender.charAt(0).toUpperCase()}${user.gender.slice(1)}` : '—'}
                />
                <ProfileField icon="arrow" label="Referred By" value="—" />
                <ProfileField icon="id" label="Creator Profile" value="—" />
              </div>
            </div>
          )}

          {activeTab === 'activity' && (
            <div className="flex flex-col px-6 pt-4 pb-6 gap-1 bg-surface-secondary flex-1">
              <div className="mb-2">
                <input
                  type="text"
                  value={activitySearch}
                  onChange={(event) => {
                    setActivitySearch(event.target.value);
                    setActivityPage(1);
                  }}
                  placeholder="Search activity"
                  className="w-full h-8 px-3 rounded-md border border-border-primary bg-white text-body-sm text-text-primary placeholder:text-text-tertiary outline-none"
                />
              </div>
              {/* Table Header */}
              <div className="flex items-center px-4 gap-6 h-8 relative z-10">
                <span className="text-body-sm text-text-secondary w-36">Timestamp</span>
                <span className="text-body-sm text-text-secondary flex-1">Activity</span>
              </div>

              {/* Activity Table */}
              <div className="flex flex-col bg-surface-primary border border-border-primary rounded-lg overflow-hidden relative z-0">
                {isActivityLoading && (
                  <div className="px-4 py-4 text-body-sm text-text-secondary">
                    Loading activity logs...
                  </div>
                )}
                {activityError && !isActivityLoading && (
                  <div className="px-4 py-4 text-body-sm text-text-secondary">
                    {activityError}
                  </div>
                )}
                {!isActivityLoading && !activityError && activityLogs.length === 0 && (
                  <div className="px-4 py-4 text-body-sm text-text-secondary">
                    No activity logs found.
                  </div>
                )}
                {!isActivityLoading && !activityError && activityLogs.map((log, index) => (
                  <ActivityRow
                    key={log._id}
                    timestamp={formatIsoDateTime(log.createdAt)}
                    activity={log.activity || '—'}
                    last={index === activityLogs.length - 1}
                  />
                ))}
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-caption-lg text-text-tertiary">
                  {activityMeta.total === 0
                    ? 'Showing 0 results'
                    : `Showing ${(activityMeta.page - 1) * activityMeta.limit + 1} to ${Math.min(
                        activityMeta.page * activityMeta.limit,
                        activityMeta.total
                      )} of ${activityMeta.total}`}
                </span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setActivityPage((prev) => Math.max(1, prev - 1))}
                    disabled={activityMeta.page <= 1 || isActivityLoading}
                    className="px-3 h-7 rounded-md border border-border-primary bg-white text-caption-md text-text-secondary disabled:opacity-40"
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setActivityPage((prev) =>
                        prev < activityMeta.totalPages ? prev + 1 : prev
                      )
                    }
                    disabled={activityMeta.page >= activityMeta.totalPages || isActivityLoading}
                    className="px-3 h-7 rounded-md border border-border-primary bg-white text-caption-md text-text-secondary disabled:opacity-40"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'purchases' && (
            <div className="flex flex-col px-6 pt-4 pb-6 gap-1 bg-surface-secondary flex-1">
              {/* Table Header */}
              <div className="flex items-center px-4 gap-6 h-8 relative z-10">
                <span className="text-body-sm text-text-secondary w-16">Date</span>
                <span className="text-body-sm text-text-secondary flex-1">Product</span>
                <span className="text-body-sm text-text-secondary flex-1">Creator</span>
                <span className="text-body-sm text-text-secondary flex-1">Amount</span>
                <span className="text-body-sm text-text-secondary w-12">Status</span>
              </div>

              {/* Purchases Table */}
              <div className="flex flex-col bg-surface-primary border border-border-primary rounded-lg overflow-hidden relative z-0">
                {isTransactionsLoading && (
                  <div className="px-4 py-4 text-body-sm text-text-secondary">
                    Loading transactions...
                  </div>
                )}
                {transactionsError && !isTransactionsLoading && (
                  <div className="px-4 py-4 text-body-sm text-text-secondary">
                    {transactionsError}
                  </div>
                )}
                {!isTransactionsLoading && !transactionsError && transactions.length === 0 && (
                  <div className="px-4 py-4 text-body-sm text-text-secondary">
                    No transactions found.
                  </div>
                )}
                {!isTransactionsLoading && !transactionsError && transactions.map((transaction, index) => {
                  const creatorName = [
                    transaction.user?.first_name,
                    transaction.user?.last_name
                  ]
                    .filter(Boolean)
                    .join(' ')
                    .trim();
                  const fallbackName = [
                    transaction.customer_first_name,
                    transaction.customer_last_name
                  ]
                    .filter(Boolean)
                    .join(' ')
                    .trim();
                  const displayName =
                    transaction.hub_name ||
                    creatorName ||
                    fallbackName ||
                    transaction.customer_email ||
                    '—';
                  const currency = (transaction.currency || 'NGN').toUpperCase();
                  const amount = new Intl.NumberFormat('en-NG', {
                    style: 'currency',
                    currency,
                    minimumFractionDigits: 0
                  }).format(Number(transaction.amount ?? 0));
                  return (
                    <PurchaseRow
                      key={transaction._id}
                      date={formatIsoDateTime(transaction.transactionDate)}
                      product={transaction.narration || 'Transaction'}
                      creator={displayName}
                      amount={amount}
                      status={String(transaction.status || 'pending')}
                      last={index === transactions.length - 1}
                    />
                  );
                })}
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-caption-lg text-text-tertiary">
                  {transactionMeta.total === 0
                    ? 'Showing 0 results'
                    : `Showing ${(transactionMeta.page - 1) * transactionMeta.limit + 1} to ${Math.min(
                        transactionMeta.page * transactionMeta.limit,
                        transactionMeta.total
                      )} of ${transactionMeta.total}`}
                </span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setTransactionPage((prev) => Math.max(1, prev - 1))}
                    disabled={!transactionMeta.hasPrev || isTransactionsLoading}
                    className="px-3 h-7 rounded-md border border-border-primary bg-white text-caption-md text-text-secondary disabled:opacity-40"
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setTransactionPage((prev) =>
                        transactionMeta.hasNext ? prev + 1 : prev
                      )
                    }
                    disabled={!transactionMeta.hasNext || isTransactionsLoading}
                    className="px-3 h-7 rounded-md border border-border-primary bg-white text-caption-md text-text-secondary disabled:opacity-40"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'subscriptions' && (
            <div className="flex flex-col px-6 pt-4 pb-6 gap-1 bg-surface-secondary flex-1">
              {/* Table Header */}
              <div className="flex items-center px-4 gap-6 h-8 relative z-10">
                <span className="text-body-sm text-text-secondary w-16">Date</span>
                <span className="text-body-sm text-text-secondary flex-1">Product/Service</span>
                <span className="text-body-sm text-text-secondary flex-1">Creator</span>
                <span className="text-body-sm text-text-secondary flex-1">Amount</span>
                <span className="text-body-sm text-text-secondary w-12">Status</span>
              </div>

              {/* Subscriptions Table */}
              <div className="flex flex-col bg-surface-primary border border-border-primary rounded-lg overflow-hidden relative z-0">
                {isSubscriptionsLoading && (
                  <div className="px-4 py-4 text-body-sm text-text-secondary">
                    Loading subscriptions...
                  </div>
                )}
                {subscriptionsError && !isSubscriptionsLoading && (
                  <div className="px-4 py-4 text-body-sm text-text-secondary">
                    {subscriptionsError}
                  </div>
                )}
                {!isSubscriptionsLoading && !subscriptionsError && subscriptions.length === 0 && (
                  <div className="px-4 py-4 text-body-sm text-text-secondary">
                    No subscriptions found.
                  </div>
                )}
                {!isSubscriptionsLoading && !subscriptionsError && subscriptions.map((transaction, index) => {
                  const creatorName = [
                    transaction.user?.first_name,
                    transaction.user?.last_name
                  ]
                    .filter(Boolean)
                    .join(' ')
                    .trim();
                  const fallbackName = [
                    transaction.customer_first_name,
                    transaction.customer_last_name
                  ]
                    .filter(Boolean)
                    .join(' ')
                    .trim();
                  const displayName =
                    transaction.hub_name ||
                    creatorName ||
                    fallbackName ||
                    transaction.customer_email ||
                    '—';
                  const currency = (transaction.currency || 'NGN').toUpperCase();
                  const amount = new Intl.NumberFormat('en-NG', {
                    style: 'currency',
                    currency,
                    minimumFractionDigits: 0
                  }).format(Number(transaction.amount ?? 0));
                  return (
                    <PurchaseRow
                      key={transaction._id}
                      date={formatIsoDateTime(transaction.transactionDate)}
                      product={transaction.narration || 'Subscription'}
                      creator={displayName}
                      amount={amount}
                      status={String(transaction.status || 'pending')}
                      last={index === subscriptions.length - 1}
                    />
                  );
                })}
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-caption-lg text-text-tertiary">
                  {subscriptionsMeta.total === 0
                    ? 'Showing 0 results'
                    : `Showing ${(subscriptionsMeta.page - 1) * subscriptionsMeta.limit + 1} to ${Math.min(
                        subscriptionsMeta.page * subscriptionsMeta.limit,
                        subscriptionsMeta.total
                      )} of ${subscriptionsMeta.total}`}
                </span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setSubscriptionsPage((prev) => Math.max(1, prev - 1))}
                    disabled={!subscriptionsMeta.hasPrev || isSubscriptionsLoading}
                    className="px-3 h-7 rounded-md border border-border-primary bg-white text-caption-md text-text-secondary disabled:opacity-40"
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setSubscriptionsPage((prev) =>
                        subscriptionsMeta.hasNext ? prev + 1 : prev
                      )
                    }
                    disabled={!subscriptionsMeta.hasNext || isSubscriptionsLoading}
                    className="px-3 h-7 rounded-md border border-border-primary bg-white text-caption-md text-text-secondary disabled:opacity-40"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function PurchaseRow({ date, product, creator, amount, status, last }: { date: string; product: string; creator: string; amount: string; status: string; last?: boolean }) {
  const statusConfig = {
    paid: {
      bg: 'var(--surface-success)',
      color: 'var(--text-success)',
      label: 'Paid',
      icon: (
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.25 5C1.25 5.49246 1.347 5.98009 1.53545 6.43506C1.72391 6.89003 2.00013 7.30343 2.34835 7.65165C2.69657 7.99987 3.10997 8.27609 3.56494 8.46455C4.01991 8.653 4.50754 8.75 5 8.75C5.49246 8.75 5.98009 8.653 6.43506 8.46455C6.89003 8.27609 7.30343 7.99987 7.65165 7.65165C7.99987 7.30343 8.27609 6.89003 8.46455 6.43506C8.653 5.98009 8.75 5.49246 8.75 5C8.75 4.50754 8.653 4.01991 8.46455 3.56494C8.27609 3.10997 7.99987 2.69657 7.65165 2.34835C7.30343 2.00013 6.89003 1.72391 6.43506 1.53545C5.98009 1.347 5.49246 1.25 5 1.25C4.50754 1.25 4.01991 1.347 3.56494 1.53545C3.10997 1.72391 2.69657 2.00013 2.34835 2.34835C2.00013 2.69657 1.72391 3.10997 1.53545 3.56494C1.347 4.01991 1.25 4.50754 1.25 5Z" stroke="var(--text-success)" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M3.75 5.00033L4.58333 5.83366L6.25 4.16699" stroke="var(--text-success)" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    failed: {
      bg: 'var(--surface-danger)',
      color: 'var(--text-danger)',
      label: 'Failed',
      icon: (
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 3.74975V5.41642M5 6.66642H5.00417M4.31792 1.496L0.940416 7.13517C0.870789 7.25575 0.833944 7.39245 0.833545 7.53169C0.833146 7.67092 0.869208 7.80784 0.938143 7.92881C1.00708 8.04978 1.10648 8.1506 1.22647 8.22123C1.34646 8.29187 1.48286 8.32986 1.62208 8.33142H8.37792C8.51708 8.32981 8.6534 8.29182 8.77334 8.22121C8.89327 8.15059 8.99263 8.04983 9.06156 7.92892C9.13048 7.808 9.16656 7.67116 9.16621 7.53199C9.16587 7.39281 9.12911 7.25615 9.05958 7.13559L5.68208 1.49559C5.61102 1.3783 5.51092 1.28131 5.39144 1.214C5.27196 1.14669 5.13714 1.11133 5 1.11133C4.86286 1.11133 4.72804 1.14669 4.60856 1.214C4.48908 1.28131 4.38898 1.3783 4.31792 1.49559V1.496Z" stroke="var(--text-danger)" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    pending: {
      bg: 'var(--surface-warning)',
      color: 'var(--text-warning)',
      label: 'Pending',
      icon: (
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 2.5V5L6.66667 6.25" stroke="var(--text-warning)" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8.75 5C8.75 7.07107 7.07107 8.75 5 8.75C2.92893 8.75 1.25 7.07107 1.25 5C1.25 2.92893 2.92893 1.25 5 1.25C7.07107 1.25 8.75 2.92893 8.75 5Z" stroke="var(--text-warning)" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    }
  };
  const normalized = status.trim().toLowerCase();
  const statusKey =
    normalized === 'completed' || normalized === 'paid'
      ? 'paid'
      : normalized === 'failed'
        ? 'failed'
        : 'pending';
  const statusStyle = statusConfig[statusKey as keyof typeof statusConfig];

  return (
    <div className={`flex items-center px-4 gap-6 h-8 bg-surface-primary ${!last ? 'border-b border-border-primary' : ''}`}>
      <span className="text-body-sm text-text-primary w-16">{date}</span>
      <span className="text-body-sm text-text-primary flex-1">{product}</span>
      <span className="text-body-sm text-text-primary flex-1">{creator}</span>
      <span className="text-body-sm text-text-primary flex-1">{amount}</span>
      <div className="w-12">
        <span 
          className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-caption-sm"
          style={{ backgroundColor: statusStyle.bg, color: statusStyle.color }}
        >
          {statusStyle.icon}
          {statusStyle.label}
        </span>
      </div>
    </div>
  );
}

function ActivityRow({ timestamp, activity, last }: { timestamp: string; activity: string; last?: boolean }) {
  return (
    <div className={`flex items-center px-4 gap-6 h-8 bg-surface-primary ${!last ? 'border-b border-border-primary' : ''}`}>
      <span className="text-body-sm text-text-primary w-36">{timestamp}</span>
      <span className="text-body-sm text-text-primary flex-1">{activity}</span>
    </div>
  );
}

function ProfileField({ icon, label, value, link }: { icon: string; label: string; value: string; link?: boolean }) {
  return (
    <div className="flex items-center px-4 gap-4 h-8 bg-surface-primary border border-border-primary rounded">
      <div className="flex items-center gap-2 w-24">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          {icon === 'user' && (
            <>
              <circle cx="8" cy="5" r="2.5" stroke="var(--text-secondary)" strokeWidth="1"/>
              <path d="M3.5 13C3.5 10.5 5.5 8.5 8 8.5C10.5 8.5 12.5 10.5 12.5 13" stroke="var(--text-secondary)" strokeWidth="1"/>
            </>
          )}
          {icon === 'mail' && (
            <>
              <path d="M1.57129 5.14267L6.22462 8.24533C6.86662 8.67267 7.18729 8.88667 7.53396 8.97C7.84062 9.04333 8.15996 9.04333 8.46596 8.97C8.81262 8.88667 9.13329 8.67267 9.77529 8.24533L14.4286 5.14267M4.77129 13H11.2286C12.3486 13 12.9086 13 13.3366 12.782C13.7127 12.5901 14.0184 12.2842 14.21 11.908C14.4286 11.48 14.4286 10.92 14.4286 9.8V6.2C14.4286 5.08 14.4286 4.52 14.2106 4.092C14.0189 3.71569 13.7129 3.40974 13.3366 3.218C12.9086 3 12.3486 3 11.2286 3H4.77129C3.65129 3 3.09129 3 2.66329 3.218C2.28723 3.40986 1.98153 3.71579 1.78996 4.092C1.57129 4.52 1.57129 5.08 1.57129 6.2V9.8C1.57129 10.92 1.57129 11.48 1.78929 11.908C1.98103 12.2843 2.28698 12.5903 2.66329 12.782C3.09129 13 3.65129 13 4.77129 13Z" stroke="var(--text-secondary)" strokeLinecap="round" strokeLinejoin="round"/>
            </>
          )}
          {icon === 'calendar' && (
            <>
              <path d="M1.33325 8.00033C1.33325 5.48633 1.33325 4.22899 2.11459 3.44833C2.89592 2.66766 4.15259 2.66699 6.66659 2.66699H9.33325C11.8473 2.66699 13.1046 2.66699 13.8853 3.44833C14.6659 4.22966 14.6666 5.48633 14.6666 8.00033V9.33366C14.6666 11.8477 14.6666 13.105 13.8853 13.8857C13.1039 14.6663 11.8473 14.667 9.33325 14.667H6.66659C4.15259 14.667 2.89525 14.667 2.11459 13.8857C1.33392 13.1043 1.33325 11.8477 1.33325 9.33366V8.00033Z" stroke="#5F5971"/>
              <path d="M4.6665 2.66699V1.66699M11.3332 2.66699V1.66699" stroke="#5F5971" strokeLinecap="round"/>
              <path d="M11 12C11.5523 12 12 11.5523 12 11C12 10.4477 11.5523 10 11 10C10.4477 10 10 10.4477 10 11C10 11.5523 10.4477 12 11 12Z" stroke="#5F5971"/>
              <path d="M1.6665 6H14.3332" stroke="#5F5971" strokeLinecap="round"/>
            </>
          )}
          {icon === 'gender' && (
            <>
              <path d="M12.6666 3.33301L9.06659 6.93301M12.6666 3.33301H9.33325M12.6666 3.33301V6.66634M3.33325 9.33301C3.33325 10.2171 3.68444 11.0649 4.30956 11.69C4.93468 12.3152 5.78253 12.6663 6.66659 12.6663C7.55064 12.6663 8.39849 12.3152 9.02361 11.69C9.64873 11.0649 9.99992 10.2171 9.99992 9.33301C9.99992 8.44895 9.64873 7.60111 9.02361 6.97599C8.39849 6.35086 7.55064 5.99967 6.66659 5.99967C5.78253 5.99967 4.93468 6.35086 4.30956 6.97599C3.68444 7.60111 3.33325 8.44895 3.33325 9.33301Z" stroke="#5F5971" strokeLinecap="round" strokeLinejoin="round"/>
            </>
          )}
          {icon === 'arrow' && (
            <>
              <path d="M10 9.33333L12.6667 6.66667L10 4" stroke="#5F5971" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12.6667 6.66699H5.33341C4.62617 6.66699 3.94789 6.94794 3.4478 7.44804C2.9477 7.94814 2.66675 8.62641 2.66675 9.33366C2.66675 10.0409 2.9477 10.7192 3.4478 11.2193C3.94789 11.7194 4.62617 12.0003 5.33341 12.0003H6.00008" stroke="#5F5971" strokeLinecap="round" strokeLinejoin="round"/>
            </>
          )}
          {icon === 'id' && (
            <>
              <path d="M5.99984 7.33366C6.73622 7.33366 7.33317 6.73671 7.33317 6.00033C7.33317 5.26395 6.73622 4.66699 5.99984 4.66699C5.26346 4.66699 4.6665 5.26395 4.6665 6.00033C4.6665 6.73671 5.26346 7.33366 5.99984 7.33366Z" stroke="#5F5971"/>
              <path d="M8.66659 10.0003C8.66659 10.737 8.66659 11.3337 5.99992 11.3337C3.33325 11.3337 3.33325 10.737 3.33325 10.0003C3.33325 9.26366 4.52659 8.66699 5.99992 8.66699C7.47325 8.66699 8.66659 9.26366 8.66659 10.0003Z" stroke="#5F5971"/>
              <path d="M1.33325 8.00033C1.33325 5.48633 1.33325 4.22899 2.11459 3.44833C2.89592 2.66766 4.15259 2.66699 6.66659 2.66699H9.33325C11.8473 2.66699 13.1046 2.66699 13.8853 3.44833C14.6659 4.22966 14.6666 5.48633 14.6666 8.00033C14.6666 10.5143 14.6666 11.7717 13.8853 12.5523C13.1039 13.333 11.8473 13.3337 9.33325 13.3337H6.66659C4.15259 13.3337 2.89525 13.3337 2.11459 12.5523C1.33392 11.771 1.33325 10.5143 1.33325 8.00033Z" stroke="#5F5971"/>
              <path d="M12.6666 8H9.99992M12.6666 6H9.33325M12.6666 10H10.6666" stroke="#5F5971" strokeLinecap="round"/>
            </>
          )}
        </svg>
        <span className="text-caption-lg text-text-secondary">{label}</span>
      </div>
      <div className="w-px h-8 bg-border-primary" />
      {link ? (
        <div className="flex items-center gap-1 flex-1">
          <span className="text-body-sm text-text-brand underline">{value}</span>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 12L12 2M12 2H5M12 2V9" stroke="var(--text-brand)" strokeWidth="1"/>
          </svg>
        </div>
      ) : (
        <span className="text-body-sm text-text-primary flex-1">{value}</span>
      )}
    </div>
  );
}
