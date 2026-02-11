'use client';

import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

interface HubDetailModalProps {
    hub: any | null;
    onClose: () => void;
}

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0 }).format(amount);
}

const mockActivityData = [
    { date: 'Jan 24, 2020', posts: 92, reactions: 323, newMembers: '+3' },
    { date: 'Jan 19, 2020', posts: 92, reactions: 323, newMembers: '+3' },
    { date: 'Jan 20, 2020', posts: 92, reactions: 323, newMembers: '+3' },
    { date: 'Jan 19, 2020', posts: 92, reactions: 323, newMembers: '+3' },
    { date: 'Feb 1, 2020', posts: 92, reactions: 323, newMembers: '+3' },
    { date: 'Feb 1, 2020', posts: 92, reactions: 323, newMembers: '+3' }
];

const mockMembers = [
    { id: 1, name: 'Adaeze Obi', handle: '@lucyliu', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face' },
    { id: 2, name: 'Ifeanyi Eze', handle: '@jackwilson', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face' },
    { id: 3, name: 'Ngozi Opara', handle: '@parkerlee', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face' },
    { id: 4, name: 'Iniobong Umoh', handle: '@gracewong', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face' },
    { id: 5, name: 'Yahaya Ibrahim', handle: '@zacharyking', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face' },
    { id: 6, name: 'Damilola Aina', handle: '@charliebrown', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face' },
    { id: 7, name: 'Adesuwa Ighodaro', handle: '@taylorswift', avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face' },
    { id: 8, name: 'Farida Waziri', handle: '@ellierose', avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&h=100&fit=crop&crop=face' },
    { id: 9, name: 'Femi Daramola', handle: '@zoeywilson', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face' },
    { id: 10, name: 'Tochukwu Anene', handle: '@lilywhite', avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100&h=100&fit=crop&crop=face' },
    { id: 11, name: 'Tosin Aluko', handle: '@rileybrown', avatar: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=100&h=100&fit=crop&crop=face' },
    { id: 12, name: 'Obinna Okeke', handle: '@paigelee', avatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100&h=100&fit=crop&crop=face' }
];

const mockChartData = Array(14).fill(null).map((_, i) => ({
    day: i + 1,
    posts: Math.floor(Math.random() * 350),
    reactions: Math.floor(Math.random() * 350)
}));

export default function HubDetailModal({ hub, onClose }: HubDetailModalProps) {
    const [activeTab, setActiveTab] = useState('Overview');

    useEffect(() => {
        if (hub) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [hub]);

    if (!hub) return null;

    return (
        <>
            {/* Backdrop */}
            <div 
                className="fixed inset-0 bg-black/50 z-40"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="fixed right-0 top-0 h-full w-[600px] bg-white z-50 flex flex-col shadow-2xl animate-slide-in">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 h-[60px] border-b border-border-secondary">
                    <h2 className="font-sans text-heading-sm tracking-[-0.01em] text-text-primary">
                        Hub Details
                    </h2>
                    <button
                        onClick={onClose}
                        className="flex items-center gap-1.5 px-2 py-1.5 bg-surface-secondary rounded-md hover:bg-gray-200 transition-colors"
                    >
                        <X className="w-4 h-4 text-text-brand" />
                        <span className="font-sans text-caption-lg text-text-brand">
                            Close
                        </span>
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto no-scrollbar">
                    {/* Hub Info Section */}
                    <div className="px-6 py-6 flex flex-col gap-3">
                        {/* Hub Header */}
                        <div className="flex items-center gap-3">
                            <div className="w-[60px] h-[60px] rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex-shrink-0" />
                            <h3 className="font-sans text-body-lg text-text-primary">
                                {hub.name}
                            </h3>
                        </div>

                        {/* Pills Row */}
                        <div className="flex items-center gap-1.5">
                            <div className="flex items-center justify-center gap-1 px-2.5 py-1.5 bg-surface-secondary rounded-full">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M5.3335 2.66659C4.62625 2.66659 3.94797 2.94755 3.44788 3.44764C2.94778 3.94774 2.66683 4.62602 2.66683 5.33326C2.66683 6.04051 2.94778 6.71878 3.44788 7.21888C3.94797 7.71898 4.62625 7.99993 5.3335 7.99993C6.04074 7.99993 6.71902 7.71898 7.21911 7.21888C7.71921 6.71878 8.00016 6.04051 8.00016 5.33326C8.00016 4.62602 7.71921 3.94774 7.21911 3.44764C6.71902 2.94755 6.04074 2.66659 5.3335 2.66659ZM4.00016 8.66659C3.29292 8.66659 2.61464 8.94755 2.11454 9.44764C1.61445 9.94774 1.3335 10.626 1.3335 11.3333V11.9999C1.3335 12.3535 1.47397 12.6927 1.72402 12.9427C1.97407 13.1928 2.31321 13.3333 2.66683 13.3333H8.00016C8.35379 13.3333 8.69292 13.1928 8.94297 12.9427C9.19302 12.6927 9.3335 12.3535 9.3335 11.9999V11.3333C9.3335 10.626 9.05255 9.94774 8.55245 9.44764C8.05235 8.94755 7.37407 8.66659 6.66683 8.66659H4.00016ZM8.8335 7.26993C9.15216 6.69659 9.3335 6.03659 9.3335 5.33326C9.33364 4.65555 9.16159 3.98892 8.8335 3.39593C9.21204 3.03775 9.68724 2.79834 10.2004 2.70728C10.7135 2.61623 11.2421 2.67752 11.7207 2.88358C12.1994 3.08965 12.6072 3.43146 12.8937 3.86676C13.1803 4.30206 13.333 4.81179 13.333 5.33293C13.333 5.85407 13.1803 6.36379 12.8937 6.7991C12.6072 7.2344 12.1994 7.57621 11.7207 7.78227C11.2421 7.98834 10.7135 8.04963 10.2004 7.95858C9.68724 7.86752 9.21204 7.62811 8.8335 7.26993ZM10.3108 13.3333C10.5375 12.9413 10.6675 12.4859 10.6675 11.9999V11.3333C10.6687 10.3491 10.3059 9.39928 9.64883 8.66659H12.0002C12.7074 8.66659 13.3857 8.94755 13.8858 9.44764C14.3859 9.94774 14.6668 10.626 14.6668 11.3333V11.9999C14.6668 12.3535 14.5264 12.6927 14.2763 12.9427C14.0263 13.1928 13.6871 13.3333 13.3335 13.3333H10.3108Z" fill="#5F2EFC"/>
                                </svg>
                                <span className="font-sans text-body-sm-regular text-text-primary">
                                    {hub.members.toLocaleString()} Members
                                </span>
                            </div>
                            <div className="flex items-center justify-center gap-1 px-2.5 py-1.5 bg-surface-secondary rounded-full">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.1669 1.66675C5.1669 1.53414 5.11422 1.40696 5.02045 1.31319C4.92668 1.21943 4.79951 1.16675 4.6669 1.16675C4.53429 1.16675 4.40711 1.21943 4.31334 1.31319C4.21958 1.40696 4.1669 1.53414 4.1669 1.66675V2.72008C3.2069 2.79675 2.57756 2.98475 2.1149 3.44808C1.65156 3.91075 1.46356 4.54075 1.38623 5.50008H14.6142C14.5369 4.54008 14.3489 3.91075 13.8856 3.44808C13.4229 2.98475 12.7929 2.79675 11.8336 2.71941V1.66675C11.8336 1.53414 11.7809 1.40696 11.6871 1.31319C11.5933 1.21943 11.4662 1.16675 11.3336 1.16675C11.201 1.16675 11.0738 1.21943 10.98 1.31319C10.8862 1.40696 10.8336 1.53414 10.8336 1.66675V2.67541C10.3902 2.66675 9.8929 2.66675 9.33356 2.66675H6.6669C6.10756 2.66675 5.61023 2.66675 5.1669 2.67541V1.66675Z" fill="#5F2EFC"/>
                                    <path fillRule="evenodd" clipRule="evenodd" d="M1.3335 8C1.3335 7.44067 1.3335 6.94333 1.34216 6.5H14.6582C14.6668 6.94333 14.6668 7.44067 14.6668 8V9.33333C14.6668 11.8473 14.6668 13.1047 13.8855 13.8853C13.1042 14.666 11.8475 14.6667 9.3335 14.6667H6.66683C4.15283 14.6667 2.8955 14.6667 2.11483 13.8853C1.33416 13.104 1.3335 11.8473 1.3335 9.33333V8ZM11.3335 9.33333C11.5103 9.33333 11.6799 9.2631 11.8049 9.13807C11.9299 9.01305 12.0002 8.84348 12.0002 8.66667C12.0002 8.48986 11.9299 8.32029 11.8049 8.19526C11.6799 8.07024 11.5103 8 11.3335 8C11.1567 8 10.9871 8.07024 10.8621 8.19526C10.7371 8.32029 10.6668 8.48986 10.6668 8.66667C10.6668 8.84348 10.7371 9.01305 10.8621 9.13807C10.9871 9.2631 11.1567 9.33333 11.3335 9.33333ZM11.3335 12C11.5103 12 11.6799 11.9298 11.8049 11.8047C11.9299 11.6797 12.0002 11.5101 12.0002 11.3333C12.0002 11.1565 11.9299 10.987 11.8049 10.8619C11.6799 10.7369 11.5103 10.6667 11.3335 10.6667C11.1567 10.6667 10.9871 10.7369 10.8621 10.8619C10.7371 10.987 10.6668 11.1565 10.6668 11.3333C10.6668 11.5101 10.7371 11.6797 10.8621 11.8047C10.9871 11.9298 11.1567 12 11.3335 12ZM8.66683 8.66667C8.66683 8.84348 8.59659 9.01305 8.47157 9.13807C8.34654 9.2631 8.17697 9.33333 8.00016 9.33333C7.82335 9.33333 7.65378 9.2631 7.52876 9.13807C7.40373 9.01305 7.3335 8.84348 7.3335 8.66667C7.3335 8.48986 7.40373 8.32029 7.52876 8.19526C7.65378 8.07024 7.82335 8 8.00016 8C8.17697 8 8.34654 8.07024 8.47157 8.19526C8.59659 8.32029 8.66683 8.48986 8.66683 8.66667ZM8.66683 11.3333C8.66683 11.5101 8.59659 11.6797 8.47157 11.8047C8.34654 11.9298 8.17697 12 8.00016 12C7.82335 12 7.65378 11.9298 7.52876 11.8047C7.40373 11.6797 7.3335 11.5101 7.3335 11.3333C7.3335 11.1565 7.40373 10.987 7.52876 10.8619C7.65378 10.7369 7.82335 10.6667 8.00016 10.6667C8.17697 10.6667 8.34654 10.7369 8.47157 10.8619C8.59659 10.987 8.66683 11.1565 8.66683 11.3333ZM4.66683 9.33333C4.84364 9.33333 5.01321 9.2631 5.13823 9.13807C5.26326 9.01305 5.3335 8.84348 5.3335 8.66667C5.3335 8.48986 5.26326 8.32029 5.13823 8.19526C5.01321 8.07024 4.84364 8 4.66683 8C4.49002 8 4.32045 8.07024 4.19543 8.19526C4.0704 8.32029 4.00016 8.48986 4.00016 8.66667C4.00016 8.84348 4.0704 9.01305 4.19543 9.13807C4.32045 9.2631 4.49002 9.33333 4.66683 9.33333ZM4.66683 12C4.84364 12 5.01321 11.9298 5.13823 11.8047C5.26326 11.6797 5.3335 11.5101 5.3335 11.3333C5.3335 11.1565 5.26326 10.987 5.13823 10.8619C5.01321 10.7369 4.84364 10.6667 4.66683 10.6667C4.49002 10.6667 4.32045 10.7369 4.19543 10.8619C4.0704 10.987 4.00016 11.1565 4.00016 11.3333C4.00016 11.5101 4.0704 11.6797 4.19543 11.8047C4.32045 11.9298 4.49002 12 4.66683 12Z" fill="#5F2EFC"/>
                                </svg>
                                <span className="font-sans text-body-sm-regular text-text-primary">
                                    Created Dec 1
                                </span>
                            </div>
                            <div className="flex items-center justify-center gap-1 px-2.5 py-1.5 bg-surface-secondary rounded-full">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M8 14.6667C11.6819 14.6667 14.6667 11.6819 14.6667 8C14.6667 4.3181 11.6819 1.33333 8 1.33333C4.3181 1.33333 1.33333 4.3181 1.33333 8C1.33333 11.6819 4.3181 14.6667 8 14.6667ZM8.66667 4.66667C8.66667 4.29848 8.36819 4 8 4C7.63181 4 7.33333 4.29848 7.33333 4.66667V8C7.33333 8.36819 7.63181 8.66667 8 8.66667H10.6667C11.0349 8.66667 11.3333 8.36819 11.3333 8C11.3333 7.63181 11.0349 7.33333 10.6667 7.33333H8.66667V4.66667Z" fill="#5F2EFC"/>
                                </svg>
                                <span className="font-sans text-body-sm-regular text-text-primary">
                                    3 years
                                </span>
                            </div>
                        </div>

                        {/* Stats Row */}
                        <div className="flex items-center p-4 bg-surface-secondary border border-border-primary rounded-lg h-[68px]">
                            <div className="flex-1 flex flex-col items-center gap-2">
                                <span className="font-sans text-caption-sm text-center text-text-tertiary">
                                    Revenue Generated
                                </span>
                                <span className="font-sans text-body-sm text-center text-text-primary">
                                    ₦24,567,890
                                </span>
                            </div>
                            <div className="w-px h-9 bg-[#EBEBEB]" />
                            <div className="flex-1 flex flex-col items-center gap-2">
                                <span className="font-sans text-caption-sm text-center text-text-tertiary">
                                    Posts This Week
                                </span>
                                <span className="font-sans text-body-sm text-center text-text-primary">
                                    255
                                </span>
                            </div>
                            <div className="w-px h-9 bg-[#EBEBEB]" />
                            <div className="flex-1 flex flex-col items-center gap-2">
                                <span className="font-sans text-caption-sm text-center text-text-tertiary">
                                    Reports/Flags
                                </span>
                                <span className="font-sans text-body-sm text-center text-text-primary">
                                    0
                                </span>
                            </div>
                            <div className="w-px h-9 bg-[#EBEBEB]" />
                            <div className="flex-1 flex flex-col items-center gap-2">
                                <span className="font-sans text-caption-sm text-center text-text-tertiary">
                                    Last Activity
                                </span>
                                <span className="font-sans text-body-sm text-center text-text-primary">
                                    2s ago
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex items-center border-b border-border-primary">
                        {['Overview', 'Members'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={cn(
                                    "flex-1 flex flex-col items-center pt-2.5 gap-3 h-[38px] font-sans text-body-sm transition-colors",
                                    activeTab === tab ? "text-text-primary" : "text-text-tertiary"
                                )}
                            >
                                <span>{tab}</span>
                                <div className={cn(
                                    "w-full h-0",
                                    activeTab === tab ? "border-b-2 border-border-brand" : "border-b border-border-primary"
                                )} />
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    {activeTab === 'Overview' && (
                        <div className="px-6 py-6 bg-surface-secondary flex flex-col gap-6">
                            {/* Activity Snapshot */}
                            <div className="flex flex-col gap-2">
                                <h4 className="font-sans text-body-md tracking-[-0.01em] text-text-primary">
                                    Activity Snapshot (last 7 days)
                                </h4>
                                <div className="flex flex-col p-1 bg-surface-secondary rounded-xl">
                                    {/* Table Header */}
                                    <div className="flex items-center px-4 py-2 gap-6">
                                        <div className="flex-1 font-sans text-body-sm text-text-secondary">Date</div>
                                        <div className="flex-1 font-sans text-body-sm text-text-secondary">Posts</div>
                                        <div className="flex-1 font-sans text-body-sm text-text-secondary">Reactions</div>
                                        <div className="flex-1 font-sans text-body-sm text-text-secondary">New Members</div>
                                    </div>

                                    {/* Table Body */}
                                    <div className="bg-white border border-border-primary rounded-lg overflow-hidden">
                                        {mockActivityData.map((row, index) => (
                                            <div
                                                key={index}
                                                className={cn(
                                                    "flex items-center px-4 py-2 gap-6",
                                                    index !== mockActivityData.length - 1 && "border-b border-border-primary"
                                                )}
                                            >
                                                <div className="flex-1 font-sans text-body-sm text-text-primary">{row.date}</div>
                                                <div className="flex-1 font-sans text-body-sm text-text-primary">{row.posts}</div>
                                                <div className="flex-1 font-sans text-body-sm text-text-primary">{row.reactions}</div>
                                                <div className="flex-1 font-sans text-body-sm text-text-primary">{row.newMembers}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Posts/Reactions Chart */}
                            <div className="flex flex-col gap-2">
                                <h4 className="font-sans text-body-md tracking-[-0.01em] text-text-primary">
                                    Posts/reactions (Last 14 days)
                                </h4>
                                <div className="flex flex-col p-4 gap-2 bg-white rounded-xl">
                                    <div className="flex gap-4 h-[189px]">
                                        {/* Y-axis labels */}
                                        <div className="flex flex-col justify-between items-end w-[21px]">
                                            <span className="font-sans text-caption-lg-regular text-text-tertiary">350</span>
                                            <span className="font-sans text-caption-lg-regular text-text-tertiary">0</span>
                                        </div>

                                        {/* Chart bars */}
                                        <div className="flex-1 flex items-end gap-2 relative">
                                            {/* Grid background */}
                                            <div className="absolute inset-0 bg-[#D9D9D9] opacity-10" />
                                            
                                            {mockChartData.map((data, i) => (
                                                <div key={i} className="flex-1 flex items-end gap-px h-full">
                                                    <div 
                                                        className="flex-1 bg-[#BCADEE] rounded-t"
                                                        style={{ height: `${(data.posts / 350) * 100}%` }}
                                                    />
                                                    <div 
                                                        className="flex-1 bg-[#ECB9BA] rounded-t"
                                                        style={{ height: `${(data.reactions / 350) * 100}%` }}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* X-axis labels */}
                                    <div className="flex justify-between pl-10">
                                        <span className="font-sans text-caption-lg-regular text-center text-text-tertiary">1</span>
                                        <span className="font-sans text-caption-lg-regular text-center text-text-tertiary">14</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'Members' && (
                        <div className="px-6 py-6 bg-surface-secondary flex flex-col gap-3">
                            <h4 className="font-sans text-body-md tracking-[-0.01em] text-text-primary">
                                Member List
                            </h4>
                            <div className="bg-white rounded-xl overflow-hidden">
                                {mockMembers.map((member, index) => (
                                    <div
                                        key={member.id}
                                        className={cn(
                                            "flex items-center gap-2 px-3 py-2.5 bg-white",
                                            index !== mockMembers.length - 1 && "border-b border-border-primary"
                                        )}
                                    >
                                        <img
                                            src={member.avatar}
                                            alt={member.name}
                                            className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                                        />
                                        <div className="flex-1 flex flex-col gap-0.5">
                                            <span className="font-sans text-body-md text-text-primary">
                                                {member.name}
                                            </span>
                                            <span className="font-sans text-caption-lg-regular text-text-secondary">
                                                {member.handle}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
