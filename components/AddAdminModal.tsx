'use client';

import { useState } from 'react';
import type { AdminRole } from '@/lib/api';

interface AddAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (payload: {
    email: string;
    firstName: string;
    lastName: string;
    role: AdminRole;
  }) => Promise<void>;
}

export default function AddAdminModal({ isOpen, onClose, onConfirm }: AddAdminModalProps) {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [role, setRole] = useState<AdminRole | ''>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resetForm = () => {
    setEmail('');
    setFirstName('');
    setLastName('');
    setRole('');
    setError(null);
  };

  const handleClose = () => {
    if (isSubmitting) return;
    resetForm();
    onClose();
  };

  const handleConfirm = async () => {
    if (!email || !firstName || !lastName || !role || isSubmitting) return;

    setIsSubmitting(true);
    setError(null);
    try {
      await onConfirm({ email, firstName, lastName, role });
      resetForm();
      onClose();
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Failed to create admin';
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-center justify-center"
      onClick={handleClose}
    >
      <div 
        className="flex flex-col justify-end items-end p-5 gap-6 w-[420px] bg-white rounded-[10px]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Title */}
        <h3 className="text-base font-bold leading-[19px] text-text-primary w-[380px] self-start">
          Add Admin
        </h3>

        {/* Content */}
        <div className="flex flex-col items-start gap-4 w-[380px]">
          <div className="flex flex-col items-start gap-[5px] w-[380px]">
            <label className="text-xs font-normal leading-[14px] text-text-primary w-full">
              First Name
            </label>
            
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First name"
              className="flex flex-row items-center px-3 py-1 w-full h-[34px] bg-surface-secondary border border-border-primary shadow-sm rounded-md text-xs font-normal text-text-primary placeholder-[#A5A1AF] focus:outline-none focus:ring-2 focus:ring-brand-primary"
            />
          </div>

          <div className="flex flex-col items-start gap-[5px] w-[380px]">
            <label className="text-xs font-normal leading-[14px] text-text-primary w-full">
              Last Name
            </label>
            
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last name"
              className="flex flex-row items-center px-3 py-1 w-full h-[34px] bg-surface-secondary border border-border-primary shadow-sm rounded-md text-xs font-normal text-text-primary placeholder-[#A5A1AF] focus:outline-none focus:ring-2 focus:ring-brand-primary"
            />
          </div>

          {/* Email Field */}
          <div className="flex flex-col items-start gap-[5px] w-[380px]">
            <label className="text-xs font-normal leading-[14px] text-text-primary w-full">
              Email
            </label>
            
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="flex flex-row items-center px-3 py-1 w-full h-[34px] bg-surface-secondary border border-border-primary shadow-sm rounded-md text-xs font-normal text-text-primary placeholder-[#A5A1AF] focus:outline-none focus:ring-2 focus:ring-brand-primary"
            />
          </div>

          {/* Role Field */}
          <div className="flex flex-col items-start gap-[5px] w-[380px]">
            <label className="text-xs font-normal leading-[14px] text-text-primary w-full">
              Role
            </label>
            
            <div className="relative w-full">
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as AdminRole | '')}
                className="appearance-none flex flex-row items-center px-3 py-1 w-full h-[34px] bg-surface-secondary border border-border-primary shadow-sm rounded-md text-xs font-normal text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-primary cursor-pointer"
              >
                <option value="" disabled className="text-text-tertiary">Select</option>
                <option value="Super Admin">Super Admin</option>
                <option value="Admin">Admin</option>
                <option value="Moderator">Moderator</option>
                <option value="Viewer">Viewer</option>
                <option value="User">User</option>
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

          {error ? (
            <div className="w-full rounded-md border border-[#F1C6C4] bg-surface-danger px-3 py-2 text-xs text-text-danger">
              {error}
            </div>
          ) : null}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-row items-start gap-2 w-[211px] h-9">
          <button
            onClick={handleClose}
            disabled={isSubmitting}
            className="flex flex-row justify-center items-center px-6 py-2 h-9 bg-white border border-border-primary rounded-lg shadow-button-inset hover:bg-gray-50 transition-colors"
          >
            <span className="text-body-sm text-[#353A44]">
              Cancel
            </span>
          </button>

          <button
            onClick={handleConfirm}
            disabled={!email || !firstName || !lastName || !role || isSubmitting}
            className="flex flex-row justify-center items-center px-6 py-2 h-9 bg-gradient-to-b from-brand-primary to-brand-purple rounded-lg shadow-button-inset hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="text-body-sm text-white">
              {isSubmitting ? 'Creating...' : 'Send Invite'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
