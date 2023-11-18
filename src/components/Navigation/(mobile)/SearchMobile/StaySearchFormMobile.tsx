import { FC, useEffect, useState } from 'react';
import GuestsInput from './GuestsInput';
import LocationInput from './LocationInput';
import SearchMobileDateRange from './SearchMobileDateRangeProps';
import { useDispatch } from 'react-redux';
import { setFilters } from 'features/booking/bookingSlice';
import { useSelector } from 'react-redux';
import { RootState } from 'app/store';
import { useParams } from 'react-router-dom';
import { formatDate } from 'utils/dateFormatters';
import { StayType } from 'types';

interface StaySearchFormMobileProps {
  onCloseModal: () => void;
}

const StaySearchFormMobile: FC<StaySearchFormMobileProps> = ({
  onCloseModal,
}) => {
  const [fieldNameShow, setFieldNameShow] = useState('location');
  const [locationInputTo, setLocationInputTo] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const dispatch = useDispatch();
  const filter = useSelector((state: RootState) => state.booking?.filter);
  const { id } = useParams<{ id: string }>();
  const currentStay = useSelector((state: RootState) =>
    state.general.stays.find((item: StayType) => item.id === id)
  );
  const blockedDates = useSelector(
    (state: RootState) => state.booking?.blockedDates
  );

  useEffect(() => {
    const { startDate, endDate } = filter;
    if (startDate && endDate) {
      setStartDate(startDate);
      setEndDate(endDate);
    }
  }, [filter?.startDate, filter?.endDate]);

  // const handleChangeDate = (dates: [Date | null, Date | null]) => {
  //   const [start, end] = dates;
  //   setStartDate(start);
  //   setEndDate(end);
  //   if (start && end) {
  //     onChangeDate(start, end);
  //   }
  // };

  const handleChangeGuests = (adults: number, children: number) => {
    dispatch(setFilters({ guestAdults: adults, guestChildren: children }));
  };

  const handleChangeLocation = (value: string) => {
    setLocationInputTo(value);
  };

  const handleChangeDate = (startDate: Date, endDate: Date) => {
    const startDateString = startDate.toISOString();
    const endDateString = endDate.toISOString();
    dispatch(
      setFilters({
        startDate: startDateString,
        endDate: endDateString,
        price: currentStay?.price,
      })
    );
  };

  const renderInputLocation = () => {
    const isActive = fieldNameShow === 'location';
    return (
      <div
        className={`w-full bg-white dark:bg-neutral-800 ${
          isActive
            ? 'rounded-2xl shadow-lg'
            : 'rounded-xl shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)]'
        }`}
      >
        {!isActive ? (
          <button
            className={`w-full flex justify-between text-sm font-medium p-4`}
            onClick={() => setFieldNameShow('location')}
          >
            <span className='text-neutral-400'>Where</span>
            <span>{locationInputTo || 'Location'}</span>
          </button>
        ) : (
          <LocationInput
            onChange={handleChangeLocation}
            onClick={() => setFieldNameShow('dates')}
          />
        )}
      </div>
    );
  };

  const renderInputDates = () => {
    const isActive = fieldNameShow === 'dates';

    return (
      <div
        className={`w-full bg-white dark:bg-neutral-800 overflow-hidden ${
          isActive
            ? 'rounded-2xl shadow-lg'
            : 'rounded-xl shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)]'
        }`}
      >
        {!isActive ? (
          <button
            className={`w-full flex justify-between text-sm font-medium p-4  `}
            onClick={() => setFieldNameShow('dates')}
          >
            <span className='text-neutral-400'>When</span>
            <span>
              {startDate ? `${formatDate(startDate, endDate)}` : 'Add date'}
            </span>
          </button>
        ) : (
          <SearchMobileDateRange
            onChangeDate={handleChangeDate}
            blockedDates={blockedDates.filter((item) => item.stayId === id)}
            initialStartDate={filter?.startDate}
            initialEndDate={filter?.endDate}
          />
        )}
      </div>
    );
  };

  const renderInputGuests = () => {
    const isActive = fieldNameShow === 'guests';

    return (
      <div
        className={`w-full bg-white dark:bg-neutral-800 overflow-hidden ${
          isActive
            ? 'rounded-2xl shadow-lg'
            : 'rounded-xl shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)]'
        }`}
      >
        {!isActive ? (
          <button
            className={`w-full flex justify-between text-sm font-medium p-4`}
            onClick={() => setFieldNameShow('guests')}
          >
            <span className='text-neutral-400'>Who</span>
            <span>
              {`${filter?.guestAdults + filter?.guestChildren} guests` ||
                `Add guests`}
            </span>
          </button>
        ) : (
          <GuestsInput
            onChangeFilters={handleChangeGuests}
            guestAdults={filter?.guestAdults}
            guestChildren={filter?.guestChildren}
          />
        )}
      </div>
    );
  };

  return (
    <div>
      <div className='w-full space-y-5'>
        {renderInputLocation()}
        {renderInputDates()}
        {renderInputGuests()}
      </div>
    </div>
  );
};

export default StaySearchFormMobile;
