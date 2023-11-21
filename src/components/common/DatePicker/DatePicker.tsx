import { useEffect, useMemo, useState } from "react";
import ReactDatePicker, {
  ReactDatePickerCustomHeaderProps,
} from "react-datepicker";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "app/store";
import { useFilterChange } from "hooks/useFilterChange";
import {
  makeGetStayById,
  selectBlockedDatesByStayId,
} from "selectors/bookingSelectors";
import DatePickerCustomDay from "../DateRangeInputPopover/DatePickerCustomDay";
import DatePickerCustomHeaderTwoMonth from "../DateRangeInputPopover/DatePickerCustomHeaderTwoMonth";

interface DateRangePickerProps {
  resetKey?: React.Key;
  onChange?: (dates: [Date | null, Date | null]) => void | undefined;
  startDate?: Date | undefined;
  endDate?: Date | undefined;
}

const DatePicker = ({
  resetKey = "",
  onChange = undefined,
  startDate = undefined,
  endDate = undefined,
}: DateRangePickerProps) => {
  const { id } = useParams<{ id: string }>();
  const handleChangeFilter = useFilterChange();
  const filter = useSelector((state: RootState) => state.filters);

  const startDateMemo = useMemo(
    () => (filter.startDate ? new Date(filter.startDate) : undefined),
    [filter.startDate],
  );
  const endDateMemo = useMemo(
    () => (filter.endDate ? new Date(filter.endDate) : undefined),
    [filter.endDate],
  );

  const selector = makeGetStayById();
  const stay = useSelector((state: RootState) => id && selector(state, { id }));
  const price = stay ? stay.price : undefined;

  const blockedDateIntervals = useSelector(selectBlockedDatesByStayId(id));

  const [currentStartDate, setCurrentStartDate] = useState<Date | null>();
  const [currentEndDate, setCurrentEndDate] = useState<Date | null>();
  /**
   * Use effect to set current start and end date
   */
  useEffect(() => {
    if (startDateMemo && endDateMemo) {
      setCurrentStartDate(new Date(startDateMemo));
      setCurrentEndDate(new Date(endDateMemo));
    }
  }, [startDateMemo, endDateMemo]);

  const handleChangeDate = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setCurrentStartDate(start);
    setCurrentEndDate(end);
    if (start && end) {
      handleChangeFilter({
        startDate: start ? start.toISOString() : undefined,
        endDate: end ? end.toISOString() : undefined,
        price,
      });
    }
  };

  const handleChange = onChange || handleChangeDate;
  const startDateValue = startDate || currentStartDate;
  const endDateValue = endDate || currentEndDate;

  return (
    <div>
      <ReactDatePicker
        key={resetKey}
        selected={startDateValue}
        onChange={handleChange}
        startDate={startDateValue}
        endDate={endDateValue}
        selectsRange
        minDate={new Date()}
        monthsShown={2}
        excludeDateIntervals={blockedDateIntervals || undefined}
        showPopperArrow={false}
        inline
        renderCustomHeader={(p: ReactDatePickerCustomHeaderProps) => (
          <DatePickerCustomHeaderTwoMonth {...p} />
        )}
        renderDayContents={(day: number, date: Date) => (
          <DatePickerCustomDay dayOfMonth={day} date={date} />
        )}
      />
    </div>
  );
};

export default DatePicker;
