export default function EventsStats() {
  const stats = [
    {
      label: 'Total Live Sessions',
      value: '1,393',
      meta: '+2 today',
      metaColor: '#239B73'
    },
    {
      label: 'Live Sessions Now',
      value: '6',
      meta: '2,847 viewers',
      metaColor: '#239B73'
    },
    {
      label: 'Events This Week',
      value: '156',
      meta: 'N4.2M projected',
      metaColor: '#A5A1AF'
    },
    {
      label: 'Cancelled/Failed',
      value: '11',
      meta: '+1 today',
      metaColor: '#CD110A'
    }
  ];

  return (
    <div className="w-full flex flex-col gap-2">
      <h2 className="font-['Neue_Montreal'] font-bold text-[20px] leading-[24px] tracking-[-0.01em] text-[#2B2834]">
        Events & Live
      </h2>
      <div className="w-full flex gap-2">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="flex-1 bg-white border border-[#EBEBEB] rounded-lg p-4 flex flex-col gap-3"
          >
            <div className="flex flex-col gap-1">
              <span className="font-['Neue_Montreal'] font-normal text-[12px] leading-[14px] text-[#5F5971]">
                {stat.label}
              </span>
              <span className="font-['Neue_Montreal'] font-medium text-[18px] leading-[22px] text-[#2B2834]">
                {stat.value}
              </span>
            </div>
            <span
              className="font-['Neue_Montreal'] font-normal text-[10px] leading-[12px]"
              style={{ color: stat.metaColor }}
            >
              {stat.meta}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
