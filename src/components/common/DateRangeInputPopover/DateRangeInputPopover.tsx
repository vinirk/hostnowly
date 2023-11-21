import { Popover, Transition } from "@headlessui/react";
import { CalendarIcon } from "@heroicons/react/24/outline";
import { FC, Fragment } from "react";
import { BlockedDateType } from "types";
import DatePicker from "../DatePicker";

interface DateRangeInputPopoverProps {
  className?: string;
  fieldClassName?: string;
  highlightFocused?: boolean;
  startDate?: string | null;
  endDate?: string | null;
  onChangeDate?: (dates: [Date | null, Date | null]) => void;
  clearDate?: () => void;
  blockedDates?: BlockedDateType[];
}
const DateRangeInputPopover: FC<DateRangeInputPopoverProps> = ({
  className = "",
  fieldClassName = "[ container-padding ] p-3",
  startDate,
  highlightFocused = true,
  endDate,
}) => {
  const renderInput = () => {
    return (
      <>
        <div className="text-neutral-300 dark:text-neutral-400">
          <CalendarIcon className="w-5 h-5 lg:w-7 lg:h-7" />
        </div>
        <div className="flex-grow text-left">
          <span className="block xl:text-lg font-semibold">
            {startDate &&
              new Date(startDate).toLocaleDateString("en-US", {
                month: "short",
                day: "2-digit",
              })}
            {endDate &&
              " - " +
                new Date(endDate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "2-digit",
                })}
          </span>
          <span className="block mt-1 text-sm text-neutral-400 leading-none font-light">
            {"Check in - Check out"}
          </span>
        </div>
      </>
    );
  };

  return (
    <Popover className={`z-11 relative flex ${className}`}>
      {({ open }) => (
        <>
          <Popover.Button
            className={`flex-1 z-20 flex relative ${fieldClassName} items-center space-x-3 focus:outline-none ${
              open && highlightFocused ? "container-padding-focused" : ""
            }`}
            onClickCapture={() => document.querySelector("html")?.click()}
          >
            {renderInput()}
            {/* {startDate && open && <ClearDataButton onClick={} />} */}
          </Popover.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute left-1/2 z-10 mt-3 top-full w-screen max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl">
              <div className="overflow-hidden rounded-3xl shadow-lg ring-1 ring-black ring-opacity-5 bg-white dark:bg-neutral-800 p-8">
                <DatePicker />
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default DateRangeInputPopover;
