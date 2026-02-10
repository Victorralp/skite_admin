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
        <div className="flex flex-col items-start p-4 gap-3 w-full flex-1 basis-0 min-w-[240px] h-24 bg-white border border-[#EBEBEB] rounded-lg">
            {/* Title and Value Section */}
            <div className="flex flex-col items-start gap-1 w-full h-10">
                <span className="font-['Neue_Montreal'] font-normal text-xs leading-[14px] text-[#5F5971] w-full">
                    {title}
                </span>
                <span className="font-['Neue_Montreal'] font-medium text-lg leading-[22px] text-[#2B2834] w-full">
                    {value}
                </span>
            </div>

            {/* Delta/Trend Section */}
            {displayText && (
                <span
                    className={cn(
                        "font-['Neue_Montreal'] font-normal text-[10px] leading-3 w-full",
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
