import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch, RootState } from "app/store";
import {
  ButtonPrimary,
  ButtonSecondary,
  ImageWithLoading,
} from "components/common";
import StarRating from "components/common/StarRating";
import { useToast } from "contexts/ToastContext";
import { cancelBookingAsync } from "features/booking/bookingSlice";
import GuestsIcon from "icons/Guests";
import { goToBookingHistory } from "selectors/routes";
import { BookingType, StayType } from "types";
import { getNumberOfNights } from "utils/bookingOperations";
import { formatDate, formatDateTime } from "utils/dateFormatters";
import formatCurrency from "utils/formatCurrency";

export interface BookingHistoryDetailsPageProps {
  className?: string;
}

/**
 * React component for the Booking History Details page.
 * Displays detailed information about a booking or a canceled booking.
 * Allows users to cancel a booking if it's not already canceled.
 */
const BookingHistoryDetailsPage: FC<BookingHistoryDetailsPageProps> = ({
  className = "",
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { code } = useParams<{ code: string }>();
  const { showToast } = useToast();
  const currentBooking = useSelector(
    (state: RootState) =>
      state.booking?.confirmedBookings.find(
        (item: BookingType) => item.confirmationCode === code,
      ),
  );
  const currentStay = useSelector((state: RootState) =>
    state.stays.items.find(
      (item: StayType) => item.id === currentBooking?.stayId,
    ),
  );
  /**
   * Handles the cancellation of the current booking.
   * Dispatches the cancelBookingAsync action and shows toast messages
   * based on the cancellation result.
   */
  const handleCancelBooking = async () => {
    try {
      // Dispatch the cancelBookingAsync action to cancel the booking.
      const actionResult = await dispatch(
        cancelBookingAsync({ id: currentBooking?.id }),
      );
      // Check if the booking cancellation was successful.
      if (cancelBookingAsync.fulfilled.match(actionResult)) {
        // Show a success toast message.
        showToast("Booking canceled successfully", "success");
      } else if (cancelBookingAsync.rejected.match(actionResult)) {
        // Show an error toast message if the booking cancellation failed.
        showToast("Booking canceled failed. Please try again later.", "error");
      }
    } catch (error) {
      // Handle errors that may occur during the booking cancellation.
      console.error("Booking failed:", error);
    }
  };

  /**
   * Renders the content of the Booking History Details page.
   * Displays booking and order details, including images, dates, and pricing.
   * Provides the option to cancel the booking if it's not already canceled.
   * Handles the "Back" button to navigate to the previous page.
   * @returns JSX for the content of the page.
   */
  const renderContent = () => {
    return (
      <div className="w-full flex flex-col sm:rounded-2xl sm:border border-neutral-200 dark:border-neutral-700 space-y-8 px-0 sm:p-6 xl:p-8 font-leagueSpartan">
        <h2 className="text-2xl font-semibold">
          {currentBooking?.cancellationDate
            ? "Booking Canceled"
            : "Booking Order Details"}
        </h2>

        <div className="border-b border-neutral-200 dark:border-neutral-700"></div>

        <div className="space-y-6">
          <h3 className="text-2xl font-semibold">Your booking</h3>
          <div className="flex flex-col sm:flex-row sm:items-center">
            <div className="flex-shrink-0 w-full sm:w-40">
              <div className=" aspect-w-4 aspect-h-3 sm:aspect-h-4 rounded-2xl overflow-hidden">
                <ImageWithLoading src={currentStay?.galleryImgs[0]} />
              </div>
            </div>
            <div className="pt-5  sm:pb-5 sm:px-5 space-y-3">
              <div>
                <span className="text-base sm:text-lg font-medium mt-1 block">
                  {currentStay?.title}
                </span>
                <span className="text-sm text-neutral-500 dark:text-neutral-400 line-clamp-1">
                  {currentStay?.address}
                </span>
              </div>
              <div className="w-10 border-b border-neutral-200  dark:border-neutral-700"></div>
              <StarRating point={currentStay?.stars} />
            </div>
          </div>
          <div className="mt-6 border border-neutral-200 dark:border-neutral-700 rounded-3xl flex flex-col sm:flex-row divide-y sm:divide-x sm:divide-y-0 divide-neutral-200 dark:divide-neutral-700">
            <div className="flex-1 p-5 flex space-x-4 items-center">
              <svg
                className="w-8 h-8 text-neutral-300 dark:text-neutral-6000"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.33333 8.16667V3.5M18.6667 8.16667V3.5M8.16667 12.8333H19.8333M5.83333 24.5H22.1667C23.4553 24.5 24.5 23.4553 24.5 22.1667V8.16667C24.5 6.878 23.4553 5.83333 22.1667 5.83333H5.83333C4.54467 5.83333 3.5 6.878 3.5 8.16667V22.1667C3.5 23.4553 4.54467 24.5 5.83333 24.5Z"
                  stroke="#D1D5DB"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <div className="flex flex-col">
                <span className="text-sm text-neutral-400">Date</span>
                <span className="mt-1.5 text-lg font-semibold">
                  {currentBooking &&
                    formatDate(
                      currentBooking?.startDate,
                      currentBooking?.endDate,
                    )}
                </span>
              </div>
            </div>
            <div className="flex-1 p-5 flex space-x-4 items-center">
              <GuestsIcon className="w-4 h-4" />
              <div className="flex flex-col">
                <span className="text-sm text-neutral-400">Guests</span>
                <span className="mt-1.5 text-lg font-semibold">
                  {(currentBooking?.adults ?? 0) +
                    (currentBooking?.children ?? 0)}{" "}
                  Guests
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-2xl font-semibold">Order Detail</h3>
          <div className="flex flex-col space-y-4">
            <div className="flex text-neutral-6000 dark:text-neutral-300">
              <span className="flex-1">Nights</span>
              <span className="flex-1 font-medium text-neutral-900 dark:text-neutral-100">
                {getNumberOfNights(
                  currentBooking?.startDate ?? "",
                  currentBooking?.endDate ?? "",
                )}
              </span>
            </div>
            <div className="flex text-neutral-6000 dark:text-neutral-300">
              <span className="flex-1">Booking code</span>
              <span className="flex-1 font-medium text-neutral-900 dark:text-neutral-100">
                {currentBooking?.confirmationCode}
              </span>
            </div>
            <div className="flex text-neutral-6000 dark:text-neutral-300">
              <span className="flex-1">Confirmation Date</span>
              <span className="flex-1 font-medium text-neutral-900 dark:text-neutral-100">
                {currentBooking &&
                  formatDateTime(currentBooking?.confirmationDate)}
              </span>
            </div>
            {currentBooking?.cancellationDate && (
              <>
                <div className="flex text-neutral-6000 dark:text-neutral-300">
                  <span className="flex-1">Cancelation Date</span>
                  <span className="flex-1 font-medium text-neutral-900 dark:text-neutral-100">
                    {currentBooking &&
                      formatDateTime(currentBooking?.cancellationDate)}
                  </span>
                </div>
                <div className="w-14 border-b border-neutral-100 dark:border-neutral-800"></div>
                <div className="flex text-neutral-6000 dark:text-neutral-300">
                  <span className="flex-1">Sub total</span>
                  <span className="flex-1 font-medium text-neutral-900 dark:text-neutral-100">
                    {formatCurrency(currentBooking?.totalPrice ?? 0)}
                  </span>
                </div>
                <div className="flex text-neutral-6000 dark:text-neutral-300">
                  <span className="flex-1">Deduction 10%</span>
                  <span className="flex-1 font-medium text-neutral-900 dark:text-neutral-100">
                    {formatCurrency((currentBooking?.totalPrice ?? 0) * 0.1)}
                  </span>
                </div>
              </>
            )}
            <div className="flex text-neutral-6000 dark:text-neutral-300">
              <span className="flex-1 font-semibold">Total Refunded</span>
              <span className="flex-1 font-semibold text-neutral-900 dark:text-neutral-100">
                {formatCurrency(
                  (currentBooking?.totalPrice ?? 0) -
                    (currentBooking?.totalPrice ?? 0) * 0.1 ?? 0,
                )}
              </span>
            </div>
          </div>
        </div>
        <div className="flex justify-between ">
          <ButtonSecondary
            className="font-semibold"
            onClick={() => window.history.back()}
          >
            Back
          </ButtonSecondary>
          {!currentBooking?.cancellationDate && (
            <ButtonPrimary onClick={handleCancelBooking}>
              Cancel booking
            </ButtonPrimary>
          )}
        </div>
      </div>
    );
  };

  /**
   * Renders a message when no booking details are found.
   * Displays a message and a button to check reservations.
   * @returns JSX for the message when no booking details are found.
   */
  const renderNoBookingFound = () => {
    if (!currentBooking) {
      return (
        <div className="flex flex-col items-center gap-10">
          <span className="block text-[20px] text-center font-semibold text-neutral-800 dark:text-neutral-200 tracking-wider">
            No booking found. Check your booking history.
          </span>
          <ButtonSecondary href={goToBookingHistory()}>
            Check reservations
          </ButtonSecondary>
        </div>
      );
    }
  };

  return (
    <div className={className}>
      <main className="container mt-11 mb-24 lg:mb-[200px] ">
        <div className="max-w-4xl mx-auto">
          {currentBooking ? renderContent() : renderNoBookingFound()}
        </div>
      </main>
    </div>
  );
};

export default BookingHistoryDetailsPage;
