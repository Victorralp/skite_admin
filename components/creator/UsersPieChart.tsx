'use client';

import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Creators', value: 14, color: '#FC552E' },
  { name: 'Users', value: 86, color: '#4682B8' }
];

const TOTAL_USERS = 1248;

export default function UsersPieChart() {
  return (
    <div 
      className="box-border flex flex-col justify-center items-center"
      style={{
        padding: '24px',
        gap: '12px',
        width: '355px',
        height: '271px',
        background: '#FFFFFF',
        border: '1px solid #EBEBEB',
        borderRadius: '12px'
      }}
    >
      {/* Chart Container */}
      <div className="relative" style={{ width: '197px', height: '197px' }}>
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
                  style={{ 
                    borderRadius: '4px',
                    opacity: 1
                  }}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        
        {/* Center Content */}
        <div 
          className="absolute flex flex-col items-center justify-center"
          style={{
            width: '84.18px',
            height: '36px',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        >
          <span 
            style={{
              width: '84.17755126953125px',
              height: '22px',
              fontFamily: 'Neue Montreal',
              fontWeight: 700,
              fontStyle: 'normal',
              fontSize: '18px',
              lineHeight: '100%',
              letterSpacing: '0%',
              textAlign: 'center',
              color: '#2B2834',
              opacity: 1
            }}
          >
            {TOTAL_USERS.toLocaleString()}
          </span>
          <span 
            style={{
              width: '84.17755126953125px',
              height: '14px',
              fontFamily: 'Neue Montreal',
              fontWeight: 400,
              fontStyle: 'normal',
              fontSize: '12px',
              lineHeight: '100%',
              letterSpacing: '0%',
              textAlign: 'center',
              color: '#00000066',
              opacity: 1
            }}
          >
            Users
          </span>
        </div>
      </div>
      
      {/* Legend */}
      <div 
        className="flex flex-row items-end"
        style={{
          padding: '0px',
          gap: '22px',
          width: '185px',
          height: '14px'
        }}
      >
        {/* Users Legend */}
        <div 
          className="flex flex-row items-center"
          style={{
            padding: '0px',
            gap: '4px',
            width: '76px',
            height: '14px'
          }}
        >
          <div 
            style={{
              width: '12px',
              height: '12px',
              background: '#4682B8',
              borderRadius: '4px'
            }}
          />
          <div 
            className="flex flex-row items-center"
            style={{
              padding: '0px',
              gap: '5px',
              width: '60px',
              height: '14px'
            }}
          >
            <span 
              style={{
                width: '31px',
                height: '14px',
                fontFamily: 'Neue Montreal',
                fontStyle: 'normal',
                fontWeight: 400,
                fontSize: '12px',
                lineHeight: '14px',
                display: 'flex',
                alignItems: 'center',
                color: '#000000'
              }}
            >
              Users
            </span>
            <span 
              style={{
                width: '24px',
                height: '14px',
                fontFamily: 'Neue Montreal',
                fontStyle: 'normal',
                fontWeight: 400,
                fontSize: '12px',
                lineHeight: '14px',
                color: 'rgba(0, 0, 0, 0.4)'
              }}
            >
              86%
            </span>
          </div>
        </div>

        {/* Creators Legend */}
        <div 
          className="flex flex-row items-center"
          style={{
            padding: '0px',
            gap: '4px',
            width: '87px',
            height: '14px'
          }}
        >
          <div 
            style={{
              width: '12px',
              height: '12px',
              background: '#FC552E',
              borderRadius: '4px'
            }}
          />
          <div 
            className="flex flex-row items-center"
            style={{
              padding: '0px',
              gap: '5px',
              width: '71px',
              height: '14px'
            }}
          >
            <span 
              style={{
                width: '45px',
                height: '14px',
                fontFamily: 'Neue Montreal',
                fontStyle: 'normal',
                fontWeight: 400,
                fontSize: '12px',
                lineHeight: '14px',
                display: 'flex',
                alignItems: 'center',
                color: '#000000'
              }}
            >
              Creators
            </span>
            <span 
              style={{
                width: '21px',
                height: '14px',
                fontFamily: 'Neue Montreal',
                fontStyle: 'normal',
                fontWeight: 400,
                fontSize: '12px',
                lineHeight: '14px',
                color: 'rgba(0, 0, 0, 0.4)'
              }}
            >
              14%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}