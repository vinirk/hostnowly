import React, { Fragment, FC, useState, useEffect } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { UserPlusIcon } from '@heroicons/react/24/outline';
import ClearDataButton from 'components/SearchBar/ClearDataButton';
import { InputNumber } from 'components/common';

export interface GuestsInputPopoverProps {
  className?: string;
  highlightFocused?: boolean;
  guestAdults?: number;
  guestChildren?: number;
}

interface SearchBarGuestsInputPopoverProps extends GuestsInputPopoverProps {
  onChangeFilters?: (adults: number, children: number) => void;
}

export interface GuestsObject {
  guestAdults?: number;
  guestChildren?: number;
}

const GuestsInputPopover: FC<SearchBarGuestsInputPopoverProps> = ({
  className = 'flex-1',
  highlightFocused = true,
  guestAdults = 0,
  guestChildren = 0,
  onChangeFilters,
}) => {
  const [guestAdultsInputValue, setGuestAdultsInputValue] = useState(0);
  const [guestChildrenInputValue, setGuestChildrenInputValue] = useState(0);

  useEffect(() => {
    if (guestAdults > 0) {
      setGuestAdultsInputValue(guestAdults);
    }
    if (guestChildren > 0) {
      setGuestChildrenInputValue(guestChildren);
    }
  }, [guestAdults, guestChildren]);

  const handleChangeData = (value: number, type: keyof GuestsObject) => {
    let newValue = {
      guestAdults: guestAdultsInputValue,
      guestChildren: guestChildrenInputValue,
    };

    if (type === 'guestAdults') {
      setGuestAdultsInputValue(value);
      newValue.guestAdults = value;
    }
    if (type === 'guestChildren') {
      setGuestChildrenInputValue(value);
      newValue.guestChildren = value;
    }

    onChangeFilters &&
      onChangeFilters(newValue.guestAdults, newValue.guestChildren);
  };

  const totalGuests = guestChildrenInputValue + guestAdultsInputValue;

  return (
    <Popover className={`flex relative ${className}`}>
      {({ open }) => (
        <>
          <div
            className={`flex-1 flex items-center focus:outline-none rounded-b-3xl`}
          >
            <Popover.Button
              className={`relative z-0 flex-1 flex text-left items-center p-3 space-x-3 focus:outline-none ${
                open && highlightFocused ? 'container-padding-focused' : ''
              }`}
            >
              <div className='text-neutral-300 dark:text-neutral-400'>
                <UserPlusIcon className='w-5 h-5 lg:w-7 lg:h-7' />
              </div>
              <div className='flex-grow'>
                <span className='block xl:text-lg font-semibold'>
                  {totalGuests || ''} {totalGuests > 1 ? 'Guests' : 'Guest'}
                </span>
                <span className='block mt-1 text-sm text-neutral-400 leading-none font-light'>
                  {totalGuests ? 'Guests' : 'Add guests'}
                </span>
              </div>

              {!!totalGuests && open && (
                <ClearDataButton
                  onClick={() => {
                    setGuestAdultsInputValue(0);
                    setGuestChildrenInputValue(0);
                  }}
                />
              )}
            </Popover.Button>
          </div>

          <Transition
            as={Fragment}
            enter='transition ease-out duration-200'
            enterFrom='opacity-0 translate-y-1'
            enterTo='opacity-100 translate-y-0'
            leave='transition ease-in duration-150'
            leaveFrom='opacity-100 translate-y-0'
            leaveTo='opacity-0 translate-y-1'
          >
            <Popover.Panel className='absolute right-0 z-10 w-full sm:min-w-[340px] max-w-sm bg-white dark:bg-neutral-800 top-full mt-3 py-5 sm:py-6 px-4 sm:px-8 rounded-3xl shadow-xl ring-1 ring-black ring-opacity-5 '>
              <InputNumber
                className='w-full'
                defaultValue={guestAdultsInputValue}
                onChange={(value) => handleChangeData(value, 'guestAdults')}
                max={10}
                min={1}
                label='Adults'
                desc='Ages 13 or above'
              />
              <InputNumber
                className='w-full mt-6'
                defaultValue={guestChildrenInputValue}
                onChange={(value) => handleChangeData(value, 'guestChildren')}
                max={4}
                label='Children'
                desc='Ages 12 or below'
              />
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default GuestsInputPopover;
