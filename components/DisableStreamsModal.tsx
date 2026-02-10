'use client';

import { useState } from 'react';

interface DisableStreamsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (duration: string) => void;
}

export default function DisableStreamsModal({ isOpen, onClose, onConfirm }: DisableStreamsModalProps) {
  const [duration, setDuration] = useState('');

  const handleConfirm = () => {
    onConfirm(duration);
    setDuration(''); // Reset after confirm
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-center justify-center"
      onClick={onClose}
    >
      <div 
        className="flex flex-col justify-end items-end p-5 gap-6 w-[420px] h-[196px] bg-white rounded-[10px]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Title */}
        <h3 className="text-base font-bold leading-[19px] text-[#2B2834] w-[380px] self-start">
          Disable New Streams
        </h3>

        {/* Content */}
        <div className="flex flex-col items-start gap-4 w-[380px] h-[53px]">
          <div className="flex flex-col items-start gap-[5px] w-[380px] h-[53px]">
            <label className="text-xs font-normal leading-[14px] text-[#2B2834] w-full">
              Duration
            </label>
            
            <div className="relative w-full">
              <input
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="How long do you want to disable new streams"
                className="flex flex-row items-center px-3 py-1 w-full h-[34px] bg-[#F9F9FB] border border-[#EBEBEB] shadow-sm rounded-md text-xs font-normal text-[#2B2834] placeholder-[#A5A1AF] focus:outline-none focus:ring-2 focus:ring-[#5F2EFC]"
              />
              <svg
                className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                width="10"
                height="5"
                viewBox="0 0 10 5"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 0L5 5L10 0H0Z" fill="#DBDBDB" />
              </svg>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-row items-start gap-2 w-[176px] h-9">
          <button
            onClick={onClose}
            className="flex flex-row justify-center items-center px-6 py-2 h-9 bg-white border border-[#EBEBEB] rounded-lg shadow-[inset_0px_1.5px_1px_rgba(255,255,255,0.11)] hover:bg-gray-50 transition-colors"
          >
            <span className="text-[13.5px] font-medium leading-4 text-[#353A44]">
              Cancel
            </span>
          </button>

          <button
            onClick={handleConfirm}
            className="flex flex-row justify-center items-center px-6 py-2 h-9 bg-gradient-to-b from-[#5F2EFC] to-[#4E18FC] rounded-lg shadow-[inset_0px_1.5px_1px_rgba(255,255,255,0.11)] hover:opacity-90 transition-opacity"
          >
            <span className="text-[13.5px] font-medium leading-4 text-[#FFFCF8]">
              Save
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}