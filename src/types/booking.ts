/** Booking-related types */

import type { ContactInfo, Price, TravelerType } from "./common";
import type { SearchCategory } from "./search";

/** Status of a booking */
export type BookingStatus =
  | "pending"
  | "confirmed"
  | "cancelled"
  | "completed"
  | "refunded"
  | "failed";

/** Payment method types */
export type PaymentMethod = "credit_card" | "debit_card" | "paypal" | "bank_transfer" | "agent";

/** A single traveler's details */
export interface TravelerDetails {
  /** Traveler index (0-based) */
  index: number;
  /** Traveler type */
  type: TravelerType;
  /** Title: Mr, Mrs, Ms, Dr */
  title: string;
  /** First name */
  firstName: string;
  /** Last name */
  lastName: string;
  /** Date of birth (ISO 8601) */
  dateOfBirth: string;
  /** Nationality / country */
  nationality: string;
  /** Passport number (international) */
  passportNumber?: string;
  /** Passport expiry date */
  passportExpiry?: string;
  /** Frequent flyer number */
  frequentFlyerNumber?: string;
  /** Meal preference */
  mealPreference?: string;
  /** Seat preference */
  seatPreference?: string;
  /** Special assistance needed */
  specialAssistance?: string;
}

/** An item selected for booking */
export interface BookingItem {
  /** Unique ID of the selected item */
  itemId: string;
  /** Category of the booking */
  category: SearchCategory;
  /** Display title */
  title: string;
  /** Display subtitle / route */
  subtitle: string;
  /** Date or date range */
  dates: string;
  /** Base price per person/unit */
  basePrice: Price;
  /** Selected variant (room type, cabin, class, etc.) */
  variant?: string;
  /** Number of units (rooms, cabins, tickets) */
  quantity: number;
  /** Additional metadata for display */
  metadata?: Record<string, string>;
}

/** Booking price breakdown */
export interface BookingSummary {
  /** Selected item details */
  item: BookingItem;
  /** Number of travelers / guests */
  travelerCount: number;
  /** Base fare total */
  baseFare: Price;
  /** Taxes and fees */
  taxesAndFees: Price;
  /** Service charge */
  serviceCharge?: Price;
  /** Insurance (optional add-on) */
  insurance?: Price;
  /** Discount applied */
  discount?: Price;
  /** Promo code applied */
  promoCode?: string;
  /** Grand total */
  total: Price;
  /** Price per person */
  pricePerPerson?: Price;
}

/** Callback / call request form data */
export interface CallbackRequest {
  /** Contact details */
  contact: ContactInfo;
  /** Preferred callback date */
  preferredDate?: string;
  /** Preferred callback time slot */
  preferredTime?: string;
  /** Trip details / notes */
  notes?: string;
  /** Category of interest */
  category?: SearchCategory;
  /** Reference / booking ID (if existing) */
  referenceId?: string;
}

/** Full booking record */
export interface Booking {
  /** Unique booking ID */
  id: string;
  /** Booking reference number displayed to user */
  referenceNumber: string;
  /** Booking status */
  status: BookingStatus;
  /** Booking category */
  category: SearchCategory;
  /** Booking summary with pricing */
  summary: BookingSummary;
  /** Traveler details */
  travelers: TravelerDetails[];
  /** Contact information */
  contact: ContactInfo;
  /** Payment method used */
  paymentMethod?: PaymentMethod;
  /** Date booking was created (ISO 8601) */
  createdAt: string;
  /** Date booking was last updated */
  updatedAt: string;
  /** Cancellation deadline (ISO 8601) */
  cancellationDeadline?: string;
}
