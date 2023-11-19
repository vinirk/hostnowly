import DatePickerCustomDay from 'components/common/DateRangeInputPopover/DatePickerCustomDay';
import DatePickerCustomHeaderTwoMonth from 'components/common/DateRangeInputPopover/DatePickerCustomHeaderTwoMonth';
import { FC, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { BlockedDates } from 'types';

export interface SearchMobileDateRangeProps {
  className?: string;
  initialStartDate?: string;
  initialEndDate?: string;
  blockedDates?: BlockedDates[];
  onChangeDate?: (startDate: Date, endDate: Date) => void;
}

const SearchMobileDateRange: FC<SearchMobileDateRangeProps> = ({
  className = '',
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
    <div>
      <div className='p-5'>
        <span className='block font-semibold text-xl sm:text-2xl'>
          {` When's your trip?`}
        </span>
      </div>
      <div
        className={`relative w-full block xl:flex justify-center z-10 py-5 ${className} `}
      >
        <DatePicker
          selected={startDate}
          onChange={handleChangeDate}
          startDate={startDate}
          endDate={endDate}
          filterDate={isBlocked}
          selectsRange
          readOnly
          monthsShown={2}
          showPopperArrow={false}
          inline
          renderCustomHeader={(p) => <DatePickerCustomHeaderTwoMonth {...p} />}
          renderDayContents={(day, date) => (
            <DatePickerCustomDay dayOfMonth={day} date={date} />
          )}
        />
      </div>
    </div>
  );
};

export default SearchMobileDateRange;
