/** Central re-export barrel for all types */

// Common / shared types
export type {
  Rating,
  Price,
  Location,
  DateRange,
  ImageData,
  PaginatedResponse,
  ApiError,
  ContactInfo,
  TravelerType,
  CabinClass,
  TripType,
} from "./common";

// Search types
export { SearchCategory } from "./search";
export type { SearchParams, SortOption, FilterState } from "./search";

// Flight types
export type {
  Airline,
  FlightSegment,
  FlightResult,
  FlightDetail,
  FlightSearchParams,
  FlightFilters,
} from "./flight";

// Car types
export type {
  CarResult,
  CarDetail,
  CarSearchParams,
  CarFilters,
} from "./car";

// Stay types
export type {
  StayResult,
  StayDetail,
  StaySearchParams,
} from "./stay";

// Cruise types
export type {
  CruisePort,
  CruiseRoute,
  Cabin,
  CruiseResult,
  CruiseDetail,
  CruiseSearchParams,
} from "./cruise";

// Train types
export type {
  TrainClass,
  TrainResult,
  TrainDetail,
  TrainSearchParams,
  TrainFilters,
} from "./train";

// Booking types
export type {
  BookingStatus,
  PaymentMethod,
  TravelerDetails,
  BookingItem,
  BookingSummary,
  CallbackRequest,
  Booking,
} from "./booking";
