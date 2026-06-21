"use client";

import React from "react";
import Link from "next/link";
import { Star, MapPin, Calendar, Anchor } from "lucide-react";
import type { CruiseResult } from "@/types/cruise";
import { formatPrice, formatDate } from "@/utils/format";

interface CruiseCardProps {
  cruise: CruiseResult;
}

export default function CruiseCard({ cruise }: CruiseCardProps) {
  return (
    <div className="cruise-card" style={{ display: "flex", overflow: "hidden", minHeight: "220px" }}>
      {/* Cruise Image Section */}
      <div
        className="cruise-card-image"
        style={{
          backgroundImage: `url(${cruise.image.src})`,
          width: "240px",
          height: "auto",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          flexShrink: 0
        }}
      >
        {cruise.isFeatured && (
          <span className="badge-primary" style={{ position: "absolute", top: "12px", left: "12px", fontSize: "10px" }}>
            Featured Cruise
          </span>
        )}
      </div>

      {/* Cruise Details Section */}
      <div className="cruise-card-body" style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "20px" }}>
        <div>
          {/* Top Line: Cruise Line & Ship Name */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", color: "var(--muted)" }}>
            <span style={{ color: "var(--primary)" }}>{cruise.cruiseLine}</span>
            <span>&bull;</span>
            <span>{cruise.shipName}</span>
          </div>

          {/* Cruise Name */}
          <h3 className="cruise-card-name" style={{ margin: "0 0 4px", fontSize: "18px", fontWeight: 800 }}>
            {cruise.name}
          </h3>

          {/* Itinerary route summary */}
          <div className="cruise-card-route" style={{ fontSize: "13px", color: "var(--text)", fontWeight: 500, marginBottom: "12px", display: "flex", alignItems: "center", gap: "4px" }}>
            <Anchor size={12} className="icon-blue" style={{ color: "var(--primary)" }} />
            <span>
              Route: {cruise.departurePort.city} &rarr; {cruise.route.ports.slice(1, -1).map(p => p.location.city).join(", ")} &rarr; {cruise.route.ports[cruise.route.ports.length - 1].location.city}
            </span>
          </div>

          {/* Meta specs: nights, departure date, port */}
          <div className="cruise-card-meta" style={{ display: "flex", flexWrap: "wrap", gap: "16px", fontSize: "12px", color: "var(--muted)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <Calendar size={12} />
              <span>Departs: {formatDate(cruise.departureDate)}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <MapPin size={12} />
              <span>Port: {cruise.departurePort.city}</span>
            </div>
            <div style={{ fontWeight: 600, color: "var(--text)" }}>
              {cruise.nights} Nights
            </div>
          </div>
        </div>

        {/* Bottom Line: Price & Reviews */}
        <div className="cruise-card-bottom" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", borderTop: "1px solid var(--border)", paddingTop: "14px", marginTop: "12px" }}>
          {/* Review Score */}
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <Star size={14} fill="var(--warn)" stroke="var(--warn)" />
            <span style={{ fontWeight: 700, fontSize: "14px", color: "var(--text)" }}>
              {cruise.rating.score.toFixed(2)}
            </span>
            <span style={{ fontSize: "12px", color: "var(--muted)" }}>
              ({cruise.rating.count} reviews)
            </span>
          </div>

          {/* Price Block */}
          <div style={{ textAlign: "right" }}>
            <span style={{ fontSize: "11px", color: "var(--muted)", marginRight: "6px" }}>Starting from</span>
            <div className="cruise-card-price" style={{ fontSize: "22px", fontWeight: 800, color: "var(--primary)", lineHeight: 1 }}>
              {formatPrice(cruise.pricePerPerson)}
            </div>
            <div style={{ fontSize: "11px", color: "var(--muted)", marginTop: "2px" }}>
              / person (excl. port fees)
            </div>
            <Link
              href={`/cruises/${cruise.id}`}
              className="btn-select"
              style={{
                marginTop: "10px",
                textDecoration: "none",
                display: "inline-block",
                textAlign: "center"
              }}
            >
              View Cabins
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
