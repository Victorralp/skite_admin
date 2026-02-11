'use client';

import { useState } from 'react';

interface FilterDropdownProps {
    onApply?: (from: string, to: string) => void;
    onClose?: () => void;
}

export default function FilterDropdown({ onApply, onClose }: FilterDropdownProps) {
    const [fromValue, setFromValue] = useState('');
    const [toValue, setToValue] = useState('');

    const handleApply = () => {
        if (onApply) {
            onApply(fromValue, toValue);
        }
        if (onClose) {
            onClose();
        }
    };

    return (
        <div className="absolute left-[-0.75px] top-[27px] w-[185px] h-[154px] bg-white border border-border-brand rounded-2xl shadow-dropdown p-3 flex flex-col justify-center items-start gap-[10px] z-[2]">
            {/* Title */}
            <span className="font-sans text-caption-lg text-text-primary">
                Filter by: timeline
            </span>

            {/* Input Fields Container */}
            <div className="flex flex-col items-start gap-1 w-[161px] h-[64px]">
                {/* From Field */}
                <div className="flex items-center gap-[10px] w-[161px] h-[30px]">
                    <span className="w-[32.91px] font-sans text-caption-lg-regular text-text-primary">
                        From
                    </span>
                    <div className="flex-1 flex items-center justify-end px-2 py-2 bg-surface-secondary border border-border-primary rounded-md w-[118.09px] h-[30px]">
                        <input
                            type="text"
                            value={fromValue}
                            onChange={(e) => setFromValue(e.target.value)}
                            className="w-full bg-transparent font-sans text-caption-lg text-text-secondary text-right outline-none"
                            placeholder="₦"
                        />
                    </div>
                </div>

                {/* To Field */}
                <div className="flex items-center gap-[10px] w-[161px] h-[30px]">
                    <span className="w-[32.91px] font-sans text-caption-lg-regular text-text-primary">
                        To
                    </span>
                    <div className="flex-1 flex items-center justify-end px-2 py-2 bg-surface-secondary border border-border-primary rounded-md w-[118.09px] h-[30px]">
                        <input
                            type="text"
                            value={toValue}
                            onChange={(e) => setToValue(e.target.value)}
                            className="w-full bg-transparent font-sans text-caption-lg text-text-secondary text-right outline-none"
                            placeholder="₦"
                        />
                    </div>
                </div>
            </div>

            {/* Apply Button */}
            <button
                onClick={handleApply}
                className="flex items-center justify-center px-6 py-[14px] gap-1 w-[161px] h-[32px] bg-gradient-to-b from-brand-primary to-brand-purple shadow-button-inset rounded-[9px]"
            >
                <span className="font-sans text-body-sm text-center text-white [text-shadow:0px_-1px_6px_rgba(0,0,0,0.25)]">
                    Apply
                </span>
            </button>
        </div>
    );
}
