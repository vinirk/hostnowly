import { FC } from 'react';
import { NavLink } from 'react-router-dom';

export interface NavItemType {
  id: string;
  name: string;
  href: string;
  targetBlank?: boolean;
}

export interface NavigationItemProps {
  menuItem: NavItemType;
}

const NavigationItem: FC<NavigationItemProps> = ({ menuItem }) => {
  return (
    <NavLink
      end
      target={menuItem.targetBlank ? '_blank' : undefined}
      rel='noopener noreferrer'
      className={({ isActive }) =>
        `inline-flex uppercase font-leagueSpartan items-center text-sm xl:text-base font-normal text-neutral-700 dark:text-neutral-300 py-2 px-4 xl:px-5 rounded-full hover:text-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 dark:hover:text-neutral-200 tracking  ${
          isActive
            ? 'font-semibold !text-neutral-900 bg-neutral-100 dark:bg-neutral-800 dark:!text-neutral-100'
            : 'font-semibold'
        }`
      }
      to={menuItem.href || '/'}
    >
      {menuItem.name}
    </NavLink>
  );
};

export default NavigationItem;
