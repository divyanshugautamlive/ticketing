/** Train-related types */

import type { Location, Price } from "./common";

/** Train class / coach type */
export interface TrainClass {
  /** Class identifier, e.g. "1A", "2A", "3A", "SL", "CC", "EC" */
  id: string;
  /** Display name, e.g. "First AC", "Second AC", "Chair Car" */
  name: string;
  /** Short code for badges */
  shortName: string;
  /** Price for this class */
  price: Price;
  /** Seats / berths available */
  available: number;
  /** Whether this class is available for booking */
  isAvailable: boolean;
}

/** Train search result */
export interface TrainResult {
  /** Unique train identifier */
  id: string;
  /** Train name, e.g. "Rajdhani Express" */
  name: string;
  /** Train number, e.g. "12952" */
  trainNumber: string;
  /** Origin station */
  origin: Location;
  /** Destination station */
  destination: Location;
  /** Departure time (HH:mm format) */
  departureTime: string;
  /** Arrival time (HH:mm format) */
  arrivalTime: string;
  /** Duration in minutes */
  durationMinutes: number;
  /** Days of operation, e.g. ["Mon", "Wed", "Fri"] */
  runsOn: string[];
  /** Available classes */
  classes: TrainClass[];
  /** Lowest price across all classes */
  startingPrice: Price;
  /** Train type: "Rajdhani", "Shatabdi", "Duronto", "Superfast", "Express", "Mail" */
  trainType: string;
  /** Pantry / food available */
  hasPantry: boolean;
  /** Distance in km */
  distanceKm?: number;
}

/** Detailed train view */
export interface TrainDetail extends TrainResult {
  /** All intermediate stops */
  intermediateStops: Array<{
    station: Location;
    arrivalTime: string;
    departureTime: string;
    day: number;
    distanceKm: number;
    haltMinutes: number;
  }>;
  /** Coach composition */
  coachComposition?: string[];
  /** Average speed */
  avgSpeedKmh?: number;
  /** Return availability (for round-trip) */
  returnAvailability?: TrainResult[];
}

/** Train search parameters */
export interface TrainSearchParams {
  origin: string;
  destination: string;
  date: string;
  trainClass?: string;
  quota?: "general" | "tatkal" | "ladies" | "senior_citizen";
}

/** Train filter options */
export interface TrainFilters {
  priceRange: [number, number];
  trainTypes: string[];
  departureTimeRange?: [string, string];
  arrivalTimeRange?: [string, string];
  classes: string[];
  availableOnly: boolean;
}
