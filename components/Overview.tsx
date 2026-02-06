'use client';

import { Card, CardContent } from '@/components/ui/card';
import { overviewMetrics } from '@/data/dashboard';
import { TrendingUp } from 'lucide-react';

export default function Overview() {
  return (
    <div style={{
      width: '100%',
      // height: '128px', // Removing fixed height to allow wrapping
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      alignItems: 'flex-start'
    }}>
      <h2 style={{
        fontFamily: 'Neue Montreal',
        fontWeight: 700,
        fontSize: '20px',
        lineHeight: '24px',
        letterSpacing: '-0.01em',
        color: '#2B2834',
        margin: 0
      }}>Overview</h2>

      <div style={{
        width: '100%',
        // height: '96px', // Removing fixed height to allow wrapping
        display: 'flex',
        alignItems: 'flex-start',
        gap: '8px',
        flexWrap: 'wrap' // Allow wrapping on small screens
      }}>
        {overviewMetrics.map((metric) => (
          <div key={metric.title} style={{
            minWidth: '214px',
            height: '96px',
            backgroundColor: '#FFFFFF',
            border: '1px solid #EBEBEB',
            borderRadius: '8px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            padding: '16px',
            gap: '12px',
            flexGrow: 1
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', width: '182px', height: '40px' }}>
              <span style={{
                fontFamily: 'Neue Montreal',
                fontWeight: 400,
                fontSize: '12px',
                lineHeight: '14px',
                color: '#5F5971'
              }}>{metric.title}</span>
              <span style={{
                fontFamily: 'Neue Montreal',
                fontWeight: 500,
                fontSize: '18px',
                lineHeight: '22px',
                color: '#2B2834'
              }}>{metric.value}</span>
            </div>

            <span style={{
              fontFamily: 'Neue Montreal',
              fontWeight: 400,
              fontSize: '10px',
              lineHeight: '12px',
              color: '#239B73'
            }}>{metric.delta}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
