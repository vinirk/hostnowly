'use client';

import { RootState } from 'app/store';
import GuestsInput from 'components/GuestsInputPopover';
import ButtonSubmit from 'components/common/Button/ButtonSubmit';
import DateRangeInput from 'components/common/DateRangeInput';
import { setFilters } from 'features/booking/bookingSlice';
import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LocationInput from './LocationInput';

export interface SearchBarProps {
  className?: string;
  location?: string;
  startDate?: Date;
  endDate?: Date;
  guestAdults?: number;
  guestChildren?: number;
}

const SearchBar: FC<SearchBarProps> = ({ className = '' }) => {
  const dispatch = useDispatch();
  const filter = useSelector((state: RootState) => state.booking?.filter);

  const handleChangeFilters = (adults: number, children: number) => {
    dispatch(setFilters({ guestAdults: adults, guestChildren: children }));
  };

  const handleChangeDate = (startDate: Date, endDate: Date) => {
    const startDateString = startDate.toISOString();
    const endDateString = endDate.toISOString();
    dispatch(
      setFilters({ startDate: startDateString, endDate: endDateString })
    );
  };

  // useEffect(() => {
  //   dispatch(setFilters({ guestAdults: 4, childrenGuests: 1 }));
  // }, [dispatch]);

  return (
    <div
      className={`w-full max-w-6xl flex items-center justify-center opacity-90 ${className}`}
    >
      <form className='w-full relative flex rounded-full shadow-xl dark:shadow-2xl bg-white dark:bg-neutral-800 '>
        <LocationInput className='flex-[1.5]' />
        <div className='self-center border-r border-slate-200 dark:border-slate-700 h-8'></div>
        <DateRangeInput
          initialStartDate={filter?.startDate}
          initialEndDate={filter?.endDate}
          className='flex-1'
          onChangeDate={handleChangeDate}
        />
        <div className='self-center border-r border-slate-200 dark:border-slate-700 h-8'></div>
        <GuestsInput
          className='flex-1'
          guestAdults={filter?.guestAdults}
          guestChildren={filter?.guestChildren}
          onChangeFilters={handleChangeFilters}
        />
        <div className='flex items-center mx-3'>
          <ButtonSubmit href='/featured-stays' />
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
