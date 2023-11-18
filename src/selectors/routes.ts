/**
 * Generates a URL for the detail page of a stay.
 * @param {string} stayId - The unique identifier of the stay.
 * @returns {string} The URL path to the stay's detail page.
 */
const goToDetailByStayId = (stayId: string) => `/featured-stays/${stayId}`;

/**
 *
 * @param {string} code  - The unique identifier of the booking.
 * @returns {string} The URL path to the confirmation page.
 */
const goToConfirmedPayment = (code: string) => `/payment-confirmed/${code}`;

export { goToDetailByStayId, goToConfirmedPayment };
