"use client";

import React from "react";
import Link from "next/link";
import { FileText, ArrowLeft } from "lucide-react";

export default function TermsPage() {
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
            <FileText size={28} />
            <span style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px" }}>Legal Terms & Conditions</span>
          </div>

          <h1 style={{ fontSize: "28px", fontWeight: 800, marginBottom: "8px" }}>Terms of Service</h1>
          <p style={{ fontSize: "12.5px", color: "var(--muted)", marginBottom: "28px" }}>Last updated: June 19, 2026</p>

          <div style={{ fontSize: "13.5px", color: "var(--text)", lineHeight: 1.6, display: "flex", flexDirection: "column", gap: "20px" }}>
            
            <p>
              Welcome to <strong>Ticketing Info</strong>. By accessing our travel search tools, comparing ticket prices, submitting booking requests, or using our agent callback service, you agree to be bound by the following Terms of Service. Please read them carefully.
            </p>

            <h2 style={{ fontSize: "16px", fontWeight: 800, marginTop: "12px", marginBottom: "0" }}>1. Booking Agency Role</h2>
            <p>
              Ticketing Info operates as an independent travel search aggregator and booking intermediary. When you complete a checkout reservation or approve an itinerary via our call center, the contract for the travel service is made directly between you and the third-party provider (e.g., the airline carrier, hotel operator, or cruise line).
            </p>

            <h2 style={{ fontSize: "16px", fontWeight: 800, marginTop: "12px", marginBottom: "0" }}>2. Fares & Ticket Availability</h2>
            <p>
              All listed fares (flights, hotel rooms, train classes, cruise cabins) are subject to real-time availability and can fluctuate until payment is finalized. If you select the "Agent Call Assist" option, your fare is not fully guaranteed until our booking agent contacts you to process the payment and issues the official booking confirmation reference.
            </p>

            <h2 style={{ fontSize: "16px", fontWeight: 800, marginTop: "12px", marginBottom: "0" }}>3. Passenger Identification & Passports</h2>
            <p>
              Travelers are solely responsible for ensuring that all passenger names match their official passports exactly. Ticketing Info is not responsible for boarding denials or fee penalties resulting from name misspellings or expired passports. Passport validity must typically extend at least 6 months beyond your travel dates for international journeys.
            </p>

            <h2 style={{ fontSize: "16px", fontWeight: 800, marginTop: "12px", marginBottom: "0" }}>4. Cancellations, Changes & Refunds</h2>
            <p>
              All reservations are subject to the specific fare rules and cancellation policies of the carrier or hotel property. Cancellation requests can be submitted via our "My Trips" dashboard or by calling our helpdesk at 1-800-555-TICKETS. Any refund fees or modification charges imposed by carriers will be passed through to the passenger.
            </p>

            <h2 style={{ fontSize: "16px", fontWeight: 800, marginTop: "12px", marginBottom: "0" }}>5. Limitation of Liability</h2>
            <p>
              Ticketing Info is not liable for travel disruptions, flight delays, weather cancellations, lost baggage, hotel overbookings, or any physical injury occurring during your trip. We highly recommend purchasing comprehensive travel insurance during the booking flow.
            </p>

          </div>
        </div>

      </div>
    </div>
  );
}
