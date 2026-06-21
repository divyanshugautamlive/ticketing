"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Train, Clock, Check, ShieldCheck, MapPin } from "lucide-react";
import { mockTrains } from "@/data/trains";
import { useBooking } from "@/context/BookingContext";
import { formatPrice, formatDuration } from "@/utils/format";
import { SearchCategory } from "@/types/search";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function TrainDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { selectItemForBooking } = useBooking();

  const train = mockTrains.find((t) => t.id === resolvedParams.id);
  const [selectedClass, setSelectedClass] = useState<string | null>(null);

  if (!train) {
    return (
      <div className="section-wrap" style={{ padding: "48px 24px", textAlign: "center" }}>
        <h2 style={{ fontWeight: 700 }}>Train Schedule Not Found</h2>
        <p style={{ color: "var(--muted)" }}>The train schedule you are looking for is unavailable.</p>
        <Link href="/trains" className="btn-primary" style={{ textDecoration: "none", display: "inline-block", marginTop: "16px" }}>
          Back to Train Search
        </Link>
      </div>
    );
  }

  const handleBookTicket = (cls: any) => {
    selectItemForBooking({
      itemId: train.id,
      category: SearchCategory.Trains,
      title: train.name,
      subtitle: `#${train.trainNumber} &bull; ${train.origin.city} &rarr; ${train.destination.city}`,
      dates: `Departure: ${train.departureTime}`,
      basePrice: cls.price,
      variant: cls.name,
      quantity: 1
    });
    router.push("/booking");
  };

  return (
    <div style={{ backgroundColor: "var(--bg)", minHeight: "calc(100vh - 120px)", padding: "24px 0" }}>
      <div className="section-wrap" style={{ padding: "0 24px" }}>
        
        {/* Back Link */}
        <Link
          href={`/trains?origin=${train.origin.city}&destination=${train.destination.city}`}
          style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--muted)", textDecoration: "none", fontSize: "14px", fontWeight: 600, marginBottom: "20px" }}
        >
          <ArrowLeft size={16} />
          Back to search results
        </Link>

        {/* Header Section */}
        <div style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px", padding: "24px", marginBottom: "24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", color: "var(--muted)" }}>
            <span style={{ color: "var(--primary)" }}>{train.trainType}</span>
            <span>&bull;</span>
            <span>Train #{train.trainNumber}</span>
            <span>&bull;</span>
            <span>Runs: {train.runsOn.join(", ")}</span>
          </div>
          <h1 style={{ fontSize: "26px", fontWeight: 800, margin: "0 0 8px" }}>{train.name}</h1>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--muted)", fontSize: "14px" }}>
            <Train size={14} />
            <span>Route: {train.origin.city} &rarr; {train.destination.city}</span>
          </div>
        </div>

        {/* Layout */}
        <div className="detail-layout">
          
          {/* Main Column */}
          <div className="detail-main">
            
            {/* Class Selections */}
            <div style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px", padding: "24px" }}>
              <h2 style={{ fontSize: "16px", fontWeight: 800, margin: "0 0 20px" }}>Select Train Class & Book</h2>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {train.classes.map((cls) => (
                  <div
                    key={cls.id}
                    style={{
                      border: "1px solid var(--border)",
                      borderRadius: "8px",
                      padding: "16px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "20px",
                      flexWrap: "wrap",
                      backgroundColor: cls.isAvailable ? "#fff" : "var(--surface)"
                    }}
                  >
                    <div>
                      <h3 style={{ fontSize: "15px", fontWeight: 700, margin: "0 0 4px" }}>
                        {cls.name} ({cls.shortName})
                      </h3>
                      <div style={{ fontSize: "12px", color: cls.isAvailable ? "var(--green)" : "var(--error)", fontWeight: 600 }}>
                        {cls.isAvailable ? `${cls.available} Seats Available` : "Waiting List (WL)"}
                      </div>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontSize: "20px", fontWeight: 800, color: "var(--primary)" }}>
                          {formatPrice(cls.price)}
                        </div>
                        <div style={{ fontSize: "11px", color: "var(--muted)" }}>per ticket</div>
                      </div>
                      
                      <button
                        onClick={() => handleBookTicket(cls)}
                        disabled={!cls.isAvailable}
                        className="btn-book"
                        style={{
                          border: "none",
                          cursor: cls.isAvailable ? "pointer" : "not-allowed",
                          padding: "8px 16px",
                          fontSize: "12px",
                          backgroundColor: cls.isAvailable ? "var(--primary)" : "var(--subtle)"
                        }}
                      >
                        {cls.isAvailable ? "Book Now" : "WL Full"}
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            </div>

            {/* Timetable/Stops */}
            {train.intermediateStops && (
              <div style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px", padding: "24px" }}>
                <h2 style={{ fontSize: "16px", fontWeight: 800, margin: "0 0 20px" }}>Intermediate Stations & Halts</h2>
                
                <div style={{ display: "flex", flexDirection: "column", gap: "20px", position: "relative" }}>
                  <div style={{ position: "absolute", top: "8px", bottom: "8px", left: "15px", width: "2px", backgroundColor: "var(--border)" }} />
                  
                  {/* Origin */}
                  <div style={{ display: "flex", gap: "16px", position: "relative", zIndex: 1 }}>
                    <div style={{ width: "32px", height: "32px", borderRadius: "50%", backgroundColor: "var(--primary-light)", color: "var(--primary)", display: "flex", alignItems: "center", flexShrink: 0, justifyContent: "center" }}>
                      <Train size={12} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: "14px" }}>
                        {train.origin.city} ({train.origin.code})
                      </div>
                      <div style={{ fontSize: "12px", color: "var(--muted)", marginTop: "2px" }}>
                        Departs: {train.departureTime} &bull; Day 1
                      </div>
                    </div>
                  </div>

                  {/* Intermediates */}
                  {train.intermediateStops.map((stop, idx) => (
                    <div key={idx} style={{ display: "flex", gap: "16px", position: "relative", zIndex: 1 }}>
                      <div style={{ width: "32px", height: "32px", borderRadius: "50%", backgroundColor: "var(--surface)", color: "var(--muted)", display: "flex", alignItems: "center", flexShrink: 0, justifyContent: "center" }}>
                        &bull;
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: "14px" }}>
                          {stop.station.city} ({stop.station.code})
                        </div>
                        <div style={{ fontSize: "12px", color: "var(--muted)", marginTop: "2px" }}>
                          Arrives: {stop.arrivalTime} &bull; Departs: {stop.departureTime} &bull; Halt: {stop.haltMinutes} mins &bull; {stop.distanceKm} km
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Destination */}
                  <div style={{ display: "flex", gap: "16px", position: "relative", zIndex: 1 }}>
                    <div style={{ width: "32px", height: "32px", borderRadius: "50%", backgroundColor: "var(--green-light)", color: "var(--green)", display: "flex", alignItems: "center", flexShrink: 0, justifyContent: "center" }}>
                      <MapPin size={12} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: "14px" }}>
                        {train.destination.city} ({train.destination.code})
                      </div>
                      <div style={{ fontSize: "12px", color: "var(--muted)", marginTop: "2px" }}>
                        Arrives: {train.arrivalTime} &bull; Day {train.intermediateStops[train.intermediateStops.length - 1]?.day || 1} &bull; {train.distanceKm} km
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Right Column: General Information */}
          <div className="detail-sidebar">
            
            <div style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px", padding: "20px" }}>
              <h3 style={{ margin: "0 0 12px", fontSize: "14px", fontWeight: 800 }}>Journey Information</h3>
              <div style={{ fontSize: "12px", display: "flex", flexDirection: "column", gap: "8px" }}>
                <div>Total Distance: <strong>{train.distanceKm || "1386"} km</strong></div>
                <div>Avg Speed: <strong>{train.avgSpeedKmh || "88"} km/h</strong></div>
                <div>Duration: <strong>{formatDuration(train.durationMinutes)}</strong></div>
                <div>Pantry on board: <strong>{train.hasPantry ? "Yes" : "No"}</strong></div>
              </div>
            </div>

            {/* Coach Composition */}
            {train.coachComposition && (
              <div style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px", padding: "20px" }}>
                <h3 style={{ margin: "0 0 12px", fontSize: "14px", fontWeight: 800 }}>Coach Composition</h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                  {train.coachComposition.map((c, i) => (
                    <span key={i} style={{ fontSize: "10px", padding: "2px 6px", border: "1px solid var(--border)", borderRadius: "4px", backgroundColor: "var(--surface)" }}>
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px", padding: "20px", display: "flex", alignItems: "center", gap: "8px", color: "var(--green)" }}>
              <ShieldCheck size={20} />
              <div style={{ fontSize: "11px", fontWeight: 600 }}>IRCTC Official Partner booking.</div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
