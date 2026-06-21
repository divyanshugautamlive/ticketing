"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, Flame, Compass, Headphones, Award, Phone } from "lucide-react";
import SearchCard from "@/components/search/SearchCard";
import { mockDeals } from "@/data/deals";
import { mockDestinations } from "@/data/destinations";
import { formatPrice } from "@/utils/format";
import { PHONE_NUMBER } from "@/utils/constants";

export default function Home() {
  return (
    <div className="home-page-container">
      {/* 1. Hero Section */}
      <section className="hero">
        <div className="section-wrap">
          <h1 className="hero-title">
            Find & Book the Best International Travel Deals
          </h1>
          <p className="hero-subtitle">
            Compare prices, check itineraries, and secure bookings for Flights, Stays, Cars, Cruises, and Trains
          </p>
          
          {/* Floating Search Card */}
          <SearchCard />
        </div>
      </section>

      {/* 2. Trust Indicators Banner */}
      <section style={{ backgroundColor: "var(--card)", borderBottom: "1px solid var(--border)" }}>
        <div className="section-wrap" style={{ padding: "12px 24px" }}>
          <div className="trust-section" style={{ flexWrap: "wrap" }}>
            <div className="trust-item">
              <ShieldCheck />
              <span>Secure, Encrypted Bookings</span>
            </div>
            <div className="trust-item" style={{ borderLeft: "1px solid var(--border)", paddingLeft: "20px" }}>
              <Flame />
              <span>Real-Time Ticket Availability</span>
            </div>
            <div className="trust-item" style={{ borderLeft: "1px solid var(--border)", paddingLeft: "20px" }}>
              <Award />
              <span>Best Price Guarantee</span>
            </div>
            <div className="trust-item" style={{ borderLeft: "1px solid var(--border)", paddingLeft: "20px" }}>
              <Headphones />
              <span>24/7 Expert Call Center</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Featured Deals Section */}
      <section className="deals-section" style={{ backgroundColor: "var(--bg)", padding: "48px 0" }}>
        <div className="section-wrap">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "24px" }}>
            <div>
              <h2 style={{ fontSize: "22px", fontWeight: 800, margin: 0 }}>Featured Travel Deals</h2>
              <p style={{ color: "var(--muted)", fontSize: "14px", margin: "4px 0 0" }}>Hand-picked offers on flights, stays, cars, and cruises</p>
            </div>
            <Link href="/deals" style={{ fontSize: "14px", fontWeight: 600, color: "var(--primary)", textDecoration: "none" }}>
              View All Deals &rarr;
            </Link>
          </div>

          <div className="grid grid-4" style={{ gap: "20px" }}>
            {mockDeals.slice(0, 4).map((deal) => (
              <Link
                key={deal.id}
                href={deal.category === "trains" ? `/trains` : `/search?category=${deal.category}`}
                className="deal-card"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div
                  className="deal-card-image"
                  style={{ backgroundImage: `url(${deal.image.src})` }}
                >
                  {deal.badge && (
                    <span className="badge-primary deal-card-badge" style={{ fontSize: "10px", padding: "4px 8px" }}>
                      {deal.badge}
                    </span>
                  )}
                </div>
                <div className="deal-card-body">
                  <div className="deal-card-title">{deal.title}</div>
                  <div className="deal-card-subtitle">{deal.description}</div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
                    <span className="deal-card-price">{formatPrice(deal.price)}</span>
                    {deal.price.originalAmount && (
                      <span className="deal-card-original-price">
                        {deal.price.originalDisplay || `$${deal.price.originalAmount}`}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Popular Destinations Section */}
      <section className="destinations-section" style={{ backgroundColor: "var(--card)", padding: "48px 0" }}>
        <div className="section-wrap">
          <div style={{ marginBottom: "24px" }}>
            <h2 style={{ fontSize: "22px", fontWeight: 800, margin: 0 }}>Popular Destinations</h2>
            <p style={{ color: "var(--muted)", fontSize: "14px", margin: "4px 0 0" }}>Explore trends and search travel options to top global locations</p>
          </div>

          <div className="grid grid-3" style={{ gap: "20px" }}>
            {mockDestinations.slice(0, 6).map((dest) => (
              <Link
                key={dest.id}
                href={`/search?destination=${encodeURIComponent(dest.name)}`}
                className="destination-card"
                style={{ backgroundImage: `url(${dest.image.src})`, textDecoration: "none" }}
              >
                <div className="destination-card-overlay">
                  <div className="destination-card-name">{dest.name}</div>
                  <div className="destination-card-count">{dest.country}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Expert Call Agent Banner */}
      <section style={{ backgroundColor: "var(--bg)", padding: "24px 0 48px" }}>
        <div className="section-wrap">
          <div className="cta-banner">
            <h2>Prefer to Book by Phone? Talk to our Travel Expert</h2>
            <p>
              Get customized itineraries, special group discounts, or help with complex travel arrangements. No automated menus.
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap" }}>
              <a href={`tel:${PHONE_NUMBER}`} className="btn-call-now" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none" }}>
                <Phone size={16} />
                <span>Call {PHONE_NUMBER}</span>
              </a>
              <Link href="/call-agent" className="btn-callback" style={{ textDecoration: "none", display: "inline-block" }}>
                Request a Call Back
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
