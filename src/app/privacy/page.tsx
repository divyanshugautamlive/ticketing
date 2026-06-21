"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, ArrowLeft } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div style={{ backgroundColor: "var(--bg)", minHeight: "calc(100vh - 120px)", padding: "48px 0" }}>
      <div className="section-wrap" style={{ padding: "0 24px", maxWidth: "800px" }}>
        
        {/* Back Link */}
        <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "13px", color: "var(--muted)", textDecoration: "none", marginBottom: "24px" }}>
          <ArrowLeft size={16} /> Back to Homepage
        </Link>

        {/* Content Box */}
        <div style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "12px", padding: "40px 48px", boxShadow: "var(--shadow-sm)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "var(--primary)", marginBottom: "16px" }}>
            <ShieldCheck size={28} />
            <span style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px" }}>Legal & Security Compliance</span>
          </div>

          <h1 style={{ fontSize: "28px", fontWeight: 800, marginBottom: "8px" }}>Privacy Policy</h1>
          <p style={{ fontSize: "12.5px", color: "var(--muted)", marginBottom: "28px" }}>Last updated: June 19, 2026</p>

          <div style={{ fontSize: "13.5px", color: "var(--text)", lineHeight: 1.6, display: "flex", flexDirection: "column", gap: "20px" }}>
            
            <p>
              At <strong>Ticketing Info</strong>, we respect your privacy and are committed to protecting the personal data you share with us. This Privacy Policy describes how we collect, use, and safeguard your information when you visit our website, search for flights or stays, or place a callback request with our agents.
            </p>

            <h2 style={{ fontSize: "16px", fontWeight: 800, marginTop: "12px", marginBottom: "0" }}>1. Information We Collect</h2>
            <p>
              We collect information that identifies or can be used to contact you. This includes:
            </p>
            <ul style={{ listStyleType: "disc", paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "6px" }}>
              <li><strong>Contact Data:</strong> Your name, email address, telephone number, and payment preference.</li>
              <li><strong>Traveler Details:</strong> Title, names, passport number (if international routes are booked), nationality, and date of birth for all passengers on your itinerary.</li>
              <li><strong>Usage Data:</strong> Search keywords, routes compared, categories clicked, and communication preferences.</li>
            </ul>

            <h2 style={{ fontSize: "16px", fontWeight: 800, marginTop: "12px", marginBottom: "0" }}>2. How We Use Your Data</h2>
            <p>
              We process your personal data to deliver a premium travel booking experience, specifically to:
            </p>
            <ul style={{ listStyleType: "disc", paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "6px" }}>
              <li>Generate search results and process reservation request files.</li>
              <li>Route callback requests and passenger lists to our live travel specialists.</li>
              <li>Issue transaction invoices, PDF receipts, and trip confirmation emails.</li>
              <li>Comply with local aviation safety regulations and hotel registration laws.</li>
            </ul>

            <h2 style={{ fontSize: "16px", fontWeight: 800, marginTop: "12px", marginBottom: "0" }}>3. Data Sharing & Third-Parties</h2>
            <p>
              To complete your travel reservation, we must share passenger details with airline carriers, hotel properties, cruise lines, and train operators (e.g. IRCTC, Eurostar) that you select. We do not sell or lease your personal contact information to external marketing agencies.
            </p>

            <h2 style={{ fontSize: "16px", fontWeight: 800, marginTop: "12px", marginBottom: "0" }}>4. SSL Security & Data Retention</h2>
            <p>
              All online checkout transactions are processed using industry-standard SSL encryption protocols. Passenger details stored on your browser's local storage (e.g., booking references) are maintained locally for your convenience in accessing the "My Trips" dashboard.
            </p>

            <h2 style={{ fontSize: "16px", fontWeight: 800, marginTop: "12px", marginBottom: "0" }}>5. Contact Us</h2>
            <p>
              If you have any questions regarding this Privacy Policy or wish to request data deletion, email us at <a href="mailto:privacy@ticketing.info">privacy@ticketing.info</a> or write to our corporate headquarters in New York.
            </p>

          </div>
        </div>

      </div>
    </div>
  );
}
