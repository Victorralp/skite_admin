import { useState } from 'react';
import { cn } from '@/lib/utils';

const Toggle = ({ checked, onCheckedChange }: { checked: boolean; onCheckedChange: (checked: boolean) => void }) => (
    <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onCheckedChange(!checked)}
        className={cn(
            "relative inline-flex h-[24px] w-[44px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2",
            checked ? "bg-brand-primary" : "bg-[#EBEBEB]"
        )}
    >
        <span
            className={cn(
                "pointer-events-none block h-[20px] w-[20px] rounded-full bg-white shadow-lg ring-0 transition-transform duration-200 ease-in-out",
                checked ? "translate-x-[20px]" : "translate-x-0"
            )}
        />
    </button>
);

const NotificationItem = ({
    label,
    description,
    checked,
    onChange
}: {
    label: string;
    description?: string;
    checked: boolean;
    onChange: (c: boolean) => void
}) => (
    <div className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
        <div className="flex flex-col gap-1">
            <span className="font-sans text-heading-sm text-text-primary">
                {label}
            </span>
            {description && (
                <span className="font-sans text-body-sm-regular text-text-secondary">
                    {description}
                </span>
            )}
        </div>
        <Toggle checked={checked} onCheckedChange={onChange} />
    </div>
);

export default function NotificationsTab() {
    const [settings, setSettings] = useState({
        news: true,
        tips: true,
        research: false,
        reminders: true,
        comments: true,
        buyer: true
    });

    const handleToggle = (key: keyof typeof settings) => {
        setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div className="flex flex-col w-full gap-8">
            {/* Email Notifications Section */}
            <div className="flex flex-col w-full p-8 bg-white border border-border-primary rounded-[16px]">
                <h3 className="font-sans text-heading-lg-bold text-text-primary mb-6">
                    Email Notifications
                </h3>

                <div className="flex flex-col divide-y divide-[#EBEBEB]">
                    <NotificationItem
                        label="News and updates"
                        description="News about product and feature updates."
                        checked={settings.news}
                        onChange={() => handleToggle('news')}
                    />
                    <NotificationItem
                        label="Tips and tutorials"
                        description="Tips on getting more out of the platform."
                        checked={settings.tips}
                        onChange={() => handleToggle('tips')}
                    />
                    <NotificationItem
                        label="User research"
                        description="Get involved in our beta testing program or participate in paid product research."
                        checked={settings.research}
                        onChange={() => handleToggle('research')}
                    />
                </div>
            </div>

            {/* Push Notifications Section */}
            <div className="flex flex-col w-full p-8 bg-white border border-border-primary rounded-[16px]">
                <h3 className="font-sans text-heading-lg-bold text-text-primary mb-6">
                    Push Notifications
                </h3>

                <div className="flex flex-col divide-y divide-[#EBEBEB]">
                    <NotificationItem
                        label="Reminders"
                        description="These are notifications to remind you of updates you might have missed."
                        checked={settings.reminders}
                        onChange={() => handleToggle('reminders')}
                    />
                    <NotificationItem
                        label="Comments"
                        description="These are notifications for when someone comments on your post."
                        checked={settings.comments}
                        onChange={() => handleToggle('comments')}
                    />
                    <NotificationItem
                        label="Buyer Notifications"
                        description="These are notifications for when someone buys your product."
                        checked={settings.buyer}
                        onChange={() => handleToggle('buyer')}
                    />
                </div>
            </div>
        </div>
    );
}
