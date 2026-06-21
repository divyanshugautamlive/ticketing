"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { SearchCategory, SearchParams, FilterState } from "@/types/search";
import { mockFlights } from "@/data/flights";
import { mockCars } from "@/data/cars";
import { mockStays } from "@/data/stays";
import { mockCruises } from "@/data/cruises";
import { mockTrains } from "@/data/trains";

interface SearchContextType {
  category: SearchCategory;
  setCategory: (category: SearchCategory) => void;
  params: SearchParams;
  setParams: (params: SearchParams) => void;
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
  results: any[];
  allResults: any[]; // unfiltered
  loading: boolean;
  error: string | null;
  executeSearch: (customParams?: SearchParams) => Promise<any[]>;
  resetSearch: () => void;
}

const defaultParams: SearchParams = {
  category: SearchCategory.Flights,
  adults: 1,
  children: 0,
  infants: 0
};

const defaultFilters: FilterState = {};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: ReactNode }) {
  const [category, setCategoryState] = useState<SearchCategory>(SearchCategory.Flights);
  const [params, setParams] = useState<SearchParams>({ ...defaultParams });
  const [filters, setFilters] = useState<FilterState>({ ...defaultFilters });
  const [results, setResults] = useState<any[]>([]);
  const [allResults, setAllResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const setCategory = (cat: SearchCategory) => {
    setCategoryState(cat);
    setParams(prev => ({
      ...prev,
      category: cat,
      // Clear category specific parameters
      tripType: cat === SearchCategory.Flights ? "round_trip" : undefined,
      cabinClass: cat === SearchCategory.Flights ? "economy" : undefined,
      pickupLocation: cat === SearchCategory.Cars ? prev.origin : undefined,
      dropoffLocation: cat === SearchCategory.Cars ? prev.destination : undefined,
      minNights: undefined,
      maxNights: undefined,
      cruiseLine: undefined,
      trainClass: undefined
    }));
    setFilters({ ...defaultFilters });
    setResults([]);
    setAllResults([]);
  };

  const executeSearch = async (customParams?: SearchParams) => {
    const searchParams = customParams || params;
    setLoading(true);
    setError(null);

    return new Promise<any[]>((resolve) => {
      setTimeout(() => {
        let rawData: any[] = [];
        const cat = searchParams.category;

        switch (cat) {
          case SearchCategory.Flights:
            rawData = mockFlights;
            break;
          case SearchCategory.Cars:
            rawData = mockCars;
            break;
          case SearchCategory.Stays:
            rawData = mockStays;
            break;
          case SearchCategory.Cruises:
            rawData = mockCruises;
            break;
          case SearchCategory.Trains:
            rawData = mockTrains;
            break;
          default:
            rawData = [];
        }

        // Apply search parameter filters (e.g. Origin, Destination, Dates)
        let filtered = [...rawData];

        if (searchParams.origin) {
          const originQuery = searchParams.origin.toLowerCase().trim();
          filtered = filtered.filter(item => {
            if (cat === SearchCategory.Flights || cat === SearchCategory.Trains) {
              return (
                item.origin.city.toLowerCase().includes(originQuery) ||
                item.origin.code?.toLowerCase().includes(originQuery)
              );
            }
            if (cat === SearchCategory.Cars) {
              return (
                item.location.city.toLowerCase().includes(originQuery) ||
                item.location.code?.toLowerCase().includes(originQuery)
              );
            }
            if (cat === SearchCategory.Cruises) {
              return item.departurePort.city.toLowerCase().includes(originQuery);
            }
            return true;
          });
        }

        if (searchParams.destination) {
          const destQuery = searchParams.destination.toLowerCase().trim();
          filtered = filtered.filter(item => {
            if (cat === SearchCategory.Flights || cat === SearchCategory.Trains) {
              return (
                item.destination.city.toLowerCase().includes(destQuery) ||
                item.destination.code?.toLowerCase().includes(destQuery)
              );
            }
            if (cat === SearchCategory.Stays || cat === SearchCategory.Cars) {
              return (
                item.location.city.toLowerCase().includes(destQuery) ||
                item.location.country.toLowerCase().includes(destQuery)
              );
            }
            if (cat === SearchCategory.Cruises) {
              return (
                item.route.name.toLowerCase().includes(destQuery) ||
                item.route.ports.some((p: any) => p.location.city.toLowerCase().includes(destQuery))
              );
            }
            return true;
          });
        }

        // Apply Flight cabin class
        if (cat === SearchCategory.Flights && searchParams.cabinClass) {
          filtered = filtered.filter(item => item.cabinClass === searchParams.cabinClass);
        }

        setAllResults(filtered);
        setResults(filtered);
        setLoading(false);
        resolve(filtered);
      }, 800); // Simulated API latency
    });
  };

  // Effect to apply sidebar filters to the allResults set
  useEffect(() => {
    if (allResults.length === 0) return;

    let filtered = [...allResults];

    // Price Filter
    if (filters.priceRange) {
      const [min, max] = filters.priceRange;
      filtered = filtered.filter(item => {
        const price = item.price?.amount || item.pricePerNight?.amount || item.pricePerPerson?.amount || item.pricePerDay?.amount || 0;
        return price >= min && price <= max;
      });
    }

    // Rating Filter
    if (filters.minRating) {
      filtered = filtered.filter(item => {
        const rating = item.rating?.score || 0;
        return rating >= (filters.minRating || 0);
      });
    }

    // Flights-specific Filters
    if (category === SearchCategory.Flights) {
      if (filters.airlines && filters.airlines.length > 0) {
        filtered = filtered.filter(item =>
          item.segments.some((seg: any) => filters.airlines?.includes(seg.airline.name) || filters.airlines?.includes(seg.airline.code))
        );
      }
      if (filters.maxStops !== undefined) {
        filtered = filtered.filter(item => item.stops <= (filters.maxStops ?? 2));
      }
    }

    // Cars-specific Filters
    if (category === SearchCategory.Cars) {
      if (filters.carTypes && filters.carTypes.length > 0) {
        filtered = filtered.filter(item => filters.carTypes?.includes(item.type));
      }
      if (filters.carAgencies && filters.carAgencies.length > 0) {
        filtered = filtered.filter(item => filters.carAgencies?.includes(item.agency));
      }
      if (filters.transmissions && filters.transmissions.length > 0) {
        filtered = filtered.filter(item => filters.transmissions?.includes(item.transmission));
      }
    }

    // Stays-specific Filters
    if (category === SearchCategory.Stays) {
      if (filters.cabinTypes && filters.cabinTypes.length > 0) {
        filtered = filtered.filter(item => filters.cabinTypes?.includes(item.propertyType));
      }
    }

    // Cruises-specific Filters
    if (category === SearchCategory.Cruises) {
      if (filters.keyword) {
        const key = filters.keyword.toLowerCase();
        filtered = filtered.filter(item =>
          item.cruiseLine.toLowerCase().includes(key) ||
          item.shipName.toLowerCase().includes(key)
        );
      }
    }

    // Trains-specific Filters
    if (category === SearchCategory.Trains) {
      if (filters.trainClasses && filters.trainClasses.length > 0) {
        filtered = filtered.filter(item =>
          item.classes.some((c: any) => filters.trainClasses?.includes(c.id) || filters.trainClasses?.includes(c.shortName))
        );
      }
    }

    setResults(filtered);
  }, [filters, allResults, category]);

  const resetSearch = () => {
    setParams({ ...defaultParams });
    setFilters({ ...defaultFilters });
    setResults([]);
    setAllResults([]);
    setError(null);
  };

  return (
    <SearchContext.Provider
      value={{
        category,
        setCategory,
        params,
        setParams,
        filters,
        setFilters,
        results,
        allResults,
        loading,
        error,
        executeSearch,
        resetSearch
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
}
