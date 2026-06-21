/** Search-related types: categories, parameters, sort & filter state */

import type { CabinClass, DateRange, TripType } from "./common";

/** All supported booking categories */
export enum SearchCategory {
  Flights = "flights",
  Cars = "cars",
  Stays = "stays",
  Cruises = "cruises",
  Trains = "trains",
}

/** Universal search parameters — each category adds its own specifics */
export interface SearchParams {
  /** Active category */
  category: SearchCategory;
  /** Origin city / airport / station */
  origin?: string;
  /** Destination city / hotel location / cruise port */
  destination?: string;
  /** Date range (departure/return or check-in/check-out) */
  dates?: DateRange;
  /** Number of adult travelers */
  adults: number;
  /** Number of child travelers */
  children: number;
  /** Number of infant travelers */
  infants: number;
  /** Number of rooms (Stays only) */
  rooms?: number;

  /* ── Flight-specific ─────────────────── */
  /** Trip type: one-way, round-trip, multi-city */
  tripType?: TripType;
  /** Preferred cabin class */
  cabinClass?: CabinClass;
  /** Prefer direct/non-stop flights only */
  directOnly?: boolean;

  /* ── Car-specific ────────────────────── */
  /** Pick-up location */
  pickupLocation?: string;
  /** Drop-off location */
  dropoffLocation?: string;
  /** Drop off at different location */
  differentDropoff?: boolean;
  /** Pick-up time (e.g., "10:00 AM") */
  pickupTime?: string;
  /** Drop-off time (e.g., "10:00 AM") */
  dropoffTime?: string;
  /** Preferred car class/size */
  carClass?: string;

  /* ── Cruise-specific ─────────────────── */
  /** Cruise line name filter */
  cruiseLine?: string;
  /** Minimum duration in nights */
  minNights?: number;
  /** Maximum duration in nights */
  maxNights?: number;

  /* ── Train-specific ──────────────────── */
  /** Preferred train class */
  trainClass?: string;

  /* ── Pagination & sorting ────────────── */
  page?: number;
  perPage?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

/** Sorting option for results display */
export interface SortOption {
  /** Machine-readable key, e.g. "price_asc" */
  value: string;
  /** Human-readable label, e.g. "Price: Low to High" */
  label: string;
}

/** Active filter state for any category */
export interface FilterState {
  /** Price range filter [min, max] */
  priceRange?: [number, number];
  /** Selected airline codes */
  airlines?: string[];
  /** Maximum number of stops */
  maxStops?: number;
  /** Time-of-day departure window */
  departureTime?: string;
  /** Time-of-day arrival window */
  arrivalTime?: string;
  /** Free-text search keyword */
  keyword?: string;
  /** Minimum rating filter */
  minRating?: number;

  /* ── Car-specific ────────────────────── */
  /** Car type filters (e.g., SUV, Economy) */
  carTypes?: string[];
  /** Car rental agencies (e.g., Hertz, Avis) */
  carAgencies?: string[];
  /** Transmission types (e.g., Automatic, Manual) */
  transmissions?: string[];

  /* ── Cabin types (cruise) ────────────── */
  cabinTypes?: string[];

  /* ── Train class filter ──────────────── */
  trainClasses?: string[];
}
