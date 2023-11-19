import { AppDispatch, RootState } from 'app/store';
import {
  ButtonPrimary,
  ButtonSecondary,
  ImageWithLoading,
} from 'components/common';
import Page404 from 'components/common/PageNotFound';
import StarRating from 'components/common/StarRating';
import { useToast } from 'contexts/ToastContext';
import { cancelBookingAsync } from 'features/booking/bookingSlice';
import GuestsIcon from 'icons/Guests';
import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { goToStaysList } from 'selectors/routes';
import { BookingType, StayType } from 'types';
import { formatDate, formatDateTime } from 'utils/dateFormatters';
import formatCurrency from 'utils/formatCurrency';

export interface PaymentConfirmedPageProps {
  className?: string;
}

const PaymentConfirmedPage: FC<PaymentConfirmedPageProps> = ({
  className = '',
}) => {
  const { code } = useParams<{ code: string }>();
  const currentBooking = useSelector((state: RootState) =>
    state.booking?.confirmedBookings.find(
      (item: BookingType) => item.confirmationCode === code
    )
  );
  const currentStay = useSelector((state: RootState) =>
    state.general.stays.find(
      (item: StayType) => item.id === currentBooking?.stayId
    )
  );
  const { showToast } = useToast();
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  function getNumberOfNights() {
    if (currentBooking) {
      const start = new Date(currentBooking?.startDate);
      start.setHours(0, 0, 0, 0);
      const end = new Date(currentBooking?.endDate);
      end.setHours(0, 0, 0, 0);
      const differenceInMilliseconds = end.getTime() - start.getTime();
      return Math.round(differenceInMilliseconds / (1000 * 60 * 60 * 24));
    }
  }

  const handleCancelBooking = async () => {
    try {
      const actionResult = await dispatch(
        cancelBookingAsync({ id: currentBooking?.id })
      );
      if (cancelBookingAsync.fulfilled.match(actionResult)) {
        showToast('Booking cancelled successfully', 'success');
      } else if (cancelBookingAsync.rejected.match(actionResult)) {
        showToast('Booking cancelled failed. Please try again later.', 'error');
      }
    } catch (error) {
      console.error('Booking failed:', error);
    }
  };

  const renderContent = () => {
    return (
      <div className='w-full flex flex-col sm:rounded-2xl sm:border border-neutral-200 dark:border-neutral-700 space-y-8 px-0 sm:p-6 xl:p-8 font-leagueSpartan'>
        <h2 className='text-3xl lg:text-4xl font-semibold'>
          {currentBooking?.cancellationDate
            ? 'Booking cancelled'
            : location.state?.title ?? 'Booking Confirmed 🎉'}
        </h2>

        <div className='border-b border-neutral-200 dark:border-neutral-700'></div>

        <div className='space-y-6'>
          <h3 className='text-2xl font-semibold'>Your booking</h3>
          <div className='flex flex-col sm:flex-row sm:items-center'>
            <div className='flex-shrink-0 w-full sm:w-40'>
              <div className=' aspect-w-4 aspect-h-3 sm:aspect-h-4 rounded-2xl overflow-hidden'>
                <ImageWithLoading src={currentStay?.galleryImgs[0]} />
              </div>
            </div>
            <div className='pt-5  sm:pb-5 sm:px-5 space-y-3'>
              <div>
                <span className='text-base sm:text-lg font-medium mt-1 block'>
                  {currentStay?.title}
                </span>
                <span className='text-sm text-neutral-500 dark:text-neutral-400 line-clamp-1'>
                  {currentStay?.address}
                </span>
              </div>
              <div className='w-10 border-b border-neutral-200  dark:border-neutral-700'></div>
              <StarRating point={currentStay?.stars} />
            </div>
          </div>
          <div className='mt-6 border border-neutral-200 dark:border-neutral-700 rounded-3xl flex flex-col sm:flex-row divide-y sm:divide-x sm:divide-y-0 divide-neutral-200 dark:divide-neutral-700'>
            <div className='flex-1 p-5 flex space-x-4 items-center'>
              <svg
                className='w-8 h-8 text-neutral-300 dark:text-neutral-6000'
                viewBox='0 0 28 28'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M9.33333 8.16667V3.5M18.6667 8.16667V3.5M8.16667 12.8333H19.8333M5.83333 24.5H22.1667C23.4553 24.5 24.5 23.4553 24.5 22.1667V8.16667C24.5 6.878 23.4553 5.83333 22.1667 5.83333H5.83333C4.54467 5.83333 3.5 6.878 3.5 8.16667V22.1667C3.5 23.4553 4.54467 24.5 5.83333 24.5Z'
                  stroke='#D1D5DB'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>

              <div className='flex flex-col'>
                <span className='text-sm text-neutral-400'>Date</span>
                <span className='mt-1.5 text-lg font-semibold'>
                  {currentBooking &&
                    formatDate(
                      currentBooking?.startDate,
                      currentBooking?.endDate
                    )}
                </span>
              </div>
            </div>
            <div className='flex-1 p-5 flex space-x-4 items-center'>
              <GuestsIcon className='w-4 h-4' />
              <div className='flex flex-col'>
                <span className='text-sm text-neutral-400'>Guests</span>
                <span className='mt-1.5 text-lg font-semibold'>
                  {(currentBooking?.adults ?? 0) +
                    (currentBooking?.children ?? 0)}{' '}
                  Guests
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className='space-y-6'>
          <h3 className='text-2xl font-semibold'>Booking detail</h3>
          <div className='flex flex-col space-y-4'>
            <div className='flex text-neutral-6000 dark:text-neutral-300'>
              <span className='flex-1'>Nights</span>
              <span className='flex-1 font-medium text-neutral-900 dark:text-neutral-100'>
                {getNumberOfNights()}
              </span>
            </div>
            <div className='flex text-neutral-6000 dark:text-neutral-300'>
              <span className='flex-1'>Booking code</span>
              <span className='flex-1 font-medium text-neutral-900 dark:text-neutral-100'>
                {currentBooking?.confirmationCode}
              </span>
            </div>
            <div className='flex text-neutral-6000 dark:text-neutral-300'>
              <span className='flex-1'>Confirmation Date</span>
              <span className='flex-1 font-medium text-neutral-900 dark:text-neutral-100'>
                {currentBooking &&
                  formatDateTime(currentBooking?.confirmationDate)}
              </span>
            </div>
            {currentBooking?.cancellationDate && (
              <div className='flex text-neutral-6000 dark:text-neutral-300'>
                <span className='flex-1'>Cancellation Date</span>
                <span className='flex-1 font-medium text-neutral-900 dark:text-neutral-100'>
                  {currentBooking &&
                    formatDateTime(currentBooking?.cancellationDate)}
                </span>
              </div>
            )}
            <div className='flex text-neutral-6000 dark:text-neutral-300'>
              <span className='flex-1'>Total</span>
              <span className='flex-1 font-medium text-neutral-900 dark:text-neutral-100'>
                {formatCurrency(currentBooking?.totalPrice ?? 0)}
              </span>
            </div>
          </div>
        </div>
        <div className='flex justify-between'>
          {location?.state?.title && (
            <ButtonSecondary
              className='font-semibold'
              onClick={() => window.history.back()}
            >
              Back
            </ButtonSecondary>
          )}
          {location?.state?.title && !currentBooking?.cancellationDate ? (
            <ButtonPrimary onClick={handleCancelBooking}>
              Cancel booking
            </ButtonPrimary>
          ) : !currentBooking?.cancellationDate ? (
            <ButtonPrimary href={goToStaysList()}>
              Explore more stays
            </ButtonPrimary>
          ) : null}
        </div>
      </div>
    );
  };

  return (
    <div className={className}>
      <main className='container mt-11 mb-24 lg:mb-[200px] '>
        <div className='max-w-4xl mx-auto'>
          {currentBooking ? renderContent() : <Page404 />}
        </div>
      </main>
    </div>
  );
};

export default PaymentConfirmedPage;
