"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useBooking } from "@/context/BookingContext";
import { useAuth } from "@/context/AuthContext";
import { formatPrice } from "@/utils/format";
import { ShieldCheck, UserCheck, CreditCard, HelpCircle, Sparkles, Phone, Ticket } from "lucide-react";
import { SearchCategory } from "@/types/search";

export default function BookingPage() {
  const router = useRouter();
  const { selectedItem, travelers, pricing, updateTravelers, calculatePricing, clearBooking } = useBooking();
  const { user } = useAuth();

  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState("");
  const [csrfToken, setCsrfToken] = useState("");
  const [error, setError] = useState("");

  // Contact info state
  const [contactInfo, setContactInfo] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: user?.phone || ""
  });

  // Fetch CSRF token on mount
  useEffect(() => {
    async function fetchCsrf() {
      try {
        const res = await fetch("/api/auth/csrf");
        if (res.ok) {
          const data = await res.json();
          if (data && data.csrfToken) {
            setCsrfToken(data.csrfToken);
          }
        }
      } catch (err) {
        console.error("Failed to load CSRF token:", err);
      }
    }
    fetchCsrf();
  }, []);

  // Traveler forms local state
  const [localTravelers, setLocalTravelers] = useState(travelers);
  const [paymentMethod, setPaymentMethod] = useState("credit_card");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync state if travelers update in context
  useEffect(() => {
    setLocalTravelers(travelers);
  }, [travelers]);

  if (!selectedItem || !pricing) {
    return (
      <div className="section-wrap" style={{ padding: "48px 24px", textAlign: "center" }}>
        <h2 style={{ fontWeight: 700 }}>No Selected Bookings</h2>
        <p style={{ color: "var(--muted)" }}>You haven't selected any flight, stay, car, or cruise for booking yet.</p>
        <Link href="/" className="btn-primary" style={{ textDecoration: "none", display: "inline-block", marginTop: "16px" }}>
          Back to Homepage
        </Link>
      </div>
    );
  }

  const handlePromoApply = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError("");
    if (promoCode.toUpperCase() === "TRAVEL10") {
      calculatePricing("TRAVEL10");
      setPromoApplied(true);
    } else {
      setPromoError("Invalid promotional code");
    }
  };

  const handleTravelerFieldChange = (idx: number, field: string, value: string) => {
    const updated = localTravelers.map((t) => {
      if (t.index === idx) {
        return { ...t, [field]: value };
      }
      return t;
    });
    setLocalTravelers(updated);
    updateTravelers(updated);
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      // Validate inputs client-side first
      if (!contactInfo.firstName || !contactInfo.lastName || !contactInfo.email || !contactInfo.phone) {
        throw new Error("Please fill out all contact information.");
      }

      for (let i = 0; i < localTravelers.length; i++) {
        const t = localTravelers[i];
        if (!t.firstName || !t.lastName || !t.dateOfBirth || !t.nationality) {
          throw new Error(`Please complete details for Traveler #${i + 1}.`);
        }
      }

      // Format traveler fields to match travelerSchema
      const formattedTravelers = localTravelers.map((t) => ({
        firstName: t.firstName.trim(),
        lastName: t.lastName.trim(),
        dateOfBirth: t.dateOfBirth,
        nationality: t.nationality.trim(),
        passportNumber: t.passportNumber ? t.passportNumber.trim() : ""
      }));

      const res = await fetch("/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-csrf-token": csrfToken
        },
        body: JSON.stringify({
          category: selectedItem.category,
          summary: pricing,
          travelers: formattedTravelers,
          contact: {
            firstName: contactInfo.firstName.trim(),
            lastName: contactInfo.lastName.trim(),
            email: contactInfo.email.trim(),
            phone: contactInfo.phone.trim()
          },
          paymentMethod
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Checkout failed. Please review details.");
      }

      const referenceNumber = data.referenceNumber;
      const returnedStatus = data.status || (paymentMethod === "agent" ? "pending" : "confirmed");

      // Save plaintext record locally for user visual dashboard (My Trips)
      const bookingRecord = {
        id: "bk-" + Math.floor(Math.random() * 10000),
        referenceNumber,
        status: returnedStatus,
        category: selectedItem.category,
        summary: pricing,
        travelers: localTravelers,
        contact: contactInfo,
        paymentMethod,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      const existing = localStorage.getItem("ticketing_bookings");
      const bookings = existing ? JSON.parse(existing) : [];
      bookings.unshift(bookingRecord);
      localStorage.setItem("ticketing_bookings", JSON.stringify(bookings));

      clearBooking();
      router.push("/my-trips?success=true&ref=" + referenceNumber);
    } catch (err: any) {
      setError(err.message || "An error occurred during booking. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ backgroundColor: "var(--bg)", minHeight: "calc(100vh - 120px)", padding: "24px 0" }}>
      <div className="section-wrap" style={{ padding: "0 24px" }}>
        
        <h1 style={{ fontSize: "28px", fontWeight: 800, marginBottom: "24px" }}>Review and Book</h1>

        <div className="booking-layout">
          {/* Main Checkout Form Column */}
          <form onSubmit={handleCheckout} className="booking-form">
            
            {/* 1. Traveler Details Section */}
            <div className="booking-section" style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px", padding: "24px" }}>
              <h2 style={{ fontSize: "16px", fontWeight: 800, margin: "0 0 16px", borderBottom: "1px solid var(--border)", paddingBottom: "12px", display: "flex", alignItems: "center", gap: "8px" }}>
                <UserCheck size={18} style={{ color: "var(--primary)" }} />
                <span>Traveler / Driver Information</span>
              </h2>

              {localTravelers.map((traveler, idx) => (
                <div
                  key={idx}
                  style={{
                    border: "1px solid var(--border)",
                    borderRadius: "6px",
                    padding: "16px",
                    marginBottom: idx !== localTravelers.length - 1 ? "16px" : "0"
                  }}
                >
                  <h3 style={{ fontSize: "14px", fontWeight: 700, margin: "0 0 12px" }}>
                    Traveler #{idx + 1} ({traveler.type.toUpperCase()})
                  </h3>

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: "12px" }}>
                    {/* Title */}
                    <div>
                      <label style={{ fontSize: "11px", fontWeight: 600, color: "var(--muted)", textTransform: "uppercase" }}>Title</label>
                      <select
                        value={traveler.title}
                        onChange={(e) => handleTravelerFieldChange(idx, "title", e.target.value)}
                        style={{ width: "100%", padding: "8px", border: "1px solid var(--border)", borderRadius: "4px", marginTop: "4px" }}
                      >
                        <option value="Mr">Mr.</option>
                        <option value="Mrs">Mrs.</option>
                        <option value="Ms">Ms.</option>
                        <option value="Dr">Dr.</option>
                      </select>
                    </div>

                    {/* First Name */}
                    <div style={{ gridColumn: "span 2" }}>
                      <label style={{ fontSize: "11px", fontWeight: 600, color: "var(--muted)", textTransform: "uppercase" }}>First Name</label>
                      <input
                        type="text"
                        value={traveler.firstName}
                        onChange={(e) => handleTravelerFieldChange(idx, "firstName", e.target.value)}
                        placeholder="As in passport"
                        required
                        style={{ width: "100%", padding: "8px", border: "1px solid var(--border)", borderRadius: "4px", marginTop: "4px" }}
                      />
                    </div>

                    {/* Last Name */}
                    <div style={{ gridColumn: "span 2" }}>
                      <label style={{ fontSize: "11px", fontWeight: 600, color: "var(--muted)", textTransform: "uppercase" }}>Last Name</label>
                      <input
                        type="text"
                        value={traveler.lastName}
                        onChange={(e) => handleTravelerFieldChange(idx, "lastName", e.target.value)}
                        placeholder="As in passport"
                        required
                        style={{ width: "100%", padding: "8px", border: "1px solid var(--border)", borderRadius: "4px", marginTop: "4px" }}
                      />
                    </div>

                    {/* DOB */}
                    <div>
                      <label style={{ fontSize: "11px", fontWeight: 600, color: "var(--muted)", textTransform: "uppercase" }}>Date of Birth</label>
                      <input
                        type="date"
                        value={traveler.dateOfBirth}
                        onChange={(e) => handleTravelerFieldChange(idx, "dateOfBirth", e.target.value)}
                        required
                        style={{ width: "100%", padding: "6px", border: "1px solid var(--border)", borderRadius: "4px", marginTop: "4px" }}
                      />
                    </div>

                    {/* Passport Number (Optional or conditional) */}
                    {(selectedItem.category === "flights" || selectedItem.category === "cruises") && (
                      <div style={{ gridColumn: "span 2" }}>
                        <label style={{ fontSize: "11px", fontWeight: 600, color: "var(--muted)", textTransform: "uppercase" }}>Passport Number</label>
                        <input
                          type="text"
                          value={traveler.passportNumber || ""}
                          onChange={(e) => handleTravelerFieldChange(idx, "passportNumber", e.target.value)}
                          placeholder="For international trips"
                          style={{ width: "100%", padding: "8px", border: "1px solid var(--border)", borderRadius: "4px", marginTop: "4px" }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* 2. Contact Information Section */}
            <div className="booking-section" style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px", padding: "24px" }}>
              <h2 style={{ fontSize: "16px", fontWeight: 800, margin: "0 0 16px", borderBottom: "1px solid var(--border)", paddingBottom: "12px" }}>
                Contact Details
              </h2>
              
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={{ fontSize: "11px", fontWeight: 600, color: "var(--muted)" }}>EMAIL ADDRESS</label>
                  <input
                    type="email"
                    value={contactInfo.email}
                    onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                    placeholder="ticket@ticketing.info"
                    required
                    style={{ width: "100%", padding: "8px", border: "1px solid var(--border)", borderRadius: "4px", marginTop: "4px" }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: "11px", fontWeight: 600, color: "var(--muted)" }}>PHONE NUMBER</label>
                  <input
                    type="tel"
                    value={contactInfo.phone}
                    onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    required
                    style={{ width: "100%", padding: "8px", border: "1px solid var(--border)", borderRadius: "4px", marginTop: "4px" }}
                  />
                </div>
              </div>
            </div>

            {/* 3. Payment Method Section */}
            <div className="booking-section" style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px", padding: "24px" }}>
              <h2 style={{ fontSize: "16px", fontWeight: 800, margin: "0 0 16px", borderBottom: "1px solid var(--border)", paddingBottom: "12px", display: "flex", alignItems: "center", gap: "8px" }}>
                <CreditCard size={18} style={{ color: "var(--primary)" }} />
                <span>Payment Option</span>
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {/* Credit Card Option */}
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "16px",
                    border: paymentMethod === "credit_card" ? "2px solid var(--primary)" : "1px solid var(--border)",
                    borderRadius: "6px",
                    cursor: "pointer",
                    backgroundColor: paymentMethod === "credit_card" ? "var(--primary-light)" : "transparent"
                  }}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="credit_card"
                    checked={paymentMethod === "credit_card"}
                    onChange={() => setPaymentMethod("credit_card")}
                  />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "14px" }}>Pay securely with Credit / Debit Card</div>
                    <div style={{ fontSize: "12px", color: "var(--muted)" }}>Visa, Mastercard, American Express, Discover</div>
                  </div>
                </label>

                {/* Agent Assist Booking Option */}
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "16px",
                    border: paymentMethod === "agent" ? "2px solid var(--green-border)" : "1px solid var(--border)",
                    borderRadius: "6px",
                    cursor: "pointer",
                    backgroundColor: paymentMethod === "agent" ? "var(--green-light)" : "transparent"
                  }}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="agent"
                    checked={paymentMethod === "agent"}
                    onChange={() => setPaymentMethod("agent")}
                  />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "14px", color: "var(--green)" }}>Complete Booking via Phone Call Center</div>
                    <div style={{ fontSize: "12px", color: "var(--muted)" }}>Submit itinerary now. A travel agent will call you to finalize payment.</div>
                  </div>
                </label>
              </div>

              {error && (
                <div style={{ backgroundColor: "#FEE2E2", border: "1px solid #FCA5A5", color: "#DC2626", padding: "12px", borderRadius: "4px", fontSize: "13px", marginBottom: "16px", lineHeight: 1.4 }}>
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-book"
                style={{
                  width: "100%",
                  marginTop: "8px",
                  border: "none",
                  cursor: isSubmitting ? "not-allowed" : "pointer",
                  display: "block",
                  textAlign: "center",
                  fontSize: "15px",
                  padding: "14px",
                  backgroundColor: paymentMethod === "agent" ? "var(--green)" : "var(--primary)"
                }}
              >
                {isSubmitting ? "Processing booking request..." : paymentMethod === "agent" ? "Submit Itinerary for Agent Call" : "Complete Secure Checkout"}
              </button>
            </div>

          </form>

          {/* Right Column: Price summary & promo code */}
          <div className="detail-sidebar">
            <div style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px", padding: "20px", position: "sticky", top: "88px" }}>
              <h3 style={{ margin: "0 0 16px", fontSize: "16px", fontWeight: 800 }}>Fare Summary</h3>

              {/* Itinerary info */}
              <div style={{ borderBottom: "1px solid var(--border)", paddingBottom: "16px", marginBottom: "16px" }}>
                <span style={{ fontSize: "10px", fontWeight: 700, textTransform: "uppercase", color: "var(--primary)" }}>
                  {selectedItem.category} booking
                </span>
                <h4
                  style={{ fontSize: "14px", fontWeight: 800, margin: "6px 0 2px" }}
                  dangerouslySetInnerHTML={{ __html: selectedItem.title }}
                />
                <p
                  style={{ fontSize: "12px", color: "var(--muted)", margin: 0 }}
                  dangerouslySetInnerHTML={{ __html: selectedItem.subtitle }}
                />
                <div style={{ fontSize: "11px", color: "var(--subtle)", marginTop: "4px" }}>
                  {selectedItem.dates}
                </div>
              </div>

              {/* Cost breakdown */}
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", borderBottom: "1px solid var(--border)", paddingBottom: "16px", marginBottom: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                  <span style={{ color: "var(--muted)" }}>Base Fare</span>
                  <span>{formatPrice(pricing.baseFare)}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                  <span style={{ color: "var(--muted)" }}>Taxes & Fees</span>
                  <span>{formatPrice(pricing.taxesAndFees)}</span>
                </div>
                {pricing.serviceCharge && (
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                    <span style={{ color: "var(--muted)" }}>Service Charge</span>
                    <span>{formatPrice(pricing.serviceCharge)}</span>
                  </div>
                )}
                {pricing.discount && (
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "var(--green)", fontWeight: 600 }}>
                    <span>Promo Discount (10% OFF)</span>
                    <span>{formatPrice(pricing.discount)}</span>
                  </div>
                )}
              </div>

              {/* Total Price */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "20px" }}>
                <span style={{ fontWeight: 700, fontSize: "15px" }}>Grand Total</span>
                <span style={{ fontSize: "24px", fontWeight: 800, color: "var(--primary)" }}>{formatPrice(pricing.total)}</span>
              </div>

              {/* Promo Code input */}
              <form onSubmit={handlePromoApply} style={{ display: "flex", gap: "8px", borderTop: "1px solid var(--border)", paddingTop: "16px", marginTop: "16px" }}>
                <input
                  type="text"
                  placeholder="Enter Promo Code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  disabled={promoApplied}
                  style={{
                    flex: 1,
                    padding: "8px",
                    border: "1px solid var(--border)",
                    borderRadius: "4px",
                    fontSize: "12px",
                    textTransform: "uppercase"
                  }}
                />
                <button
                  type="submit"
                  disabled={promoApplied || !promoCode}
                  className="btn-select"
                  style={{
                    padding: "8px 12px",
                    fontSize: "11px",
                    border: "none",
                    cursor: promoApplied ? "not-allowed" : "pointer"
                  }}
                >
                  {promoApplied ? "Applied" : "Apply"}
                </button>
              </form>
              
              {promoApplied && (
                <div style={{ fontSize: "11px", color: "var(--green)", marginTop: "4px", fontWeight: 600 }}>
                  Promo code TRAVEL10 applied successfully!
                </div>
              )}
              {promoError && (
                <div style={{ fontSize: "11px", color: "#DC2626", marginTop: "4px", fontWeight: 600 }}>
                  {promoError}
                </div>
              )}

              <div style={{ display: "flex", alignItems: "center", gap: "6px", justifyContent: "center", marginTop: "16px", color: "var(--green)", fontSize: "11px", fontWeight: 600 }}>
                <ShieldCheck size={14} />
                <span>100% Secure SSL Payment Gateway</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
