import { MapPinIcon } from '@heroicons/react/24/outline';
import StarRating from 'components/common/StarRating';
import ButtonLike from 'components/common/Button/ButtonLike';
import { StayType } from 'types';
import { FC } from 'react';
import formatCurrency from 'utils/formatCurrency';
import { Badge } from 'components/common';
import StayCardGallerySlider from 'components/StayCardGallerySlider';

export interface StayCardProps {
  className?: string;
  data?: StayType;
  onGoToDetail?: () => void;
}

const StayCard: FC<StayCardProps> = ({
  className = '',
  data,
  onGoToDetail = () => {},
}) => {
  const {
    galleryImgs,
    category,
    address,
    title,
    like,
    price,
    stars,
    reviewCount,
    id,
  } = data ?? {};

  const renderSliderGallery = () => {
    return (
      <div className='relative w-full'>
        <StayCardGallerySlider
          uniqueID={`StayCard_${id}`}
          ratioClass='aspect-w-4 aspect-h-3 '
          galleryImgs={galleryImgs || []}
        />
        <ButtonLike isLiked={like} className='absolute right-3 top-3 z-[1]' />
      </div>
    );
  };

  const renderContent = () => {
    return (
      <div onClick={onGoToDetail} className='p-4 space-y-4 cursor-pointer'>
        <div className='space-y-2'>
          <div className='flex gap-1 items-center justify-start'>
            <Badge
              className='inline-block text-sm text-neutral-100 bg-neutral-700/80 dark:bg-neutral-800 dark:text-neutral-200 mr-1'
              text={category}
            />
            <Badge
              className='inline-block text-sm text-neutral-100 bg-neutral-700/80 dark:bg-neutral-800 dark:text-neutral-200 mr-1'
              text='Pet friendly'
            />
          </div>
          <div className='flex items-center space-x-2'>
            <h2 className={` font-medium capitalize text-lg`}>
              <span className='line-clamp-1'>{title}</span>
            </h2>
          </div>
          <div className='flex items-center text-neutral-500 dark:text-neutral-400 text-sm space-x-2'>
            <div className='min-w-[20px]'>
              <MapPinIcon />
            </div>
            <span className=''>{address}</span>
          </div>
        </div>
        <div className='w-14 border-b border-neutral-100 dark:border-neutral-800'></div>
        <div className='flex justify-between items-center'>
          <span className='text-base font-semibold'>
            {price && formatCurrency(price)}
            {` `}
            <span className='text-sm text-neutral-500 dark:text-neutral-400 font-normal'>
              /night
            </span>
          </span>
          {!!stars && <StarRating reviewCount={reviewCount} point={stars} />}
        </div>
      </div>
    );
  };

  return (
    <div
      className={`group relative bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-2xl overflow-hidden will-change-transform hover:shadow-xl transition-shadow ${className}`}
    >
      {renderSliderGallery()}
      {renderContent()}
    </div>
  );
};

export default StayCard;
