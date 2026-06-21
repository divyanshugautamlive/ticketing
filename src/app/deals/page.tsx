"use client";

import React, { useState } from "react";
import Link from "next/navigation";
import { mockDeals, DealItem } from "@/data/deals";
import { SearchCategory } from "@/types/search";
import { Plane, Car, Home, Compass, Train, Tag, Percent, ArrowRight } from "lucide-react";
import { formatPrice } from "@/utils/format";

export default function DealsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredDeals = selectedCategory === "all" 
    ? mockDeals 
    : mockDeals.filter(deal => deal.category === selectedCategory);

  const getCategoryIcon = (category: SearchCategory) => {
    switch (category) {
      case SearchCategory.Flights:
        return <Plane size={14} />;
      case SearchCategory.Cars:
        return <Car size={14} />;
      case SearchCategory.Stays:
        return <Home size={14} />;
      case SearchCategory.Cruises:
        return <Compass size={14} />;
      case SearchCategory.Trains:
        return <Train size={14} />;
      default:
        return <Tag size={14} />;
    }
  };

  const getCategoryLabel = (category: SearchCategory) => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  return (
    <div style={{ backgroundColor: "var(--bg)", minHeight: "calc(100vh - 120px)", padding: "40px 0" }}>
      <div className="section-wrap" style={{ padding: "0 24px" }}>
        
        {/* Header Banner */}
        <div 
          style={{ 
            background: "linear-gradient(135deg, var(--nav) 0%, var(--primary-mid) 100%)", 
            borderRadius: "16px", 
            padding: "48px 32px", 
            color: "#fff",
            marginBottom: "36px",
            boxShadow: "var(--shadow-lg)",
            position: "relative",
            overflow: "hidden"
          }}
        >
          <div style={{ position: "relative", zIndex: 2, maxWidth: "600px" }}>
            <span style={{ fontSize: "11px", backgroundColor: "var(--green)", color: "#fff", padding: "4px 12px", borderRadius: "20px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", display: "inline-flex", alignItems: "center", gap: "4px", marginBottom: "16px" }}>
              <Percent size={12} /> Special Promotions
            </span>
            <h1 style={{ fontSize: "36px", fontWeight: 800, margin: "0 0 12px", color: "#fff" }}>Exclusive Travel Deals</h1>
            <p style={{ fontSize: "15px", color: "#93C5FD", margin: 0, lineHeight: 1.5 }}>
              Handpicked travel promotions, seasonal flight discounts, luxury resort packages, and train offers. Save big by booking today.
            </p>
          </div>
          <div 
            style={{ 
              position: "absolute", 
              right: "-10%", 
              bottom: "-30%", 
              width: "400px", 
              height: "400px", 
              borderRadius: "50%", 
              background: "rgba(255, 255, 255, 0.05)",
              zIndex: 1 
            }}
          />
        </div>

        {/* Filter Pills */}
        <div 
          style={{ 
            display: "flex", 
            gap: "10px", 
            marginBottom: "32px", 
            overflowX: "auto", 
            paddingBottom: "8px" 
          }}
        >
          <button
            onClick={() => setSelectedCategory("all")}
            className={`btn-select ${selectedCategory === "all" ? "active" : ""}`}
            style={{ display: "flex", alignItems: "center", gap: "6px" }}
          >
            All Promotions
          </button>
          
          {Object.values(SearchCategory).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`btn-select ${selectedCategory === cat ? "active" : ""}`}
              style={{ display: "flex", alignItems: "center", gap: "6px" }}
            >
              {getCategoryIcon(cat)}
              {getCategoryLabel(cat)}
            </button>
          ))}
        </div>

        {/* Deals Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "24px" }}>
          {filteredDeals.map((deal) => (
            <div 
              key={deal.id} 
              className="card"
              style={{ 
                display: "flex", 
                flexDirection: "column", 
                height: "100%", 
                backgroundColor: "var(--card)" 
              }}
            >
              {/* Image & Badge container */}
              <div style={{ position: "relative", height: "180px", overflow: "hidden" }}>
                <img 
                  src={deal.image.src} 
                  alt={deal.image.alt} 
                  style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform var(--transition-slow)" }} 
                  className="deal-image"
                />
                
                {deal.badge && (
                  <span 
                    style={{ 
                      position: "absolute", 
                      top: "12px", 
                      left: "12px", 
                      backgroundColor: "var(--primary)", 
                      color: "#fff", 
                      padding: "4px 12px", 
                      borderRadius: "6px", 
                      fontSize: "11px", 
                      fontWeight: 700, 
                      textTransform: "uppercase" 
                    }}
                  >
                    {deal.badge}
                  </span>
                )}

                <span 
                  style={{ 
                    position: "absolute", 
                    bottom: "12px", 
                    right: "12px", 
                    backgroundColor: "rgba(11, 37, 99, 0.85)", 
                    color: "#fff", 
                    padding: "3px 8px", 
                    borderRadius: "4px", 
                    fontSize: "10px", 
                    fontWeight: 700,
                    textTransform: "uppercase",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px"
                  }}
                >
                  {getCategoryIcon(deal.category)}
                  {getCategoryLabel(deal.category)}
                </span>
              </div>

              {/* Card Body */}
              <div style={{ padding: "20px", display: "flex", flexDirection: "column", flexGrow: 1 }}>
                <h3 style={{ fontSize: "16px", fontWeight: 800, margin: "0 0 8px", minHeight: "38px" }}>
                  {deal.title}
                </h3>
                <p style={{ fontSize: "13px", color: "var(--muted)", margin: "0 0 20px", lineHeight: 1.45, flexGrow: 1 }}>
                  {deal.description}
                </p>

                {/* Price and CTA footer */}
                <div 
                  style={{ 
                    borderTop: "1px solid var(--border)", 
                    paddingTop: "16px", 
                    display: "flex", 
                    justifyContent: "space-between", 
                    alignItems: "center" 
                  }}
                >
                  <div>
                    {deal.price.originalAmount && (
                      <span style={{ fontSize: "12px", color: "var(--subtle)", textDecoration: "line-through", display: "block" }}>
                        {deal.price.originalDisplay}
                      </span>
                    )}
                    <span style={{ fontSize: "18px", fontWeight: 800, color: "var(--primary)" }}>
                      {deal.price.display}
                    </span>
                  </div>

                  <a 
                    href={`/${deal.category}/${deal.itemId}`} 
                    className="btn-select"
                    style={{ 
                      padding: "8px 16px", 
                      display: "inline-flex", 
                      alignItems: "center", 
                      gap: "6px",
                      textDecoration: "none" 
                    }}
                  >
                    View Deal <ArrowRight size={14} />
                  </a>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
