import { MapPinIcon } from '@heroicons/react/24/solid';
import { RootState } from 'app/store';
import { BookingType, StayType } from 'types';
import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import formatCurrency from 'utils/formatCurrency';
import { formatDate } from 'utils/dateFormatters';
import { goToConfirmedPayment } from 'selectors/routes';
import { Badge, Button, ImageWithLoading } from 'components/common';
import StarRating from 'components/common/StarRating';

export interface MyBookingsPageProps {
  className?: string;
}

type BookingWithStayInfo = BookingType & { stay: StayType | undefined };

const MyBookingsPage: FC<MyBookingsPageProps> = ({
  className = 'flex-1 h-full',
}) => {
  const navigate = useNavigate();
  const [myBookings, setMyBookings] = React.useState<BookingWithStayInfo[]>([]);

  const confirmedBookings = useSelector(
    (state: RootState) => state.booking?.confirmedBookings
  );
  const listings = useSelector((state: RootState) => state.general.stays);

  useEffect(() => {
    if (confirmedBookings) {
      const myBookingsWithStayInfo: BookingWithStayInfo[] =
        confirmedBookings.map((booking) => {
          const stayInfo = listings.find((stay) => stay.id === booking.stayId);
          return {
            ...booking,
            stay: stayInfo,
          };
        });
      setMyBookings(myBookingsWithStayInfo);
    }
  }, [confirmedBookings, listings]);

  const getCurrentBooking = (stayId: string) => {
    return myBookings?.find((booking) => booking.stayId === stayId);
  };

  /**
   *
   * @param stayId
   */
  const handleGoToDetail = (code: string, params: {}) => {
    navigate(goToConfirmedPayment(code || ''), params);
  };

  function getNumberOfNights(id: string) {
    const booking = getCurrentBooking(id);
    if (booking) {
      const start = new Date(booking?.startDate);
      start.setHours(0, 0, 0, 0);
      const end = new Date(booking?.endDate);
      end.setHours(0, 0, 0, 0);
      const differenceInMilliseconds = end.getTime() - start.getTime();
      return Math.round(differenceInMilliseconds / (1000 * 60 * 60 * 24));
    }
  }

  const renderContent = (booking: BookingWithStayInfo) => {
    return (
      <div
        onClick={() =>
          handleGoToDetail(booking?.stayId, {
            state: { title: 'Payment receipt' },
          })
        }
        className='p-4 space-y-4 cursor-pointer'
      >
        {booking?.cancellationDate && (
          <div className='absolute top-0 right-0 bg-red-500 rounded-bl-2xl'>
            <Badge
              text={`Cancelled at ${formatDate(booking.cancellationDate)}`}
            />
          </div>
        )}

        <div className='flex row justify-between items-center'>
          <div className='space-y-2'>
            <div className='flex items-center space-x-2'>
              <h2 className={` font-medium capitalize text-lg`}>
                <span className='line-clamp-1'>{booking?.stay?.title}</span>
              </h2>
            </div>
            <div className='flex items-center text-neutral-500 dark:text-neutral-400 text-sm space-x-2'>
              <div className='min-w-[20px]'>
                <MapPinIcon />
              </div>
              <span className=''>{booking?.stay?.address}</span>
            </div>
          </div>
        </div>
        <div className='w-14 border-b border-neutral-100 dark:border-neutral-800'></div>

        <div className='flex items-start justify-between'>
          <div className='text-xl font-semibold'>
            <span className='block '>
              {formatCurrency(booking.stay?.price || 0)} USD
              <span className='ml-1 text-sm font-normal text-neutral-500 dark:text-neutral-400'>
                x {getNumberOfNights(booking?.id)} nights
              </span>
            </span>

            <div className='text-sm'>
              {formatDate(booking?.startDate || '', booking?.endDate || '')}
            </div>
          </div>
          <div className='text-lg font-semibold'>
            <div className='flex flex-col text-sm items-start justify-center'>
              <span>
                {(booking?.adults ?? 0) + (booking?.children ?? 0)}{' '}
                <span className='ml-1 text-sm font-normal text-neutral-500 dark:text-neutral-400'>
                  guests
                </span>
              </span>
            </div>
          </div>
        </div>

        <div className='flex justify-between items-center'>
          <span className='text-base font-semibold'>
            <span className='block '>
              <span>{formatCurrency(booking?.totalPrice ?? 0)}</span>
              <span className='ml-1 text-sm font-normal text-neutral-500 dark:text-neutral-400'>
                total
              </span>
            </span>
          </span>
          {!!booking?.stay?.stars && (
            <StarRating
              reviewCount={booking.stay.reviewCount}
              point={booking.stay.stars}
            />
          )}
        </div>
      </div>
    );
  };

  return (
    <div className={`${className}`}>
      {confirmedBookings?.length > 0 ? (
        <div className='w-full flex flex-col sm:rounded-2xl space-y-8 px-0 sm:p-6 xl:p-8'>
          <h2 className='text-3xl lg:text-2xl font-leagueSpartan'>
            Booking history
          </h2>

          <div className='border-b border-neutral-200 dark:border-neutral-700'></div>

          <div className='grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {myBookings.map((booking: BookingWithStayInfo) => (
              <div
                key={booking?.id}
                // onClick={() => console.log(booking?.confirmationCode)}
                onClick={() =>
                  handleGoToDetail(booking?.confirmationCode, {
                    state: { title: 'Payment receipt  🧾' },
                  })
                }
                className={`group relative cursor-pointer bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-2xl overflow-hidden will-change-transform hover:shadow-xl transition-shadow ${className}`}
              >
                <div className={`relative group overflow-hidden`}>
                  <div className={`block aspect-w-4 aspect-h-3`}>
                    <ImageWithLoading src={booking?.stay?.galleryImgs?.[0]} />
                  </div>
                </div>
                {renderContent(booking)}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className='flex flex-col items-center gap-10'>
          <span className='block text-[20px] text-center mt-16 font-semibold text-neutral-800 dark:text-neutral-200 tracking-wider'>
            No bookings found. Browse our destinations to begin your journey.
          </span>
          <Button href='/featured-stays'>Go to featured stays</Button>
        </div>
      )}
    </div>
  );
};

export default MyBookingsPage;
