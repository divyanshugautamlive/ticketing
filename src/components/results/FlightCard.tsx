"use client";

import React from "react";
import Link from "next/link";
import { Plane, Star, Clock, AlertCircle } from "lucide-react";
import type { FlightResult } from "@/types/flight";
import { formatDuration, formatTime, formatPrice } from "@/utils/format";

interface FlightCardProps {
  flight: FlightResult;
}

export default function FlightCard({ flight }: FlightCardProps) {
  const segment = flight.segments[0];
  const airline = segment?.airline;

  return (
    <div className="flight-card">
      {/* Airline Info Column */}
      <div className="flight-airline">
        <div className="flight-airline-logo">
          {airline?.code || "AI"}
        </div>
        <div className="flight-airline-name">
          {airline?.name || "Air India"}
        </div>
        <div style={{ fontSize: "10px", color: "var(--muted)", marginTop: "4px" }}>
          {segment?.flightNumber}
        </div>
      </div>

      {/* Flight Route Progress Column */}
      <div className="flight-route">
        {/* Departure Time */}
        <div className="flight-time-block">
          <div className="flight-time">{formatTime(segment.departureTime)}</div>
          <div className="flight-city">{flight.origin.code}</div>
        </div>

        {/* Path line with stop info */}
        <div className="flight-path">
          <div className="flight-duration">{formatDuration(flight.totalDuration)}</div>
          <div className="flight-path-line" />
          <div className={`flight-stops ${flight.stops === 0 ? "nonstop" : "has-stops"}`}>
            {flight.stops === 0 ? "Non-stop" : `${flight.stops} Stop${flight.stops > 1 ? "s" : ""} (${flight.stopoverCities?.join(", ")})`}
          </div>
        </div>

        {/* Arrival Time */}
        <div className="flight-time-block">
          <div className="flight-time">
            {formatTime(flight.segments[flight.segments.length - 1].arrivalTime)}
          </div>
          <div className="flight-city">{flight.destination.code}</div>
        </div>
      </div>

      {/* Price & Select Button Column */}
      <div className="flight-price-block">
        {flight.isFeatured && (
          <div style={{ color: "var(--warn)", display: "flex", alignItems: "center", justifySelf: "end", gap: "2px", fontSize: "10px", fontWeight: 700, textTransform: "uppercase", marginBottom: "4px" }}>
            <FlameIcon />
            <span>Best Value</span>
          </div>
        )}
        <div className="flight-price">{formatPrice(flight.price)}</div>
        <div className="flight-price-note">per traveler</div>
        
        {flight.seatsLeft !== undefined && flight.seatsLeft < 5 && (
          <div style={{ color: "#DC2626", fontSize: "10px", display: "flex", alignItems: "center", gap: "2px", justifyContent: "flex-end", marginTop: "4px", fontWeight: 500 }}>
            <AlertCircle size={10} />
            <span>Only {flight.seatsLeft} left at this price!</span>
          </div>
        )}

        <Link
          href={`/flights/${flight.id}`}
          className="btn-select"
          style={{
            marginTop: "12px",
            textDecoration: "none",
            display: "inline-block",
            textAlign: "center"
          }}
        >
          Select
        </Link>
      </div>
    </div>
  );
}

// Small flame icon helper
function FlameIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
    </svg>
  );
}
