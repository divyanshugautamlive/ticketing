import { z } from "zod";
import xss from "xss";
import sanitizeHtml from "sanitize-html";

// Email Validation
export const emailSchema = z
  .string()
  .email("Invalid email address")
  .min(5, "Email too short")
  .max(255, "Email too long")
  .transform((val) => val.toLowerCase().trim());

// Phone Validation (International format or basic numbers)
export const phoneSchema = z
  .string()
  .min(7, "Phone number too short")
  .max(20, "Phone number too long")
  .regex(/^\+?[0-9\s\-()]+$/, "Invalid phone number format");

// Password Validation
export const passwordSchema = z
  .string()
  .min(12, "Password must be at least 12 characters")
  .regex(/[A-Z]/, "Must contain at least one uppercase letter")
  .regex(/[a-z]/, "Must contain at least one lowercase letter")
  .regex(/[0-9]/, "Must contain at least one number")
  .regex(/[^A-Za-z0-9]/, "Must contain at least one special character");

// Name Validation
export const nameSchema = z
  .string()
  .min(2, "Name too short")
  .max(50, "Name too long")
  .regex(/^[a-zA-Z\s'\-]+$/, "Invalid characters in name");

// Search Input Sanitization
export function sanitizeSearchInput(input: string): string {
  return xss(input, { whiteList: {}, stripIgnoreTag: true }).trim();
}

// HTML Sanitization for rich text
export function sanitizeHTML(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: ["b", "i", "em", "strong", "p", "br"],
    allowedAttributes: {},
    disallowedTagsMode: "discard"
  });
}

// Search Input Validation Schema
export const searchParamsSchema = z.object({
  origin: z.string().min(2).max(100).optional(),
  destination: z.string().min(2).max(100).optional(),
  adults: z.number().min(1).max(9).optional(),
  children: z.number().min(0).max(9).optional(),
  infants: z.number().min(0).max(9).optional()
});

// Traveler Details Validation (matching the BookingPage form fields)
export const travelerSchema = z.object({
  firstName: nameSchema,
  lastName: nameSchema,
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)"),
  nationality: z.string().length(2, "Invalid country code"),
  passportNumber: z.string().optional().or(z.literal("")).refine(
    (val) => !val || /^[A-Z0-9]{5,20}$/i.test(val),
    "Invalid passport number"
  )
});

// Contact details schema
export const contactSchema = z.object({
  firstName: nameSchema,
  lastName: nameSchema,
  email: emailSchema,
  phone: phoneSchema
});
