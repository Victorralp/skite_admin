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
      <h2 className="font-sans text-heading-lg-bold text-text-primary">
        Events & Live
      </h2>
      <div className="w-full flex gap-2">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="flex-1 bg-white border border-border-primary rounded-lg p-4 flex flex-col gap-3"
          >
            <div className="flex flex-col gap-1">
              <span className="font-sans text-caption-lg-regular text-text-secondary">
                {stat.label}
              </span>
              <span className="font-sans text-heading-md text-text-primary">
                {stat.value}
              </span>
            </div>
            <span
              className="font-sans text-caption-sm-regular"
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
