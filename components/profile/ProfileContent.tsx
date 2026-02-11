"use client";

import { useEffect, useState } from 'react';
import { getMe } from '@/lib/api';

function getInitials(name?: string | null) {
  const safeName = (name ?? '').trim();
  if (!safeName) return 'SK';
  const parts = safeName.split(/\s+/).filter(Boolean);
  const first = parts[0]?.[0] ?? '';
  const last = parts.length > 1 ? parts[parts.length - 1]?.[0] ?? '' : '';
  return `${first}${last}`.toUpperCase() || 'SK';
}

// Custom Edit Icon
const EditIcon = ({ className }: { className?: string }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path d="M2.66666 14.0002H13.3333M3.77733 8.79156C3.49307 9.07645 3.33340 9.46244 3.33333 9.86489V12.0002H5.482C5.88466 12.0002 6.27066 11.8402 6.55533 11.5549L12.8887 5.21822C13.1728 4.93329 13.3324 4.54730 13.3324 4.14489C13.3324 3.74248 13.1728 3.35649 12.8887 3.07156L12.2633 2.44489C12.1223 2.30379 11.9549 2.19187 11.7705 2.11554C11.5862 2.03920 11.3887 1.99994 11.1892 2C10.9897 2.00006 10.7922 2.03944 10.6079 2.1159C10.4237 2.19235 10.2563 2.30437 10.1153 2.44556L3.77733 8.79156Z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Eye Icon for password visibility toggle
const EyeIcon = ({ className }: { className?: string }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <g clipPath="url(#clip0)">
      <path d="M0.666626 8.00016C0.666626 8.00016 3.33329 2.66683 7.99996 2.66683C12.6666 2.66683 15.3333 8.00016 15.3333 8.00016C15.3333 8.00016 12.6666 13.3335 7.99996 13.3335C3.33329 13.3335 0.666626 8.00016 0.666626 8.00016Z" stroke="#5F5971" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10Z" stroke="#5F5971" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </g>
    <defs>
      <clipPath id="clip0">
        <rect width="16" height="16" fill="white"/>
      </clipPath>
    </defs>
  </svg>
);

export default function ProfileContent() {
  const [editingField, setEditingField] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [profile, setProfile] = useState<{
    name: string;
    role?: string;
    avatar?: string | null;
  } | null>(null);
  const [tempValue, setTempValue] = useState('');
  const [passwordData, setPasswordData] = useState({
    current: '',
    new: '',
    confirm: ''
  });
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false
  });

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const me = await getMe();
        if (!mounted) return;
        const name =
          me?.name ??
          ([me?.first_name, me?.last_name].filter(Boolean).join(' ').trim() ||
            'User');
        setProfile({
          name,
          role: me?.role ?? (me?.permissions ? 'Admin' : 'User'),
          avatar: me?.avatar ?? me?.picture ?? null
        });
        setEmail(me?.email ?? me?.username ?? '');
        setPhone(me?.phone ?? me?.phone_number ?? '');
      } catch {
        if (mounted) {
          setProfile(null);
        }
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const handleEdit = (field: string, currentValue: string) => {
    setEditingField(field);
    if (field === 'password') {
      setPasswordData({ current: '', new: '', confirm: '' });
    } else {
      setTempValue(currentValue);
    }
  };

  const handleSave = (field: string) => {
    if (field === 'email') {
      setEmail(tempValue);
    } else if (field === 'phone') {
      setPhone(tempValue);
    } else if (field === 'password') {
      // Validate passwords match
      if (passwordData.new === passwordData.confirm) {
        console.log('Password updated');
      }
    }
    setEditingField(null);
  };

  const handleCancel = () => {
    setEditingField(null);
    setTempValue('');
    setPasswordData({ current: '', new: '', confirm: '' });
  };

  const togglePasswordVisibility = (field: 'current' | 'new' | 'confirm') => {
    setShowPassword(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const avatarSeed = encodeURIComponent(getInitials(profile?.name));

  return (
    <div className="flex flex-col items-start gap-8 w-full">
      {/* Page Title */}
      <h1 className="font-sans text-heading-lg-bold text-text-primary">
        Profile
      </h1>

      {/* Main Content Container - Two Cards Side by Side */}
      <div className="flex flex-col lg:flex-row items-start gap-6 w-full">
        {/* Left Column - Profile Card */}
        <div className="flex flex-col items-center p-8 gap-4 w-full lg:w-[260px] lg:min-w-[260px] lg:max-w-[260px] h-[260px] bg-white border border-border-primary rounded-[16px]">
            {/* Profile Image Container */}
            <div className="relative flex justify-center items-end w-[120px] h-[120px] rounded-[100px] bg-gray-100 border border-border-primary overflow-hidden">
              <img
                src={
                  profile?.avatar ||
                  `https://api.dicebear.com/7.x/initials/svg?seed=${avatarSeed}`
                }
                alt={profile?.name ?? 'Profile'}
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* Change Button */}
              <div className="flex items-center justify-center gap-[4px] w-[120px] h-[22px] bg-white border border-border-secondary rounded-[6px] z-10 px-2 pb-[6px] pt-[4px]">
                <span className="font-sans text-caption-sm text-text-primary">Change</span>
              </div>
            </div>

            {/* Name and Contact Info */}
            <div className="flex flex-col items-center gap-[2px]">
              <h2 className="font-sans font-medium text-[20px] leading-[24px] tracking-[-0.01em] text-text-primary">
                {profile?.name ?? '—'}
              </h2>
              <p className="font-sans text-body-sm-regular text-text-secondary">
                {email || '—'}
              </p>
              <p className="font-sans text-body-sm-regular text-text-secondary">
                {profile?.role ?? '—'}
              </p>
            </div>
        </div>

        {/* Right Column - Account Information */}
        <div className="flex flex-col items-start p-8 gap-6 w-full lg:flex-1 min-h-[400px] bg-white border border-border-primary rounded-[16px]">

          {/* Account Information Title */}
          <h3 className="font-sans text-heading-lg-bold text-text-primary">
            Account Information
          </h3>

          {/* Account Information Fields */}
          <div className="flex flex-col items-start gap-[18px] w-full">
            {/* Email Field */}
            <div className="flex flex-col items-start gap-1 w-full">
              <span className="font-sans text-heading-sm text-text-primary">
                Email
              </span>
              {editingField === 'email' ? (
                <div className="flex flex-col items-start gap-1 w-full">
                  <input
                    type="email"
                    value={tempValue}
                    onChange={(e) => setTempValue(e.target.value)}
                    placeholder="undiebekwa@gmail.com"
                    className="flex flex-row items-center px-3 py-[10px] w-full h-9 bg-surface-secondary border border-border-primary rounded-[6px] shadow-button font-sans text-body-sm-regular text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-border-brand"
                  />
                  <div className="flex flex-row justify-end items-center gap-1 w-full h-7">
                    <button
                      onClick={handleCancel}
                      className="flex flex-row justify-center items-center px-[14px] py-[14px] w-[70px] h-7 bg-white border border-border-primary rounded-[9px] shadow-button-inset font-sans text-body-sm text-[#353A44] hover:bg-gray-50 transition-colors"
                      style={{ textShadow: '0px -1px 19.4px rgba(0, 0, 0, 0.25)' }}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleSave('email')}
                      className="flex flex-row justify-center items-center px-[14px] py-[14px] w-[58px] h-7 rounded-[9px] shadow-button-inset font-sans text-body-sm text-white hover:opacity-90 transition-opacity"
                      style={{
                        background: 'linear-gradient(180deg, #5F2EFC 22.58%, #4E18FC 100%)',
                        textShadow: '0px -1px 6px rgba(0, 0, 0, 0.25)'
                      }}
                    >
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-row justify-between items-center gap-1 w-full">
                  <span className="font-sans text-body-sm-regular text-text-secondary">
                    {email}
                  </span>
                  <button
                    onClick={() => handleEdit('email', email)}
                    className="text-text-secondary hover:text-text-primary transition-colors"
                  >
                    <EditIcon className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Role Field */}
            <div className="flex flex-col items-start gap-1 w-full">
              <span className="font-sans text-heading-sm text-text-primary">
                Role
              </span>
              <div className="flex flex-row justify-between items-center gap-1 w-full">
                <span className="font-sans text-body-sm-regular text-text-secondary">
                  {profile?.role ?? '—'}
                </span>
              </div>
            </div>

            {/* Phone Number Field */}
            <div className="flex flex-col items-start gap-1 w-full">
              <span className="font-sans text-heading-sm text-text-primary">
                Phone Number
              </span>
              {editingField === 'phone' ? (
                <div className="flex flex-col items-start gap-1 w-full">
                  <input
                    type="tel"
                    value={tempValue}
                    onChange={(e) => setTempValue(e.target.value)}
                    placeholder="07065051560"
                    className="flex flex-row items-center px-3 py-[10px] w-full h-9 bg-surface-secondary border border-border-primary rounded-[6px] shadow-button font-sans text-body-sm-regular text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-border-brand"
                  />
                  <div className="flex flex-row justify-end items-center gap-1 w-full h-7">
                    <button
                      onClick={handleCancel}
                      className="flex flex-row justify-center items-center px-[14px] py-[14px] w-[70px] h-7 bg-white border border-border-primary rounded-[9px] shadow-button-inset font-sans text-body-sm text-[#353A44] hover:bg-gray-50 transition-colors"
                      style={{ textShadow: '0px -1px 19.4px rgba(0, 0, 0, 0.25)' }}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleSave('phone')}
                      className="flex flex-row justify-center items-center px-[14px] py-[14px] w-[58px] h-7 rounded-[9px] shadow-button-inset font-sans text-body-sm text-white hover:opacity-90 transition-opacity"
                      style={{
                        background: 'linear-gradient(180deg, #5F2EFC 22.58%, #4E18FC 100%)',
                        textShadow: '0px -1px 6px rgba(0, 0, 0, 0.25)'
                      }}
                    >
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-row justify-between items-center gap-1 w-full">
                  <span className="font-sans text-body-sm-regular text-text-secondary">
                    {phone || '—'}
                  </span>
                  <button
                    onClick={() => handleEdit('phone', phone)}
                    className="text-text-secondary hover:text-text-primary transition-colors"
                  >
                    <EditIcon className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Divider Line */}
          <div className="w-full h-0 border-t border-border-primary" />

          {/* Security Title */}
          <h3 className="font-sans text-heading-lg-bold text-text-primary">
            Security
          </h3>

          {/* Security Fields */}
          <div className="flex flex-col items-start gap-[18px] w-full">
            {/* Password Field */}
            <div className="flex flex-col items-start gap-4 w-full">
              <span className="font-sans text-heading-sm text-text-primary">
                Password
              </span>
              {editingField === 'password' ? (
                <div className="flex flex-col items-start gap-4 w-full">
                  {/* Current Password */}
                  <div className="flex flex-col items-start gap-1 w-full">
                    <label className="font-sans text-caption-lg text-text-primary">
                      Current Password
                    </label>
                    <div className="relative w-full">
                      <input
                        type={showPassword.current ? 'text' : 'password'}
                        value={passwordData.current}
                        onChange={(e) => setPasswordData(prev => ({ ...prev, current: e.target.value }))}
                        placeholder="0000000"
                        className="flex flex-row items-center px-3 py-[10px] pr-10 w-full h-9 bg-surface-secondary border border-border-primary rounded-[6px] shadow-button font-sans text-body-sm-regular text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-border-brand"
                      />
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility('current')}
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                      >
                        <EyeIcon />
                      </button>
                    </div>
                  </div>

                  {/* New Password and Confirm Password Row */}
                  <div className="flex flex-row items-start gap-2 w-full">
                    {/* New Password */}
                    <div className="flex flex-col items-start gap-1 flex-1">
                      <label className="font-sans text-caption-lg text-text-primary">
                        New Password
                      </label>
                      <div className="relative w-full">
                        <input
                          type={showPassword.new ? 'text' : 'password'}
                          value={passwordData.new}
                          onChange={(e) => setPasswordData(prev => ({ ...prev, new: e.target.value }))}
                          placeholder="0000000"
                          className="flex flex-row items-center px-3 py-[10px] pr-10 w-full h-9 bg-surface-secondary border border-border-primary rounded-[6px] shadow-button font-sans text-body-sm-regular text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-border-brand"
                        />
                        <button
                          type="button"
                          onClick={() => togglePasswordVisibility('new')}
                          className="absolute right-3 top-1/2 -translate-y-1/2"
                        >
                          <EyeIcon />
                        </button>
                      </div>
                    </div>

                    {/* Confirm Password */}
                    <div className="flex flex-col items-start gap-1 flex-1">
                      <label className="font-sans text-caption-lg text-text-primary">
                        Confirm Password
                      </label>
                      <div className="relative w-full">
                        <input
                          type={showPassword.confirm ? 'text' : 'password'}
                          value={passwordData.confirm}
                          onChange={(e) => setPasswordData(prev => ({ ...prev, confirm: e.target.value }))}
                          placeholder="0000000"
                          className="flex flex-row items-center px-3 py-[10px] pr-10 w-full h-9 bg-surface-secondary border border-border-primary rounded-[6px] shadow-button font-sans text-body-sm-regular text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-border-brand"
                        />
                        <button
                          type="button"
                          onClick={() => togglePasswordVisibility('confirm')}
                          className="absolute right-3 top-1/2 -translate-y-1/2"
                        >
                          <EyeIcon />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Cancel and Save Buttons */}
                  <div className="flex flex-row justify-end items-center gap-1 w-full h-7">
                    <button
                      onClick={handleCancel}
                      className="flex flex-row justify-center items-center px-[14px] py-[14px] w-[70px] h-7 bg-white border border-border-primary rounded-[9px] shadow-button-inset font-sans text-body-sm text-[#353A44] hover:bg-gray-50 transition-colors"
                      style={{ textShadow: '0px -1px 19.4px rgba(0, 0, 0, 0.25)' }}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleSave('password')}
                      className="flex flex-row justify-center items-center px-[14px] py-[14px] w-[58px] h-7 rounded-[9px] shadow-button-inset font-sans text-body-sm text-white hover:opacity-90 transition-opacity"
                      style={{
                        background: 'linear-gradient(180deg, #5F2EFC 22.58%, #4E18FC 100%)',
                        textShadow: '0px -1px 6px rgba(0, 0, 0, 0.25)'
                      }}
                    >
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-row justify-between items-center gap-1 w-full">
                  <span className="font-sans text-body-sm-regular text-text-secondary">
                    Password Set
                  </span>
                  <button
                    onClick={() => handleEdit('password', '')}
                    className="text-text-secondary hover:text-text-primary transition-colors"
                  >
                    <EditIcon className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* 2FA Field */}
            <div className="flex flex-col items-start gap-1 w-full">
              <span className="font-sans text-heading-sm text-text-primary">
                Two - Factor Authentication
              </span>
              <div className="flex flex-row justify-between items-center gap-1 w-full">
                <span className="font-sans text-body-sm-regular text-text-secondary">
                  Enabled
                </span>
                <button className="text-text-secondary hover:text-text-primary transition-colors">
                  <EditIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
