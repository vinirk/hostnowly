import { UserIcon } from "@heroicons/react/24/solid";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "app/store";
import GuestsInput from "components/common/GuestsInput/GuestsInput";
import { useFilterChange } from "hooks/useFilterChange";

interface StayDetailGuestCardProps {
  title?: string;
}

const StayDetailGuestCard: React.FC<StayDetailGuestCardProps> = ({ title }) => {
  const filter = useSelector((state: RootState) => state.filters);
  const handleChangeFilter = useFilterChange();

  /**
   *  Handle change guest adults and children filter
   * @param adults
   * @param children
   */
  const handleChangeFilters = (adults: number, children: number) => {
    handleChangeFilter({
      adults,
      children,
    });
  };
  return (
    <div className="listingSection__wrap !space-y-6">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
        {title}
      </h2>

      <div className="flex items-center space-x-4">
        <span>
          <i className="las la-map-marker-alt"></i>
          <span className="ml-1">Please select the number of guests</span>
        </span>
      </div>
      <GuestsInput
        onChangeFilters={handleChangeFilters}
        adults={filter.adults}
        children={filter.children}
      />
      <div className="w-full border-b border-neutral-100 dark:border-neutral-700" />
      <div className="flex items-center justify-between xl:justify-start space-x-8 xl:space-x-12 text-sm text-neutral-700 dark:text-neutral-300">
        <div className="flex items-center space-x-3 ">
          <UserIcon width={20} />
          <span className="">
            {(filter.adults ?? 0) + (filter.children ?? 0)}{" "}
            <span className="hidden sm:inline-block">guests</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default StayDetailGuestCard;
