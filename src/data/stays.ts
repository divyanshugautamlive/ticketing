import type { StayDetail } from "@/types";

export const mockStays: StayDetail[] = [
  {
    id: "st-201",
    name: "Santorini Cliffside Caldera Villa",
    location: {
      city: "Oia, Santorini",
      country: "Greece",
      address: "Oia Caldera Edge",
      lat: 36.4618,
      lng: 25.3753
    },
    rating: { score: 4.95, count: 188, label: "Exceptional" },
    pricePerNight: { amount: 289, currency: "USD", display: "$289" },
    image: {
      src: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80",
      alt: "Santorini Villa View"
    },
    gallery: [
      { src: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80", alt: "Santorini Caldera View" },
      { src: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=800&q=80", alt: "Villa Bedroom" }
    ],
    propertyType: "villa",
    bedrooms: 2,
    bathrooms: 2,
    maxGuests: 4,
    highlights: ["Infinity Pool", "Ocean View", "Cave Architecture"],
    isSuperhost: true,
    instantBook: true,
    description: "Perched on the cliffs of Oia, this traditional cave villa offers unobstructed views of the volcanic caldera and the famous Santorini sunset. Completely renovated with modern luxury amenities, it features a private cliff-edge hot tub, a fully equipped kitchen, and daily housekeeping.",
    amenities: ["Private Pool", "Hot Tub", "Ocean View", "Kitchen", "WiFi", "Air Conditioning", "Housekeeping", "Espresso Machine"],
    houseRules: [
      "Check-in after 3:00 PM",
      "Check-out before 11:00 AM",
      "No parties or events",
      "Quiet hours 10:00 PM - 8:00 AM"
    ],
    checkInTime: "3:00 PM",
    checkOutTime: "11:00 AM",
    cancellationPolicy: "Free cancellation up to 5 days before check-in",
    host: {
      name: "Dimitris",
      avatar: { src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80", alt: "Dimitris" },
      responseRate: "100%",
      responseTime: "Within an hour",
      isSuperhost: true,
      joinedDate: "June 2018"
    },
    cleaningFee: { amount: 50, currency: "USD", display: "$50" },
    serviceFee: { amount: 35, currency: "USD", display: "$35" },
    minNights: 2
  },
  {
    id: "st-202",
    name: "Luxury Penthouse with Acropolis Views",
    location: {
      city: "Athens",
      country: "Greece",
      address: "Plaka, Athens",
      lat: 37.9715,
      lng: 23.7269
    },
    rating: { score: 4.88, count: 342, label: "Exceptional" },
    pricePerNight: { amount: 149, currency: "USD", display: "$149" },
    image: {
      src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
      alt: "Acropolis Penthouse View"
    },
    gallery: [
      { src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80", alt: "Penthouse Balcony" },
      { src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80", alt: "Penthouse Living Room" }
    ],
    propertyType: "penthouse",
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    highlights: ["Acropolis View", "Large Balcony", "Walkable Location"],
    isSuperhost: true,
    instantBook: false,
    description: "Located in the heart of Plaka, Athens' oldest neighborhood, this penthouse apartment offers unmatched, direct views of the Parthenon from the living room and the massive private terrace. Steps away from the Acropolis Museum and major archaeological sites.",
    amenities: ["Acropolis View", "Terrace", "WiFi", "Air Conditioning", "Washer", "Elevator", "Kitchen"],
    houseRules: [
      "Check-in after 2:00 PM",
      "Check-out before 12:00 PM",
      "Strictly no smoking inside",
      "No pets allowed"
    ],
    checkInTime: "2:00 PM",
    checkOutTime: "12:00 PM",
    cancellationPolicy: "Free cancellation up to 48 hours before check-in",
    host: {
      name: "Eleni",
      avatar: { src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80", alt: "Eleni" },
      responseRate: "99%",
      responseTime: "Within a few hours",
      isSuperhost: true,
      joinedDate: "April 2017"
    },
    cleaningFee: { amount: 30, currency: "USD", display: "$30" },
    serviceFee: { amount: 20, currency: "USD", display: "$20" },
    minNights: 1
  },
  {
    id: "st-203",
    name: "Modern Glass Forest Cabin",
    location: {
      city: "Kyoto",
      country: "Japan",
      address: "Kurama Forest, Kyoto Outskirts",
      lat: 35.1158,
      lng: 135.7725
    },
    rating: { score: 4.91, count: 96, label: "Exceptional" },
    pricePerNight: { amount: 219, currency: "USD", display: "$219" },
    image: {
      src: "https://images.unsplash.com/photo-1508333706533-1ab43ecb1606?auto=format&fit=crop&w=800&q=80",
      alt: "Forest Cabin Exterior"
    },
    gallery: [
      { src: "https://images.unsplash.com/photo-1542718610-a1d656d1884c?auto=format&fit=crop&w=800&q=80", alt: "Cabin Living Room" },
      { src: "https://images.unsplash.com/photo-1488462237308-ecaa28b729d7?auto=format&fit=crop&w=800&q=80", alt: "Cabin Forest View" }
    ],
    propertyType: "cabin",
    bedrooms: 1,
    bathrooms: 1.5,
    maxGuests: 3,
    highlights: ["Hot Spring Onsen", "Forest Views", "Glass Walls"],
    isSuperhost: false,
    instantBook: true,
    description: "Escape the city to Kurama Forest, located north of Kyoto. This architecturally designed glass cabin blends seamlessly into the surrounding cedar trees. Experience natural tranquility with a private cypress wood outdoor soaking tub (onsen), heated tatami mats, and modern minimal interiors.",
    amenities: ["Outdoor Onsen", "Forest View", "WiFi", "Heated Floors", "Kitchenette", "Coffee Station", "Bicycles Provided"],
    houseRules: [
      "Check-in after 4:00 PM",
      "Check-out before 10:00 AM",
      "Take off shoes at the entrance",
      "No fire or open flame"
    ],
    checkInTime: "4:00 PM",
    checkOutTime: "10:00 AM",
    cancellationPolicy: "Non-refundable booking",
    host: {
      name: "Kenji",
      avatar: { src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80", alt: "Kenji" },
      responseRate: "100%",
      responseTime: "Within 30 minutes",
      isSuperhost: false,
      joinedDate: "January 2021"
    },
    cleaningFee: { amount: 45, currency: "USD", display: "$45" },
    serviceFee: { amount: 25, currency: "USD", display: "$25" },
    minNights: 2
  },
  {
    id: "st-204",
    name: "Cozy Beachfront Cottage",
    location: {
      city: "Malibu, California",
      country: "United States",
      address: "Pacific Coast Highway, Malibu",
      lat: 34.0259,
      lng: -118.7798
    },
    rating: { score: 4.82, count: 215, label: "Excellent" },
    pricePerNight: { amount: 329, currency: "USD", display: "$329" },
    image: {
      src: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=800&q=80",
      alt: "Malibu Beachfront Cottage"
    },
    gallery: [
      { src: "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?auto=format&fit=crop&w=800&q=80", alt: "Cottage Deck" },
      { src: "https://images.unsplash.com/photo-1502005229762-fc1b2b812ca5?auto=format&fit=crop&w=800&q=80", alt: "Cottage Bedroom" }
    ],
    propertyType: "cottage",
    bedrooms: 2,
    bathrooms: 1,
    maxGuests: 4,
    highlights: ["Direct Beach Access", "Sunset Terrace", "Surfing Equipment"],
    isSuperhost: true,
    instantBook: true,
    description: "Located right on the sandy beaches of Malibu, this historic beachfront cottage is the perfect California getaway. Watch dolphins swim by from your private oceanfront deck, fall asleep to the sound of breaking waves, and walk directly down to the surf.",
    amenities: ["Oceanfront Deck", "Beach Access", "Surfboards", "WiFi", "BBQ Grill", "Washer & Dryer", "Cable TV", "Parking Space"],
    houseRules: [
      "Check-in after 3:00 PM",
      "Check-out before 11:00 AM",
      "Respect the neighbors' privacy",
      "Wash off sand before entering"
    ],
    checkInTime: "3:00 PM",
    checkOutTime: "11:00 AM",
    cancellationPolicy: "Free cancellation up to 14 days before check-in",
    host: {
      name: "Sarah & Mike",
      avatar: { src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80", alt: "Sarah" },
      responseRate: "100%",
      responseTime: "Within an hour",
      isSuperhost: true,
      joinedDate: "October 2015"
    },
    cleaningFee: { amount: 60, currency: "USD", display: "$60" },
    serviceFee: { amount: 40, currency: "USD", display: "$40" },
    minNights: 3
  }
];
