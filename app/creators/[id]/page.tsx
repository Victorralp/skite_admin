'use client';

import { allCreators, Creator } from '@/data/dashboard';
import { notFound, useRouter } from 'next/navigation';
import {
    ArrowLeft,
    MoreHorizontal,
    CheckCircle2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEffect, useState, useRef } from 'react';
import { useClickOutside } from '@/lib/hooks';
import CustomDropdown from '@/components/ui/CustomDropdown';
import ActionMenu from '@/components/ActionMenu';
import PersonalInfo from '@/components/creator/PersonalInfo';
import LiveSessionCard from '@/components/creator/LiveSessionCard';
import ReferredUsersCard from '@/components/creator/ReferredUsersCard';
import ReviewsList from '@/components/creator/ReviewsList';
import ProductsTab from '@/components/creator/ProductsTab';
import HubsTab from '@/components/creator/HubsTab';
import ClassesTab from '@/components/creator/ClassesTab';
import TransactionsTab from '@/components/creator/TransactionsTab';
import ComplianceTab from '@/components/creator/ComplianceTab';
import UsersPieChart from '@/components/creator/UsersPieChart';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import PageContainer from '@/components/layout/PageContainer';
import TwoPaneLayout from '@/components/layout/TwoPaneLayout';

// Mock revenue data (similar to RevenueTrend but for a creator)
const revenueData = [
    { day: '1', revenue: 200000 },
    { day: '3', revenue: 400000 },
    { day: '5', revenue: 300000 },
    { day: '7', revenue: 500000 },
    { day: '9', revenue: 450000 },
    { day: '11', revenue: 600000 },
    { day: '13', revenue: 550000 },
    { day: '15', revenue: 700000 },
    { day: '17', revenue: 600000 },
    { day: '19', revenue: 800000 },
    { day: '21', revenue: 750000 },
    { day: '23', revenue: 900000 },
    { day: '25', revenue: 850000 },
    { day: '27', revenue: 950000 },
    { day: '30', revenue: 1000000 }
];

const StatItem = ({ label, value }: { label: string, value: string | number }) => (
    <div className="flex flex-1 flex-col items-center gap-2 py-0">
        <span className="font-sans text-caption-sm text-center text-text-tertiary flex-none">{label}</span>
        <span className="self-stretch font-sans text-body-sm text-center text-text-primary">{value}</span>
    </div>
);

const TabButton = ({ active, label, onClick }: { active: boolean, label: string, onClick: () => void }) => (
    <button
        onClick={onClick}
        className={cn(
            "group relative flex h-10 w-full flex-col items-center gap-3 rounded-t-2xl pt-2.5 font-sans transition-colors",
            active
                ? "bg-surface-secondary"
                : "bg-transparent"
        )}
    >
        <span
            className={cn(
                "font-sans text-body-sm",
                active ? "text-text-primary" : "text-text-tertiary group-hover:text-text-brand"
            )}
        >
            {label}
        </span>
        <div className={cn(
            "h-0 w-full",
            active ? "border-b-[2px] border-border-brand" : "border-b-[1px] border-border-primary"
        )} />
    </button>
);

export default function CreatorDetailsPage({ params }: { params: any }) {
    const router = useRouter();
    const [creator, setCreator] = useState<Creator | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('Overview');
    const [showActionMenu, setShowActionMenu] = useState(false);
    const actionMenuRef = useRef<HTMLDivElement>(null);

    // Close action menu when clicking outside
    useClickOutside(actionMenuRef, () => {
        setShowActionMenu(false);
    });

    useEffect(() => {
        // Handle params asynchronously if needed, or directly
        // params is likely an object here in Next.js 14
        const id = params?.id;
        const found = allCreators.find(c => c.id === id);
        setCreator(found || null);
        setLoading(false);
    }, [params]);

    if (loading) return <div className="p-16 text-center text-gray-500">Loading...</div>;
    if (!creator) return notFound();

    return (
        <PageContainer>
            {/* Header Section */}
            <div className="flex flex-col gap-6">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-1.5 px-2 py-1.5 bg-surface rounded-md text-text-main hover:bg-muted w-fit transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span className="text-body-md font-sans">Go back</span>
                </button>

                <h1 className="text-heading-lg-bold text-text-main font-sans">Creator Details</h1>

                <div className="flex flex-col gap-[12px]">
                    {/* Top Row: Avatar + Info + Actions */}
                    <div className="flex flex-col gap-3 md:flex-row md:items-center">
                        {/* Avatar */}
                        <img
                            src={creator.avatar}
                            alt={creator.name}
                            className="h-[62px] w-[62px] rounded-full border border-border-primary object-cover"
                        />

                        {/* Text Column */}
                        <div className="flex flex-1 flex-col justify-between gap-1">
                            {/* Status Badge */}
                            {creator.status === 'Active' && (
                                <div className="flex items-center justify-center gap-[2px] pr-[6px] pl-[3px] py-[1px] bg-surface-success border border-white rounded-[4px] min-w-[49px] h-[14px] w-fit">
                                    <CheckCircle2 className="w-[10px] h-[10px] text-text-success" />
                                    <span className="text-caption-sm text-text-success font-sans">Active</span>
                                </div>
                            )}

                            {/* Name Row */}
                            <div className="flex items-center gap-1">
                                <h2 className="text-body-lg text-text-primary font-sans underline decoration-1 underline-offset-2">{creator.name}</h2>
                                <a href="#" className="flex h-[14px] w-[14px] items-center justify-center">
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12.2447 1.75525L1.75049 12.25M11.6263 11.0361C11.1678 10.5776 10.9362 9.4395 10.8202 8.40525C10.6697 7.07408 10.7274 5.72192 11.0424 4.41875C11.2781 3.44283 11.6584 2.352 12.2499 1.7605M2.96382 2.37417C3.42232 2.83208 4.5604 3.06367 5.59466 3.17975C6.92582 3.33025 8.27799 3.2725 9.58116 2.9575C10.5571 2.72183 11.6479 2.3415 12.2394 1.75" stroke="#121212" />
                                    </svg>
                                </a>
                            </div>

                            {/* Username */}
                            <span className="text-[13.5px] leading-[16px] font-normal text-text-secondary font-sans">{creator.username}</span>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 md:ml-auto">
                            <button
                                onClick={() => console.log('Email')}
                                className="box-border flex h-8 items-center justify-center gap-1 rounded-[9px] border border-border-primary bg-white px-4 py-2 text-body-sm text-[#353A44] shadow-button-inset transition-colors hover:bg-gray-50"
                            >
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-none">
                                    <path d="M1.5 3.5C1.5 3.23478 1.60536 2.98043 1.79289 2.79289C1.98043 2.60536 2.23478 2.5 2.5 2.5H9.5C9.76522 2.5 10.0196 2.60536 10.2071 2.79289C10.3946 2.98043 10.5 3.23478 10.5 3.5V8.5C10.5 8.76522 10.3946 9.01957 10.2071 9.20711C10.0196 9.39464 9.76522 9.5 9.5 9.5H2.5C2.23478 9.5 1.98043 9.39464 1.79289 9.20711C1.60536 9.01957 1.5 8.76522 1.5 8.5V3.5Z" stroke="#17181C" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M1.5 3.5L6 6.5L10.5 3.5" stroke="#5F5971" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span className="whitespace-nowrap font-sans text-body-sm text-[#353A44]">Send email</span>
                            </button>

                            <div className="relative" ref={actionMenuRef}>
                                <button
                                    onClick={() => setShowActionMenu(!showActionMenu)}
                                    className="flex h-8 w-8 items-center justify-center rounded-[9px] border border-border-primary bg-white shadow-button-inset transition-colors hover:bg-gray-50"
                                >
                                    <MoreHorizontal className="w-[20px] h-[20px] text-[#121212]" />
                                </button>
                                {showActionMenu && (
                                    <ActionMenu
                                        showViewOption={false}
                                        status={creator.status}
                                        onView={() => { }}
                                        onMessage={() => setShowActionMenu(false)}
                                        onSuspend={() => setShowActionMenu(false)}
                                    />
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Pills Row */}
                    <div className="flex flex-wrap items-center gap-1.5">
                        <div className="flex h-7 items-center justify-center gap-1 rounded-full bg-surface-secondary px-2.5 py-1.5">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-none">
                                <path fillRule="evenodd" clipRule="evenodd" d="M6.39515 2.13339C6.28993 2.22783 6.17977 2.31662 6.06515 2.39939C5.86648 2.53273 5.64315 2.62473 5.40848 2.67139C5.30648 2.69139 5.19982 2.70006 4.98715 2.71673C4.45315 2.75939 4.18582 2.78073 3.96315 2.85939C3.70848 2.94916 3.47717 3.09487 3.28623 3.28581C3.09529 3.47674 2.94958 3.70806 2.85982 3.96273C2.78115 4.18539 2.75982 4.45273 2.71715 4.98673C2.7095 5.12787 2.69436 5.26852 2.67182 5.40806C2.62515 5.64273 2.53315 5.86606 2.39982 6.06473C2.34182 6.15139 2.27248 6.23273 2.13382 6.39473C1.78648 6.80273 1.61248 7.00673 1.51048 7.22006C1.27515 7.71339 1.27515 8.28673 1.51048 8.78006C1.61248 8.99339 1.78648 9.19739 2.13382 9.60539C2.27248 9.76739 2.34182 9.84873 2.39982 9.93539C2.53315 10.1341 2.62515 10.3574 2.67182 10.5921C2.69182 10.6941 2.70048 10.8007 2.71715 11.0134C2.75982 11.5474 2.78115 11.8147 2.85982 12.0374C2.94958 12.2921 3.09529 12.5234 3.28623 12.7143C3.47717 12.9053 3.70848 13.051 3.96315 13.1407C4.18582 13.2194 4.45315 13.2407 4.98715 13.2834C5.19982 13.3001 5.30648 13.3087 5.40848 13.3287C5.64315 13.3754 5.86648 13.4681 6.06515 13.6007C6.15182 13.6587 6.23315 13.7281 6.39515 13.8667C6.80315 14.2141 7.00715 14.3881 7.22048 14.4901C7.71382 14.7254 8.28715 14.7254 8.78048 14.4901C8.99382 14.3881 9.19782 14.2141 9.60582 13.8667C9.76782 13.7281 9.84915 13.6587 9.93582 13.6007C10.1345 13.4674 10.3578 13.3754 10.5925 13.3287C10.6945 13.3087 10.8012 13.3001 11.0138 13.2834C11.5478 13.2407 11.8152 13.2194 12.0378 13.1407C12.2925 13.051 12.5238 12.9053 12.7147 12.7143C12.9057 12.5234 13.0514 12.2921 13.1412 12.0374C13.2198 11.8147 13.2412 11.5474 13.2838 11.0134C13.3005 10.8007 13.3092 10.6941 13.3292 10.5921C13.3758 10.3574 13.4685 10.1341 13.6012 9.93539C13.6592 9.84873 13.7285 9.76739 13.8672 9.60539C14.2145 9.19739 14.3885 8.99339 14.4905 8.78006C14.7258 8.28673 14.7258 7.71339 14.4905 7.22006C14.3885 7.00673 14.2145 6.80273 13.8672 6.39473C13.7727 6.28951 13.6839 6.17935 13.6012 6.06473C13.4677 5.86609 13.3753 5.64285 13.3292 5.40806C13.3066 5.26852 13.2915 5.12787 13.2838 4.98673C13.2412 4.45273 13.2198 4.18539 13.1412 3.96273C13.0514 3.70806 12.9057 3.47674 12.7147 3.28581C12.5238 3.09487 12.2925 2.94916 12.0378 2.85939C11.8152 2.78073 11.5478 2.75939 11.0138 2.71673C10.8727 2.70907 10.732 2.69394 10.5925 2.67139C10.3577 2.62527 10.1345 2.5328 9.93582 2.39939C9.82119 2.31662 9.71104 2.22783 9.60582 2.13339C9.19782 1.78606 8.99382 1.61206 8.78048 1.51006C8.53698 1.39351 8.27045 1.33301 8.00048 1.33301C7.73052 1.33301 7.46399 1.39351 7.22048 1.51006C7.00715 1.61206 6.80315 1.78606 6.39515 2.13339ZM10.9158 6.57539C11.01 6.47227 11.0609 6.33678 11.0577 6.19712C11.0546 6.05747 10.9977 5.92441 10.8989 5.82563C10.8001 5.72686 10.6671 5.66997 10.5274 5.66683C10.3878 5.66368 10.2523 5.7145 10.1492 5.80873L6.91582 9.04206L5.85182 7.97873C5.74869 7.8845 5.6132 7.83368 5.47355 7.83683C5.33389 7.83997 5.20083 7.89686 5.10206 7.99563C5.00328 8.09441 4.9464 8.22747 4.94325 8.36712C4.9401 8.50678 4.99093 8.64227 5.08515 8.74539L6.53182 10.1921C6.63356 10.2936 6.77142 10.3506 6.91515 10.3506C7.05888 10.3506 7.19675 10.2936 7.29848 10.1921L10.9158 6.57539Z" fill="#5F2EFC" />
                            </svg>
                            <span className="whitespace-nowrap font-sans text-body-sm-regular text-text-primary">Verified</span>
                        </div>
                        <div className="flex h-7 items-center justify-center gap-1 rounded-full bg-surface-secondary px-2.5 py-1.5">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-none">
                                <path fillRule="evenodd" clipRule="evenodd" d="M4.04006 3.2399C5.09032 2.18964 6.51477 1.59961 8.00006 1.59961C9.48535 1.59961 10.9098 2.18964 11.9601 3.2399C13.0103 4.29015 13.6003 5.71461 13.6003 7.1999C13.6003 8.68518 13.0103 10.1096 11.9601 11.1599L8.00006 15.1199L4.04006 11.1599C3.51999 10.6399 3.10745 10.0225 2.82599 9.34305C2.54453 8.66359 2.39966 7.93535 2.39966 7.1999C2.39966 6.46444 2.54453 5.7362 2.82599 5.05674C3.10745 4.37728 3.51999 3.75991 4.04006 3.2399ZM8.00006 8.79989C8.42441 8.79989 8.83138 8.63132 9.13143 8.33127C9.43149 8.03121 9.60006 7.62424 9.60006 7.1999C9.60006 6.77555 9.43149 6.36858 9.13143 6.06852C8.83138 5.76847 8.42441 5.5999 8.00006 5.5999C7.57572 5.5999 7.16875 5.76847 6.86869 6.06852C6.56863 6.36858 6.40006 6.77555 6.40006 7.1999C6.40006 7.62424 6.56863 8.03121 6.86869 8.33127C7.16875 8.63132 7.57572 8.79989 8.00006 8.79989Z" fill="#5F2EFC" />
                            </svg>
                            <span className="whitespace-nowrap font-sans text-body-sm-regular text-text-primary">{creator.location || 'Toronto, Canada'}</span>
                        </div>
                        <div className="flex h-7 items-center justify-center gap-1 rounded-full bg-surface-secondary px-2.5 py-1.5">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-none">
                                <path fillRule="evenodd" clipRule="evenodd" d="M8 14.6667C11.6819 14.6667 14.6667 11.6819 14.6667 8C14.6667 4.3181 11.6819 1.33333 8 1.33333C4.3181 1.33333 1.33333 4.3181 1.33333 8C1.33333 11.6819 4.3181 14.6667 8 14.6667ZM8.66667 4.66667C8.66667 4.29848 8.36819 4 8 4C7.63181 4 7.33333 4.29848 7.33333 4.66667V8C7.33333 8.36819 7.63181 8.66667 8 8.66667H10.6667C11.0349 8.66667 11.3333 8.36819 11.3333 8C11.3333 7.63181 11.0349 7.33333 10.6667 7.33333H8.66667V4.66667Z" fill="#5F2EFC" />
                            </svg>
                            <span className="whitespace-nowrap font-sans text-body-sm-regular text-text-primary">3 years</span>
                        </div>
                    </div>
                </div>


                {/* Stats Row */}
                <div className="box-border grid grid-cols-2 md:grid-cols-5 gap-4 p-4 w-full bg-surface-secondary border border-border-primary rounded-[8px] mt-3">
                    <StatItem label="Revenue" value={creator.revenue} />
                    <StatItem label="Transactions" value={creator.salesCount.toLocaleString()} />
                    <StatItem label="Active Products" value={creator.products} />
                    <StatItem label="Subscribers" value={creator.subscribers.toLocaleString()} />
                    <StatItem label="Live" value="24" />
                </div>
            </div>

            {/* Tabs & Content Wrapper */}
            <div className="flex flex-col w-full items-center">
                {/* Tabs */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 w-full mt-3">
                    {['Overview', 'Products', 'Hubs', 'Classes', 'Transactions', 'Compliance'].map((tab) => (
                        <TabButton
                            key={tab}
                            active={activeTab === tab}
                            label={tab}
                            onClick={() => setActiveTab(tab)}
                        />
                    ))}
                </div>

                {/* Main Content - Overview Tab */}
                {activeTab === 'Overview' && (
                    <div className="flex flex-col w-full bg-surface-secondary rounded-b-[36px] p-6 gap-6">

                        {/* Row 1: Revenue & Users Pie Chart */}
                        <TwoPaneLayout
                            mainMin="1fr"
                            sideWidth="355px"
                            gap="16px"
                            className="items-stretch"
                        >
                            {/* Revenue Chart Section */}
                            <div className="flex w-full flex-col gap-2 lg:flex-1">
                                <div className="flex w-full items-center gap-2.5">
                                    <h3 className="flex-1 font-sans text-heading-sm text-text-primary">Revenue</h3>
                                    <CustomDropdown options={['All Time', 'This Year', 'This Month']} defaultLabel="All Time" width="78px" menuWidth="100px" />
                                </div>
                                <div className="flex min-h-[271px] w-full flex-col gap-1 rounded-xl border border-border-primary bg-white p-4">
                                    <div className="flex h-[221px] items-start gap-4">
                                        <div className="flex h-full w-6 flex-col items-end justify-between text-caption-lg-regular text-text-tertiary">
                                            <span>₦4M</span>
                                            <span>₦2M</span>
                                            <span>0</span>
                                        </div>

                                        <div className="relative h-full flex-1">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <AreaChart data={revenueData}>
                                                    <defs>
                                                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                                            <stop offset="0%" stopColor="rgba(71, 166, 99, 0.052)" />
                                                            <stop offset="100%" stopColor="rgba(71, 166, 99, 0)" />
                                                        </linearGradient>
                                                    </defs>
                                                    <CartesianGrid
                                                        strokeDasharray="1 1"
                                                        vertical={false}
                                                        stroke="#D9D9D9"
                                                        opacity={0.1}
                                                    />
                                                    <XAxis
                                                        dataKey="day"
                                                        axisLine={false}
                                                        tickLine={false}
                                                        tick={false}
                                                    />
                                                    <YAxis hide />
                                                    <Tooltip
                                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0px 4px 20px rgba(0,0,0,0.08)' }}
                                                        cursor={{ stroke: '#47A663', strokeWidth: 1, strokeDasharray: '3 3' }}
                                                    />
                                                    <Area
                                                        type="monotone"
                                                        dataKey="revenue"
                                                        stroke="#47A663"
                                                        strokeWidth={2}
                                                        fillOpacity={1}
                                                        fill="url(#colorRevenue)"
                                                    />
                                                </AreaChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </div>

                                    <div className="flex items-start justify-between pl-10 pr-2 text-caption-lg-regular text-text-tertiary">
                                        <span>1</span>
                                        <span>15</span>
                                        <span>30</span>
                                    </div>
                                </div>
                            </div>

                            {/* Users Pie Chart Section */}
                            <div className="flex min-h-[309px] w-full items-start">
                                <div className="flex w-full flex-col gap-2">
                                    <div className="flex w-full items-center gap-2.5">
                                        <h3 className="font-sans text-heading-sm text-text-primary flex-1">Referred Users</h3>
                                        <CustomDropdown options={['All Time', 'This Year', 'This Month']} defaultLabel="All Time" width="78px" menuWidth="100px" />
                                    </div>
                                    <UsersPieChart />
                                </div>
                            </div>
                        </TwoPaneLayout>

                        {/* Row 2: Live Session & Personal Info */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
                            {/* Live Session Card */}
                            <div className="w-full">
                                <LiveSessionCard />
                            </div>

                            {/* Personal Info Card */}
                            <div className="w-full">
                                <PersonalInfo creator={{
                                    firstName: creator.name.split(' ')[0],
                                    lastName: creator.name.split(' ').slice(1).join(' '),
                                    username: creator.username,
                                    email: creator.email,
                                    dob: creator.dob,
                                    gender: creator.gender,
                                    location: creator.location,
                                    joinDate: creator.joinedDate
                                }} />
                            </div>
                        </div>

                        {/* Row 3: Reviews Section */}
                        <div className="w-full">
                            <ReviewsList />
                        </div>
                    </div>
                )}


                {/* Main Content - Products Tab */}
                {activeTab === 'Products' && (
                    <div className="w-full">
                        <ProductsTab />
                    </div>
                )}
                {/* Main Content - Hubs Tab */}
                {activeTab === 'Hubs' && (
                    <div className="w-full">
                        <HubsTab />
                    </div>
                )}
                {/* Main Content - Classes Tab */}
                {activeTab === 'Classes' && (
                    <div className="w-full">
                        <ClassesTab />
                    </div>
                )}
                {/* Main Content - Transactions Tab */}
                {activeTab === 'Transactions' && (
                    <div className="w-full">
                        <TransactionsTab />
                    </div>
                )}
                {/* Main Content - Compliance Tab */}
                {activeTab === 'Compliance' && (
                    <div className="w-full">
                        <ComplianceTab />
                    </div>
                )}
            </div>
        </PageContainer>
    );
}
