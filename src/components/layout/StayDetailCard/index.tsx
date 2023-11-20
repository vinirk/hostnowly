import { UserIcon } from '@heroicons/react/24/solid';
import { Avatar, Badge } from 'components/common';
import { HostType } from 'types';
import React from 'react';

interface SectionStayDetailProps {
  title?: string;
  category?: string;
  address?: string;
  description?: string;
  host?: HostType;
  maxGuests?: number;
}

const SectionStayDetail: React.FC<SectionStayDetailProps> = ({
  title,
  category,
  address,
  description,
  host,
  maxGuests,
}) => {
  return (
    <div className='listingSection__wrap !space-y-6'>
      <h2 className='text-2xl sm:text-3xl lg:text-4xl font-semibold'>
        {title}
      </h2>
      <div className='flex justify-between items-center'>
        <Badge
          className='inline-block text-sm text-neutral-100 bg-neutral-700/80 dark:bg-neutral-800 dark:text-neutral-200 mr-1'
          text={category}
        />
      </div>

      <div className='flex items-center space-x-4'>
        <span>
          <i className='las la-map-marker-alt'></i>
          <div className='flex flex-col gap-2 items-start'>
            <span>{description}</span>
            <span className="text-sm font-bold">{address}</span>
          </div>
        </span>
      </div>

      <div className='flex items-center'>
        <Avatar
          hasChecked
          sizeClass='h-10 w-10'
          radius='rounded-full'
          imgUrl={host?.avatar}
        />
        <span className='ml-2.5 text-neutral-500 dark:text-neutral-400'>
          Hosted by{' '}
          <span className='text-neutral-900 dark:text-neutral-200 font-medium'>
            {host?.name}
          </span>
        </span>
      </div>

      <div className='w-full border-b border-neutral-100 dark:border-neutral-700' />

      <div className='flex items-center justify-between xl:justify-start space-x-8 xl:space-x-12 text-sm text-neutral-700 dark:text-neutral-300'>
        <div className='flex items-center space-x-3 '>
          <UserIcon width={20} />
          <span className=''>
            {maxGuests} <span className='hidden sm:inline-block'>guests</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default SectionStayDetail;
