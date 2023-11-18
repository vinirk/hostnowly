import { BookingType } from 'types';

/**
 * Calculates the total cost of a booking based on various parameters.
 *
 * The cost is determined by the following factors:
 * - The base price per night.
 * - The duration of the stay (calculated from the start and end dates).
 * - The number of guests, differentiated into adults and children.
 *
 * The total cost includes separate subtotals for adults and children, with children charged at half the price of adults.
 * Additionally, a service fee of 10% of the subtotal is added to the final cost.
 *
 * @param {number} price - The base price per night for the stay.
 * @param {string} startDate - The start date of the booking in YYYY-MM-DD format.
 * @param {string} endDate - The end date of the booking in YYYY-MM-DD format.
 * @param {number} guestAdults - The number of adult guests.
 * @param {number} guestChildren - The number of children guests, charged at half the adult price.
 * @returns {Object} An object containing the detailed cost breakdown, including subtotals for adults and children,
 *                  the number of nights, total service fee, and the overall subtotal before the service fee.
 */
function calculateBookingCost(
  price: number,
  startDate: string,
  endDate: string,
  guestAdults: number,
  guestChildren: number
) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const nights = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);

  const subtotalAdults = nights * guestAdults * price;
  const subtotalChildren = nights * guestChildren * (price * 0.5);
  const subtotal = subtotalAdults + subtotalChildren;
  const serviceFee = subtotal * 0.1;

  return {
    subtotal,
    serviceFee,
    nights,
    guestAdults,
    guestChildren,
    subtotalAdults,
    subtotalChildren,
  };
}

/**
 * Checks for potential booking conflicts before confirming a new booking.
 *
 * Two checks are performed:
 * 1. Stay ID Check: Ensures the stayId of the new booking does not match the stayId of any existing bookings.
 *    This prevents double bookings for the same stay at the same interval.
 * 2. Date Availability Check: Confirms that the dates desired for the new booking do not overlap
 *    with the dates of any existing bookings for the same stay. This is crucial to avoid booking
 *    the same stay for overlapping time periods.
 *   Note: This check only applies to bookings that have not been cancelled.
 *
 * @param {string} stayId - The unique identifier of the stay being booked.
 * @param {BookingType[]} confirmedBookings - An array of already confirmed bookings.
 * @param {string} desiredStartDate - The starting date of the desired booking period.
 * @param {string} desiredEndDate - The ending date of the desired booking period.
 * @returns {boolean} - Returns true if there is a conflict with existing bookings, otherwise false.
 */
function validateBookingAvailability(
  stayId: string,
  confirmedBookings: BookingType[],
  desiredStartDate: string,
  desiredEndDate: string
) {
  const isBooked = confirmedBookings
    .filter((booking) => !booking.cancellationDate)
    .some((booking) => {
      if (booking.stayId === stayId) {
        const start = new Date(booking.startDate).getTime();
        const end = new Date(booking.endDate).getTime();
        const filterStart = new Date(desiredStartDate).getTime();
        const filterEnd = new Date(desiredEndDate).getTime();
        return filterStart <= end && filterEnd >= start;
      }
      return false;
    });

  return isBooked;
}

/**
 * Generates a random confirmation code of a specified length.
 *
 * @param {number} length - The length of the confirmation code to generate.
 * @returns {string} A string representing the generated confirmation code.
 *
 * Example:
 * generateConfirmationCode(6) might return '4FRX2A'.
 */
function generateConfirmationCode(length: number): string {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export {
  calculateBookingCost, generateConfirmationCode, validateBookingAvailability
};
