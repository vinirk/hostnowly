import DatePickerCustomDay from 'components/common/DateRangeInputPopover/DatePickerCustomDay';
import DatePickerCustomHeaderTwoMonth from 'components/common/DateRangeInputPopover/DatePickerCustomHeaderTwoMonth';
import { BlockedDates } from 'types';
import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';

interface SectionDateRangeProps {
  startDate?: string;
  endDate?: string;
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
    console.log('startDate', startDate);
    if (startDate && endDate) {
      setCurrentStartDate(new Date(startDate));
      setCurrentEndDate(new Date(endDate));
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
    // Normaliza a data recebida para meia-noite
    const normalizedDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );

    // Verifica se a data está dentro de algum intervalo de datas bloqueadas
    return blockedDates?.some((interval) => {
      const start = new Date(interval.start);
      start.setHours(0, 0, 0, 0);
      const end = new Date(interval.end);
      end.setHours(23, 59, 59, 999); // Ajusta para o final do dia
      return normalizedDate >= start && normalizedDate <= end;
    });
  };

  const handleBlockedDate = (blockedDates: BlockedDates[]) => {
    return blockedDates?.map((interval) => {
      const start = new Date(interval.start);
      start.setHours(0, 0, 0, 0);

      const end = new Date(interval.end);
      end.setHours(23, 59, 59, 999);

      return {
        start,
        end,
      };
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
            minDate={new Date()}
            excludeDateIntervals={blockedDates.map((interval) => ({
              start: new Date(interval.start),
              end: new Date(interval.end),
            }))}
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
