'use client';

import { useEffect } from 'react';

interface HoldTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
}

export default function HoldTransactionModal({ isOpen, onClose, onConfirm }: HoldTransactionModalProps) {
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

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const reason = formData.get('reason') as string;
    onConfirm(reason);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-hidden">
      <div className="w-[420px] h-[245px] bg-white rounded-[10px] p-5 flex flex-col justify-end items-end gap-6">
        {/* Title */}
        <h2 className="font-['Neue_Montreal'] font-bold text-base leading-[19px] text-[#2B2834] w-full">
          Hold transaction
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
          {/* Input Section */}
          <div className="flex flex-col items-start gap-[5px] w-full">
            <label 
              htmlFor="reason" 
              className="font-['Neue_Montreal'] font-normal text-xs leading-[14px] text-[#5F5971] w-full"
            >
              Reason for hold
            </label>
            <div className="relative w-full h-[83px]">
              <textarea
                id="reason"
                name="reason"
                placeholder="Why are you putting the transaction on hold?"
                className="w-full h-full bg-[#F9F9FB] border border-[#EBEBEB] rounded-md font-['Neue_Montreal'] font-normal text-xs leading-[14px] text-[#2B2834] placeholder:text-[#A5A1AF] resize-none shadow-[0px_1px_2px_rgba(0,0,0,0.05)] focus:outline-none focus:ring-2 focus:ring-[#5F2EFC] focus:border-transparent"
                style={{ padding: '10px 12px' }}
                required
              />
              {/* Resize Handle Icon */}
              <svg 
                className="absolute pointer-events-none" 
                style={{ 
                  width: '9px', 
                  height: '9px', 
                  right: '6px', 
                  bottom: '6px'
                }}
                viewBox="0 0 9 9" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M8.35352 0.352539L0.353516 8.35254L0 7.99902L8 -0.000976562L8.35352 0.352539ZM8.35352 4.35254L4.35352 8.35254L4 7.99902L8 3.99902L8.35352 4.35254Z" fill="#5F5971"/>
              </svg>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-start gap-2 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="flex items-center justify-center px-6 py-3.5 w-[90px] h-9 bg-white border border-[#EBEBEB] rounded-[9px] shadow-[inset_0px_1.5px_1px_rgba(255,255,255,0.11)]"
            >
              <span 
                className="font-['Neue_Montreal'] font-medium text-[13.5px] leading-4 text-[#353A44]"
                style={{ textShadow: '0px -1px 19.4px rgba(0, 0, 0, 0.25)' }}
              >
                Cancel
              </span>
            </button>
            <button
              type="submit"
              className="flex items-center justify-center px-6 py-3.5 w-[76px] h-9 rounded-[9px] shadow-[inset_0px_1.5px_1px_rgba(255,255,255,0.11)]"
              style={{
                background: 'linear-gradient(180deg, #5F2EFC 22.58%, #4E18FC 100%)'
              }}
            >
              <span 
                className="font-['Neue_Montreal'] font-medium text-[13.5px] leading-4 text-[#FFFCF8]"
                style={{ textShadow: '0px -1px 6px rgba(0, 0, 0, 0.25)' }}
              >
                Hold
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
