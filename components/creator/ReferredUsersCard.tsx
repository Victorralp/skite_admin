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
        <div className="flex flex-col gap-[8px] w-full">
            <div className="flex items-center gap-[10px] h-[30px] w-full">
                <h3 className="w-[267px] h-[19px] font-sans text-heading-sm text-text-primary flex-none order-0 grow">Referred Users</h3>
                <CustomDropdown options={['All Time', 'This Year', 'This Month']} defaultLabel="All Time" width="78px" menuWidth="100px" />
            </div>

            <div className="box-border flex flex-col justify-center items-center p-[24px] gap-[12px] w-[355px] h-[271px] bg-white border border-border-primary rounded-[12px] flex-none order-1 self-stretch grow z-0 relative">
                <div className="w-[197px] h-[197px] flex-none order-0 grow relative">
                    <svg width="197" height="197" viewBox="0 0 197 197" fill="none" xmlns="http://www.w3.org/2000/svg" className="-rotate-90">
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

                    <div className="absolute left-1/2 top-[69px] -translate-x-1/2 flex flex-col items-center p-0 w-[84.18px] h-[36px]">
                        <span className="w-[84.18px] h-[22px] font-sans font-bold text-[18px] leading-[22px] text-center text-text-primary flex-none order-0 self-stretch grow-0">1,248</span>
                        <span className="w-[84.18px] h-[14px] font-sans text-caption-lg-regular text-center text-[rgba(0,0,0,0.4)] flex-none order-1 self-stretch grow-0">Users</span>
                    </div>
                </div>

                <div className="flex flex-row items-end p-0 gap-[22px] w-[185px] h-[14px] flex-none order-1 grow-0">
                    <div className="flex flex-row items-center p-0 gap-[4px] w-[76px] h-[14px] flex-none order-0 grow-0">
                        <div className="w-[12px] h-[12px] bg-[#4682B8] rounded-[4px] flex-none order-0 grow-0" />
                        <div className="flex flex-row items-center p-0 gap-[5px] w-[60px] h-[14px] flex-none order-1 grow-0">
                            <span className="w-[31px] h-[14px] font-sans text-caption-lg-regular text-black flex items-center flex-none order-0 grow-0">Users</span>
                            <span className="w-[24px] h-[14px] font-sans text-caption-lg-regular text-[rgba(0,0,0,0.4)] flex-none order-1 grow-0">86%</span>
                        </div>
                    </div>
                    <div className="flex flex-row items-center p-0 gap-[4px] w-[87px] h-[14px] flex-none order-1 grow-0">
                        <div className="w-[12px] h-[12px] bg-[#FC552E] rounded-[4px] flex-none order-0 grow-0" />
                        <div className="flex flex-row items-center p-0 gap-[5px] w-[71px] h-[14px] flex-none order-1 grow-0">
                            <span className="w-[45px] h-[14px] font-sans text-caption-lg-regular text-black flex items-center flex-none order-0 grow-0">Creators</span>
                            <span className="w-[21px] h-[14px] font-sans text-caption-lg-regular text-[rgba(0,0,0,0.4)] flex-none order-1 grow-0">14%</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
