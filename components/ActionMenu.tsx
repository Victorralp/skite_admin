'use client';

type ActionMenuProps = {
    onView?: () => void;
    onMessage?: () => void;
    onSuspend?: () => void;
    status?: 'Active' | 'Suspended' | 'Banned';
    showViewOption?: boolean;
    viewLabel?: string;
    messageLabel?: string;
    suspendLabel?: string;
    // Simple mode with just 2 options
    simpleMode?: boolean;
    option1Label?: string;
    option2Label?: string;
    onOption1?: () => void;
    onOption2?: () => void;
};

export default function ActionMenu({ 
    onView, 
    onMessage, 
    onSuspend, 
    status = 'Active', 
    showViewOption = true,
    viewLabel = 'View Creator Details',
    messageLabel,
    suspendLabel,
    simpleMode = false,
    option1Label,
    option2Label,
    onOption1,
    onOption2
}: ActionMenuProps) {
    // Simple mode with just 2 options
    if (simpleMode && onOption1 && onOption2) {
        return (
            <div
                className="absolute right-[-1px] top-[33px] w-[161px] bg-white border border-[#EBEBEB] rounded-[12px] flex flex-col items-center p-0 overflow-hidden"
                style={{
                    boxShadow: '0px 116px 46px rgba(0, 0, 0, 0.01), 0px 65px 39px rgba(0, 0, 0, 0.05), 0px 29px 29px rgba(0, 0, 0, 0.09), 0px 7px 16px rgba(0, 0, 0, 0.1)',
                    zIndex: 50
                }}
            >
                <button
                    onClick={onOption1}
                    className="w-[161px] h-[37px] flex items-center bg-white hover:bg-gray-50 transition-colors"
                    style={{
                        padding: '10px 24px 10px 16px',
                        gap: '10px',
                        border: '0.5px solid #EBEBEB',
                        borderRadius: '0px'
                    }}
                >
                    <span className="text-[13.5px] font-medium text-[#2B2834] leading-4 font-['Neue_Montreal']">
                        {option1Label}
                    </span>
                </button>
                <button
                    onClick={onOption2}
                    className="w-[161px] h-[37px] flex items-center bg-white hover:bg-gray-50 transition-colors"
                    style={{
                        padding: '10px 24px 10px 16px',
                        gap: '10px',
                        border: '0.5px solid #EBEBEB',
                        borderRadius: '0px'
                    }}
                >
                    <span className="text-[13.5px] font-medium text-[#CD110A] leading-4 font-['Neue_Montreal']">
                        {option2Label}
                    </span>
                </button>
            </div>
        );
    }

    // Default labels based on status if not provided
    const defaultMessageLabel = status === 'Suspended' ? 'Unsuspend Creator' : 'Suspend Creator';
    const defaultSuspendLabel = status === 'Banned' ? 'Unban Creator' : 'Ban Creator';

    return (
        <div
            className="absolute right-[-1px] top-[33px] w-[140px] bg-white border border-[#EBEBEB] rounded-[12px] flex flex-col items-center p-0 overflow-hidden"
            style={{
                boxShadow: '0px 116px 46px rgba(0, 0, 0, 0.01), 0px 65px 39px rgba(0, 0, 0, 0.05), 0px 29px 29px rgba(0, 0, 0, 0.09), 0px 7px 16px rgba(0, 0, 0, 0.1)',
                zIndex: 50
            }}
        >
            {showViewOption && onView && (
                <button
                    onClick={onView}
                    className="w-[140px] h-[37px] flex items-center bg-white hover:bg-gray-50 transition-colors"
                    style={{
                        padding: '10px 24px 10px 16px',
                        gap: '10px',
                        border: '0.5px solid #EBEBEB',
                        borderRadius: '0px'
                    }}
                >
                    <span className="text-[13.5px] font-medium text-[#2B2834] leading-4 font-['Neue_Montreal'] whitespace-nowrap">
                        {viewLabel}
                    </span>
                </button>
            )}
            {status !== 'Banned' && onMessage && (
                <button
                    onClick={onMessage}
                    className="w-[140px] h-[37px] flex items-center bg-white hover:bg-gray-50 transition-colors"
                    style={{
                        padding: '10px 24px 10px 16px',
                        gap: '10px',
                        border: '0.5px solid #EBEBEB',
                        borderRadius: '0px'
                    }}
                >
                    <span className="text-[13.5px] font-medium text-[#2B2834] leading-4 font-['Neue_Montreal'] whitespace-nowrap">
                        {messageLabel || defaultMessageLabel}
                    </span>
                </button>
            )}
            {onSuspend && (
                <button
                    onClick={onSuspend}
                    className="w-[140px] h-[37px] flex items-center bg-white hover:bg-gray-50 transition-colors"
                    style={{
                        padding: '10px 24px 10px 16px',
                        gap: '10px',
                        border: '0.5px solid #EBEBEB',
                        borderRadius: '0px'
                    }}
                >
                    <span className="text-[13.5px] font-medium text-[#CD110A] leading-4 font-['Neue_Montreal'] whitespace-nowrap">
                        {suspendLabel || defaultSuspendLabel}
                    </span>
                </button>
            )}
        </div>
    );
}
