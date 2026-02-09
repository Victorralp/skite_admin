'use client';

import WarningTriangle from './icons/WarningTriangle';

interface MuteChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function MuteChatModal({ isOpen, onClose, onConfirm }: MuteChatModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-center justify-center">
      <div className="flex flex-col justify-end items-end p-5 gap-6 w-[420px] h-[212.54px] bg-white rounded-[10px]">
        <div className="flex flex-col items-start gap-4 w-[380px] h-[112.54px]">
          {/* Warning Icon */}
          <div className="w-[58.66px] h-[51.54px] flex items-center justify-center">
            <WarningTriangle />
          </div>

          {/* Content */}
          <div className="flex flex-col items-start gap-1 w-[380px] h-[45px]">
            <h3 className="text-[20px] font-bold leading-6 tracking-[-0.01em] text-[#2B2834] w-full">
              Mute All Chat
            </h3>
            <p className="text-[13.5px] font-normal leading-4 text-[#5F5971] w-full">
              Are you sure you want to mute all chat?
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-row items-start gap-2 w-[223px] h-9">
          <button
            onClick={onClose}
            className="flex flex-row justify-center items-center px-6 py-2 h-9 bg-white border border-[#EBEBEB] rounded-lg shadow-[inset_0px_1.5px_1px_rgba(255,255,255,0.11)] hover:bg-gray-50 transition-colors"
          >
            <span className="text-[13.5px] font-medium leading-4 text-[#353A44]">
              Cancel
            </span>
          </button>

          <button
            onClick={onConfirm}
            className="flex flex-row justify-center items-center px-6 py-2 h-9 bg-gradient-to-b from-[#5F2EFC] to-[#4E18FC] rounded-lg shadow-[inset_0px_1.5px_1px_rgba(255,255,255,0.11)] hover:opacity-90 transition-opacity"
          >
            <span className="text-[13.5px] font-medium leading-4 text-[#FFFCF8]">
              Yes, Proceed
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}