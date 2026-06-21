import type { FlightResult, FlightDetail } from "@/types";

export const mockFlights: FlightDetail[] = [
  {
    id: "fl-101",
    origin: { city: "New Delhi", country: "India", code: "DEL", address: "Indira Gandhi International Airport" },
    destination: { city: "London", country: "United Kingdom", code: "LHR", address: "Heathrow Airport" },
    price: { amount: 699, currency: "USD", display: "$699" },
    totalDuration: 550, // 9h 10m
    stops: 0,
    cabinClass: "economy",
    seatsLeft: 8,
    isFeatured: true,
    baggageIncluded: "1 Cabin bag, 2 Checked bags (23kg each)",
    isRefundable: true,
    segments: [
      {
        id: "fl-101-s1",
        airline: { name: "Air India", code: "AI" },
        flightNumber: "AI 111",
        departure: { city: "New Delhi", country: "India", code: "DEL" },
        arrival: { city: "London", country: "United Kingdom", code: "LHR" },
        departureTime: "2026-07-10T13:15:00Z",
        arrivalTime: "2026-07-10T18:55:00Z",
        durationMinutes: 550,
        aircraft: "Boeing 787-8 Dreamliner",
        cabinClass: "economy",
        baggage: "2 Checked bags (23kg each)"
      }
    ],
    amenities: ["In-flight meals", "Personal screen", "USB power outlet", "WiFi (paid)"],
    fareRules: ["Changeable for a fee of $150", "Refundable with $200 cancellation penalty"],
    cancellationPolicy: "Cancel up to 24 hours before departure for a partial refund. No refunds for no-shows."
  },
  {
    id: "fl-102",
    origin: { city: "New Delhi", country: "India", code: "DEL" },
    destination: { city: "London", country: "United Kingdom", code: "LHR" },
    price: { amount: 499, currency: "USD", display: "$499", originalAmount: 580, originalDisplay: "$580" },
    totalDuration: 745, // 12h 25m
    stops: 1,
    stopoverCities: ["Doha"],
    cabinClass: "economy",
    seatsLeft: 5,
    isFeatured: false,
    baggageIncluded: "1 Cabin bag, 1 Checked bag (25kg)",
    isRefundable: false,
    segments: [
      {
        id: "fl-102-s1",
        airline: { name: "Qatar Airways", code: "QR" },
        flightNumber: "QR 571",
        departure: { city: "New Delhi", country: "India", code: "DEL" },
        arrival: { city: "Doha", country: "Qatar", code: "DOH" },
        departureTime: "2026-07-10T03:20:00Z",
        arrivalTime: "2026-07-10T05:05:00Z",
        durationMinutes: 255,
        aircraft: "Boeing 777-300ER",
        cabinClass: "economy",
        baggage: "1 Checked bag (25kg)"
      },
      {
        id: "fl-102-s2",
        airline: { name: "Qatar Airways", code: "QR" },
        flightNumber: "QR 003",
        departure: { city: "Doha", country: "Qatar", code: "DOH" },
        arrival: { city: "London", country: "United Kingdom", code: "LHR" },
        departureTime: "2026-07-10T07:45:00Z",
        arrivalTime: "2026-07-10T12:15:00Z",
        durationMinutes: 420,
        aircraft: "Airbus A380-800",
        cabinClass: "economy",
        baggage: "1 Checked bag (25kg)"
      }
    ],
    amenities: ["Premium Dining", "Award-winning Entertainment", "USB Port", "Onboard WiFi"],
    fareRules: ["Non-refundable", "Changes permitted for $250 plus fare difference"],
    cancellationPolicy: "Tickets are non-refundable. Name changes are not permitted."
  },
  {
    id: "fl-103",
    origin: { city: "New Delhi", country: "India", code: "DEL" },
    destination: { city: "London", country: "United Kingdom", code: "LHR" },
    price: { amount: 849, currency: "USD", display: "$849" },
    totalDuration: 560, // 9h 20m
    stops: 0,
    cabinClass: "economy",
    seatsLeft: 12,
    isFeatured: false,
    baggageIncluded: "1 Cabin bag, 2 Checked bags (23kg each)",
    isRefundable: true,
    segments: [
      {
        id: "fl-103-s1",
        airline: { name: "British Airways", code: "BA" },
        flightNumber: "BA 256",
        departure: { city: "New Delhi", country: "India", code: "DEL" },
        arrival: { city: "London", country: "United Kingdom", code: "LHR" },
        departureTime: "2026-07-10T10:20:00Z",
        arrivalTime: "2026-07-10T16:10:00Z",
        durationMinutes: 560,
        aircraft: "Boeing 777-200",
        cabinClass: "economy",
        baggage: "2 Checked bags (23kg each)"
      }
    ],
    amenities: ["Complimentary bar service", "In-flight entertainment", "USB Power"],
    fareRules: ["Changes allowed for $100", "Refundable with $150 cancellation charge"],
    cancellationPolicy: "Free cancellation within 24 hours of booking. Cancellations thereafter incur fees."
  },
  {
    id: "fl-104",
    origin: { city: "New Delhi", country: "India", code: "DEL" },
    destination: { city: "London", country: "United Kingdom", code: "LHR" },
    price: { amount: 539, currency: "USD", display: "$539" },
    totalDuration: 790, // 13h 10m
    stops: 1,
    stopoverCities: ["Dubai"],
    cabinClass: "economy",
    seatsLeft: 3,
    isFeatured: true,
    baggageIncluded: "1 Cabin bag, 1 Checked bag (30kg)",
    isRefundable: false,
    segments: [
      {
        id: "fl-104-s1",
        airline: { name: "Emirates", code: "EK" },
        flightNumber: "EK 511",
        departure: { city: "New Delhi", country: "India", code: "DEL" },
        arrival: { city: "Dubai", country: "United Arab Emirates", code: "DXB" },
        departureTime: "2026-07-10T10:45:00Z",
        arrivalTime: "2026-07-10T13:00:00Z",
        durationMinutes: 225,
        aircraft: "Boeing 777-300ER",
        cabinClass: "economy",
        baggage: "1 Checked bag (30kg)"
      },
      {
        id: "fl-104-s2",
        airline: { name: "Emirates", code: "EK" },
        flightNumber: "EK 005",
        departure: { city: "Dubai", country: "United Arab Emirates", code: "DXB" },
        arrival: { city: "London", country: "United Kingdom", code: "LHR" },
        departureTime: "2026-07-10T16:15:00Z",
        arrivalTime: "2026-07-10T20:25:00Z",
        durationMinutes: 460,
        aircraft: "Airbus A380-800",
        cabinClass: "economy",
        baggage: "1 Checked bag (30kg)"
      }
    ],
    amenities: ["Award-winning ice system", "Onboard WiFi", "Seat power outlet", "Multi-course meal"],
    fareRules: ["Date changes allowed for $120", "Non-refundable"],
    cancellationPolicy: "Tickets are non-refundable. Retain ticket value as credit for future travel."
  },
  {
    id: "fl-105",
    origin: { city: "New Delhi", country: "India", code: "DEL" },
    destination: { city: "London", country: "United Kingdom", code: "LHR" },
    price: { amount: 1899, currency: "USD", display: "$1,899" },
    totalDuration: 550, // 9h 10m
    stops: 0,
    cabinClass: "business",
    seatsLeft: 4,
    isFeatured: true,
    baggageIncluded: "2 Cabin bags, 2 Checked bags (32kg each)",
    isRefundable: true,
    segments: [
      {
        id: "fl-105-s1",
        airline: { name: "Air India", code: "AI" },
        flightNumber: "AI 111",
        departure: { city: "New Delhi", country: "India", code: "DEL" },
        arrival: { city: "London", country: "United Kingdom", code: "LHR" },
        departureTime: "2026-07-10T13:15:00Z",
        arrivalTime: "2026-07-10T18:55:00Z",
        durationMinutes: 550,
        aircraft: "Boeing 787-8 Dreamliner",
        cabinClass: "business",
        baggage: "2 Checked bags (32kg each)"
      }
    ],
    amenities: ["Flat bed seats", "Lounge Access", "Gourmet Dining", "Fast track security"],
    fareRules: ["Free changes", "Fully refundable"],
    cancellationPolicy: "Cancel anytime before departure for a full refund."
  },
  {
    id: "fl-106",
    origin: { city: "New Delhi", country: "India", code: "DEL" },
    destination: { city: "London", country: "United Kingdom", code: "LHR" },
    price: { amount: 2249, currency: "USD", display: "$2,249" },
    totalDuration: 745, // 12h 25m
    stops: 1,
    stopoverCities: ["Doha"],
    cabinClass: "business",
    seatsLeft: 2,
    isFeatured: false,
    baggageIncluded: "2 Cabin bags, 2 Checked bags (32kg each)",
    isRefundable: true,
    segments: [
      {
        id: "fl-106-s1",
        airline: { name: "Qatar Airways", code: "QR" },
        flightNumber: "QR 571",
        departure: { city: "New Delhi", country: "India", code: "DEL" },
        arrival: { city: "Doha", country: "Qatar", code: "DOH" },
        departureTime: "2026-07-10T03:20:00Z",
        arrivalTime: "2026-07-10T05:05:00Z",
        durationMinutes: 255,
        aircraft: "Boeing 777-300ER",
        cabinClass: "business",
        baggage: "2 Checked bags (32kg each)"
      },
      {
        id: "fl-106-s2",
        airline: { name: "Qatar Airways", code: "QR" },
        flightNumber: "QR 003",
        departure: { city: "Doha", country: "Qatar", code: "DOH" },
        arrival: { city: "London", country: "United Kingdom", code: "LHR" },
        departureTime: "2026-07-10T07:45:00Z",
        arrivalTime: "2026-07-10T12:15:00Z",
        durationMinutes: 420,
        aircraft: "Airbus A380-800",
        cabinClass: "business",
        baggage: "2 Checked bags (32kg each)"
      }
    ],
    amenities: ["Qsuite Private Space", "Al Mourjan Lounge", "On-demand Dining", "Luxury Amenity Kit"],
    fareRules: ["Changes allowed with no fees", "Refundable with $100 penalty"],
    cancellationPolicy: "Cancel up to 3 hours before flight. No-show results in forfeit of refund."
  },
  {
    id: "fl-107",
    origin: { city: "New Delhi", country: "India", code: "DEL" },
    destination: { city: "London", country: "United Kingdom", code: "LHR" },
    price: { amount: 3899, currency: "USD", display: "$3,899" },
    totalDuration: 560, // 9h 20m
    stops: 0,
    cabinClass: "first",
    seatsLeft: 2,
    isFeatured: false,
    baggageIncluded: "3 Checked bags (32kg each)",
    isRefundable: true,
    segments: [
      {
        id: "fl-107-s1",
        airline: { name: "British Airways", code: "BA" },
        flightNumber: "BA 256",
        departure: { city: "New Delhi", country: "India", code: "DEL" },
        arrival: { city: "London", country: "United Kingdom", code: "LHR" },
        departureTime: "2026-07-10T10:20:00Z",
        arrivalTime: "2026-07-10T16:10:00Z",
        durationMinutes: 560,
        aircraft: "Boeing 777-200",
        cabinClass: "first",
        baggage: "3 Checked bags (32kg each)"
      }
    ],
    amenities: ["Private Suite", "First Class Lounge", "Laurent-Perrier Champagne", "Turndown service"],
    fareRules: ["Fully flexible", "Fully refundable"],
    cancellationPolicy: "Fully refundable and changeable up to flight time."
  },
  {
    id: "fl-108",
    origin: { city: "New Delhi", country: "India", code: "DEL" },
    destination: { city: "London", country: "United Kingdom", code: "LHR" },
    price: { amount: 489, currency: "USD", display: "$489", originalAmount: 550, originalDisplay: "$550" },
    totalDuration: 810, // 13h 30m
    stops: 1,
    stopoverCities: ["Istanbul"],
    cabinClass: "economy",
    seatsLeft: 6,
    isFeatured: false,
    baggageIncluded: "1 Cabin bag, 1 Checked bag (20kg)",
    isRefundable: false,
    segments: [
      {
        id: "fl-108-s1",
        airline: { name: "Turkish Airlines", code: "TK" },
        flightNumber: "TK 717",
        departure: { city: "New Delhi", country: "India", code: "DEL" },
        arrival: { city: "Istanbul", country: "Turkey", code: "IST" },
        departureTime: "2026-07-10T06:15:00Z",
        arrivalTime: "2026-07-10T10:25:00Z",
        durationMinutes: 400,
        aircraft: "Airbus A330-300",
        cabinClass: "economy",
        baggage: "1 Checked bag (20kg)"
      },
      {
        id: "fl-108-s2",
        airline: { name: "Turkish Airlines", code: "TK" },
        flightNumber: "TK 1985",
        departure: { city: "Istanbul", country: "Turkey", code: "IST" },
        arrival: { city: "London", country: "United Kingdom", code: "LHR" },
        departureTime: "2026-07-10T13:00:00Z",
        arrivalTime: "2026-07-10T15:15:00Z",
        durationMinutes: 255,
        aircraft: "Boeing 737 MAX 8",
        cabinClass: "economy",
        baggage: "1 Checked bag (20kg)"
      }
    ],
    amenities: ["Hot meals", "Seatback entertainment", "Amenity kit"],
    fareRules: ["Changes allowed for a fee of $150", "Non-refundable"],
    cancellationPolicy: "Tickets are non-refundable. Cancellations result in complete loss of fare."
  }
];
