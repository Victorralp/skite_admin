import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';
import DataTableShell from '@/components/layout/DataTableShell';

export default function ClassesTab() {
    return (
        <div className="flex flex-col w-full bg-surface-secondary rounded-b-[36px] p-6 gap-6">


            {/* Metrics Section */}
            <div className="flex flex-col gap-2 w-full">
                <div className="flex w-full items-center justify-between">
                    <h3 className="font-sans text-heading-sm text-text-primary">
                        Metrics
                    </h3>
                    <div className="flex h-8 cursor-pointer items-center gap-2 rounded-lg border border-border-primary bg-white px-[10px] py-[5px] shadow-button-soft">
                        <span className="font-sans text-caption-lg-regular text-text-secondary">
                            Last 30 days
                        </span>
                        <ChevronDown className="w-4 h-4 text-[#DBD8E4]" />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-2 w-full">
                    {/* Live Sessions */}
                    <div className="flex min-h-[96px] flex-col gap-3 rounded-lg border border-border-primary bg-white p-4">
                        <div className="flex flex-col gap-1">
                            <span className="font-sans text-caption-lg-regular text-text-secondary">
                                Live Sessions
                            </span>
                            <span className="font-sans text-heading-md text-text-primary">
                                12
                            </span>
                        </div>
                        <span className="font-sans text-caption-sm-regular text-text-success">
                            Turnout 74%
                        </span>
                    </div>

                    {/* 1-1 Calls */}
                    <div className="flex min-h-[96px] flex-col gap-3 rounded-lg border border-border-primary bg-white p-4">
                        <div className="flex flex-col gap-1">
                            <span className="font-sans text-caption-lg-regular text-text-secondary">
                                1-1 Calls
                            </span>
                            <span className="font-sans text-heading-md text-text-primary">
                                4
                            </span>
                        </div>
                        <span className="font-sans text-caption-sm-regular text-text-success">
                            27 hours
                        </span>
                    </div>

                    {/* Revenue */}
                    <div className="flex min-h-[96px] flex-col gap-3 rounded-lg border border-border-primary bg-white p-4">
                        <div className="flex flex-col gap-1">
                            <span className="font-sans text-caption-lg-regular text-text-secondary">
                                Revenue
                            </span>
                            <span className="font-sans text-heading-md text-text-primary">
                                ₦4,567,890
                            </span>
                        </div>
                        <span className="font-sans text-caption-sm-regular text-text-success">
                            +₦43,052 today
                        </span>
                    </div>

                    {/* Total Hours */}
                    <div className="flex min-h-[96px] flex-col gap-3 rounded-lg border border-border-primary bg-white p-4">
                        <div className="flex flex-col gap-1">
                            <span className="font-sans text-caption-lg-regular text-text-secondary">
                                Total Hours
                            </span>
                            <span className="font-sans text-heading-md text-text-primary">
                                234 hours
                            </span>
                        </div>
                        <span className="font-sans text-caption-sm-regular text-text-success">
                            +8 today
                        </span>
                    </div>
                </div>
            </div>
            <div className="flex flex-col xl:flex-row gap-2 w-full">
                {/* Live Now */}
                <div className="flex-1 flex flex-col gap-2">
                    <h3 className="font-sans text-heading-sm text-text-primary">
                        Live Now
                    </h3>
                    <div className="p-1 bg-surface-secondary">
                        <div className="bg-white border border-border-primary rounded-xl overflow-hidden">
                            {/* Live Session Card */}
                            <div className="flex flex-col p-4 gap-4">
                                <div className="flex flex-col gap-3">
                                    <div className="relative h-[207px] w-full overflow-hidden rounded">
                                        <img
                                            src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=300&fit=crop"
                                            alt="Live class"
                                            className="h-full w-full object-cover"
                                        />
                                        <div className="absolute top-2 left-2 flex items-center gap-0.5 px-1.5 py-1 bg-white/70 rounded-full">
                                            <div className="w-[6.26px] h-[6.26px] rounded-full bg-[#CD110A]" />
                                            <span className="font-sans text-caption-lg text-text-danger">Live</span>
                                        </div>
                                    </div>
                                    <h4 className="font-sans text-heading-sm text-text-primary">
                                        Skit Production Masterclass
                                    </h4>
                                    <div className="flex flex-wrap items-center gap-1">
                                        <button className="flex h-7 items-center justify-center rounded-[9px] border border-border-primary bg-white px-4 py-2 font-sans text-body-sm text-[#353A44] shadow-button-inset">
                                            Monitor Session
                                        </button>
                                        <button className="flex h-7 items-center justify-center rounded-[9px] border border-border-primary bg-white px-4 py-2 font-sans text-body-sm text-[#353A44] shadow-button-inset">
                                            View Chat
                                        </button>
                                        <button className="flex h-7 items-center justify-center rounded-[9px] border border-[rgba(251,236,235,0.2)] bg-[#CD110A] px-4 py-2 font-sans text-body-sm text-white shadow-button-inset">
                                            End Session
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full h-px bg-[#EBEBEB]" />
                            <div className="flex items-center px-4 py-4 gap-1 bg-white">
                                <div className="flex-1 flex flex-col items-center gap-[5px]">
                                    <span className="font-sans text-caption-lg-regular text-text-secondary">Started</span>
                                    <span className="font-sans font-medium text-[15px] leading-[18px] text-text-primary">10:47 AM</span>
                                </div>
                                <div className="w-px h-[26px] bg-[#EBEBEB]" />
                                <div className="flex-1 flex flex-col items-center gap-[5px]">
                                    <span className="font-sans text-caption-lg-regular text-text-secondary">Participants</span>
                                    <span className="font-sans font-medium text-[15px] leading-[18px] text-text-primary">2</span>
                                </div>
                                <div className="w-px h-[26px] bg-[#EBEBEB]" />
                                <div className="flex-1 flex flex-col items-center gap-[5px]">
                                    <span className="font-sans text-caption-lg-regular text-text-secondary">Viewers</span>
                                    <span className="font-sans font-medium text-[15px] leading-[18px] text-text-primary">24</span>
                                </div>
                                <div className="w-px h-[26px] bg-[#EBEBEB]" />
                                <div className="flex-1 flex flex-col items-center gap-[5px]">
                                    <span className="font-sans text-caption-lg-regular text-text-secondary">Chat Messages</span>
                                    <span className="font-sans font-medium text-[15px] leading-[18px] text-text-primary">23</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Upcoming */}
                <div className="flex-1 flex flex-col gap-2">
                    <h3 className="font-sans text-heading-sm text-text-primary">
                        Upcoming
                    </h3>
                    <div className="p-1 bg-surface-secondary">
                        <div className="max-h-[379px] min-h-[320px] overflow-y-auto rounded-xl border border-border-primary bg-white p-4 no-scrollbar">
                            <div className="flex flex-col gap-1">
                                {[1, 2, 3, 4].map((item) => (
                                    <div key={item} className="flex flex-col p-4 gap-3 bg-white border border-border-primary rounded-lg">
                                        <div className="flex items-center gap-2">
                                            <div className="w-[34px] h-[34px] rounded bg-gray-200" />
                                            <h5 className="font-sans text-body-md text-text-primary">
                                                {item === 1 ? 'Skit Production Masterclass' : 'Live Editing Challenge'}
                                            </h5>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <div className="flex items-center gap-[5px] flex-1">
                                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M1.5 9C1.5 6.17175 1.5 4.75725 2.379 3.879C3.258 3.00075 4.67175 3 7.5 3H10.5C13.3282 3 14.7427 3 15.621 3.879C16.4992 4.758 16.5 6.17175 16.5 9V10.5C16.5 13.3282 16.5 14.7427 15.621 15.621C14.742 16.4992 13.3282 16.5 10.5 16.5H7.5C4.67175 16.5 3.25725 16.5 2.379 15.621C1.50075 14.742 1.5 13.3282 1.5 10.5V9Z" stroke="#5F5971" strokeWidth="1.5" />
                                                    <path d="M5.25 3V1.875M12.75 3V1.875M1.875 6.75H16.125" stroke="#5F5971" strokeWidth="1.5" strokeLinecap="round" />
                                                    <path d="M13.5 12.75C13.5 12.9489 13.421 13.1397 13.2803 13.2803C13.1397 13.421 12.9489 13.5 12.75 13.5C12.5511 13.5 12.3603 13.421 12.2197 13.2803C12.079 13.1397 12 12.9489 12 12.75C12 12.5511 12.079 12.3603 12.2197 12.2197C12.3603 12.079 12.5511 12 12.75 12C12.9489 12 13.1397 12.079 13.2803 12.2197C13.421 12.3603 13.5 12.5511 13.5 12.75ZM13.5 9.75C13.5 9.94891 13.421 10.1397 13.2803 10.2803C13.1397 10.421 12.9489 10.5 12.75 10.5C12.5511 10.5 12.3603 10.421 12.2197 10.2803C12.079 10.1397 12 9.94891 12 9.75C12 9.55109 12.079 9.36032 12.2197 9.21967C12.3603 9.07902 12.5511 9 12.75 9C12.9489 9 13.1397 9.07902 13.2803 9.21967C13.421 9.36032 13.5 9.55109 13.5 9.75ZM9.75 12.75C9.75 12.9489 9.67098 13.1397 9.53033 13.2803C9.38968 13.421 9.19891 13.5 9 13.5C8.80109 13.5 8.61032 13.421 8.46967 13.2803C8.32902 13.1397 8.25 12.9489 8.25 12.75C8.25 12.5511 8.32902 12.3603 8.46967 12.2197C8.61032 12.079 8.80109 12 9 12C9.19891 12 9.38968 12.079 9.53033 12.2197C9.67098 12.3603 9.75 12.5511 9.75 12.75ZM9.75 9.75C9.75 9.94891 9.67098 10.1397 9.53033 10.2803C9.38968 10.421 9.19891 10.5 9 10.5C8.80109 10.5 8.61032 10.421 8.46967 10.2803C8.32902 10.1397 8.25 9.94891 8.25 9.75C8.25 9.55109 8.32902 9.36032 8.46967 9.21967C8.61032 9.07902 8.80109 9 9 9C9.19891 9 9.38968 9.07902 9.53033 9.21967C9.67098 9.36032 9.75 9.55109 9.75 9.75ZM6 12.75C6 12.9489 5.92098 13.1397 5.78033 13.2803C5.63968 13.421 5.44891 13.5 5.25 13.5C5.05109 13.5 4.86032 13.421 4.71967 13.2803C4.57902 13.1397 4.5 12.9489 4.5 12.75C4.5 12.5511 4.57902 12.3603 4.71967 12.2197C4.86032 12.079 5.05109 12 5.25 12C5.44891 12 5.63968 12.079 5.78033 12.2197C5.92098 12.3603 6 12.5511 6 12.75ZM6 9.75C6 9.94891 5.92098 10.1397 5.78033 10.2803C5.63968 10.421 5.44891 10.5 5.25 10.5C5.05109 10.5 4.86032 10.421 4.71967 10.2803C4.57902 10.1397 4.5 9.94891 4.5 9.75C4.5 9.55109 4.57902 9.36032 4.71967 9.21967C4.86032 9.07902 5.05109 9 5.25 9C5.44891 9 5.63968 9.07902 5.78033 9.21967C5.92098 9.36032 6 9.55109 6 9.75Z" fill="#5F5971" />
                                                </svg>
                                                <span className="font-sans text-caption-lg text-text-secondary">Jan 10</span>
                                            </div>
                                            <div className="flex items-center gap-[5px] flex-1">
                                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M9 16.5C13.1421 16.5 16.5 13.1421 16.5 9C16.5 4.85786 13.1421 1.5 9 1.5C4.85786 1.5 1.5 4.85786 1.5 9C1.5 13.1421 4.85786 16.5 9 16.5Z" stroke="#5F5971" strokeWidth="1.5" />
                                                    <path d="M9 6V9L10.875 10.875" stroke="#5F5971" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                                <span className="font-sans text-caption-lg text-text-secondary">7PM</span>
                                            </div>
                                            {item === 1 ? (
                                                <div className="flex items-center gap-1 flex-1">
                                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <circle cx="9" cy="9" r="7.5" stroke="#5F5971" strokeWidth="1.5" />
                                                    </svg>
                                                    <span className="font-sans text-caption-lg text-text-secondary">30min</span>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-[5px] flex-1">
                                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M6.75 7.5C8.40685 7.5 9.75 6.15685 9.75 4.5C9.75 2.84315 8.40685 1.5 6.75 1.5C5.09315 1.5 3.75 2.84315 3.75 4.5C3.75 6.15685 5.09315 7.5 6.75 7.5Z" stroke="#5F5971" strokeWidth="1.5" />
                                                        <path d="M11.25 6.75C11.8467 6.75 12.419 6.51295 12.841 6.09099C13.2629 5.66903 13.5 5.09674 13.5 4.5C13.5 3.90326 13.2629 3.33097 12.841 2.90901C12.419 2.48705 11.8467 2.25 11.25 2.25" stroke="#5F5971" strokeWidth="1.5" strokeLinecap="round" />
                                                        <path d="M6.75 15.75C9.6495 15.75 12 14.4069 12 12.75C12 11.0931 9.6495 9.75 6.75 9.75C3.85051 9.75 1.5 11.0931 1.5 12.75C1.5 14.4069 3.85051 15.75 6.75 15.75Z" stroke="#5F5971" strokeWidth="1.5" />
                                                        <path d="M13.5 10.5C14.8155 10.7888 15.75 11.5193 15.75 12.375C15.75 13.1475 14.9895 13.8173 13.875 14.1525" stroke="#5F5971" strokeWidth="1.5" strokeLinecap="round" />
                                                    </svg>
                                                    <span className="font-sans text-caption-lg text-text-secondary">43</span>
                                                </div>
                                            )}
                                            <div className="flex items-center gap-[5px] flex-1">
                                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M6.75 14.25C4.64325 14.25 3.59025 14.25 2.8335 13.7445C2.50579 13.5256 2.22443 13.2442 2.0055 12.9165C1.5 12.1598 1.5 11.1075 1.5 9C1.5 6.8925 1.5 5.84025 2.0055 5.0835C2.22443 4.75579 2.50579 4.47443 2.8335 4.2555C3.59025 3.75 4.6425 3.75 6.75 3.75H11.25C13.3567 3.75 14.4097 3.75 15.1665 4.2555C15.4942 4.47443 15.7756 4.75579 15.9945 5.0835C16.5 5.84025 16.5 6.8925 16.5 9C16.5 11.1075 16.5 12.1598 15.9945 12.9165C15.7756 13.2442 15.4942 13.5256 15.1665 13.7445C14.4097 14.25 13.3575 14.25 11.25 14.25H6.75Z" stroke="#5F5971" strokeWidth="1.5" />
                                                    <path d="M6.75 6.75C6.15326 6.75 5.58097 6.98705 5.15901 7.40901C4.73705 7.83097 4.5 8.40326 4.5 9C4.5 9.59674 4.73705 10.169 5.15901 10.591C5.58097 11.0129 6.15326 11.25 6.75 11.25M11.25 6.75C11.8467 6.75 12.419 6.98705 12.841 7.40901C13.2629 7.83097 13.5 8.40326 13.5 9C13.5 9.59674 13.2629 10.169 12.841 10.591C12.419 11.0129 11.8467 11.25 11.25 11.25" stroke="#5F5971" strokeWidth="1.5" />
                                                    <path d="M6.75 3.75V13.875M11.25 3.75V13.875" stroke="#5F5971" strokeWidth="1.5" strokeLinecap="round" />
                                                </svg>
                                                <span className="font-sans text-caption-lg text-text-secondary">₦{item === 1 ? '5,000' : '3,000'}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Session History */}
            <div className="flex flex-col gap-2 w-full">
                <h3 className="font-sans text-heading-sm text-text-primary">
                    Session History
                </h3>
                <div className="rounded-xl bg-surface-secondary p-1">
                    <DataTableShell>
                        <div className="min-w-[760px]">
                            <div className="flex items-center gap-6 px-4 py-2">
                                <span className="basis-[18%] font-sans text-body-sm text-text-secondary">Date</span>
                                <span className="flex-1 font-sans text-body-sm text-text-secondary">Title</span>
                                <span className="basis-[16%] font-sans text-body-sm text-text-secondary">Duration</span>
                                <span className="basis-[14%] font-sans text-body-sm text-text-secondary">Viewers</span>
                                <span className="basis-[16%] font-sans text-body-sm text-text-secondary">Revenue</span>
                                <span className="basis-[12%] font-sans text-body-sm text-text-secondary">Status</span>
                            </div>
                            <div className="flex flex-col overflow-hidden rounded-lg border border-border-primary bg-white">
                                {[
                                    { date: '11/21/2019', revenue: '₦540,000' },
                                    { date: '09/16/2019', revenue: '₦650,000' },
                                    { date: '11/21/2019', revenue: '₦540,000' },
                                    { date: '10/19/2019', revenue: '₦650,000' },
                                    { date: '09/16/2019', revenue: '₦720,000' },
                                    { date: '10/19/2019', revenue: '₦320,000' },
                                    { date: '10/19/2019', revenue: '₦320,000' },
                                    { date: '10/19/2019', revenue: '₦320,000' }
                                ].map((session, index) => (
                                    <div key={index} className={cn("flex h-[44px] items-center gap-6 px-4 py-3.5", index !== 7 && "border-b border-border-primary")}>
                                        <span className="basis-[18%] truncate font-sans text-body-sm text-text-primary">{session.date}</span>
                                        <span className="flex-1 truncate font-sans text-body-sm text-text-primary">Skit Production Live</span>
                                        <span className="basis-[16%] truncate font-sans text-body-sm text-text-primary">45min</span>
                                        <span className="basis-[14%] truncate font-sans text-body-sm text-text-primary">323</span>
                                        <span className="basis-[16%] truncate font-sans text-body-sm text-text-primary">{session.revenue}</span>
                                        <div className="flex basis-[12%] items-center">
                                            <div className="flex h-[14px] w-fit items-center justify-center rounded-[4px] bg-surface-success px-[6px] py-[1px] pl-[3px]">
                                                <span className="font-sans text-caption-sm text-text-success">Completed</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </DataTableShell>
                </div>
            </div>
        </div>
    );
}
