import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import React, { FC, Fragment, useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ButtonPrimary from "components/common/Button/ButtonPrimary";
import DatePickerCustomDay from "components/common/DateRangeInputPopover/DatePickerCustomDay";
import DatePickerCustomHeaderTwoMonth from "components/common/DateRangeInputPopover/DatePickerCustomHeaderTwoMonth";
import { selectBlockedDatesByStayId } from "selectors/bookingSelectors";

interface ModalSelectDateProps {
  renderChildren?: (p: {
    openModal: () => void;
    currentStartDate?: Date;
    currentEndDate?: Date;
  }) => React.ReactNode;
  currentStartDate?: string | null;
  currentEndDate?: string | null;
  onChangeDate?: (startDate: Date, endDate: Date) => void;
}

const ModalSelectDate: FC<ModalSelectDateProps> = ({
  renderChildren,
  currentStartDate = null,
  currentEndDate = null,
  onChangeDate = () => {},
}) => {
  const { id } = useParams<{ id: string }>();
  const [showModal, setShowModal] = useState(false);

  const [startDate, setStartDate] = useState<Date | null>();
  const [endDate, setEndDate] = useState<Date | null>();

  const previousStartDate = useRef<Date | null>(null);
  const previousEndDate = useRef<Date | null>(null);
  const [resetKey, setResetKey] = useState(0);

  const blockedDateIntervals = useSelector(selectBlockedDatesByStayId(id));

  useEffect(() => {
    if (currentStartDate && currentEndDate) {
      setStartDate(new Date(currentStartDate));
      setEndDate(new Date(currentEndDate));
    }
  }, [currentStartDate, currentEndDate]);

  const handleChangeDate = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const closeModal = () => {
    setShowModal(false);
    setStartDate(previousStartDate.current);
    setEndDate(previousEndDate?.current);

    if (currentStartDate && currentEndDate) {
      onChangeDate(new Date(currentStartDate), new Date(currentEndDate));
    }
  };

  const openModal = () => {
    setShowModal(true);
  };

  const saveAndCloseModal = () => {
    setShowModal(false);
    if (startDate && endDate) {
      onChangeDate(startDate, endDate);
      setStartDate(new Date(startDate));
      setEndDate(new Date(endDate));
      previousStartDate.current = new Date(startDate);
      previousEndDate.current = new Date(endDate);
    }
  };

  const resetFilters = () => {
    setResetKey((prevKey) => prevKey + 1);
    setStartDate(new Date());
    setEndDate(new Date());
  };

  const renderButtonOpenModal = () => {
    const startDate = currentStartDate ? new Date(currentStartDate) : undefined;
    const endDate = currentEndDate ? new Date(currentEndDate) : undefined;

    return renderChildren ? (
      renderChildren({
        openModal,
        currentStartDate: startDate,
        currentEndDate: endDate,
      })
    ) : (
      <button onClick={openModal}>Select Date</button>
    );
  };

  return (
    <>
      {renderButtonOpenModal()}
      <Transition appear show={showModal} as={Fragment}>
        <Dialog
          as="div"
          className="HeroSearchFormMobile__Dialog relative z-50"
          onClose={closeModal}
        >
          <div className="fixed inset-0 bg-neutral-100 dark:bg-neutral-900">
            <div className="flex h-full">
              <Transition.Child
                as={Fragment}
                enter="ease-out transition-transform"
                enterFrom="opacity-0 translate-y-52"
                enterTo="opacity-100 translate-y-0"
                leave="ease-in transition-transform"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-52"
              >
                <Dialog.Panel className="relative h-full overflow-hidden flex-1 flex flex-col justify-between ">
                  <>
                    <div className="absolute left-4 top-4">
                      <button
                        className="focus:outline-none focus:ring-0"
                        onClick={closeModal}
                      >
                        <XMarkIcon className="w-5 h-5 text-black dark:text-white" />
                      </button>
                    </div>

                    <div className="flex-1 pt-12 p-1 flex flex-col overflow-auto">
                      <div className="flex-1 flex flex-col bg-white dark:bg-neutral-800">
                        <div className="flex-1 flex flex-col transition-opacity animate-[myblur_0.4s_ease-in-out] overflow-auto">
                          <div className="p-5 ">
                            <span className="block font-semibold text-xl sm:text-2xl">
                              {` When's your trip?`}
                            </span>
                          </div>
                          <div className="flex-1 relative flex z-10 ">
                            <div className="w-full overflow-hidden rounded-3xl p-2">
                              <DatePicker
                                key={resetKey}
                                selected={startDate}
                                onChange={handleChangeDate}
                                startDate={startDate}
                                endDate={endDate}
                                excludeDateIntervals={blockedDateIntervals}
                                selectsRange
                                isClearable
                                minDate={new Date()}
                                monthsShown={2}
                                showPopperArrow={false}
                                inline
                                renderCustomHeader={(p) => (
                                  <DatePickerCustomHeaderTwoMonth {...p} />
                                )}
                                renderDayContents={(day, date) => (
                                  <DatePickerCustomDay
                                    dayOfMonth={day}
                                    date={date}
                                  />
                                )}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="px-4 py-3 bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-700 flex justify-between">
                      <button
                        type="button"
                        className="underline font-semibold text-sm flex-shrink-0"
                        onClick={resetFilters}
                      >
                        Clear dates
                      </button>
                      <ButtonPrimary
                        sizeClass="px-6 py-3 !rounded-xl"
                        disabled={
                          !endDate || startDate?.getTime() === endDate.getTime()
                        }
                        onClick={saveAndCloseModal}
                      >
                        <span className="text-sm">Save</span>
                      </ButtonPrimary>
                    </div>
                  </>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ModalSelectDate;
