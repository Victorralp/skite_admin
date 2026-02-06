'use client';

import { recentTransactions } from '@/data/dashboard';
import { cn } from '@/lib/utils';
import { CheckCircle2, AlertCircle, AlertTriangle } from 'lucide-react';

const StatusBadge = ({ status }: { status: string }) => {
  if (status === 'Success') {
    return (
      <div className="flex items-center justify-center gap-0.5 px-1.5 py-0.5 rounded-[4px] bg-[#E7F3EF]" style={{ height: '14px', width: 'fit-content' }}>
        <CheckCircle2 className="w-[10px] h-[10px] text-[#239B73]" />
        <span style={{ fontFamily: 'Neue Montreal', fontWeight: 500, fontSize: '10px', lineHeight: '12px', color: '#239B73' }}>Success</span>
      </div>
    );
  }
  if (status === 'Pending') {
    return (
      <div className="flex items-center justify-center gap-0.5 px-1.5 py-0.5 rounded-[4px] bg-[#FFF3EB]" style={{ height: '14px', width: 'fit-content' }}>
        <AlertCircle className="w-[10px] h-[10px] text-[#FB6A00]" />
        <span style={{ fontFamily: 'Neue Montreal', fontWeight: 500, fontSize: '10px', lineHeight: '12px', color: '#FB6A00' }}>Pending</span>
      </div>
    );
  }
  return (
    <div className="flex items-center justify-center gap-0.5 px-1.5 py-0.5 rounded-[4px] bg-[#FBECEB]" style={{ height: '14px', width: 'fit-content' }}>
      <AlertTriangle className="w-[10px] h-[10px] text-[#CD110A]" />
      <span style={{ fontFamily: 'Neue Montreal', fontWeight: 500, fontSize: '10px', lineHeight: '12px', color: '#CD110A' }}>Flagged</span>
    </div>
  );
};

export default function RecentTransactionsTable() {
  return (
    <div style={{
      width: '100%',
      height: '366px',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px'
    }}>
      {/* Header */}
      <div style={{
        width: '100%',
        height: '24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h2 style={{
          fontFamily: 'Neue Montreal',
          fontWeight: 700,
          fontSize: '20px',
          lineHeight: '24px',
          letterSpacing: '-0.01em',
          color: '#2B2834'
        }}>Recent Transactions</h2>
        <button style={{
          fontFamily: 'Neue Montreal',
          fontWeight: 500,
          fontSize: '13.5px',
          lineHeight: '16px',
          textDecorationLine: 'underline',
          color: '#5F2EFC'
        }}>See All</button>
      </div>

      {/* Table Wrapper */}
      <div style={{
        width: '100%',
        height: '330px',
        padding: '4px',
        gap: '4px',
        backgroundColor: '#F9F9FB',
        borderRadius: '8px',
        display: 'flex',
        flexDirection: 'column'
        // overflowX: 'auto' // Removed scrollbar
      }}>

        {/* Table Header Row */}
        <div style={{
          // minWidth: '1094px', // Removed fixed min-width
          width: '100%',
          height: '30px',
          display: 'flex',
          alignItems: 'center',
          padding: '8px 24px',
          gap: '16px'
        }}>
          <div style={{ width: '100px', fontFamily: 'Neue Montreal', fontWeight: 500, fontSize: '12px', color: '#2B2834' }}>TXN ID</div>
          <div style={{ width: '193.33px', fontFamily: 'Neue Montreal', fontWeight: 500, fontSize: '12px', color: '#2B2834' }}>Product</div>
          <div style={{ width: '193.33px', fontFamily: 'Neue Montreal', fontWeight: 500, fontSize: '12px', color: '#2B2834' }}>Creator</div>
          <div style={{ width: '193.33px', fontFamily: 'Neue Montreal', fontWeight: 500, fontSize: '12px', color: '#2B2834' }}>Buyer</div>
          <div style={{ width: '100px', fontFamily: 'Neue Montreal', fontWeight: 500, fontSize: '12px', color: '#2B2834' }}>Amount</div>
          <div style={{ width: '120px', fontFamily: 'Neue Montreal', fontWeight: 500, fontSize: '12px', color: '#2B2834' }}>Date</div>
          <div style={{ width: '50px', fontFamily: 'Neue Montreal', fontWeight: 500, fontSize: '12px', color: '#2B2834' }}>Status</div>
        </div>

        {/* Rows Container */}
        <div style={{
          // minWidth: '1094px', // Removed fixed min-width
          width: '100%',
          height: '288px',
          backgroundColor: '#FFFFFF',
          border: '1px solid #EBEBEB',
          borderRadius: '8px',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}>
          {recentTransactions.map((txn, index) => (
            <div key={`${txn.id}-${index}`} style={{
              width: '100%',
              height: '52px',
              display: 'flex',
              alignItems: 'center',
              padding: '12px 24px',
              gap: '16px',
              borderBottom: index !== recentTransactions.length - 1 ? '1px solid #EBEBEB' : 'none',
              backgroundColor: '#FFFFFF'
            }}>
              <div style={{ width: '100px', fontFamily: 'Neue Montreal', fontWeight: 400, fontSize: '13.5px', color: '#2B2834' }}>{txn.id}</div>
              <div style={{ width: '193.33px', fontFamily: 'Neue Montreal', fontWeight: 400, fontSize: '12px', lineHeight: '14px', color: '#2B2834', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{txn.product}</div>
              <div style={{ width: '193.33px', fontFamily: 'Neue Montreal', fontWeight: 400, fontSize: '13.5px', color: '#2B2834' }}>{txn.creator}</div>
              <div style={{ width: '193.33px', fontFamily: 'Neue Montreal', fontWeight: 400, fontSize: '13.5px', color: '#2B2834' }}>{txn.buyer}</div>
              <div style={{ width: '100px', fontFamily: 'Neue Montreal', fontWeight: 400, fontSize: '13.5px', color: '#2B2834' }}>{txn.amount}</div>
              <div style={{ width: '120px', fontFamily: 'Neue Montreal', fontWeight: 400, fontSize: '13.5px', color: '#2B2834' }}>{txn.date}</div>
              <div style={{ width: '50px' }}>
                <StatusBadge status={txn.status} />
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
