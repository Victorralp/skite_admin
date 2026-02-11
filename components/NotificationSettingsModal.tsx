'use client';

import { X, Check } from 'lucide-react';
import { useState } from 'react';

interface NotificationSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NotificationSettingsModal({ isOpen, onClose }: NotificationSettingsModalProps) {
  const [notificationTypes, setNotificationTypes] = useState({
    email: true,
    sms: false,
    inApp: false,
    push: false,
  });

  const [rateLimits, setRateLimits] = useState({
    email: '500/Day',
    sms: '100/day',
    inApp: 'Unlimited',
    push: '1,000/Day',
  });

  const toggleNotificationType = (type: keyof typeof notificationTypes) => {
    setNotificationTypes(prev => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end"
      onClick={onClose}
    >
      <div 
        className="flex flex-col items-start w-[400px] h-full bg-white shadow-xl overflow-hidden animate-slide-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex flex-col items-start px-6 py-6 gap-4 w-full">
          <div className="flex flex-row justify-between items-start w-full">
            <button
              onClick={onClose}
              className="flex flex-row items-center px-2 py-1.5 gap-1.5 bg-surface-secondary rounded-md hover:bg-gray-200 transition-colors"
            >
              <X className="w-4 h-4 text-text-primary" strokeWidth={1.5} />
              <span className="text-body-sm text-[#17181C]">
                Close
              </span>
            </button>

            <button className="flex flex-row justify-center items-center px-4 py-1.5 h-7 bg-gradient-to-b from-brand-primary to-brand-purple rounded-lg shadow-button-inset hover:opacity-90 transition-opacity">
              <span className="text-body-sm text-white">
                Save
              </span>
            </button>
          </div>

          <h2 className="text-lg font-bold leading-[22px] text-[#17181C]">
            Notification Settings
          </h2>
        </div>

        <div className="w-full h-px border-t border-border-secondary" />

        {/* Content */}
        <div className="flex flex-col items-center px-6 py-6 gap-2 w-full overflow-y-auto">
          {/* Types Section */}
          <div className="flex flex-col items-start p-4 gap-3 w-full bg-surface-secondary rounded-lg">
            <h3 className="text-[13.5px] font-bold leading-4 text-text-primary w-full">
              Types
            </h3>

            <div className="flex flex-col items-start gap-2 w-full">
              {/* Email */}
              <div className="flex flex-row items-center gap-1.5 w-full">
                <button
                  onClick={() => toggleNotificationType('email')}
                  className={`w-4 h-4 rounded flex items-center justify-center border transition-colors ${
                    notificationTypes.email
                      ? 'bg-brand-primary border-border-brand'
                      : 'bg-white border-border-primary'
                  }`}
                >
                  {notificationTypes.email && (
                    <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                  )}
                </button>
                <label className={`text-body-sm-regular flex-1 ${
                  notificationTypes.email ? 'text-text-primary' : 'text-text-tertiary'
                }`}>
                  Email
                </label>
              </div>

              {/* SMS */}
              <div className="flex flex-row items-center gap-1.5 w-full">
                <button
                  onClick={() => toggleNotificationType('sms')}
                  className={`w-4 h-4 rounded flex items-center justify-center border transition-colors ${
                    notificationTypes.sms
                      ? 'bg-brand-primary border-border-brand'
                      : 'bg-white border-border-primary'
                  }`}
                >
                  {notificationTypes.sms && (
                    <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                  )}
                </button>
                <label className={`text-body-sm-regular flex-1 ${
                  notificationTypes.sms ? 'text-text-primary' : 'text-text-tertiary'
                }`}>
                  SMS
                </label>
              </div>

              {/* In-App */}
              <div className="flex flex-row items-center gap-1.5 w-full">
                <button
                  onClick={() => toggleNotificationType('inApp')}
                  className={`w-4 h-4 rounded flex items-center justify-center border transition-colors ${
                    notificationTypes.inApp
                      ? 'bg-brand-primary border-border-brand'
                      : 'bg-white border-border-primary'
                  }`}
                >
                  {notificationTypes.inApp && (
                    <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                  )}
                </button>
                <label className={`text-body-sm-regular flex-1 ${
                  notificationTypes.inApp ? 'text-text-primary' : 'text-text-tertiary'
                }`}>
                  In-App
                </label>
              </div>

              {/* Push */}
              <div className="flex flex-row items-center gap-1.5 w-full">
                <button
                  onClick={() => toggleNotificationType('push')}
                  className={`w-4 h-4 rounded flex items-center justify-center border transition-colors ${
                    notificationTypes.push
                      ? 'bg-brand-primary border-border-brand'
                      : 'bg-white border-border-primary'
                  }`}
                >
                  {notificationTypes.push && (
                    <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                  )}
                </button>
                <label className={`text-body-sm-regular flex-1 ${
                  notificationTypes.push ? 'text-text-primary' : 'text-text-tertiary'
                }`}>
                  Push
                </label>
              </div>
            </div>
          </div>

          {/* Rate Limit Section */}
          <div className="flex flex-col items-start p-4 gap-2 w-full bg-surface-secondary rounded-lg">
            <h3 className="text-[13.5px] font-bold leading-4 text-text-primary w-full">
              Rate Limit
            </h3>

            <div className="flex flex-col items-start w-full">
              {/* Email Rate Limit */}
              <div className="flex flex-row items-center py-2 gap-4 w-full border-b border-border-primary">
                <label className="text-body-sm-regular text-text-secondary flex-1">
                  Email
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={rateLimits.email}
                    onChange={(e) => setRateLimits(prev => ({ ...prev, email: e.target.value }))}
                    className="flex flex-row items-center px-3 py-2 w-[95px] h-[30px] bg-white border border-border-primary shadow-sm rounded-md text-xs font-medium text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-primary"
                  />
                  <svg
                    className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none"
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

              {/* SMS Rate Limit */}
              <div className="flex flex-row items-center py-2 gap-4 w-full border-b border-border-primary">
                <label className="text-body-sm-regular text-text-secondary flex-1">
                  SMS
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={rateLimits.sms}
                    onChange={(e) => setRateLimits(prev => ({ ...prev, sms: e.target.value }))}
                    className="flex flex-row items-center px-3 py-2 w-[95px] h-[30px] bg-white border border-border-primary shadow-sm rounded-md text-xs font-medium text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-primary"
                  />
                  <svg
                    className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none"
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

              {/* In-App Rate Limit */}
              <div className="flex flex-row items-center py-2 gap-4 w-full border-b border-border-primary">
                <label className="text-body-sm-regular text-text-secondary flex-1">
                  In-App
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={rateLimits.inApp}
                    onChange={(e) => setRateLimits(prev => ({ ...prev, inApp: e.target.value }))}
                    className="flex flex-row items-center px-3 py-2 w-[95px] h-[30px] bg-white border border-border-primary shadow-sm rounded-md text-xs font-medium text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-primary"
                  />
                  <svg
                    className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none"
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

              {/* Push Rate Limit */}
              <div className="flex flex-row items-center pt-2 gap-4 w-full">
                <label className="text-body-sm-regular text-text-secondary flex-1">
                  Push
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={rateLimits.push}
                    onChange={(e) => setRateLimits(prev => ({ ...prev, push: e.target.value }))}
                    className="flex flex-row items-center px-3 py-2 w-[95px] h-[30px] bg-white border border-border-primary shadow-sm rounded-md text-xs font-medium text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-primary"
                  />
                  <svg
                    className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none"
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
          </div>
        </div>
      </div>
    </div>
  );
}
