/**
 * Generates a URL for the detail page of a specific stay.
 * @param stayId - The unique identifier of the stay.
 * @returns A string representing the path to the stay's detail page.
 * Typical Use: Navigate to the detail page when a user selects a specific stay.
 */
const goToDetailByStayId = (stayId: string) => `/stays/${stayId}`;

/**
 * Creates a URL for the payment confirmation page.
 * @param code - The confirmation code of the payment.
 * @returns A string representing the path to the payment confirmation page.
 * Usage: Used after the successful completion of a payment process to navigate the user to the confirmation page.
 */
const goToConfirmedPayment = (code: string) => `/payment-confirmed/${code}`;

/**
 * Provides a URL to the list of available stays.
 * @returns A string representing the path to the page listing all stays.
 * Use: Ideal for redirecting the user back to the general list of stays, such as from a detail page or after an action.
 */
const goToStaysList = () => '/stays';

export { goToDetailByStayId, goToConfirmedPayment, goToStaysList };
