/** Cruise-related types */

import type { ImageData, Location, Price, Rating } from "./common";

/** A port in a cruise route */
export interface CruisePort {
  /** Port location */
  location: Location;
  /** Day number in the itinerary */
  day: number;
  /** Arrival time at port */
  arrivalTime?: string;
  /** Departure time from port */
  departureTime?: string;
  /** Whether this is an embarkation/disembarkation port */
  isTerminal: boolean;
}

/** Full cruise route/itinerary */
export interface CruiseRoute {
  /** Route name, e.g. "Western Mediterranean" */
  name: string;
  /** All ports of call in order */
  ports: CruisePort[];
  /** Total sea days */
  seaDays: number;
}

/** Cabin type on a cruise */
export interface Cabin {
  /** Unique cabin type ID */
  id: string;
  /** Cabin type name, e.g. "Interior", "Ocean View", "Balcony", "Suite" */
  name: string;
  /** Short description */
  description: string;
  /** Price per person */
  pricePerPerson: Price;
  /** Cabin size in sqft */
  sizeSqFt?: number;
  /** Max occupancy */
  maxOccupancy: number;
  /** Cabin deck */
  deck?: string;
  /** Cabin amenities */
  amenities?: string[];
  /** Availability */
  isAvailable: boolean;
  /** Image */
  image?: ImageData;
}

/** Cruise search result */
export interface CruiseResult {
  /** Unique cruise identifier */
  id: string;
  /** Cruise name, e.g. "Mediterranean Explorer" */
  name: string;
  /** Cruise line, e.g. "Royal Caribbean" */
  cruiseLine: string;
  /** Ship name */
  shipName: string;
  /** Route summary */
  route: CruiseRoute;
  /** Departure port */
  departurePort: Location;
  /** Duration in nights */
  nights: number;
  /** Starting price per person */
  pricePerPerson: Price;
  /** Departure date */
  departureDate: string;
  /** Return date */
  returnDate: string;
  /** Main image */
  image: ImageData;
  /** Guest rating */
  rating: Rating;
  /** Key highlights */
  highlights?: string[];
  /** Featured / promoted flag */
  isFeatured?: boolean;
}

/** Detailed cruise view */
export interface CruiseDetail extends CruiseResult {
  /** Full description */
  description: string;
  /** All cabin options */
  cabins: Cabin[];
  /** Gallery images */
  gallery: ImageData[];
  /** Ship amenities */
  shipAmenities: string[];
  /** Dining options */
  diningOptions: string[];
  /** Entertainment options */
  entertainment: string[];
  /** What's included */
  included: string[];
  /** What's not included */
  notIncluded: string[];
  /** Dress code info */
  dressCode?: string;
  /** Age restrictions */
  agePolicy?: string;
}

/** Cruise search parameters */
export interface CruiseSearchParams {
  departurePort?: string;
  destination?: string;
  departureMonth?: string;
  minNights?: number;
  maxNights?: number;
  cruiseLine?: string;
  passengers: number;
}
