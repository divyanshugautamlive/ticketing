"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import type { BookingItem, BookingSummary, TravelerDetails } from "@/types/booking";
import type { Price } from "@/types/common";

interface BookingContextType {
  selectedItem: BookingItem | null;
  travelers: TravelerDetails[];
  pricing: BookingSummary | null;
  selectItemForBooking: (item: BookingItem) => void;
  updateTravelers: (travelersList: TravelerDetails[]) => void;
  calculatePricing: (promoCode?: string, includeInsurance?: boolean) => BookingSummary | null;
  clearBooking: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [selectedItem, setSelectedItem] = useState<BookingItem | null>(null);
  const [travelers, setTravelers] = useState<TravelerDetails[]>([]);
  const [pricing, setPricing] = useState<BookingSummary | null>(null);

  const selectItemForBooking = (item: BookingItem) => {
    setSelectedItem(item);
    
    // Initialize blank traveler entries based on selection quantity / traveler requirements
    const count = item.quantity || 1;
    const initialTravelers: TravelerDetails[] = Array.from({ length: count }, (_, i) => ({
      index: i,
      type: "adult",
      title: "Mr",
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      nationality: "IN"
    }));
    
    setTravelers(initialTravelers);
    
    // Initial pricing calculation
    const baseAmount = item.basePrice.amount * count;
    const taxesAmount = baseAmount * 0.12; // 12% standard taxes/fees
    const serviceAmount = 25; // standard service fee
    const totalAmount = baseAmount + taxesAmount + serviceAmount;
    
    const summary: BookingSummary = {
      item,
      travelerCount: count,
      baseFare: { amount: baseAmount, currency: item.basePrice.currency, display: `$${baseAmount.toFixed(2)}` },
      taxesAndFees: { amount: taxesAmount, currency: item.basePrice.currency, display: `$${taxesAmount.toFixed(2)}` },
      serviceCharge: { amount: serviceAmount, currency: item.basePrice.currency, display: `$${serviceAmount.toFixed(2)}` },
      total: { amount: totalAmount, currency: item.basePrice.currency, display: `$${totalAmount.toFixed(2)}` }
    };
    
    setPricing(summary);
  };

  const updateTravelers = (travelersList: TravelerDetails[]) => {
    setTravelers(travelersList);
  };

  const calculatePricing = (promoCode?: string, includeInsurance?: boolean) => {
    if (!selectedItem) return null;
    
    const count = selectedItem.quantity || 1;
    const baseAmount = selectedItem.basePrice.amount * count;
    const taxesAmount = baseAmount * 0.12;
    const serviceAmount = 25;
    
    let insuranceAmount = 0;
    if (includeInsurance) {
      insuranceAmount = selectedItem.category === "flights" ? 29 * count : 49; // flat rates
    }

    let discountAmount = 0;
    if (promoCode && promoCode.toUpperCase() === "TRAVEL10") {
      discountAmount = baseAmount * 0.1; // 10% discount
    }

    const totalAmount = baseAmount + taxesAmount + serviceAmount + insuranceAmount - discountAmount;
    const currency = selectedItem.basePrice.currency;

    const summary: BookingSummary = {
      item: selectedItem,
      travelerCount: count,
      baseFare: { amount: baseAmount, currency, display: `$${baseAmount.toFixed(2)}` },
      taxesAndFees: { amount: taxesAmount, currency, display: `$${taxesAmount.toFixed(2)}` },
      serviceCharge: { amount: serviceAmount, currency, display: `$${serviceAmount.toFixed(2)}` },
      insurance: includeInsurance ? { amount: insuranceAmount, currency, display: `$${insuranceAmount.toFixed(2)}` } : undefined,
      discount: discountAmount > 0 ? { amount: discountAmount, currency, display: `-$${discountAmount.toFixed(2)}` } : undefined,
      promoCode: discountAmount > 0 ? promoCode : undefined,
      total: { amount: totalAmount, currency, display: `$${totalAmount.toFixed(2)}` }
    };

    setPricing(summary);
    return summary;
  };

  const clearBooking = () => {
    setSelectedItem(null);
    setTravelers([]);
    setPricing(null);
  };

  return (
    <BookingContext.Provider
      value={{
        selectedItem,
        travelers,
        pricing,
        selectItemForBooking,
        updateTravelers,
        calculatePricing,
        clearBooking
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
}
