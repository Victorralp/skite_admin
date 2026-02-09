'use client';

import { X, Pause, Volume2 } from 'lucide-react';
import { useState } from 'react';
import PauseStreamsModal from './PauseStreamsModal';
import MuteChatModal from './MuteChatModal';
import DisableStreamsModal from './DisableStreamsModal';

interface LiveStreamingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LiveStreamingModal({ isOpen, onClose }: LiveStreamingModalProps) {
  const [maxStreams, setMaxStreams] = useState('25');
  const [maxDuration, setMaxDuration] = useState('00:50:00');
  const [maxViewers, setMaxViewers] = useState('500');
  const [showPauseConfirm, setShowPauseConfirm] = useState(false);
  const [showMuteChatConfirm, setShowMuteChatConfirm] = useState(false);
  const [showDisableStreamsConfirm, setShowDisableStreamsConfirm] = useState(false);

  const handlePauseStreams = () => {
    setShowPauseConfirm(true);
  };

  const handleConfirmPause = () => {
    // Handle the actual pause action here
    console.log('Pausing all streams...');
    setShowPauseConfirm(false);
    // You might want to close the main modal too or show a success message
  };

  const handleMuteChat = () => {
    setShowMuteChatConfirm(true);
  };

  const handleConfirmMuteChat = () => {
    // Handle the actual mute chat action here
    console.log('Muting all chat...');
    setShowMuteChatConfirm(false);
    // You might want to close the main modal too or show a success message
  };

  const handleDisableStreams = () => {
    setShowDisableStreamsConfirm(true);
  };

  const handleConfirmDisableStreams = (duration: string) => {
    // Handle the actual disable streams action here
    console.log('Disabling new streams for:', duration);
    setShowDisableStreamsConfirm(false);
    // You might want to close the main modal too or show a success message
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
              className="flex flex-row items-center px-2 py-1.5 gap-1.5 bg-[#F9F9FB] rounded-md hover:bg-gray-200 transition-colors"
            >
              <X className="w-4 h-4 text-[#2B2834]" strokeWidth={1.5} />
              <span className="text-[13.5px] font-medium leading-4 text-[#17181C]">
                Close
              </span>
            </button>

            <button className="flex flex-row justify-center items-center px-4 py-1.5 h-7 bg-gradient-to-b from-[#5F2EFC] to-[#4E18FC] rounded-lg shadow-[inset_0px_1.5px_1px_rgba(255,255,255,0.11)] hover:opacity-90 transition-opacity">
              <span className="text-[13.5px] font-medium leading-4 text-[#FFFCF8]">
                Save
              </span>
            </button>
          </div>

          <h2 className="text-lg font-bold leading-[22px] text-[#17181C]">
            Live Streaming Settings
          </h2>
        </div>

        <div className="w-full h-px border-t border-[#F0EBF4]" />

        {/* Content */}
        <div className="flex flex-col items-center px-6 py-6 gap-2 w-full overflow-y-auto">
          {/* Stream Limits */}
          <div className="flex flex-col items-start p-4 gap-2 w-full bg-[#F9F9FB] rounded-lg">
            <h3 className="text-[13.5px] font-bold leading-4 text-[#2B2834] w-full">
              Stream Limits
            </h3>

            <div className="flex flex-col items-start w-full">
              {/* Max Concurrent Streams */}
              <div className="flex flex-row items-center py-2 gap-4 w-full border-b border-[#EBEBEB]">
                <label className="text-[13.5px] font-normal leading-4 text-[#5F5971] flex-1">
                  Max Concurrent Streams
                </label>
                <input
                  type="text"
                  value={maxStreams}
                  onChange={(e) => setMaxStreams(e.target.value)}
                  className="flex flex-row items-center px-3 py-2 w-[95px] h-[30px] bg-white border border-[#EBEBEB] shadow-sm rounded-md text-xs font-medium text-[#2B2834] focus:outline-none focus:ring-2 focus:ring-[#5F2EFC]"
                />
              </div>

              {/* Max Session Duration */}
              <div className="flex flex-row items-center py-2 gap-4 w-full border-b border-[#EBEBEB]">
                <label className="text-[13.5px] font-normal leading-4 text-[#5F5971] flex-1">
                  Max Session Duration
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={maxDuration}
                    onChange={(e) => setMaxDuration(e.target.value)}
                    className="flex flex-row items-center px-3 py-2 w-[95px] h-[30px] bg-white border border-[#EBEBEB] shadow-sm rounded-md text-xs font-medium text-[#2B2834] focus:outline-none focus:ring-2 focus:ring-[#5F2EFC]"
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

              {/* Max Viewers per Stream */}
              <div className="flex flex-row items-center pt-2 gap-4 w-full">
                <label className="text-[13.5px] font-normal leading-4 text-[#5F5971] flex-1">
                  Max Viewers per Stream
                </label>
                <input
                  type="text"
                  value={maxViewers}
                  onChange={(e) => setMaxViewers(e.target.value)}
                  className="flex flex-row items-center px-3 py-2 w-[95px] h-[30px] bg-white border border-[#EBEBEB] shadow-sm rounded-md text-xs font-medium text-[#2B2834] focus:outline-none focus:ring-2 focus:ring-[#5F2EFC]"
                />
              </div>
            </div>
          </div>

          {/* Emergency Controls */}
          <div className="flex flex-col items-start p-4 gap-2 w-full bg-[#F9F9FB] rounded-lg">
            <h3 className="text-[13.5px] font-bold leading-4 text-[#2B2834] w-full">
              Emergency Controls
            </h3>

            <div className="flex flex-col items-start w-full">
              {/* Pause All Streams */}
              <div className="flex flex-row items-center py-2 gap-4 w-full border-b border-[#EBEBEB]">
                <button 
                  onClick={handlePauseStreams}
                  className="flex flex-row justify-center items-center px-4 py-2 gap-2 h-8 bg-[#FFAA00] rounded-lg shadow-[inset_0px_1.5px_1px_rgba(255,255,255,0.11)] hover:opacity-90 transition-opacity"
                >
                  <Pause className="w-3.5 h-3.5 text-[#2B2834]" strokeWidth={1.3} />
                  <span className="text-[13.5px] font-medium leading-4 text-[#353A44]">
                    Pause All Streams
                  </span>
                </button>
                <span className="text-xs font-normal leading-[14px] text-[#5F5971] text-right flex-1">
                  (Emergency)
                </span>
              </div>

              {/* Mute All Chat */}
              <div className="flex flex-row items-center py-2 gap-4 w-full border-b border-[#EBEBEB]">
                <button 
                  onClick={handleMuteChat}
                  className="flex flex-row justify-center items-center px-4 py-2 gap-2 h-8 bg-[#5F2EFC] rounded-lg shadow-[inset_0px_1.5px_1px_rgba(255,255,255,0.11)] hover:opacity-90 transition-opacity"
                >
                  <Volume2 className="w-3.5 h-3.5 text-white" strokeWidth={1.3} />
                  <span className="text-[13.5px] font-medium leading-4 text-white">
                    Mute All Chat
                  </span>
                </button>
                <span className="text-xs font-normal leading-[14px] text-[#5F5971] text-right flex-1">
                  (Platform-wide)
                </span>
              </div>

              {/* Disable New Streams */}
              <div className="flex flex-row justify-between items-center pt-2 gap-4 w-full">
                <button 
                  onClick={handleDisableStreams}
                  className="flex flex-row justify-center items-center px-4 py-2 gap-2 h-8 bg-[#CD110A] rounded-lg shadow-[inset_0px_1.5px_1px_rgba(255,255,255,0.11)] hover:opacity-90 transition-opacity"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_1057_35464)">
                      <path d="M6.21841 3.49935H8.16675C8.47617 3.49935 8.77291 3.62227 8.99171 3.84106C9.2105 4.05985 9.33341 4.3566 9.33341 4.66602V6.12435L12.3947 4.33818C12.4391 4.31232 12.4894 4.29861 12.5408 4.29843C12.5921 4.29826 12.6425 4.31163 12.687 4.33719C12.7315 4.36275 12.7685 4.39961 12.7942 4.44403C12.8199 4.48845 12.8334 4.53886 12.8334 4.59018V9.37118M9.33341 9.33268C9.33341 9.6421 9.2105 9.93885 8.99171 10.1576C8.77291 10.3764 8.47617 10.4993 8.16675 10.4993H2.33341C2.024 10.4993 1.72725 10.3764 1.50846 10.1576C1.28966 9.93885 1.16675 9.6421 1.16675 9.33268V4.66602C1.16675 4.3566 1.28966 4.05985 1.50846 3.84106C1.72725 3.62227 2.024 3.49935 2.33341 3.49935H3.50008M1.16675 1.16602L12.8334 12.8327" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                    </g>
                    <defs>
                      <clipPath id="clip0_1057_35464">
                        <rect width="14" height="14" fill="white"/>
                      </clipPath>
                    </defs>
                  </svg>
                  <span className="text-[13.5px] font-medium leading-4 text-white">
                    Disable New Streams
                  </span>
                </button>
                <span className="text-xs font-normal leading-[14px] text-[#5F5971] text-right flex-1">
                  (Temp)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <PauseStreamsModal
        isOpen={showPauseConfirm}
        onClose={() => setShowPauseConfirm(false)}
        onConfirm={handleConfirmPause}
      />

      <MuteChatModal
        isOpen={showMuteChatConfirm}
        onClose={() => setShowMuteChatConfirm(false)}
        onConfirm={handleConfirmMuteChat}
      />

      <DisableStreamsModal
        isOpen={showDisableStreamsConfirm}
        onClose={() => setShowDisableStreamsConfirm(false)}
        onConfirm={handleConfirmDisableStreams}
      />
    </div>
  );
}
