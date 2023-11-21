import { Popover, Transition } from "@headlessui/react";
import { UserPlusIcon } from "@heroicons/react/24/outline";
import React, { FC, Fragment } from "react";
import ClearDataButton from "components/common/ClearButton/ClearButton";
import GuestsInput from "components/common/GuestsInput/GuestsInput";

export interface GuestsInputPopoverProps {
  className?: string;
  highlightFocused?: boolean;
  adults?: number;
  children?: number;
  onChangeFilters?: (adults: number, children: number) => void;
}

const GuestsInputPopover: FC<GuestsInputPopoverProps> = ({
  className = "flex-1",
  highlightFocused = true,
  adults = 0,
  children = 0,
  onChangeFilters,
}) => {
  return (
    <Popover className={`flex relative ${className}`}>
      {({ open }) => (
        <>
          <div
            className={`flex-1 flex items-center focus:outline-none rounded-b-3xl`}
          >
            <Popover.Button
              className={`relative z-0 flex-1 flex text-left items-center p-3 space-x-3 focus:outline-none ${
                open && highlightFocused ? "container-padding-focused" : ""
              }`}
            >
              <div className="text-neutral-300 dark:text-neutral-400">
                <UserPlusIcon className="w-5 h-5 lg:w-7 lg:h-7" />
              </div>
              <div className="flex-grow">
                <span className="block xl:text-lg font-semibold">
                  {adults + children || ""}{" "}
                  {adults + children > 1 ? "Guests" : "Guest"}
                </span>
                <span className="block mt-1 text-sm text-neutral-400 leading-none font-light">
                  {adults + children ? "Guests" : "Add guests"}
                </span>
              </div>
              {!!(adults + children) && open && (
                <ClearDataButton
                  onClick={() => {
                    onChangeFilters?.(0, 0);
                  }}
                />
              )}
            </Popover.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute right-0 z-10 w-full sm:min-w-[340px] max-w-sm bg-white dark:bg-neutral-800 top-full mt-3 py-5 sm:py-6 px-4 sm:px-8 rounded-3xl shadow-xl ring-1 ring-black ring-opacity-5">
              <GuestsInput
                adults={adults}
                children={children}
                onChangeFilters={onChangeFilters}
              />
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default GuestsInputPopover;
