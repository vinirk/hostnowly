import generateTimestampId from 'utils/idGenerator';

export interface NavItemType {
  id: string;
  name: string;
  href: string;
  targetBlank?: boolean;
}

export const NavigationItems: NavItemType[] = [
  {
    id: generateTimestampId(),
    href: '/',
    name: 'Home',
  },
  {
    id: generateTimestampId(),
    href: '/stays',
    name: 'Stays',
  },
  {
    id: generateTimestampId(),
    href: '/my-bookings',
    name: 'Booking history',
  },
];
