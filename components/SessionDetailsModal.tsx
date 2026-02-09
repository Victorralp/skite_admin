'use client';

import { X } from 'lucide-react';
import { useEffect } from 'react';

interface SessionDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  session: {
    title: string;
    host: string;
    avatar: string;
    time: string;
    duration: string;
    participants: number;
  };
}

export default function SessionDetailsModal({ isOpen, onClose, session }: SessionDetailsModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-end z-50 overflow-hidden">
      <div className="w-[600px] h-full bg-white flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 h-[60px]">
          <span className="text-base font-medium leading-[19px] tracking-[-0.01em] text-[#2B2834]">
            Session Details
          </span>
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 px-2 py-1.5 bg-[#F9F9FB] rounded-md h-7"
          >
            <X className="w-4 h-4 text-[#5F2EFC]" strokeWidth={1.5} />
            <span className="text-xs font-medium leading-[14px] text-[#5F2EFC]">Close</span>
          </button>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-[#EBEBEB]" />

        {/* Content - Scrollable */}
        <div className="flex-1 flex flex-col overflow-y-auto">
          <div className="flex flex-col items-start p-6 gap-6">
            {/* Session Info */}
            <div className="flex flex-col items-start gap-2 w-[552px]">
              <h2 className="text-lg font-bold leading-[22px] text-[#2B2834] w-full">
                {session.title}
              </h2>
              <div className="flex flex-row items-center gap-2 w-full h-6">
                <div className="w-6 h-6 rounded-full bg-gray-200" />
                <span className="text-base font-medium leading-[19px] text-[#5F5971] flex-1">
                  {session.host}
                </span>
              </div>
            </div>

            {/* Video Preview */}
            <div className="flex flex-col justify-between items-end p-4 w-[552px] h-[502px] bg-gray-300 rounded-2xl relative overflow-hidden">
              {/* Main Video Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-400 to-gray-500 rounded-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=500&fit=crop&crop=face" 
                  alt="John Doe" 
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
              
              {/* Top Controls */}
              <div className="flex flex-row justify-between items-center gap-[138px] w-[520px] h-[34px] relative z-10">
                <div className="flex flex-col items-start p-[8px_12px] gap-2.5 w-[98px] h-[34px] bg-[rgba(75,75,75,0.6)] backdrop-blur-sm rounded-[40px]">
                  <div className="flex flex-row items-center gap-1 w-[74px] h-[18px]">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7.64796 7.64869C9.4079 7.64869 10.8346 6.22198 10.8346 4.46204C10.8346 2.7021 9.4079 1.27539 7.64796 1.27539C5.88802 1.27539 4.4613 2.7021 4.4613 4.46204C4.4613 6.22198 5.88802 7.64869 7.64796 7.64869Z" fill="white"/>
                      <path d="M7.64795 9.24219C4.45492 9.24219 1.85461 11.3836 1.85461 14.0222C1.85461 14.2006 1.99483 14.3408 2.17328 14.3408H13.1226C13.3011 14.3408 13.4413 14.2006 13.4413 14.0222C13.4413 11.3836 10.841 9.24219 7.64795 9.24219Z" fill="white"/>
                    </svg>
                    <span className="font-['Satoshi'] font-bold text-xs leading-[18px] text-white w-[54px] h-[18px]">John Doe</span>
                  </div>
                </div>
                <div className="flex items-center justify-center p-2.5 w-[34px] h-[34px] bg-[rgba(75,75,75,0.6)] backdrop-blur-sm rounded-[40px]">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.4651 4.09202V4.83132L5.82529 9.47109C5.21345 8.91661 4.83105 8.10083 4.83105 7.22769V4.09202C4.83105 2.77912 5.72332 1.68929 6.93425 1.37699C7.05534 1.34513 7.17006 1.4471 7.17006 1.56819V2.54968C7.17006 2.81099 7.38675 3.02768 7.64806 3.02768C7.90936 3.02768 8.12605 2.81099 8.12605 2.54968V1.56819C8.12605 1.4471 8.24077 1.34513 8.36187 1.37699C9.57279 1.68929 10.4651 2.77912 10.4651 4.09202Z" fill="white"/>
                    <path d="M12.6256 6.25226V7.26561C12.6256 9.85955 10.6307 11.9946 8.09415 12.2177V13.5752C8.09415 13.8237 7.89658 14.0213 7.64802 14.0213C7.39946 14.0213 7.20189 13.8237 7.20189 13.5752V12.2177C6.5072 12.1539 5.85075 11.95 5.2644 11.625L5.92085 10.9685C6.44347 11.2107 7.02981 11.3509 7.64802 11.3509C9.90417 11.3509 11.7397 9.51539 11.7397 7.26561V6.25226C11.7397 6.01007 11.9373 5.8125 12.1858 5.8125C12.428 5.8125 12.6256 6.01007 12.6256 6.25226Z" fill="white"/>
                    <path d="M10.465 6.42383V7.34796C10.465 8.99227 9.05013 10.3115 7.36758 10.1522C7.18913 10.1331 7.01068 10.1012 6.84497 10.0439L10.465 6.42383Z" fill="white"/>
                    <path d="M13.8747 1.42074C13.6835 1.22954 13.3712 1.22954 13.18 1.42074L4.60791 9.99284C3.95146 9.27265 3.55631 8.31666 3.55631 7.26506V6.25171C3.55631 6.00952 3.35874 5.81195 3.11018 5.81195C2.868 5.81195 2.67042 6.00952 2.67042 6.25171V7.26506C2.67042 8.55884 3.16754 9.7379 3.97695 10.6238L1.41488 13.1859C1.22368 13.3771 1.22368 13.6894 1.41488 13.8806C1.51686 13.9698 1.63795 14.0208 1.76542 14.0208C1.89288 14.0208 2.01397 13.9698 2.10957 13.8742L13.8747 2.10906C14.0723 1.91786 14.0723 1.61194 13.8747 1.42074Z" fill="white"/>
                  </svg>
                </div>
              </div>

              {/* Picture-in-Picture */}
              <div className="flex flex-col items-start p-4 gap-2.5 w-48 h-[168px] bg-gray-400 rounded-xl relative z-10 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=170&fit=crop&crop=face" 
                  alt="Esther Howard" 
                  className="absolute inset-0 w-full h-full object-cover rounded-xl"
                />
                <div className="flex flex-row justify-between items-center w-[160px] h-[33px] relative z-10">
                  <div className="flex items-center px-3 py-2 gap-1 bg-[rgba(75,75,75,0.6)] backdrop-blur-sm rounded-[38px]">
                    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7.64796 7.64869C9.4079 7.64869 10.8346 6.22198 10.8346 4.46204C10.8346 2.7021 9.4079 1.27539 7.64796 1.27539C5.88802 1.27539 4.4613 2.7021 4.4613 4.46204C4.4613 6.22198 5.88802 7.64869 7.64796 7.64869Z" fill="white"/>
                      <path d="M7.64795 9.24219C4.45492 9.24219 1.85461 11.3836 1.85461 14.0222C1.85461 14.2006 1.99483 14.3408 2.17328 14.3408H13.1226C13.3011 14.3408 13.4413 14.2006 13.4413 14.0222C13.4413 11.3836 10.841 9.24219 7.64795 9.24219Z" fill="white"/>
                    </svg>
                    <span className="text-[10px] font-bold leading-[14px] text-white">Esther Howard</span>
                  </div>
                  <div className="flex items-center justify-center p-2.5 w-[32px] h-[32px] bg-[rgba(75,75,75,0.6)] backdrop-blur-sm rounded-[38px]">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.4651 4.09202V4.83132L5.82529 9.47109C5.21345 8.91661 4.83105 8.10083 4.83105 7.22769V4.09202C4.83105 2.77912 5.72332 1.68929 6.93425 1.37699C7.05534 1.34513 7.17006 1.4471 7.17006 1.56819V2.54968C7.17006 2.81099 7.38675 3.02768 7.64806 3.02768C7.90936 3.02768 8.12605 2.81099 8.12605 2.54968V1.56819C8.12605 1.4471 8.24077 1.34513 8.36187 1.37699C9.57279 1.68929 10.4651 2.77912 10.4651 4.09202Z" fill="white"/>
                      <path d="M12.6256 6.25226V7.26561C12.6256 9.85955 10.6307 11.9946 8.09415 12.2177V13.5752C8.09415 13.8237 7.89658 14.0213 7.64802 14.0213C7.39946 14.0213 7.20189 13.8237 7.20189 13.5752V12.2177C6.5072 12.1539 5.85075 11.95 5.2644 11.625L5.92085 10.9685C6.44347 11.2107 7.02981 11.3509 7.64802 11.3509C9.90417 11.3509 11.7397 9.51539 11.7397 7.26561V6.25226C11.7397 6.01007 11.9373 5.8125 12.1858 5.8125C12.428 5.8125 12.6256 6.01007 12.6256 6.25226Z" fill="white"/>
                      <path d="M10.465 6.42383V7.34796C10.465 8.99227 9.05013 10.3115 7.36758 10.1522C7.18913 10.1331 7.01068 10.1012 6.84497 10.0439L10.465 6.42383Z" fill="white"/>
                      <path d="M13.8747 1.42074C13.6835 1.22954 13.3712 1.22954 13.18 1.42074L4.60791 9.99284C3.95146 9.27265 3.55631 8.31666 3.55631 7.26506V6.25171C3.55631 6.00952 3.35874 5.81195 3.11018 5.81195C2.868 5.81195 2.67042 6.00952 2.67042 6.25171V7.26506C2.67042 8.55884 3.16754 9.7379 3.97695 10.6238L1.41488 13.1859C1.22368 13.3771 1.22368 13.6894 1.41488 13.8806C1.51686 13.9698 1.63795 14.0208 1.76542 14.0208C1.89288 14.0208 2.01397 13.9698 2.10957 13.8742L13.8747 2.10906C14.0723 1.91786 14.0723 1.61194 13.8747 1.42074Z" fill="white"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs and Chat */}
            <div className="flex flex-col items-start gap-2 w-[552px]">
              {/* Tabs */}
              <div className="flex flex-row items-center gap-2 w-full h-8">
                <button className="flex flex-row justify-center items-center px-4 py-2 gap-2.5 flex-1 h-8 bg-white border border-[#EBEBEB] rounded-md">
                  <span className="text-[13.5px] leading-4 text-[#5F5971]">Participants</span>
                </button>
                <button className="flex flex-row justify-center items-center px-4 py-2 gap-2.5 flex-1 h-8 bg-white border border-[#5F2EFC] rounded-md">
                  <span className="text-[13.5px] font-medium leading-4 text-[#5F2EFC]">Chat</span>
                </button>
              </div>

              {/* Chat Messages */}
              <div className="flex flex-col items-center p-6 gap-4 w-[552px] h-[252px] bg-white border border-[#EBEBEB] rounded-lg">
                {/* Message 1 */}
                <div className="flex flex-row items-start gap-3 w-[504px] h-[105px]">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0" />
                  <div className="flex flex-col items-start gap-1.5 w-[460px] h-[105px] flex-1">
                    <div className="flex flex-row items-center gap-2 w-[460px] h-[19px] self-stretch">
                      <span className="font-['Neue_Montreal'] font-bold text-base leading-[19px] text-[#2B2834] flex-1 w-[408px] h-[19px]">John Doe (Host)</span>
                      <span className="font-['Satoshi'] font-medium text-xs leading-[18px] text-[#A5A1AF] w-11 h-[18px]">2:20pm</span>
                    </div>
                    <div className="flex flex-row items-center p-[10px_14px] gap-2 w-[460px] h-20 bg-[#F2F4F7] rounded-tr-lg rounded-br-lg rounded-bl-lg self-stretch">
                      <div className="flex flex-col items-start gap-1 w-[432px] h-[60px] flex-1">
                        <p className="font-['Neue_Montreal'] font-normal text-base leading-[19px] text-[#101828] w-[432px] h-[38px] self-stretch">
                          Hey Olivia, can you please review the latest design when you can?
                        </p>
                        <div className="flex flex-row justify-center items-center gap-0.5 w-[53px] h-[18px]">
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.00029 8.74935L7.00029 12.8327M4.66696 4.26243V5.50529C4.66696 5.62663 4.66696 5.6873 4.65505 5.74534C4.64448 5.79682 4.627 5.84664 4.60309 5.89345C4.57614 5.94621 4.53824 5.99358 4.46244 6.08834L3.54673 7.23297C3.15838 7.7184 2.96421 7.96112 2.96399 8.16539C2.9638 8.34304 3.04457 8.51109 3.18341 8.62192C3.34305 8.74935 3.65388 8.74935 4.27554 8.74935H9.72504C10.3467 8.74935 10.6575 8.74935 10.8172 8.62192C10.956 8.51109 11.0368 8.34304 11.0366 8.16539C11.0364 7.96112 10.8422 7.7184 10.4539 7.23297L9.53815 6.08834C9.46234 5.99358 9.42444 5.94621 9.39749 5.89345C9.37358 5.84664 9.3561 5.79682 9.34553 5.74534C9.33362 5.6873 9.33362 5.62663 9.33362 5.50529V4.26243C9.33362 4.19527 9.33362 4.16169 9.33742 4.12858C9.34079 4.09916 9.3464 4.07004 9.35419 4.04148C9.36297 4.00932 9.37544 3.97815 9.40038 3.91579L9.98831 2.44598C10.1598 2.01718 10.2456 1.80278 10.2098 1.63067C10.1785 1.48016 10.0891 1.34808 9.96099 1.26314C9.81448 1.16602 9.58356 1.16602 9.12173 1.16602H4.87886C4.41702 1.16602 4.18611 1.16602 4.03959 1.26314C3.91146 1.34808 3.82204 1.48016 3.79076 1.63067C3.755 1.80278 3.84076 2.01718 4.01228 2.44598L4.6002 3.91579C4.62514 3.97815 4.63761 4.00932 4.64639 4.04148C4.65418 4.07004 4.65979 4.09916 4.66316 4.12858C4.66696 4.16169 4.66696 4.19527 4.66696 4.26243Z" stroke="#5838FC" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <span className="font-['Satoshi'] font-normal text-xs leading-[18px] text-[#5838FC] w-[37px] h-[18px]">Pinned</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Message 2 */}
                <div className="flex flex-row justify-end items-start gap-3 w-[504px] h-[83px]">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0" style={{ order: 0 }} />
                  <div className="flex flex-col items-start gap-1.5 w-[460px] h-[83px] flex-1" style={{ order: 1 }}>
                    <div className="flex flex-row items-center gap-2 w-[460px] h-[19px] self-stretch">
                      <span className="font-['Neue_Montreal'] font-bold text-base leading-[19px] text-[#2B2834] flex-1 w-[408px] h-[19px]">Esther Howard</span>
                      <span className="font-['Inter'] font-normal text-xs leading-[18px] text-[#A5A1AF] w-11 h-[18px]">2:20pm</span>
                    </div>
                    <div className="flex flex-row items-center p-[10px_14px] gap-2 w-[460px] h-[58px] bg-[#F2F4F7] rounded-tr-lg rounded-br-lg rounded-bl-lg self-stretch">
                      <p className="font-['Neue_Montreal'] font-normal text-base leading-[19px] text-[#101828] w-[432px] h-[38px] flex-1">
                        Absolutely! I'm excited to hear that the course covers amazing strategies for growing our audience. Let's explore it together!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
