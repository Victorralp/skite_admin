'use client';

type PersonalInfoProps = {
  creator: {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    phone?: string;
    dob?: string;
    gender?: string;
    location?: string;
    joinDate?: string;
  };
};

type InfoRowProps = {
  label: string;
  value: string;
  icon: 'user' | 'mail' | 'calendar' | 'gender' | 'location' | 'clock';
};

const iconMap: Record<InfoRowProps['icon'], JSX.Element> = {
  user: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 8C9.65685 8 11 6.65685 11 5C11 3.34315 9.65685 2 8 2C6.34315 2 5 3.34315 5 5C5 6.65685 6.34315 8 8 8Z" stroke="#5F5971" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13.2 14C13.2 11.2386 10.8719 9 8 9C5.12812 9 2.8 11.2386 2.8 14" stroke="#5F5971" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  mail: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M4 4H12C12.55 4 13 4.45 13 5V11C13 11.55 12.55 12 12 12H4C3.45 12 3 11.55 3 11V5C3 4.45 3.45 4 4 4Z" stroke="#5F5971" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 4L8 8L12 4" stroke="#5F5971" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  calendar: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3.2 2.8H12.8C13.2418 2.8 13.6 3.15817 13.6 3.6V12.8C13.6 13.2418 13.2418 13.6 12.8 13.6H3.2C2.75817 13.6 2.4 13.2418 2.4 12.8V3.6C2.4 3.15817 2.75817 2.8 3.2 2.8Z" stroke="#5F5971" />
      <path d="M5.2 1.6V4M10.8 1.6V4M2.4 6.4H13.6" stroke="#5F5971" strokeLinecap="round" />
    </svg>
  ),
  gender: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 13.6C10.6509 13.6 12.8 11.4509 12.8 8.8C12.8 6.14903 10.6509 4 8 4C5.34903 4 3.2 6.14903 3.2 8.8C3.2 11.4509 5.34903 13.6 8 13.6Z" stroke="#5F5971" />
      <path d="M8 2.4V4M8 13.6V15.2M2.4 8.8H4M12 8.8H13.6" stroke="#5F5971" strokeLinecap="round" />
    </svg>
  ),
  location: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 14.4C8 14.4 12.8 10.5606 12.8 7.2C12.8 4.54903 10.6509 2.4 8 2.4C5.34903 2.4 3.2 4.54903 3.2 7.2C3.2 10.5606 8 14.4 8 14.4Z" stroke="#5F5971" />
      <circle cx="8" cy="7.2" r="1.6" stroke="#5F5971" />
    </svg>
  ),
  clock: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="5.6" stroke="#5F5971" />
      <path d="M8 5.6V8.4L9.6 10" stroke="#5F5971" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
};

function InfoRow({ label, value, icon }: InfoRowProps) {
  return (
    <div className="box-border flex items-center gap-4 w-full min-h-8 px-4 bg-white border border-border-primary rounded">
      <div className="flex w-[30%] min-w-[96px] items-center gap-2 shrink-0">
        <span className="w-4 h-4 flex items-center justify-center">{iconMap[icon]}</span>
        <span className="font-sans text-xs leading-[14px] text-text-secondary">{label}</span>
      </div>
      <div className="w-px self-stretch bg-border-primary" />
      <span className="min-w-0 flex-1 font-sans text-[13.5px] leading-4 font-medium text-text-primary truncate">{value}</span>
    </div>
  );
}

export default function PersonalInfo({ creator }: PersonalInfoProps) {
  const rows: InfoRowProps[] = [
    { label: 'First Name', value: creator.firstName || '-', icon: 'user' },
    { label: 'Last Name', value: creator.lastName || '-', icon: 'user' },
    { label: 'User Name', value: creator.username || '-', icon: 'user' },
    { label: 'Email', value: creator.email || '-', icon: 'mail' },
    { label: 'Date of Birth', value: creator.dob || '-', icon: 'calendar' },
    { label: 'Gender', value: creator.gender || '-', icon: 'gender' },
    { label: 'Location', value: creator.location || '-', icon: 'location' },
    { label: 'Joined', value: creator.joinDate || '-', icon: 'clock' }
  ];

  return (
    <div className="flex w-full flex-col gap-2">
      <h3 className="font-sans text-heading-sm text-text-primary">Personal Info</h3>
      <div className="flex flex-col gap-1 w-full p-1 rounded-lg bg-surface-secondary border border-border-primary">
        {rows.map((row) => (
          <InfoRow key={row.label} {...row} />
        ))}
      </div>
    </div>
  );
}
