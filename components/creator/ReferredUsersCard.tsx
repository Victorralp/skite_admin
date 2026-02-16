'use client';

import CustomDropdown from '../ui/CustomDropdown';

export default function ReferredUsersCard() {
    const RADIUS = 78.5;
    const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
    const GAP_PX = 8;
    const usersPct = 0.86;
    const creatorsPct = 0.14;
    const usersLen = CIRCUMFERENCE * usersPct - GAP_PX;
    const creatorsLen = CIRCUMFERENCE * creatorsPct - GAP_PX;

    return (
        <div className="flex w-full flex-col gap-2">
            <div className="flex w-full flex-wrap items-center gap-3">
                <h3 className="flex-1 font-sans text-heading-sm text-text-primary">Referred Users</h3>
                <CustomDropdown options={['All Time', 'This Year', 'This Month']} defaultLabel="All Time" width="78px" menuWidth="100px" />
            </div>

            <div className="flex min-h-[271px] w-full flex-col items-center justify-center gap-4 rounded-xl border border-border-primary bg-white p-6">
                <div className="relative aspect-square w-full max-w-[220px]">
                    <svg viewBox="0 0 197 197" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full -rotate-90">
                        {/* Blue segment border (1px white) */}
                        <circle
                            cx="98.5"
                            cy="98.5"
                            r={RADIUS}
                            stroke="#FFFFFF"
                            strokeWidth="22"
                            strokeDasharray={`${usersLen} ${CIRCUMFERENCE}`}
                            strokeLinecap="butt"
                        />
                        <circle
                            cx="98.5"
                            cy="98.5"
                            r={RADIUS}
                            stroke="#4682B8"
                            strokeWidth="20"
                            strokeDasharray={`${usersLen} ${CIRCUMFERENCE}`}
                            strokeLinecap="butt"
                        />
                        {/* Orange segment border (1px white) */}
                        <circle
                            cx="98.5"
                            cy="98.5"
                            r={RADIUS}
                            stroke="#FFFFFF"
                            strokeWidth="22"
                            strokeDasharray={`${creatorsLen} ${CIRCUMFERENCE}`}
                            strokeDashoffset={-(usersLen + GAP_PX)}
                            strokeLinecap="butt"
                        />
                        <circle
                            cx="98.5"
                            cy="98.5"
                            r={RADIUS}
                            stroke="#FC552E"
                            strokeWidth="20"
                            strokeDasharray={`${creatorsLen} ${CIRCUMFERENCE}`}
                            strokeDashoffset={-(usersLen + GAP_PX)}
                            strokeLinecap="butt"
                        />
                    </svg>

                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="font-sans text-[18px] font-bold leading-[22px] text-text-primary">1,248</span>
                        <span className="font-sans text-caption-lg-regular text-[rgba(0,0,0,0.4)]">Users</span>
                    </div>
                </div>

                <div className="flex w-full flex-wrap items-center justify-center gap-4">
                    <div className="flex items-center gap-1">
                        <div className="h-3 w-3 rounded bg-[#4682B8]" />
                        <div className="flex items-center gap-1">
                            <span className="font-sans text-caption-lg-regular text-black">Users</span>
                            <span className="font-sans text-caption-lg-regular text-[rgba(0,0,0,0.4)]">86%</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-1">
                        <div className="h-3 w-3 rounded bg-[#FC552E]" />
                        <div className="flex items-center gap-1">
                            <span className="font-sans text-caption-lg-regular text-black">Creators</span>
                            <span className="font-sans text-caption-lg-regular text-[rgba(0,0,0,0.4)]">14%</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
