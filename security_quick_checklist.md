# 🚀 QUICK REFERENCE: SECURITY IMPLEMENTATION CHECKLIST

## START HERE - First 24 Hours

### 1️⃣ Fix Build Configuration (30 minutes)
```bash
# Edit: next.config.ts
# DELETE THESE LINES:
# typescript: { ignoreBuildErrors: true }
# eslint: { ignoreDuringBuilds: true }

# Replace with:
typescript: { ignoreBuildErrors: false }
eslint: { ignoreDuringBuilds: false }

# Run and fix errors:
npm run build  # Fix all TypeScript errors
npm run lint   # Fix all ESLint warnings
```

### 2️⃣ Install Security Dependencies (10 minutes)
```bash
npm install zod xss sanitize-html isomorphic-dompurify bcrypt jsonwebtoken rate-limiter-flexible
```

### 3️⃣ Create .env.local (15 minutes)
```
# Copy this to .env.local (ADD YOUR REAL VALUES)
JWT_SECRET=your-super-secret-key-min-32-chars
JWT_REFRESH_SECRET=another-super-secret-key-min-32-chars
BCRYPT_SALT_ROUNDS=12
ENCRYPTION_KEY=your-32-byte-key-must-be-exactly-32-bytes
HASH_SALT=your-hash-salt-value
DATABASE_URL=your-database-url
NODE_ENV=development
```

### 4️⃣ Create Validation File (30 minutes)
Create: `src/utils/validation.ts` (See Part 1: Issue #2 in action plan)

### 5️⃣ Create Encryption File (30 minutes)
Create: `src/lib/encryption.ts` (See Part 2: Issue #12 in action plan)

### 6️⃣ Rewrite AuthContext (1 hour)
Replace entire: `src/context/AuthContext.tsx` (See Part 2: Issue #8 in action plan)

### 7️⃣ Create Security Headers (45 minutes)
Update: `next.config.ts` - Add headers section (See Part 1: Issue #5 in action plan)

---

## SECOND 24 HOURS - Core Security Features

### 8️⃣ Create CSRF Protection (1 hour)
Create: `src/utils/csrf.ts` and add to forms (See Part 1: Issue #1)

### 9️⃣ Create Rate Limiter (1 hour)
Create: `src/lib/rateLimiter.ts` (See Part 1: Issue #3)

### 🔟 Create Auth APIs (2 hours)
Create:
- `src/app/api/auth/signin/route.ts`
- `src/app/api/auth/signout/route.ts`
- `src/app/api/auth/me/route.ts`
- `src/app/api/auth/refresh/route.ts`

### 1️⃣1️⃣ Create XSS Protection (45 minutes)
Create: `src/lib/xss-protection.ts` (See Part 2: Issue #10)

### 1️⃣2️⃣ Add Audit Logging (1 hour)
Create: `src/lib/audit-logger.ts` (See Part 2: Issue #13)

---

## CRITICAL VULNERABILITIES FOUND IN YOUR CODE

### 🚨 DANGER #1: AuthContext Storing Unencrypted Data in localStorage
**File:** `src/context/AuthContext.tsx`  
**Issue:** User email, phone, and personal data stored in plaintext  
**Fix:** Completely replace this file (see action plan Part 2: Issue #8)

### 🚨 DANGER #2: No Password Security
**File:** `src/context/AuthContext.tsx`  
**Issue:** Password parameter ignored, no hashing, weak requirements  
**Fix:** Implement bcrypt hashing + password strength validation

### 🚨 DANGER #3: next.config.ts Hiding All Errors
**File:** `next.config.ts`  
**Issue:** `ignoreBuildErrors: true` hides security issues  
**Fix:** Remove both ignore settings immediately

### 🚨 DANGER #4: Sensitive Data in Booking Context
**File:** `src/context/BookingContext.tsx`  
**Issue:** Credit card data handled without encryption  
**Fix:** Add encryption before any payment integration

### 🚨 DANGER #5: No Input Validation
**File:** All forms  
**Issue:** User input not validated or sanitized  
**Fix:** Add zod validation schemas to all API routes

---

## IMPLEMENTATION ORDER

### Week 1: MUST DO FIRST ⭐⭐⭐
```
Day 1 Morning:
□ Fix next.config.ts (remove ignored errors)
□ Fix all TypeScript/ESLint errors
□ Create .env.local file
□ Install npm packages

Day 1 Afternoon:
□ Create validation.ts file
□ Create encryption.ts file
□ Create csrf.ts file
□ Create XSS protection utilities

Day 2:
□ REWRITE AuthContext.tsx completely
□ Create /api/auth/signin endpoint
□ Create /api/auth/signout endpoint
□ Create /api/auth/me endpoint

Day 3:
□ Create rate limiter
□ Add rate limiting to auth endpoints
□ Create audit logging
□ Add security headers to next.config.ts

Day 4:
□ Create session management utilities
□ Add CSRF tokens to all forms
□ Create error boundaries
□ Write documentation
```

### Week 2: Complete This ⭐⭐
```
□ Complete input validation on all forms
□ Add encryption to sensitive fields
□ Implement HTTPS enforcement
□ Complete rate limiting setup
□ Create privacy policy page
□ Create terms of service page
□ Set up audit logging
□ Test all security features
```

### Week 3+: Enhance & Monitor ⭐
```
□ Implement analytics consent
□ Add GDPR compliance
□ Set up security monitoring
□ Create incident response plan
□ Regular security updates
□ Penetration testing
```

---

## CRITICAL CODE CHANGES NEEDED

### Change 1: AuthContext.tsx
**Status:** 🔴 CRITICAL  
**Current:** Stores plain user data in localStorage  
**Required:** Complete rewrite to use httpOnly cookies + server auth  
**Time:** 1-2 hours  
**Action:** Replace entire file (see action plan Part 2: Issue #8)

### Change 2: next.config.ts
**Status:** 🔴 CRITICAL  
**Current:** Hiding TypeScript and ESLint errors  
**Required:** Remove error ignoring, add security headers  
**Time:** 30 minutes  
**Action:** Delete 2 lines, add header configuration

### Change 3: All API Routes
**Status:** 🔴 CRITICAL  
**Current:** No validation, no CSRF protection, no rate limiting  
**Required:** Add input validation, CSRF tokens, rate limiting  
**Time:** 2-3 hours  
**Action:** Update all API route handlers

### Change 4: All Forms
**Status:** 🔴 CRITICAL  
**Current:** No CSRF tokens, no validation  
**Required:** Add hidden CSRF token fields, client-side validation  
**Time:** 2 hours  
**Action:** Update search, booking, callback forms

### Change 5: Environment Setup
**Status:** 🔴 CRITICAL  
**Current:** Hardcoded secrets in code  
**Required:** Move all secrets to .env.local  
**Time:** 30 minutes  
**Action:** Create .env.local with all secrets

---

## FILES TO CREATE (NEW)

```
src/utils/validation.ts          - Input validation schemas (zod)
src/utils/csrf.ts                - CSRF token generation/validation
src/lib/encryption.ts            - Data encryption utilities
src/lib/xss-protection.ts        - XSS protection utilities
src/lib/rateLimiter.ts           - Rate limiting configuration
src/lib/audit-logger.ts          - Audit logging system
src/lib/session.ts               - Session management
src/middleware.ts                - HTTPS enforcement middleware

src/app/api/auth/signin/route.ts - Secure sign-in endpoint
src/app/api/auth/signout/route.ts- Sign-out endpoint
src/app/api/auth/me/route.ts     - Get current user endpoint
src/app/api/auth/refresh/route.ts- Token refresh endpoint

.env.local                        - Environment variables (DON'T COMMIT)
.env.local.example               - Example env file (for git)
```

---

## FILES TO REPLACE (REWRITE)

```
src/context/AuthContext.tsx      - Complete rewrite needed
next.config.ts                   - Add security headers
```

---

## FILES TO UPDATE (ADD CODE TO)

```
src/app/api/callback/route.ts    - Add validation + encryption
src/app/api/search/*/route.ts    - Add input validation
src/components/search/SearchCard.tsx  - Add CSRF token
src/app/booking/*/page.tsx       - Add validation
src/app/call-agent/*/page.tsx    - Add validation + CSRF
```

---

## TESTING CHECKLIST

After implementing security features:

```
Authentication:
□ Can sign in with valid credentials
□ Cannot sign in with invalid credentials
□ Cannot access protected pages without auth
□ Tokens expire after 15 minutes
□ Can refresh token successfully
□ Tokens are in httpOnly cookies (not localStorage)
□ Password hashing works (bcrypt)
□ Password strength validation works

CSRF Protection:
□ Forms contain CSRF tokens
□ Cannot submit form without token
□ Cannot submit with invalid token
□ Token rotates after submission

Rate Limiting:
□ Auth limited to 5 attempts per 15 min
□ Search limited to 50 requests per min
□ Callback limited to 3 per 24 hours

Input Validation:
□ XSS payloads blocked
□ Invalid emails rejected
□ Invalid phones rejected
□ Weak passwords rejected
□ SQL injection attempts blocked

Data Protection:
□ Sensitive data is encrypted
□ Passwords are hashed
□ Error messages don't leak info
□ Secrets not in logs/responses

HTTPS:
□ HTTP redirects to HTTPS
□ HSTS header present
□ All cookies are secure
□ SSL certificate valid
```

---

## PERFORMANCE & DEPLOYMENT

### Development Setup
```bash
# Create .env.local with development values
JWT_SECRET=dev-secret-12345678901234567890
ENCRYPTION_KEY=dev-key-12345678901234567890123456
```

### Production Setup
```bash
# Generate secure random keys:
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Set in production environment:
# - Use AWS Secrets Manager or similar
# - Rotate keys regularly
# - Never hardcode in code
# - Never commit .env.local
```

### Performance Impact
- CSRF tokens: Minimal (~1KB per form)
- Input validation: ~5-10ms per request
- Rate limiting: ~1ms per request
- Encryption: ~10-20ms per operation
- Overall impact: <50ms per request

---

## COMPLIANCE & AUDITING

### Regulations Covered
- ✅ OWASP Top 10 2021
- ✅ GDPR (EU data protection)
- ✅ CCPA (US privacy)
- ✅ PCI DSS (payment data - future)
- ✅ SOC 2 (security audits)

### Documentation Required
- [ ] Security architecture document
- [ ] Data flow diagram
- [ ] Risk assessment report
- [ ] Incident response plan
- [ ] Security policy document
- [ ] Audit log retention policy

---

## MONITORING & MAINTENANCE

### Daily Monitoring
```bash
# Check logs for:
- Failed authentication attempts
- Rate limit violations
- Validation errors
- Security exceptions
```

### Weekly Tasks
```bash
# Check for:
- Dependency updates
- Security advisories
- Failed tests
- Performance degradation
```

### Monthly Tasks
```bash
# Review:
- Audit logs
- Access patterns
- Error trends
- Security metrics
```

### Quarterly Tasks
```bash
# Perform:
- Penetration testing
- Security audit
- Dependency scanning
- Code review
```

---

## QUICK FIXES (Do These First)

### Fix #1: Stop Hiding Errors (5 minutes)
```typescript
// next.config.ts
// REMOVE THESE:
// typescript: { ignoreBuildErrors: true }
// eslint: { ignoreDuringBuilds: true }

// KEEP IT SIMPLE:
const nextConfig = {
  // ... other config
};
export default nextConfig;
```

### Fix #2: Create .env.local (10 minutes)
```bash
# Create file: .env.local
echo "
JWT_SECRET=$(node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")
ENCRYPTION_KEY=$(node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")
BCRYPT_SALT_ROUNDS=12
DATABASE_URL=postgresql://user:pass@localhost:5432/ticketing
" > .env.local

# Add to .gitignore
echo ".env.local" >> .gitignore
```

### Fix #3: Fix TypeScript Errors (varies)
```bash
npm run build 2>&1 | head -20
# Fix each error shown
npm run build  # Repeat until no errors
```

### Fix #4: Fix ESLint (varies)
```bash
npm run lint -- --fix
npm run lint  # Check remaining issues
```

---

## BEFORE YOU DEPLOY

### ✅ Security Checklist
- [ ] No secrets in code
- [ ] All errors fixed
- [ ] HTTPS enforced
- [ ] Security headers set
- [ ] Input validation working
- [ ] CSRF protection active
- [ ] Rate limiting enforced
- [ ] Passwords hashed
- [ ] Tokens in httpOnly cookies
- [ ] Audit logging working
- [ ] Error pages don't leak info

### ✅ Compliance Checklist
- [ ] Privacy policy published
- [ ] Terms of service published
- [ ] Data retention policy defined
- [ ] User consent collected
- [ ] Data deletion process defined
- [ ] Contact info up to date

### ✅ Testing Checklist
- [ ] Unit tests passing
- [ ] Integration tests passing
- [ ] Security tests passing
- [ ] Manual testing complete
- [ ] Performance acceptable
- [ ] No console errors

---

## RESOURCES & REFERENCES

### Security Standards
- OWASP Top 10: https://owasp.org/www-project-top-ten/
- CWE Top 25: https://cwe.mitre.org/top25/
- NIST Cybersecurity Framework: https://www.nist.gov/cyberframework

### Libraries Used
- Zod (validation): https://zod.dev
- Bcrypt (passwords): https://www.npmjs.com/package/bcrypt
- JWT: https://www.npmjs.com/package/jsonwebtoken
- DOMPurify (XSS): https://www.npmjs.com/package/isomorphic-dompurify

### Next.js Security
- Security Guide: https://nextjs.org/docs/basic-features/data-fetching
- Headers: https://nextjs.org/docs/api-reference/next.config.js/headers
- Middleware: https://nextjs.org/docs/advanced-features/middleware

### Testing Tools
- OWASP ZAP: https://www.zaproxy.org/
- Burp Suite Community: https://portswigger.net/burp/communitydownload
- npm audit: `npm audit`

---

## SUPPORT & HELP

### If You Get Stuck
1. Check the full Security & Privacy Action Plan document
2. Refer to specific issue sections (Part 1 & Part 2)
3. Review code examples provided
4. Test incrementally
5. Document what you've implemented

### Documentation Files
- **Main Analysis:** ticketing_analysis.md
- **Full Security Plan:** security_privacy_actionplan.md  
- **This Checklist:** Quick reference (you're reading it!)

---

**Priority:** 🔴 CRITICAL  
**Estimated Time:** 40-50 hours to complete  
**Start:** Immediately  
**Complete Before:** Any production deployment

**Last Updated:** June 21, 2026
