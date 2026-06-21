"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { 
  Calendar, 
  User, 
  Phone, 
  FileText, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  XCircle, 
  Plane, 
  Hotel, 
  Compass, 
  Train, 
  Home, 
  Star,
  Info
} from "lucide-react";
import { formatPrice } from "@/utils/format";
import { Booking } from "@/types/booking";
import { SearchCategory } from "@/types/search";

// Realistic default mock trips if local storage is empty
const defaultMockTrips: Booking[] = [
  {
    id: "bk-mock1",
    referenceNumber: "TI-849201",
    status: "confirmed",
    category: SearchCategory.Flights,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    paymentMethod: "credit_card",
    contact: {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      phone: "+1 555-0199"
    },
    travelers: [
      {
        index: 0,
        type: "adult",
        title: "Mr",
        firstName: "John",
        lastName: "Doe",
        dateOfBirth: "1988-05-15",
        nationality: "US",
        passportNumber: "A1234567"
      }
    ],
    summary: {
      item: {
        itemId: "fl-mock1",
        category: SearchCategory.Flights,
        title: "British Airways BA-227",
        subtitle: "London Heathrow (LHR) to New York JFK (JFK)",
        dates: "Jul 15, 2026",
        basePrice: { amount: 650, currency: "USD", display: "$650.00" },
        quantity: 1,
        variant: "Economy Class"
      },
      travelerCount: 1,
      baseFare: { amount: 650, currency: "USD", display: "$650.00" },
      taxesAndFees: { amount: 78, currency: "USD", display: "$78.00" },
      serviceCharge: { amount: 25, currency: "USD", display: "$25.00" },
      total: { amount: 753, currency: "USD", display: "$753.00" }
    }
  },
  {
    id: "bk-mock2",
    referenceNumber: "TI-391829",
    status: "completed",
    category: SearchCategory.Cars,
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days ago
    updatedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    paymentMethod: "credit_card",
    contact: {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      phone: "+1 555-0199"
    },
    travelers: [
      {
        index: 0,
        type: "adult",
        title: "Mr",
        firstName: "John",
        lastName: "Doe",
        dateOfBirth: "1988-05-15",
        nationality: "US"
      }
    ],
    summary: {
      item: {
        itemId: "car-103",
        category: SearchCategory.Cars,
        title: "Tesla Model 3 Rental",
        subtitle: "Avis &bull; Electric Class &bull; Automatic",
        dates: "May 10, 2026 (10:00 AM) - May 14, 2026 (10:00 AM)",
        basePrice: { amount: 65, currency: "USD", display: "$65.00/day" },
        quantity: 4, // 4 days
        variant: "4 Days Rental"
      },
      travelerCount: 1,
      baseFare: { amount: 260, currency: "USD", display: "$260.00" },
      taxesAndFees: { amount: 31.2, currency: "USD", display: "$31.20" },
      serviceCharge: { amount: 25, currency: "USD", display: "$25.00" },
      total: { amount: 316.2, currency: "USD", display: "$316.20" }
    }
  },
  {
    id: "bk-mock3",
    referenceNumber: "TI-110294",
    status: "cancelled",
    category: SearchCategory.Trains,
    createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(), // 12 days ago
    updatedAt: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000).toISOString(),
    paymentMethod: "credit_card",
    contact: {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      phone: "+1 555-0199"
    },
    travelers: [
      {
        index: 0,
        type: "adult",
        title: "Mr",
        firstName: "John",
        lastName: "Doe",
        dateOfBirth: "1988-05-15",
        nationality: "US"
      }
    ],
    summary: {
      item: {
        itemId: "tr-mock1",
        category: SearchCategory.Trains,
        title: "Eurostar E-9012",
        subtitle: "Paris Gare du Nord to London St Pancras Int",
        dates: "Jun 01, 2026",
        basePrice: { amount: 120, currency: "USD", display: "$120.00" },
        quantity: 1,
        variant: "Standard Premier Class"
      },
      travelerCount: 1,
      baseFare: { amount: 120, currency: "USD", display: "$120.00" },
      taxesAndFees: { amount: 14.4, currency: "USD", display: "$14.40" },
      serviceCharge: { amount: 25, currency: "USD", display: "$25.00" },
      total: { amount: 159.4, currency: "USD", display: "$159.40" }
    }
  }
];

function MyTripsContent() {
  const searchParams = useSearchParams();
  
  const isSuccess = searchParams.get("success") === "true";
  const successRef = searchParams.get("ref");

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [activeTab, setActiveTab] = useState<"upcoming" | "completed" | "cancelled">("upcoming");
  const [selectedTripDetails, setSelectedTripDetails] = useState<Booking | null>(null);
  
  // Interactive cancellation confirmation state
  const [tripToCancel, setTripToCancel] = useState<Booking | null>(null);
  
  // Successful alert close state
  const [showSuccessAlert, setShowSuccessAlert] = useState(isSuccess);

  // Load bookings from local storage
  useEffect(() => {
    const local = localStorage.getItem("ticketing_bookings");
    if (local) {
      setBookings(JSON.parse(local));
    } else {
      // Prepopulate with high-fidelity mock bookings
      localStorage.setItem("ticketing_bookings", JSON.stringify(defaultMockTrips));
      setBookings(defaultMockTrips);
    }
  }, []);

  // Filter bookings based on activeTab
  const filteredBookings = bookings.filter((booking) => {
    if (activeTab === "upcoming") {
      return booking.status === "confirmed" || booking.status === "pending";
    }
    if (activeTab === "completed") {
      return booking.status === "completed";
    }
    if (activeTab === "cancelled") {
      return booking.status === "cancelled";
    }
    return false;
  });

  // Handle trip cancellation logic
  const handleConfirmCancel = () => {
    if (!tripToCancel) return;
    
    const updated = bookings.map((b) => {
      if (b.id === tripToCancel.id) {
        return {
          ...b,
          status: "cancelled" as const,
          updatedAt: new Date().toISOString()
        };
      }
      return b;
    });

    localStorage.setItem("ticketing_bookings", JSON.stringify(updated));
    setBookings(updated);
    setTripToCancel(null);
    setActiveTab("cancelled");
  };

  // Icon switcher helper
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "flights":
        return <Plane size={18} style={{ color: "var(--primary)" }} />;
      case "hotels":
        return <Hotel size={18} style={{ color: "var(--primary)" }} />;
      case "stays":
        return <Home size={18} style={{ color: "var(--primary)" }} />;
      case "cruises":
        return <Compass size={18} style={{ color: "var(--primary)" }} />;
      case "trains":
        return <Train size={18} style={{ color: "var(--primary)" }} />;
      default:
        return <Calendar size={18} style={{ color: "var(--primary)" }} />;
    }
  };

  // Status text helper
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <span className="trip-status-badge confirmed"><CheckCircle size={12} /> Confirmed</span>;
      case "pending":
        return <span className="trip-status-badge pending"><Clock size={12} /> Pending Agent Payment</span>;
      case "cancelled":
        return <span className="trip-status-badge cancelled"><XCircle size={12} /> Cancelled</span>;
      case "completed":
        return <span className="trip-status-badge confirmed" style={{ backgroundColor: "#F3F4F6", color: "#4B5563" }}><CheckCircle size={12} /> Completed</span>;
      default:
        return <span className="trip-status-badge pending">{status}</span>;
    }
  };

  // Clear query parameters
  const clearSuccessQuery = () => {
    setShowSuccessAlert(false);
    // Replace URL path without query params
    window.history.replaceState({}, document.title, window.location.pathname);
  };

  return (
    <div style={{ backgroundColor: "var(--bg)", minHeight: "calc(100vh - 120px)", padding: "32px 0" }}>
      <div className="section-wrap" style={{ padding: "0 24px" }}>
        
        {/* Success Banner */}
        {showSuccessAlert && successRef && (
          <div 
            style={{ 
              backgroundColor: "var(--green-light)", 
              border: "1px solid var(--green-border)", 
              borderRadius: "8px", 
              padding: "20px", 
              marginBottom: "24px",
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: "16px",
              animation: "fadeIn 0.4s ease-out"
            }}
          >
            <div style={{ display: "flex", gap: "12px" }}>
              <div style={{ backgroundColor: "var(--green)", color: "#fff", borderRadius: "50%", padding: "6px", display: "inline-flex" }}>
                <CheckCircle size={20} />
              </div>
              <div>
                <h2 style={{ fontSize: "16px", fontWeight: 800, color: "var(--green)", margin: "0 0 4px" }}>
                  Booking Placed Successfully!
                </h2>
                <p style={{ fontSize: "13px", color: "#166534", margin: "0 0 12px" }}>
                  Your booking request has been logged. Your booking reference number is <strong style={{ textDecoration: "underline" }}>{successRef}</strong>.
                  We have sent a confirmation email to your registered address.
                </p>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  <button 
                    onClick={clearSuccessQuery} 
                    className="btn-sm-green"
                    style={{ padding: "6px 12px" }}
                  >
                    View My Bookings
                  </button>
                  <Link 
                    href="/call-agent" 
                    className="btn-sm-outline"
                    style={{ textDecoration: "none", color: "var(--green)", borderColor: "var(--green-border)", padding: "5px 11px" }}
                  >
                    <Phone size={12} /> Call Agent to Finalize
                  </Link>
                </div>
              </div>
            </div>
            <button 
              onClick={clearSuccessQuery} 
              style={{ background: "none", border: "none", cursor: "pointer", color: "#166534", padding: "4px" }}
            >
              ✕
            </button>
          </div>
        )}

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <h1 style={{ fontSize: "28px", fontWeight: 800, margin: 0 }}>My Trips</h1>
            <p style={{ color: "var(--muted)", margin: "4px 0 0", fontSize: "13px" }}>
              View and manage your upcoming reservations, flight tickets, hotel vouchers, and completed itineraries.
            </p>
          </div>
          
          <Link href="/call-agent" className="btn-outline-green" style={{ textDecoration: "none" }}>
            <Phone size={16} /> Contact Call Center
          </Link>
        </div>

        {/* Tab Controls */}
        <div 
          style={{ 
            display: "flex", 
            borderBottom: "1px solid var(--border)", 
            marginBottom: "24px", 
            gap: "24px" 
          }}
        >
          <button
            onClick={() => setActiveTab("upcoming")}
            style={{
              background: "none",
              border: "none",
              padding: "12px 4px",
              fontWeight: 700,
              fontSize: "14px",
              color: activeTab === "upcoming" ? "var(--primary)" : "var(--muted)",
              borderBottom: activeTab === "upcoming" ? "3px solid var(--primary)" : "3px solid transparent",
              borderRadius: 0,
              cursor: "pointer"
            }}
          >
            Upcoming Trips ({bookings.filter(b => b.status === "confirmed" || b.status === "pending").length})
          </button>
          
          <button
            onClick={() => setActiveTab("completed")}
            style={{
              background: "none",
              border: "none",
              padding: "12px 4px",
              fontWeight: 700,
              fontSize: "14px",
              color: activeTab === "completed" ? "var(--primary)" : "var(--muted)",
              borderBottom: activeTab === "completed" ? "3px solid var(--primary)" : "3px solid transparent",
              borderRadius: 0,
              cursor: "pointer"
            }}
          >
            Past / Completed ({bookings.filter(b => b.status === "completed").length})
          </button>

          <button
            onClick={() => setActiveTab("cancelled")}
            style={{
              background: "none",
              border: "none",
              padding: "12px 4px",
              fontWeight: 700,
              fontSize: "14px",
              color: activeTab === "cancelled" ? "var(--primary)" : "var(--muted)",
              borderBottom: activeTab === "cancelled" ? "3px solid var(--primary)" : "3px solid transparent",
              borderRadius: 0,
              cursor: "pointer"
            }}
          >
            Cancelled ({bookings.filter(b => b.status === "cancelled").length})
          </button>
        </div>

        {/* Trips List */}
        {filteredBookings.length === 0 ? (
          <div 
            style={{ 
              backgroundColor: "var(--card)", 
              border: "1px solid var(--border)", 
              borderRadius: "8px", 
              padding: "64px 32px", 
              textAlign: "center" 
            }}
          >
            <Calendar size={48} style={{ color: "var(--subtle)", margin: "0 auto 16px" }} />
            <h3 style={{ fontSize: "18px", fontWeight: 700, margin: "0 0 8px" }}>No {activeTab} bookings found</h3>
            <p style={{ color: "var(--muted)", margin: "0 0 20px", maxWidth: "400px", marginLeft: "auto", marginRight: "auto" }}>
              {activeTab === "upcoming" 
                ? "You don't have any upcoming trips scheduled. Ready to book your next international getaway?"
                : activeTab === "completed"
                ? "You haven't completed any trips on our website yet."
                : "No cancelled bookings found."
              }
            </p>
            {activeTab === "upcoming" && (
              <Link href="/" className="btn-primary" style={{ textDecoration: "none", display: "inline-block" }}>
                Search Flights & Stays
              </Link>
            )}
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "16px" }}>
            {filteredBookings.map((trip) => (
              <div 
                key={trip.id}
                style={{ 
                  backgroundColor: "var(--card)", 
                  border: "1px solid var(--border)", 
                  borderRadius: "8px", 
                  overflow: "hidden", 
                  boxShadow: "var(--shadow-sm)"
                }}
              >
                {/* Header section of individual card */}
                <div 
                  style={{ 
                    padding: "16px 20px", 
                    backgroundColor: "var(--surface)", 
                    borderBottom: "1px solid var(--border)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "12px"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    {getCategoryIcon(trip.category)}
                    <span style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", color: "var(--muted)" }}>
                      {trip.category} · Ref: <strong style={{ color: "var(--text)" }}>{trip.referenceNumber}</strong>
                    </span>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    {getStatusBadge(trip.status)}
                    <span style={{ fontSize: "12px", color: "var(--muted)" }}>
                      Booked on {new Date(trip.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* Body section of card */}
                <div style={{ padding: "20px", display: "grid", gridTemplateColumns: "1fr 240px", gap: "24px" }} className="booking-layout-detail">
                  {/* Info Column */}
                  <div>
                    <h3 
                      style={{ fontSize: "18px", fontWeight: 800, margin: "0 0 6px" }}
                      dangerouslySetInnerHTML={{ __html: trip.summary.item.title }}
                    />
                    <p 
                      style={{ fontSize: "14px", color: "var(--muted)", margin: "0 0 16px" }}
                      dangerouslySetInnerHTML={{ __html: trip.summary.item.subtitle }}
                    />

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
                      {/* Dates */}
                      <div style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
                        <Calendar size={16} style={{ color: "var(--muted)", marginTop: "2px" }} />
                        <div>
                          <div style={{ fontSize: "11px", color: "var(--muted)", fontWeight: 600 }}>DATES & DURATIONS</div>
                          <div style={{ fontSize: "13px", fontWeight: 600 }}>{trip.summary.item.dates}</div>
                        </div>
                      </div>

                      {/* Travelers */}
                      <div style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
                        <User size={16} style={{ color: "var(--muted)", marginTop: "2px" }} />
                        <div>
                          <div style={{ fontSize: "11px", color: "var(--muted)", fontWeight: 600 }}>PASSENGERS / GUESTS</div>
                          <div style={{ fontSize: "13px", fontWeight: 600 }}>
                            {trip.travelers.map((t) => `${t.title}. ${t.firstName} ${t.lastName}`).join(", ")}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Booking Class / Variant */}
                    {trip.summary.item.variant && (
                      <div style={{ marginTop: "16px", display: "flex", alignItems: "center", gap: "6px" }}>
                        <span style={{ fontSize: "11px", backgroundColor: "var(--primary-light)", color: "var(--primary)", padding: "3px 8px", borderRadius: "4px", fontWeight: 600 }}>
                          {trip.summary.item.variant}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Action Column */}
                  <div style={{ borderLeft: "1px solid var(--border)", paddingLeft: "24px", display: "flex", flexDirection: "column", justifyContent: "space-between" }} className="action-sidebar">
                    
                    <div>
                      <div style={{ fontSize: "11px", color: "var(--muted)", textTransform: "uppercase" }}>Total Paid</div>
                      <div style={{ fontSize: "24px", fontWeight: 800, color: "var(--primary)", margin: "2px 0 12px" }}>
                        {formatPrice(trip.summary.total)}
                      </div>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      <button 
                        onClick={() => setSelectedTripDetails(trip)}
                        className="btn-select"
                        style={{ width: "100%", padding: "8px 12px", fontSize: "12px", border: "1.5px solid var(--primary)", display: "flex", gap: "6px", justifyContent: "center" }}
                      >
                        <FileText size={14} /> View Details & Invoice
                      </button>

                      {trip.status !== "cancelled" && trip.status !== "completed" && (
                        <button 
                          onClick={() => setTripToCancel(trip)}
                          className="btn-sm-outline"
                          style={{ borderColor: "var(--error)", color: "var(--error)", width: "100%", padding: "7px 11px", fontSize: "12px" }}
                        >
                          Cancel Booking
                        </button>
                      )}

                      {trip.status === "completed" && (
                        <button 
                          onClick={() => alert("Thank you for submitting review placeholder!")}
                          className="btn-sm-green"
                          style={{ width: "100%", padding: "8px 11px", fontSize: "12px", display: "flex", gap: "4px", justifyContent: "center" }}
                        >
                          <Star size={12} fill="white" /> Review Destination
                        </button>
                      )}
                    </div>

                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Invoice Modal Details */}
      {selectedTripDetails && (
        <div 
          style={{ 
            position: "fixed", 
            top: 0, 
            left: 0, 
            right: 0, 
            bottom: 0, 
            backgroundColor: "rgba(11, 37, 99, 0.4)", 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center", 
            zIndex: 9999, 
            padding: "20px" 
          }}
        >
          <div 
            style={{ 
              backgroundColor: "var(--card)", 
              borderRadius: "12px", 
              width: "100%", 
              maxWidth: "680px", 
              maxHeight: "90vh", 
              overflowY: "auto", 
              boxShadow: "var(--shadow-xl)", 
              border: "1px solid var(--border)" 
            }}
          >
            {/* Modal Header */}
            <div style={{ padding: "20px 24px", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                {getCategoryIcon(selectedTripDetails.category)}
                <span style={{ fontSize: "16px", fontWeight: 800 }}>Trip Details & Receipt</span>
              </div>
              <button 
                onClick={() => setSelectedTripDetails(null)} 
                style={{ background: "none", border: "none", cursor: "pointer", fontSize: "20px", color: "var(--muted)", fontWeight: 500 }}
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div style={{ padding: "24px" }}>
              {/* Receipt Header Banner */}
              <div style={{ border: "1px dashed var(--primary)", borderRadius: "8px", padding: "16px", backgroundColor: "var(--primary-light)", marginBottom: "20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                  <span style={{ fontSize: "12px", fontWeight: 700, color: "var(--primary)", textTransform: "uppercase" }}>TICKETING INFO TRAVEL RECEIPT</span>
                  <span style={{ fontSize: "12px", fontWeight: 700, color: "var(--text)" }}>Reference ID: {selectedTripDetails.referenceNumber}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px" }}>
                  <span>Status: <strong>{selectedTripDetails.status.toUpperCase()}</strong></span>
                  <span>Payment Method: {selectedTripDetails.paymentMethod === "agent" ? "Agent Assistance" : "Card Ending 4242"}</span>
                </div>
              </div>

              {/* Booking Segment Info */}
              <div style={{ marginBottom: "20px" }}>
                <h3 style={{ fontSize: "14px", fontWeight: 700, marginBottom: "8px" }}>Itinerary Summary</h3>
                <div style={{ border: "1px solid var(--border)", borderRadius: "6px", padding: "16px" }}>
                  <div style={{ fontWeight: 800, fontSize: "15px" }} dangerouslySetInnerHTML={{ __html: selectedTripDetails.summary.item.title }} />
                  <div style={{ color: "var(--muted)", fontSize: "13px", marginTop: "4px" }} dangerouslySetInnerHTML={{ __html: selectedTripDetails.summary.item.subtitle }} />
                  
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginTop: "12px", paddingTop: "12px", borderTop: "1px solid var(--border)", fontSize: "13px" }}>
                    <div>
                      <span style={{ display: "block", color: "var(--muted)", fontSize: "10px", fontWeight: 700 }}>DATES</span>
                      <strong>{selectedTripDetails.summary.item.dates}</strong>
                    </div>
                    {selectedTripDetails.summary.item.variant && (
                      <div>
                        <span style={{ display: "block", color: "var(--muted)", fontSize: "10px", fontWeight: 700 }}>SELECTION / CLASS</span>
                        <strong>{selectedTripDetails.summary.item.variant}</strong>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Passengers details list */}
              <div style={{ marginBottom: "20px" }}>
                <h3 style={{ fontSize: "14px", fontWeight: 700, marginBottom: "8px" }}>Passenger & Guest Information</h3>
                <table style={{ width: "100%", fontSize: "12px", border: "1px solid var(--border)", borderRadius: "6px", overflow: "hidden" }}>
                  <thead>
                    <tr style={{ backgroundColor: "var(--surface)", borderBottom: "1px solid var(--border)" }}>
                      <th style={{ padding: "8px 12px", textAlign: "left", fontWeight: 700 }}>No.</th>
                      <th style={{ padding: "8px 12px", textAlign: "left", fontWeight: 700 }}>Name</th>
                      <th style={{ padding: "8px 12px", textAlign: "left", fontWeight: 700 }}>Type</th>
                      <th style={{ padding: "8px 12px", textAlign: "left", fontWeight: 700 }}>Passport/ID</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedTripDetails.travelers.map((t, i) => (
                      <tr key={i} style={{ borderBottom: i !== selectedTripDetails.travelers.length - 1 ? "1px solid var(--border)" : "none" }}>
                        <td style={{ padding: "8px 12px" }}>{i + 1}</td>
                        <td style={{ padding: "8px 12px" }}><strong>{t.title}. {t.firstName} {t.lastName}</strong></td>
                        <td style={{ padding: "8px 12px", textTransform: "capitalize" }}>{t.type}</td>
                        <td style={{ padding: "8px 12px" }}>{t.passportNumber || "Not Applicable"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pricing breakdown */}
              <div style={{ marginBottom: "20px" }}>
                <h3 style={{ fontSize: "14px", fontWeight: 700, marginBottom: "8px" }}>Receipt & Financial Summary</h3>
                <div style={{ border: "1px solid var(--border)", borderRadius: "6px", padding: "16px", display: "flex", flexDirection: "column", gap: "8px", fontSize: "13px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "var(--muted)" }}>Base Fare ({selectedTripDetails.summary.travelerCount} travelers)</span>
                    <span>{formatPrice(selectedTripDetails.summary.baseFare)}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "var(--muted)" }}>Taxes and Governmental Fees</span>
                    <span>{formatPrice(selectedTripDetails.summary.taxesAndFees)}</span>
                  </div>
                  {selectedTripDetails.summary.serviceCharge && (
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ color: "var(--muted)" }}>Processing & Service Fee</span>
                      <span>{formatPrice(selectedTripDetails.summary.serviceCharge)}</span>
                    </div>
                  )}
                  {selectedTripDetails.summary.discount && (
                    <div style={{ display: "flex", justifyContent: "space-between", color: "var(--green)", fontWeight: 600 }}>
                      <span>Discount Applied</span>
                      <span>{formatPrice(selectedTripDetails.summary.discount)}</span>
                    </div>
                  )}
                  <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid var(--border)", paddingTop: "8px", marginTop: "4px", fontWeight: 800, fontSize: "15px" }}>
                    <span>Total Amount Charged</span>
                    <span style={{ color: "var(--primary)" }}>{formatPrice(selectedTripDetails.summary.total)}</span>
                  </div>
                </div>
              </div>

              {/* Call Agent Notice */}
              <div style={{ display: "flex", gap: "10px", backgroundColor: "#FEF3C7", padding: "12px 16px", borderRadius: "6px", border: "1px solid #F59E0B" }}>
                <Info size={16} style={{ color: "#D97706", marginTop: "2px", flexShrink: 0 }} />
                <p style={{ fontSize: "11px", color: "#B45309", margin: 0 }}>
                  <strong>Need to modify your booking?</strong> Name corrections, date changes, and routing adjustments are managed directly by our travel support experts. 
                  Call us toll-free at <strong>1-800-555-TICKETS</strong>. Refer to reference code <strong>{selectedTripDetails.referenceNumber}</strong>.
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div style={{ padding: "16px 24px", borderTop: "1px solid var(--border)", backgroundColor: "var(--surface)", display: "flex", justifyContent: "flex-end", gap: "12px" }}>
              <button 
                onClick={() => window.print()}
                className="btn-select"
                style={{ padding: "8px 16px" }}
              >
                Print Receipt
              </button>
              <button 
                onClick={() => setSelectedTripDetails(null)}
                className="btn-primary"
                style={{ padding: "8px 16px" }}
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cancellation Confirmation Dialog */}
      {tripToCancel && (
        <div 
          style={{ 
            position: "fixed", 
            top: 0, 
            left: 0, 
            right: 0, 
            bottom: 0, 
            backgroundColor: "rgba(11, 37, 99, 0.4)", 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center", 
            zIndex: 9999, 
            padding: "20px" 
          }}
        >
          <div 
            style={{ 
              backgroundColor: "var(--card)", 
              borderRadius: "12px", 
              width: "100%", 
              maxWidth: "440px", 
              boxShadow: "var(--shadow-xl)", 
              border: "1px solid var(--border)",
              animation: "slideIn 0.3s ease-out" 
            }}
          >
            <div style={{ padding: "20px 24px 12px", display: "flex", gap: "12px", alignItems: "flex-start" }}>
              <div style={{ backgroundColor: "#FEE2E2", color: "var(--error)", borderRadius: "50%", padding: "8px", display: "inline-flex" }}>
                <AlertTriangle size={24} />
              </div>
              <div>
                <h3 style={{ fontSize: "16px", fontWeight: 800, margin: "0 0 6px" }}>Confirm Booking Cancellation</h3>
                <p style={{ fontSize: "13px", color: "var(--muted)", margin: 0 }}>
                  Are you sure you want to cancel your booking for <strong dangerouslySetInnerHTML={{ __html: tripToCancel.summary.item.title }} />? 
                  This action cannot be undone and is subject to standard carrier cancellation penalties.
                </p>
              </div>
            </div>
            
            <div style={{ padding: "16px 24px", borderTop: "1px solid var(--border)", backgroundColor: "var(--surface)", display: "flex", justifyContent: "flex-end", gap: "10px", borderBottomLeftRadius: "12px", borderBottomRightRadius: "12px" }}>
              <button 
                onClick={() => setTripToCancel(null)}
                className="btn-select"
                style={{ padding: "8px 16px", borderColor: "var(--border)", color: "var(--muted)" }}
              >
                Go Back
              </button>
              <button 
                onClick={handleConfirmCancel}
                className="btn-primary"
                style={{ padding: "8px 16px", backgroundColor: "var(--error)" }}
              >
                Yes, Cancel Booking
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default function MyTripsPage() {
  return (
    <Suspense fallback={
      <div className="section-wrap" style={{ padding: "48px 24px", textAlign: "center", backgroundColor: "var(--bg)", minHeight: "100vh" }}>
        <h3 style={{ fontWeight: 700 }}>Loading your trips...</h3>
      </div>
    }>
      <MyTripsContent />
    </Suspense>
  );
}
