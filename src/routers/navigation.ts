import { goToBookingHistory, goToStays } from "selectors/routes";
import generateTimestampId from "utils/idGenerator";

export interface NavItemType {
  id: string;
  name: string;
  href: string;
  targetBlank?: boolean;
}

export const NavigationMenuItems: NavItemType[] = [
  {
    id: generateTimestampId(),
    href: "/",
    name: "Home",
  },
  {
    id: generateTimestampId(),
    href: goToStays(),
    name: "Stays",
  },
  {
    id: generateTimestampId(),
    href: goToBookingHistory(),
    name: "Booking history",
  },
];
