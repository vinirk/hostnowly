import { FC, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "app/store";
import DatePicker from "components/common/DatePicker";
import GuestsInput from "components/common/GuestsInput";
import { useFilterChange } from "hooks/useFilterChange";
import { formatDate } from "utils/dateFormatters";
import LocationInput from "./LocationInput";

interface StaySearchFormMobileProps {
  onCloseModal: () => void;
}

const StaySearchFormMobile: FC<StaySearchFormMobileProps> = () => {
  const [fieldNameShow, setFieldNameShow] = useState("location");
  const filter = useSelector((state: RootState) => state.filters);
  const handleChangeFilter = useFilterChange();

  const renderInputLocation = () => {
    const isActive = fieldNameShow === "location";
    return (
      <div
        className={`w-full bg-white dark:bg-neutral-800 ${
          isActive
            ? "rounded-2xl shadow-lg"
            : "rounded-xl shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)]"
        }`}
      >
        {!isActive ? (
          <button
            className={`w-full flex justify-between text-sm font-medium p-4`}
            onClick={() => setFieldNameShow("location")}
          >
            <span className="text-neutral-400">Where</span>
            <span>{filter?.location || "Location"}</span>
          </button>
        ) : (
          <LocationInput />
        )}
      </div>
    );
  };

  const renderInputDates = () => {
    const isActive = fieldNameShow === "dates";

    return (
      <div
        className={`w-full bg-white dark:bg-neutral-800 overflow-hidden ${
          isActive
            ? "rounded-2xl shadow-lg"
            : "rounded-xl shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)]"
        }`}
      >
        {!isActive ? (
          <button
            className={`w-full flex justify-between text-sm font-medium p-4  `}
            onClick={() => setFieldNameShow("dates")}
          >
            <span className="text-neutral-400">When</span>
            <span>
              {filter?.startDate
                ? `${formatDate(
                    filter?.startDate ?? "",
                    filter?.endDate ?? "",
                  )}`
                : "Add date"}
            </span>
          </button>
        ) : (
          <div>
            <div className="p-5">
              <span className="block font-semibold text-xl sm:text-2xl">{` When's your trip?`}</span>
            </div>
            <div
              className={`relative w-full block xl:flex justify-center z-10 py-5`}
            >
              <DatePicker />
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderInputGuests = () => {
    const isActive = fieldNameShow === "guests";

    return (
      <div
        className={`w-full bg-white dark:bg-neutral-800 overflow-hidden ${
          isActive
            ? "rounded-2xl shadow-lg"
            : "rounded-xl shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)]"
        }`}
      >
        {!isActive ? (
          <button
            className={`w-full flex justify-between text-sm font-medium p-4`}
            onClick={() => setFieldNameShow("guests")}
          >
            <span className="text-neutral-400">Who</span>
            <span>
              {`${(filter?.adults ?? 0) + (filter?.children ?? 0)} guests` ||
                `Add guests`}
            </span>
          </button>
        ) : (
          <GuestsInput
            adults={filter?.adults}
            children={filter?.children}
            onChangeFilters={(adults, children) =>
              handleChangeFilter({ adults, children })
            }
          />
        )}
      </div>
    );
  };

  return (
    <div>
      <div className="w-full space-y-5">
        {renderInputLocation()}
        {renderInputDates()}
        {renderInputGuests()}
      </div>
    </div>
  );
};

export default StaySearchFormMobile;
