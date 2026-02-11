'use client';

import { useState, useEffect } from 'react';

interface RejectPayoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
}

export default function RejectPayoutModal({ isOpen, onClose, onConfirm }: RejectPayoutModalProps) {
  const [reason, setReason] = useState('');

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

  const handleSubmit = () => {
    if (reason.trim()) {
      onConfirm(reason);
      setReason('');
    }
  };

  const handleClose = () => {
    setReason('');
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-hidden"
      onClick={handleClose}
    >
      <div 
        className="flex flex-col justify-end items-end p-5 gap-6 w-[420px] h-[245px] bg-white rounded-[10px]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Title */}
        <h2 className="font-sans font-bold text-base leading-[19px] text-text-primary w-full">
          Reject Payout
        </h2>

        {/* Input Section */}
        <div className="flex flex-col items-start gap-[5px] w-full h-[102px]">
          <label className="font-sans font-normal text-xs leading-[14px] text-text-secondary w-full">
            Reason for rejection
          </label>
          <div className="relative w-full h-[83px]">
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Why are you rejecting the payout?"
              className="w-full h-full bg-surface-secondary border border-border-primary rounded-md resize-none font-sans font-normal text-xs leading-[14px] text-text-primary placeholder:text-text-tertiary shadow-button"
              style={{ padding: '10px 12px' }}
            />
            {/* Resize Handle Icon */}
            <svg 
              width="9" 
              height="9" 
              viewBox="0 0 9 9" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="absolute pointer-events-none"
              style={{ right: '6px', bottom: '6px' }}
            >
              <path d="M8.35352 0.352539L0.353516 8.35254L0 7.99902L8 -0.000976562L8.35352 0.352539ZM8.35352 4.35254L4.35352 8.35254L4 7.99902L8 3.99902L8.35352 4.35254Z" fill="#5F5971"/>
            </svg>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-start gap-2 w-[174px] h-9">
          <button
            onClick={handleClose}
            className="flex items-center justify-center px-6 py-3.5 w-[90px] h-9 bg-white border border-border-primary rounded-[9px] shadow-button-inset"
          >
            <span
              className="font-sans text-body-sm text-[#353A44]"
              style={{ textShadow: '0px -1px 19.4px rgba(0, 0, 0, 0.25)' }}
            >
              Cancel
            </span>
          </button>
          <button
            onClick={handleSubmit}
            disabled={!reason.trim()}
            className="flex items-center justify-center px-6 py-3.5 w-[76px] h-9 rounded-[9px] shadow-button-inset disabled:opacity-50"
            style={{
              background: 'linear-gradient(180deg, #5F2EFC 22.58%, #4E18FC 100%)'
            }}
          >
            <span
              className="font-sans text-body-sm text-white"
              style={{ textShadow: '0px -1px 6px rgba(0, 0, 0, 0.25)' }}
            >
              Reject
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
