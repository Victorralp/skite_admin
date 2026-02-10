'use client';

import { useState, useRef, useEffect } from 'react';
import { Clock, Users, MoreVertical, Eye, X } from 'lucide-react';
import PageContainer from './layout/PageContainer';
import SessionDetailsModal from './SessionDetailsModal';

interface LiveSession {
  id: string;
  title: string;
  host: string;
  avatar: string;
  time: string;
  duration: string;
  participants: number;
  status: 'healthy' | 'high-latency' | 'hate-speech';
  type: '1-1' | 'class';
}

const mockSessions: LiveSession[] = [
  {
    id: '1',
    title: 'Mentorship Session',
    host: 'Noah Smith',
    avatar: '/image.png',
    time: '12:30 PM',
    duration: '30min',
    participants: 2,
    status: 'healthy',
    type: '1-1',
  },
  {
    id: '2',
    title: 'Mentorship Session',
    host: 'Noah Smith',
    avatar: '/image.png',
    time: '12:30 PM',
    duration: '30min',
    participants: 240,
    status: 'healthy',
    type: 'class',
  },
  {
    id: '3',
    title: 'Mentorship Session',
    host: 'Noah Smith',
    avatar: '/image.png',
    time: '12:30 PM',
    duration: '30min',
    participants: 240,
    status: 'healthy',
    type: '1-1',
  },
  {
    id: '4',
    title: 'Mentorship Session',
    host: 'Noah Smith',
    avatar: '/image.png',
    time: '12:30 PM',
    duration: '30min',
    participants: 240,
    status: 'high-latency',
    type: '1-1',
  },
  {
    id: '5',
    title: 'Mentorship Session',
    host: 'Noah Smith',
    avatar: '/image.png',
    time: '12:30 PM',
    duration: '30min',
    participants: 240,
    status: 'hate-speech',
    type: '1-1',
  },
  {
    id: '6',
    title: 'Mentorship Session',
    host: 'Noah Smith',
    avatar: '/image.png',
    time: '12:30 PM',
    duration: '30min',
    participants: 240,
    status: 'healthy',
    type: '1-1',
  },
];

const statusConfig = {
  healthy: {
    bg: '#E7F3EF',
    iconBg: '#239B73',
    text: '#239B73',
    label: 'Healthy',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18.2503 15.0505C17.6899 14.4515 16.6408 13.5506 16.6408 10.5996C16.6418 9.54061 16.2715 8.51438 15.5936 7.69747C14.9157 6.88056 13.9726 6.32406 12.9265 6.12371V5.52269C12.9265 5.40147 12.9025 5.28143 12.8558 5.16944C12.8092 5.05745 12.7408 4.95569 12.6545 4.86997C12.5683 4.78426 12.466 4.71626 12.3533 4.66987C12.2406 4.62349 12.1199 4.59961 11.998 4.59961C11.876 4.59961 11.7553 4.62349 11.6426 4.66987C11.5299 4.71626 11.4276 4.78426 11.3414 4.86997C11.2551 4.95569 11.1867 5.05745 11.1401 5.16944C11.0934 5.28143 11.0694 5.40147 11.0694 5.52269V6.12371C10.0233 6.32406 9.08022 6.88056 8.40232 7.69747C7.72442 8.51438 7.35411 9.54061 7.35511 10.5996C7.35511 13.5506 6.30604 14.4515 5.7456 15.0505C5.58574 15.22 5.49779 15.4442 5.50004 15.6765C5.50015 15.798 5.52434 15.9182 5.57122 16.0303C5.61811 16.1424 5.68677 16.2443 5.77328 16.33C5.85979 16.4158 5.96245 16.4837 6.07539 16.5299C6.18834 16.5762 6.30935 16.5999 6.4315 16.5996H17.5685C17.6907 16.5999 17.8117 16.5762 17.9246 16.5299C18.0376 16.4837 18.1402 16.4158 18.2268 16.33C18.3133 16.2443 18.3819 16.1424 18.4288 16.0303C18.4757 15.9182 18.4999 15.798 18.5 15.6765C18.5011 15.4436 18.4117 15.2193 18.2503 15.0505Z" stroke="#E7F3EF" strokeWidth="1.2"/>
        <path d="M11 5.09961H13V6.09961L12.5 6.64961H12H11.5L11 6.09961V5.09961Z" fill="#E7F3EF"/>
        <path d="M14 18C14 18.5304 13.7893 19.0391 13.4142 19.4142C13.0391 19.7893 12.5304 20 12 20C11.4696 20 10.9609 19.7893 10.5858 19.4142C10.2107 19.0391 10 18.5304 10 18L12 18H14Z" fill="#E7F3EF"/>
      </svg>
    )
  },
  'high-latency': {
    bg: '#FFF3EB',
    iconBg: '#FB6A00',
    text: '#FB6A00',
    label: 'High Latency',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18.2503 15.0505C17.6899 14.4515 16.6408 13.5506 16.6408 10.5996C16.6418 9.54061 16.2715 8.51438 15.5936 7.69747C14.9157 6.88056 13.9726 6.32406 12.9265 6.12371V5.52269C12.9265 5.40147 12.9025 5.28143 12.8558 5.16944C12.8092 5.05745 12.7408 4.95569 12.6545 4.86997C12.5683 4.78426 12.466 4.71626 12.3533 4.66987C12.2406 4.62349 12.1199 4.59961 11.998 4.59961C11.876 4.59961 11.7553 4.62349 11.6426 4.66987C11.5299 4.71626 11.4276 4.78426 11.3414 4.86997C11.2551 4.95569 11.1867 5.05745 11.1401 5.16944C11.0934 5.28143 11.0694 5.40147 11.0694 5.52269V6.12371C10.0233 6.32406 9.08022 6.88056 8.40232 7.69747C7.72442 8.51438 7.35411 9.54061 7.35511 10.5996C7.35511 13.5506 6.30604 14.4515 5.7456 15.0505C5.58574 15.22 5.49779 15.4442 5.50004 15.6765C5.50015 15.798 5.52434 15.9182 5.57122 16.0303C5.61811 16.1424 5.68677 16.2443 5.77328 16.33C5.85979 16.4158 5.96245 16.4837 6.07539 16.5299C6.18834 16.5762 6.30935 16.5999 6.4315 16.5996H17.5685C17.6907 16.5999 17.8117 16.5762 17.9246 16.5299C18.0376 16.4837 18.1402 16.4158 18.2268 16.33C18.3133 16.2443 18.3819 16.1424 18.4288 16.0303C18.4757 15.9182 18.4999 15.798 18.5 15.6765C18.5011 15.4436 18.4117 15.2193 18.2503 15.0505Z" stroke="#FFF3EB" strokeWidth="1.2"/>
        <path d="M11 5.09961H13V6.09961L12.5 6.64961H12H11.5L11 6.09961V5.09961Z" fill="#FFF3EB"/>
        <path d="M14 18C14 18.5304 13.7893 19.0391 13.4142 19.4142C13.0391 19.7893 12.5304 20 12 20C11.4696 20 10.9609 19.7893 10.5858 19.4142C10.2107 19.0391 10 18.5304 10 18L12 18H14Z" fill="#FFF3EB"/>
      </svg>
    )
  },
  'hate-speech': {
    bg: '#FBECEB',
    iconBg: '#CD110A',
    text: '#CD110A',
    label: 'Hate Speech',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18.2503 15.0505C17.6899 14.4515 16.6408 13.5506 16.6408 10.5996C16.6418 9.54061 16.2715 8.51438 15.5936 7.69747C14.9157 6.88056 13.9726 6.32406 12.9265 6.12371V5.52269C12.9265 5.40147 12.9025 5.28143 12.8558 5.16944C12.8092 5.05745 12.7408 4.95569 12.6545 4.86997C12.5683 4.78426 12.466 4.71626 12.3533 4.66987C12.2406 4.62349 12.1199 4.59961 11.998 4.59961C11.876 4.59961 11.7553 4.62349 11.6426 4.66987C11.5299 4.71626 11.4276 4.78426 11.3414 4.86997C11.2551 4.95569 11.1867 5.05745 11.1401 5.16944C11.0934 5.28143 11.0694 5.40147 11.0694 5.52269V6.12371C10.0233 6.32406 9.08022 6.88056 8.40232 7.69747C7.72442 8.51438 7.35411 9.54061 7.35511 10.5996C7.35511 13.5506 6.30604 14.4515 5.7456 15.0505C5.58574 15.22 5.49779 15.4442 5.50004 15.6765C5.50015 15.798 5.52434 15.9182 5.57122 16.0303C5.61811 16.1424 5.68677 16.2443 5.77328 16.33C5.85979 16.4158 5.96245 16.4837 6.07539 16.5299C6.18834 16.5762 6.30935 16.5999 6.4315 16.5996H17.5685C17.6907 16.5999 17.8117 16.5762 17.9246 16.5299C18.0376 16.4837 18.1402 16.4158 18.2268 16.33C18.3133 16.2443 18.3819 16.1424 18.4288 16.0303C18.4757 15.9182 18.4999 15.798 18.5 15.6765C18.5011 15.4436 18.4117 15.2193 18.2503 15.0505Z" stroke="#FBECEB" strokeWidth="1.2"/>
        <path d="M11 5.09961H13V6.09961L12.5 6.64961H12H11.5L11 6.09961V5.09961Z" fill="#FBECEB"/>
        <path d="M14 18C14 18.5304 13.7893 19.0391 13.4142 19.4142C13.0391 19.7893 12.5304 20 12 20C11.4696 20 10.9609 19.7893 10.5858 19.4142C10.2107 19.0391 10 18.5304 10 18L12 18H14Z" fill="#FBECEB"/>
      </svg>
    )
  }
};

export default function LiveTools() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [showDropdown, setShowDropdown] = useState<string | null>(null);
  const [selectedSession, setSelectedSession] = useState<LiveSession | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showDropdown) {
        const dropdownElement = dropdownRefs.current[showDropdown];
        if (dropdownElement && !dropdownElement.contains(event.target as Node)) {
          setShowDropdown(null);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]);

  // Filter sessions based on active filter
  const filteredSessions = mockSessions.filter((session) => {
    if (activeFilter === 'warning') {
      return session.status === 'high-latency';
    }
    if (activeFilter === 'critical') {
      return session.status === 'hate-speech';
    }
    return true; // Show all for 'all' filter
  });

  const handleDropdownToggle = (sessionId: string) => {
    setShowDropdown(showDropdown === sessionId ? null : sessionId);
  };

  const handleMonitorClick = (session: LiveSession) => {
    setSelectedSession(session);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSession(null);
  };

  return (
    <PageContainer>
      {/* Header and Stats */}
      <div className="flex flex-col gap-2">
        <h1 className="text-[20px] font-bold text-[#2B2834] leading-[100%] tracking-[-0.01em] font-['Neue_Montreal']">Live Tools</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 w-full">
          <div className="min-w-[214px] h-24 bg-white border border-[#EBEBEB] rounded-lg box-border flex flex-col p-4 gap-3 grow">
            <div className="flex flex-col gap-1 w-full h-10">
              <span className="font-sans font-normal text-xs leading-[14px] text-[#5F5971]">Live Sessions</span>
              <span className="font-sans font-medium text-lg leading-[22px] text-[#2B2834]">1,393</span>
            </div>
          </div>
          <div className="min-w-[214px] h-24 bg-white border border-[#EBEBEB] rounded-lg box-border flex flex-col p-4 gap-3 grow">
            <div className="flex flex-col gap-1 w-full h-10">
              <span className="font-sans font-normal text-xs leading-[14px] text-[#5F5971]">1-1 Calls</span>
              <span className="font-sans font-medium text-lg leading-[22px] text-[#2B2834]">6</span>
            </div>
          </div>
          <div className="min-w-[214px] h-24 bg-white border border-[#EBEBEB] rounded-lg box-border flex flex-col p-4 gap-3 grow">
            <div className="flex flex-col gap-1 w-full h-10">
              <span className="font-sans font-normal text-xs leading-[14px] text-[#5F5971]">Critical Alerts</span>
              <span className="font-sans font-medium text-lg leading-[22px] text-[#2B2834]">156</span>
            </div>
          </div>
          <div className="min-w-[214px] h-24 bg-white border border-[#EBEBEB] rounded-lg box-border flex flex-col p-4 gap-3 grow">
            <div className="flex flex-col gap-1 w-full h-10">
              <span className="font-sans font-normal text-xs leading-[14px] text-[#5F5971]">Warning Alerts</span>
              <span className="font-sans font-medium text-lg leading-[22px] text-[#2B2834]">11</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Live Sessions */}
      <div className="flex flex-col gap-2 w-full">
        {/* Filter Tabs */}
        <div className="flex gap-2 w-full">
          <button
            onClick={() => setActiveFilter('all')}
            className={`flex justify-center items-center px-4 py-2 gap-2.5 h-8 text-[13.5px] font-medium leading-4 rounded-md border transition-all flex-1 ${
              activeFilter === 'all'
                ? 'bg-white border-[#5F2EFC] text-[#5F2EFC]'
                : 'bg-white border-[#EBEBEB] text-[#5F5971]'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setActiveFilter('warning')}
            className={`flex justify-center items-center px-4 py-2 gap-2.5 h-8 text-[13.5px] font-medium leading-4 rounded-md border transition-all flex-1 ${
              activeFilter === 'warning'
                ? 'bg-white border-[#5F2EFC] text-[#5F2EFC]'
                : 'bg-white border-[#EBEBEB] text-[#5F5971]'
            }`}
          >
            Warning
          </button>
          <button
            onClick={() => setActiveFilter('critical')}
            className={`flex justify-center items-center px-4 py-2 gap-2.5 h-8 text-[13.5px] font-medium leading-4 rounded-md border transition-all flex-1 ${
              activeFilter === 'critical'
                ? 'bg-white border-[#5F2EFC] text-[#5F2EFC]'
                : 'bg-white border-[#EBEBEB] text-[#5F5971]'
            }`}
          >
            Critical
          </button>
        </div>

        {/* Live Sessions Grid */}
        <div className="flex flex-col p-1 gap-1 w-full bg-[#F9F9FB] rounded-lg">
          {/* Header */}
          <div className="flex items-center px-2 py-1 gap-4 w-full h-8">
            <span className="text-base font-medium leading-[19px] text-[#2B2834] flex-1">Live</span>
            <div className="flex items-center gap-1 px-2 py-1 bg-white border border-[#EBEBEB] rounded-lg opacity-0 w-[63px] h-6">
              <span className="text-xs leading-[14px] text-[#5F5971]">Today</span>
              <div className="w-2.5 h-1.5 bg-[#D3D3D3]" />
            </div>
          </div>

          {/* Sessions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 w-full">
            {filteredSessions.map((session) => {
              const config = statusConfig[session.status];
              return (
                <div
                  key={session.id}
                  className="flex flex-col justify-center items-start p-4 gap-4 bg-white border border-[#EBEBEB] rounded-[4px] relative w-full max-w-[362px]"
                  style={{ height: '207px' }}
                >
                  {/* Header with Status and Actions */}
                  <div className="flex justify-between items-start w-full h-7">
                    <div className="flex items-start gap-2">
                      {/* Status Badge */}
                      <div
                        className="flex items-center gap-1 px-2 py-0.5 rounded-full h-7"
                        style={{ 
                          backgroundColor: config.bg,
                          width: session.status === 'healthy' ? '79px' : session.status === 'high-latency' ? '107px' : '106px',
                          padding: '2px 8px 2px 2px'
                        }}
                      >
                        <div
                          className="flex items-center justify-center w-6 h-6 rounded-full p-1"
                          style={{ backgroundColor: config.iconBg }}
                        >
                          {config.icon}
                        </div>
                        <span
                          className="text-xs font-medium leading-[14px]"
                          style={{ 
                            color: config.text,
                            width: session.status === 'healthy' ? '41px' : session.status === 'high-latency' ? '69px' : '68px',
                            height: '9px'
                          }}
                        >
                          {config.label}
                        </span>
                      </div>

                      {/* Type Badge */}
                      <div 
                        className="flex items-center justify-center bg-[#F9F9FB] rounded-full"
                        style={{ 
                          padding: '4px 13px',
                          width: session.type === '1-1' ? '40px' : '57px',
                          height: '28px'
                        }}
                      >
                        <span className="text-xs font-bold leading-[14px] text-[#2B2834] whitespace-nowrap">
                          {session.type === '1-1' ? '1-1' : 'Class'}
                        </span>
                      </div>
                    </div>

                    {/* Actions Menu */}
                    <div className="relative" ref={(el) => { dropdownRefs.current[session.id] = el; }}>
                      <button
                        onClick={() => handleDropdownToggle(session.id)}
                        className="flex items-center justify-center w-[18px] h-[18px]"
                      >
                        <MoreVertical className="w-[18px] h-[18px] text-[#5F5971]" strokeWidth={2.25} />
                      </button>

                      {/* Dropdown Menu */}
                      {showDropdown === session.id && (
                        <div className="absolute right-0 top-8 w-[134px] h-[148px] bg-white border border-[#EBEBEB] rounded-xl shadow-[0px_116px_46px_rgba(0,0,0,0.01),0px_65px_39px_rgba(0,0,0,0.05),0px_29px_29px_rgba(0,0,0,0.09),0px_7px_16px_rgba(0,0,0,0.1)] z-10">
                          <button className="flex items-center px-4 py-2.5 w-full h-[37px] text-left text-[13.5px] font-medium leading-4 text-[#2B2834] border-b border-[#EBEBEB] hover:bg-gray-50">
                            Mute Chat
                          </button>
                          <button className="flex items-center px-4 py-2.5 w-full h-[37px] text-left text-[13.5px] font-medium leading-4 text-[#2B2834] border-b border-[#EBEBEB] hover:bg-gray-50">
                            Alert Creator
                          </button>
                          <button className="flex items-center px-4 py-2.5 w-full h-[37px] text-left text-[13.5px] font-medium leading-4 text-[#2B2834] border-b border-[#EBEBEB] hover:bg-gray-50">
                            Review Profile
                          </button>
                          <button className="flex items-center px-4 py-2.5 w-full h-[37px] text-left text-[13.5px] font-medium leading-4 text-[#CD110A] hover:bg-gray-50">
                            Disable Session
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Session Info */}
                  <div className="flex flex-col gap-3 w-full h-[83px]">
                    <h3 className="text-base font-bold leading-[19px] text-[#2B2834] w-full h-[19px]">
                      {session.title}
                    </h3>

                    {/* Host Info */}
                    <div className="flex items-center gap-2 w-full h-6">
                      <div className="w-6 h-6 rounded-full bg-gray-200 flex-shrink-0" />
                      <span className="text-base font-medium leading-[19px] text-[#5F5971] flex-1">
                        {session.host}
                      </span>
                    </div>

                    {/* Session Details */}
                    <div className="flex items-center gap-6 w-full h-4">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-[#2B2834]" strokeWidth={1.3} />
                        <span className="text-xs leading-[14px] text-[#5F5971]">{session.time}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g clipPath="url(#clip0_916_13655)">
                            <path d="M7.99998 1.33398C9.29341 1.33375 10.559 1.70977 11.6424 2.41622C12.7259 3.12267 13.5804 4.12904 14.102 5.31268C14.6235 6.49631 14.7894 7.80609 14.5795 9.08237C14.3696 10.3587 13.793 11.5463 12.92 12.5007M7.99998 4.00065V8.00065L10.6666 9.33398M1.66665 5.91732C1.45421 6.56309 1.3418 7.23756 1.33331 7.91732M1.88665 10.6673C2.26098 11.5285 2.81303 12.301 3.50665 12.934M3.09065 3.49065C3.27667 3.28814 3.47505 3.09733 3.68465 2.91932M5.76265 14.2807C7.42511 14.8729 9.25458 14.7818 10.85 14.0273" stroke="#2B2834" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                          </g>
                          <defs>
                            <clipPath id="clip0_916_13655">
                              <rect width="16" height="16" fill="white"/>
                            </clipPath>
                          </defs>
                        </svg>
                        <span className="text-xs leading-[14px] text-[#5F5971]">{session.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M6.00001 6.66732C7.47277 6.66732 8.66668 5.47341 8.66668 4.00065C8.66668 2.52789 7.47277 1.33398 6.00001 1.33398C4.52725 1.33398 3.33334 2.52789 3.33334 4.00065C3.33334 5.47341 4.52725 6.66732 6.00001 6.66732Z" stroke="#2B2834" strokeWidth="1.3"/>
                          <path d="M10 6C10.5304 6 11.0391 5.78929 11.4142 5.41421C11.7893 5.03914 12 4.53043 12 4C12 3.46957 11.7893 2.96086 11.4142 2.58579C11.0391 2.21071 10.5304 2 10 2" stroke="#2B2834" strokeWidth="1.3" strokeLinecap="round"/>
                          <path d="M6.00001 14.0013C8.57734 14.0013 10.6667 12.8074 10.6667 11.3346C10.6667 9.86188 8.57734 8.66797 6.00001 8.66797C3.42268 8.66797 1.33334 9.86188 1.33334 11.3346C1.33334 12.8074 3.42268 14.0013 6.00001 14.0013Z" stroke="#2B2834" strokeWidth="1.3"/>
                          <path d="M12 9.33398C13.1693 9.59065 14 10.24 14 11.0007C14 11.6873 13.324 12.2827 12.3333 12.5807" stroke="#2B2834" strokeWidth="1.3" strokeLinecap="round"/>
                        </svg>
                        <span className="text-xs leading-[14px] text-[#5F5971]">{session.participants}</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-1 w-full h-8">
                    <button 
                      onClick={() => handleMonitorClick(session)}
                      className="flex items-center justify-center gap-1 px-6 py-3.5 bg-white border border-[#EBEBEB] rounded-[9px] shadow-[inset_0px_1.5px_1px_rgba(255,255,255,0.11)] flex-1 h-8 hover:bg-gray-50 transition-colors"
                    >
                      <Eye className="w-3 h-3 text-[#17181C]" strokeWidth={1.5} />
                      <span className="text-[13.5px] font-medium leading-4 text-[#353A44]">Monitor</span>
                    </button>
                    <button className="flex items-center justify-center gap-1 px-6 py-3.5 bg-white border border-[#EBEBEB] rounded-[9px] shadow-[inset_0px_1.5px_1px_rgba(255,255,255,0.11)] flex-1 h-8 hover:bg-gray-50 transition-colors">
                      <X className="w-3 h-3 text-[#17181C]" strokeWidth={1.5} />
                      <span className="text-[13.5px] font-medium leading-4 text-[#353A44]">End Session</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Session Details Modal */}
      {selectedSession && (
        <SessionDetailsModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          session={selectedSession}
        />
      )}
    </PageContainer>
  );
}