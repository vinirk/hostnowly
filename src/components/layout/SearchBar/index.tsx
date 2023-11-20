import { RootState } from 'app/store';
import GuestsInput from 'components/layout/GuestsInputPopover/GuestsInputPopover';
import ButtonSubmit from 'components/common/Button/ButtonSubmit';
import DateRangeInput from 'components/common/DateRangeInputPopover/DateRangeInputPopover';
import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LocationInput from './LocationInput';
import { setFilters } from 'features/filters/filtersSlice';

export interface SearchBarProps {
  className?: string;
  location?: string;
  startDate?: Date;
  endDate?: Date;
  adults?: number;
  children?: number;
}

const SearchBar: FC<SearchBarProps> = ({ className = '' }) => {
  const dispatch = useDispatch();
  const filter = useSelector((state: RootState) => state.filters);

  const handleChangeFilters = (adults: number, children: number) => {
    dispatch(setFilters({ adults, children }));
  };

  const handleChangeDate = (startDate: Date, endDate: Date) => {
    dispatch(
      setFilters({
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      })
    );
  };

  return (
    <div
      className={`w-full max-w-6xl flex items-center justify-center opacity-90 ${className}`}
    >
      <form className='w-full relative flex rounded-full shadow-xl dark:shadow-2xl bg-white dark:bg-neutral-800 '>
        <LocationInput className='flex-[1.5]' />
        <div className='self-center border-r border-slate-200 dark:border-slate-700 h-8'></div>
        <DateRangeInput
          startDate={filter?.startDate}
          endDate={filter?.endDate}
          className='flex-1'
          onChangeDate={handleChangeDate}
        />
        <div className='self-center border-r border-slate-200 dark:border-slate-700 h-8'></div>
        <GuestsInput
          className='flex-1'
          adults={filter?.adults}
          children={filter?.children}
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
