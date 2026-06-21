"use client";

import React, { useEffect, useState } from "react";
import { useSearch } from "@/context/SearchContext";
import { SearchCategory } from "@/types/search";
import { Star, RotateCcw } from "lucide-react";

export default function FilterSidebar() {
  const { category, filters, setFilters } = useSearch();

  // Local state for price range
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);

  // Initialize prices based on category
  useEffect(() => {
    let max = 1000;
    if (category === SearchCategory.Flights) max = 3000;
    if (category === SearchCategory.Cars) max = 250;
    if (category === SearchCategory.Stays) max = 1000;
    if (category === SearchCategory.Cruises) max = 4000;
    if (category === SearchCategory.Trains) max = 100;

    setMinPrice(0);
    setMaxPrice(max);
    setFilters(prev => ({ ...prev, priceRange: [0, max] }));
  }, [category, setFilters]);

  const handlePriceChange = (min: number, max: number) => {
    setMinPrice(min);
    setMaxPrice(max);
    setFilters({ ...filters, priceRange: [min, max] });
  };

  const handleRatingChange = (rating: number) => {
    setFilters({ ...filters, minRating: rating === filters.minRating ? undefined : rating });
  };

  // Checkbox handlers
  const handleCheckboxChange = (field: "airlines" | "cabinTypes" | "trainClasses" | "carTypes" | "carAgencies" | "transmissions", value: string) => {
    const current = (filters[field] as string[]) || [];
    const updated = current.includes(value)
      ? current.filter(x => x !== value)
      : [...current, value];

    setFilters({ ...filters, [field]: updated });
  };

  const handleStopsChange = (stops: number) => {
    setFilters({ ...filters, maxStops: stops === filters.maxStops ? undefined : stops });
  };

  const handleReset = () => {
    let max = 1000;
    if (category === SearchCategory.Flights) max = 3000;
    if (category === SearchCategory.Cars) max = 250;
    if (category === SearchCategory.Stays) max = 1000;
    if (category === SearchCategory.Cruises) max = 4000;
    if (category === SearchCategory.Trains) max = 100;

    setMinPrice(0);
    setMaxPrice(max);
    setFilters({
      priceRange: [0, max],
      airlines: [],
      maxStops: undefined,
      minRating: undefined,
      cabinTypes: [],
      trainClasses: [],
      carTypes: [],
      carAgencies: [],
      transmissions: [],
      keyword: undefined
    });
  };

  return (
    <div className="filter-sidebar">
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", borderBottom: "1px solid var(--border)", paddingBottom: "12px" }}>
        <h3 style={{ margin: 0, fontWeight: 700, fontSize: "16px" }}>Filter Results</h3>
        <button
          onClick={handleReset}
          style={{
            background: "transparent",
            border: "none",
            fontSize: "11px",
            color: "var(--primary)",
            fontWeight: 600,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "4px"
          }}
        >
          <RotateCcw size={10} />
          Reset All
        </button>
      </div>

      {/* 1. Price Range Filter */}
      <div style={{ marginBottom: "24px" }}>
        <h4 style={{ fontSize: "12px", textTransform: "uppercase", color: "var(--muted)", marginBottom: "12px", letterSpacing: "0.5px" }}>
          Price Range (USD)
        </h4>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <input
            type="number"
            value={minPrice}
            onChange={(e) => handlePriceChange(Number(e.target.value), maxPrice)}
            style={{
              width: "100%",
              padding: "6px 8px",
              fontSize: "13px",
              border: "1px solid var(--border)",
              borderRadius: "4px"
            }}
            placeholder="Min"
          />
          <span style={{ color: "var(--muted)" }}>to</span>
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => handlePriceChange(minPrice, Number(e.target.value))}
            style={{
              width: "100%",
              padding: "6px 8px",
              fontSize: "13px",
              border: "1px solid var(--border)",
              borderRadius: "4px"
            }}
            placeholder="Max"
          />
        </div>
      </div>

      {/* 2. Rating Filter (Stays, Cars, Cruises) */}
      {(category === SearchCategory.Stays || category === SearchCategory.Cars || category === SearchCategory.Cruises) && (
        <div style={{ marginBottom: "24px" }}>
          <h4 style={{ fontSize: "12px", textTransform: "uppercase", color: "var(--muted)", marginBottom: "12px", letterSpacing: "0.5px" }}>
            Guest Rating
          </h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {[4.5, 4.0, 3.5].map((val) => {
              const active = filters.minRating === val;
              return (
                <button
                  key={val}
                  type="button"
                  onClick={() => handleRatingChange(val)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    background: "transparent",
                    border: "none",
                    color: active ? "var(--primary)" : "var(--text)",
                    fontSize: "13px",
                    fontWeight: active ? 700 : 500,
                    cursor: "pointer",
                    textAlign: "left",
                    padding: "2px 0"
                  }}
                >
                  <Star size={14} fill={val >= 4 ? "var(--warn)" : "none"} stroke="var(--warn)" />
                  <span>{val.toFixed(1)}+ &bull; {val === 4.5 ? "Exceptional" : val === 4.0 ? "Very Good" : "Good"}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 3. Flights-specific filters */}
      {category === SearchCategory.Flights && (
        <>
          {/* Stops */}
          <div style={{ marginBottom: "24px" }}>
            <h4 style={{ fontSize: "12px", textTransform: "uppercase", color: "var(--muted)", marginBottom: "12px", letterSpacing: "0.5px" }}>
              Stops
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={filters.maxStops === 0}
                  onChange={() => handleStopsChange(0)}
                  style={{ cursor: "pointer" }}
                />
                <span>Non-stop</span>
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={filters.maxStops === 1}
                  onChange={() => handleStopsChange(1)}
                  style={{ cursor: "pointer" }}
                />
                <span>1 Stop max</span>
              </label>
            </div>
          </div>

          {/* Airlines */}
          <div style={{ marginBottom: "24px" }}>
            <h4 style={{ fontSize: "12px", textTransform: "uppercase", color: "var(--muted)", marginBottom: "12px", letterSpacing: "0.5px" }}>
              Airlines
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {["Air India", "Qatar Airways", "British Airways", "Emirates", "Turkish Airlines"].map((airline) => (
                <label key={airline} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    checked={filters.airlines?.includes(airline) || false}
                    onChange={() => handleCheckboxChange("airlines", airline)}
                    style={{ cursor: "pointer" }}
                  />
                  <span>{airline}</span>
                </label>
              ))}
            </div>
          </div>
        </>
      )}

      {/* 4. Cars-specific filters */}
      {category === SearchCategory.Cars && (
        <>
          {/* Transmission Type */}
          <div style={{ marginBottom: "24px" }}>
            <h4 style={{ fontSize: "12px", textTransform: "uppercase", color: "var(--muted)", marginBottom: "12px", letterSpacing: "0.5px" }}>
              Transmission
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {["automatic", "manual"].map((trans) => (
                <label key={trans} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", cursor: "pointer", textTransform: "capitalize" }}>
                  <input
                    type="checkbox"
                    checked={filters.transmissions?.includes(trans) || false}
                    onChange={() => handleCheckboxChange("transmissions", trans)}
                    style={{ cursor: "pointer" }}
                  />
                  <span>{trans}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Car Type */}
          <div style={{ marginBottom: "24px" }}>
            <h4 style={{ fontSize: "12px", textTransform: "uppercase", color: "var(--muted)", marginBottom: "12px", letterSpacing: "0.5px" }}>
              Car Class
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {["economy", "compact", "suv", "luxury", "electric"].map((type) => (
                <label key={type} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", cursor: "pointer", textTransform: "capitalize" }}>
                  <input
                    type="checkbox"
                    checked={filters.carTypes?.includes(type) || false}
                    onChange={() => handleCheckboxChange("carTypes", type)}
                    style={{ cursor: "pointer" }}
                  />
                  <span>{type}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Rental Agency */}
          <div style={{ marginBottom: "24px" }}>
            <h4 style={{ fontSize: "12px", textTransform: "uppercase", color: "var(--muted)", marginBottom: "12px", letterSpacing: "0.5px" }}>
              Rental Agency
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {["Hertz", "Enterprise", "Avis", "Budget", "Alamo"].map((agency) => (
                <label key={agency} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    checked={filters.carAgencies?.includes(agency) || false}
                    onChange={() => handleCheckboxChange("carAgencies", agency)}
                    style={{ cursor: "pointer" }}
                  />
                  <span>{agency}</span>
                </label>
              ))}
            </div>
          </div>
        </>
      )}

      {/* 5. Stays-specific filters */}
      {category === SearchCategory.Stays && (
        <div style={{ marginBottom: "24px" }}>
          <h4 style={{ fontSize: "12px", textTransform: "uppercase", color: "var(--muted)", marginBottom: "12px", letterSpacing: "0.5px" }}>
            Property Type
          </h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {["villa", "apartment", "cabin", "cottage", "penthouse"].map((type) => (
              <label key={type} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", cursor: "pointer", textTransform: "capitalize" }}>
                <input
                  type="checkbox"
                  checked={filters.cabinTypes?.includes(type) || false}
                  onChange={() => handleCheckboxChange("cabinTypes", type)}
                  style={{ cursor: "pointer" }}
                />
                <span>{type}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* 6. Trains-specific filters */}
      {category === SearchCategory.Trains && (
        <div style={{ marginBottom: "24px" }}>
          <h4 style={{ fontSize: "12px", textTransform: "uppercase", color: "var(--muted)", marginBottom: "12px", letterSpacing: "0.5px" }}>
            Class Tiers
          </h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {["1A", "2A", "3A", "SL"].map((cls) => (
              <label key={cls} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={filters.trainClasses?.includes(cls) || false}
                  onChange={() => handleCheckboxChange("trainClasses", cls)}
                  style={{ cursor: "pointer" }}
                />
                <span>{cls === "1A" ? "First AC (1A)" : cls === "2A" ? "Second AC (2A)" : cls === "3A" ? "Third AC (3A)" : "Sleeper Class (SL)"}</span>
              </label>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
