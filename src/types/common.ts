/** Shared / common types used across all categories */

/** Star rating value (1-5, supports half stars) */
export interface Rating {
  /** Average score, e.g. 4.5 */
  score: number;
  /** Total number of reviews */
  count: number;
  /** Optional label, e.g. "Excellent" */
  label?: string;
}

/** Monetary price with currency */
export interface Price {
  /** Amount in the smallest useful unit, e.g. 499.99 */
  amount: number;
  /** ISO 4217 currency code */
  currency: string;
  /** Formatted display string, e.g. "$499.99" */
  display: string;
  /** Original price before discount (if any) */
  originalAmount?: number;
  /** Formatted original price */
  originalDisplay?: string;
}

/** Geographic location */
export interface Location {
  /** City name */
  city: string;
  /** Country name */
  country: string;
  /** IATA airport code or station code (optional) */
  code?: string;
  /** Latitude */
  lat?: number;
  /** Longitude */
  lng?: number;
  /** Full display address */
  address?: string;
}

/** Date range for check-in/check-out, departure/return */
export interface DateRange {
  /** ISO 8601 start date string */
  start: string;
  /** ISO 8601 end date string */
  end: string;
}

/** Image data with multiple sizes */
export interface ImageData {
  /** Primary image URL */
  src: string;
  /** Alt text for accessibility */
  alt: string;
  /** Optional thumbnail URL */
  thumbnail?: string;
  /** Width in pixels */
  width?: number;
  /** Height in pixels */
  height?: number;
}

/** Generic paginated API response wrapper */
export interface PaginatedResponse<T> {
  /** Array of result items */
  data: T[];
  /** Total number of items matching the query */
  total: number;
  /** Current page number (1-based) */
  page: number;
  /** Items per page */
  perPage: number;
  /** Total number of pages */
  totalPages: number;
  /** Whether there is a next page */
  hasNext: boolean;
  /** Whether there is a previous page */
  hasPrev: boolean;
}

/** Standard API error shape */
export interface ApiError {
  /** Machine-readable error code */
  code: string;
  /** Human-readable error message */
  message: string;
  /** HTTP status code */
  status: number;
  /** Optional field-level errors */
  fieldErrors?: Record<string, string>;
}

/** Contact information */
export interface ContactInfo {
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
}

/** Traveler age category */
export type TravelerType = "adult" | "child" | "infant";

/** Cabin / class tier */
export type CabinClass = "economy" | "premium_economy" | "business" | "first";

/** Trip direction */
export type TripType = "one_way" | "round_trip" | "multi_city";
