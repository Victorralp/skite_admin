'use client';

import { useState, useEffect, useRef } from 'react';
import { Clock, Eye, X, MoreVertical } from 'lucide-react';

type SessionType = '1-1' | 'Class';

type LiveSession = {
  id: string;
  type: SessionType;
  title: string;
  creator: string;
  avatar: string;
  time: string;
  duration: string;
  participants: number;
};

export default function LiveSessionCard({ session }: { session: LiveSession }) {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="flex-1 min-w-[350px] bg-white border border-[#EBEBEB] rounded p-4 flex flex-col justify-center gap-4">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="flex items-start gap-2">
          {/* Live Badge */}
          <div className="flex items-center gap-0.5 px-1.5 py-1 bg-[rgba(205,17,10,0.1)] rounded-full">
            <div className="w-[6.26px] h-[6.26px] bg-[#CD110A] rounded-full" />
            <span className="font-['Neue_Montreal'] font-medium text-[12px] leading-[14px] text-[#CD110A]">
              Live
            </span>
          </div>

          {/* Type Badge */}
          <div className="flex items-center justify-center px-3 py-1 bg-[#F9F9FB] rounded-full">
            <span className="font-['Neue_Montreal'] font-bold text-[12px] leading-[14px] text-[#2B2834]">
              {session.type}
            </span>
          </div>
        </div>

        {/* Menu Button */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="w-[18px] h-[18px] flex items-center justify-center text-[#5F5971] hover:text-[#2B2834]"
          >
            <MoreVertical size={18} strokeWidth={2.25} />
          </button>

          {/* Dropdown Menu */}
          {showMenu && (
            <div className="absolute right-0 top-[34px] w-[134px] bg-white border border-[#EBEBEB] rounded-xl shadow-[0px_116px_46px_rgba(0,0,0,0.01),0px_65px_39px_rgba(0,0,0,0.05),0px_29px_29px_rgba(0,0,0,0.09),0px_7px_16px_rgba(0,0,0,0.1)] z-10">
              <button className="w-full h-[37px] px-4 py-2.5 text-left font-['Neue_Montreal'] font-medium text-[13.5px] leading-[16px] text-[#2B2834] hover:bg-[#F9F9FB] border-b border-[#EBEBEB]">
                Alert Creator
              </button>
              <button className="w-full h-[37px] px-4 py-2.5 text-left font-['Neue_Montreal'] font-medium text-[13.5px] leading-[16px] text-[#2B2834] hover:bg-[#F9F9FB] border-b border-[#EBEBEB]">
                Creator Profile
              </button>
              <button className="w-full h-[37px] px-4 py-2.5 text-left font-['Neue_Montreal'] font-medium text-[13.5px] leading-[16px] text-[#CD110A] hover:bg-[#F9F9FB]">
                Disable Session
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3">
        <h3 className="font-['Neue_Montreal'] font-bold text-[16px] leading-[19px] text-[#2B2834]">
          {session.title}
        </h3>

        {/* Creator */}
        <div className="flex items-center gap-2">
          <div
            className="w-6 h-6 rounded-full bg-cover bg-center"
            style={{ backgroundImage: `url(${session.avatar})` }}
          />
          <span className="flex-1 font-['Neue_Montreal'] font-medium text-[16px] leading-[19px] text-[#5F5971]">
            {session.creator}
          </span>
        </div>

        {/* Meta Info */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1">
            <Clock size={16} strokeWidth={1.3} className="text-[#2B2834]" />
            <span className="font-['Neue_Montreal'] font-normal text-[12px] leading-[14px] text-[#5F5971]">
              {session.time}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_duration)">
                <path d="M7.99998 1.33398C9.29341 1.33375 10.559 1.70977 11.6424 2.41622C12.7259 3.12267 13.5804 4.12904 14.102 5.31268C14.6235 6.49631 14.7894 7.80609 14.5795 9.08237C14.3696 10.3587 13.793 11.5463 12.92 12.5007M7.99998 4.00065V8.00065L10.6666 9.33398M1.66665 5.91732C1.45421 6.56309 1.3418 7.23756 1.33331 7.91732M1.88665 10.6673C2.26098 11.5285 2.81303 12.301 3.50665 12.934M3.09065 3.49065C3.27667 3.28814 3.47505 3.09733 3.68465 2.91932M5.76265 14.2807C7.42511 14.8729 9.25458 14.7818 10.85 14.0273" stroke="#2B2834" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              </g>
              <defs>
                <clipPath id="clip0_duration">
                  <rect width="16" height="16" fill="white"/>
                </clipPath>
              </defs>
            </svg>
            <span className="font-['Neue_Montreal'] font-normal text-[12px] leading-[14px] text-[#5F5971]">
              {session.duration}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.00001 6.66732C7.47277 6.66732 8.66668 5.47341 8.66668 4.00065C8.66668 2.52789 7.47277 1.33398 6.00001 1.33398C4.52725 1.33398 3.33334 2.52789 3.33334 4.00065C3.33334 5.47341 4.52725 6.66732 6.00001 6.66732Z" stroke="#2B2834" strokeWidth="1.3"/>
              <path d="M10 6C10.5304 6 11.0391 5.78929 11.4142 5.41421C11.7893 5.03914 12 4.53043 12 4C12 3.46957 11.7893 2.96086 11.4142 2.58579C11.0391 2.21071 10.5304 2 10 2" stroke="#2B2834" strokeWidth="1.3" strokeLinecap="round"/>
              <path d="M6.00001 14.0013C8.57734 14.0013 10.6667 12.8074 10.6667 11.3346C10.6667 9.86188 8.57734 8.66797 6.00001 8.66797C3.42268 8.66797 1.33334 9.86188 1.33334 11.3346C1.33334 12.8074 3.42268 14.0013 6.00001 14.0013Z" stroke="#2B2834" strokeWidth="1.3"/>
              <path d="M12 9.33398C13.1693 9.59065 14 10.24 14 11.0007C14 11.6873 13.324 12.2827 12.3333 12.5807" stroke="#2B2834" strokeWidth="1.3" strokeLinecap="round"/>
            </svg>
            <span className="font-['Neue_Montreal'] font-normal text-[12px] leading-[14px] text-[#5F5971]">
              {session.participants}
            </span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1">
        <button className="flex-1 h-8 px-6 py-3.5 bg-white border border-[#EBEBEB] rounded-[9px] shadow-[inset_0px_1.5px_1px_rgba(255,255,255,0.11)] flex items-center justify-center gap-1 hover:bg-[#F9F9FB]">
          <Eye size={12} strokeWidth={1.5} className="text-[#17181C]" />
          <span className="font-['Neue_Montreal'] font-medium text-[13.5px] leading-[16px] text-[#353A44]">
            Monitor
          </span>
        </button>
        <button className="flex-1 h-8 px-6 py-3.5 bg-white border border-[#EBEBEB] rounded-[9px] shadow-[inset_0px_1.5px_1px_rgba(255,255,255,0.11)] flex items-center justify-center gap-1 hover:bg-[#F9F9FB]">
          <X size={12} strokeWidth={1.5} className="text-[#17181C]" />
          <span className="font-['Neue_Montreal'] font-medium text-[13.5px] leading-[16px] text-[#353A44]">
            End Session
          </span>
        </button>
      </div>
    </div>
  );
}
