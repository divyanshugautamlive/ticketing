"use client";

import React, { useState, use } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useRouter as useAppRouter } from "next/navigation";
import { ArrowLeft, Clock, ShieldCheck, Check, Plane, Users, Calendar, AlertCircle } from "lucide-react";
import { mockFlights } from "@/data/flights";
import { useBooking } from "@/context/BookingContext";
import { formatDuration, formatTime, formatPrice, formatDate } from "@/utils/format";
import { SearchCategory } from "@/types/search";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function FlightDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const router = useAppRouter();
  const { selectItemForBooking } = useBooking();
  
  const flight = mockFlights.find((f) => f.id === resolvedParams.id);
  const [quantity, setQuantity] = useState(1);

  if (!flight) {
    return (
      <div className="section-wrap" style={{ padding: "48px 24px", textAlign: "center" }}>
        <h2 style={{ fontWeight: 700 }}>Flight Itinerary Not Found</h2>
        <p style={{ color: "var(--muted)" }}>The flight you are looking for is unavailable or has expired.</p>
        <Link href="/search?category=flights" className="btn-primary" style={{ textDecoration: "none", display: "inline-block", marginTop: "16px" }}>
          Back to Flight Search
        </Link>
      </div>
    );
  }

  const segment = flight.segments[0];
  const airline = segment?.airline;

  const handleBookNow = () => {
    selectItemForBooking({
      itemId: flight.id,
      category: SearchCategory.Flights,
      title: `${flight.origin.city} (${flight.origin.code}) to ${flight.destination.city} (${flight.destination.code})`,
      subtitle: `${airline?.name} &bull; ${segment?.flightNumber}`,
      dates: formatDate(segment.departureTime),
      basePrice: flight.price,
      variant: flight.cabinClass.toUpperCase(),
      quantity
    });
    router.push("/booking");
  };

  const baseTotal = flight.price.amount * quantity;
  const taxesTotal = baseTotal * 0.12;
  const serviceFee = 25;
  const grandTotal = baseTotal + taxesTotal + serviceFee;

  return (
    <div style={{ backgroundColor: "var(--bg)", minHeight: "calc(100vh - 120px)", padding: "24px 0" }}>
      <div className="section-wrap" style={{ padding: "0 24px" }}>
        {/* Back Link */}
        <Link
          href={`/search?category=flights&destination=${flight.destination.city}`}
          style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--muted)", textDecoration: "none", fontSize: "14px", fontWeight: 600, marginBottom: "20px" }}
        >
          <ArrowLeft size={16} />
          Back to search results
        </Link>

        {/* Flight Title / Header */}
        <div className="detail-header" style={{ marginBottom: "24px" }}>
          <div>
            <span style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", color: "var(--primary)", backgroundColor: "var(--primary-light)", padding: "4px 8px", borderRadius: "4px" }}>
              {flight.cabinClass} class
            </span>
            <h1 className="detail-title" style={{ margin: "8px 0 4px" }}>
              {flight.origin.city} to {flight.destination.city} Itinerary
            </h1>
            <div className="detail-subtitle">
              Operated by {airline?.name} &bull; Flight {segment?.flightNumber}
            </div>
          </div>
        </div>

        {/* Layout */}
        <div className="detail-layout">
          
          {/* Left: main timeline & amenities */}
          <div className="detail-main">
            
            {/* Timeline box */}
            <div style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px", padding: "24px" }}>
              <h2 style={{ fontSize: "16px", fontWeight: 800, margin: "0 0 20px" }}>Flight Timeline</h2>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "24px", position: "relative" }}>
                {/* Vertical Timeline bar */}
                <div style={{ position: "absolute", top: "12px", bottom: "12px", left: "15px", width: "2px", backgroundColor: "var(--border)" }} />

                {/* Departure segment */}
                <div style={{ display: "flex", gap: "16px", position: "relative", zIndex: 1 }}>
                  <div style={{ width: "32px", height: "32px", borderRadius: "50%", backgroundColor: "var(--primary-light)", color: "var(--primary)", display: "flex", alignItems: "center", flexShrink: 0, justifyContent: "center" }}>
                    <Plane size={14} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "15px" }}>
                      {formatTime(segment.departureTime)} &bull; {flight.origin.city} ({flight.origin.code})
                    </div>
                    <div style={{ fontSize: "13px", color: "var(--muted)", marginTop: "2px" }}>
                      {flight.origin.address}
                    </div>
                    <div style={{ fontSize: "12px", color: "var(--subtle)", marginTop: "4px" }}>
                      Departure Date: {formatDate(segment.departureTime, { weekday: "long", month: "long", day: "numeric" })}
                    </div>
                  </div>
                </div>

                {/* Duration / Aircraft Segment */}
                <div style={{ display: "flex", gap: "16px", paddingLeft: "48px" }}>
                  <div style={{ fontSize: "12px", color: "var(--muted)", backgroundColor: "var(--surface)", padding: "10px 14px", borderRadius: "6px", width: "100%" }}>
                    <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                      <div>
                        <strong>Duration:</strong> {formatDuration(flight.totalDuration)}
                      </div>
                      {segment.aircraft && (
                        <div>
                          <strong>Aircraft:</strong> {segment.aircraft}
                        </div>
                      )}
                      {flight.stops > 0 && (
                        <div>
                          <strong>Stops:</strong> {flight.stops} Stop{flight.stops > 1 ? "s" : ""} in {flight.stopoverCities?.join(", ")}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Arrival segment */}
                <div style={{ display: "flex", gap: "16px", position: "relative", zIndex: 1 }}>
                  <div style={{ width: "32px", height: "32px", borderRadius: "50%", backgroundColor: "var(--green-light)", color: "var(--green)", display: "flex", alignItems: "center", flexShrink: 0, justifyContent: "center" }}>
                    <Plane size={14} style={{ transform: "rotate(90deg)" }} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "15px" }}>
                      {formatTime(flight.segments[flight.segments.length - 1].arrivalTime)} &bull; {flight.destination.city} ({flight.destination.code})
                    </div>
                    <div style={{ fontSize: "13px", color: "var(--muted)", marginTop: "2px" }}>
                      {flight.destination.address}
                    </div>
                    <div style={{ fontSize: "12px", color: "var(--subtle)", marginTop: "4px" }}>
                      Arrival Date: {formatDate(flight.segments[flight.segments.length - 1].arrivalTime, { weekday: "long", month: "long", day: "numeric" })}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Amenities Section */}
            {flight.amenities && (
              <div style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px", padding: "24px" }}>
                <h2 style={{ fontSize: "16px", fontWeight: 800, margin: "0 0 16px" }}>In-flight Amenities</h2>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "12px" }}>
                  {flight.amenities.map((amenity, idx) => (
                    <div key={idx} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "var(--text)" }}>
                      <div style={{ color: "var(--green)" }}>
                        <Check size={16} strokeWidth={3} />
                      </div>
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Policies */}
            <div style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px", padding: "24px" }}>
              <h2 style={{ fontSize: "16px", fontWeight: 800, margin: "0 0 16px" }}>Fare Rules & Cancellation Policy</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "13px", color: "var(--text)" }}>
                {flight.fareRules?.map((rule, idx) => (
                  <div key={idx} style={{ display: "flex", alignItems: "start", gap: "8px" }}>
                    <div style={{ marginTop: "2px", color: "var(--primary)" }}>&bull;</div>
                    <span>{rule}</span>
                  </div>
                ))}
                <div style={{ backgroundColor: "var(--error-light)", border: "1px solid #FCA5A5", borderRadius: "6px", padding: "12px", marginTop: "8px", display: "flex", gap: "10px", alignItems: "start" }}>
                  <AlertCircle size={16} style={{ color: "#DC2626", marginTop: "2px", flexShrink: 0 }} />
                  <span style={{ color: "#991B1B", fontSize: "12px", lineHeight: 1.4 }}>
                    <strong>Important Cancellation Notice:</strong> {flight.cancellationPolicy}
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Right: Booking Sidebar */}
          <div className="detail-sidebar">
            <div style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px", padding: "20px", position: "sticky", top: "88px" }}>
              <h3 style={{ margin: "0 0 16px", fontSize: "16px", fontWeight: 800 }}>Fare Summary</h3>
              
              <div style={{ borderBottom: "1px solid var(--border)", paddingBottom: "16px", marginBottom: "16px" }}>
                <div style={{ fontSize: "13px", color: "var(--muted)" }}>Selected Flight</div>
                <div style={{ fontWeight: 700, fontSize: "14px", marginTop: "4px" }}>
                  {flight.origin.code} &rarr; {flight.destination.code}
                </div>
                <div style={{ fontSize: "12px", color: "var(--subtle)", marginTop: "2px" }}>
                  {formatDate(segment.departureTime)}
                </div>
              </div>

              {/* Passenger Quantity */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                <label style={{ fontSize: "13px", fontWeight: 600, color: "var(--text)", display: "flex", alignItems: "center", gap: "4px" }}>
                  <Users size={14} />
                  Travelers
                </label>
                <select
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  style={{ padding: "4px 8px", borderRadius: "4px", border: "1px solid var(--border)", fontSize: "13px", fontWeight: 600 }}
                >
                  <option value={1}>1 Adult</option>
                  <option value={2}>2 Adults</option>
                  <option value={3}>3 Adults</option>
                  <option value={4}>4 Adults</option>
                  <option value={5}>5 Adults</option>
                </select>
              </div>

              {/* Price Breakdown */}
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", borderBottom: "1px solid var(--border)", paddingBottom: "16px", marginBottom: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                  <span style={{ color: "var(--muted)" }}>Base Fare ({quantity}x)</span>
                  <span>{formatPrice(baseTotal)}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                  <span style={{ color: "var(--muted)" }}>Taxes & Fees (12%)</span>
                  <span>{formatPrice(taxesTotal)}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                  <span style={{ color: "var(--muted)" }}>Booking Service Fee</span>
                  <span>{formatPrice(serviceFee)}</span>
                </div>
              </div>

              {/* Total Price */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "20px" }}>
                <span style={{ fontWeight: 700, fontSize: "15px" }}>Grand Total</span>
                <span style={{ fontSize: "24px", fontWeight: 800, color: "var(--primary)" }}>{formatPrice(grandTotal)}</span>
              </div>

              <button
                onClick={handleBookNow}
                className="btn-book"
                style={{ width: "100%", border: "none", cursor: "pointer", display: "block", textAlign: "center" }}
              >
                Book Flight
              </button>

              <div style={{ display: "flex", alignItems: "center", gap: "6px", justifyContent: "center", marginTop: "12px", color: "var(--green)", fontSize: "11px", fontWeight: 600 }}>
                <ShieldCheck size={14} />
                <span>Secure checkouts. No hidden charges.</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
