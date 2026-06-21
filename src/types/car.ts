/** Car rental-related types */

import type { ImageData, Location, Price, Rating } from "./common";

/** Car rental search result */
export interface CarResult {
  /** Unique car rental ID */
  id: string;
  /** Car brand & model name, e.g. "Toyota RAV4" */
  name: string;
  /** Car class: "economy" | "compact" | "intermediate" | "standard" | "suv" | "luxury" | "electric" | "van" */
  type: string;
  /** Rental agency name, e.g. "Hertz", "Enterprise", "Avis" */
  agency: string;
  /** Guest rating of agency/car */
  rating: Rating;
  /** Price per day */
  pricePerDay: Price;
  /** Transmission: "automatic" | "manual" */
  transmission: "automatic" | "manual";
  /** Fuel policy, e.g. "Full to Full" */
  fuelPolicy: string;
  /** Number of seats */
  seats: number;
  /** Large luggage capacity */
  luggageLarge: number;
  /** Small luggage capacity */
  luggageSmall: number;
  /** Air conditioning flag */
  airConditioning: boolean;
  /** Unlimited mileage flag */
  unlimitedMileage: boolean;
  /** Main vehicle image */
  image: ImageData;
  /** Rental pickup location details */
  location: Location;
}

/** Detailed car rental view */
export interface CarDetail extends CarResult {
  /** Brief description of vehicle category/experience */
  description: string;
  /** Engine type, e.g. "2.4L 4-Cylinder" or "Electric Motor" */
  engineType: string;
  /** Estimated miles per gallon (MPG) or range (e.g. "28/35 MPG" or "320 mi range") */
  mpg: string;
  /** List of vehicle features */
  features: string[];
  /** Optional insurance packages */
  insuranceOptions: Array<{
    id: string;
    name: string;
    description: string;
    pricePerDay: Price;
  }>;
  /** Specific pickup instructions at airport/city */
  pickupInstructions: string;
  /** Specific dropoff instructions */
  dropoffInstructions: string;
  /** Rental requirements / terms list */
  requirements: string[];
}

/** Car search parameters */
export interface CarSearchParams {
  pickupLocation: string;
  dropoffLocation?: string;
  differentDropoff?: boolean;
  pickupDate: string;
  pickupTime: string;
  dropoffDate: string;
  dropoffTime: string;
  carClass?: string;
}

/** Car rental filter state */
export interface CarFilters {
  priceRange?: [number, number];
  transmission?: string[];
  carTypes?: string[];
  agencies?: string[];
  unlimitedMileage?: boolean;
}
