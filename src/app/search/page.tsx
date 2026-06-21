"use client";

import React, { useEffect, useState, use } from "react";
import { useSearch } from "@/context/SearchContext";
import { SearchCategory, SearchParams } from "@/types/search";
import FilterSidebar from "@/components/results/FilterSidebar";
import SortBar from "@/components/results/SortBar";
import FlightCard from "@/components/results/FlightCard";
import CarCard from "@/components/results/CarCard";
import StayCard from "@/components/results/StayCard";
import CruiseCard from "@/components/results/CruiseCard";
import SearchCard from "@/components/search/SearchCard";
import { Loader2 } from "lucide-react";

interface SearchPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  const resolvedSearchParams = use(searchParams);
  const { category, setCategory, results, loading, executeSearch } = useSearch();
  const [sortBy, setSortBy] = useState("price_asc");

  // Sync route query parameters with context on load
  useEffect(() => {
    const queryCat = resolvedSearchParams.category as SearchCategory;
    const dest = resolvedSearchParams.destination as string;

    if (queryCat && Object.values(SearchCategory).includes(queryCat)) {
      setCategory(queryCat);
      
      const searchParams: SearchParams = {
        category: queryCat,
        destination: dest || undefined,
        adults: 1,
        children: 0,
        infants: 0
      };
      executeSearch(searchParams);
    } else {
      // Execute default search on mount if results are empty
      executeSearch();
    }
  }, [resolvedSearchParams, setCategory, executeSearch]);

  // Sort logic
  const getSortedResults = () => {
    const sorted = [...results];
    if (sortBy === "price_asc") {
      sorted.sort((a, b) => {
        const pa = a.price?.amount ?? a.pricePerNight?.amount ?? a.pricePerPerson?.amount ?? a.startingPrice?.amount ?? 0;
        const pb = b.price?.amount ?? b.pricePerNight?.amount ?? b.pricePerPerson?.amount ?? b.startingPrice?.amount ?? 0;
        return pa - pb;
      });
    } else if (sortBy === "price_desc") {
      sorted.sort((a, b) => {
        const pa = a.price?.amount ?? a.pricePerNight?.amount ?? a.pricePerPerson?.amount ?? a.startingPrice?.amount ?? 0;
        const pb = b.price?.amount ?? b.pricePerNight?.amount ?? b.pricePerPerson?.amount ?? b.startingPrice?.amount ?? 0;
        return pb - pa;
      });
    } else if (sortBy === "rating_desc") {
      sorted.sort((a, b) => {
        const ra = a.rating?.score ?? 0;
        const rb = b.rating?.score ?? 0;
        return rb - ra;
      });
    } else if (sortBy === "duration_asc") {
      sorted.sort((a, b) => {
        const da = a.totalDuration ?? a.durationMinutes ?? a.nights ?? 0;
        const db = b.totalDuration ?? b.durationMinutes ?? b.nights ?? 0;
        return da - db;
      });
    }
    return sorted;
  };

  const sortedResults = getSortedResults();

  return (
    <div style={{ backgroundColor: "var(--bg)", minHeight: "calc(100vh - 120px)" }}>
      {/* Search Header Form bar */}
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

          {/* Right Column: Cards List */}
          <div className="results-col" style={{ flex: 1 }}>
            
            {/* Sort Bar */}
            <SortBar
              sortBy={sortBy}
              onSortChange={setSortBy}
              resultCount={sortedResults.length}
            />

            {/* List */}
            {loading ? (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "300px", gap: "12px" }}>
                <Loader2 className="animate-spin" size={36} style={{ color: "var(--primary)" }} />
                <span style={{ fontSize: "14px", color: "var(--muted)", fontWeight: 500 }}>Searching live travel inventory...</span>
              </div>
            ) : sortedResults.length > 0 ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {sortedResults.map((item) => {
                  switch (category) {
                    case SearchCategory.Flights:
                      return <FlightCard key={item.id} flight={item} />;
                    case SearchCategory.Cars:
                      return <CarCard key={item.id} car={item} />;
                    case SearchCategory.Stays:
                      return <StayCard key={item.id} stay={item} />;
                    case SearchCategory.Cruises:
                      return <CruiseCard key={item.id} cruise={item} />;
                    default:
                      return null;
                  }
                })}
              </div>
            ) : (
              <div style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px", padding: "48px 24px", textAlign: "center" }}>
                <div style={{ fontSize: "36px", marginBottom: "12px" }}>🔍</div>
                <h3 style={{ margin: "0 0 8px", fontWeight: 700 }}>No Travel Results Found</h3>
                <p style={{ margin: 0, color: "var(--muted)", fontSize: "14px" }}>
                  Try adjusting your filter options, expanding your price range, or searching for a different destination.
                </p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
