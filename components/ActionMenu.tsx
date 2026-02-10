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
            <div className="absolute right-0 top-8 w-40 bg-white border border-border-primary rounded-xl flex flex-col items-center p-0 overflow-hidden shadow-dropdown z-50">
                <button
                    onClick={onOption1}
                    className="w-40 h-menu-item flex items-center bg-white hover:bg-gray-50 transition-colors px-4 py-2.5 gap-2.5 border-b border-border-primary"
                >
                    <span className="text-body-sm font-medium text-text-primary leading-4">
                        {option1Label}
                    </span>
                </button>
                <button
                    onClick={onOption2}
                    className="w-40 h-menu-item flex items-center bg-white hover:bg-gray-50 transition-colors px-4 py-2.5 gap-2.5"
                >
                    <span className="text-body-sm font-medium text-text-danger leading-4">
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
        <div className="absolute right-0 top-8 w-36 bg-white border border-border-primary rounded-xl flex flex-col items-center p-0 overflow-hidden shadow-dropdown z-50">
            {showViewOption && onView && (
                <button
                    onClick={onView}
                    className="w-36 h-menu-item flex items-center bg-white hover:bg-gray-50 transition-colors px-4 py-2.5 gap-2.5 border-b border-border-primary"
                >
                    <span className="text-body-sm font-medium text-text-primary leading-4 whitespace-nowrap">
                        {viewLabel}
                    </span>
                </button>
            )}
            {status !== 'Banned' && onMessage && (
                <button
                    onClick={onMessage}
                    className="w-36 h-menu-item flex items-center bg-white hover:bg-gray-50 transition-colors px-4 py-2.5 gap-2.5 border-b border-border-primary"
                >
                    <span className="text-body-sm font-medium text-text-primary leading-4 whitespace-nowrap">
                        {messageLabel || defaultMessageLabel}
                    </span>
                </button>
            )}
            {onSuspend && (
                <button
                    onClick={onSuspend}
                    className="w-36 h-menu-item flex items-center bg-white hover:bg-gray-50 transition-colors px-4 py-2.5 gap-2.5"
                >
                    <span className="text-body-sm font-medium text-text-danger leading-4 whitespace-nowrap">
                        {suspendLabel || defaultSuspendLabel}
                    </span>
                </button>
            )}
        </div>
    );
}
