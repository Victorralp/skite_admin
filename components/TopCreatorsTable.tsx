'use client';

import { topCreators } from '@/data/dashboard';
import CustomDropdown from '@/components/ui/CustomDropdown';

function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M2.25 4.125H15.75V13.875H2.25V4.125Z" stroke="#5F5971" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2.25 5.625L9 10.5L15.75 5.625" stroke="#5F5971" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function TopCreatorsTable() {
  return (
    <section className="w-full h-[346px] p-4 flex flex-col gap-3 bg-white border border-border-primary rounded-lg">
      <div className="w-full h-[30px] flex justify-between items-center shrink-0">
        <h3 className="text-body-sm text-text-primary font-sans">Top Creators</h3>
        <CustomDropdown options={['Today', 'Yesterday', 'Last 7 days']} defaultLabel="Today" />
      </div>

      <div className="w-full h-[272px] flex flex-col gap-1 p-1 bg-surface-secondary rounded-xl">
        <div className="w-full h-[30px] flex items-center px-6 gap-4">
          <div className="w-[27px] text-[12px] leading-[14px] font-medium text-text-primary font-sans">Rank</div>
          <div className="flex-1 min-w-[220px] text-[12px] leading-[14px] font-medium text-text-primary font-sans">Name</div>
          <div className="w-[166px] text-[12px] leading-[14px] font-medium text-text-primary font-sans">Username</div>
          <div className="flex-1 min-w-[220px] text-[12px] leading-[14px] font-medium text-text-primary font-sans">Email</div>
          <div className="w-[162px] text-[12px] leading-[14px] font-medium text-text-primary font-sans">Revenue Generated</div>
          <div className="w-11 text-[12px] leading-[14px] font-medium text-text-primary font-sans">Actions</div>
        </div>

        <div className="w-full bg-white border border-border-primary rounded-lg">
          {topCreators.map((creator) => (
            <div
              key={creator.rank}
              className="w-full h-[46px] flex items-center px-6 gap-4 border-b border-border-primary last:border-b-0"
            >
              <div className="w-[27px] text-[13.5px] leading-4 font-normal text-text-primary font-sans">{creator.rank}</div>
              <div className="flex-1 min-w-[220px] text-[13.5px] leading-4 font-normal text-text-primary font-sans">{creator.name}</div>
              <div className="w-[166px] text-[13.5px] leading-4 font-normal text-text-primary font-sans">{creator.username}</div>
              <div className="flex-1 min-w-[220px] text-[13.5px] leading-4 font-normal text-text-primary font-sans">{creator.email}</div>
              <div className="w-[162px] text-[13.5px] leading-4 font-normal text-text-primary font-sans">{creator.revenue}</div>
              <div className="w-11 flex justify-center">
                <button
                  type="button"
                  aria-label={`Send message to ${creator.name}`}
                  className="w-[18px] h-[18px] flex items-center justify-center"
                  onClick={() => console.log('Send message to', creator.name)}
                >
                  <MailIcon />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
