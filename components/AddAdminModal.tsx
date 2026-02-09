'use client';

import { useState } from 'react';

interface AddAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (email: string, role: string) => void;
}

export default function AddAdminModal({ isOpen, onClose, onConfirm }: AddAdminModalProps) {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');

  const handleConfirm = () => {
    if (email && role) {
      onConfirm(email, role);
      setEmail(''); // Reset after confirm
      setRole('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-center justify-center">
      <div className="flex flex-col justify-end items-end p-5 gap-6 w-[420px] h-[265px] bg-white rounded-[10px]">
        {/* Title */}
        <h3 className="text-base font-bold leading-[19px] text-[#2B2834] w-[380px] self-start">
          Add Admin
        </h3>

        {/* Content */}
        <div className="flex flex-col items-start gap-4 w-[380px] h-[122px]">
          {/* Email Field */}
          <div className="flex flex-col items-start gap-[5px] w-[380px] h-[53px]">
            <label className="text-xs font-normal leading-[14px] text-[#2B2834] w-full">
              Email
            </label>
            
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="flex flex-row items-center px-3 py-1 w-full h-[34px] bg-[#F9F9FB] border border-[#EBEBEB] shadow-sm rounded-md text-xs font-normal text-[#2B2834] placeholder-[#A5A1AF] focus:outline-none focus:ring-2 focus:ring-[#5F2EFC]"
            />
          </div>

          {/* Role Field */}
          <div className="flex flex-col items-start gap-[5px] w-[380px] h-[53px]">
            <label className="text-xs font-normal leading-[14px] text-[#2B2834] w-full">
              Role
            </label>
            
            <div className="relative w-full">
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="appearance-none flex flex-row items-center px-3 py-1 w-full h-[34px] bg-[#F9F9FB] border border-[#EBEBEB] shadow-sm rounded-md text-xs font-normal text-[#2B2834] focus:outline-none focus:ring-2 focus:ring-[#5F2EFC] cursor-pointer"
              >
                <option value="" disabled className="text-[#A5A1AF]">Select</option>
                <option value="Super Admin">Super Admin</option>
                <option value="Admin">Admin</option>
                <option value="Moderator">Moderator</option>
                <option value="Viewer">Viewer</option>
              </select>
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
        <div className="flex flex-row items-start gap-2 w-[211px] h-9">
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
            disabled={!email || !role}
            className="flex flex-row justify-center items-center px-6 py-2 h-9 bg-gradient-to-b from-[#5F2EFC] to-[#4E18FC] rounded-lg shadow-[inset_0px_1.5px_1px_rgba(255,255,255,0.11)] hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="text-[13.5px] font-medium leading-4 text-[#FFFCF8]">
              Send Invite
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}