/** Vacation stay types (Airbnb-style properties) */

import type { ImageData, Location, Price, Rating } from "./common";

/** Vacation stay search result */
export interface StayResult {
  /** Unique stay identifier */
  id: string;
  /** Property name */
  name: string;
  /** Location */
  location: Location;
  /** Guest rating */
  rating: Rating;
  /** Price per night */
  pricePerNight: Price;
  /** Main image */
  image: ImageData;
  /** Gallery images */
  gallery?: ImageData[];
  /** Property type: "villa", "apartment", "cabin", "cottage", "penthouse" */
  propertyType: string;
  /** Number of bedrooms */
  bedrooms: number;
  /** Number of bathrooms */
  bathrooms: number;
  /** Max guest capacity */
  maxGuests: number;
  /** Key highlights, e.g. "Private Pool", "Ocean View" */
  highlights: string[];
  /** Superhost / verified flag */
  isSuperhost?: boolean;
  /** Instant booking available? */
  instantBook?: boolean;
}

/** Detailed vacation stay view */
export interface StayDetail extends StayResult {
  /** Full description */
  description: string;
  /** All amenities */
  amenities: string[];
  /** House rules */
  houseRules: string[];
  /** Check-in time */
  checkInTime: string;
  /** Check-out time */
  checkOutTime: string;
  /** Cancellation policy */
  cancellationPolicy: string;
  /** Host information */
  host: {
    name: string;
    avatar?: ImageData;
    responseRate: string;
    responseTime: string;
    isSuperhost: boolean;
    joinedDate: string;
  };
  /** Availability calendar (simplified) */
  unavailableDates?: string[];
  /** Cleaning fee */
  cleaningFee?: Price;
  /** Service fee */
  serviceFee?: Price;
  /** Minimum nights */
  minNights: number;
  /** Maximum nights */
  maxNights?: number;
}

/** Stay search parameters */
export interface StaySearchParams {
  destination: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  propertyType?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
}
