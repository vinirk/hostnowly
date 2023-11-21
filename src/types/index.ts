export interface UserType {
  id: string;
  name: string;
  email?: string;
  avatar?: string;
}

export interface HostType extends UserType {
  stays: StayType[];
}

export interface GuestType extends UserType {
  bookings: BookingType;
}

export interface BlockedDateType {
  start: string;
  end: string;
  bookingId?: string;
  stayId?: string;
}

export interface RoomPreviewType {
  id: string;
  name: string;
  href: string;
  thumbnail?: string;
  count: number;
}

export interface StayType {
  id: string;
  host: HostType;
  href: string;
  title: string;
  category: string;
  address: string;
  description: string;
  stars: number;
  reviewCount: number;
  like: boolean;
  galleryImgs: string[];
  price: number;
  maxGuests: number;
  discount?: number | null;
  blockedDates: Date[];
}

export interface BookingType {
  id: string;
  stayId: string;
  adults: number;
  children: number;
  startDate: string;
  endDate: string;
  confirmationDate: string;
  confirmationCode: string;
  cancellationDate?: string;
  totalPrice: number;
}

export interface StaySearchFilters {
  adults: number | null;
  children: number | null;
  startDate: Date | null;
  endDate: Date | null;
}
