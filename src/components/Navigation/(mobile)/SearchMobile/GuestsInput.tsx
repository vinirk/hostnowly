import { GuestsObject } from 'components/SearchBar/type';
import { InputNumber } from 'components/common';
import { FC, useEffect, useState } from 'react';

export interface GuestsInputProps {
  className?: string;
  guestAdults?: number;
  guestChildren?: number;
}

interface SearchBarGuestsInputPopoverProps extends GuestsInputProps {
  onChangeFilters?: (adults: number, children: number) => void;
}

export interface GuestsInputHandle {
  resetValues: () => void;
}

const GuestsInput: FC<SearchBarGuestsInputPopoverProps> = ({
  className = '',
  onChangeFilters,
  guestAdults = 0,
  guestChildren = 0,
}) => {
  const [guestAdultsInputValue, setGuestAdultsInputValue] = useState(
    guestAdults || 0
  );
  const [guestChildrenInputValue, setGuestChildrenInputValue] = useState(
    guestChildren || 0
  );

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

  return (
    <div className={`flex flex-col relative p-5 ${className}`}>
      <InputNumber
        className='w-full'
        defaultValue={guestAdultsInputValue}
        onChange={(value) => handleChangeData(value, 'guestAdults')}
        max={20}
        label='Adults'
        desc='Ages 13 or above'
      />
      <InputNumber
        className='w-full mt-6'
        defaultValue={guestChildrenInputValue}
        onChange={(value) => handleChangeData(value, 'guestChildren')}
        max={20}
        label='Children'
        desc='Ages 12 or below'
      />
    </div>
  );
};

export default GuestsInput;
