import { MinusIcon, PlusIcon } from '@heroicons/react/24/solid';
import React, { FC, useEffect, useState } from 'react';

interface InputNumberProps {
  className?: string;
  defaultValue?: number;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
  label?: string;
  desc?: string;
}

const InputNumber: FC<InputNumberProps> = ({
  className = 'w-full',
  defaultValue = 0,
  min = 0,
  max,
  onChange,
  label,
  desc,
}) => {
  const [value, setValue] = useState(defaultValue);

  // Update internal state when defaultValue changes
  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  // Common function to update the value and trigger the onChange callback
  const updateValue = (newValue: number) => {
    setValue(newValue);
    onChange?.(newValue);
  };

  // Handle decrement action
  const handleClickDecrement = () => {
    if (min < value) {
      updateValue(value - 1);
    }
  };

  // Handle increment action
  const handleClickIncrement = () => {
    if (max === undefined || max > value) {
      updateValue(value + 1);
    }
  };

  return (
    <div className={`flex items-center justify-between space-x-5 ${className}`}>
      {label && (
        <div className='flex flex-col'>
          <span className='font-medium text-neutral-800 dark:text-neutral-200'>
            {label}
          </span>
          {desc && (
            <span className='text-xs text-neutral-500 dark:text-neutral-400 font-normal'>
              {desc}
            </span>
          )}
        </div>
      )}
      <div className='flex items-center justify-between w-28'>
        {/* Decrement button */}
        <button
          className='w-8 h-8 rounded-full flex items-center justify-center border border-neutral-400 dark:border-neutral-500 bg-white dark:bg-neutral-900 focus:outline-none hover:border-neutral-700 disabled:hover:border-neutral-400 dark:disabled:hover:border-neutral-500 disabled:opacity-50 disabled:cursor-default'
          type='button'
          onClick={handleClickDecrement}
          disabled={min >= value}
        >
          <MinusIcon className='w-4 h-4' />
        </button>
        {/* Display current value */}
        <span>{value}</span>
        {/* Increment button */}
        <button
          className='w-8 h-8 rounded-full flex items-center justify-center border border-neutral-400 dark:border-neutral-500 bg-white dark:bg-neutral-900 focus:outline-none hover:border-neutral-700 disabled:hover:border-neutral-400 dark:disabled:hover:border-neutral-500 disabled:opacity-50 disabled:cursor-default'
          type='button'
          onClick={handleClickIncrement}
          disabled={max !== undefined && max <= value}
        >
          <PlusIcon className='w-4 h-4' />
        </button>
      </div>
    </div>
  );
};

export default InputNumber;
