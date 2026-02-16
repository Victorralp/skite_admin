import React from 'react';
import { cn } from '@/lib/utils';

interface MediaFrameProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  minHeight?: string;
  defaultHeight?: string;
  maxHeight?: string;
  aspectRatio?: string;
}

const MediaFrame = React.forwardRef<HTMLDivElement, MediaFrameProps>(
  (
    {
      children,
      className,
      style,
      minHeight = 'var(--media-frame-height-min)',
      defaultHeight = 'var(--media-frame-height-default)',
      maxHeight = 'var(--media-frame-height-max)',
      aspectRatio = 'var(--media-frame-aspect-ratio)',
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn('w-full rounded-lg overflow-hidden', className)}
        style={{
          minHeight,
          height: `clamp(${minHeight}, ${defaultHeight}, ${maxHeight})`,
          maxHeight,
          aspectRatio,
          ...style
        }}
        {...props}
      >
        {children}
      </div>
    );
  }
);

MediaFrame.displayName = 'MediaFrame';

export default MediaFrame;
