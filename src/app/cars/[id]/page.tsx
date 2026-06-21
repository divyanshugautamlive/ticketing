"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, MapPin, Check, Users, Briefcase, Cog, Fuel, Phone, ShieldCheck, HelpCircle } from "lucide-react";
import { mockCars } from "@/data/cars";
import { useBooking } from "@/context/BookingContext";
import { useSearch } from "@/context/SearchContext";
import { formatPrice } from "@/utils/format";
import { SearchCategory } from "@/types/search";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function CarDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { selectItemForBooking } = useBooking();
  const { params: searchParams } = useSearch();

  const car = mockCars.find((c) => c.id === resolvedParams.id);
  const [selectedInsurance, setSelectedInsurance] = useState<string>("ins-none");

  if (!car) {
    return (
      <div className="section-wrap" style={{ padding: "48px 24px", textAlign: "center" }}>
        <h2 style={{ fontWeight: 700 }}>Vehicle Not Found</h2>
        <p style={{ color: "var(--muted)" }}>The vehicle you are looking for is currently unavailable in our fleet.</p>
        <Link href="/search?category=cars" className="btn-primary" style={{ textDecoration: "none", display: "inline-block", marginTop: "16px" }}>
          Back to Car Rentals
        </Link>
      </div>
    );
  }

  // Calculate rental duration in days
  const getRentalDays = () => {
    if (searchParams.dates?.start && searchParams.dates?.end) {
      const start = new Date(searchParams.dates.start);
      const end = new Date(searchParams.dates.end);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays > 0 ? diffDays : 1;
    }
    return 1;
  };

  const days = getRentalDays();
  const dailyRate = car.pricePerDay.amount;
  const baseCost = dailyRate * days;
  
  // Insurance calculation
  const insuranceOption = car.insuranceOptions.find(opt => opt.id === selectedInsurance);
  const insuranceDailyRate = insuranceOption ? insuranceOption.pricePerDay.amount : 0;
  const insuranceCost = insuranceDailyRate * days;
  const totalCost = baseCost + insuranceCost;

  const handleBookCar = () => {
    selectItemForBooking({
      itemId: car.id,
      category: SearchCategory.Cars,
      title: `${car.name} Rental`,
      subtitle: `${car.agency} &bull; ${car.type.toUpperCase()} Class &bull; ${car.transmission.toUpperCase()}`,
      dates: searchParams.dates?.start 
        ? `Pick-up: ${searchParams.dates.start} (${searchParams.pickupTime || "10:00 AM"}) &rarr; Drop-off: ${searchParams.dates.end} (${searchParams.dropoffTime || "10:00 AM"})`
        : `Rental Duration: ${days} ${days === 1 ? "day" : "days"}`,
      basePrice: { 
        amount: totalCost / days, 
        currency: "USD", 
        display: `$${(totalCost / days).toFixed(2)}/day` 
      },
      variant: `${car.type} (${car.transmission})`,
      quantity: days
    });
    router.push("/booking");
  };

  return (
    <div style={{ backgroundColor: "var(--bg)", minHeight: "calc(100vh - 120px)", padding: "24px 0" }}>
      <div className="section-wrap" style={{ padding: "0 24px" }}>
        
        {/* Back Link */}
        <Link
          href={`/search?category=cars&destination=${car.location.city}`}
          style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--muted)", textDecoration: "none", fontSize: "14px", fontWeight: 600, marginBottom: "20px" }}
        >
          <ArrowLeft size={16} />
          Back to search results
        </Link>

        {/* Header Section */}
        <div style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px", padding: "24px", marginBottom: "24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
            <span style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", color: "var(--primary)" }}>
              {car.type} Rental Car
            </span>
            <span style={{ color: "var(--subtle)" }}>&bull;</span>
            <span style={{ fontSize: "11px", fontWeight: 600, color: "var(--muted)" }}>
              {car.agency} Fleet
            </span>
          </div>
          <h1 style={{ fontSize: "28px", fontWeight: 800, margin: "0 0 8px" }}>{car.name}</h1>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--muted)", fontSize: "14px" }}>
            <MapPin size={14} />
            <span>Pick-up: {car.location.address}</span>
          </div>
        </div>

        {/* Gallery grid & basic info */}
        <div className="car-gallery-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "16px", marginBottom: "24px" }}>
          {/* Large Main Image */}
          <div
            style={{
              backgroundImage: `url(${car.image.src})`,
              height: "360px",
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: "8px"
            }}
          />
          {/* Sidebar Specs Box */}
          <div style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px", padding: "24px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <h3 style={{ fontSize: "15px", fontWeight: 800, margin: "0 0 16px" }}>Vehicle Specifications</h3>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", borderBottom: "1px solid var(--border)", paddingBottom: "8px" }}>
                  <span style={{ color: "var(--muted)", display: "flex", alignItems: "center", gap: "4px" }}><Users size={14} /> Capacity</span>
                  <span style={{ fontWeight: 700 }}>{car.seats} Passengers</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", borderBottom: "1px solid var(--border)", paddingBottom: "8px" }}>
                  <span style={{ color: "var(--muted)", display: "flex", alignItems: "center", gap: "4px" }}><Briefcase size={14} /> Luggage</span>
                  <span style={{ fontWeight: 700 }}>{car.luggageLarge} Large / {car.luggageSmall} Small</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", borderBottom: "1px solid var(--border)", paddingBottom: "8px" }}>
                  <span style={{ color: "var(--muted)", display: "flex", alignItems: "center", gap: "4px" }}><Cog size={14} /> Transmission</span>
                  <span style={{ fontWeight: 700, textTransform: "capitalize" }}>{car.transmission}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", borderBottom: "1px solid var(--border)", paddingBottom: "8px" }}>
                  <span style={{ color: "var(--muted)", display: "flex", alignItems: "center", gap: "4px" }}><Fuel size={14} /> Fuel Policy</span>
                  <span style={{ fontWeight: 700 }}>{car.fuelPolicy}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                  <span style={{ color: "var(--muted)" }}>Est. MPG/Range</span>
                  <span style={{ fontWeight: 700 }}>{car.mpg}</span>
                </div>
              </div>
            </div>

            <div style={{ borderTop: "1px solid var(--border)", paddingTop: "16px", marginTop: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--green)", fontSize: "12px", fontWeight: 700 }}>
                <Check size={14} />
                <span>Unlimited Mileage Included</span>
              </div>
            </div>
          </div>
        </div>

        {/* Layout */}
        <div className="detail-layout">
          
          {/* Main Content Column */}
          <div className="detail-main">
            
            {/* Description */}
            <div style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px", padding: "24px" }}>
              <h2 style={{ fontSize: "16px", fontWeight: 800, margin: "0 0 12px" }}>About this rental</h2>
              <p style={{ margin: 0, fontSize: "14px", lineHeight: 1.6, color: "#374151" }}>{car.description}</p>
            </div>

            {/* Insurance Options */}
            <div style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px", padding: "24px" }}>
              <h2 style={{ fontSize: "16px", fontWeight: 800, margin: "0 0 4px" }}>Add Protection (Optional)</h2>
              <p style={{ margin: "0 0 20px", fontSize: "13px", color: "var(--muted)" }}>Protect your trip against accidental collision damages, theft, or vandalism.</p>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {/* No Insurance */}
                <label
                  style={{
                    border: selectedInsurance === "ins-none" ? "2px solid var(--primary)" : "1px solid var(--border)",
                    backgroundColor: selectedInsurance === "ins-none" ? "var(--primary-light)" : "#fff",
                    borderRadius: "8px",
                    padding: "16px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    cursor: "pointer"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <input
                      type="radio"
                      name="insurance"
                      value="ins-none"
                      checked={selectedInsurance === "ins-none"}
                      onChange={() => setSelectedInsurance("ins-none")}
                    />
                    <div>
                      <h3 style={{ fontSize: "14px", fontWeight: 700, margin: 0 }}>Decline Collision Protection</h3>
                      <p style={{ fontSize: "12px", color: "var(--muted)", margin: "2px 0 0" }}>You will be personally responsible for any physical damages to the car.</p>
                    </div>
                  </div>
                  <div style={{ fontWeight: 700, fontSize: "14px" }}>Free</div>
                </label>

                {/* Dynamic insurance options */}
                {car.insuranceOptions.map((opt) => (
                  <label
                    key={opt.id}
                    style={{
                      border: selectedInsurance === opt.id ? "2px solid var(--primary)" : "1px solid var(--border)",
                      backgroundColor: selectedInsurance === opt.id ? "var(--primary-light)" : "#fff",
                      borderRadius: "8px",
                      padding: "16px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      cursor: "pointer"
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <input
                        type="radio"
                        name="insurance"
                        value={opt.id}
                        checked={selectedInsurance === opt.id}
                        onChange={() => setSelectedInsurance(opt.id)}
                      />
                      <div>
                        <h3 style={{ fontSize: "14px", fontWeight: 700, margin: 0 }}>{opt.name}</h3>
                        <p style={{ fontSize: "12px", color: "var(--muted)", margin: "2px 0 0" }}>{opt.description}</p>
                      </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontWeight: 800, fontSize: "15px", color: "var(--primary)" }}>{formatPrice(opt.pricePerDay)}</div>
                      <div style={{ fontSize: "10px", color: "var(--muted)" }}>/ day</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Features list */}
            <div style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px", padding: "24px" }}>
              <h2 style={{ fontSize: "16px", fontWeight: 800, margin: "0 0 16px" }}>Vehicle Amenities & Features</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "12px" }}>
                {car.features.map((feature, idx) => (
                  <div key={idx} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px" }}>
                    <div style={{ color: "var(--primary)" }}>
                      <Check size={14} />
                    </div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Instructions */}
            <div style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px", padding: "24px" }}>
              <h2 style={{ fontSize: "16px", fontWeight: 800, margin: "0 0 16px" }}>Rental Office Directions</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div>
                  <h4 style={{ fontSize: "13px", fontWeight: 700, margin: "0 0 4px", color: "var(--text)" }}>How to Pick Up the Vehicle:</h4>
                  <p style={{ fontSize: "13px", color: "#374151", margin: 0, lineHeight: 1.5 }}>{car.pickupInstructions}</p>
                </div>
                <div style={{ borderTop: "1px solid var(--border)", paddingTop: "12px" }}>
                  <h4 style={{ fontSize: "13px", fontWeight: 700, margin: "0 0 4px", color: "var(--text)" }}>How to Drop Off the Vehicle:</h4>
                  <p style={{ fontSize: "13px", color: "#374151", margin: 0, lineHeight: 1.5 }}>{car.dropoffInstructions}</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Dynamic Price box & Booking summary */}
          <div className="detail-sidebar">
            <div style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px", padding: "20px", position: "sticky", top: "80px" }}>
              <h3 style={{ margin: "0 0 16px", fontSize: "16px", fontWeight: 800 }}>Rental Summary</h3>
              
              {/* Pickup location info */}
              <div style={{ borderBottom: "1px solid var(--border)", paddingBottom: "16px", marginBottom: "16px" }}>
                <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--muted)", textTransform: "uppercase" }}>Pick-up / Drop-off</span>
                <h4 style={{ fontSize: "14px", fontWeight: 800, margin: "6px 0 2px" }}>{car.location.city} ({car.location.code})</h4>
                <p style={{ fontSize: "12px", color: "var(--muted)", margin: 0 }}>{car.location.address}</p>
              </div>

              {/* Dates & Times */}
              <div style={{ borderBottom: "1px solid var(--border)", paddingBottom: "16px", marginBottom: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", margin: "4px 0" }}>
                  <span style={{ color: "var(--muted)" }}>Pick-up:</span>
                  <span style={{ fontWeight: 700 }}>{searchParams.dates?.start || "Select Date"} at {searchParams.pickupTime || "10:00 AM"}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", margin: "4px 0" }}>
                  <span style={{ color: "var(--muted)" }}>Drop-off:</span>
                  <span style={{ fontWeight: 700 }}>{searchParams.dates?.end || "Select Date"} at {searchParams.dropoffTime || "10:00 AM"}</span>
                </div>
              </div>

              {/* Cost breakdown */}
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", borderBottom: "1px solid var(--border)", paddingBottom: "16px", marginBottom: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                  <span style={{ color: "var(--muted)" }}>Car Rental ({days} {days === 1 ? "day" : "days"})</span>
                  <span>{formatPrice({ amount: baseCost, currency: "USD", display: `$${baseCost.toFixed(2)}` })}</span>
                </div>
                {insuranceCost > 0 && (
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "var(--green)", fontWeight: 500 }}>
                    <span>Trip Protection</span>
                    <span>{formatPrice({ amount: insuranceCost, currency: "USD", display: `$${insuranceCost.toFixed(2)}` })}</span>
                  </div>
                )}
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                  <span style={{ color: "var(--muted)" }}>Unlimited Mileage</span>
                  <span style={{ color: "var(--green)", fontWeight: 600 }}>Free</span>
                </div>
              </div>

              {/* Total Price */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "20px" }}>
                <span style={{ fontWeight: 700, fontSize: "14px" }}>Total Estimated Cost</span>
                <span style={{ fontSize: "24px", fontWeight: 800, color: "var(--primary)" }}>${totalCost.toFixed(2)}</span>
              </div>

              {/* Book button */}
              <button
                onClick={handleBookCar}
                className="btn-book"
                style={{
                  width: "100%",
                  border: "none",
                  cursor: "pointer",
                  display: "block",
                  textAlign: "center",
                  fontSize: "14px",
                  padding: "12px",
                  marginBottom: "12px"
                }}
              >
                Proceed to Checkout
              </button>

              <div style={{ display: "flex", alignItems: "center", gap: "6px", justifyContent: "center", color: "var(--green)", fontSize: "11px", fontWeight: 600 }}>
                <ShieldCheck size={14} />
                <span>Zero Booking Fees &bull; Instant Confirmation</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
