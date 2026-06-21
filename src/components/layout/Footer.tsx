"use client";

import React from "react";
import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { COMPANY_NAME, PHONE_NUMBER, SUPPORT_EMAIL } from "@/utils/constants";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="section-wrap">
        <div className="footer-grid">
          {/* Brand Info */}
          <div className="footer-brand">
            <span style={{ fontSize: "20px", fontWeight: 800, color: "#fff", display: "block", marginBottom: "12px" }}>
              Ticketing <span style={{ color: "var(--primary-light)" }}>Info</span>
            </span>
            <p className="footer-desc">
              Your premium destination for booking international flights, hotels, vacation stays, luxury cruises, and train journeys worldwide.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "16px" }}>
              <a href={`tel:${PHONE_NUMBER}`} style={{ display: "flex", alignItems: "center", gap: "8px", color: "rgba(255,255,255,0.75)", textDecoration: "none", fontSize: "13px" }}>
                <Phone size={14} style={{ color: "var(--green-border)" }} />
                <span>{PHONE_NUMBER} (24/7 Support)</span>
              </a>
              <a href={`mailto:${SUPPORT_EMAIL}`} style={{ display: "flex", alignItems: "center", gap: "8px", color: "rgba(255,255,255,0.75)", textDecoration: "none", fontSize: "13px" }}>
                <Mail size={14} style={{ color: "var(--primary-light)" }} />
                <span>{SUPPORT_EMAIL}</span>
              </a>
            </div>
          </div>

          {/* Booking Categories */}
          <div className="footer-col">
            <h4>Book With Us</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <Link href="/search?category=flights">Book Flights</Link>
              <Link href="/search?category=hotels">Book Hotels</Link>
              <Link href="/search?category=stays">Vacation Stays</Link>
              <Link href="/search?category=cruises">Luxury Cruises</Link>
              <Link href="/search?category=trains">Train Tickets</Link>
            </div>
          </div>

          {/* Company links */}
          <div className="footer-col">
            <h4>Our Company</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <Link href="/about">About Us</Link>
              <Link href="/deals">Special Deals</Link>
              <Link href="/support">Help & Support</Link>
              <Link href="/contact">Contact Us</Link>
            </div>
          </div>

          {/* Policy / Trust */}
          <div className="footer-col">
            <h4>Legal & Safety</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <Link href="/privacy">Privacy Policy</Link>
              <Link href="/terms">Terms of Service</Link>
              <Link href="/support">FAQ</Link>
              <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", marginTop: "10px", display: "block" }}>
                Secure bookings powered by 256-bit SSL encryption.
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            paddingTop: "24px",
            marginTop: "36px",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "16px"
          }}
        >
          <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", margin: 0 }}>
            &copy; {currentYear} {COMPANY_NAME}. All rights reserved.
          </p>
          <div style={{ display: "flex", gap: "16px", fontSize: "12px" }}>
            <Link href="/terms" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>Terms</Link>
            <Link href="/privacy" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>Privacy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
