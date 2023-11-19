import { RootState } from 'app/store';
import { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { formatDate } from 'utils/dateFormatters';
import GuestsInput from '../../../common/GuestsInput/GuestsInput';
import LocationInput from './LocationInput';
import SearchMobileDateRange from './SearchMobileDateRangeProps';
import { useFilterChange } from 'hooks/useFilterChange';

interface StaySearchFormMobileProps {
  onCloseModal: () => void;
}

const StaySearchFormMobile: FC<StaySearchFormMobileProps> = () => {
  const { id } = useParams<{ id: string }>();
  const [fieldNameShow, setFieldNameShow] = useState('location');
  const filter = useSelector((state: RootState) => state.filters);
  const blockedDates = useSelector(
    (state: RootState) => state.booking?.blockedDates
  );
  const handleChangeFilter = useFilterChange();

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
            <span>{filter?.location || 'Location'}</span>
          </button>
        ) : (
          <LocationInput
            onChange={(location) => handleChangeFilter({ location })}
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
              {filter?.startDate
                ? `${formatDate(filter?.startDate, filter?.endDate)}`
                : 'Add date'}
            </span>
          </button>
        ) : (
          <SearchMobileDateRange
            blockedDates={blockedDates.filter((item) => item.stayId === id)}
            initialStartDate={filter?.startDate}
            initialEndDate={filter?.endDate}
            onChangeDate={(startDate, endDate) =>
              handleChangeFilter({
                startDate: startDate.toISOString(),
                endDate: endDate.toISOString(),
              })
            }
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
              {`${(filter?.adults ?? 0) + (filter?.children ?? 0)} guests` ||
                `Add guests`}
            </span>
          </button>
        ) : (
          <GuestsInput
            adults={filter?.adults}
            children={filter?.children}
            onChangeFilters={(adults, children) =>
              handleChangeFilter({ adults, children })
            }
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
