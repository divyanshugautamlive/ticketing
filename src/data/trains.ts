import type { TrainDetail } from "@/types";

export const mockTrains: TrainDetail[] = [
  {
    id: "tr-401",
    name: "Mumbai Rajdhani Express",
    trainNumber: "12952",
    origin: { city: "New Delhi", country: "India", code: "NDLS", address: "New Delhi Railway Station" },
    destination: { city: "Mumbai", country: "India", code: "MMCT", address: "Mumbai Central Railway Station" },
    departureTime: "16:55",
    arrivalTime: "08:35",
    durationMinutes: 940, // 15h 40m
    runsOn: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    trainType: "Rajdhani",
    hasPantry: true,
    distanceKm: 1386,
    avgSpeedKmh: 88,
    startingPrice: { amount: 28, currency: "USD", display: "$28" },
    classes: [
      { id: "1A", name: "AC First Class", shortName: "1A", price: { amount: 55, currency: "USD", display: "$55" }, available: 12, isAvailable: true },
      { id: "2A", name: "AC Two Tier", shortName: "2A", price: { amount: 38, currency: "USD", display: "$38" }, available: 42, isAvailable: true },
      { id: "3A", name: "AC Three Tier", shortName: "3A", price: { amount: 28, currency: "USD", display: "$28" }, available: 84, isAvailable: true }
    ],
    intermediateStops: [
      { station: { city: "Kota Junction", country: "India", code: "KOTA" }, arrivalTime: "21:40", departureTime: "21:50", day: 1, distanceKm: 465, haltMinutes: 10 },
      { station: { city: "Ratlam Junction", country: "India", code: "RTM" }, arrivalTime: "01:13", departureTime: "01:15", day: 2, distanceKm: 731, haltMinutes: 2 },
      { station: { city: "Vadodara Junction", country: "India", code: "BRC" }, arrivalTime: "04:40", departureTime: "04:48", day: 2, distanceKm: 1123, haltMinutes: 8 },
      { station: { city: "Surat", country: "India", code: "ST" }, arrivalTime: "06:17", departureTime: "06:20", day: 2, distanceKm: 1253, haltMinutes: 3 }
    ],
    coachComposition: ["EOG (Generator)", "A1-A5 (2A)", "B1-B11 (3A)", "H1 (1A)", "PC (Pantry Car)"]
  },
  {
    id: "tr-402",
    name: "August Kranti Rajdhani",
    trainNumber: "12954",
    origin: { city: "New Delhi", country: "India", code: "NZM", address: "Hazrat Nizamuddin Railway Station" },
    destination: { city: "Mumbai", country: "India", code: "MMCT", address: "Mumbai Central Railway Station" },
    departureTime: "17:15",
    arrivalTime: "09:45",
    durationMinutes: 990, // 16h 30m
    runsOn: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    trainType: "Rajdhani",
    hasPantry: true,
    distanceKm: 1377,
    avgSpeedKmh: 83,
    startingPrice: { amount: 26, currency: "USD", display: "$26" },
    classes: [
      { id: "1A", name: "AC First Class", shortName: "1A", price: { amount: 53, currency: "USD", display: "$53" }, available: 4, isAvailable: true },
      { id: "2A", name: "AC Two Tier", shortName: "2A", price: { amount: 36, currency: "USD", display: "$36" }, available: 18, isAvailable: true },
      { id: "3A", name: "AC Three Tier", shortName: "3A", price: { amount: 26, currency: "USD", display: "$26" }, available: 35, isAvailable: true }
    ],
    intermediateStops: [
      { station: { city: "Mathura Junction", country: "India", code: "MTJ" }, arrivalTime: "18:53", departureTime: "18:55", day: 1, distanceKm: 134, haltMinutes: 2 },
      { station: { city: "Kota Junction", country: "India", code: "KOTA" }, arrivalTime: "22:30", departureTime: "22:40", day: 1, distanceKm: 458, haltMinutes: 10 },
      { station: { city: "Ratlam Junction", country: "India", code: "RTM" }, arrivalTime: "02:15", departureTime: "02:17", day: 2, distanceKm: 724, haltMinutes: 2 },
      { station: { city: "Vadodara Junction", country: "India", code: "BRC" }, arrivalTime: "05:45", departureTime: "05:55", day: 2, distanceKm: 1116, haltMinutes: 10 }
    ]
  },
  {
    id: "tr-403",
    name: "Golden Temple Mail",
    trainNumber: "12904",
    origin: { city: "New Delhi", country: "India", code: "NZM" },
    destination: { city: "Mumbai", country: "India", code: "MMCT" },
    departureTime: "07:20",
    arrivalTime: "05:05",
    durationMinutes: 1305, // 21h 45m
    runsOn: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    trainType: "Mail",
    hasPantry: true,
    distanceKm: 1377,
    startingPrice: { amount: 9, currency: "USD", display: "$9" },
    classes: [
      { id: "1A", name: "AC First Class", shortName: "1A", price: { amount: 48, currency: "USD", display: "$48" }, available: 2, isAvailable: true },
      { id: "2A", name: "AC Two Tier", shortName: "2A", price: { amount: 32, currency: "USD", display: "$32" }, available: 11, isAvailable: true },
      { id: "3A", name: "AC Three Tier", shortName: "3A", price: { amount: 22, currency: "USD", display: "$22" }, available: 0, isAvailable: false },
      { id: "SL", name: "Sleeper Class", shortName: "SL", price: { amount: 9, currency: "USD", display: "$9" }, available: 15, isAvailable: true }
    ],
    intermediateStops: [
      { station: { city: "Mathura Junction", country: "India", code: "MTJ" }, arrivalTime: "09:15", departureTime: "09:20", day: 1, distanceKm: 134, haltMinutes: 5 }
    ]
  },
  {
    id: "tr-404",
    name: "Paschim Express",
    trainNumber: "12926",
    origin: { city: "New Delhi", country: "India", code: "NDLS" },
    destination: { city: "Mumbai", country: "India", code: "BDTS", address: "Bandra Terminus" },
    departureTime: "16:35",
    arrivalTime: "14:55",
    durationMinutes: 1340, // 22h 20m
    runsOn: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    trainType: "Superfast",
    hasPantry: true,
    distanceKm: 1379,
    startingPrice: { amount: 10, currency: "USD", display: "$10" },
    classes: [
      { id: "2A", name: "AC Two Tier", shortName: "2A", price: { amount: 34, currency: "USD", display: "$34" }, available: 8, isAvailable: true },
      { id: "3A", name: "AC Three Tier", shortName: "3A", price: { amount: 24, currency: "USD", display: "$24" }, available: 14, isAvailable: true },
      { id: "SL", name: "Sleeper Class", shortName: "SL", price: { amount: 10, currency: "USD", display: "$10" }, available: 112, isAvailable: true }
    ],
    intermediateStops: [
      { station: { city: "Subzi Mandi", country: "India", code: "SZM" }, arrivalTime: "16:50", departureTime: "16:52", day: 1, distanceKm: 4, haltMinutes: 2 }
    ]
  },
  {
    id: "tr-405",
    name: "Mangala Lakshadweep Express",
    trainNumber: "12618",
    origin: { city: "New Delhi", country: "India", code: "NZM" },
    destination: { city: "Mumbai", country: "India", code: "PNVL", address: "Panvel Railway Station" },
    departureTime: "05:40",
    arrivalTime: "05:30",
    durationMinutes: 1430, // 23h 50m
    runsOn: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    trainType: "Express",
    hasPantry: true,
    distanceKm: 1510,
    startingPrice: { amount: 10, currency: "USD", display: "$10" },
    classes: [
      { id: "2A", name: "AC Two Tier", shortName: "2A", price: { amount: 35, currency: "USD", display: "$35" }, available: 5, isAvailable: true },
      { id: "3A", name: "AC Three Tier", shortName: "3A", price: { amount: 25, currency: "USD", display: "$25" }, available: 18, isAvailable: true },
      { id: "SL", name: "Sleeper Class", shortName: "SL", price: { amount: 10, currency: "USD", display: "$10" }, available: 45, isAvailable: true }
    ],
    intermediateStops: [
      { station: { city: "Agra Cantt", country: "India", code: "AGC" }, arrivalTime: "08:10", departureTime: "08:15", day: 1, distanceKm: 188, haltMinutes: 5 }
    ]
  },
  {
    id: "tr-406",
    name: "Mumbai Garib Rath",
    trainNumber: "12910",
    origin: { city: "New Delhi", country: "India", code: "NZM" },
    destination: { city: "Mumbai", country: "India", code: "BDTS" },
    departureTime: "15:55",
    arrivalTime: "08:10",
    durationMinutes: 975, // 16h 15m
    runsOn: ["Wed", "Fri", "Sun"],
    trainType: "Express",
    hasPantry: false,
    distanceKm: 1366,
    startingPrice: { amount: 18, currency: "USD", display: "$18" },
    classes: [
      { id: "3A", name: "AC Three Tier", shortName: "3A", price: { amount: 18, currency: "USD", display: "$18" }, available: 120, isAvailable: true }
    ],
    intermediateStops: [
      { station: { city: "Kota Junction", country: "India", code: "KOTA" }, arrivalTime: "20:45", departureTime: "20:55", day: 1, distanceKm: 458, haltMinutes: 10 }
    ]
  }
];
