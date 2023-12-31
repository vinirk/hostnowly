import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import React, { FC, Fragment, useCallback, useRef, useState } from "react";
import ButtonPrimary from "components/common/Button/ButtonPrimary";
import GuestsInput from "components/common/GuestsInput/GuestsInput";

interface ModalSelectGuestsProps {
  renderChildren?: (p: { openModal: () => void }) => React.ReactNode;
  adults?: number;
  children?: number;
  onChangeGuests?: (adults: number, children: number) => void;
}

const ModalSelectGuests: FC<ModalSelectGuestsProps> = ({
  renderChildren = ({ openModal }) => (
    <button onClick={openModal}>Select Guests</button>
  ),
  adults: initialAdults = 0,
  children: initialChildren = 0,
  onChangeGuests = () => {},
}) => {
  const [showModal, setShowModal] = useState(false);
  const [tempAdults, setTempAdults] = useState(initialAdults);
  const [tempChildren, setTempChildren] = useState(initialChildren);
  const [resetKey, setResetKey] = useState(0);
  const previousAdults = useRef<number | null>(null);
  const previousChildren = useRef<number | null>(null);

  const closeModal = useCallback(() => {
    setShowModal(false);
    setTempAdults(previousAdults.current ?? 0);
    setTempChildren(previousChildren.current ?? 0);
  }, []);

  const openModal = useCallback(() => {
    setShowModal(true);
  }, []);

  const saveAndCloseModal = useCallback(() => {
    closeModal();
    previousAdults.current = tempAdults;
    previousChildren.current = tempChildren;
    onChangeGuests(tempAdults, tempChildren);
  }, [closeModal, onChangeGuests, tempAdults, tempChildren]);

  const resetFilters = useCallback(() => {
    setResetKey((prevKey) => prevKey + 1);
    onChangeGuests(0, 0);
  }, [onChangeGuests]);

  const handleChangeFilters = useCallback(
    (adults: number, children: number) => {
      setTempAdults(adults);
      setTempChildren(children);
    },
    [],
  );

  return (
    <>
      {renderChildren({ openModal })}
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
                              {`Who is coming?`}
                            </span>
                          </div>
                          <div className="flex-1 relative flex z-10 ">
                            <div className="w-full overflow-hidden rounded-3xl ">
                              <GuestsInput
                                key={resetKey}
                                className="flex-1"
                                adults={initialAdults}
                                children={initialChildren}
                                onChangeFilters={handleChangeFilters}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="px-4 py-3 bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-700 flex justify-between">
                      <button
                        type="button"
                        className="underline font-semibold flex-shrink-0"
                        onClick={resetFilters}
                      >
                        Clear guests
                      </button>
                      <ButtonPrimary
                        disabled={(tempAdults ?? 0) + (tempChildren ?? 0) < 1}
                        sizeClass="px-6 py-3 !rounded-xl"
                        onClick={saveAndCloseModal}
                      >
                        Save
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

export default ModalSelectGuests;
