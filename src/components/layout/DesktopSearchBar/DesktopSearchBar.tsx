import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "app/store";
import ButtonSubmit from "components/common/Button/ButtonSubmit";
import DateRangeInputPopover from "components/common/DateRangeInputPopover";
import DestinationPopover from "components/common/DestinationPopover";
import GuestsInput from "components/layout/GuestsInputPopover/GuestsInputPopover";
import { useFilterChange } from "hooks/useFilterChange";
import { goToStays } from "selectors/routes";

export interface DesktopSearchBarProps {
  className?: string;
}

const DesktopSearchBar: FC<DesktopSearchBarProps> = ({ className = "" }) => {
  const filter = useSelector((state: RootState) => state.filters);
  const startDate = filter.startDate ? new Date(filter.startDate) : undefined;
  const endDate = filter.endDate ? new Date(filter.endDate) : undefined;
  const handleChangeFilter = useFilterChange();

  const handleChangeDate = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    handleChangeFilter({
      startDate: start ? start.toISOString() : undefined,
      endDate: end ? end.toISOString() : undefined,
    });
  };

  return (
    <div
      className={`w-full max-w-6xl flex items-center justify-center opacity-90 ${className}`}
    >
      <form className="w-full relative flex rounded-full shadow-xl dark:shadow-2xl bg-white dark:bg-neutral-800 ">
        <DestinationPopover className="flex-[1.5]" />
        <div className="self-center border-r border-slate-200 dark:border-slate-700 h-8"></div>
        <DateRangeInputPopover
          startDate={startDate?.toISOString()}
          endDate={endDate?.toISOString()}
          className="flex-1"
          onChangeDate={handleChangeDate}
        />
        <div className="self-center border-r border-slate-200 dark:border-slate-700 h-8"></div>
        <GuestsInput
          className="flex-1"
          adults={filter?.adults}
          children={filter?.children}
          onChangeFilters={(adults, children) =>
            handleChangeFilter({ adults, children })
          }
        />
        <div className="flex items-center mx-3">
          <ButtonSubmit href={goToStays()} />
        </div>
      </form>
    </div>
  );
};

export default DesktopSearchBar;
