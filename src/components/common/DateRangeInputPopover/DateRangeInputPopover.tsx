import { Popover, Transition } from '@headlessui/react';
import { CalendarIcon } from '@heroicons/react/24/outline';
import ClearDataButton from 'components/SearchBar/ClearDataButton';
import { useFilterChange } from 'hooks/useFilterChange';
import { FC, Fragment } from 'react';
import DatePicker, { ReactDatePickerCustomHeaderProps } from 'react-datepicker';
import { BlockedDates } from 'types';
import DatePickerCustomDay from './DatePickerCustomDay';
import DatePickerCustomHeaderTwoMonth from './DatePickerCustomHeaderTwoMonth';

interface DateRangeInputPopoverProps {
  className?: string;
  fieldClassName?: string;
  highlightFocused?: boolean;
  startDate?: string;
  endDate?: string;
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

const DateRangeInputPopover: FC<DateRangeInputPopoverProps> = ({
  className = '',
  fieldClassName = '[ container-padding ] p-3',
  highlightFocused = true,
  startDate,
  endDate,
  blockedDates = [],
}) => {
  const handleChangeFilter = useFilterChange();
  const convertedStartDate = startDate ? new Date(startDate) : undefined;
  const convertedEndDate = endDate ? new Date(endDate) : undefined;

  const renderInput = () => {
    return (
      <>
        <div className='text-neutral-300 dark:text-neutral-400'>
          <CalendarIcon className='w-5 h-5 lg:w-7 lg:h-7' />
        </div>
        <div className='flex-grow text-left'>
          <span className='block xl:text-lg font-semibold'>
            {startDate &&
              new Date(startDate).toLocaleDateString('en-US', {
                month: 'short',
                day: '2-digit',
              })}
            {endDate &&
              ' - ' +
                new Date(endDate).toLocaleDateString('en-US', {
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
                  selected={convertedStartDate}
                  onChange={(start, end) =>
                    handleChangeFilter({
                      startDate: convertedStartDate?.toISOString(),
                      endDate: convertedEndDate?.toISOString(),
                    })
                  }
                  startDate={convertedStartDate}
                  endDate={convertedEndDate}
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

export default DateRangeInputPopover;
