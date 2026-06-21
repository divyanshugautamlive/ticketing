# 🔐 SECURITY & PRIVACY ACTION PLAN
## Ticketing Info Platform - Immediate Implementation Guide

**Priority Level:** 🔴 CRITICAL - Must implement before production  
**Timeline:** Week 1-2 of development  
**Responsibility:** Security & Backend Lead

---

## PART 1: ISSUES IDENTIFIED IN ANALYSIS (From Audit)
### These were specifically mentioned in the thorough analysis

### ✓ Issue #1: No CSRF Protection
**Status:** Mentioned in analysis ✓ [Section 4: Code Quality Issues]  
**Severity:** 🔴 CRITICAL  
**Current State:** Missing CSRF tokens on forms  

**Immediate Action Required:**
```typescript
// FILE: src/utils/csrf.ts (NEW FILE)
import crypto from 'crypto';

export function generateCSRFToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

export function validateCSRFToken(token: string, storedToken: string): boolean {
  return crypto.timingSafeEqual(
    Buffer.from(token),
    Buffer.from(storedToken)
  );
}
```

**Implementation Steps:**
1. [ ] Create CSRF middleware in Next.js API routes
2. [ ] Add CSRF token to all forms (hidden input)
3. [ ] Validate tokens on POST/PUT/DELETE requests
4. [ ] Store tokens in httpOnly cookies (not localStorage)
5. [ ] Rotate tokens after successful form submission

**Code Location to Update:**
- `src/app/api/` - All mutation endpoints
- `src/components/search/SearchCard.tsx` - Add CSRF token
- `src/app/booking/` - Add CSRF to booking forms
- `src/app/call-agent/` - Add CSRF to callback forms

---

### ✓ Issue #2: No Input Sanitization
**Status:** Mentioned in analysis ✓ [Section 4: Code Quality Issues]  
**Severity:** 🔴 CRITICAL  
**Current State:** Forms accept raw user input without validation

**Immediate Action Required:**
```bash
# Install input sanitization library
npm install zod xss sanitize-html
```

**Create Validation File:**
```typescript
// FILE: src/utils/validation.ts (NEW FILE)
import { z } from 'zod';
import xss from 'xss';
import sanitizeHtml from 'sanitize-html';

// Email Validation
export const emailSchema = z
  .string()
  .email('Invalid email address')
  .min(5, 'Email too short')
  .max(255, 'Email too long')
  .transform(val => val.toLowerCase().trim());

// Phone Validation (International)
export const phoneSchema = z
  .string()
  .regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number')
  .min(10, 'Phone number too short');

// Password Validation
export const passwordSchema = z
  .string()
  .min(12, 'Password must be at least 12 characters')
  .regex(/[A-Z]/, 'Must contain uppercase letter')
  .regex(/[a-z]/, 'Must contain lowercase letter')
  .regex(/[0-9]/, 'Must contain number')
  .regex(/[^A-Za-z0-9]/, 'Must contain special character');

// Name Validation
export const nameSchema = z
  .string()
  .min(2, 'Name too short')
  .max(50, 'Name too long')
  .regex(/^[a-zA-Z\s'-]+$/, 'Invalid characters in name');

// Search Input Sanitization
export function sanitizeSearchInput(input: string): string {
  return xss(input, { whiteList: {}, stripIgnoredTag: true }).trim();
}

// HTML Sanitization for rich text
export function sanitizeHTML(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: ['b', 'i', 'em', 'strong', 'p', 'br'],
    allowedAttributes: {},
    disallowedTagsMode: 'discard'
  });
}

// Booking Data Validation Schema
export const searchParamsSchema = z.object({
  origin: z.string().min(2).max(100),
  destination: z.string().min(2).max(100),
  adults: z.number().min(1).max(9),
  children: z.number().min(0).max(9),
  infants: z.number().min(0).max(9)
});

// Traveler Details Validation
export const travelerSchema = z.object({
  firstName: nameSchema,
  lastName: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  dateOfBirth: z.string().date('Invalid date'),
  nationality: z.string().length(2, 'Invalid country code'),
  passportNumber: z.string().optional().refine(
    val => !val || /^[A-Z0-9]{5,20}$/.test(val),
    'Invalid passport number'
  )
});
```

**Implementation Steps:**
1. [ ] Install required libraries (zod, xss, sanitize-html)
2. [ ] Create validation schema file (as above)
3. [ ] Add validation to all form submissions
4. [ ] Sanitize user input before database storage
5. [ ] Add error messages for validation failures

**Code Locations to Update:**
- `src/app/api/search/` - Validate search parameters
- `src/app/api/bookings/` - Validate booking data
- `src/app/api/callback/` - Validate callback form
- All form components - Add validation before submission

---

### ✓ Issue #3: No Rate Limiting
**Status:** Mentioned in analysis ✓ [Section 4: Code Quality Issues]  
**Severity:** 🔴 CRITICAL  
**Current State:** No protection against brute force or API abuse

**Immediate Action Required:**
```bash
# Install rate limiting library
npm install express-rate-limit redis
```

**Create Rate Limiting Middleware:**
```typescript
// FILE: src/lib/rateLimiter.ts (NEW FILE)
import { RateLimiterMemory } from 'rate-limiter-flexible';

// In-memory rate limiter (for development)
// In production, use Redis-based limiter
const rateLimiterMemory = new RateLimiterMemory({
  points: 100, // Number of requests
  duration: 60, // Per 60 seconds
});

// Specific limiters
export const authLimiter = new RateLimiterMemory({
  points: 5, // 5 attempts
  duration: 15 * 60, // Per 15 minutes
});

export const searchLimiter = new RateLimiterMemory({
  points: 50, // 50 requests
  duration: 60, // Per minute
});

export const callbackLimiter = new RateLimiterMemory({
  points: 3, // 3 callback requests
  duration: 24 * 60 * 60, // Per day per IP
});

// Middleware for Express/Next.js
export async function applyRateLimit(
  key: string,
  limiter: typeof authLimiter
): Promise<boolean> {
  try {
    await limiter.consume(key);
    return true;
  } catch (rejRes) {
    return false;
  }
}
```

**API Route Implementation:**
```typescript
// FILE: src/app/api/auth/signin/route.ts (UPDATED)
import { authLimiter, applyRateLimit } from '@/lib/rateLimiter';

export async function POST(request: Request) {
  const clientIP = request.headers.get('x-forwarded-for') || 
                   request.headers.get('x-real-ip') || 
                   'unknown';
  
  // Apply rate limit
  const allowed = await applyRateLimit(clientIP, authLimiter);
  if (!allowed) {
    return new Response(
      JSON.stringify({ error: 'Too many login attempts. Try again later.' }),
      { status: 429 }
    );
  }

  // Continue with sign-in logic
  // ...
}
```

**Implementation Steps:**
1. [ ] Install rate-limiter-flexible package
2. [ ] Create rate limiter configuration
3. [ ] Add middleware to API routes
4. [ ] Configure different limits for different endpoints
5. [ ] Add Redis for production (distributed rate limiting)

**Code Locations to Update:**
- `src/app/api/auth/signin/` - 5 attempts per 15 minutes
- `src/app/api/auth/signup/` - 3 new accounts per hour per IP
- `src/app/api/search/` - 50 requests per minute
- `src/app/api/callback/` - 3 requests per 24 hours
- `src/app/api/password-reset/` - 3 attempts per hour

---

### ✓ Issue #4: Contact/Callback Forms Expose Sensitive Data
**Status:** Mentioned in analysis ✓ [Section 9: Critical Issues]  
**Severity:** 🔴 CRITICAL  
**Current State:** Email and phone numbers sent in plain text

**Immediate Action Required:**

```typescript
// FILE: src/app/api/callback/route.ts (NEW FILE)
import { z } from 'zod';
import { emailSchema, phoneSchema, nameSchema } from '@/utils/validation';
import crypto from 'crypto';

const callbackSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  preferredTime: z.enum(['morning', 'afternoon', 'evening']),
  category: z.enum(['flights', 'cars', 'stays', 'cruises', 'trains']),
  notes: z.string().max(500).optional(),
  csrfToken: z.string()
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate input
    const validated = callbackSchema.parse(body);
    
    // HASH sensitive data before storage/transmission
    const emailHash = crypto
      .createHash('sha256')
      .update(validated.email)
      .digest('hex');
    
    const phoneHash = crypto
      .createHash('sha256')
      .update(validated.phone)
      .digest('hex');
    
    // Store hashed values and encrypted sensitive data
    const encryptedData = {
      name: validated.name,
      emailHash,
      phoneHash,
      preferredTime: validated.preferredTime,
      category: validated.category,
      notes: validated.notes,
      timestamp: new Date().toISOString(),
      ipAddress: request.headers.get('x-forwarded-for') || 'unknown'
    };
    
    // Send to CRM/Backend securely (HTTPS only)
    // Never log email/phone in plaintext
    console.log('Callback received:', {
      ...encryptedData,
      email: '[REDACTED]',
      phone: '[REDACTED]'
    });
    
    return new Response(
      JSON.stringify({ success: true, message: 'We will call you soon' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Invalid request' }),
      { status: 400 }
    );
  }
}
```

**Implementation Steps:**
1. [ ] Hash email/phone before storage
2. [ ] Encrypt sensitive data at rest
3. [ ] Add HTTPS enforcement (see Issue #6)
4. [ ] Implement secure transmission (TLS 1.3 minimum)
5. [ ] Add data retention policy (auto-delete after 30 days)
6. [ ] Implement audit logging for data access

---

### ✓ Issue #5: Build Configuration Ignores Errors
**Status:** Mentioned in analysis ✓ [Section 9: Critical Issues - HIGH PRIORITY]  
**Severity:** 🔴 CRITICAL  
**Current State:** TypeScript and ESLint errors are hidden during build

**Immediate Action Required:**

```typescript
// FILE: next.config.ts (UPDATED)
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // REMOVE THESE DANGEROUS SETTINGS:
  // typescript: {
  //   ignoreBuildErrors: true,  // ❌ DELETE THIS LINE
  // },
  // eslint: {
  //   ignoreDuringBuilds: true,  // ❌ DELETE THIS LINE
  // },

  // ENABLE STRICT TYPE CHECKING:
  typescript: {
    ignoreBuildErrors: false,  // ✅ Fix all TypeScript errors
    tsconfigPath: './tsconfig.json'
  },
  
  // ENABLE LINTING:
  eslint: {
    ignoreDuringBuilds: false,  // ✅ Fix all ESLint issues
    dirs: ['src', 'pages', 'components', 'lib', 'utils']
  },

  // SECURITY HEADERS
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          }
        ]
      }
    ];
  },

  // SECURITY REDIRECTS
  async redirects() {
    return [
      {
        source: '/admin',
        destination: 'https://admin.example.com',
        permanent: false
      }
    ];
  }
};

export default nextConfig;
```

**Implementation Steps:**
1. [ ] Remove `ignoreBuildErrors: true`
2. [ ] Remove `ignoreDuringBuilds: true`
3. [ ] Fix all TypeScript errors (run `npm run build`)
4. [ ] Fix all ESLint warnings (run `npm run lint`)
5. [ ] Add security headers as shown above
6. [ ] Test build passes without warnings

---

## PART 2: ADDITIONAL CRITICAL SECURITY ISSUES DISCOVERED
### These are additional issues beyond the analysis (but crucial for security)

### ✓ Issue #6: HTTPS/TLS Not Enforced
**Severity:** 🔴 CRITICAL  
**Current State:** Application vulnerable to man-in-the-middle attacks

**Immediate Action Required:**

```typescript
// FILE: src/middleware.ts (NEW FILE)
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Force HTTPS in production
  if (process.env.NODE_ENV === 'production' && 
      request.headers.get('x-forwarded-proto') !== 'https') {
    return NextResponse.redirect(
      `https://${request.headers.get('host')}${request.nextUrl.pathname}`,
      { status: 301 }
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/:path*']
};
```

**Implementation Steps:**
1. [ ] Create middleware.ts file (as above)
2. [ ] Configure hosting (Vercel/AWS) to enforce HTTPS
3. [ ] Set HSTS header (HTTP Strict Transport Security)
4. [ ] Use TLS 1.2+ minimum
5. [ ] Configure valid SSL certificate

---

### ✓ Issue #7: No Content Security Policy (CSP)
**Severity:** 🔴 CRITICAL  
**Current State:** Vulnerable to XSS attacks, malicious script injection

**Immediate Action Required:**

```typescript
// FILE: next.config.ts (ADD TO HEADERS SECTION)
async headers() {
  return [
    {
      source: '/:path*',
      headers: [
        {
          key: 'Content-Security-Policy',
          value: [
            "default-src 'self'",
            "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net",
            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
            "img-src 'self' data: https: blob:",
            "font-src 'self' https://fonts.gstatic.com",
            "connect-src 'self' https://api.example.com",
            "frame-ancestors 'none'",
            "base-uri 'self'",
            "form-action 'self'"
          ].join('; ')
        }
      ]
    }
  ];
}
```

**Implementation Steps:**
1. [ ] Add CSP header to next.config.ts
2. [ ] Remove 'unsafe-inline' from script-src eventually
3. [ ] Use nonce-based inline scripts
4. [ ] Test with CSP violation reports
5. [ ] Configure CSP report-uri endpoint

---

### ✓ Issue #8: Insecure Authentication (Critical!)
**Severity:** 🔴 CRITICAL  
**Current State:** User data stored in localStorage without encryption; passwords not hashed

**Immediate Action Required:**

```typescript
// FILE: src/context/AuthContext.tsx (REPLACE ENTIRE FILE)
"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<User | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check for auth token in httpOnly cookie (handled by server)
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await fetch('/api/auth/me', {
        credentials: 'include', // Include cookies
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, error: data.error || 'Sign in failed' };
      }

      setUser(data.user);
      router.push('/my-trips'); // Redirect after successful login
      return { success: true };
    } catch (error) {
      console.error('Sign in error:', error);
      return { success: false, error: 'Network error. Please try again.' };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      await fetch('/api/auth/signout', {
        method: 'POST',
        credentials: 'include'
      });
      setUser(null);
      router.push('/');
    } catch (error) {
      console.error('Sign out error:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (data: Partial<User>) => {
    if (!user) return null;

    try {
      const response = await fetch('/api/auth/profile', {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Profile update failed');
      }

      const updatedUser = await response.json();
      setUser(updatedUser);
      return updatedUser;
    } catch (error) {
      console.error('Profile update error:', error);
      return null;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        signIn,
        signOut,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
```

**Create Secure Backend Auth APIs:**

```typescript
// FILE: src/app/api/auth/signin/route.ts (NEW FILE)
import { z } from 'zod';
import bcrypt from 'bcrypt';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = signInSchema.parse(body);

    // Validate against database (mock shown here)
    // In production, query your user database
    const user = await validateUserCredentials(email, password);
    
    if (!user) {
      return new Response(
        JSON.stringify({ error: 'Invalid email or password' }),
        { status: 401 }
      );
    }

    // Create JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );

    // Set httpOnly cookie (more secure than localStorage)
    const cookieStore = await cookies();
    cookieStore.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 // 7 days
    });

    return new Response(
      JSON.stringify({
        success: true,
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName
        }
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Invalid request' }),
      { status: 400 }
    );
  }
}

// Mock validation function - replace with real database query
async function validateUserCredentials(email: string, password: string) {
  // In production: Query database for user
  // const user = await db.user.findUnique({ where: { email } });
  
  // Compare hashed passwords
  // const passwordMatch = await bcrypt.compare(password, user.passwordHash);
  
  // For now, return null (will implement with real DB)
  return null;
}
```

**Implementation Steps:**
1. [ ] Install bcrypt and jsonwebtoken
2. [ ] Replace AuthContext.tsx with new version
3. [ ] Create API endpoint for sign-in
4. [ ] Create API endpoint for sign-out
5. [ ] Create API endpoint for auth check (/api/auth/me)
6. [ ] Store auth tokens in httpOnly cookies
7. [ ] Implement password hashing with bcrypt
8. [ ] Add JWT token validation on backend
9. [ ] Implement token refresh mechanism
10. [ ] Remove all localStorage usage for auth

---

### ✓ Issue #9: No Password Security Requirements
**Severity:** 🔴 CRITICAL  
**Current State:** Users can set weak passwords

**Immediate Action Required:**

```typescript
// FILE: src/utils/validation.ts (UPDATE PASSWORD SCHEMA)
export const passwordSchema = z
  .string()
  .min(12, 'Password must be at least 12 characters')
  .max(128, 'Password too long')
  .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Must contain at least one number')
  .regex(/[^A-Za-z0-9]/, 'Must contain at least one special character (!@#$%^&*)')
  .refine(
    (password) => !commonPasswords.includes(password.toLowerCase()),
    'Password is too common, please choose a unique password'
  );

// Common passwords to block
const commonPasswords = [
  'password123', 'qwerty12345', '123456789', 'admin@123',
  // ... add more common passwords
];

// Password strength checker
export function getPasswordStrength(password: string): {
  score: number;
  feedback: string[];
} {
  let score = 0;
  const feedback: string[] = [];

  if (password.length >= 12) score++;
  else feedback.push('Use at least 12 characters');

  if (password.length >= 16) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  else feedback.push('Add numbers');

  if (/[^A-Za-z0-9]/.test(password)) score++;
  else feedback.push('Add special characters');

  return {
    score: Math.min(score, 5),
    feedback
  };
}
```

**Implementation Steps:**
1. [ ] Enforce 12+ character minimum
2. [ ] Require uppercase, lowercase, numbers, special chars
3. [ ] Block common passwords
4. [ ] Implement password strength meter in UI
5. [ ] Hash passwords with bcrypt (cost factor: 12)
6. [ ] Never store plaintext passwords
7. [ ] Implement password history (prevent reuse)
8. [ ] Add password expiration policy (90 days)

---

### ✓ Issue #10: No Protection Against XSS Attacks
**Severity:** 🔴 CRITICAL  
**Current State:** User input rendered without sanitization

**Immediate Action Required:**

```typescript
// FILE: src/lib/xss-protection.ts (NEW FILE)
import DOMPurify from 'isomorphic-dompurify';

/**
 * Sanitize HTML to prevent XSS attacks
 */
export function sanitizeHTML(dirty: string): string {
  if (typeof window === 'undefined') {
    // Server-side sanitization
    return DOMPurify.sanitize(dirty, {
      ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'u', 'p', 'br', 'ul', 'ol', 'li'],
      ALLOWED_ATTR: [],
      KEEP_CONTENT: true
    });
  }

  // Client-side sanitization
  return DOMPurify.sanitize(dirty);
}

/**
 * Escape HTML special characters
 */
export function escapeHTML(text: string): string {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}

/**
 * Safely render user-generated content
 */
export function SafeHTML({ html }: { html: string }) {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: sanitizeHTML(html)
      }}
    />
  );
}
```

**Implementation Steps:**
1. [ ] Install isomorphic-dompurify
2. [ ] Create XSS protection utilities
3. [ ] Sanitize all user input from:
     - Search forms
     - Booking forms
     - Comments/notes
     - Profile information
4. [ ] Never use dangerouslySetInnerHTML without sanitization
5. [ ] Encode output in templates
6. [ ] Use Content Security Policy (see Issue #7)

---

### ✓ Issue #11: No Protection Against SQL Injection
**Severity:** 🔴 CRITICAL  
**Current State:** When APIs are built, vulnerable to SQL injection

**Immediate Action Required:**

```typescript
// FILE: src/lib/database.ts (NEW FILE)
import { Pool } from 'pg'; // For PostgreSQL

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

/**
 * Execute parameterized queries (safe from SQL injection)
 */
export async function query(
  text: string,
  params: any[]
) {
  const result = await pool.query(text, params);
  return result.rows;
}

// ✅ SAFE - Using parameterized queries
export async function findUserByEmail(email: string) {
  const result = await query(
    'SELECT * FROM users WHERE email = $1',
    [email]
  );
  return result[0];
}

// ❌ UNSAFE - Never do this!
// const query = `SELECT * FROM users WHERE email = '${email}'`;
// This allows: email = "'; DROP TABLE users; --"

/**
 * ORM Usage (Recommended)
 */
// Using Prisma (recommended approach)
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Prisma automatically prevents SQL injection
export async function getUserById(id: string) {
  return prisma.user.findUnique({
    where: { id }
  });
}
```

**Implementation Steps:**
1. [ ] Always use parameterized queries
2. [ ] Use ORM (Prisma recommended) instead of raw SQL
3. [ ] Never concatenate strings into SQL
4. [ ] Validate input before database queries
5. [ ] Use principle of least privilege for DB user
6. [ ] Enable SQL query logging for auditing
7. [ ] Regular security audits of database access

---

### ✓ Issue #12: No Data Encryption at Rest
**Severity:** 🔴 CRITICAL  
**Current State:** Sensitive data stored in plaintext in database

**Immediate Action Required:**

```typescript
// FILE: src/lib/encryption.ts (NEW FILE)
import crypto from 'crypto';

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'dev-key-12345678901234567890123456';

/**
 * Encrypt sensitive data (email, phone, etc.)
 */
export function encrypt(plaintext: string): string {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(
    'aes-256-cbc',
    Buffer.from(ENCRYPTION_KEY.padEnd(32, '0')),
    iv
  );

  let encrypted = cipher.update(plaintext, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  // Return iv:encrypted for storage
  return `${iv.toString('hex')}:${encrypted}`;
}

/**
 * Decrypt sensitive data
 */
export function decrypt(encryptedData: string): string {
  const [ivHex, encryptedHex] = encryptedData.split(':');
  const iv = Buffer.from(ivHex, 'hex');

  const decipher = crypto.createDecipheriv(
    'aes-256-cbc',
    Buffer.from(ENCRYPTION_KEY.padEnd(32, '0')),
    iv
  );

  let decrypted = decipher.update(encryptedHex, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted;
}

/**
 * Hash sensitive data (one-way, for comparison)
 */
export function hashSensitiveData(data: string): string {
  return crypto
    .createHash('sha256')
    .update(data + process.env.HASH_SALT)
    .digest('hex');
}
```

**Implementation Steps:**
1. [ ] Create encryption utilities
2. [ ] Encrypt personal data (email, phone, passport)
3. [ ] Hash passwords with bcrypt
4. [ ] Generate strong encryption key (32 bytes)
5. [ ] Store encryption key in environment variables
6. [ ] Encrypt data in transit (HTTPS/TLS)
7. [ ] Encrypt data at rest (database level)
8. [ ] Implement key rotation policy
9. [ ] Secure key management (AWS KMS, HashiCorp Vault)

---

### ✓ Issue #13: No Audit Logging
**Severity:** 🟡 HIGH  
**Current State:** No tracking of security-relevant actions

**Immediate Action Required:**

```typescript
// FILE: src/lib/audit-logger.ts (NEW FILE)
import { Pool } from 'pg';

interface AuditLog {
  userId?: string;
  action: string;
  resource: string;
  changes: Record<string, any>;
  ipAddress: string;
  userAgent: string;
  timestamp: Date;
  status: 'success' | 'failure';
}

export async function logAuditEvent(log: AuditLog) {
  // Log to database
  try {
    await db.query(
      `INSERT INTO audit_logs 
       (user_id, action, resource, changes, ip_address, user_agent, status) 
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        log.userId,
        log.action,
        log.resource,
        JSON.stringify(log.changes),
        log.ipAddress,
        log.userAgent,
        log.status
      ]
    );

    // Also log to security monitoring system
    if (log.status === 'failure') {
      console.warn('[SECURITY ALERT]', log);
      // Send to security monitoring service (e.g., Sentry, DataDog)
    }
  } catch (error) {
    console.error('Failed to log audit event:', error);
  }
}

// Usage example
export function createAuditLogger(request: Request) {
  const ipAddress = request.headers.get('x-forwarded-for') || 'unknown';
  const userAgent = request.headers.get('user-agent') || 'unknown';

  return {
    log: (action: string, resource: string, changes: any, status: 'success' | 'failure' = 'success') => {
      logAuditEvent({
        action,
        resource,
        changes,
        ipAddress,
        userAgent,
        timestamp: new Date(),
        status
      });
    }
  };
}
```

**Implementation Steps:**
1. [ ] Create audit logging system
2. [ ] Log all authentication events
3. [ ] Log sensitive data access
4. [ ] Log payment/booking transactions
5. [ ] Log profile changes
6. [ ] Log failed security checks
7. [ ] Retain logs for 90+ days
8. [ ] Implement log analysis/alerting
9. [ ] Protect audit logs from tampering

---

### ✓ Issue #14: Hardcoded Secrets and Sensitive Data
**Severity:** 🔴 CRITICAL  
**Current State:** API keys, promo codes hardcoded in source

**Immediate Action Required:**

```bash
# FILE: .env.local (NEW FILE - DO NOT COMMIT)
# Authentication
JWT_SECRET=your-super-secret-jwt-key-change-this
BCRYPT_SALT_ROUNDS=12

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/ticketing
ENCRYPTION_KEY=your-32-byte-encryption-key-here

# API Keys (never hardcode!)
API_KEY_FLIGHTS=your-flight-api-key
API_KEY_HOTELS=your-hotel-api-key
API_KEY_STRIPE=your-stripe-api-key

# Promo Codes (moved to database, not hardcoded)
# Old way (REMOVE):
# const PROMO_CODE = "TRAVEL10";

# Email Service
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password

# Analytics
ANALYTICS_ID=your-ga-id

# App URLs
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Security
RATE_LIMIT_ENABLED=true
CSRF_PROTECTION_ENABLED=true
```

**Remove Hardcoded Values:**

```typescript
// FILE: src/utils/constants.ts (UPDATE)

// ❌ BEFORE (INSECURE)
// export const PROMO_CODE = "TRAVEL10";
// export const API_KEY = "sk-abc123xyz";
// export const ADMIN_PASSWORD = "admin123";

// ✅ AFTER (SECURE)
export const PHONE_NUMBER = process.env.NEXT_PUBLIC_PHONE_NUMBER || "+1-800-TRAVEL";

// Never export sensitive values
// They should only exist in environment variables
// And be used on backend/server components only
```

**Implementation Steps:**
1. [ ] Create .env.local file with all secrets
2. [ ] Add .env.local to .gitignore
3. [ ] Remove hardcoded API keys
4. [ ] Remove hardcoded promo codes
5. [ ] Remove hardcoded passwords
6. [ ] Move promo codes to database
7. [ ] Use environment variables for all config
8. [ ] Implement secret rotation
9. [ ] Use secure secret management (AWS Secrets Manager, etc.)

---

### ✓ Issue #15: No HTTPS Enforcement
**Severity:** 🔴 CRITICAL  
**Current State:** Application accessible over HTTP in development

**Immediate Action Required:**

```typescript
// FILE: src/middleware.ts (NEW FILE)
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // In production, enforce HTTPS
  if (process.env.NODE_ENV === 'production') {
    const proto = request.headers.get('x-forwarded-proto');
    
    if (proto !== 'https') {
      const url = request.nextUrl.clone();
      url.protocol = 'https:';
      return NextResponse.redirect(url, {
        status: 301
      });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/:path*']
};
```

**Implementation Steps:**
1. [ ] Create middleware.ts
2. [ ] Configure hosting with HTTPS (Vercel, AWS, etc.)
3. [ ] Enable HSTS header
4. [ ] Use TLS 1.2+ minimum
5. [ ] Set Strict-Transport-Security header
6. [ ] Enable certificate pinning (optional)

---

### ✓ Issue #16: No Session Management
**Severity:** 🔴 CRITICAL  
**Current State:** Sessions don't timeout, no refresh token mechanism

**Immediate Action Required:**

```typescript
// FILE: src/lib/session.ts (NEW FILE)
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

const ACCESS_TOKEN_EXPIRY = '15m'; // 15 minutes
const REFRESH_TOKEN_EXPIRY = '7d'; // 7 days

/**
 * Create access and refresh tokens
 */
export function createTokens(userId: string, email: string) {
  const accessToken = jwt.sign(
    { userId, email, type: 'access' },
    process.env.JWT_SECRET!,
    { expiresIn: ACCESS_TOKEN_EXPIRY }
  );

  const refreshToken = jwt.sign(
    { userId, email, type: 'refresh' },
    process.env.JWT_REFRESH_SECRET!,
    { expiresIn: REFRESH_TOKEN_EXPIRY }
  );

  return { accessToken, refreshToken };
}

/**
 * Set session cookies
 */
export async function setSessionCookies(tokens: { accessToken: string; refreshToken: string }) {
  const cookieStore = await cookies();

  cookieStore.set('access_token', tokens.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 15 * 60 // 15 minutes
  });

  cookieStore.set('refresh_token', tokens.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 // 7 days
  });
}

/**
 * Refresh access token using refresh token
 */
export async function refreshAccessToken(refreshToken: string) {
  try {
    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET!
    ) as { userId: string; email: string };

    const newAccessToken = jwt.sign(
      { userId: decoded.userId, email: decoded.email, type: 'access' },
      process.env.JWT_SECRET!,
      { expiresIn: ACCESS_TOKEN_EXPIRY }
    );

    return newAccessToken;
  } catch (error) {
    return null;
  }
}
```

**Implementation Steps:**
1. [ ] Implement token-based sessions
2. [ ] Use short-lived access tokens (15 mins)
3. [ ] Use longer-lived refresh tokens (7 days)
4. [ ] Store tokens in httpOnly cookies
5. [ ] Implement token refresh endpoint
6. [ ] Invalidate tokens on logout
7. [ ] Add idle session timeout
8. [ ] Implement automatic token refresh
9. [ ] Implement device tracking

---

## PART 3: COMPREHENSIVE TO-DO LIST

### 🔴 CRITICAL PRIORITY (Week 1 - Must Do Before Any Frontend)

```
SECURITY FIXES - Week 1
─────────────────────────────────────────────────

Authentication & Session Management
□ Remove all localStorage usage for auth tokens
□ Implement httpOnly cookie-based sessions
□ Create secure AuthContext using server-side auth
□ Implement password hashing with bcrypt (cost: 12)
□ Create JWT token system (access + refresh)
□ Implement session timeout (15 min idle)
□ Create /api/auth/signin endpoint
□ Create /api/auth/signout endpoint
□ Create /api/auth/me endpoint
□ Create /api/auth/refresh endpoint
□ Remove mock user creation from AuthContext
□ Add password strength requirements (12+ chars, mixed case, numbers, special)
□ Implement password history (prevent reuse)
□ Add account lockout after 5 failed attempts

Input Validation & Sanitization
□ Install: zod, xss, sanitize-html, isomorphic-dompurify
□ Create validation schemas for all forms
□ Create email validation schema
□ Create phone validation schema
□ Create password validation schema
□ Create name validation schema
□ Create credit card validation (PCI-DSS compliant)
□ Add XSS protection utilities
□ Sanitize all user inputs before storage
□ Add server-side validation on all API endpoints
□ Create error messages for validation failures

Build Configuration & Error Handling
□ Remove typescript.ignoreBuildErrors: true
□ Remove eslint.ignoreDuringBuilds: true
□ Fix all TypeScript errors (run build)
□ Fix all ESLint warnings (run lint)
□ Create error boundary components
□ Add error pages (404, 500, 503)
□ Implement error logging to monitoring service
□ Create error recovery UI components
□ Hide sensitive error details from users

Security Headers
□ Add Content-Security-Policy header
□ Add X-Content-Type-Options: nosniff
□ Add X-Frame-Options: SAMEORIGIN
□ Add X-XSS-Protection: 1; mode=block
□ Add Referrer-Policy: strict-origin-when-cross-origin
□ Add Permissions-Policy header
□ Add Strict-Transport-Security (HSTS)
□ Configure security headers in next.config.ts
```

### 🟡 HIGH PRIORITY (Week 2)

```
CSRF & Data Protection - Week 2
─────────────────────────────────────────────────

CSRF Protection
□ Create CSRF token generation utility
□ Add CSRF token validation middleware
□ Add CSRF tokens to all forms
□ Validate CSRF tokens on POST/PUT/DELETE
□ Store tokens in httpOnly cookies
□ Rotate tokens after successful submissions
□ Add CSRF token to contact forms
□ Add CSRF token to booking forms
□ Add CSRF token to callback forms

Rate Limiting
□ Install: rate-limiter-flexible, redis
□ Create rate limiter configuration
□ Add rate limit to sign-in (5 attempts/15 mins)
□ Add rate limit to sign-up (3 accounts/hour)
□ Add rate limit to search (50 requests/minute)
□ Add rate limit to callback (3 requests/24 hours)
□ Add rate limit to password reset (3 attempts/hour)
□ Implement rate limit headers in responses
□ Add Redis for distributed rate limiting
□ Monitor rate limit violations

Data Encryption & Hashing
□ Create encryption utilities (AES-256-CBC)
□ Encrypt sensitive data at rest:
  □ Email addresses
  □ Phone numbers
  □ Passport numbers
□ Hash non-searchable fields:
  □ Passwords (bcrypt)
  □ PII for comparison
□ Implement encryption key rotation
□ Create key management strategy
□ Use environment variables for encryption keys
□ Document encryption methods

HTTPS & TLS
□ Create middleware.ts for HTTPS enforcement
□ Configure hosting with HTTPS
□ Enable HSTS header (max-age: 31536000)
□ Set Strict-Transport-Security header
□ Use TLS 1.2+ minimum
□ Configure valid SSL certificate
□ Test SSL configuration
□ Enable HTTP/2 on server

Data Handling & Privacy
□ Hash phone/email before callback storage
□ Never log sensitive data in plaintext
□ Implement data retention policy (auto-delete)
□ Add GDPR compliance notices
□ Create privacy policy page
□ Create data deletion API endpoint
□ Implement audit logging
□ Create data export API endpoint
□ Add Do-Not-Track support
```

### 🟢 MEDIUM PRIORITY (Week 3-4)

```
Advanced Security & Privacy - Week 3-4
─────────────────────────────────────────────────

SQL Injection Prevention
□ Create parameterized query utilities
□ Implement ORM (Prisma recommended)
□ Remove all raw SQL queries
□ Use prepared statements everywhere
□ Validate input before database queries
□ Implement principle of least privilege for DB user
□ Enable SQL query logging for auditing
□ Regular security audits

XSS & Injection Prevention
□ Install: isomorphic-dompurify
□ Create HTML sanitization utilities
□ Sanitize all user-generated content
□ Implement Content Security Policy (CSP)
□ Remove unsafe-inline from script-src (eventually)
□ Use nonce-based inline scripts
□ Test CSP with violation reports
□ Implement report-uri endpoint

Secrets Management
□ Create .env.local file
□ Add .env.local to .gitignore
□ Move all hardcoded secrets to environment variables
□ Remove API keys from code
□ Remove promo codes from code
□ Remove passwords from code
□ Implement secure secret management:
  □ AWS Secrets Manager
  □ HashiCorp Vault
  □ GitHub Secrets (for CI/CD)
□ Implement secret rotation policy
□ Add secret scanning to git hooks

Audit Logging & Monitoring
□ Create audit logging system
□ Log authentication events
□ Log sensitive data access
□ Log payment transactions
□ Log profile changes
□ Log failed security checks
□ Set retention policy (90+ days)
□ Implement log analysis/alerting
□ Protect audit logs from tampering
□ Export logs for compliance

Privacy & Compliance
□ Create Privacy Policy page
□ Create Terms of Service
□ Create GDPR Consent form
□ Implement cookie consent banner
□ Add analytics consent
□ Create data processing agreement
□ Implement data deletion API
□ Add email unsubscribe links
□ Document data flows
□ Implement privacy by design

Third-Party Integrations
□ Review security of all third-party services
□ Verify SSL certificates of APIs
□ Implement API key rotation
□ Use OAuth 2.0 where applicable
□ Validate webhook signatures
□ Implement request signing
□ Monitor third-party security advisories
□ Create third-party security policy
```

### 🔵 ONGOING (Continuous)

```
Continuous Security Monitoring - Ongoing
─────────────────────────────────────────────────

Testing & Scanning
□ Set up dependency vulnerability scanning
□ Implement SAST (Static Application Security Testing)
□ Implement DAST (Dynamic Application Security Testing)
□ Add security testing to CI/CD pipeline
□ Perform penetration testing (quarterly)
□ Regular security code reviews
□ Implement automated security scanning

Monitoring & Alerting
□ Set up error tracking (Sentry)
□ Implement real-time alerting
□ Monitor for suspicious patterns
□ Track failed authentication attempts
□ Monitor unusual data access
□ Alert on rate limit violations
□ Track API response times
□ Monitor uptime

Updates & Patches
□ Regular dependency updates
□ Security patch management
□ OS/Infrastructure updates
□ Monitor security advisories
□ Subscribe to security mailing lists
□ Regular framework updates
□ Test updates in staging before production

Documentation & Training
□ Document security architecture
□ Create security runbook
□ Document incident response procedures
□ Create security guidelines for team
□ Regular security training for developers
□ Security best practices documentation
□ Maintain security policy documentation
```

---

## PART 4: IMPLEMENTATION CHECKLISTS

### Checklist 1: Immediate (Do This First)

```
Priority: 🔴 CRITICAL - Must complete before frontend deployment

Day 1:
□ Fix next.config.ts (remove ignoreBuildErrors, ignoreDuringBuilds)
□ Fix all TypeScript errors (npm run build)
□ Fix all ESLint issues (npm run lint)
□ Install security packages (zod, bcrypt, jsonwebtoken, xss)
□ Create .env.local with secure values
□ Add .env.local to .gitignore
□ Create validation schemas (validation.ts)
□ Create encryption utilities (encryption.ts)

Day 2:
□ Rewrite AuthContext.tsx (remove localStorage)
□ Create /api/auth/signin endpoint
□ Create /api/auth/signout endpoint
□ Create /api/auth/me endpoint
□ Create CSRF token utilities
□ Add CSRF tokens to all forms

Day 3:
□ Create rate limiter configuration
□ Add rate limiting to login endpoint
□ Add rate limiting to search endpoint
□ Add rate limiting to callback endpoint
□ Create error boundary components
□ Add security headers to next.config.ts

Day 4:
□ Create audit logging system
□ Implement session management
□ Add token refresh mechanism
□ Create password reset flow
□ Document security changes
```

### Checklist 2: Short-term (Complete in Week 2)

```
Priority: 🟡 HIGH

□ Complete all input validation
□ Implement all data encryption
□ Set up HTTPS enforcement
□ Complete CSRF implementation
□ Complete rate limiting
□ Set up audit logging
□ Create privacy policy
□ Create terms of service
□ Add analytics consent
□ Test all security features
```

### Checklist 3: Testing Security

```
Test each security feature:

Authentication:
□ Test sign-in with valid credentials
□ Test sign-in with invalid credentials
□ Test account lockout after 5 attempts
□ Test session timeout
□ Test token refresh
□ Test logout clears session

Authorization:
□ Test users can only access their own data
□ Test unauthenticated users can't access protected pages
□ Test expired tokens are rejected

Input Validation:
□ Test XSS payloads are blocked
□ Test SQL injection attempts are blocked
□ Test email validation works
□ Test password strength validation

CSRF:
□ Test valid CSRF tokens work
□ Test invalid CSRF tokens are rejected
□ Test missing CSRF tokens are rejected

Rate Limiting:
□ Test rate limits are enforced
□ Test rate limit headers are returned
□ Test limits reset after time window

Encryption:
□ Test sensitive data is encrypted
□ Test encrypted data can be decrypted
□ Test keys are properly managed
```

---

## SUMMARY TABLE

| Issue | From Analysis | Severity | Status | Est. Time |
|-------|---|----------|--------|-----------|
| No CSRF Protection | ✓ | 🔴 CRITICAL | TODO | 4 hours |
| No Input Sanitization | ✓ | 🔴 CRITICAL | TODO | 6 hours |
| No Rate Limiting | ✓ | 🔴 CRITICAL | TODO | 4 hours |
| Contact Forms Expose Data | ✓ | 🔴 CRITICAL | TODO | 2 hours |
| Build Ignores Errors | ✓ | 🔴 CRITICAL | TODO | 2 hours |
| No HTTPS | Additional | 🔴 CRITICAL | TODO | 2 hours |
| No CSP Headers | Additional | 🔴 CRITICAL | TODO | 2 hours |
| Insecure Auth | Additional | 🔴 CRITICAL | TODO | 8 hours |
| Weak Passwords | Additional | 🔴 CRITICAL | TODO | 3 hours |
| No XSS Protection | Additional | 🔴 CRITICAL | TODO | 4 hours |
| SQL Injection Risk | Additional | 🔴 CRITICAL | TODO | 4 hours |
| No Data Encryption | Additional | 🔴 CRITICAL | TODO | 6 hours |
| No Audit Logging | Additional | 🟡 HIGH | TODO | 4 hours |
| Hardcoded Secrets | Additional | 🔴 CRITICAL | TODO | 2 hours |
| Session Management | Additional | 🔴 CRITICAL | TODO | 6 hours |
| **TOTAL IMPLEMENTATION TIME** | | | | **~56 hours** |

---

## RISK ASSESSMENT

### Current Vulnerabilities (Before Implementation)
- 🔴 **Critical (5+):** CSRF, SQL Injection, XSS, Auth, Data Exposure
- 🟡 **High (3+):** Rate Limiting, Session Management, Audit Logging
- 🟢 **Medium (2+):** CSP, HTTPS, Input Validation

### After Implementation
- All critical vulnerabilities eliminated
- OWASP Top 10 2021 compliance
- Industry-standard security practices
- Production-ready security posture

---

## DEPLOYMENT CHECKLIST

Before deploying to production:

```
Security Verification
□ All HTTPS endpoints working
□ All security headers present
□ CSRF protection active
□ Rate limiting enforced
□ Input validation working
□ Error messages don't leak info
□ Secrets not in code/logs
□ Audit logging operational

Compliance
□ Privacy policy published
□ Terms of service published
□ GDPR consent implemented
□ Cookie consent banner active
□ Data retention policies implemented

Testing
□ Security penetration testing passed
□ SAST scanning passed (no critical issues)
□ Dependency scan passed (no critical CVEs)
□ Authentication/Authorization tested
□ All error scenarios tested

Operations
□ Monitoring/alerting configured
□ Log retention configured
□ Incident response plan documented
□ Security contacts updated
□ Backup/recovery tested
□ DDoS mitigation configured
```

---

## NEXT STEPS

1. **Start Week 1:** Fix critical issues (Section Part 1)
2. **Start Week 2:** Implement security features (Section Part 2)
3. **Parallel:** Review and understand each implementation
4. **Testing:** Test each feature thoroughly
5. **Documentation:** Document security architecture
6. **Team Training:** Ensure team understands security measures

---

**Document Version:** 1.0  
**Created:** June 21, 2026  
**Priority:** 🔴 CRITICAL - DO NOT SKIP  
**Owner:** Security & Backend Team
