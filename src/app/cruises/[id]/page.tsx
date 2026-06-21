"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Star, Anchor, Check, ShieldCheck, Compass, HelpCircle } from "lucide-react";
import { mockCruises } from "@/data/cruises";
import { useBooking } from "@/context/BookingContext";
import { formatPrice } from "@/utils/format";
import { SearchCategory } from "@/types/search";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function CruiseDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { selectItemForBooking } = useBooking();

  const cruise = mockCruises.find((c) => c.id === resolvedParams.id);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (!cruise) {
    return (
      <div className="section-wrap" style={{ padding: "48px 24px", textAlign: "center" }}>
        <h2 style={{ fontWeight: 700 }}>Cruise Itinerary Not Found</h2>
        <p style={{ color: "var(--muted)" }}>The cruise itinerary you are looking for is unavailable.</p>
        <Link href="/search?category=cruises" className="btn-primary" style={{ textDecoration: "none", display: "inline-block", marginTop: "16px" }}>
          Back to Cruise Search
        </Link>
      </div>
    );
  }

  const handleBookCabin = (cabin: any) => {
    selectItemForBooking({
      itemId: cruise.id,
      category: SearchCategory.Cruises,
      title: `${cruise.nights} Nights ${cruise.name}`,
      subtitle: `${cruise.cruiseLine} &bull; ${cruise.shipName} &bull; ${cabin.name}`,
      dates: `Sailing Date: ${cruise.departureDate}`,
      basePrice: cabin.pricePerPerson,
      variant: cabin.name,
      quantity: 1
    });
    router.push("/booking");
  };

  const mainImage = selectedImage || cruise.image.src;

  return (
    <div style={{ backgroundColor: "var(--bg)", minHeight: "calc(100vh - 120px)", padding: "24px 0" }}>
      <div className="section-wrap" style={{ padding: "0 24px" }}>
        
        {/* Back Link */}
        <Link
          href={`/search?category=cruises&destination=${cruise.departurePort.city}`}
          style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--muted)", textDecoration: "none", fontSize: "14px", fontWeight: 600, marginBottom: "20px" }}
        >
          <ArrowLeft size={16} />
          Back to search results
        </Link>

        {/* Header Section */}
        <div style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px", padding: "24px", marginBottom: "24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", color: "var(--muted)" }}>
            <span style={{ color: "var(--primary)" }}>{cruise.cruiseLine}</span>
            <span>&bull;</span>
            <span>{cruise.shipName}</span>
            <span>&bull;</span>
            <span>{cruise.nights} Nights sailing</span>
          </div>
          <h1 style={{ fontSize: "26px", fontWeight: 800, margin: "0 0 8px" }}>{cruise.name}</h1>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--muted)", fontSize: "14px" }}>
            <Anchor size={14} />
            <span>Departs from {cruise.departurePort.city}, {cruise.departurePort.country}</span>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="hotel-gallery-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "16px", marginBottom: "24px" }}>
          {/* Main Large Image */}
          <div
            style={{
              backgroundImage: `url(${mainImage})`,
              height: "360px",
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: "8px"
            }}
          />
          {/* Thumbnails */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div
              onClick={() => setSelectedImage(cruise.image.src)}
              style={{
                backgroundImage: `url(${cruise.image.src})`,
                height: "112px",
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: "8px",
                cursor: "pointer",
                border: mainImage === cruise.image.src ? "3px solid var(--primary)" : "none"
              }}
            />
            {cruise.gallery?.slice(0, 2).map((img, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedImage(img.src)}
                style={{
                  backgroundImage: `url(${img.src})`,
                  height: "112px",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderRadius: "8px",
                  cursor: "pointer",
                  border: mainImage === img.src ? "3px solid var(--primary)" : "none"
                }}
              />
            ))}
          </div>
        </div>

        {/* Layout */}
        <div className="detail-layout">
          
          {/* Main Column */}
          <div className="detail-main">
            
            {/* Description */}
            <div style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px", padding: "24px" }}>
              <h2 style={{ fontSize: "16px", fontWeight: 800, margin: "0 0 12px" }}>Cruise Description</h2>
              <p style={{ margin: 0, fontSize: "14px", lineHeight: 1.6, color: "#374151" }}>{cruise.description}</p>
            </div>

            {/* Cabins Listing */}
            <div style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px", padding: "24px" }}>
              <h2 style={{ fontSize: "16px", fontWeight: 800, margin: "0 0 20px" }}>Available Cabins & Staterooms</h2>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                {cruise.cabins.map((cabin) => (
                  <div
                    key={cabin.id}
                    style={{
                      border: "1px solid var(--border)",
                      borderRadius: "8px",
                      padding: "16px",
                      display: "flex",
                      justifyContent: "space-between",
                      gap: "20px",
                      flexWrap: "wrap"
                    }}
                  >
                    <div style={{ flex: 1, minWidth: "260px" }}>
                      <h3 style={{ fontSize: "15px", fontWeight: 700, margin: "0 0 6px" }}>{cabin.name}</h3>
                      <p style={{ fontSize: "13px", color: "var(--muted)", margin: "0 0 12px" }}>{cabin.description}</p>
                      
                      <div style={{ display: "flex", gap: "16px", fontSize: "12px", color: "var(--text)", fontWeight: 500, flexWrap: "wrap", marginBottom: "12px" }}>
                        {cabin.sizeSqFt && <span>Size: <strong>{cabin.sizeSqFt} sq ft</strong></span>}
                        {cabin.deck && <span>Decks: <strong>{cabin.deck}</strong></span>}
                        <span>Max occupancy: <strong>{cabin.maxOccupancy} guests</strong></span>
                      </div>

                      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                        {cabin.amenities?.map((a, i) => (
                          <span key={i} style={{ fontSize: "10px", color: "var(--muted)", backgroundColor: "var(--surface)", padding: "2px 8px", borderRadius: "12px" }}>
                            {a}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div style={{ textAlign: "right", display: "flex", flexDirection: "column", justifyContent: "space-between", minWidth: "120px" }}>
                      <div>
                        <div style={{ fontSize: "22px", fontWeight: 800, color: "var(--primary)" }}>
                          {formatPrice(cabin.pricePerPerson)}
                        </div>
                        <div style={{ fontSize: "11px", color: "var(--muted)", marginTop: "2px" }}>/ traveler</div>
                      </div>
                      
                      <button
                        onClick={() => handleBookCabin(cabin)}
                        className="btn-book"
                        style={{
                          marginTop: "16px",
                          border: "none",
                          cursor: "pointer",
                          padding: "8px 16px",
                          fontSize: "12px"
                        }}
                      >
                        Select Cabin
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            </div>

            {/* Itinerary Timeline */}
            <div style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px", padding: "24px" }}>
              <h2 style={{ fontSize: "16px", fontWeight: 800, margin: "0 0 20px" }}>Cruise Itinerary</h2>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "20px", position: "relative" }}>
                <div style={{ position: "absolute", top: "8px", bottom: "8px", left: "15px", width: "2px", backgroundColor: "var(--border)" }} />
                
                {cruise.route.ports.map((port) => (
                  <div key={port.day} style={{ display: "flex", gap: "16px", position: "relative", zIndex: 1 }}>
                    <div style={{ width: "32px", height: "32px", borderRadius: "50%", backgroundColor: port.isTerminal ? "var(--primary-light)" : "var(--surface)", color: port.isTerminal ? "var(--primary)" : "var(--muted)", display: "flex", alignItems: "center", flexShrink: 0, justifyContent: "center" }}>
                      <Anchor size={12} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: "14px" }}>
                        Day {port.day}: {port.location.city}
                      </div>
                      <div style={{ fontSize: "12px", color: "var(--muted)", marginTop: "2px" }}>
                        {port.location.country}
                        {port.arrivalTime && ` &bull; Arrives: ${port.arrivalTime}`}
                        {port.departureTime && ` &bull; Departs: ${port.departureTime}`}
                        {port.isTerminal && " (Embarkation Port)"}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Policies & Ship Specs */}
          <div className="detail-sidebar">
            <div style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px", padding: "20px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ background: "var(--nav)", color: "#fff", width: "44px", height: "44px", display: "flex", alignItems: "center", borderRadius: "8px", fontWeight: 800, fontSize: "16px", justifyContent: "center" }}>
                  {cruise.rating.score.toFixed(1)}
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: "15px" }}>{cruise.rating.label}</div>
                  <div style={{ fontSize: "12px", color: "var(--muted)" }}>{cruise.rating.count.toLocaleString()} reviews</div>
                </div>
              </div>
            </div>

            {/* Inclusions */}
            <div style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px", padding: "20px" }}>
              <h3 style={{ margin: "0 0 12px", fontSize: "14px", fontWeight: 800 }}>What's Included</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "12px" }}>
                {cruise.included.map((item, idx) => (
                  <div key={idx} style={{ display: "flex", gap: "6px", alignItems: "start" }}>
                    <div style={{ color: "var(--green)" }}>✔</div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Exclusions */}
            <div style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px", padding: "20px" }}>
              <h3 style={{ margin: "0 0 12px", fontSize: "14px", fontWeight: 800 }}>Not Included</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "12px", color: "var(--muted)" }}>
                {cruise.notIncluded.map((item, idx) => (
                  <div key={idx} style={{ display: "flex", gap: "6px", alignItems: "start" }}>
                    <div style={{ color: "red" }}>&times;</div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
