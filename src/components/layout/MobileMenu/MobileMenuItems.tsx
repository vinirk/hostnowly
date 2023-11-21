import { Disclosure } from "@headlessui/react";
import React from "react";
import { NavLink } from "react-router-dom";
import { ButtonClose } from "components/common";
import Logo from "components/common/Logo";
import { NavItemType } from "components/layout/DesktopNavigationMenu/NavigationItem";
import { NavigationMenuItems } from "routers/navigation";

export interface MobileMenuItemsProps {
  data?: NavItemType[];
  onClickClose?: () => void;
}

const MobileMenuItems: React.FC<MobileMenuItemsProps> = ({
  data = NavigationMenuItems,
  onClickClose,
}) => {
  return (
    <div className="overflow-y-auto w-full h-screen py-2 transition transform shadow-lg ring-1 dark:ring-neutral-700 bg-white dark:bg-neutral-900 divide-y-2 divide-neutral-100 dark:divide-neutral-800">
      <div className="py-6 px-5">
        <div className="flex items-center gap-2">
          <Logo />
          <span className="font-leagueSpartan text-2xl font-semibold">
            Hostnowly
          </span>
        </div>
        <span className="absolute right-2 top-2 p-1">
          <ButtonClose onClick={onClickClose} />
        </span>
      </div>
      <ul className="flex flex-col py-6 px-2 space-y-1">
        {data.map((item) => (
          <Disclosure
            key={item.id}
            as="li"
            className="text-neutral-900 dark:text-white"
          >
            <NavLink
              end
              className={({ isActive }) =>
                `flex w-full px-4 font-medium uppercase tracking-wide text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg ${
                  isActive ? "text-secondary" : ""
                }`
              }
              to={{
                pathname: item.href || undefined,
              }}
            >
              <span className={`py-2.5 pr-3 block w-full `}>{item.name}</span>
            </NavLink>
          </Disclosure>
        ))}
      </ul>
    </div>
  );
};

export default MobileMenuItems;
