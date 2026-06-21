import type { ImageData } from "@/types/common";
import { SearchCategory } from "@/types/search";

export interface DestinationItem {
  id: string;
  name: string;
  country: string;
  image: ImageData;
  description: string;
  popularCategories: SearchCategory[];
}

export const mockDestinations: DestinationItem[] = [
  {
    id: "dst-1",
    name: "London",
    country: "United Kingdom",
    image: {
      src: "https://images.unsplash.com/photo-1513635269975-59663e0ca1ad?auto=format&fit=crop&w=600&q=80",
      alt: "London Big Ben"
    },
    description: "Immerse yourself in history, culture, and royal charm in the capital of the UK.",
    popularCategories: [SearchCategory.Flights, SearchCategory.Cars]
  },
  {
    id: "dst-2",
    name: "Dubai",
    country: "United Arab Emirates",
    image: {
      src: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=600&q=80",
      alt: "Dubai Burj Khalifa"
    },
    description: "Experience modern wonders, world-class luxury resorts, and high-end shopping.",
    popularCategories: [SearchCategory.Flights, SearchCategory.Cars, SearchCategory.Stays]
  },
  {
    id: "dst-3",
    name: "Santorini",
    country: "Greece",
    image: {
      src: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=600&q=80",
      alt: "Santorini Oia Caldera"
    },
    description: "Unwind on volcanic beaches, marvel at cave houses, and catch iconic sunsets.",
    popularCategories: [SearchCategory.Flights, SearchCategory.Stays, SearchCategory.Cruises]
  },
  {
    id: "dst-4",
    name: "Singapore",
    country: "Singapore",
    image: {
      src: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=600&q=80",
      alt: "Singapore Marina Bay Sands"
    },
    description: "Explore the futuristic garden city, diverse cultures, and vibrant culinary scene.",
    popularCategories: [SearchCategory.Flights, SearchCategory.Cars, SearchCategory.Cruises]
  },
  {
    id: "dst-5",
    name: "Kyoto",
    country: "Japan",
    image: {
      src: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80",
      alt: "Kyoto Temple"
    },
    description: "Step back in time with thousands of classical Buddhist temples, gardens, and imperial palaces.",
    popularCategories: [SearchCategory.Cars, SearchCategory.Stays]
  },
  {
    id: "dst-6",
    name: "Mumbai",
    country: "India",
    image: {
      src: "https://images.unsplash.com/photo-1562979314-bee7453e911c?auto=format&fit=crop&w=600&q=80",
      alt: "Mumbai Gateway of India"
    },
    description: "Discover the energetic heart of Bollywood, historic architecture, and seaside views.",
    popularCategories: [SearchCategory.Trains, SearchCategory.Flights, SearchCategory.Cars]
  }
];
