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
        <div className="absolute left-[-0.75px] top-[27px] w-[185px] h-[154px] bg-white border border-[#5F2EFC] rounded-2xl shadow-[0px_116px_46px_rgba(0,0,0,0.01),0px_65px_39px_rgba(0,0,0,0.05),0px_29px_29px_rgba(0,0,0,0.09),0px_7px_16px_rgba(0,0,0,0.1)] p-3 flex flex-col justify-center items-start gap-[10px] z-[2]">
            {/* Title */}
            <span className="font-['Neue_Montreal'] font-medium text-[12px] leading-[14px] text-[#2B2834]">
                Filter by: timeline
            </span>

            {/* Input Fields Container */}
            <div className="flex flex-col items-start gap-1 w-[161px] h-[64px]">
                {/* From Field */}
                <div className="flex items-center gap-[10px] w-[161px] h-[30px]">
                    <span className="w-[32.91px] font-['Neue_Montreal'] font-normal text-[12px] leading-[14px] text-[#2B2834]">
                        From
                    </span>
                    <div className="flex-1 flex items-center justify-end px-2 py-2 bg-[#F9F9FB] border border-[#EBEBEB] rounded-md w-[118.09px] h-[30px]">
                        <input
                            type="text"
                            value={fromValue}
                            onChange={(e) => setFromValue(e.target.value)}
                            className="w-full bg-transparent font-['Neue_Montreal'] font-medium text-[12px] leading-[14px] text-[#5F5971] text-right outline-none"
                            placeholder="₦"
                        />
                    </div>
                </div>

                {/* To Field */}
                <div className="flex items-center gap-[10px] w-[161px] h-[30px]">
                    <span className="w-[32.91px] font-['Neue_Montreal'] font-normal text-[12px] leading-[14px] text-[#2B2834]">
                        To
                    </span>
                    <div className="flex-1 flex items-center justify-end px-2 py-2 bg-[#F9F9FB] border border-[#EBEBEB] rounded-md w-[118.09px] h-[30px]">
                        <input
                            type="text"
                            value={toValue}
                            onChange={(e) => setToValue(e.target.value)}
                            className="w-full bg-transparent font-['Neue_Montreal'] font-medium text-[12px] leading-[14px] text-[#5F5971] text-right outline-none"
                            placeholder="₦"
                        />
                    </div>
                </div>
            </div>

            {/* Apply Button */}
            <button
                onClick={handleApply}
                className="flex items-center justify-center px-6 py-[14px] gap-1 w-[161px] h-[32px] bg-gradient-to-b from-[#5F2EFC] to-[#4E18FC] shadow-[inset_0px_1.5px_1px_rgba(255,255,255,0.11)] rounded-[9px]"
            >
                <span className="font-['Neue_Montreal'] font-medium text-[13.5px] leading-[16px] text-center text-[#FFFCF8] [text-shadow:0px_-1px_6px_rgba(0,0,0,0.25)]">
                    Apply
                </span>
            </button>
        </div>
    );
}
