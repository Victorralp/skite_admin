'use client';


import { topCreators } from '@/data/dashboard';
import { Mail } from 'lucide-react';

import CustomDropdown from '@/components/ui/CustomDropdown';

export default function TopCreatorsTable() {
  return (
    <div style={{
      width: '100%',
      height: '346px',
      padding: '16px',
      gap: '12px',
      backgroundColor: '#FFFFFF',
      border: '1px solid #EBEBEB',
      borderRadius: '8px',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Header */}
      <div style={{
        width: '100%',
        height: '30px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexShrink: 0
      }}>
        <h3 style={{
          fontFamily: 'Neue Montreal',
          fontWeight: 500,
          fontSize: '13.5px',
          lineHeight: '16px',
          color: '#2B2834'
        }}>Top Creators</h3>

        <CustomDropdown options={['Today', 'Yesterday', 'Last 7 days']} defaultLabel="Today" />
      </div>

      {/* Table Container */}
      <div style={{
        width: '100%',
        height: '272px',
        padding: '4px',
        gap: '4px',
        backgroundColor: '#F9F9FB',
        borderRadius: '12px',
        display: 'flex',
        flexDirection: 'column'
        // overflowX: 'auto' // Removed scrollbar per user request
      }}>

        {/* Table Headers */}
        <div style={{
          // minWidth: '1062px', // Removed fixed min-width to allow shrinking
          width: '100%',
          height: '30px',
          display: 'flex',
          alignItems: 'center',
          padding: '8px 24px',
          gap: '16px'
        }}>
          <div style={{ width: '27px', fontFamily: 'Neue Montreal', fontWeight: 500, fontSize: '12px', color: '#2B2834' }}>Rank</div>
          <div style={{ flex: 1, fontFamily: 'Neue Montreal', fontWeight: 500, fontSize: '12px', color: '#2B2834' }}>Name</div>
          <div style={{ width: '166.09px', fontFamily: 'Neue Montreal', fontWeight: 500, fontSize: '12px', color: '#2B2834' }}>Username</div>
          <div style={{ flex: 1, fontFamily: 'Neue Montreal', fontWeight: 500, fontSize: '12px', color: '#2B2834' }}>Email</div>
          <div style={{ width: '162.15px', fontFamily: 'Neue Montreal', fontWeight: 500, fontSize: '12px', color: '#2B2834' }}>Revenue Generated</div>
          <div style={{ width: '44px', fontFamily: 'Neue Montreal', fontWeight: 500, fontSize: '12px', color: '#2B2834' }}>Actions</div>
        </div>

        {/* Rows Container */}
        <div style={{
          // minWidth: '1062px', // Removed fixed min-width
          width: '100%',
          height: '230px', // Adjusted to fit remaining space? 272 - 4(pad) - 4(gap) - 30(header) - 4(pad bottom?) ~= 230
          backgroundColor: '#FFFFFF',
          border: '1px solid #EBEBEB',
          borderRadius: '8px',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}>
          {topCreators.map((creator, index) => (
            <div key={creator.rank} style={{
              width: '100%',
              height: '46px',
              display: 'flex',
              alignItems: 'center',
              padding: '14px 24px',
              gap: '16px',
              borderBottom: index !== topCreators.length - 1 ? '1px solid #EBEBEB' : 'none',
              backgroundColor: '#FFFFFF'
            }}>
              <div style={{ width: '27px', fontFamily: 'Neue Montreal', fontWeight: 400, fontSize: '13.5px', color: '#2B2834' }}>{creator.rank}</div>
              <div style={{ flex: 1, fontFamily: 'Neue Montreal', fontWeight: 400, fontSize: '13.5px', color: '#2B2834' }}>{creator.name}</div>
              <div style={{ width: '166.09px', fontFamily: 'Neue Montreal', fontWeight: 400, fontSize: '13.5px', color: '#2B2834' }}>{creator.username}</div>
              <div style={{ flex: 1, fontFamily: 'Neue Montreal', fontWeight: 400, fontSize: '13.5px', color: '#2B2834' }}>{creator.email}</div>
              <div style={{ width: '162.15px', fontFamily: 'Neue Montreal', fontWeight: 400, fontSize: '13.5px', color: '#2B2834' }}>{creator.revenue}</div>
              <div style={{ width: '44px', display: 'flex', justifyContent: 'center' }}>
                <Mail style={{ width: '18px', height: '18px', color: '#5F5971' }} />
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
