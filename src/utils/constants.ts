export const COMPANY_NAME = "Ticketing Info";
export const PHONE_NUMBER = "+1 (800) 555-0199";
export const SUPPORT_EMAIL = "support@ticketing.info";

export const NAV_LINKS = [
  { label: "Deals", href: "/deals" },
  { label: "My Trips", href: "/my-trips" },
  { label: "Help Center", href: "/support" },
  { label: "About Us", href: "/about" }
];

export const CATEGORIES_CONFIG = {
  flights: {
    label: "Flights",
    icon: "Plane",
    href: "/search?category=flights",
    placeholder: "Where are you flying to?"
  },
  cars: {
    label: "Cars",
    icon: "Car",
    href: "/search?category=cars",
    placeholder: "Where would you like to pick up your car?"
  },
  stays: {
    label: "Stays",
    icon: "Home",
    href: "/search?category=stays",
    placeholder: "Where would you like to stay?"
  },
  cruises: {
    label: "Cruises",
    icon: "Ship",
    href: "/search?category=cruises",
    placeholder: "Where would you like to sail?"
  },
  trains: {
    label: "Trains",
    icon: "Train",
    href: "/search?category=trains",
    placeholder: "Where is your train journey?"
  }
};
