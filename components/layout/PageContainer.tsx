import { cn } from "@/lib/utils";
import React from "react";

interface PageContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export default function PageContainer({ children, className, ...props }: PageContainerProps) {
    const { style, ...restProps } = props;
    return (
        <div
            className={cn(
                "w-full min-h-screen bg-white mx-auto box-border layout-gutter flex flex-col transition-all duration-300 ease-in-out",
                className
            )}
            style={{
                paddingTop: "var(--layout-page-y)",
                paddingBottom: "var(--layout-page-y)",
                gap: "var(--layout-stack-gap)",
                ...style
            }}
            {...restProps}
        >
            {children}
        </div>
    );
}
