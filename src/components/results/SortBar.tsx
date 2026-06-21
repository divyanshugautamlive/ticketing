"use client";

import React from "react";

interface SortBarProps {
  sortBy: string;
  onSortChange: (value: string) => void;
  resultCount: number;
}

export default function SortBar({ sortBy, onSortChange, resultCount }: SortBarProps) {
  const options = [
    { value: "price_asc", label: "Cheapest" },
    { value: "price_desc", label: "Most Expensive" },
    { value: "rating_desc", label: "Highest Rated" },
    { value: "duration_asc", label: "Fastest" }
  ];

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "var(--card)",
        border: "1px solid var(--border)",
        borderRadius: "8px",
        padding: "10px 16px",
        marginBottom: "16px",
        flexWrap: "wrap",
        gap: "12px"
      }}
    >
      <div style={{ fontSize: "14px", fontWeight: 600, color: "var(--text)" }}>
        {resultCount} Result{resultCount !== 1 ? "s" : ""} Found
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <span style={{ fontSize: "12px", color: "var(--muted)", fontWeight: 500 }}>Sort by:</span>
        <div style={{ display: "flex", gap: "6px" }}>
          {options.map((opt) => {
            const active = sortBy === opt.value;
            return (
              <button
                key={opt.value}
                onClick={() => onSortChange(opt.value)}
                style={{
                  padding: "6px 12px",
                  fontSize: "12px",
                  fontWeight: 600,
                  border: active ? "1.5px solid var(--primary)" : "1.5px solid var(--border)",
                  borderRadius: "20px",
                  backgroundColor: active ? "var(--primary-light)" : "var(--card)",
                  color: active ? "var(--primary)" : "var(--muted)",
                  cursor: "pointer",
                  transition: "all var(--transition-fast)"
                }}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
