'use client';

import React from 'react';

interface CustomDropdownProps {
    options: string[];
    defaultLabel?: string;
    width?: string;
    menuWidth?: string;
    menuHeight?: string;
}

export default function CustomDropdown({
    options,
    defaultLabel = 'Today',
    width = '69px', // Default tailored for 'Today'
    menuWidth = '114px',
    menuHeight // Calculated automatically if not provided
}: CustomDropdownProps) {

    // Basic calculation for height if not provided: 33px per item
    const calculatedHeight = menuHeight || `${options.length * 33}px`;

    return (
        <div className="relative group">
            {/* Trigger Button */}
            <button style={{
                width: width,
                height: '30px',
                display: 'flex',
                alignItems: 'center',
                padding: '5px 7px 5px 10px',
                backgroundColor: '#FFFFFF',
                border: '1px solid #EBEBEB', // 0.2px in some designs? Sticking to 1px as per RevenueTrend impl which looked good
                borderRadius: '8px',
                boxShadow: '0px 1px 4.8px rgba(0, 0, 0, 0.03)',
                cursor: 'pointer',
                gap: '4px'
            }}>
                <span style={{
                    fontFamily: 'Neue Montreal',
                    fontWeight: 400,
                    fontSize: '12px',
                    lineHeight: '14px',
                    color: '#5F5971',
                    whiteSpace: 'nowrap',
                    flex: 1,
                    textAlign: 'left'
                }}>{defaultLabel}</span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M5.83337 7.5L10 11.6667L14.1667 7.5H5.83337Z" fill="#5F5971" />
                </svg>
            </button>

            {/* Dropdown Menu */}
            <div className="hidden group-hover:flex absolute right-0 top-[34px] z-50 rounded-[8px] flex-col overflow-hidden bg-white"
                style={{
                    width: menuWidth,
                    height: calculatedHeight,
                    border: '1px solid #EBEBEB',
                    boxShadow: '0px 116px 46px rgba(0, 0, 0, 0.01), 0px 65px 39px rgba(0, 0, 0, 0.05), 0px 29px 29px rgba(0, 0, 0, 0.09), 0px 7px 16px rgba(0, 0, 0, 0.1)',
                    padding: '0px'
                }}
            >
                {options.map((item, i) => (
                    <div key={item} style={{
                        width: menuWidth,
                        height: '33px',
                        display: 'flex',
                        alignItems: 'center',
                        padding: '8px 16px', // Standard padding
                        gap: '10px',
                        backgroundColor: '#FFFFFF',
                        borderBottom: i < options.length - 1 ? '0.2px solid #EBEBEB' : 'none',
                        cursor: 'pointer'
                    }} className="hover:bg-gray-50">
                        <span style={{
                            fontFamily: 'Neue Montreal',
                            fontWeight: 400,
                            fontSize: '13.5px',
                            lineHeight: '16px',
                            color: '#5F5971'
                        }}>{item}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
