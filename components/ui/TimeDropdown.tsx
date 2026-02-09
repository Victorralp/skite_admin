'use client';

import { useState } from 'react';

interface TimeDropdownProps {
  options?: string[];
  defaultOption?: string;
  onSelect?: (option: string) => void;
  className?: string;
}

const DropdownIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.8335 8.33325L10.0002 12.4999L14.1668 8.33325H5.8335Z" fill="#DBD8E4"/>
  </svg>
);

const TimeDropdown = ({ 
  options = ['All Time', 'This Year', 'This Month'],
  defaultOption = 'All Time',
  onSelect,
  className = ''
}: TimeDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(defaultOption);

  const handleSelect = (option: string) => {
    setSelected(option);
    setIsOpen(false);
    if (onSelect) {
      onSelect(option);
    }
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center pt-[5px] pr-[7px] pb-[5px] pl-[10px] gap-0 w-[78px] h-[30px] bg-[#FFFFFF] border border-[#EBEBEB] shadow-[0px_1px_4.8px_0px_rgba(0,0,0,0.03)] rounded-[8px] flex-none cursor-pointer hover:border-[#DBD8E4] transition-colors ${className}`}
      >
        <span className="text-xs font-normal leading-none text-[#5F5971] font-['Neue_Montreal'] flex-1 h-[14px] whitespace-nowrap tracking-[0%]">
          {selected}
        </span>
        <div className="w-5 h-5 flex-none">
          <DropdownIcon />
        </div>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div 
          className="absolute right-0 top-[34px] z-50 rounded-[8px] flex flex-col overflow-hidden bg-white"
          style={{
            width: '100px',
            border: '1px solid #EBEBEB',
            boxShadow: '0px 116px 46px rgba(0, 0, 0, 0.01), 0px 65px 39px rgba(0, 0, 0, 0.05), 0px 29px 29px rgba(0, 0, 0, 0.09), 0px 7px 16px rgba(0, 0, 0, 0.1)'
          }}
        >
          {options.map((option, i) => (
            <button
              key={option}
              onClick={() => handleSelect(option)}
              className="w-full h-[33px] flex items-center px-4 py-2 gap-2.5 bg-white hover:bg-gray-50 transition-colors"
              style={{
                borderBottom: i < options.length - 1 ? '0.2px solid #EBEBEB' : 'none'
              }}
            >
              <span className="font-['Neue_Montreal'] font-normal text-[13.5px] leading-[16px] text-[#5F5971]">
                {option}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default TimeDropdown;