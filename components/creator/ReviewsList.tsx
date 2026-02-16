'use client';

import TimeDropdown from '../ui/TimeDropdown';

interface Review {
  id: string;
  name: string;
  handle: string;
  date: string;
  rating: number;
  text: string;
  avatar?: string;
}

interface RatingDistribution {
  stars: number;
  count: string;
  percentage: number;
}

interface ReviewsListProps {
  title?: string;
  totalReviews?: string;
  averageRating?: number;
  ratingDistribution?: RatingDistribution[];
  reviews?: Review[];
  timeOptions?: string[];
  defaultTimeOption?: string;
  showStats?: boolean;
  className?: string;
}

const Star = ({ filled, size = 16 }: { filled?: boolean, size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    {filled ? (
      <path d="M3.8269 10.6666C3.90023 10.3399 3.7669 9.87325 3.53356 9.63992L1.91356 8.01992C1.4069 7.51325 1.2069 6.97325 1.35356 6.50659C1.5069 6.03992 1.98023 5.71992 2.6869 5.59992L4.7669 5.25325C5.0669 5.19992 5.43356 4.93325 5.57356 4.65992L6.72023 2.35992C7.05356 1.69992 7.5069 1.33325 8.00023 1.33325C8.49356 1.33325 8.9469 1.69992 9.28023 2.35992L10.4269 4.65992C10.5136 4.83325 10.6936 4.99992 10.8869 5.11325L3.7069 12.2933C3.61356 12.3866 3.45356 12.2999 3.48023 12.1666L3.8269 10.6666Z" fill="#FF8D28" />
    ) : (
      <path d="M3.8269 10.6666C3.90023 10.3399 3.7669 9.87325 3.53356 9.63992L1.91356 8.01992C1.4069 7.51325 1.2069 6.97325 1.35356 6.50659C1.5069 6.03992 1.98023 5.71992 2.6869 5.59992L4.7669 5.25325C5.0669 5.19992 5.43356 4.93325 5.57356 4.65992L6.72023 2.35992C7.05356 1.69992 7.5069 1.33325 8.00023 1.33325C8.49356 1.33325 8.9469 1.69992 9.28023 2.35992L10.4269 4.65992C10.5136 4.83325 10.6936 4.99992 10.8869 5.11325L3.7069 12.2933C3.61356 12.3866 3.45356 12.2999 3.48023 12.1666L3.8269 10.6666Z" fill="#F1F1F1" />
    )}
    {filled ? (
      <path d="M12.4667 9.64001C12.2267 9.88001 12.0934 10.34 12.1734 10.6667L12.6334 12.6733C12.8267 13.5067 12.7067 14.1333 12.2934 14.4333C12.1267 14.5533 11.9267 14.6133 11.6934 14.6133C11.3534 14.6133 10.9534 14.4867 10.5134 14.2267L8.56003 13.0667C8.25337 12.8867 7.7467 12.8867 7.44003 13.0667L5.4867 14.2267C4.7467 14.66 4.11337 14.7333 3.7067 14.4333C3.55337 14.32 3.44003 14.1667 3.3667 13.9667L11.4734 5.86001C11.78 5.55335 12.2134 5.41335 12.6334 5.48668L13.3067 5.60001C14.0134 5.72001 14.4867 6.04001 14.64 6.50668C14.7867 6.97335 14.5867 7.51335 14.08 8.02001L12.4667 9.64001Z" fill="#FF8D28" />
    ) : (
      <path d="M12.4667 9.64001C12.2267 9.88001 12.0934 10.34 12.1734 10.6667L12.6334 12.6733C12.8267 13.5067 12.7067 14.1333 12.2934 14.4333C12.1267 14.5533 11.9267 14.6133 11.6934 14.6133C11.3534 14.6133 10.9534 14.4867 10.5134 14.2267L8.56003 13.0667C8.25337 12.8867 7.7467 12.8867 7.44003 13.0667L5.4867 14.2267C4.7467 14.66 4.11337 14.7333 3.7067 14.4333C3.55337 14.32 3.44003 14.1667 3.3667 13.9667L11.4734 5.86001C11.78 5.55335 12.2134 5.41335 12.6334 5.48668L13.3067 5.60001C14.0134 5.72001 14.4867 6.04001 14.64 6.50668C14.7867 6.97335 14.5867 7.51335 14.08 8.02001L12.4667 9.64001Z" fill="#F1F1F1" />
    )}
  </svg>
);

const ReviewItem = ({ review, isLast }: { review: Review; isLast?: boolean }) => (
  <div className={`flex w-full flex-col items-start gap-5 bg-white py-6 md:flex-row md:gap-8 ${!isLast ? 'border-b border-border-primary' : ''}`}>
    <div className="flex min-w-0 items-start gap-3 md:w-[280px] md:shrink-0">
      <div className="h-[45px] w-[45px] shrink-0 overflow-hidden rounded-full bg-gray-200">
        {review.avatar ? (
          <img src={review.avatar} alt={review.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500" />
        )}
      </div>
      <div className="flex min-w-0 flex-col justify-center gap-1">
        <h4 className="text-lg font-bold leading-[22px] text-text-primary font-sans">
          {review.name}
        </h4>
        <p className="text-base font-medium leading-[19px] tracking-[-0.02em] text-[#8E8E8D] font-sans">
          {review.handle}
        </p>
      </div>
    </div>

    <div className="flex flex-1 flex-col items-start justify-center gap-2">
      <div className="flex items-center gap-2.5">
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={16} filled={i < review.rating} />
          ))}
        </div>
        <span className="text-sm font-normal leading-[17px] tracking-[-0.02em] text-[#8E8E8D] font-sans">
          {review.date}
        </span>
      </div>
      <p className="text-base font-normal leading-[19px] text-[#090A07] font-sans self-stretch">
        {review.text}
      </p>
    </div>
  </div>
);

export default function ReviewsList({
  title = "Reviews",
  totalReviews = "10.0k",
  averageRating = 4.0,
  ratingDistribution = [
    { stars: 5, count: '2.1k', percentage: 134.58 },
    { stars: 4, count: '1.2k', percentage: 78.71 },
    { stars: 3, count: '230', percentage: 23.45 },
    { stars: 2, count: '0', percentage: 4.32 },
    { stars: 1, count: '0', percentage: 4.32 },
  ],
  reviews = [
    {
      id: '1',
      name: 'Annette Black',
      handle: '@evanlee',
      date: '1/15/12',
      rating: 4,
      text: '"They are a great partner on both Strategic and Implementation. They have proven to be fair and resp'
    },
    {
      id: '2',
      name: 'Jane Cooper',
      handle: '@lucyliu',
      date: '6/19/14',
      rating: 5,
      text: '"Very inspiring working experience with their representatives, responsible and active in communicati'
    },
    {
      id: '3',
      name: 'Arlene McCoy',
      handle: '@chloegrace',
      date: '8/30/14',
      rating: 4,
      text: '"The partner been progressing well with the business change environment, talents of new skill set mi'
    },
    {
      id: '4',
      name: 'Jacob Jones',
      handle: '@paigelee',
      date: '7/18/17',
      rating: 4,
      text: '"Incredible group of people and talented professionals. Focused on the development of flexible and i'
    }
  ],
  timeOptions = ['All Time', 'This Year', 'This Month'],
  defaultTimeOption = 'All Time',
  showStats = true,
  className = ''
}: ReviewsListProps) {
  const maxDistribution = Math.max(...ratingDistribution.map((item) => item.percentage), 1);

  return (
    <div className={`isolate flex w-full flex-col items-center justify-center gap-2 ${className}`}>
      <div className="z-[1] flex w-full items-center justify-center gap-2.5">
        <h2 className="flex-1 font-sans text-base font-medium leading-none tracking-[0%] text-text-primary">
          {title}
        </h2>
        <TimeDropdown
          options={timeOptions}
          defaultOption={defaultTimeOption}
        />
      </div>

      <div className="z-0 flex w-full flex-col items-start gap-1 rounded-lg p-1">
        {showStats && (
          <div className="grid w-full grid-cols-1 overflow-hidden rounded border border-border-primary bg-white md:grid-cols-3">
            <div className="flex flex-col items-start gap-1 border-b border-border-primary px-6 py-4 md:border-b-0 md:border-r">
              <span className="font-sans text-xs font-normal leading-[14px] text-text-secondary">
                Total Reviews
              </span>
              <span className="text-xl font-medium leading-6 tracking-[-0.01em] text-text-primary font-sans">
                {totalReviews}
              </span>
            </div>

            <div className="flex flex-col items-start gap-1 border-b border-border-primary px-6 py-4 md:border-b-0 md:border-r">
              <span className="font-sans text-xs font-normal leading-[14px] text-text-secondary">
                Average Rating
              </span>
              <div className="flex items-center gap-2.5">
                <span className="w-7 font-sans text-xl font-medium leading-6 tracking-[-0.01em] text-text-primary">
                  {averageRating.toFixed(1)}
                </span>
                <div className="flex h-4 items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} filled={i < Math.floor(averageRating)} />
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col items-start justify-center gap-1 px-6 py-4">
              {ratingDistribution.map((item, index) => (
                <div key={item.stars} className="flex h-3 w-full items-center gap-[5px]">
                  <div className="-ml-px flex h-3 w-6 items-start gap-0">
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-none w-3 h-3">
                      <path d="M3.8269 10.6666C3.90023 10.3399 3.7669 9.87325 3.53356 9.63992L1.91356 8.01992C1.4069 7.51325 1.2069 6.97325 1.35356 6.50659C1.5069 6.03992 1.98023 5.71992 2.6869 5.59992L4.7669 5.25325C5.0669 5.19992 5.43356 4.93325 5.57356 4.65992L6.72023 2.35992C7.05356 1.69992 7.5069 1.33325 8.00023 1.33325C8.49356 1.33325 8.9469 1.69992 9.28023 2.35992L10.4269 4.65992C10.5136 4.83325 10.6936 4.99992 10.8869 5.11325L3.7069 12.2933C3.61356 12.3866 3.45356 12.2999 3.48023 12.1666L3.8269 10.6666Z" fill="#DBD8E4" />
                      <path d="M12.4667 9.64001C12.2267 9.88001 12.0934 10.34 12.1734 10.6667L12.6334 12.6733C12.8267 13.5067 12.7067 14.1333 12.2934 14.4333C12.1267 14.5533 11.9267 14.6133 11.6934 14.6133C11.3534 14.6133 10.9534 14.4867 10.5134 14.2267L8.56003 13.0667C8.25337 12.8867 7.7467 12.8867 7.44003 13.0667L5.4867 14.2267C4.7467 14.66 4.11337 14.7333 3.7067 14.4333C3.55337 14.32 3.44003 14.1667 3.3667 13.9667L11.4734 5.86001C11.78 5.55335 12.2134 5.41335 12.6334 5.48668L13.3067 5.60001C14.0134 5.72001 14.4867 6.04001 14.64 6.50668C14.7867 6.97335 14.5867 7.51335 14.08 8.02001L12.4667 9.64001Z" fill="#DBD8E4" />
                    </svg>
                    <span className="flex-1 font-sans text-[10px] font-medium leading-3 text-center text-text-secondary">
                      {item.stars}
                    </span>
                  </div>

                  <div
                    className="h-[4.23px] shrink-0 rounded-full bg-[#FF8D28]"
                    style={{
                      width: `${(item.percentage / maxDistribution) * 100}%`,
                      opacity: index === 0 ? 1 : index === 1 ? 0.7 : index === 2 ? 0.5 : index === 3 ? 0.3 : 0.2
                    }}
                  />

                  <span className="flex-none font-sans text-[10px] font-medium leading-3 text-text-primary">
                    {item.count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex w-full flex-col items-center rounded border border-border-primary bg-white px-4 py-6 md:px-8">
          {reviews.map((review, index) => (
            <ReviewItem
              key={review.id}
              review={review}
              isLast={index === reviews.length - 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
