import type { CruiseDetail } from "@/types";

export const mockCruises: CruiseDetail[] = [
  {
    id: "cr-301",
    name: "7-Night Mediterranean Explorer",
    cruiseLine: "Royal Caribbean",
    shipName: "Symphony of the Seas",
    nights: 7,
    pricePerPerson: { amount: 849, currency: "USD", display: "$849" },
    departureDate: "2026-08-15",
    returnDate: "2026-08-22",
    departurePort: { city: "Barcelona", country: "Spain", code: "BCN", address: "Port of Barcelona" },
    image: {
      src: "https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&w=800&q=80",
      alt: "Symphony of the Seas Cruise"
    },
    rating: { score: 4.75, count: 3200, label: "Exceptional" },
    highlights: ["Perfect Day CocoCay", "Central Park Onboard", "AquaTheater Shows"],
    isFeatured: true,
    description: "Embark on an unforgettable journey across the Mediterranean on the spectacular Symphony of the Seas. Discover historic cities, sun-drenched beaches, and enjoy top-tier onboard amenities including a real Central Park with 20,000 live plants, thrilling water slides, and Broadway-caliber entertainment.",
    route: {
      name: "Western Mediterranean Route",
      seaDays: 1,
      ports: [
        { day: 1, location: { city: "Barcelona", country: "Spain", code: "BCN" }, isTerminal: true, departureTime: "18:00" },
        { day: 2, location: { city: "Palma de Mallorca", country: "Spain" }, isTerminal: false, arrivalTime: "08:00", departureTime: "17:00" },
        { day: 3, location: { city: "Provence (Marseille)", country: "France" }, isTerminal: false, arrivalTime: "09:00", departureTime: "18:00" },
        { day: 4, location: { city: "Florence/Pisa (La Spezia)", country: "Italy" }, isTerminal: false, arrivalTime: "08:30", departureTime: "20:30" },
        { day: 5, location: { city: "Rome (Civitavecchia)", country: "Italy" }, isTerminal: false, arrivalTime: "07:00", departureTime: "19:00" },
        { day: 6, location: { city: "Naples/Capri", country: "Italy" }, isTerminal: false, arrivalTime: "08:00", departureTime: "18:30" },
        { day: 7, location: { city: "At Sea", country: "International" }, isTerminal: false },
        { day: 8, location: { city: "Barcelona", country: "Spain", code: "BCN" }, isTerminal: true, arrivalTime: "06:00" }
      ]
    },
    gallery: [
      { src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80", alt: "Palma Beach" },
      { src: "https://images.unsplash.com/photo-1531572753322-ad063cecc140?auto=format&fit=crop&w=800&q=80", alt: "Rome Colosseum" }
    ],
    shipAmenities: [
      "15-meter Zip Line",
      "Ultimate Abyss 10-Story Slide",
      "FlowRider Surf Simulators",
      "Ice Skating Rink",
      "Outdoor AquaTheater",
      "Vitality Spa & Fitness Center"
    ],
    diningOptions: [
      "Main Dining Room (Complimentary)",
      "Windjammer Marketplace Buffet (Complimentary)",
      "Chops Grille Steakhouse (Specialty)",
      "Jamie's Italian by Jamie Oliver (Specialty)",
      "Izumi Hibachi & Sushi (Specialty)"
    ],
    entertainment: [
      "Hairspray the Broadway Musical",
      "Hiro AquaTheater Acrobatics Show",
      "Live Stand-Up Comedy at The Attic",
      "Live Orchestra and Jazz Club"
    ],
    included: [
      "Shipboard accommodation",
      "Most meals at complimentary dining locations",
      "Onboard entertainment and daily activities",
      "Access to pools, hot tubs, and fitness center",
      "Youth program and kids clubs"
    ],
    notIncluded: [
      "Gratuities ($18.00 per guest per day)",
      "Specialty dining and drinks packages",
      "Shore excursions and tours",
      "Spa treatments and salon services",
      "WiFi internet access"
    ],
    dressCode: "Smart-casual by day. Formal attire (suit/cocktail dress) requested for two theme nights.",
    agePolicy: "Infants must be at least 6 months old at time of boarding. Guests under 21 must travel with an adult.",
    cabins: [
      {
        id: "cb-301-1",
        name: "Interior Cabin",
        description: "Comfortable and cost-effective accommodation featuring two twin beds that convert to a Royal King, desk, and sitting area.",
        pricePerPerson: { amount: 849, currency: "USD", display: "$849" },
        sizeSqFt: 149,
        maxOccupancy: 4,
        deck: "Deck 8, 9, 10",
        isAvailable: true,
        amenities: ["Flat-screen TV", "Mini-safe", "Hairdryer", "24-hour room service"]
      },
      {
        id: "cb-301-2",
        name: "Ocean View Stateroom",
        description: "Enjoy views of the sea from your large picture window. Comfortable sitting area and private bathroom with shower.",
        pricePerPerson: { amount: 1049, currency: "USD", display: "$1,049" },
        sizeSqFt: 179,
        maxOccupancy: 4,
        deck: "Deck 3, 4",
        isAvailable: true,
        amenities: ["Ocean View Window", "Sitting Area", "TV", "Vanity area"]
      },
      {
        id: "cb-301-3",
        name: "Ocean View Balcony Stateroom",
        description: "Open your floor-to-ceiling glass doors to your private balcony and breathe in the fresh sea breeze. Specious living area.",
        pricePerPerson: { amount: 1299, currency: "USD", display: "$1,299" },
        sizeSqFt: 182,
        maxOccupancy: 4,
        deck: "Deck 11, 12, 14",
        isAvailable: true,
        amenities: ["Private Balcony (50 sqft)", "Floor-to-ceiling windows", "Sofabed", "Plush bedding"]
      },
      {
        id: "cb-301-4",
        name: "Grand Suite - 1 Bedroom",
        description: "Experience premium VIP treatment. Features a bedroom area, dining table, living room sofa, marble bath, and huge balcony.",
        pricePerPerson: { amount: 2499, currency: "USD", display: "$2,499" },
        sizeSqFt: 371,
        maxOccupancy: 4,
        deck: "Deck 12",
        isAvailable: true,
        amenities: ["Concierge service", "Private Balcony (105 sqft)", "Tub and Double Vanity", "Pillowtop mattress"]
      }
    ]
  },
  {
    id: "cr-302",
    name: "10-Night Southern Caribbean Escape",
    cruiseLine: "Celebrity Cruises",
    shipName: "Celebrity Edge",
    nights: 10,
    pricePerPerson: { amount: 1299, currency: "USD", display: "$1,299" },
    departureDate: "2026-11-20",
    returnDate: "2026-11-30",
    departurePort: { city: "Fort Lauderdale", country: "United States", code: "FLL", address: "Port Everglades" },
    image: {
      src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80",
      alt: "Celebrity Edge Cruise Ship"
    },
    rating: { score: 4.82, count: 1850, label: "Exceptional" },
    highlights: ["Magic Carpet cantilevered platform", "Rooftop Garden", "Eden lounge and restaurant"],
    isFeatured: false,
    description: "Sail in modern luxury on the award-winning Celebrity Edge. Experience the revolutionary Magic Carpet platform, rising 13 stories above the sea. Explore the pristine white beaches of St. Thomas, the volcanic peaks of St. Lucia, and the Dutch charm of Aruba.",
    route: {
      name: "Southern Caribbean Route",
      seaDays: 4,
      ports: [
        { day: 1, location: { city: "Fort Lauderdale", country: "United States", code: "FLL" }, isTerminal: true, departureTime: "16:00" },
        { day: 2, location: { city: "At Sea", country: "International" }, isTerminal: false },
        { day: 3, location: { city: "At Sea", country: "International" }, isTerminal: false },
        { day: 4, location: { city: "Charlotte Amalie", country: "St. Thomas" }, isTerminal: false, arrivalTime: "08:00", departureTime: "18:00" },
        { day: 5, location: { city: "St. Johns", country: "Antigua" }, isTerminal: false, arrivalTime: "08:00", departureTime: "17:00" },
        { day: 6, location: { city: "Castries", country: "St. Lucia" }, isTerminal: false, arrivalTime: "08:00", departureTime: "18:00" },
        { day: 7, location: { city: "Oranjestad", country: "Aruba" }, isTerminal: false, arrivalTime: "09:00", departureTime: "22:00" },
        { day: 8, location: { city: "At Sea", country: "International" }, isTerminal: false },
        { day: 9, location: { city: "At Sea", country: "International" }, isTerminal: false },
        { day: 10, location: { city: "Fort Lauderdale", country: "United States", code: "FLL" }, isTerminal: true, arrivalTime: "07:00" }
      ]
    },
    gallery: [
      { src: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80", alt: "Caribbean Beach" },
      { src: "https://images.unsplash.com/photo-1589519160732-57fc498494f8?auto=format&fit=crop&w=800&q=80", alt: "Celebrity Suite Lounge" }
    ],
    shipAmenities: [
      "The Magic Carpet Multi-Use Venue",
      "Rooftop Garden and Outdoor Movies",
      "Resort Deck and Solarium",
      "Modern Art Gallery",
      "Premium Casino",
      "The Retreat Private Sundeck"
    ],
    diningOptions: [
      "Tuscan Restaurant (Complimentary)",
      "Normandie Restaurant (Complimentary)",
      "Fine Cut Steakhouse (Specialty)",
      "Le Voyage by Daniel Boulud (Specialty)"
    ],
    entertainment: [
      "The Theatre High-Tech Shows",
      "Eden Performance Art & Music",
      "The Club Evening Cabaret & Dancing"
    ],
    included: [
      "Cruise accommodation in selected cabin category",
      "All meals at complimentary restaurants",
      "Basic drinks (water, tea, coffee, select juices)",
      "Classic Drinks Package & Basic WiFi (Retreat bookings only)"
    ],
    notIncluded: [
      "Shore excursions",
      "Spa and retail purchases",
      "Specialty dining surcharges",
      "Recommended onboard gratuities"
    ],
    dressCode: "Smart-casual by day. 'Evening Chic' (sport coat/collared shirt for men, elegant dress/pantsuit for women) on select nights.",
    agePolicy: "Minimum boarding age is 6 months. Minimum age for drinking or gambling is 21.",
    cabins: [
      {
        id: "cb-302-1",
        name: "Inside Stateroom",
        description: "Staterooms designed for maximum relaxation with elegant fixtures, premium bedding, and smart TV.",
        pricePerPerson: { amount: 1299, currency: "USD", display: "$1,299" },
        sizeSqFt: 181,
        maxOccupancy: 2,
        deck: "Deck 6, 7",
        isAvailable: true,
        amenities: ["Smart TV", "Premium Linens", "Safe", "Mini-bar"]
      },
      {
        id: "cb-302-2",
        name: "Edge Stateroom with Infinite Veranda",
        description: "Revolutionary stateroom design that transforms your entire room into a veranda with the touch of a button.",
        pricePerPerson: { amount: 1699, currency: "USD", display: "$1,699" },
        sizeSqFt: 243,
        maxOccupancy: 4,
        deck: "Deck 8, 9",
        isAvailable: true,
        amenities: ["Infinite Veranda (integral glass balcony)", "Touchscreen room controls", "Larger bathroom"]
      },
      {
        id: "cb-302-3",
        name: "Celebrity Suite",
        description: "Luxurious suite featuring floor-to-ceiling windows, private veranda, separate living and dining area, and Retreat lounge access.",
        pricePerPerson: { amount: 3999, currency: "USD", display: "$3,999" },
        sizeSqFt: 460,
        maxOccupancy: 4,
        deck: "Deck 11, 12",
        isAvailable: true,
        amenities: ["Retreat Lounge Access", "Butler service", "Private Veranda (50 sqft)", "Split bath with tub"]
      }
    ]
  }
];
