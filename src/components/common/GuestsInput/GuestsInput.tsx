import { FC } from "react";
import { InputNumber } from "components/common";

export interface GuestsInputProps {
  className?: string;
  adults?: number;
  children?: number;
  onChangeFilters?: (adults: number, children: number) => void;
}

const GuestsInput: FC<GuestsInputProps> = ({
  className = "",
  onChangeFilters = () => {},
  adults = 0,
  children = 0,
}) => {
  return (
    <div className={`flex flex-col relative p-5 ${className}`}>
      <InputNumber
        className="w-full"
        defaultValue={adults}
        onChange={(value) => onChangeFilters(value, children)}
        max={20}
        label="Adults"
        desc="Ages 13 or above"
      />
      <InputNumber
        className="w-full mt-6"
        defaultValue={children}
        onChange={(value) => onChangeFilters(adults, value)}
        max={20}
        label="Children"
        desc="Ages 12 or below"
      />
    </div>
  );
};

export default GuestsInput;
