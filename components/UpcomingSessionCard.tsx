'use client';

import { useState, useEffect, useRef } from 'react';
import { Clock, Calendar, MoreVertical } from 'lucide-react';

type UpcomingSession = {
  id: string;
  title: string;
  creator: string;
  avatar: string;
  date: string;
  time: string;
  duration: string;
};

export default function UpcomingSessionCard({ session }: { session: UpcomingSession }) {
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
    <div className="flex-1 min-w-80 bg-surface-primary border border-border-primary rounded p-4 flex flex-col justify-center gap-3">
      {/* Header */}
      <div className="flex justify-between items-start">
        <h3 className="text-body-lg text-text-primary">
          {session.title}
        </h3>

        {/* Menu Button */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="w-5 h-5 flex items-center justify-center text-text-secondary hover:text-text-primary"
          >
            <MoreVertical size={18} strokeWidth={2.25} />
          </button>

          {/* Dropdown Menu */}
          {showMenu && (
            <div className="absolute right-0 top-9 w-32 bg-surface-primary border border-border-primary rounded-xl shadow-popover z-10">
              <button className="w-full h-9 px-4 py-2.5 text-left text-body-sm text-text-primary hover:bg-surface-secondary border-b border-border-primary">
                Edit Session
              </button>
              <button className="w-full h-9 px-4 py-2.5 text-left text-body-sm text-text-primary hover:bg-surface-secondary border-b border-border-primary">
                Creator Profile
              </button>
              <button className="w-full h-9 px-4 py-2.5 text-left text-body-sm text-text-danger hover:bg-surface-secondary">
                Cancel Session
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Creator */}
      <div className="flex items-center gap-2">
        <div
          className="w-6 h-6 rounded-full bg-cover bg-center"
          style={{ backgroundImage: `url(${session.avatar})` }}
        />
        <span className="flex-1 text-body-lg text-text-secondary">
          {session.creator}
        </span>
      </div>

      {/* Meta Info */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-1">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.33334 7.99935C1.33334 5.48535 1.33334 4.22802 2.11468 3.44735C2.89601 2.66668 4.15268 2.66602 6.66668 2.66602H9.33334C11.8473 2.66602 13.1047 2.66602 13.8853 3.44735C14.666 4.22868 14.6667 5.48535 14.6667 7.99935V9.33268C14.6667 11.8467 14.6667 13.104 13.8853 13.8847C13.104 14.6653 11.8473 14.666 9.33334 14.666H6.66668C4.15268 14.666 2.89534 14.666 2.11468 13.8847C1.33401 13.1033 1.33334 11.8467 1.33334 9.33268V7.99935Z" stroke="var(--text-primary)" strokeWidth="1.3"/>
            <path d="M4.66669 2.66602V1.66602M11.3334 2.66602V1.66602M1.66669 5.99935H14.3334" stroke="var(--text-primary)" strokeWidth="1.3" strokeLinecap="round"/>
          </svg>
          <span className="text-caption-lg text-text-secondary">
            {session.date}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Clock size={16} strokeWidth={1.3} className="text-text-primary" />
          <span className="text-caption-lg text-text-secondary">
            {session.time}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_duration_upcoming)">
              <path d="M7.99998 1.33398C9.29341 1.33375 10.559 1.70977 11.6424 2.41622C12.7259 3.12267 13.5804 4.12904 14.102 5.31268C14.6235 6.49631 14.7894 7.80609 14.5795 9.08237C14.3696 10.3587 13.793 11.5463 12.92 12.5007M7.99998 4.00065V8.00065L10.6666 9.33398M1.66665 5.91732C1.45421 6.56309 1.3418 7.23756 1.33331 7.91732M1.88665 10.6673C2.26098 11.5285 2.81303 12.301 3.50665 12.934M3.09065 3.49065C3.27667 3.28814 3.47505 3.09733 3.68465 2.91932M5.76265 14.2807C7.42511 14.8729 9.25458 14.7818 10.85 14.0273" stroke="var(--text-primary)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            </g>
            <defs>
              <clipPath id="clip0_duration_upcoming">
                <rect width="16" height="16" fill="white"/>
              </clipPath>
            </defs>
          </svg>
          <span className="text-caption-lg text-text-secondary">
            {session.duration}
          </span>
        </div>
      </div>
    </div>
  );
}
