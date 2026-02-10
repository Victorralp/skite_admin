'use client';

interface RatingDistributionProps {
  data?: Array<{
    stars: number;
    count: string;
    width: number; // Exact pixel width from design
    opacity: number;
  }>;
  className?: string;
}

const RatingDistribution = ({ 
  data = [
    { stars: 5, count: '2.1k', width: 134.58, opacity: 1 },
    { stars: 4, count: '1.2k', width: 78.71, opacity: 0.7 },
    { stars: 3, count: '230', width: 23.45, opacity: 0.5 },
    { stars: 2, count: '0', width: 4.32, opacity: 0.3 },
    { stars: 1, count: '0', width: 4.32, opacity: 0.2 },
  ],
  className = ''
}: RatingDistributionProps) => {
  return (
    <div className={`flex flex-col justify-center items-start px-24 py-4 gap-0.5 w-80 h-24 border-r border-border-primary ${className}`}>
      {data.map((item) => (
        <div key={item.stars} className="flex items-center gap-1 h-3">
          {/* Star + Number Frame */}
          <div className="flex items-start gap-0 w-6 h-3">
            <svg 
              width="12" 
              height="12" 
              viewBox="0 0 16 16" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="flex-none -ml-px w-3 h-3"
            >
              <path d="M3.8269 10.6666C3.90023 10.3399 3.7669 9.87325 3.53356 9.63992L1.91356 8.01992C1.4069 7.51325 1.2069 6.97325 1.35356 6.50659C1.5069 6.03992 1.98023 5.71992 2.6869 5.59992L4.7669 5.25325C5.0669 5.19992 5.43356 4.93325 5.57356 4.65992L6.72023 2.35992C7.05356 1.69992 7.5069 1.33325 8.00023 1.33325C8.49356 1.33325 8.9469 1.69992 9.28023 2.35992L10.4269 4.65992C10.5136 4.83325 10.6936 4.99992 10.8869 5.11325L3.7069 12.2933C3.61356 12.3866 3.45356 12.2999 3.48023 12.1666L3.8269 10.6666Z" fill="#DBD8E4"/>
              <path d="M12.4667 9.64001C12.2267 9.88001 12.0934 10.34 12.1734 10.6667L12.6334 12.6733C12.8267 13.5067 12.7067 14.1333 12.2934 14.4333C12.1267 14.5533 11.9267 14.6133 11.6934 14.6133C11.3534 14.6133 10.9534 14.4867 10.5134 14.2267L8.56003 13.0667C8.25337 12.8867 7.7467 12.8867 7.44003 13.0667L5.4867 14.2267C4.7467 14.66 4.11337 14.7333 3.7067 14.4333C3.55337 14.32 3.44003 14.1667 3.3667 13.9667L11.4734 5.86001C11.78 5.55335 12.2134 5.41335 12.6334 5.48668L13.3067 5.60001C14.0134 5.72001 14.4867 6.04001 14.64 6.50668C14.7867 6.97335 14.5867 7.51335 14.08 8.02001L12.4667 9.64001Z" fill="#DBD8E4"/>
            </svg>
            <span className="text-caption-sm text-text-secondary flex-1 w-3">
              {item.stars}
            </span>
          </div>
          
          {/* Progress Bar */}
          <div 
            className="h-1 bg-orange-400 rounded-full flex-none"
            style={{ 
              width: `${item.width}px`,
              opacity: item.opacity
            }}
          />
          
          {/* Count */}
          <span className="text-caption-sm text-text-primary flex-none">
            {item.count}
          </span>
        </div>
      ))}
    </div>
  );
};

export default RatingDistribution;