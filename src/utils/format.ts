import type { Price } from "@/types/common";

/**
 * Formats a Price object or numeric amount into a display string.
 */
export function formatPrice(price: Price | number, currency: string = "USD"): string {
  if (typeof price === "number") {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency
    }).format(price);
  }
  return price.display || new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: price.currency
  }).format(price.amount);
}

/**
 * Formats an ISO date string or Date object into a readable string (e.g. "Jul 10, 2026").
 */
export function formatDate(dateStr: string | Date, options?: Intl.DateTimeFormatOptions): string {
  if (!dateStr) return "";
  const date = typeof dateStr === "string" ? new Date(dateStr) : dateStr;
  
  // Check for invalid date
  if (isNaN(date.getTime())) return "";

  const defaultOptions: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
    ...options
  };
  return new Intl.DateTimeFormat("en-US", defaultOptions).format(date);
}

/**
 * Formats a duration in minutes to a string like "2h 15m" or "15h 40m".
 */
export function formatDuration(durationMinutes: number): string {
  if (!durationMinutes || durationMinutes <= 0) return "0m";
  const hours = Math.floor(durationMinutes / 60);
  const minutes = durationMinutes % 60;
  if (hours === 0) return `${minutes}m`;
  if (minutes === 0) return `${hours}h`;
  return `${hours}h ${minutes}m`;
}

/**
 * Formats a date-time string to time only (e.g. "13:15" or "1:15 PM").
 */
export function formatTime(dateTimeStr: string, use12Hour: boolean = true): string {
  if (!dateTimeStr) return "";
  
  // If it's already a simple time format (like "16:55"), return it directly or convert
  if (/^\d{2}:\d{2}$/.test(dateTimeStr)) {
    if (!use12Hour) return dateTimeStr;
    const [hoursStr, minutesStr] = dateTimeStr.split(":");
    const hours = parseInt(hoursStr, 10);
    const ampm = hours >= 12 ? "PM" : "AM";
    const displayHours = hours % 12 || 12;
    return `${displayHours}:${minutesStr} ${ampm}`;
  }

  const date = new Date(dateTimeStr);
  if (isNaN(date.getTime())) return dateTimeStr;

  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: use12Hour
  });
}
