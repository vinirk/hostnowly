# Stay and Booking Management UI

This React application utilizes Redux for state management and TypeScript for static typing, focusing on managing stays and bookings.

## Features

- **Listing and Detailing Stays**: Display a list of stays and view details for each.
- **Booking Management**: Manage reservations and bookings.
- **Stay Search and Filters**: Implement filters and search functionality for stays.
- **Responsive Interface**: A user interface that adapts to both mobile and desktop devices.

## Technologies

- **React**
- **Redux Toolkit**
- **TypeScript**
- **React Router**
 

## Project Structure

```plaintext
src/
├── app/
│   ├── store.ts             # Central Redux store configuration
├── features/
│   ├── stays/               # Feature module for stays management
│   │   ├── staysSlice.ts    # Redux slice for managing stays data
│   │   ├── StaysService.ts  # Service for handling stay-related API calls
│   │   └── components/      # React components specific to stays
│   ├── bookings/
│   │   └── bookingsSlice.ts # Redux slice for managing booking data
├── components/
│   ├── common/              # Reusable components used across the app
│   └── layout/              # Components that make up the layout of the app
├── contexts/                # React Contexts for state management outside Redux
├── routers/                 # Router configurations and route definitions
├── selectors/               # Redux selectors for deriving data from the state
├── hooks/                   # Custom React hooks for shared logic
├── pages/                   # Page components for routing
├── styles/                  # Global styles and style-related utilities
├── utils/                   # Utility functions and helpers
├── types/                   # TypeScript types and interfaces
└── index.tsx                # Application entry point; renders the React app
```

---
**NOTE** **EDITED**

Ongoing Refactoring:

The `features` module is currently undergoing a refactor. This aims to decouple the `stays`, `bookings`, and `filters` modules, enhancing the modularity and maintainability of the codebase. Currently, the bookingSlice is being used to handle both booking and filter functionalities. However, within the reducer, everything is well-divided to prevent confusion.

```plaintext
const initialState: BookingState = {
  confirmedBookings: [],
  blockedDates: [],
  details: {
    subtotal: 0,
    serviceFee: 0,
    nights: 0,
    subtotalAdults: 0,
    subtotalChildren: 0,
  },
  filter: {
    price: 0,
    location: '',
    startDate: new Date().toISOString(),
    endDate: new Date().toISOString(),
    guestAdults: 1,
    guestChildren: 0,
  },
};
```
&**Booking, stays and filter slices are created.**

---
