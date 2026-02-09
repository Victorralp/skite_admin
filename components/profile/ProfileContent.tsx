"use client";

import { useState } from 'react';

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
  const [email, setEmail] = useState('undiebekwa@gmail.com');
  const [phone, setPhone] = useState('07065051560');
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

  return (
    <div className="flex flex-col items-start gap-8 w-full">
      {/* Page Title */}
      <h1 className="font-['Neue_Montreal'] font-bold text-[20px] leading-[24px] tracking-[-0.01em] text-[#2B2834]">
        Profile
      </h1>

      {/* Main Content Container - Two Cards Side by Side */}
      <div className="flex flex-col lg:flex-row items-start gap-6 w-full">
        {/* Left Column - Profile Card */}
        <div className="flex flex-col items-center p-8 gap-4 w-full lg:w-[260px] lg:min-w-[260px] lg:max-w-[260px] h-[260px] bg-white border border-[#EBEBEB] rounded-[16px]">
            {/* Profile Image Container */}
            <div className="relative flex justify-center items-end w-[120px] h-[120px] rounded-[100px] bg-gray-100 border border-[#EBEBEB] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80"
                alt="Profile"
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* Change Button */}
              <div className="flex items-center justify-center gap-[4px] w-[120px] h-[22px] bg-white border border-[#F0EBF4] rounded-[6px] z-10 px-2 pb-[6px] pt-[4px]">
                <span className="font-['Neue_Montreal'] font-medium text-[10px] leading-[12px] text-[#2B2834]">Change</span>
              </div>
            </div>

            {/* Name and Contact Info */}
            <div className="flex flex-col items-center gap-[2px]">
              <h2 className="font-['Neue_Montreal'] font-medium text-[20px] leading-[24px] tracking-[-0.01em] text-[#2B2834]">
                Bekwa Undie
              </h2>
              <p className="font-['Neue_Montreal'] font-normal text-[13.5px] leading-[16px] text-[#5F5971]">
                undiebekwa@gmail.com
              </p>
              <p className="font-['Neue_Montreal'] font-normal text-[13.5px] leading-[16px] text-[#5F5971]">
                07065051560
              </p>
            </div>
        </div>

        {/* Right Column - Account Information */}
        <div className="flex flex-col items-start p-8 gap-6 w-full lg:flex-1 min-h-[400px] bg-white border border-[#EBEBEB] rounded-[16px]">

          {/* Account Information Title */}
          <h3 className="font-['Neue_Montreal'] font-bold text-[20px] leading-[24px] tracking-[-0.01em] text-[#2B2834]">
            Account Information
          </h3>

          {/* Account Information Fields */}
          <div className="flex flex-col items-start gap-[18px] w-full">
            {/* Email Field */}
            <div className="flex flex-col items-start gap-1 w-full">
              <span className="font-['Neue_Montreal'] font-medium text-[16px] leading-[19px] text-[#2B2834]">
                Email
              </span>
              {editingField === 'email' ? (
                <div className="flex flex-col items-start gap-1 w-full">
                  <input
                    type="email"
                    value={tempValue}
                    onChange={(e) => setTempValue(e.target.value)}
                    placeholder="undiebekwa@gmail.com"
                    className="flex flex-row items-center px-3 py-[10px] w-full h-9 bg-[#F9F9FB] border border-[#EBEBEB] rounded-[6px] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] font-['Neue_Montreal'] font-normal text-[13.5px] leading-[16px] text-[#2B2834] placeholder:text-[#A5A1AF] focus:outline-none focus:border-[#5F2EFC]"
                  />
                  <div className="flex flex-row justify-end items-center gap-1 w-full h-7">
                    <button
                      onClick={handleCancel}
                      className="flex flex-row justify-center items-center px-[14px] py-[14px] w-[70px] h-7 bg-white border border-[#EBEBEB] rounded-[9px] shadow-[inset_0px_1.5px_1px_rgba(255,255,255,0.11)] font-['Neue_Montreal'] font-medium text-[13.5px] leading-[16px] text-[#353A44] hover:bg-gray-50 transition-colors"
                      style={{ textShadow: '0px -1px 19.4px rgba(0, 0, 0, 0.25)' }}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleSave('email')}
                      className="flex flex-row justify-center items-center px-[14px] py-[14px] w-[58px] h-7 rounded-[9px] shadow-[inset_0px_1.5px_1px_rgba(255,255,255,0.11)] font-['Neue_Montreal'] font-medium text-[13.5px] leading-[16px] text-[#FFFCF8] hover:opacity-90 transition-opacity"
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
                  <span className="font-['Neue_Montreal'] font-normal text-[13.5px] leading-[16px] text-[#5F5971]">
                    {email}
                  </span>
                  <button
                    onClick={() => handleEdit('email', email)}
                    className="text-[#5F5971] hover:text-[#2B2834] transition-colors"
                  >
                    <EditIcon className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Phone Number Field */}
            <div className="flex flex-col items-start gap-1 w-full">
              <span className="font-['Neue_Montreal'] font-medium text-[16px] leading-[19px] text-[#2B2834]">
                Phone Number
              </span>
              {editingField === 'phone' ? (
                <div className="flex flex-col items-start gap-1 w-full">
                  <input
                    type="tel"
                    value={tempValue}
                    onChange={(e) => setTempValue(e.target.value)}
                    placeholder="07065051560"
                    className="flex flex-row items-center px-3 py-[10px] w-full h-9 bg-[#F9F9FB] border border-[#EBEBEB] rounded-[6px] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] font-['Neue_Montreal'] font-normal text-[13.5px] leading-[16px] text-[#2B2834] placeholder:text-[#A5A1AF] focus:outline-none focus:border-[#5F2EFC]"
                  />
                  <div className="flex flex-row justify-end items-center gap-1 w-full h-7">
                    <button
                      onClick={handleCancel}
                      className="flex flex-row justify-center items-center px-[14px] py-[14px] w-[70px] h-7 bg-white border border-[#EBEBEB] rounded-[9px] shadow-[inset_0px_1.5px_1px_rgba(255,255,255,0.11)] font-['Neue_Montreal'] font-medium text-[13.5px] leading-[16px] text-[#353A44] hover:bg-gray-50 transition-colors"
                      style={{ textShadow: '0px -1px 19.4px rgba(0, 0, 0, 0.25)' }}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleSave('phone')}
                      className="flex flex-row justify-center items-center px-[14px] py-[14px] w-[58px] h-7 rounded-[9px] shadow-[inset_0px_1.5px_1px_rgba(255,255,255,0.11)] font-['Neue_Montreal'] font-medium text-[13.5px] leading-[16px] text-[#FFFCF8] hover:opacity-90 transition-opacity"
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
                  <span className="font-['Neue_Montreal'] font-normal text-[13.5px] leading-[16px] text-[#5F5971]">
                    {phone}
                  </span>
                  <button
                    onClick={() => handleEdit('phone', phone)}
                    className="text-[#5F5971] hover:text-[#2B2834] transition-colors"
                  >
                    <EditIcon className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Divider Line */}
          <div className="w-full h-0 border-t border-[#EBEBEB]" />

          {/* Security Title */}
          <h3 className="font-['Neue_Montreal'] font-bold text-[20px] leading-[24px] tracking-[-0.01em] text-[#2B2834]">
            Security
          </h3>

          {/* Security Fields */}
          <div className="flex flex-col items-start gap-[18px] w-full">
            {/* Password Field */}
            <div className="flex flex-col items-start gap-4 w-full">
              <span className="font-['Neue_Montreal'] font-medium text-[16px] leading-[19px] text-[#2B2834]">
                Password
              </span>
              {editingField === 'password' ? (
                <div className="flex flex-col items-start gap-4 w-full">
                  {/* Current Password */}
                  <div className="flex flex-col items-start gap-1 w-full">
                    <label className="font-['Neue_Montreal'] font-medium text-[12px] leading-[14px] text-[#2B2834]">
                      Current Password
                    </label>
                    <div className="relative w-full">
                      <input
                        type={showPassword.current ? 'text' : 'password'}
                        value={passwordData.current}
                        onChange={(e) => setPasswordData(prev => ({ ...prev, current: e.target.value }))}
                        placeholder="0000000"
                        className="flex flex-row items-center px-3 py-[10px] pr-10 w-full h-9 bg-[#F9F9FB] border border-[#EBEBEB] rounded-[6px] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] font-['Neue_Montreal'] font-normal text-[13.5px] leading-[16px] text-[#2B2834] placeholder:text-[#A5A1AF] focus:outline-none focus:border-[#5F2EFC]"
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
                      <label className="font-['Neue_Montreal'] font-medium text-[12px] leading-[14px] text-[#2B2834]">
                        New Password
                      </label>
                      <div className="relative w-full">
                        <input
                          type={showPassword.new ? 'text' : 'password'}
                          value={passwordData.new}
                          onChange={(e) => setPasswordData(prev => ({ ...prev, new: e.target.value }))}
                          placeholder="0000000"
                          className="flex flex-row items-center px-3 py-[10px] pr-10 w-full h-9 bg-[#F9F9FB] border border-[#EBEBEB] rounded-[6px] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] font-['Neue_Montreal'] font-normal text-[13.5px] leading-[16px] text-[#2B2834] placeholder:text-[#A5A1AF] focus:outline-none focus:border-[#5F2EFC]"
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
                      <label className="font-['Neue_Montreal'] font-medium text-[12px] leading-[14px] text-[#2B2834]">
                        Confirm Password
                      </label>
                      <div className="relative w-full">
                        <input
                          type={showPassword.confirm ? 'text' : 'password'}
                          value={passwordData.confirm}
                          onChange={(e) => setPasswordData(prev => ({ ...prev, confirm: e.target.value }))}
                          placeholder="0000000"
                          className="flex flex-row items-center px-3 py-[10px] pr-10 w-full h-9 bg-[#F9F9FB] border border-[#EBEBEB] rounded-[6px] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] font-['Neue_Montreal'] font-normal text-[13.5px] leading-[16px] text-[#2B2834] placeholder:text-[#A5A1AF] focus:outline-none focus:border-[#5F2EFC]"
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
                      className="flex flex-row justify-center items-center px-[14px] py-[14px] w-[70px] h-7 bg-white border border-[#EBEBEB] rounded-[9px] shadow-[inset_0px_1.5px_1px_rgba(255,255,255,0.11)] font-['Neue_Montreal'] font-medium text-[13.5px] leading-[16px] text-[#353A44] hover:bg-gray-50 transition-colors"
                      style={{ textShadow: '0px -1px 19.4px rgba(0, 0, 0, 0.25)' }}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleSave('password')}
                      className="flex flex-row justify-center items-center px-[14px] py-[14px] w-[58px] h-7 rounded-[9px] shadow-[inset_0px_1.5px_1px_rgba(255,255,255,0.11)] font-['Neue_Montreal'] font-medium text-[13.5px] leading-[16px] text-[#FFFCF8] hover:opacity-90 transition-opacity"
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
                  <span className="font-['Neue_Montreal'] font-normal text-[13.5px] leading-[16px] text-[#5F5971]">
                    Password Set
                  </span>
                  <button
                    onClick={() => handleEdit('password', '')}
                    className="text-[#5F5971] hover:text-[#2B2834] transition-colors"
                  >
                    <EditIcon className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* 2FA Field */}
            <div className="flex flex-col items-start gap-1 w-full">
              <span className="font-['Neue_Montreal'] font-medium text-[16px] leading-[19px] text-[#2B2834]">
                Two - Factor Authentication
              </span>
              <div className="flex flex-row justify-between items-center gap-1 w-full">
                <span className="font-['Neue_Montreal'] font-normal text-[13.5px] leading-[16px] text-[#5F5971]">
                  Enabled
                </span>
                <button className="text-[#5F5971] hover:text-[#2B2834] transition-colors">
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
