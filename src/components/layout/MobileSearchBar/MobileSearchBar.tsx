import { Dialog, Tab, Transition } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ButtonPrimary } from "components/common";
import StaySearchFormMobile from "components/layout/MobileSearchBar/StaySearchFormMobile";
import { goToStays } from "selectors/routes";

const MobileSearchBar = () => {
  const [showModal, setShowModal] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const navigate = useNavigate();

  let timer: NodeJS.Timeout | null = null;

  useEffect(() => {
    setShowDialog(true);
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, []);

  const resetFilters = () => {
    setShowDialog(false);
    timer = setTimeout(() => {
      setShowDialog(true);
    }, 1);
  };

  //
  const handleCloseModal = () => {
    setShowModal(false);
  };

  function handleOpenModal() {
    setShowModal(true);
  }

  const renderButtonOpenModal = () => {
    return (
      <button
        onClick={handleOpenModal}
        className="relative flex items-center w-full border border-neutral-200 dark:border-neutral-6000 px-4 py-2 pr-11 rounded-full shadow-lg"
      >
        <MagnifyingGlassIcon className="flex-shrink-0 w-5 h-5" />

        <div className="ml-3 flex-1 text-left overflow-hidden">
          <span className="block font-medium text-sm">Where to?</span>
          <div className="block mt-0.5 text-xs font-light text-neutral-500 dark:text-neutral-400 ">
            <span className="line-clamp-1">
              Anywhere • Any week • Add guests
            </span>
          </div>
        </div>

        <span className="absolute right-2 top-1/2 transform -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full border border-neutral-200 dark:border-neutral-6000 dark:text-neutral-300">
          <svg
            viewBox="0 0 16 16"
            aria-hidden="true"
            role="presentation"
            focusable="false"
            className="block w-4 h-4"
            fill="currentColor"
          >
            <path d="M5 8c1.306 0 2.418.835 2.83 2H14v2H7.829A3.001 3.001 0 1 1 5 8zm0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm6-8a3 3 0 1 1-2.829 4H2V4h6.17A3.001 3.001 0 0 1 11 2zm0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"></path>
          </svg>
        </span>
      </button>
    );
  };

  return (
    <div className="w-full">
      {renderButtonOpenModal()}
      <Transition appear show={showModal} as={Fragment}>
        <Dialog as="div" className="relative z-max" onClose={handleCloseModal}>
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
                  {showDialog && (
                    <Tab.Group manual>
                      <div className="absolute right-4 top-4">
                        <button className="" onClick={handleCloseModal}>
                          <XMarkIcon className="w-7 h-7 bg-neutral-800/50 dark:bg-neutral-800/90 rounded-full text-white dark:text-white" />
                        </button>
                      </div>

                      <div className="flex-1 pt-8 px-1.5 sm:px-4 flex overflow-hidden">
                        <div className="flex-1 overflow-y-auto hiddenScrollbar py-4">
                          <div className="transition-opacity animate-[myblur_0.4s_ease-in-out]">
                            <StaySearchFormMobile
                              onCloseModal={handleCloseModal}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="px-4 py-3 bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-700 flex justify-between">
                        <button
                          type="button"
                          className="underline font-semibold flex-shrink-0"
                          onClick={() => {
                            setShowDialog(false);
                            resetFilters();
                          }}
                        >
                          Clear all
                        </button>
                        <ButtonPrimary
                          onClick={() => {
                            resetFilters();
                            navigate(goToStays());
                            setShowDialog(false);
                          }}
                        >
                          Search
                        </ButtonPrimary>
                      </div>
                    </Tab.Group>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default MobileSearchBar;
