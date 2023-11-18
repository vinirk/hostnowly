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
    href: '/featured-stays',
    name: 'Featured stays',
  },
  {
    id: generateTimestampId(),
    href: '/my-bookings',
    name: 'Booking history',
  },
];
