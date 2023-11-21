import DatePicker from "components/common/DatePicker";

const StayDateRangeCard = () => {
  return (
    <div className="listingSection__wrap overflow-hidden">
      <div>
        <h2 className="text-2xl font-semibold">Availability</h2>
        <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
          Prices may vary depending on the day and time of the booking
        </span>
      </div>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
      <DatePicker />
    </div>
  );
};

export default StayDateRangeCard;
