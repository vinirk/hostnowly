/**
 * Provides a URL to the list of available stays.
 * @returns A string representing the path to the stays list page.
 * Typical Use: Navigate to the list of available stays.
 */
const goToStays = () => "/stays";
/**
 * Provides a URL for the detail page of a specific stay.
 * @param stayId - The unique identifier of the stay.
 * @returns A string representing the path to the stay's detail page.
 * Typical Use: Navigate to the detail page when a user selects a specific stay.
 */
const goToDetailByStayId = (stayId: string) => `/stays/${stayId}`;

/**
 * Provides a URL for the booking history page.
 * @returns A string representing the path to the booking history page.
 * Typical Use: Navigate to view the user's booking history.
 */
const goToBookingHistory = () => "/booking/history";
/**
 * Provides a URL for the booking history details page of a specific booking.
 * @param code - The confirmation code of the booking.
 * @returns A string representing the path to the booking history details page.
 * Typical Use: Navigate to view the details of a specific booking in the history.
 */
const goToBookingHistoryDetailsByCode = (code: string) =>
  `/booking/history/details/${code}`;
/**
 * Creates a URL for the payment confirmation page.
 * @param code - The confirmation code of the payment.
 * @returns A string representing the path to the payment confirmation page.
 * Usage: Used after the successful completion of a payment process to navigate the user to the confirmation page.
 */
const goToOrderConfirmation = (code: string) => `/order/confirmation/${code}`;

export {
  goToStays,
  goToDetailByStayId,
  goToBookingHistory,
  goToBookingHistoryDetailsByCode,
  goToOrderConfirmation,
};
