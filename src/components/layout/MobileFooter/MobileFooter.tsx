import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "app/store";
import ButtonPrimary from "components/common/Button/ButtonPrimary";
import ModalSelectDate from "components/layout/ModalSelectDateRange/ModalSelectDateRange";
import ModalSelectGuests from "components/layout/ModalSelectGuests/ModalSelectGuests";
import { useToast } from "contexts/ToastContext";
import { confirmBookingAsync } from "features/booking/bookingSlice";
import { useFilterChange } from "hooks/useFilterChange";
import { goToOrderConfirmation } from "selectors/routes";
import { StayType } from "types";
import { formatDate } from "utils/dateFormatters";
import formatCurrency from "utils/formatCurrency";

const MobileFooter = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const currentStay = useSelector((state: RootState) =>
    state.stays.items.find((item: StayType) => item.id === id),
  );
  const filter = useSelector((state: RootState) => state.filters);
  const bookingDetail = useSelector(
    (state: RootState) => state.booking?.detail,
  );
  const { showToast } = useToast();
  const handleChangeFilter = useFilterChange();

  /**
   * Handle confirm booking
   */
  const handleConfirmBooking = async () => {
    const stayId = currentStay?.id;
    try {
      const actionResult = await dispatch(confirmBookingAsync({ stayId }));
      if (confirmBookingAsync.fulfilled.match(actionResult)) {
        navigate(goToOrderConfirmation(actionResult.payload.confirmationCode));
        showToast("Booking successful! Your reservation has been confirmed.");
      } else if (confirmBookingAsync.rejected.match(actionResult)) {
        showToast(
          "The selected dates overlap with an existing booking. Please choose different dates.",
          "error",
        );
      }
    } catch (error) {
      console.error("Booking failed:", error);
    }
  };

  const formatGuestText = () => {
    const totalAdults = filter?.adults ?? 0;
    const totalChildren = filter?.children ?? 0;
    const total = totalAdults + totalChildren;

    return total === 0
      ? "Select guests"
      : total === 1
        ? `${total} guest`
        : `${total} guests`;
  };

  return (
    <div className="block lg:hidden fixed bottom-0 inset-x-0 py-2 sm:py-3 bg-white dark:bg-neutral-800 border-t border-neutral-200 dark:border-neutral-6000 z-40 font-leagueSpartan">
      <div className="container flex items-center justify-between">
        <div className="text-xl font-semibold">
          <span className="block ">
            {formatCurrency(currentStay?.price ?? 0)}
            <span className="ml-1 text-sm font-normal text-neutral-500 dark:text-neutral-400">
              x {Math.round(bookingDetail?.nights)} nights
            </span>
          </span>

          {}
          <ModalSelectDate
            onChangeDate={(startDate, endDate) =>
              handleChangeFilter({
                startDate: startDate.toISOString(),
                endDate: endDate.toISOString(),
                price: currentStay?.price,
              })
            }
            currentStartDate={filter?.startDate}
            currentEndDate={filter?.endDate}
            renderChildren={({ openModal }) => (
              <span
                onClick={openModal}
                className="block text-sm underline font-medium"
              >
                {filter?.startDate ? (
                  formatDate(filter?.startDate ?? "", filter?.endDate ?? "")
                ) : (
                  <div>Select date</div>
                )}
              </span>
            )}
          />
        </div>

        <div>
          <span className="block font-semibold">
            <span className="text-xl">
              {formatCurrency(
                bookingDetail?.subtotal + bookingDetail?.serviceFee,
              )}
            </span>
            <span className="ml-1 text-sm font-normal text-neutral-500 dark:text-neutral-400">
              total
            </span>
          </span>
          <ModalSelectGuests
            onChangeGuests={(adults, children) =>
              handleChangeFilter({ adults, children })
            }
            adults={filter?.adults}
            children={filter?.children}
            renderChildren={({ openModal }) => (
              <span
                onClick={openModal}
                className="block text-sm underline font-medium"
              >
                {formatGuestText()}
              </span>
            )}
          />
        </div>
        <ButtonPrimary
          sizeClass="px-5 sm:px-7 py-3 !rounded-2xl"
          disabled={bookingDetail?.nights === 0}
          onClick={handleConfirmBooking}
        >
          <span className="text-sm">Book</span>
        </ButtonPrimary>
      </div>
    </div>
  );
};

export default MobileFooter;
