import { cn } from "@/lib/utils";
import React from "react";

interface PageContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export default function PageContainer({ children, className, ...props }: PageContainerProps) {
    return (
        <div
            className={cn(
                "w-full max-w-[1150px] mx-auto box-border px-6 py-8 flex flex-col gap-8 transition-all duration-300 ease-in-out",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}
