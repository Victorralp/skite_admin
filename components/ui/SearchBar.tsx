"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SearchBarProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    containerClassName?: string;
    iconClassName?: string;
}

const SearchBar = React.forwardRef<HTMLInputElement, SearchBarProps>(
    ({ className, containerClassName, iconClassName, ...props }, ref) => {
        return (
            <div
                className={cn(
                    "flex items-center gap-2 rounded-[4px] border border-border-primary bg-surface-secondary",
                    // Padding: 8px top/bottom, 24px right, 10px left. 
                    // Tailwind: py-2, pr-6, pl-2.5
                    "py-2 pr-6 pl-2.5",
                    containerClassName
                )}
                style={{ width: '202px', height: '30px' }}
            >
                {/* Custom Solar Magnifer Icon */}
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className={cn("flex-shrink-0", iconClassName)}>
                    <circle cx="5.5" cy="5.5" r="4.9" stroke="var(--text-secondary)" strokeWidth="1.2" />
                    <path d="M9.25 9.25L11.25 11.25" stroke="var(--text-secondary)" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
                <input
                    className={cn(
                        "flex h-full w-full bg-transparent outline-none disabled:cursor-not-allowed disabled:opacity-50",
                        // Body Small/Regular - Neue Montreal, 12px, #A5A1AF placeholder/text
                        "text-caption-lg text-text-primary placeholder:text-text-tertiary",
                        className
                    )}
                    ref={ref}
                    {...props}
                />
            </div>
        );
    }
);
SearchBar.displayName = "SearchBar";

export { SearchBar };
