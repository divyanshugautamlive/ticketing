"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Star, MapPin, Check, Phone, ShieldCheck, Sparkles, Calendar, Users } from "lucide-react";
import { mockStays } from "@/data/stays";
import { useBooking } from "@/context/BookingContext";
import { formatPrice } from "@/utils/format";
import { SearchCategory } from "@/types/search";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function StayDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { selectItemForBooking } = useBooking();

  const stay = mockStays.find((s) => s.id === resolvedParams.id);
  const [nights, setNights] = useState(2);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (!stay) {
    return (
      <div className="section-wrap" style={{ padding: "48px 24px", textAlign: "center" }}>
        <h2 style={{ fontWeight: 700 }}>Vacation Stay Not Found</h2>
        <p style={{ color: "var(--muted)" }}>The stay property you are looking for is unavailable.</p>
        <Link href="/search?category=stays" className="btn-primary" style={{ textDecoration: "none", display: "inline-block", marginTop: "16px" }}>
          Back to Stay Search
        </Link>
      </div>
    );
  }

  const handleBookNow = () => {
    selectItemForBooking({
      itemId: stay.id,
      category: SearchCategory.Stays,
      title: stay.name,
      subtitle: `${stay.bedrooms} Bedrooms &bull; ${stay.bathrooms} Bathrooms`,
      dates: `${nights} Nights stay`,
      basePrice: stay.pricePerNight,
      variant: `${stay.propertyType.toUpperCase()} Accommodation`,
      quantity: nights
    });
    router.push("/booking");
  };

  const mainImage = selectedImage || stay.image.src;
  const baseTotal = stay.pricePerNight.amount * nights;
  const cleaning = stay.cleaningFee?.amount || 50;
  const service = stay.serviceFee?.amount || 35;
  const grandTotal = baseTotal + cleaning + service;

  return (
    <div style={{ backgroundColor: "var(--bg)", minHeight: "calc(100vh - 120px)", padding: "24px 0" }}>
      <div className="section-wrap" style={{ padding: "0 24px" }}>
        
        {/* Back Link */}
        <Link
          href={`/search?category=stays&destination=${stay.location.city}`}
          style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--muted)", textDecoration: "none", fontSize: "14px", fontWeight: 600, marginBottom: "20px" }}
        >
          <ArrowLeft size={16} />
          Back to search results
        </Link>

        {/* Header Section */}
        <div style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px", padding: "24px", marginBottom: "24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
            {stay.isSuperhost && (
              <span className="badge-green" style={{ fontSize: "10px", display: "flex", alignItems: "center", gap: "2px" }}>
                <Sparkles size={10} />
                <span>Superhost</span>
              </span>
            )}
            <span style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", color: "var(--muted)" }}>
              {stay.propertyType}
            </span>
            <span>&bull;</span>
            <span style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", color: "var(--muted)" }}>
              {stay.bedrooms} Bedrooms &bull; {stay.bathrooms} Bathrooms
            </span>
          </div>
          <h1 style={{ fontSize: "26px", fontWeight: 800, margin: "0 0 8px" }}>{stay.name}</h1>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--muted)", fontSize: "14px" }}>
            <MapPin size={14} />
            <span>{stay.location.address || `${stay.location.city}, ${stay.location.country}`}</span>
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
              onClick={() => setSelectedImage(stay.image.src)}
              style={{
                backgroundImage: `url(${stay.image.src})`,
                height: "112px",
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: "8px",
                cursor: "pointer",
                border: mainImage === stay.image.src ? "3px solid var(--primary)" : "none"
              }}
            />
            {stay.gallery?.slice(0, 2).map((img, idx) => (
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
              <h2 style={{ fontSize: "16px", fontWeight: 800, margin: "0 0 12px" }}>About this space</h2>
              <p style={{ margin: 0, fontSize: "14px", lineHeight: 1.6, color: "#374151" }}>{stay.description}</p>
            </div>

            {/* Amenities */}
            <div style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px", padding: "24px" }}>
              <h2 style={{ fontSize: "16px", fontWeight: 800, margin: "0 0 16px" }}>What this place offers</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "12px" }}>
                {stay.amenities.map((amenity, idx) => (
                  <div key={idx} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px" }}>
                    <div style={{ color: "var(--primary)" }}>
                      <Check size={14} />
                    </div>
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Host info */}
            <div style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px", padding: "24px" }}>
              <h2 style={{ fontSize: "16px", fontWeight: 800, margin: "0 0 16px" }}>Hosted by {stay.host.name}</h2>
              <div style={{ display: "flex", gap: "16px", alignItems: "center", marginBottom: "16px" }}>
                {stay.host.avatar && (
                  <div
                    style={{
                      backgroundImage: `url(${stay.host.avatar.src})`,
                      width: "60px",
                      height: "60px",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      borderRadius: "50%"
                    }}
                  />
                )}
                <div>
                  <div style={{ fontWeight: 700, fontSize: "14px" }}>Joined in {stay.host.joinedDate}</div>
                  <div style={{ fontSize: "12px", color: "var(--muted)", marginTop: "2px" }}>
                    Response rate: {stay.host.responseRate} &bull; Response time: {stay.host.responseTime}
                  </div>
                </div>
              </div>
            </div>

            {/* House Rules */}
            <div style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px", padding: "24px" }}>
              <h2 style={{ fontSize: "16px", fontWeight: 800, margin: "0 0 16px" }}>House Rules</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "12px", fontSize: "13px", color: "#4B5563" }}>
                {stay.houseRules.map((rule, idx) => (
                  <div key={idx} style={{ display: "flex", gap: "8px", alignItems: "start" }}>
                    <div style={{ color: "var(--primary)", marginTop: "2px" }}>&bull;</div>
                    <span>{rule}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Reservation form */}
          <div className="detail-sidebar">
            <div style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px", padding: "20px", position: "sticky", top: "88px" }}>
              
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "16px" }}>
                <div>
                  <span style={{ fontSize: "24px", fontWeight: 800, color: "var(--primary)" }}>
                    {formatPrice(stay.pricePerNight)}
                  </span>
                  <span style={{ fontSize: "12px", color: "var(--muted)" }}> / night</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "13px", fontWeight: 600 }}>
                  <Star size={12} fill="var(--warn)" stroke="var(--warn)" />
                  <span>{stay.rating.score.toFixed(2)}</span>
                </div>
              </div>

              {/* Night select */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", borderTop: "1px solid var(--border)", paddingTop: "16px" }}>
                <label style={{ fontSize: "13px", fontWeight: 600, color: "var(--text)", display: "flex", alignItems: "center", gap: "4px" }}>
                  <Calendar size={14} />
                  Duration
                </label>
                <select
                  value={nights}
                  onChange={(e) => setNights(parseInt(e.target.value))}
                  style={{ padding: "4px 8px", borderRadius: "4px", border: "1px solid var(--border)", fontSize: "13px", fontWeight: 600 }}
                >
                  <option value={1}>1 Night</option>
                  <option value={2}>2 Nights</option>
                  <option value={3}>3 Nights</option>
                  <option value={4}>4 Nights</option>
                  <option value={5}>5 Nights</option>
                  <option value={7}>7 Nights</option>
                  <option value={10}>10 Nights</option>
                </select>
              </div>

              {/* Cost breakdown */}
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", borderBottom: "1px solid var(--border)", paddingBottom: "16px", marginBottom: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                  <span style={{ color: "var(--muted)" }}>{formatPrice(stay.pricePerNight)} x {nights} nights</span>
                  <span>{formatPrice(baseTotal)}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                  <span style={{ color: "var(--muted)" }}>Cleaning Fee</span>
                  <span>{formatPrice(cleaning)}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                  <span style={{ color: "var(--muted)" }}>Service Fee</span>
                  <span>{formatPrice(service)}</span>
                </div>
              </div>

              {/* Total */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "20px" }}>
                <span style={{ fontWeight: 700, fontSize: "15px" }}>Total Cost</span>
                <span style={{ fontSize: "24px", fontWeight: 800, color: "var(--primary)" }}>{formatPrice(grandTotal)}</span>
              </div>

              <button
                onClick={handleBookNow}
                className="btn-book"
                style={{ width: "100%", border: "none", cursor: "pointer", display: "block", textAlign: "center" }}
              >
                Reserve Stay
              </button>

              <div style={{ display: "flex", alignItems: "center", gap: "6px", justifyContent: "center", marginTop: "12px", color: "var(--green)", fontSize: "11px", fontWeight: 600 }}>
                <ShieldCheck size={14} />
                <span>Instant Booking Secured</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
