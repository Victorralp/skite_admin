'use client';

import { useState, useEffect, useRef } from 'react';

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
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (option: string) => {
    setSelected(option);
    setIsOpen(false);
    if (onSelect) {
      onSelect(option);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center py-1 px-2.5 gap-0 w-20 h-8 bg-surface-primary border border-border-primary shadow-card rounded-lg flex-none cursor-pointer hover:border-border-secondary transition-colors ${className}`}
      >
        <span className="text-caption-lg text-text-secondary flex-1 h-4 whitespace-nowrap">
          {selected}
        </span>
        <div className="w-5 h-5 flex-none">
          <DropdownIcon />
        </div>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div 
          className="absolute right-0 top-9 z-50 rounded-lg flex flex-col overflow-hidden bg-white border border-border-primary shadow-dropdown"
          style={{
            width: '100px'
          }}
        >
          {options.map((option, i) => (
            <button
              key={option}
              onClick={() => handleSelect(option)}
              className="w-full h-8 flex items-center px-4 py-2 gap-2.5 bg-white hover:bg-gray-50 transition-colors border-b border-border-primary last:border-b-0"
            >
              <span className="text-body-sm text-text-secondary">
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