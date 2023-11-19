import { AppDispatch, RootState } from 'app/store';
import GuestsInput from 'components/GuestsInputPopover';
import StarRating from 'components/common/StarRating';
import ButtonPrimary from 'components/common/Button/ButtonPrimary';
import DateRangeInput from 'components/common/DateRangeInputPopover/DateRangeInputPopover';
import { useToast } from 'contexts/ToastContext';
import { confirmBookingAsync } from 'features/booking/bookingSlice';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { goToConfirmedPayment } from 'selectors/routes';
import formatCurrency from 'utils/formatCurrency';
import { setFilters } from 'features/filters/filtersSlice';

interface SiderbarDetailPageProps {
  stayId?: string;
  price?: number;
  stars?: number;
}

const SidebarStayDetai: React.FC<SiderbarDetailPageProps> = ({
  stayId,
  price,
  stars,
}) => {
  const filter = useSelector((state: RootState) => state.filters);
  const bookingDetail = useSelector(
    (state: RootState) => state.booking?.detail
  );
  const blockedDates = useSelector(
    (state: RootState) => state.booking?.blockedDates
  );
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { showToast } = useToast();

  useEffect(() => {
    handleChangeFilters(filter?.adults ?? 0, filter?.children || 0);
  }, [filter?.adults, filter?.children]);

  /**
   *  Handle change guest adults and children filter
   * @param adults
   * @param children
   */
  const handleChangeFilters = (adults: number, children: number) => {
    dispatch(
      setFilters({
        adults,
        children,
        price: price,
      })
    );
  };

  /**
   *  Handle change date filter
   * @param startDate
   * @param endDate
   */
  const handleChangeDate = (startDate: Date, endDate: Date) => {
    dispatch(
      setFilters({
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        price,
      })
    );
  };

  /**
   * Handle confirm booking
   */
  const handleConfirmBooking = async () => {
    try {
      const actionResult = await dispatch(confirmBookingAsync({ stayId }));
      if (confirmBookingAsync.fulfilled.match(actionResult)) {
        console.log(actionResult, stayId)
        navigate(goToConfirmedPayment(actionResult.payload.confirmationCode));
        showToast('Booking successful! Your reservation has been confirmed.');
      } else if (confirmBookingAsync.rejected.match(actionResult)) {
        console.error('Booking failed:', actionResult.payload);
        showToast(
          'The selected dates overlap with an existing booking. Please choose different dates.',
          'error'
        );
      }
    } catch (error) {
      console.error('Booking failed:', error);
    }
  };

  return (
    <div className='listingSectionSidebar__wrap shadow-xl'>
      <div className='flex justify-between'>
        <span className='text-3xl font-semibold'>
          {formatCurrency(price ?? 0)}
          <span className='ml-1 text-xl font-normal text-neutral-500 dark:text-neutral-400'>
            /night
          </span>
        </span>
        <StarRating point={stars} />
      </div>

      <form className='flex flex-col border border-neutral-200 dark:border-neutral-700 rounded-3xl '>
        <DateRangeInput
          highlightFocused={false}
          startDate={filter?.startDate}
          endDate={filter?.endDate}
          onChangeDate={handleChangeDate}
          blockedDates={blockedDates.filter((item) => item.stayId === stayId)}
        />
        <div className='w-full border-b border-neutral-200 dark:border-neutral-700'></div>
        <GuestsInput
          highlightFocused={false}
          className='flex-1'
          adults={filter?.adults}
          children={filter?.children}
          onChangeFilters={handleChangeFilters}
        />
      </form>

      <div className='flex flex-col space-y-4'>
        <div className='flex justify-between text-neutral-6000 dark:text-neutral-300 font-semibold'>
          <span>
            {formatCurrency(price ?? 0)} x {Math.round(bookingDetail?.nights)}{' '}
            {bookingDetail?.nights <= 1 ? 'night' : 'nights'}
          </span>
          <span>{formatCurrency(bookingDetail?.subtotal)}</span>
        </div>
        <div className='flex justify-between ml-3 text-sm text-neutral-6000 dark:text-neutral-300'>
          <span>{filter?.adults} x Adults</span>
          <span>{formatCurrency(bookingDetail?.subtotalAdults)}</span>
        </div>
        <div className='flex justify-between ml-3 text-sm text-neutral-6000 dark:text-neutral-300'>
          <span>{filter?.children} x Children (-50%)</span>
          <span>{formatCurrency(bookingDetail?.subtotalChildren)}</span>
        </div>
        <div className='flex justify-between text-neutral-6000 dark:text-neutral-300'>
          <span>Sub total</span>
          <span>{formatCurrency(bookingDetail?.subtotal)}</span>
        </div>
        <div className='flex justify-between text-neutral-6000 dark:text-neutral-300'>
          <span>Service fee (10%)</span>
          <span>{formatCurrency(bookingDetail?.serviceFee)}</span>
        </div>
        <div className='border-b border-neutral-200 dark:border-neutral-700'></div>
        <div className='flex justify-between font-semibold'>
          <span>Total (USD)</span>
          <span>
            {formatCurrency(
              bookingDetail?.subtotal + bookingDetail?.serviceFee
            )}
          </span>
        </div>
      </div>

      <ButtonPrimary
        disabled={bookingDetail?.nights === 0}
        onClick={handleConfirmBooking}
      >
        Book now
      </ButtonPrimary>
    </div>
  );
};

export default SidebarStayDetai;
