"use client";

import React, { useState, useEffect, use } from "react";
import { useSearch } from "@/context/SearchContext";
import { mockTrains as rawMockTrains } from "@/data/trains";
import TrainCard from "@/components/results/TrainCard";
import SortBar from "@/components/results/SortBar";
import FilterSidebar from "@/components/results/FilterSidebar";
import SearchCard from "@/components/search/SearchCard";
import { SearchCategory } from "@/types/search";
import { Loader2 } from "lucide-react";

interface TrainsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default function TrainsPage({ searchParams }: TrainsPageProps) {
  const resolvedSearchParams = use(searchParams);
  const { setCategory, filters, executeSearch } = useSearch();
  
  const [trains, setTrains] = useState(rawMockTrains);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState("price_asc");

  // Force Train Category
  useEffect(() => {
    setCategory(SearchCategory.Trains);
    setLoading(true);
    setTimeout(() => {
      // Apply initial query filters
      const origin = resolvedSearchParams.origin as string;
      const dest = resolvedSearchParams.destination as string;

      let filtered = [...rawMockTrains];
      if (origin) {
        filtered = filtered.filter(t => t.origin.city.toLowerCase().includes(origin.toLowerCase()) || t.origin.code?.toLowerCase() === origin.toLowerCase());
      }
      if (dest) {
        filtered = filtered.filter(t => t.destination.city.toLowerCase().includes(dest.toLowerCase()) || t.destination.code?.toLowerCase() === dest.toLowerCase());
      }

      setTrains(filtered);
      setLoading(false);
    }, 600);
  }, [resolvedSearchParams, setCategory, setLoading, setTrains]);

  // Apply Sidebar Filters
  const getFilteredTrains = () => {
    let filtered = [...trains];

    // Price Filter
    if (filters.priceRange) {
      const [min, max] = filters.priceRange;
      filtered = filtered.filter(t => t.startingPrice.amount >= min && t.startingPrice.amount <= max);
    }

    // Class Filter
    if (filters.trainClasses && filters.trainClasses.length > 0) {
      filtered = filtered.filter(t =>
        t.classes.some(c => filters.trainClasses?.includes(c.id) || filters.trainClasses?.includes(c.shortName))
      );
    }

    // Sort
    if (sortBy === "price_asc") {
      filtered.sort((a, b) => a.startingPrice.amount - b.startingPrice.amount);
    } else if (sortBy === "price_desc") {
      filtered.sort((a, b) => b.startingPrice.amount - a.startingPrice.amount);
    } else if (sortBy === "duration_asc") {
      filtered.sort((a, b) => a.durationMinutes - b.durationMinutes);
    }

    return filtered;
  };

  const displayTrains = getFilteredTrains();

  return (
    <div style={{ backgroundColor: "var(--bg)", minHeight: "calc(100vh - 120px)" }}>
      {/* Search Header Bar */}
      <div style={{ backgroundColor: "var(--card)", padding: "16px 0", borderBottom: "1px solid var(--border)" }}>
        <div className="section-wrap" style={{ padding: "0 24px" }}>
          <SearchCard />
        </div>
      </div>

      {/* Results Layout */}
      <div className="section-wrap" style={{ padding: "24px" }}>
        <div className="results-layout" style={{ display: "flex", gap: "24px" }}>
          
          {/* Left Column: Filters */}
          <div className="filter-col" style={{ width: "272px", flexShrink: 0 }}>
            <FilterSidebar />
          </div>

          {/* Right Column: Trains List */}
          <div className="results-col" style={{ flex: 1 }}>
            
            {/* Sort Bar */}
            <SortBar
              sortBy={sortBy}
              onSortChange={setSortBy}
              resultCount={displayTrains.length}
            />

            {/* List */}
            {loading ? (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "300px", gap: "12px" }}>
                <Loader2 className="animate-spin" size={36} style={{ color: "var(--primary)" }} />
                <span style={{ fontSize: "14px", color: "var(--muted)", fontWeight: 500 }}>Searching live train tables...</span>
              </div>
            ) : displayTrains.length > 0 ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {displayTrains.map((train) => (
                  <TrainCard key={train.id} train={train} />
                ))}
              </div>
            ) : (
              <div style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px", padding: "48px 24px", textAlign: "center" }}>
                <div style={{ fontSize: "36px", marginBottom: "12px" }}>🚂</div>
                <h3 style={{ margin: "0 0 8px", fontWeight: 700 }}>No Trains Found</h3>
                <p style={{ margin: 0, color: "var(--muted)", fontSize: "14px" }}>
                  Try adjusting your class or price filters, or search for different stations.
                </p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
