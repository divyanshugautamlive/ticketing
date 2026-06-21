import type { CarDetail } from "@/types/car";

export const mockCars: CarDetail[] = [
  {
    id: "car-101",
    name: "Chevrolet Spark",
    type: "economy",
    agency: "Hertz",
    rating: { score: 4.5, count: 184, label: "Excellent" },
    pricePerDay: { amount: 34, currency: "USD", display: "$34/day" },
    transmission: "automatic",
    fuelPolicy: "Full to Full",
    seats: 4,
    luggageLarge: 1,
    luggageSmall: 1,
    airConditioning: true,
    unlimitedMileage: true,
    image: {
      src: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80",
      alt: "Chevrolet Spark"
    },
    location: {
      city: "Los Angeles",
      country: "United States",
      code: "LAX",
      address: "LAX Airport Car Rental Center, Los Angeles, CA"
    },
    description: "Perfect for budget-conscious solo travelers or couples. Easy to park, great fuel efficiency.",
    engineType: "1.4L 4-Cylinder",
    mpg: "30/38 MPG",
    features: ["Apple CarPlay / Android Auto", "Bluetooth Connect", "USB Charging Ports", "Backup Camera"],
    insuranceOptions: [
      { id: "ins-basic", name: "Collision Damage Waiver", description: "Covers damage to the rental car with a $500 deductible.", pricePerDay: { amount: 11, currency: "USD", display: "$11/day" } },
      { id: "ins-premium", name: "Full Protection", description: "Zero deductible collision waiver + roadside assistance.", pricePerDay: { amount: 24, currency: "USD", display: "$24/day" } }
    ],
    pickupInstructions: "Shuttle service available from terminal arrivals area to Hertz rental office.",
    dropoffInstructions: "Return vehicle with a full tank to the Hertz Rental Facility at LAX.",
    requirements: ["Minimum age: 21 (under 25 fee applies)", "Valid driver's license", "Major credit card in driver's name"]
  },
  {
    id: "car-102",
    name: "Toyota Corolla",
    type: "compact",
    agency: "Enterprise",
    rating: { score: 4.7, count: 320, label: "Exceptional" },
    pricePerDay: { amount: 42, currency: "USD", display: "$42/day", originalAmount: 49, originalDisplay: "$49" },
    transmission: "automatic",
    fuelPolicy: "Full to Full",
    seats: 5,
    luggageLarge: 2,
    luggageSmall: 1,
    airConditioning: true,
    unlimitedMileage: true,
    image: {
      src: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=800&q=80",
      alt: "Toyota Corolla"
    },
    location: {
      city: "Los Angeles",
      country: "United States",
      code: "LAX",
      address: "LAX Rental Car Facility, 9020 Aviation Blvd, Los Angeles, CA"
    },
    description: "Reliable, comfortable, and spacious enough for small families. Outstanding safety features.",
    engineType: "2.0L 4-Cylinder",
    mpg: "32/41 MPG",
    features: ["Lane Departure Warning", "Adaptive Cruise Control", "Touchscreen Display", "Bluetooth Link"],
    insuranceOptions: [
      { id: "ins-basic", name: "Collision Damage Waiver", description: "Covers damage to the rental car with a $500 deductible.", pricePerDay: { amount: 12, currency: "USD", display: "$12/day" } },
      { id: "ins-premium", name: "Full Protection", description: "Zero deductible collision waiver + roadside assistance.", pricePerDay: { amount: 26, currency: "USD", display: "$26/day" } }
    ],
    pickupInstructions: "Proceed to the Rental Car Shuttle zone outside terminal arrivals and board the Enterprise shuttle.",
    dropoffInstructions: "Follow airport signs for Rental Car Return and park in the Enterprise designated lanes.",
    requirements: ["Minimum age: 21 (under 25 fee applies)", "Valid driver's license", "Major credit card in driver's name"]
  },
  {
    id: "car-103",
    name: "Tesla Model 3",
    type: "electric",
    agency: "Avis",
    rating: { score: 4.8, count: 215, label: "Exceptional" },
    pricePerDay: { amount: 65, currency: "USD", display: "$65/day" },
    transmission: "automatic",
    fuelPolicy: "Battery 70%+",
    seats: 5,
    luggageLarge: 2,
    luggageSmall: 2,
    airConditioning: true,
    unlimitedMileage: true,
    image: {
      src: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80",
      alt: "Tesla Model 3"
    },
    location: {
      city: "Los Angeles",
      country: "United States",
      code: "LAX",
      address: "Avis Rental Center, 9217 Airport Blvd, Los Angeles, CA"
    },
    description: "Premium all-electric driving experience. Enjoy Autopilot capabilities and supercharging convenience.",
    engineType: "Electric Motor",
    mpg: "272 mi range",
    features: ["Autopilot Features", "Gigantic Center Console Touchscreen", "Premium Sound System", "Heated Seats"],
    insuranceOptions: [
      { id: "ins-basic", name: "Collision Damage Waiver", description: "Covers damage to the rental car with a $500 deductible.", pricePerDay: { amount: 15, currency: "USD", display: "$15/day" } },
      { id: "ins-premium", name: "Full Protection", description: "Zero deductible collision waiver + roadside assistance.", pricePerDay: { amount: 32, currency: "USD", display: "$32/day" } }
    ],
    pickupInstructions: "Board the Avis Rental Car Shuttle from the arrivals islands.",
    dropoffInstructions: "Return to Avis LAX lot and leave the vehicle plugged into the charging docks if battery is below 20%.",
    requirements: ["Minimum age: 25", "Valid driver's license", "Credit card in driver's name"]
  },
  {
    id: "car-104",
    name: "Hyundai Tucson",
    type: "suv",
    agency: "Budget",
    rating: { score: 4.4, count: 140, label: "Very Good" },
    pricePerDay: { amount: 48, currency: "USD", display: "$48/day" },
    transmission: "automatic",
    fuelPolicy: "Full to Full",
    seats: 5,
    luggageLarge: 3,
    luggageSmall: 2,
    airConditioning: true,
    unlimitedMileage: true,
    image: {
      src: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=800&q=80",
      alt: "Hyundai Tucson SUV"
    },
    location: {
      city: "New York",
      country: "United States",
      code: "JFK",
      address: "JFK Federal Circle Station Rental Center, Jamaica, NY"
    },
    description: "Midsize crossover SUV providing a high driving position, ample cargo space, and exceptional comfort.",
    engineType: "2.5L 4-Cylinder",
    mpg: "25/32 MPG",
    features: ["All-Wheel Drive", "Blind Spot Monitor", "Panoramic Sunroof", "Lane Keep Assist"],
    insuranceOptions: [
      { id: "ins-basic", name: "Collision Damage Waiver", description: "Covers damage to the rental car with a $500 deductible.", pricePerDay: { amount: 12, currency: "USD", display: "$12/day" } },
      { id: "ins-premium", name: "Full Protection", description: "Zero deductible collision waiver + roadside assistance.", pricePerDay: { amount: 27, currency: "USD", display: "$27/day" } }
    ],
    pickupInstructions: "Take the JFK AirTrain to Federal Circle Station. Proceed to the Budget rental counter on the ground level.",
    dropoffInstructions: "Drive to JFK Federal Circle Rental Facility and follow the signs for Budget Car Return.",
    requirements: ["Minimum age: 21 (under 25 fee applies)", "Valid driver's license", "Major credit card"]
  },
  {
    id: "car-105",
    name: "Chevrolet Tahoe",
    type: "suv",
    agency: "Enterprise",
    rating: { score: 4.6, count: 98, label: "Excellent" },
    pricePerDay: { amount: 89, currency: "USD", display: "$89/day" },
    transmission: "automatic",
    fuelPolicy: "Full to Full",
    seats: 7,
    luggageLarge: 4,
    luggageSmall: 3,
    airConditioning: true,
    unlimitedMileage: true,
    image: {
      src: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80",
      alt: "Chevrolet Tahoe"
    },
    location: {
      city: "New York",
      country: "United States",
      code: "JFK",
      address: "JFK Federal Circle Station Rental Center, Jamaica, NY"
    },
    description: "Full-size 7-passenger SUV. Massive cargo space, heavy towing capacity, and supreme comfort for large families.",
    engineType: "5.3L V8 Engine",
    mpg: "15/20 MPG",
    features: ["Third-Row Seating", "Apple CarPlay", "Bose Premium Audio", "Tri-Zone Climate Control"],
    insuranceOptions: [
      { id: "ins-basic", name: "Collision Damage Waiver", description: "Covers damage with a $500 deductible.", pricePerDay: { amount: 18, currency: "USD", display: "$18/day" } },
      { id: "ins-premium", name: "Full Protection", description: "Zero deductible collision waiver.", pricePerDay: { amount: 38, currency: "USD", display: "$38/day" } }
    ],
    pickupInstructions: "JFK AirTrain to Federal Circle Station. Proceed to the Enterprise counter.",
    dropoffInstructions: "Return to Federal Circle Station and park in the Enterprise designated area.",
    requirements: ["Minimum age: 25", "Valid driver's license", "Major credit card"]
  },
  {
    id: "car-106",
    name: "Ford Mustang Convertible",
    type: "luxury",
    agency: "Hertz",
    rating: { score: 4.6, count: 154, label: "Excellent" },
    pricePerDay: { amount: 95, currency: "USD", display: "$95/day", originalAmount: 110, originalDisplay: "$110" },
    transmission: "automatic",
    fuelPolicy: "Full to Full",
    seats: 4,
    luggageLarge: 1,
    luggageSmall: 1,
    airConditioning: true,
    unlimitedMileage: true,
    image: {
      src: "https://images.unsplash.com/photo-1610647752706-3bb12232b3ab?auto=format&fit=crop&w=800&q=80",
      alt: "Ford Mustang Convertible"
    },
    location: {
      city: "Miami",
      country: "United States",
      code: "MIA",
      address: "Miami Airport Rental Car Center, 3900 NW 25th St, Miami, FL"
    },
    description: "Enjoy the Florida sun with the top down! Sporty handling, iconic design, and comfortable front bucket seats.",
    engineType: "2.3L EcoBoost Turbo 4",
    mpg: "20/28 MPG",
    features: ["Power Convertible Top", "Leather Seats", "Selectable Drive Modes", "Premium Sound System"],
    insuranceOptions: [
      { id: "ins-basic", name: "Collision Damage Waiver", description: "Covers damage with a $500 deductible.", pricePerDay: { amount: 19, currency: "USD", display: "$19/day" } },
      { id: "ins-premium", name: "Full Protection", description: "Zero deductible + roadside assistance.", pricePerDay: { amount: 39, currency: "USD", display: "$39/day" } }
    ],
    pickupInstructions: "Take the MIA Mover train from the airport terminal to the Rental Car Center. Proceed to Hertz.",
    dropoffInstructions: "Return to the Miami Airport Rental Car Center, 3rd floor Hertz check-in lanes.",
    requirements: ["Minimum age: 25", "Valid driver's license", "Major credit card in driver's name"]
  },
  {
    id: "car-107",
    name: "Audi A6",
    type: "luxury",
    agency: "Alamo",
    rating: { score: 4.9, count: 76, label: "Exceptional" },
    pricePerDay: { amount: 115, currency: "USD", display: "$115/day" },
    transmission: "automatic",
    fuelPolicy: "Full to Full",
    seats: 5,
    luggageLarge: 2,
    luggageSmall: 2,
    airConditioning: true,
    unlimitedMileage: true,
    image: {
      src: "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?auto=format&fit=crop&w=800&q=80",
      alt: "Audi A6"
    },
    location: {
      city: "London",
      country: "United Kingdom",
      code: "LHR",
      address: "Heathrow Airport Car Rental Center, Hounslow, London"
    },
    description: "Premium executive sedan offering German engineering, high-class cabin luxury, and smooth highway ride.",
    engineType: "2.0L Turbo 4-Cylinder",
    mpg: "23/32 MPG",
    features: ["Quattro All-Wheel Drive", "Virtual Cockpit Display", "Leather Seats", "Pre-Sense Safety Systems"],
    insuranceOptions: [
      { id: "ins-basic", name: "Collision Damage Waiver", description: "Covers damage with £500 excess.", pricePerDay: { amount: 15, currency: "USD", display: "$15/day" } },
      { id: "ins-premium", name: "Super Cover", description: "Zero excess waiver + windscreen/tyre protection.", pricePerDay: { amount: 30, currency: "USD", display: "$30/day" } }
    ],
    pickupInstructions: "Take the complimentary rental bus to the Alamo depot at Northern Perimeter Road.",
    dropoffInstructions: "Return vehicle to Alamo depot and board the shuttle bus back to your departure terminal.",
    requirements: ["Minimum age: 25", "Valid international/UK driver's license", "Passport required"]
  },
  {
    id: "car-108",
    name: "Hyundai i20",
    type: "compact",
    agency: "Budget",
    rating: { score: 4.2, count: 68, label: "Very Good" },
    pricePerDay: { amount: 28, currency: "USD", display: "$28/day" },
    transmission: "manual",
    fuelPolicy: "Full to Full",
    seats: 5,
    luggageLarge: 1,
    luggageSmall: 2,
    airConditioning: true,
    unlimitedMileage: true,
    image: {
      src: "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&w=800&q=80",
      alt: "Hyundai i20"
    },
    location: {
      city: "New Delhi",
      country: "India",
      code: "DEL",
      address: "Indira Gandhi International Airport Terminal 3, New Delhi"
    },
    description: "Efficient hatchback suited for city driving and traffic navigation. Manual transmission for local road control.",
    engineType: "1.2L Kappa Engine",
    mpg: "18 km/l",
    features: ["Reverse Parking Sensors", "Touchscreen Navigation", "Steering Mounted Controls", "Dual Airbags"],
    insuranceOptions: [
      { id: "ins-basic", name: "Collision Damage Waiver", description: "Covers damage with a ₹10,000 deductible.", pricePerDay: { amount: 8, currency: "USD", display: "$8/day" } },
      { id: "ins-premium", name: "Full Protection", description: "Zero deductible collision waiver.", pricePerDay: { amount: 16, currency: "USD", display: "$16/day" } }
    ],
    pickupInstructions: "Alight at T3 Arrivals and proceed to the Airport Car Rental counter in the arrival hall near Gate 6.",
    dropoffInstructions: "Return the vehicle to the IGI Airport T3 multi-level car parking, Level 2, Budget drop-off zone.",
    requirements: ["Minimum age: 23", "Valid driver's license + International Driving Permit if non-resident", "ID proof"]
  }
];
