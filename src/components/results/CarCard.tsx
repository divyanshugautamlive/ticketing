"use client";

import React from "react";
import Link from "next/link";
import { Users, Briefcase, Cog, Fuel, MapPin, ShieldCheck, Check } from "lucide-react";
import type { CarResult } from "@/types/car";
import { formatPrice } from "@/utils/format";
import { useSearch } from "@/context/SearchContext";

interface CarCardProps {
  car: CarResult;
}

export default function CarCard({ car }: CarCardProps) {
  const { params } = useSearch();

  // Calculate rental duration in days
  const getRentalDays = () => {
    if (params.dates?.start && params.dates?.end) {
      const start = new Date(params.dates.start);
      const end = new Date(params.dates.end);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays > 0 ? diffDays : 1;
    }
    return 1; // default to 1 day if dates aren't fully set
  };

  const days = getRentalDays();
  const baseTotalAmount = car.pricePerDay.amount * days;
  const totalDisplay = `$${baseTotalAmount.toFixed(2)}`;

  return (
    <div className="car-card" style={{ display: "flex", overflow: "hidden", minHeight: "200px", backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px" }}>
      {/* Car Image Section */}
      <div
        className="car-card-image"
        style={{
          backgroundImage: `url(${car.image.src})`,
          width: "240px",
          height: "auto",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          flexShrink: 0
        }}
      >
        <span className="badge-primary" style={{ position: "absolute", top: "12px", left: "12px", fontSize: "10px", backgroundColor: "var(--nav)" }}>
          {car.agency}
        </span>
      </div>

      {/* Car Details Section */}
      <div className="car-card-body" style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "20px" }}>
        <div>
          {/* Top Line: Car Class & Agency info */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
            <span style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", color: "var(--primary)" }}>
              {car.type} Car
            </span>
            <span style={{ color: "var(--subtle)" }}>&bull;</span>
            <span style={{ fontSize: "11px", fontWeight: 600, color: "var(--muted)" }}>
              Provided by {car.agency}
            </span>
          </div>

          {/* Car Model Name */}
          <h3 className="car-card-name" style={{ margin: "0 0 4px", fontSize: "18px", fontWeight: 800 }}>
            {car.name} <span style={{ fontSize: "13px", fontWeight: 500, color: "var(--muted)" }}>or similar</span>
          </h3>

          {/* Location & Pickup Info */}
          <div className="car-card-location" style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "13px", color: "var(--muted)", marginBottom: "12px" }}>
            <MapPin size={12} />
            <span>Pickup: {car.location.address || `${car.location.city} (${car.location.code})`}</span>
          </div>

          {/* Car Specs Icons (Seats, Luggage, Gearbox, Fuel Policy) */}
          <div className="car-card-specs" style={{ display: "flex", flexWrap: "wrap", gap: "16px", marginBottom: "12px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "12px", color: "var(--text)" }}>
              <Users size={14} style={{ color: "var(--muted)" }} />
              <span>{car.seats} Seats</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "12px", color: "var(--text)" }}>
              <Briefcase size={14} style={{ color: "var(--muted)" }} />
              <span>{car.luggageLarge} Large / {car.luggageSmall} Small Bags</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "12px", color: "var(--text)", textTransform: "capitalize" }}>
              <Cog size={14} style={{ color: "var(--muted)" }} />
              <span>{car.transmission}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "12px", color: "var(--text)" }}>
              <Fuel size={14} style={{ color: "var(--muted)" }} />
              <span>{car.fuelPolicy} Fuel</span>
            </div>
          </div>

          {/* A/C & Mileage Indicators */}
          <div style={{ display: "flex", gap: "12px", fontSize: "11px", color: "var(--green)", fontWeight: 600 }}>
            {car.airConditioning && (
              <span style={{ display: "flex", alignItems: "center", gap: "2px" }}>
                <Check size={12} /> Air Conditioning
              </span>
            )}
            {car.unlimitedMileage && (
              <span style={{ display: "flex", alignItems: "center", gap: "2px" }}>
                <Check size={12} /> Unlimited Mileage
              </span>
            )}
          </div>
        </div>

        {/* Bottom Line: Price & Rating info */}
        <div className="car-card-bottom" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", borderTop: "1px solid var(--border)", paddingTop: "14px", marginTop: "12px" }}>
          {/* Review Score */}
          <div className="car-card-rating" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div className="rating-pill" style={{ background: "var(--nav)", color: "#fff", padding: "4px 8px", borderRadius: "4px", fontWeight: 700, fontSize: "13px" }}>
              {car.rating.score.toFixed(1)}
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: "13px", color: "var(--text)", lineHeight: 1 }}>
                {car.rating.label || "Excellent"}
              </div>
              <div style={{ fontSize: "11px", color: "var(--muted)" }}>
                {car.rating.count.toLocaleString()} agency reviews
              </div>
            </div>
          </div>

          {/* Price Block */}
          <div style={{ textAlign: "right" }}>
            {car.pricePerDay.originalAmount && (
              <span style={{ fontSize: "12px", color: "var(--subtle)", textDecoration: "line-through", display: "block" }}>
                {car.pricePerDay.originalDisplay}
              </span>
            )}
            <div className="car-card-price" style={{ fontSize: "22px", fontWeight: 800, color: "var(--primary)", lineHeight: 1 }}>
              {formatPrice(car.pricePerDay)}
            </div>
            <div className="car-card-price-note" style={{ fontSize: "11px", color: "var(--muted)", marginTop: "2px" }}>
              / day
            </div>
            <div style={{ fontSize: "12px", fontWeight: 600, color: "var(--text)", marginTop: "4px" }}>
              Total: {totalDisplay} for {days} {days === 1 ? "day" : "days"}
            </div>
            <Link
              href={`/cars/${car.id}`}
              className="btn-select"
              style={{
                marginTop: "10px",
                textDecoration: "none",
                display: "inline-block",
                textAlign: "center"
              }}
            >
              Select Vehicle
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
