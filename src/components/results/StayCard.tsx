"use client";

import React from "react";
import Link from "next/link";
import { Star, MapPin, Sparkles, User } from "lucide-react";
import type { StayResult } from "@/types/stay";
import { formatPrice } from "@/utils/format";

interface StayCardProps {
  stay: StayResult;
}

export default function StayCard({ stay }: StayCardProps) {
  return (
    <div className="stay-card" style={{ display: "flex", overflow: "hidden", minHeight: "200px" }}>
      {/* Stay Image Section */}
      <div
        className="stay-card-image"
        style={{
          backgroundImage: `url(${stay.image.src})`,
          width: "240px",
          height: "auto",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          flexShrink: 0
        }}
      >
        {stay.isSuperhost && (
          <span className="badge-green" style={{ position: "absolute", top: "12px", left: "12px", fontSize: "10px", display: "flex", alignItems: "center", gap: "2px" }}>
            <Sparkles size={10} />
            <span>Superhost</span>
          </span>
        )}
      </div>

      {/* Stay Details Section */}
      <div className="stay-card-body" style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "20px" }}>
        <div>
          {/* Top Line: Property Type & Guest Specs */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", color: "var(--muted)" }}>
            <span>{stay.propertyType}</span>
            <span>&bull;</span>
            <span>{stay.bedrooms} Bedrooms</span>
            <span>&bull;</span>
            <span>{stay.bathrooms} Bathrooms</span>
            <span>&bull;</span>
            <span>Max {stay.maxGuests} Guests</span>
          </div>

          {/* Stay Name */}
          <h3 className="stay-card-name" style={{ margin: "0 0 4px", fontSize: "18px", fontWeight: 800 }}>
            {stay.name}
          </h3>

          {/* Location */}
          <div className="stay-card-location" style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "13px", color: "var(--muted)", marginBottom: "12px" }}>
            <MapPin size={12} />
            <span>{stay.location.address || `${stay.location.city}, ${stay.location.country}`}</span>
          </div>

          {/* Highlights */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "12px" }}>
            {stay.highlights.map((h, i) => (
              <span key={i} style={{ fontSize: "10px", color: "var(--primary)", fontWeight: 600, backgroundColor: "var(--primary-light)", padding: "2px 8px", borderRadius: "12px" }}>
                {h}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Line: Price & Reviews */}
        <div className="stay-card-bottom" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", borderTop: "1px solid var(--border)", paddingTop: "14px", marginTop: "12px" }}>
          {/* Review Score */}
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <Star size={14} fill="var(--warn)" stroke="var(--warn)" />
            <span style={{ fontWeight: 700, fontSize: "14px", color: "var(--text)" }}>
              {stay.rating.score.toFixed(2)}
            </span>
            <span style={{ fontSize: "12px", color: "var(--muted)" }}>
              ({stay.rating.count} reviews)
            </span>
          </div>

          {/* Price Block */}
          <div style={{ textAlign: "right" }}>
            <div className="stay-card-price" style={{ fontSize: "22px", fontWeight: 800, color: "var(--primary)", lineHeight: 1 }}>
              {formatPrice(stay.pricePerNight)}
            </div>
            <div style={{ fontSize: "11px", color: "var(--muted)", marginTop: "2px" }}>
              / night (excl. fees)
            </div>
            <Link
              href={`/stays/${stay.id}`}
              className="btn-select"
              style={{
                marginTop: "10px",
                textDecoration: "none",
                display: "inline-block",
                textAlign: "center"
              }}
            >
              View Property
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
