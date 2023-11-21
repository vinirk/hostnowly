import { MagnifyingGlassIcon, MapPinIcon } from "@heroicons/react/24/outline";
import React, { FC, useEffect, useRef, useState } from "react";

interface Props {
  onClick?: () => void;
  onChange?: (value: string) => void;
  className?: string;
  defaultValue?: string;
  headingText?: string;
}

const countries = [
  "Australia",
  "Canada",
  "United Kingdom",
  "United Arab Emirates",
];

const LocationInput: FC<Props> = ({
  onClick = () => {},
  onChange = () => {},
  className = "",
  defaultValue = "United States",
  headingText = "Where are you going?",
}) => {
  const [value, setValue] = useState("");
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const handleSelectLocation = (item: string) => {
    setTimeout(() => {
      setValue(item);
      onChange && onChange(item);
      onClick && onClick();
    }, 0);
  };

  const renderSearchValues = ({
    heading,
    items,
  }: {
    heading: string;
    items: string[];
  }) => {
    return (
      <>
        <p className="block font-semibold text-base">
          {heading || "Destinations"}
        </p>
        <div className="mt-3">
          {countries.map((item) => {
            return (
              <div
                className="py-2 mb-1 flex items-center cursor-pointer space-x-3 text-sm"
                onClick={() => handleSelectLocation(item)}
                key={item}
              >
                <MapPinIcon className="w-5 h-5 text-neutral-500 dark:text-neutral-400" />
                <span className="">{item}</span>
              </div>
            );
          })}
        </div>
      </>
    );
  };

  const DestinationInput = () => {
    return (
      <div className="relative mt-5">
        <input
          className={`block w-full bg-transparent border px-4 py-3 pr-12 border-neutral-900 dark:border-neutral-200 rounded-xl focus:ring-0 focus:outline-none text-base leading-none placeholder-neutral-500 dark:placeholder-neutral-300 truncate font-bold placeholder:truncate`}
          placeholder={"Search destinations"}
          value={value}
          onChange={(e) => {
            setValue(e.currentTarget.value);
            onChange && onChange(e.currentTarget.value);
          }}
          ref={inputRef}
        />
        <span
          className="absolute right-2.5 top-1/2 -translate-y-1/2 cursor-pointer"
          onClick={onClick}
        >
          <MagnifyingGlassIcon className="w-5 h-5 text-neutral-700 dark:text-neutral-400" />
        </span>
      </div>
    );
  };

  return (
    <div className={`${className}`} ref={containerRef}>
      <div className="p-5">
        <span className="block font-semibold text-xl sm:text-2xl">
          {headingText}
        </span>
        {<DestinationInput />}
        <div className="mt-7">
          {renderSearchValues({
            heading: "Recent search",
            items: [
              "Australia",
              "Canada",
              "Germany",
              "United Kingdom",
              "United Arab Emirates",
            ],
          })}
        </div>
      </div>
    </div>
  );
};

export default LocationInput;
