import { StarIcon } from '@heroicons/react/24/solid';
import { FC } from 'react';

export interface StarRatingProps {
  className?: string;
  point?: number;
  reviewCount?: number;
  showReviewCount?: boolean;
}

const StarRating: FC<StarRatingProps> = ({
  className = '',
  point = 4.5,
  reviewCount = 112,
  showReviewCount = false,
}) => {
  return (
    <div className={`flex items-center space-x-1 text-sm  ${className}`}>
      <div className='pb-[2px]'>
        <StarIcon className='w-[18px] h-[18px] text-orange-500' />
      </div>
      <span className='font-medium '>{point}</span>
      {showReviewCount && (
        <span className='text-neutral-500 dark:text-neutral-400'>
          ({reviewCount})
        </span>
      )}
    </div>
  );
};

export default StarRating;
