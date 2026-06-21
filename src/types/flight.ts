/** Flight-related types */

import type { CabinClass, ImageData, Location, Price, TripType } from "./common";

/** Airline information */
export interface Airline {
  /** Airline name, e.g. "Emirates" */
  name: string;
  /** IATA airline code, e.g. "EK" */
  code: string;
  /** Airline logo image */
  logo?: ImageData;
  /** Alliance membership */
  alliance?: string;
}

/** A single segment of a flight (one take-off to one landing) */
export interface FlightSegment {
  /** Unique segment identifier */
  id: string;
  /** Operating airline */
  airline: Airline;
  /** Flight number, e.g. "EK 510" */
  flightNumber: string;
  /** Departure airport */
  departure: Location;
  /** Arrival airport */
  arrival: Location;
  /** ISO 8601 departure date-time */
  departureTime: string;
  /** ISO 8601 arrival date-time */
  arrivalTime: string;
  /** Duration in minutes */
  durationMinutes: number;
  /** Aircraft type, e.g. "Boeing 777-300ER" */
  aircraft?: string;
  /** Cabin class for this segment */
  cabinClass: CabinClass;
  /** Available baggage allowance description */
  baggage?: string;
}

/** A complete flight result (may include multiple segments) */
export interface FlightResult {
  /** Unique flight result identifier */
  id: string;
  /** All segments in order */
  segments: FlightSegment[];
  /** Overall departure location */
  origin: Location;
  /** Overall arrival location */
  destination: Location;
  /** Total price per person */
  price: Price;
  /** Total duration of the entire journey in minutes */
  totalDuration: number;
  /** Number of stops (0 = non-stop) */
  stops: number;
  /** Stop-over cities (if any) */
  stopoverCities?: string[];
  /** Cabin class */
  cabinClass: CabinClass;
  /** Available seats remaining (if known) */
  seatsLeft?: number;
  /** Whether this is a "best deal" or featured result */
  isFeatured?: boolean;
  /** Baggage info summary */
  baggageIncluded?: string;
  /** Refundable flag */
  isRefundable?: boolean;
}

/** Detailed flight view (extends result with more info) */
export interface FlightDetail extends FlightResult {
  /** Return segments (for round-trip) */
  returnSegments?: FlightSegment[];
  /** Fare rules and conditions */
  fareRules?: string[];
  /** Fare class code, e.g. "Y", "B" */
  fareClass?: string;
  /** In-flight amenities */
  amenities?: string[];
  /** Change / cancellation policy text */
  cancellationPolicy?: string;
}

/** Flight-specific search parameters */
export interface FlightSearchParams {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
  tripType: TripType;
  cabinClass: CabinClass;
  adults: number;
  children: number;
  infants: number;
  directOnly?: boolean;
}

/** Flight-specific filter options */
export interface FlightFilters {
  priceRange: [number, number];
  airlines: string[];
  maxStops: number;
  departureTimeRange?: [string, string];
  arrivalTimeRange?: [string, string];
  durationMax?: number;
  cabinClass?: CabinClass;
}
