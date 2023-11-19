import { UserIcon } from '@heroicons/react/24/solid';
import { AppDispatch, RootState } from 'app/store';
import GuestsInput from 'components/common/GuestsInput/GuestsInput';
import { setFilters } from 'features/filters/filtersSlice';
import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { StayType } from 'types';

interface SectionStayGuestsProps {
  title?: string;
}

const SectionStayGuests: React.FC<SectionStayGuestsProps> = ({ title }) => {
  const { id } = useParams<{ id: string }>();
  const currentStay = useSelector((state: RootState) =>
    state.general.stays.find((item: StayType) => item.id === id)
  );
  const filter = useSelector((state: RootState) => state.filters);
  const dispatch = useDispatch<AppDispatch>();
  /**
   *  Handle change guest adults and children filter
   * @param adults
   * @param children
   */
  const handleChangeFilters = (adults: number, children: number) => {
    dispatch(
      setFilters({
        adults,
        children,
        price: currentStay?.price,
      })
    );
  };
  return (
    <div className='listingSection__wrap !space-y-6'>
      <h2 className='text-2xl sm:text-3xl lg:text-4xl font-semibold'>
        {title}
      </h2>

      <div className='flex items-center space-x-4'>
        <span>
          <i className='las la-map-marker-alt'></i>
          <span className='ml-1'>Please select the number of guests</span>
        </span>
      </div>
      <GuestsInput
        onChangeFilters={handleChangeFilters}
        adults={filter.adults}
        children={filter.children}
      />
      <div className='w-full border-b border-neutral-100 dark:border-neutral-700' />
      <div className='flex items-center justify-between xl:justify-start space-x-8 xl:space-x-12 text-sm text-neutral-700 dark:text-neutral-300'>
        <div className='flex items-center space-x-3 '>
          <UserIcon width={20} />
          <span className=''>
            {(filter.adults ?? 0) + (filter.children ?? 0)}{' '}
            <span className='hidden sm:inline-block'>guests</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default SectionStayGuests;
