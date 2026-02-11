'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

const personalInfo = [
    { label: 'Full Name', value: 'Mfonobong Essien', status: 'verified' },
    { label: 'Email', value: 'salihuidris1@gmail.com', status: 'verified' },
    { label: 'Tax Information', value: 'VAT (32******734)', status: 'verified' },
    { label: 'BVN', value: '83******933', status: 'verified' },
    { label: 'NIN', value: '01******266', status: 'pending' }
];

const documents = [
    { name: 'Bank Statement', type: 'PDF', date: 'September 9, 2013', image: 'https://images.unsplash.com/photo-1554224311-beee4ece8c35?w=400&h=300&fit=crop', verified: true },
    { name: 'Gov ID', type: 'PNG', date: 'September 9, 2013', image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=300&fit=crop', verified: true },
    { name: 'Document K', type: 'PNG', date: 'September 9, 2013', image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=300&fit=crop', verified: true },
    { name: 'Document D', type: 'JPEG', date: 'September 9, 2013', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop', verified: true }
];

const restrictions = [
    { label: 'Disable Payouts', enabled: false },
    { label: 'Restrict Live Sessions', enabled: false },
    { label: 'Restrict Paid DMs', enabled: false },
    { label: 'Restrict Paid Calls', enabled: false },
    { label: 'Content Shadowban', enabled: true }
];

const reports = [
    { date: '08-06-2025', reporter: '@oluwafem', type: 'Post', reason: 'Inappropriate', status: 'Resolved', action: 'Removed' },
    { date: '04-06-2025', reporter: '@julie_mutie', type: 'Post', reason: 'Inappropriate', status: 'Resolved', action: 'Removed' },
    { date: '18-04-2025', reporter: '@katwa0', type: 'Post', reason: 'Inappropriate', status: 'Pending', action: 'Removed' },
    { date: '09-07-2025', reporter: '@johnmaina', type: 'Post', reason: 'Inappropriate', status: 'Resolved', action: 'Removed' },
    { date: '05-07-2025', reporter: '@mercyCh', type: 'Post', reason: 'Inappropriate', status: 'Resolved', action: 'Removed' },
    { date: '12-06-2025', reporter: '@amonk_', type: 'Post', reason: 'Inappropriate', status: 'Resolved', action: 'Removed' },
    { date: '12-06-2025', reporter: '@amonk_', type: 'Post', reason: 'Inappropriate', status: 'Resolved', action: 'Removed' },
    { date: '12-06-2025', reporter: '@amonk_', type: 'Post', reason: 'Inappropriate', status: 'Resolved', action: 'Removed' },
    { date: '12-06-2025', reporter: '@amonk_', type: 'Post', reason: 'Inappropriate', status: 'Resolved', action: 'Removed' },
    { date: '12-06-2025', reporter: '@amonk_', type: 'Post', reason: 'Inappropriate', status: 'Resolved', action: 'Removed' }
];

export default function ComplianceTab() {
    const [activeTab, setActiveTab] = useState<'Verification' | 'Restrictions' | 'Reports'>('Verification');
    const [restrictionStates, setRestrictionStates] = useState(restrictions);

    return (
        <div className="flex flex-col w-full bg-surface-secondary rounded-b-[36px] p-6 gap-6">
            <div className="flex flex-col gap-2">
                {/* Toggle Tabs */}
                <div className="flex items-center p-1 gap-[3px] w-[295px] bg-surface-secondary border border-border-primary rounded-lg">
                    <button
                        onClick={() => setActiveTab('Verification')}
                        className={cn(
                            "flex items-center justify-center px-4 py-[7px] rounded-md font-sans text-body-sm transition-all w-[99px] h-[30px]",
                            activeTab === 'Verification'
                                ? "bg-white text-text-primary shadow-tab-soft"
                                : "bg-surface-secondary text-text-tertiary"
                        )}
                    >
                        Verification
                    </button>
                    <button
                        onClick={() => setActiveTab('Restrictions')}
                        className={cn(
                            "flex items-center justify-center px-4 py-[7px] rounded-md font-sans text-body-sm transition-all w-[103px] h-[30px]",
                            activeTab === 'Restrictions'
                                ? "bg-white text-text-primary shadow-tab-soft"
                                : "bg-surface-secondary text-text-tertiary"
                        )}
                    >
                        Restrictions
                    </button>
                    <button
                        onClick={() => setActiveTab('Reports')}
                        className={cn(
                            "flex items-center justify-center px-4 py-[7px] rounded-md font-sans text-body-sm transition-all w-[79px] h-[30px]",
                            activeTab === 'Reports'
                                ? "bg-white text-text-primary shadow-tab-soft"
                                : "bg-surface-secondary text-text-tertiary"
                        )}
                    >
                        Reports
                    </button>
                </div>

                {/* Content */}
                {activeTab === 'Verification' && (
                    <div className="flex flex-col p-1 gap-1 rounded-xl">
                        {/* Personal Info Section */}
                        <div className="flex flex-col p-4 gap-4 bg-white border border-border-primary rounded-lg">
                            <h3 className="font-sans text-heading-sm text-text-primary">
                                Personal Info
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {personalInfo.map((info, index) => (
                                    <div
                                        key={index}
                                        className="flex flex-col justify-center p-4 gap-[6px] w-[259px] bg-surface-secondary border border-border-primary rounded-lg"
                                    >
                                        <div className="flex items-center justify-between gap-1">
                                            <span className="font-sans font-normal text-[13px] leading-[16px] text-text-secondary">
                                                {info.label}
                                            </span>
                                            {info.status === 'verified' ? (
                                                <div className="flex items-center justify-center gap-0.5 px-[6px] py-[2px] pl-[3px] bg-surface-success rounded h-[16px]">
                                                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <circle cx="5" cy="5" r="4" stroke="#239B73" strokeWidth="1"/>
                                                        <path d="M3.5 5L4.5 6L6.5 4" stroke="#239B73" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                    <span className="font-sans text-caption-sm text-text-success">
                                                        Verified
                                                    </span>
                                                </div>
                                            ) : (
                                                <div className="flex items-center justify-center gap-0.5 px-[6px] py-[2px] pl-[3px] bg-surface-warning rounded h-[16px]">
                                                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <circle cx="5" cy="5" r="4" stroke="#FB6A00" strokeWidth="1"/>
                                                        <path d="M5 3V5.5" stroke="#FB6A00" strokeWidth="1" strokeLinecap="round"/>
                                                        <circle cx="5" cy="7" r="0.5" fill="#FB6A00"/>
                                                    </svg>
                                                    <span className="font-sans text-caption-sm text-text-warning">
                                                        Pending
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                        <span className="font-sans text-body-sm text-text-primary">
                                            {info.value}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Documents Section */}
                        <div className="flex flex-col p-4 gap-4 bg-white border border-border-primary rounded-lg">
                            <h3 className="font-sans text-heading-sm text-text-primary">
                                Documents
                            </h3>
                            <div className="flex items-center gap-2">
                                {documents.map((doc, index) => (
                                    <div
                                        key={index}
                                        className="flex flex-col w-[210px] min-w-[200px] border border-border-secondary rounded-lg overflow-hidden"
                                    >
                                        {/* Document Preview */}
                                        <div
                                            className="relative w-full h-[109px] bg-cover bg-center p-2"
                                            style={{
                                                backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05)), url(${doc.image})`
                                            }}
                                        >
                                            {doc.verified && (
                                                <div className="flex items-center justify-center gap-0.5 px-2 py-1 pl-1 bg-white rounded-full w-fit">
                                                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <circle cx="6.5" cy="6.5" r="5.5" stroke="#239B73" strokeWidth="1"/>
                                                        <path d="M4.5 6.5L6 8L8.5 5.5" stroke="#239B73" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                    <span className="font-sans text-caption-sm text-text-success">
                                                        Verified
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Document Info */}
                                        <div className="flex items-center p-3 gap-2 bg-white border-t border-border-secondary">
                                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M10.5 2.25H5.25C4.85218 2.25 4.47064 2.40804 4.18934 2.68934C3.90804 2.97064 3.75 3.35218 3.75 3.75V14.25C3.75 14.6478 3.90804 15.0294 4.18934 15.3107C4.47064 15.592 4.85218 15.75 5.25 15.75H12.75C13.1478 15.75 13.5294 15.592 13.8107 15.3107C14.092 15.0294 14.25 14.6478 14.25 14.25V6L10.5 2.25Z" stroke="#17181C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                <path d="M10.5 2.25V6H14.25M11.25 10.5H6.75M11.25 13.5H6.75M8.25 7.5H6.75" stroke="#17181C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                            <div className="flex flex-col flex-1">
                                                <span className="font-sans font-medium text-[13px] leading-[16px] text-[#17181C]">
                                                    {doc.name}
                                                </span>
                                                <div className="flex items-center gap-1">
                                                    <span className="font-sans text-caption-sm-regular text-[#999999]">
                                                        {doc.type}
                                                    </span>
                                                    <div className="w-[2.24px] h-[2.24px] rounded-full bg-[#676767]" />
                                                    <span className="font-sans text-caption-sm-regular text-[#999999]">
                                                        {doc.date}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'Restrictions' && (
                    <div className="flex flex-col px-4 py-[6px] gap-4 bg-white border border-border-primary rounded-lg">
                        {restrictionStates.map((restriction, index) => (
                            <div
                                key={index}
                                className={cn(
                                    "flex items-center justify-center py-3 gap-6",
                                    index !== restrictionStates.length - 1 && "border-b border-border-primary"
                                )}
                            >
                                <span className="flex-1 font-sans text-body-md text-text-primary">
                                    {restriction.label}
                                </span>
                                <button
                                    onClick={() => {
                                        const newStates = [...restrictionStates];
                                        newStates[index].enabled = !newStates[index].enabled;
                                        setRestrictionStates(newStates);
                                    }}
                                    className={cn(
                                        "relative flex items-center w-8 h-5 rounded-full p-0.5 transition-colors",
                                        restriction.enabled ? "bg-[#34C759] justify-end" : "bg-[#BCBCBC] justify-start"
                                    )}
                                >
                                    <div className="w-4 h-4 bg-white rounded-full shadow-toggle-knob" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'Reports' && (
                    <div className="flex gap-2">
                        {/* Reports Table */}
                        <div className="flex-1 flex flex-col p-1 gap-1 bg-surface-secondary rounded-xl">
                            {/* Table Header */}
                            <div className="flex items-center px-4 py-2 gap-4">
                                <span className="w-[85px] font-sans text-body-sm text-text-secondary">Date</span>
                                <span className="flex-1 font-sans text-body-sm text-text-secondary">Reporter</span>
                                <span className="w-[72px] font-sans text-body-sm text-text-secondary">Type</span>
                                <span className="w-[169px] font-sans text-body-sm text-text-secondary">Reason</span>
                                <span className="w-[76px] font-sans text-body-sm text-text-secondary">Status</span>
                                <span className="w-[78px] font-sans text-body-sm text-text-secondary">Action Taken</span>
                            </div>

                            {/* Table Body */}
                            <div className="bg-white border border-border-primary rounded-lg overflow-hidden">
                                {reports.map((report, index) => (
                                    <div
                                        key={index}
                                        className={cn(
                                            "flex items-center px-4 py-3 gap-4 bg-white",
                                            index !== reports.length - 1 && "border-b border-border-primary"
                                        )}
                                    >
                                        <span className="w-[85px] font-sans text-body-sm text-text-primary">
                                            {report.date}
                                        </span>
                                        <span className="flex-1 font-sans text-body-sm text-text-primary">
                                            {report.reporter}
                                        </span>
                                        <span className="w-[72px] font-sans text-body-sm text-text-primary">
                                            {report.type}
                                        </span>
                                        <span className="w-[169px] font-sans text-body-sm text-text-primary">
                                            {report.reason}
                                        </span>
                                        <div className="w-[76px]">
                                            {report.status === 'Resolved' ? (
                                                <div className="flex items-center justify-center gap-0.5 px-[6px] py-[1px] pl-[3px] bg-surface-success rounded h-[14px] w-fit">
                                                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <circle cx="5" cy="5" r="4" stroke="#239B73" strokeWidth="1"/>
                                                        <path d="M3.5 5L4.5 6L6.5 4" stroke="#239B73" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                    <span className="font-sans text-caption-sm text-text-success">
                                                        Resolved
                                                    </span>
                                                </div>
                                            ) : (
                                                <div className="flex items-center justify-center gap-0.5 px-[6px] py-[1px] pl-[3px] bg-surface-warning rounded h-[14px] w-fit">
                                                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <circle cx="5" cy="5" r="4" stroke="#FB6A00" strokeWidth="1"/>
                                                        <path d="M5 3V5.5" stroke="#FB6A00" strokeWidth="1" strokeLinecap="round"/>
                                                        <circle cx="5" cy="7" r="0.5" fill="#FB6A00"/>
                                                    </svg>
                                                    <span className="font-sans text-caption-sm text-text-warning">
                                                        Pending
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                        <span className="w-[78px] font-sans text-body-sm text-text-primary">
                                            {report.action}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="w-px bg-[#EBEBEB]" />

                        {/* Report Trends */}
                        <div className="flex flex-col p-1 gap-1 w-[256px]">
                            <h3 className="font-sans text-heading-sm text-text-primary py-2">
                                Report Trends
                            </h3>
                            <div className="flex flex-col items-center p-6 gap-4 bg-white border border-border-primary rounded-lg flex-1 justify-center">
                                {/* Pie Chart */}
                                <div className="relative w-[170px] h-[170px]">
                                    <svg width="170" height="170" viewBox="0 0 170 170">
                                        {/* Spam - 50% (Red) - Right half */}
                                        <path
                                            d="M 85,85 L 85,0 A 85,85 0 0,1 170,85 A 85,85 0 0,1 85,170 Z"
                                            fill="#FF9A9A"
                                            stroke="#FFFFFF"
                                            strokeWidth="3"
                                        />
                                        {/* Profanity - 30% (Purple) - Bottom left, 108° */}
                                        <path
                                            d="M 85,85 L 85,170 A 85,85 0 0,1 11.3,114.5 Z"
                                            fill="#9DAAFF"
                                            stroke="#FFFFFF"
                                            strokeWidth="3"
                                        />
                                        {/* Harassment - 20% (Blue) - Top left, 72° */}
                                        <path
                                            d="M 85,85 L 11.3,114.5 A 85,85 0 0,1 85,0 Z"
                                            fill="#9AC3FF"
                                            stroke="#FFFFFF"
                                            strokeWidth="3"
                                        />
                                    </svg>
                                    {/* Center white circle */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-[40px] h-[40px] bg-white rounded-full" />
                                    </div>
                                </div>

                                {/* Legend */}
                                <div className="flex flex-col gap-3 w-full">
                                    <div className="flex items-center gap-1">
                                        <div className="w-3 h-3 bg-[#FF9A9A] rounded" />
                                        <div className="flex items-center gap-[5px]">
                                            <span className="font-sans text-caption-lg-regular text-black">Spam</span>
                                            <span className="font-sans text-caption-lg-regular text-black/40">50%</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <div className="w-3 h-3 bg-[#9DAAFF] rounded" />
                                        <div className="flex items-center gap-[5px]">
                                            <span className="font-sans text-caption-lg-regular text-black">Profanity</span>
                                            <span className="font-sans text-caption-lg-regular text-black/40">30%</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <div className="w-3 h-3 bg-[#9AC3FF] rounded" />
                                        <div className="flex items-center gap-[5px]">
                                            <span className="font-sans text-caption-lg-regular text-black">Harassment</span>
                                            <span className="font-sans text-caption-lg-regular text-black/40">20%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
