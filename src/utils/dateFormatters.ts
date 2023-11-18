// Formats a date range (start and end) in a readable format.
// If the end date is not provided, only the start date is formatted.
// Example Output: "Mar 3 - Apr 4, 2023" or "Mar 3, 2023" if end date is absent.
const formatDate = (startDate: string, endDate: string = '') => {
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const start = new Date(startDate);
  let formatted = `${monthNames[start.getMonth()]} ${start.getDate()}`;

  if (endDate) {
    const end = new Date(endDate);
    formatted += ` - ${monthNames[end.getMonth()]} ${end.getDate()}`;
  }

  return `${formatted}, ${start.getFullYear()}`;
};

// Formats a date string into a more readable date-time format.
// Converts the 24-hour clock to a 12-hour clock with AM/PM.
// Example Output: "3/3/2023 1:00 PM".
function formatDateTime(dateString: string): string {
  const date = new Date(dateString);
  const formattedDate = `${
    date.getMonth() + 1
  }/${date.getDate()}/${date.getFullYear()}`;

  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const timePeriod = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12 || 12;
  const formattedTime = `${hours}:${minutes} ${timePeriod}`;

  return `${formattedDate} ${formattedTime}`;
}

export { formatDate, formatDateTime };
