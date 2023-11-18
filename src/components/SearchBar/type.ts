export interface GuestsObject {
  guestAdults?: number;
  guestChildren?: number;
  guestInfants?: number;
}

export interface PropertyType {
  name: string;
  description: string;
  checked: boolean;
}

export interface ClassOfProperties extends PropertyType {}

export type DateRange = [Date | null, Date | null];
