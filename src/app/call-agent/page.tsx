"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Phone, Calendar, Clock, Sparkles, User, Mail, ShieldCheck } from "lucide-react";
import { PHONE_NUMBER } from "@/utils/constants";

export default function CallAgentPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    category: "flights",
    timeSlot: "morning",
    notes: ""
  });
  const [csrfToken, setCsrfToken] = useState("");
  const [error, setError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    if (!formData.name || !formData.phone || !formData.email) {
      setError("Please fill in all required fields.");
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await fetch("/api/callback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-csrf-token": csrfToken
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit callback request.");
      }

      setIsSubmitted(true);
    } catch (err: any) {
      setError(err.message || "A network error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ backgroundColor: "var(--bg)", minHeight: "calc(100vh - 120px)", padding: "48px 0" }}>
      <div className="section-wrap" style={{ padding: "0 24px" }}>
        
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", flexWrap: "wrap", alignItems: "start" }}>
          
          {/* Left Column: Info and highlights */}
          <div>
            <span style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", color: "var(--primary)", backgroundColor: "var(--primary-light)", padding: "4px 8px", borderRadius: "4px" }}>
              24/7 Phone Assistance
            </span>
            <h1 style={{ fontSize: "32px", fontWeight: 800, margin: "12px 0 16px", color: "var(--nav)" }}>
              Speak to a Travel Expert
            </h1>
            <p style={{ fontSize: "15px", lineHeight: 1.6, color: "#4B5563", marginBottom: "28px" }}>
              Skip the long queues and automated menus. Call us directly or request a quick callback, and one of our dedicated product specialists will help you customize your travel plan.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div style={{ display: "flex", gap: "12px", alignItems: "start" }}>
                <div style={{ width: "32px", height: "32px", borderRadius: "50%", backgroundColor: "var(--primary-light)", color: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Sparkles size={16} />
                </div>
                <div>
                  <h4 style={{ margin: 0, fontWeight: 700, fontSize: "14px" }}>Custom Multi-City Itineraries</h4>
                  <p style={{ margin: "4px 0 0", fontSize: "12px", color: "var(--muted)", lineHeight: 1.4 }}>Get help booking complex journeys with multiple stops, layovers, or mixed modes of travel.</p>
                </div>
              </div>

              <div style={{ display: "flex", gap: "12px", alignItems: "start" }}>
                <div style={{ width: "32px", height: "32px", borderRadius: "50%", backgroundColor: "var(--green-light)", color: "var(--green)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <ShieldCheck size={16} />
                </div>
                <div>
                  <h4 style={{ margin: 0, fontWeight: 700, fontSize: "14px" }}>Special Group & Corporate Rates</h4>
                  <p style={{ margin: "4px 0 0", fontSize: "12px", color: "var(--muted)", lineHeight: 1.4 }}>Unlock exclusive bulk discounts for group travel, destination weddings, or corporate retreats.</p>
                </div>
              </div>
            </div>

            {/* Direct Number Panel */}
            <div style={{ marginTop: "36px", padding: "20px", border: "1.5px dashed var(--green-border)", borderRadius: "8px", backgroundColor: "rgba(34, 197, 94, 0.04)", textAlign: "center" }}>
              <h3 style={{ margin: "0 0 10px", fontSize: "15px", fontWeight: 700, color: "var(--green)" }}>Call our direct hotline now:</h3>
              <a href={`tel:${PHONE_NUMBER}`} style={{ fontSize: "28px", fontWeight: 800, color: "var(--nav)", textDecoration: "none", display: "flex", alignItems: "center", gap: "8px", justifyContent: "center" }}>
                <Phone size={24} style={{ color: "var(--green)" }} />
                <span>{PHONE_NUMBER}</span>
              </a>
              <p style={{ margin: "8px 0 0", fontSize: "12px", color: "var(--muted)" }}>Toll-free. Average wait time: less than 1 minute.</p>
            </div>
          </div>

          {/* Right Column: Callback Form */}
          <div style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px", padding: "32px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
            {isSubmitted ? (
              <div style={{ textAlign: "center", padding: "24px 0" }}>
                <div style={{ fontSize: "48px", marginBottom: "16px" }}>✅</div>
                <h3 style={{ fontSize: "20px", fontWeight: 800, margin: "0 0 8px" }}>Callback Requested</h3>
                <p style={{ fontSize: "14px", color: "var(--muted)", lineHeight: 1.5, margin: "0 0 24px" }}>
                  Thank you! A travel agent has received your request and will call you on <strong>{formData.phone}</strong> during your preferred <strong>{formData.timeSlot}</strong> slot.
                </p>
                <Link href="/" className="btn-primary" style={{ textDecoration: "none", display: "inline-block" }}>
                  Back to Homepage
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <h2 style={{ fontSize: "18px", fontWeight: 800, margin: 0, borderBottom: "1px solid var(--border)", paddingBottom: "12px" }}>
                  Request a Free Callback
                </h2>

                {error && (
                  <div style={{ backgroundColor: "#FEE2E2", border: "1px solid #FCA5A5", color: "#DC2626", padding: "12px", borderRadius: "4px", fontSize: "13px", lineHeight: 1.4 }}>
                    {error}
                  </div>
                )}

                {/* Name */}
                <div>
                  <label style={{ fontSize: "11px", fontWeight: 600, color: "var(--muted)" }}>YOUR FULL NAME</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name (e.g. John Doe)"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{ width: "100%", padding: "10px", border: "1px solid var(--border)", borderRadius: "4px", marginTop: "4px", fontSize: "13px" }}
                  />
                </div>

                {/* Phone */}
                <div>
                  <label style={{ fontSize: "11px", fontWeight: 600, color: "var(--muted)" }}>PHONE NUMBER</label>
                  <input
                    type="tel"
                    required
                    placeholder="Enter your contact number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    style={{ width: "100%", padding: "10px", border: "1px solid var(--border)", borderRadius: "4px", marginTop: "4px", fontSize: "13px" }}
                  />
                </div>

                {/* Email */}
                <div>
                  <label style={{ fontSize: "11px", fontWeight: 600, color: "var(--muted)" }}>EMAIL ADDRESS</label>
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{ width: "100%", padding: "10px", border: "1px solid var(--border)", borderRadius: "4px", marginTop: "4px", fontSize: "13px" }}
                  />
                </div>

                {/* Category & Timeslot Grid */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <div>
                    <label style={{ fontSize: "11px", fontWeight: 600, color: "var(--muted)" }}>INTERESTED IN</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      style={{ width: "100%", padding: "8px", border: "1px solid var(--border)", borderRadius: "4px", marginTop: "4px", fontSize: "13px" }}
                    >
                      <option value="flights">Flights</option>
                      <option value="hotels">Hotels</option>
                      <option value="stays">Vacation Stays</option>
                      <option value="cruises">Cruises</option>
                      <option value="trains">Trains</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: "11px", fontWeight: 600, color: "var(--muted)" }}>PREFERRED TIME</label>
                    <select
                      value={formData.timeSlot}
                      onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                      style={{ width: "100%", padding: "8px", border: "1px solid var(--border)", borderRadius: "4px", marginTop: "4px", fontSize: "13px" }}
                    >
                      <option value="morning">Morning (9am - 12pm)</option>
                      <option value="afternoon">Afternoon (12pm - 4pm)</option>
                      <option value="evening">Evening (4pm - 7pm)</option>
                    </select>
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label style={{ fontSize: "11px", fontWeight: 600, color: "var(--muted)" }}>TRIP DETAILS & QUESTIONS</label>
                  <textarea
                    rows={3}
                    placeholder="E.g. I want to book a group flight to Paris..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    style={{ width: "100%", padding: "10px", border: "1px solid var(--border)", borderRadius: "4px", marginTop: "4px", fontSize: "13px" }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-book"
                  style={{ width: "100%", border: "none", cursor: "pointer", display: "block", textAlign: "center", fontSize: "14px" }}
                >
                  {isSubmitting ? "Submitting callback request..." : "Request a Callback"}
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
