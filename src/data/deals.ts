import type { Price, ImageData } from "@/types/common";
import { SearchCategory } from "@/types/search";

export interface DealItem {
  id: string;
  category: SearchCategory;
  title: string;
  description: string;
  price: Price;
  image: ImageData;
  badge?: string;
  itemId: string;
}

export const mockDeals: DealItem[] = [
  {
    id: "dl-1",
    category: SearchCategory.Flights,
    title: "Fly to London Heathrow",
    description: "Fly from New Delhi on Air India. Direct flight, limited seats.",
    price: { amount: 699, currency: "USD", display: "$699" },
    image: {
      src: "https://images.unsplash.com/photo-1513635269975-59663e0ca1ad?auto=format&fit=crop&w=800&q=80",
      alt: "London Big Ben"
    },
    badge: "Bestseller",
    itemId: "fl-101"
  },
  {
    id: "dl-2",
    category: SearchCategory.Cars,
    title: "Tesla Model 3 Electric Rental",
    description: "Eco-friendly premium sedan rental at LAX Airport. Save $10/day this week.",
    price: { amount: 55, currency: "USD", display: "$55/day", originalAmount: 65, originalDisplay: "$65" },
    image: {
      src: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80",
      alt: "Tesla Model 3"
    },
    badge: "Special Offer",
    itemId: "car-103"
  },
  {
    id: "dl-3",
    category: SearchCategory.Cruises,
    title: "Western Mediterranean Cruise",
    description: "7 Nights on Royal Caribbean. Sail from Barcelona to Rome, Naples & French Coast.",
    price: { amount: 849, currency: "USD", display: "$849/person" },
    image: {
      src: "https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&w=800&q=80",
      alt: "Mediterranean Cruise"
    },
    badge: "Popular",
    itemId: "cr-301"
  },
  {
    id: "dl-4",
    category: SearchCategory.Stays,
    title: "Santorini Cave Villa",
    description: "Cliffside traditional cave house in Oia. Private cliff-edge hot tub.",
    price: { amount: 289, currency: "USD", display: "$289/night" },
    image: {
      src: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80",
      alt: "Santorini Villa"
    },
    badge: "Superhost",
    itemId: "st-201"
  },
  {
    id: "dl-5",
    category: SearchCategory.Flights,
    title: "Fly Qatar Airways to London",
    description: "1 Stopover in Doha. Award-winning service and premium dining.",
    price: { amount: 499, currency: "USD", display: "$499", originalAmount: 580, originalDisplay: "$580" },
    image: {
      src: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80",
      alt: "Airplane Wing"
    },
    badge: "Special Deal",
    itemId: "fl-102"
  },
  {
    id: "dl-6",
    category: SearchCategory.Cars,
    title: "Ford Mustang Convertible Rental",
    description: "Cruising Miami beach with the top down! Save 15% on weekly rentals.",
    price: { amount: 79, currency: "USD", display: "$79/day", originalAmount: 95, originalDisplay: "$95" },
    image: {
      src: "https://images.unsplash.com/photo-1610647752706-3bb12232b3ab?auto=format&fit=crop&w=800&q=80",
      alt: "Ford Mustang Convertible"
    },
    badge: "15% OFF",
    itemId: "car-106"
  },
  {
    id: "dl-7",
    category: SearchCategory.Stays,
    title: "Acropolis View Penthouse",
    description: "Modern penthouse in Plaka, Athens. Direct Parthenon views from deck.",
    price: { amount: 149, currency: "USD", display: "$149/night" },
    image: {
      src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
      alt: "Penthouse Balcony"
    },
    badge: "Parthenon View",
    itemId: "st-202"
  },
  {
    id: "dl-8",
    category: SearchCategory.Trains,
    title: "Mumbai Rajdhani AC Express",
    description: "Fast track train from New Delhi to Mumbai Central. Meals included.",
    price: { amount: 28, currency: "USD", display: "$28" },
    image: {
      src: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=800&q=80",
      alt: "Train Track Sunset"
    },
    badge: "Superfast",
    itemId: "tr-401"
  }
];
