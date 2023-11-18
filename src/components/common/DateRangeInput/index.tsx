import { Popover, Transition } from '@headlessui/react';
import { CalendarIcon } from '@heroicons/react/24/outline';
import ClearDataButton from 'components/SearchBar/ClearDataButton';
import { FC, Fragment, useEffect, useState } from 'react';
import DatePicker, { ReactDatePickerCustomHeaderProps } from 'react-datepicker';
import DatePickerCustomDay from './DatePickerCustomDay';
import DatePickerCustomHeaderTwoMonth from './DatePickerCustomHeaderTwoMonth';
import { BlockedDates } from 'types';

interface DateRangeInputProps {
  className?: string;
  fieldClassName?: string;
  highlightFocused?: boolean;
  initialStartDate?: string;
  initialEndDate?: string;
  blockedDates?: BlockedDates[];
  onChangeDate?: (startDate: Date, endDate: Date) => void;
}

interface CustomHeaderProps extends ReactDatePickerCustomHeaderProps {
  date: Date;
  decreaseMonth: () => void;
  increaseMonth: () => void;
  prevMonthButtonDisabled: boolean;
  nextMonthButtonDisabled: boolean;
}

const DateRangeInput: FC<DateRangeInputProps> = ({
  className = '',
  fieldClassName = '[ container-padding ] p-3',
  highlightFocused = true,
  initialStartDate,
  initialEndDate,
  blockedDates = [],
  onChangeDate = () => {},
}) => {
  const [startDate, setStartDate] = useState<Date | null>(
    new Date(initialStartDate || new Date())
  );
  const [endDate, setEndDate] = useState<Date | null>(
    new Date(initialEndDate || new Date())
  );

  useEffect(() => {
    if (initialStartDate && initialEndDate) {
      setStartDate(new Date(initialStartDate));
      setEndDate(new Date(initialEndDate));
    }
  }, [initialStartDate, initialEndDate]);

  const handleChangeDate = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    if (start && end) {
      onChangeDate(start, end);
    }
  };

  const renderInput = () => {
    return (
      <>
        <div className='text-neutral-300 dark:text-neutral-400'>
          <CalendarIcon className='w-5 h-5 lg:w-7 lg:h-7' />
        </div>
        <div className='flex-grow text-left'>
          <span className='block xl:text-lg font-semibold'>
            {startDate?.toLocaleDateString('en-US', {
              month: 'short',
              day: '2-digit',
            })}
            {endDate &&
              ' - ' +
                endDate?.toLocaleDateString('en-US', {
                  month: 'short',
                  day: '2-digit',
                })}
          </span>
          <span className='block mt-1 text-sm text-neutral-400 leading-none font-light'>
            {'Check in - Check out'}
          </span>
        </div>
      </>
    );
  };

  /**
   * @param date
   * @returns
   */
  const isBlocked = (date: Date) => {
    const normalizedDate = new Date(date.setHours(0, 0, 0, 0));
    const isPastDate =
      normalizedDate < new Date(new Date().setHours(0, 0, 0, 0));
    if (isPastDate) {
      return true;
    }

    const blockedIntervals = blockedDates;
    return !blockedIntervals?.some((interval) => {
      const start = new Date(interval.start);
      start.setHours(0, 0, 0, 0);
      const end = new Date(interval.end);
      end.setHours(0, 0, 0, 0);
      date.setHours(0, 0, 0, 0);
      return date >= start && date <= end;
    });
  };

  return (
    <Popover className={`z-11 relative flex ${className}`}>
      {({ open }) => (
        <>
          <Popover.Button
            className={`flex-1 z-20 flex relative ${fieldClassName} items-center space-x-3 focus:outline-none ${
              open && highlightFocused ? 'container-padding-focused' : ''
            }`}
            onClickCapture={() => document.querySelector('html')?.click()}
          >
            {renderInput()}
            {startDate && open && (
              <ClearDataButton onClick={() => console.log('Clear action')} />
            )}
          </Popover.Button>

          <Transition
            as={Fragment}
            enter='transition ease-out duration-200'
            enterFrom='opacity-0 translate-y-1'
            enterTo='opacity-100 translate-y-0'
            leave='transition ease-in duration-150'
            leaveFrom='opacity-100 translate-y-0'
            leaveTo='opacity-0 translate-y-1'
          >
            <Popover.Panel className='absolute left-1/2 z-10 mt-3 top-full w-screen max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl'>
              <div className='overflow-hidden rounded-3xl shadow-lg ring-1 ring-black ring-opacity-5 bg-white dark:bg-neutral-800 p-8'>
                <DatePicker
                  selected={startDate}
                  onChange={handleChangeDate}
                  startDate={startDate}
                  endDate={endDate}
                  selectsRange
                  filterDate={isBlocked}
                  monthsShown={2}
                  showPopperArrow={false}
                  inline
                  renderCustomHeader={(p: CustomHeaderProps) => (
                    <DatePickerCustomHeaderTwoMonth {...p} />
                  )}
                  renderDayContents={(day: number, date: Date) => (
                    <DatePickerCustomDay dayOfMonth={day} date={date} />
                  )}
                />
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default DateRangeInput;
