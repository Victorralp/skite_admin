import { cn } from "@/lib/utils";
import React from "react";

interface PageContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export default function PageContainer({ children, className, ...props }: PageContainerProps) {
    return (
        <div
            className={cn(
                "w-full min-h-screen bg-white mx-auto box-border px-4 py-6 md:px-12 flex flex-col gap-8 transition-all duration-300 ease-in-out",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}
