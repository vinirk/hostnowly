import { MapPinIcon } from "@heroicons/react/24/solid";
import { FC, useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "app/store";
import { Badge, ButtonSecondary, ImageWithLoading } from "components/common";
import StarRating from "components/common/StarRating";
import { goToBookingHistoryDetailsByCode, goToStays } from "selectors/routes";
import { BookingType, StayType } from "types";
import { getNumberOfNights } from "utils/bookingOperations";
import { formatDate } from "utils/dateFormatters";
import formatCurrency from "utils/formatCurrency";

export interface BookingHistoryPageProps {
  className?: string;
}

type BookingWithStayInfo = BookingType & { stay: StayType | undefined };

const BookingHistoryPage: FC<BookingHistoryPageProps> = ({
  className = "flex-1 h-full",
}) => {
  const navigate = useNavigate();
  const confirmedBookings = useSelector(
    (state: RootState) => state.booking?.confirmedBookings,
  );
  const stays = useSelector((state: RootState) => state.stays.items);

  /**
   * Creates an array of booking objects with corresponding stay information included.
   * Each booking in `confirmedBookings` is combined with the `stay` object that matches its `stayId`.
   * This is achieved by mapping over `confirmedBookings` and appending the matching `stay` object to each booking.
   * The `useMemo` hook is used to memoize the result to avoid expensive recalculations when the component re-renders.
   * This calculation only runs when `confirmedBookings` or `stays` arrays change, which is ensured by their inclusion in the dependency array of `useMemo`.
   *
   * @returns {BookingWithStayInfo[]} An array of bookings, each enhanced with the detailed information of the corresponding stay.
   */
  const myBookingsWithStayInfo = useMemo(
    () =>
      confirmedBookings.map((booking) => ({
        ...booking,
        stay: stays.find((stay) => stay.id === booking.stayId),
      })),
    [confirmedBookings, stays],
  );

  /**
   * Handles the navigation to the payment receipt page for a specific booking.
   *
   * @param {string} code - The confirmation code associated with the booking.
   * @param {object} params - Additional navigation parameters (optional).
   */
  const handleGoToDetail = (code: string) => {
    navigate(goToBookingHistoryDetailsByCode(code || ""));
  };

  const renderContent = (booking: BookingWithStayInfo) => {
    return (
      <div
        // onClick={() => handleGoToDetail(booking?.stayId)}
        className="p-4 space-y-4 cursor-pointer"
      >
        {booking?.cancellationDate && (
          <div className="absolute top-0 right-0 p-2 bg-primary-400/50 rounded-bl-2xl">
            <Badge
              className="font-medium text-[14px] text-black"
              text={`Canceled ${formatDate(booking.cancellationDate)}`}
            />
          </div>
        )}

        <div className="flex row justify-between items-center">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <h2 className={` font-medium capitalize text-lg`}>
                <span className="line-clamp-1">{booking?.stay?.title}</span>
              </h2>
            </div>
            <div className="flex items-center text-neutral-500 dark:text-neutral-400 text-sm space-x-2">
              <div className="min-w-[20px]">
                <MapPinIcon />
              </div>
              <span className="">{booking?.stay?.address}</span>
            </div>
          </div>
        </div>
        <div className="w-14 border-b border-neutral-100 dark:border-neutral-800"></div>

        <div className="flex items-start justify-between">
          <div className="text-xl font-semibold">
            <span className="block ">
              {formatCurrency(booking.stay?.price || 0)}
              <span className="ml-1 text-sm font-normal text-neutral-500 dark:text-neutral-400">
                x {getNumberOfNights(booking?.startDate, booking?.endDate)}{" "}
                nights
              </span>
            </span>

            <div className="text-sm">
              {formatDate(booking?.startDate || "", booking?.endDate || "")}
            </div>
          </div>
          <div className="text-lg font-semibold">
            <div className="flex flex-col text-sm items-start justify-center">
              <span>
                {(booking?.adults ?? 0) + (booking?.children ?? 0)}{" "}
                <span className="ml-1 text-sm font-normal text-neutral-500 dark:text-neutral-400">
                  guests
                </span>
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-base font-semibold">
            <span className="block ">
              <span>{formatCurrency(booking?.totalPrice ?? 0)}</span>
              <span className="ml-1 text-sm font-normal text-neutral-500 dark:text-neutral-400">
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
        <div className="w-full flex flex-col sm:rounded-2xl space-y-8 px-0 sm:p-6 xl:p-8">
          <h2 className="text-3xl lg:text-2xl font-leagueSpartan">
            Booking history
          </h2>

          <div className="border-b border-neutral-200 dark:border-neutral-700"></div>

          <div className="grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {myBookingsWithStayInfo.map((booking: BookingWithStayInfo) => (
              <div
                key={booking?.id}
                onClick={() => handleGoToDetail(booking?.confirmationCode)}
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
        <main className="container mt-11 mb-24 lg:mb-[200px] ">
          <div className="flex flex-col items-center gap-10">
            <span className="block text-[20px] text-center font-semibold text-neutral-800 dark:text-neutral-200 tracking-wider">
              No bookings found. Browse our destinations to begin your journey.
            </span>
            <ButtonSecondary href={goToStays()}>
              Check available stays
            </ButtonSecondary>
          </div>
        </main>
      )}
    </div>
  );
};

export default BookingHistoryPage;
