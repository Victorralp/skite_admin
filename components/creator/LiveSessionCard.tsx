'use client';

export default function LiveSessionCard() {
  const stats = [
    { label: 'Started', value: '10:47 AM' },
    { label: 'Participants', value: '2' },
    { label: 'Viewers', value: '24' },
    { label: 'Chat Messages', value: '23' }
  ];

  return (
    <div className="flex w-full flex-col gap-2">
      <h3 className="font-sans text-heading-sm text-text-primary">Live Session</h3>

      <div className="bg-white border border-border-primary rounded-xl overflow-hidden">
        <div className="p-4 flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative h-[127px] w-full shrink-0 overflow-hidden rounded sm:w-[40%] sm:max-w-[240px]">
              <img
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=260&fit=crop"
                alt="Live session preview"
                className="h-full w-full object-cover"
              />
              <div className="absolute top-2 left-2 inline-flex items-center gap-1 px-2 py-1 bg-white/80 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-[#CD110A]" />
                <span className="font-sans text-xs text-text-danger">Live</span>
              </div>
            </div>

            <div className="flex flex-col gap-3 flex-1 min-w-0">
              <h4 className="font-sans text-heading-sm text-text-primary line-clamp-1">
                Skit Production Masterclass
              </h4>
              <div className="flex flex-wrap items-center gap-1">
                <button className="h-7 px-4 bg-white border border-border-primary rounded-[9px] shadow-button-inset font-sans text-body-sm text-[#353A44]">
                  Monitor Session
                </button>
                <button className="h-7 px-4 bg-white border border-border-primary rounded-[9px] shadow-button-inset font-sans text-body-sm text-[#353A44]">
                  View Chat
                </button>
                <button className="h-7 px-4 bg-[#CD110A] border border-[rgba(251,236,235,0.2)] rounded-[9px] shadow-button-inset font-sans text-body-sm text-white">
                  End Session
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full h-px bg-border-primary" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-1 px-4 py-3">
          {stats.map((item, index) => (
            <div key={item.label} className="relative flex flex-col items-center gap-1 py-1">
              {index !== 0 && (
                <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 w-px h-[26px] bg-border-primary" />
              )}
              <span className="font-sans text-xs leading-[14px] text-text-secondary text-center">
                {item.label}
              </span>
              <span className="font-sans font-medium text-[15px] leading-[18px] text-text-primary text-center">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
