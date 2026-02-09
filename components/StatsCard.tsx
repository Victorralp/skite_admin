import { cn } from '@/lib/utils';

type StatsCardProps = {
    title: string;
    value: string;
    delta?: string;
    deltaType?: 'positive' | 'negative' | 'neutral';
    trend?: string;
    trendDirection?: 'up' | 'down' | 'neutral';
};

export default function StatsCard({
    title,
    value,
    delta,
    deltaType = 'neutral',
    trend,
    trendDirection = 'neutral'
}: StatsCardProps) {
    const displayText = delta || trend || '';
    const displayType = delta ? deltaType : trendDirection;

    return (
        <div className="bg-white border border-[#EBEBEB] rounded-lg p-4 flex flex-col gap-3 flex-1 min-w-[240px] shadow-[0px_1px_2px_rgba(0,0,0,0.05)]">
            {/* Title and Value Wrapper with gap-1 (4px) */}
            <div className="flex flex-col gap-1">
                <span className="text-[12px] text-[#5F5971] font-normal leading-[14px] font-['Neue_Montreal']">
                    {title}
                </span>
                <span className="text-[18px] font-medium text-[#2B2834] leading-[22px] font-['Neue_Montreal']">
                    {value}
                </span>
            </div>

            {/* Delta/Trend Wrapper */}
            {displayText && (
                <span
                    className={cn(
                        "text-[10px] font-normal leading-[12px] font-['Neue_Montreal']",
                        displayType === 'positive' && "text-[#239B73]",
                        displayType === 'up' && "text-[#239B73]",
                        displayType === 'negative' && "text-[#CD110A]",
                        displayType === 'down' && "text-[#CD110A]",
                        displayType === 'neutral' && "text-[#A5A1AF]"
                    )}
                >
                    {displayText}
                </span>
            )}
        </div>
    );
}
