import DatePickerCustomDay from 'components/common/DateRangeInput/DatePickerCustomDay';
import DatePickerCustomHeaderTwoMonth from 'components/common/DateRangeInput/DatePickerCustomHeaderTwoMonth';
import { BlockedDates } from 'types';
import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';

interface SectionDateRangeProps {
  startDate?: Date;
  endDate?: Date;
  blockedDates?: BlockedDates[];
  onChangeDate?: (startDate: Date, endDate: Date) => void;
}

const SectionDateRange = ({
  startDate,
  endDate,
  blockedDates = [],
  onChangeDate = () => {},
}: SectionDateRangeProps) => {
  const [currentStartDate, setCurrentStartDate] = useState<Date | null>();
  const [currentEndDate, setCurrentEndDate] = useState<Date | null>();

  useEffect(() => {
    if (startDate && endDate) {
      setCurrentStartDate(startDate);
      setCurrentEndDate(endDate);
    }
  }, [startDate, endDate]);

  const handleChangeDate = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setCurrentStartDate(start);
    setCurrentEndDate(end);

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

  const renderSectionCheckIndate = () => {
    return (
      <div className='listingSection__wrap overflow-hidden'>
        <div>
          <h2 className='text-2xl font-semibold'>Availability</h2>
          <span className='block mt-2 text-neutral-500 dark:text-neutral-400'>
            Prices may vary depending on the day and time of the booking
          </span>
        </div>
        <div className='w-14 border-b border-neutral-200 dark:border-neutral-700'></div>

        <div className=''>
          <DatePicker
            selected={currentStartDate}
            onChange={handleChangeDate}
            startDate={currentStartDate}
            endDate={currentEndDate}
            filterDate={isBlocked}
            selectsRange
            monthsShown={2}
            showPopperArrow={false}
            inline
            renderCustomHeader={(p) => (
              <DatePickerCustomHeaderTwoMonth {...p} />
            )}
            renderDayContents={(day, date) => (
              <DatePickerCustomDay dayOfMonth={day} date={date} />
            )}
          />
        </div>
      </div>
    );
  };

  return renderSectionCheckIndate();
};

export default SectionDateRange;
