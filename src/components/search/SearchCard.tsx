"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  Plane, 
  Car, 
  Bed, 
  Ship, 
  Train, 
  Calendar, 
  MapPin, 
  User, 
  ArrowLeftRight, 
  Locate, 
  ArrowRight, 
  ChevronDown, 
  Plus, 
  Minus,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { useSearch } from "@/context/SearchContext";
import { SearchCategory, SearchParams } from "@/types/search";
import { CabinClass } from "@/types/common";
import { PHONE_NUMBER } from "@/utils/constants";

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const CAR_TIMES = ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"];

const CAR_CLASSES = [
  { value: "ALL", label: "All Classes" },
  { value: "economy", label: "Economy" },
  { value: "compact", label: "Compact" },
  { value: "suv", label: "SUV" },
  { value: "luxury", label: "Luxury" },
  { value: "electric", label: "Electric" }
];

const TRAIN_CLASSES = [
  { value: "ALL", label: "All Classes" },
  { value: "1A", label: "AC First Class (1A)" },
  { value: "2A", label: "AC 2 Tier (2A)" },
  { value: "3A", label: "AC 3 Tier (3A)" },
  { value: "SL", label: "Sleeper Class (SL)" }
];

const CABIN_CLASSES = [
  { value: "economy", label: "Economy" },
  { value: "premium_economy", label: "Premium Economy" },
  { value: "business", label: "Business" },
  { value: "first", label: "First Class" }
];

export default function SearchCard() {
  const router = useRouter();
  const { category, setCategory, params, setParams, executeSearch } = useSearch();

  // Local state for active tab (supports custom visual tabs too)
  const [activeTab, setActiveTab] = useState<string>(category);

  const handleGetCurrentLocation = (setter: (val: string) => void) => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }
    setter("Detecting location...");
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&accept-language=en`);
          if (res.ok) {
            const data = await res.json();
            const city = data.address.city || data.address.town || data.address.suburb || data.address.state || "Detected Location";
            const country = data.address.country || "";
            setter(country ? `${city}, ${country}` : city);
          } else {
            setter("Los Angeles, CA");
          }
        } catch (error) {
          setter("New Delhi, India");
        }
      },
      (error) => {
        setter("Los Angeles, CA");
      },
      { timeout: 8000 }
    );
  };

  // Local state for inputs
  const [origin, setOrigin] = useState(params.origin || "");
  const [destination, setDestination] = useState(params.destination || "");
  
  // Unified range picker dates
  const [startDate, setStartDate] = useState("2026-07-05");
  const [endDate, setEndDate] = useState("2026-07-12");

  // Sync dates with screenshots based on category
  useEffect(() => {
    if (activeTab === SearchCategory.Stays) {
      setStartDate("2026-07-23");
      setEndDate("2026-07-31");
    } else if (activeTab === SearchCategory.Flights) {
      setStartDate("2026-07-05");
      setEndDate("2026-07-12");
    }
  }, [activeTab]);

  // Calendar popover state
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [calendarActiveMonth, setCalendarActiveMonth] = useState(6); // Default to July 2026 (0-indexed 6)
  const [calendarActiveYear, setCalendarActiveYear] = useState(2026);
  const [tempStartDate, setTempStartDate] = useState<string | null>(null);
  const [tempEndDate, setTempEndDate] = useState<string | null>(null);
  const [hoverDate, setHoverDate] = useState<string | null>(null);

  // Travelers popover state & counters
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [adults, setAdults] = useState(params.adults || 1);
  const [children, setChildren] = useState(params.children || 0);
  const [infantsOnLap, setInfantsOnLap] = useState(0);
  const [infantsInSeat, setInfantsInSeat] = useState(0);
  const [cabinClass, setCabinClass] = useState<CabinClass>(params.cabinClass || "economy");
  const [rooms, setRooms] = useState(params.rooms || 1);

  // Custom dropdown open states
  const [isPickupTimeOpen, setIsPickupTimeOpen] = useState(false);
  const [isDropoffTimeOpen, setIsDropoffTimeOpen] = useState(false);
  const [isCarClassOpen, setIsCarClassOpen] = useState(false);
  const [isTrainClassOpen, setIsTrainClassOpen] = useState(false);
  const [isCabinClassOpen, setIsCabinClassOpen] = useState(false);

  // Flight specific sub-tabs
  const [tripType, setTripType] = useState<"one_way" | "round_trip" | "multi_city">("round_trip");

  // Cars specific
  const [differentDropoff, setDifferentDropoff] = useState(false);
  const [pickupTime, setPickupTime] = useState("10:00 AM");
  const [dropoffTime, setDropoffTime] = useState("10:00 AM");
  const [carClass, setCarClass] = useState("ALL");

  // Cruises specific
  const [minNights, setMinNights] = useState(3);
  const [maxNights, setMaxNights] = useState(14);
  const [cruiseLine, setCruiseLine] = useState("");

  // Train specific
  const [trainClass, setTrainClass] = useState("ALL");

  const categories = [
    { id: SearchCategory.Stays, label: "Stays", icon: Bed },
    { id: SearchCategory.Flights, label: "Flights", icon: Plane },
    { id: SearchCategory.Cars, label: "Cars", icon: Car },
    { id: SearchCategory.Cruises, label: "Cruises", icon: Ship },
    { id: SearchCategory.Trains, label: "Trains", icon: Train }
  ];

  // Sync temp dates when calendar opens
  useEffect(() => {
    if (isCalendarOpen) {
      setTempStartDate(startDate || null);
      setTempEndDate(endDate || null);
    }
  }, [isCalendarOpen, startDate, endDate]);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    if (
      tabId === SearchCategory.Flights ||
      tabId === SearchCategory.Stays ||
      tabId === SearchCategory.Cars ||
      tabId === SearchCategory.Cruises ||
      tabId === SearchCategory.Trains
    ) {
      setCategory(tabId as SearchCategory);
    }
  };

  const handleSwapLocations = () => {
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
  };

  const getTravelersLabel = () => {
    const total = adults + children + infantsOnLap + infantsInSeat;
    if (activeTab === SearchCategory.Stays) {
      return `${total} traveler${total > 1 ? "s" : ""}, ${rooms} room${rooms > 1 ? "s" : ""}`;
    }
    const cabinLabels: Record<string, string> = {
      economy: "Economy",
      premium_economy: "Premium Economy",
      business: "Business",
      first: "First Class"
    };
    const cabin = cabinLabels[cabinClass] || "Economy";
    return `${total} traveler${total > 1 ? "s" : ""}, ${cabin}`;
  };

  // Calendar Helpers
  const getDaysArray = (year: number, month: number) => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayIndex = new Date(year, month, 1).getDay(); // 0 = Sun, 1 = Mon, ...
    
    const arr = [];
    // Empty padding cells
    for (let i = 0; i < firstDayIndex; i++) {
      arr.push(null);
    }
    // Days
    for (let d = 1; d <= daysInMonth; d++) {
      const dateString = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
      arr.push({ dayNum: d, dateStr: dateString });
    }
    return arr;
  };

  const isDateDisabled = (dateStr: string) => {
    if (!dateStr) return true;
    return dateStr < "2026-06-21"; // Current metadata base time
  };

  const handleDayClick = (dateStr: string) => {
    // If single date category (One-way flight, Train, Cruise)
    if (
      (activeTab === SearchCategory.Flights && tripType === "one_way") ||
      activeTab === SearchCategory.Trains ||
      activeTab === SearchCategory.Cruises
    ) {
      setTempStartDate(dateStr);
      setTempEndDate(null);
      setStartDate(dateStr);
      setEndDate("");
      setIsCalendarOpen(false);
      return;
    }

    // Range selection logic
    if (!tempStartDate || (tempStartDate && tempEndDate)) {
      setTempStartDate(dateStr);
      setTempEndDate(null);
    } else {
      if (dateStr < tempStartDate) {
        setTempStartDate(dateStr);
        setTempEndDate(null);
      } else {
        setTempEndDate(dateStr);
      }
    }
  };

  const getDayClass = (dateStr: string) => {
    if (!dateStr) return "";
    
    const startVal = tempStartDate;
    const endVal = tempEndDate;
    
    if (startVal === dateStr) return "range-start";
    if (endVal === dateStr) return "range-end";
    
    if (startVal && endVal) {
      if (dateStr > startVal && dateStr < endVal) {
        return "range-mid";
      }
    } else if (startVal && hoverDate) {
      if (hoverDate > startVal) {
        if (dateStr > startVal && dateStr <= hoverDate) {
          return dateStr === hoverDate ? "range-end" : "range-mid";
        }
      } else {
        if (dateStr < startVal && dateStr >= hoverDate) {
          return dateStr === hoverDate ? "range-start" : "range-mid";
        }
      }
    }
    return "";
  };

  const handlePrevMonth = () => {
    if (calendarActiveMonth === 0) {
      setCalendarActiveMonth(11);
      setCalendarActiveYear(calendarActiveYear - 1);
    } else {
      setCalendarActiveMonth(calendarActiveMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (calendarActiveMonth === 11) {
      setCalendarActiveMonth(0);
      setCalendarActiveYear(calendarActiveYear + 1);
    } else {
      setCalendarActiveMonth(calendarActiveMonth + 1);
    }
  };

  const handleCalendarDone = () => {
    if (tempStartDate) {
      setStartDate(tempStartDate);
      setEndDate(tempEndDate || tempStartDate);
    }
    setIsCalendarOpen(false);
  };

  const formatDateDisplay = (dateStr: string) => {
    if (!dateStr) return "";
    const parts = dateStr.split("-");
    if (parts.length !== 3) return "";
    const year = parseInt(parts[0]);
    const month = parseInt(parts[1]) - 1;
    const day = parseInt(parts[2]);
    
    // Explicitly local Date creation to prevent timezone offset shifts
    const d = new Date(year, month, day);
    if (isNaN(d.getTime())) return "";
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    // Format to match "Thu, Jul 23"
    return `${days[d.getDay()]}, ${months[d.getMonth()]} ${d.getDate()}`;
  };

  const getDatesDisplayLabel = () => {
    if (!startDate) return "Select dates";
    if (
      (activeTab === SearchCategory.Flights && tripType === "one_way") ||
      activeTab === SearchCategory.Trains ||
      activeTab === SearchCategory.Cruises
    ) {
      return formatDateDisplay(startDate);
    }
    if (!endDate || endDate === startDate) return formatDateDisplay(startDate);
    return `${formatDateDisplay(startDate)} - ${formatDateDisplay(endDate)}`;
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Normalize activeTab to standard category for context and search execution
    let targetCategory = category;
    if (
      activeTab === SearchCategory.Flights ||
      activeTab === SearchCategory.Stays ||
      activeTab === SearchCategory.Cars ||
      activeTab === SearchCategory.Cruises ||
      activeTab === SearchCategory.Trains
    ) {
      targetCategory = activeTab as SearchCategory;
    }

    const searchParams: SearchParams = {
      category: targetCategory,
      origin: targetCategory === SearchCategory.Stays ? undefined : origin,
      destination: targetCategory === SearchCategory.Cars && !differentDropoff ? origin : destination,
      dates: startDate ? { start: startDate, end: endDate || startDate } : undefined,
      adults,
      children,
      infants: infantsOnLap + infantsInSeat,
      rooms: targetCategory === SearchCategory.Stays ? rooms : undefined,
      
      // Category specific
      tripType: targetCategory === SearchCategory.Flights ? tripType : undefined,
      cabinClass: targetCategory === SearchCategory.Flights ? cabinClass : undefined,
      differentDropoff: targetCategory === SearchCategory.Cars ? differentDropoff : undefined,
      pickupTime: targetCategory === SearchCategory.Cars ? pickupTime : undefined,
      dropoffTime: targetCategory === SearchCategory.Cars ? dropoffTime : undefined,
      carClass: targetCategory === SearchCategory.Cars ? (carClass !== "ALL" ? carClass : undefined) : undefined,
      minNights: targetCategory === SearchCategory.Cruises ? minNights : undefined,
      maxNights: targetCategory === SearchCategory.Cruises ? maxNights : undefined,
      cruiseLine: targetCategory === SearchCategory.Cruises ? (cruiseLine || undefined) : undefined,
      trainClass: targetCategory === SearchCategory.Trains ? (trainClass !== "ALL" ? trainClass : undefined) : undefined
    };

    setParams(searchParams);
    await executeSearch(searchParams);

    // Redirect to results page
    let redirectUrl = "";
    if (targetCategory === SearchCategory.Trains) {
      redirectUrl = `/trains?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&date=${startDate}`;
    } else {
      const finalDest = targetCategory === SearchCategory.Cars && !differentDropoff ? origin : destination;
      redirectUrl = `/search?category=${targetCategory}&destination=${encodeURIComponent(finalDest)}`;
    }
    
    router.push(redirectUrl);
  };

  // Calendar popover component JSX
  const renderCalendarPopover = () => {
    const isSingleDate = 
      (activeTab === SearchCategory.Flights && tripType === "one_way") ||
      activeTab === SearchCategory.Trains ||
      activeTab === SearchCategory.Cruises;

    return (
      <div className="expedia-calendar-popover" onClick={(e) => e.stopPropagation()}>
        {/* Top selector tabs removed */}

        {/* Text summary header for Flights selections */}
        {activeTab === SearchCategory.Flights && (
          <div className="expedia-calendar-header-summary">
            <span className={tempStartDate && !tempEndDate ? "active-underline" : ""}>
              {tempStartDate ? formatDateDisplay(tempStartDate) : "Depart"}
            </span>
            {!isSingleDate && (
              <>
                <span style={{ color: "#c5c7cd" }}>➔</span>
                <span className={tempStartDate && tempEndDate ? "active-underline" : ""}>
                  {tempEndDate ? formatDateDisplay(tempEndDate) : "Return"}
                </span>
              </>
            )}
          </div>
        )}

        {/* Months columns container */}
        <div className="expedia-calendar-months-container" onMouseLeave={() => setHoverDate(null)}>
          <div className="expedia-calendar-months">
            
            {/* Month 1: July 2026 default */}
            <div className="expedia-calendar-month">
              <div className="month-header">
                <button 
                  type="button" 
                  className="month-nav-btn"
                  onClick={handlePrevMonth}
                  title="Previous month"
                >
                  <ChevronLeft size={16} />
                </button>
                <span className="month-title">
                  {MONTH_NAMES[calendarActiveMonth]} {calendarActiveYear}
                </span>
                <div style={{ width: 32 }}></div>
              </div>
              
              <div className="month-days-grid">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((dayName) => (
                  <div key={dayName} className="day-header-cell">{dayName}</div>
                ))}
                {getDaysArray(calendarActiveYear, calendarActiveMonth).map((day, idx) => {
                  if (!day) return <div key={`empty-1-${idx}`} className="day-grid-cell"></div>;
                  return (
                    <div key={day.dateStr} className={`day-grid-cell ${getDayClass(day.dateStr)}`}>
                      <button
                        type="button"
                        className="day-btn"
                        disabled={isDateDisabled(day.dateStr)}
                        onClick={() => handleDayClick(day.dateStr)}
                        onMouseEnter={() => setHoverDate(day.dateStr)}
                      >
                        {day.dayNum}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Month 2: August 2026 default */}
            <div className="expedia-calendar-month">
              <div className="month-header">
                <div style={{ width: 32 }}></div>
                <span className="month-title">
                  {MONTH_NAMES[(calendarActiveMonth + 1) % 12]} {calendarActiveMonth === 11 ? calendarActiveYear + 1 : calendarActiveYear}
                </span>
                <button 
                  type="button" 
                  className="month-nav-btn"
                  onClick={handleNextMonth}
                  title="Next month"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
              
              <div className="month-days-grid">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((dayName) => (
                  <div key={dayName} className="day-header-cell">{dayName}</div>
                ))}
                {getDaysArray(
                  calendarActiveMonth === 11 ? calendarActiveYear + 1 : calendarActiveYear,
                  (calendarActiveMonth + 1) % 12
                ).map((day, idx) => {
                  if (!day) return <div key={`empty-2-${idx}`} className="day-grid-cell"></div>;
                  return (
                    <div key={day.dateStr} className={`day-grid-cell ${getDayClass(day.dateStr)}`}>
                      <button
                        type="button"
                        className="day-btn"
                        disabled={isDateDisabled(day.dateStr)}
                        onClick={() => handleDayClick(day.dateStr)}
                        onMouseEnter={() => setHoverDate(day.dateStr)}
                      >
                        {day.dayNum}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>

        {/* Footer actions */}
        <div className="popover-calendar-footer">
          <button 
            type="button" 
            className="calendar-done-btn"
            onClick={handleCalendarDone}
          >
            Done
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="search-card" style={{ textAlign: "left" }}>
      {/* 1. Category Navigation Tabs */}
      <div className="expedia-search-tabs">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const active = activeTab === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => handleTabClick(cat.id)}
              className={`expedia-search-tab ${active ? "active" : ""}`}
              type="button"
            >
              <Icon />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* 2. Form Sub-tabs (Flights only) */}
      {activeTab === SearchCategory.Flights && (
        <div className="expedia-sub-tabs">
          <button
            type="button"
            className={`expedia-sub-tab ${tripType === "round_trip" ? "active" : ""}`}
            onClick={() => setTripType("round_trip")}
          >
            Roundtrip
          </button>
          <button
            type="button"
            className={`expedia-sub-tab ${tripType === "one_way" ? "active" : ""}`}
            onClick={() => setTripType("one_way")}
          >
            One-way
          </button>
          <button
            type="button"
            className={`expedia-sub-tab ${tripType === "multi_city" ? "active" : ""}`}
            onClick={() => setTripType("multi_city")}
          >
            Multi-city
          </button>
        </div>
      )}

      {/* 2b. Form Sub-options (Cars only - different dropoff checkbox) */}
      {activeTab === SearchCategory.Cars && (
        <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "16px" }}>
          <label style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", cursor: "pointer", fontWeight: 500, color: "var(--text)", textTransform: "none" }}>
            <input
              type="checkbox"
              checked={differentDropoff}
              onChange={(e) => setDifferentDropoff(e.target.checked)}
              style={{ cursor: "pointer" }}
            />
            <span>Provide different drop-off location</span>
          </label>
        </div>
      )}

      {/* 3. Form Input Grid */}
      <form onSubmit={handleSearch}>
        
        {/* Render Cars separately due to specific layout parameters */}
        {activeTab === SearchCategory.Cars ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "100%" }}>
            {/* Cars Row 1: Locations */}
            <div className="expedia-form-row">
              <div className="expedia-input-container">
                <div className="expedia-input-group">
                  <MapPin className="expedia-icon-left" size={18} />
                  <span className="expedia-label">Pick-up location</span>
                  <input 
                    type="text" 
                    value={origin} 
                    onChange={(e) => setOrigin(e.target.value)} 
                    placeholder="City or airport"
                    required 
                  />
                  <button
                    type="button"
                    onClick={() => handleGetCurrentLocation(setOrigin)}
                    title="Use current location"
                    style={{
                      position: "absolute",
                      right: "8px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      color: "var(--primary)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "4px"
                    }}
                  >
                    <Locate size={14} />
                  </button>
                </div>
              </div>

              {differentDropoff && (
                <>
                  <div className="expedia-swap-container">
                    <button 
                      type="button" 
                      className="expedia-swap-btn"
                      onClick={handleSwapLocations}
                    >
                      <ArrowLeftRight size={16} />
                    </button>
                  </div>
                  <div className="expedia-input-container">
                    <div className="expedia-input-group">
                      <MapPin className="expedia-icon-left" size={18} />
                      <span className="expedia-label">Drop-off location</span>
                      <input 
                        type="text" 
                        value={destination} 
                        onChange={(e) => setDestination(e.target.value)} 
                        placeholder="City or airport"
                        required={differentDropoff}
                      />
                      <button
                        type="button"
                        onClick={() => handleGetCurrentLocation(setDestination)}
                        title="Use current location"
                        style={{
                          position: "absolute",
                          right: "8px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          background: "transparent",
                          border: "none",
                          cursor: "pointer",
                          color: "var(--primary)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          padding: "4px"
                        }}
                      >
                        <Locate size={14} />
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Cars Row 2: Custom Unified Dates Picker, Times, Class, Search */}
            <div className="expedia-form-row">
              
              {/* Unified Dates selector for Cars */}
              <div className="expedia-input-container expedia-dates-group">
                <div 
                  className="expedia-input-group expedia-dates-display"
                  onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                >
                  <Calendar className="expedia-icon-left" size={18} />
                  <span className="expedia-label">Dates</span>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "2px" }}>
                    <div style={{ fontSize: "14px", fontWeight: 600, color: "var(--text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {getDatesDisplayLabel()}
                    </div>
                    <ChevronDown size={14} style={{ color: "#5c5e62", marginLeft: "4px", flexShrink: 0 }} />
                  </div>
                </div>

                {isCalendarOpen && (
                  <>
                    <div 
                      style={{ position: "fixed", inset: 0, zIndex: 99, background: "transparent" }} 
                      onClick={() => setIsCalendarOpen(false)} 
                    />
                    {renderCalendarPopover()}
                  </>
                )}
              </div>

              <div className="expedia-input-container" style={{ position: "relative" }}>
                <div 
                  className="expedia-input-group" 
                  style={{ paddingLeft: "14px", cursor: "pointer", display: "flex", flexDirection: "column", justifyContent: "center", minHeight: "44px" }}
                  onClick={() => setIsPickupTimeOpen(!isPickupTimeOpen)}
                >
                  <span className="expedia-label">Pick-up time</span>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", marginTop: "2px" }}>
                    <span style={{ fontSize: "14px", fontWeight: 600, color: "var(--text)" }}>{pickupTime}</span>
                    <ChevronDown size={14} style={{ color: "#5c5e62", marginLeft: "4px", flexShrink: 0 }} />
                  </div>
                </div>

                {isPickupTimeOpen && (
                  <>
                    <div 
                      style={{ position: "fixed", inset: 0, zIndex: 99, background: "transparent" }} 
                      onClick={() => setIsPickupTimeOpen(false)} 
                    />
                    <div className="custom-select-popover">
                      {CAR_TIMES.map(time => (
                        <div
                          key={time}
                          onClick={() => {
                            setPickupTime(time);
                            setIsPickupTimeOpen(false);
                          }}
                          className={`custom-select-option ${time === pickupTime ? "active" : ""}`}
                        >
                          {time}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>

              <div className="expedia-input-container" style={{ position: "relative" }}>
                <div 
                  className="expedia-input-group" 
                  style={{ paddingLeft: "14px", cursor: "pointer", display: "flex", flexDirection: "column", justifyContent: "center", minHeight: "44px" }}
                  onClick={() => setIsDropoffTimeOpen(!isDropoffTimeOpen)}
                >
                  <span className="expedia-label">Drop-off time</span>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", marginTop: "2px" }}>
                    <span style={{ fontSize: "14px", fontWeight: 600, color: "var(--text)" }}>{dropoffTime}</span>
                    <ChevronDown size={14} style={{ color: "#5c5e62", marginLeft: "4px", flexShrink: 0 }} />
                  </div>
                </div>

                {isDropoffTimeOpen && (
                  <>
                    <div 
                      style={{ position: "fixed", inset: 0, zIndex: 99, background: "transparent" }} 
                      onClick={() => setIsDropoffTimeOpen(false)} 
                    />
                    <div className="custom-select-popover">
                      {CAR_TIMES.map(time => (
                        <div
                          key={time}
                          onClick={() => {
                            setDropoffTime(time);
                            setIsDropoffTimeOpen(false);
                          }}
                          className={`custom-select-option ${time === dropoffTime ? "active" : ""}`}
                        >
                          {time}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>

              <div className="expedia-input-container" style={{ position: "relative" }}>
                <div 
                  className="expedia-input-group" 
                  style={{ paddingLeft: "14px", cursor: "pointer", display: "flex", flexDirection: "column", justifyContent: "center", minHeight: "44px" }}
                  onClick={() => setIsCarClassOpen(!isCarClassOpen)}
                >
                  <span className="expedia-label">Car class</span>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", marginTop: "2px" }}>
                    <span style={{ fontSize: "14px", fontWeight: 600, color: "var(--text)" }}>
                      {CAR_CLASSES.find(c => c.value === carClass)?.label || "All Classes"}
                    </span>
                    <ChevronDown size={14} style={{ color: "#5c5e62", marginLeft: "4px", flexShrink: 0 }} />
                  </div>
                </div>

                {isCarClassOpen && (
                  <>
                    <div 
                      style={{ position: "fixed", inset: 0, zIndex: 99, background: "transparent" }} 
                      onClick={() => setIsCarClassOpen(false)} 
                    />
                    <div className="custom-select-popover">
                      {CAR_CLASSES.map(cls => (
                        <div
                          key={cls.value}
                          onClick={() => {
                            setCarClass(cls.value);
                            setIsCarClassOpen(false);
                          }}
                          className={`custom-select-option ${cls.value === carClass ? "active" : ""}`}
                        >
                          {cls.label}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>

              <button type="submit" className="expedia-btn-search">
                Search
              </button>
            </div>
          </div>
        ) : (
          /* Standard Categories Layout (Stays, Flights, Cruises, Trains) */
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div className="expedia-form-row">
              
              {/* Origin Field */}
              {activeTab !== SearchCategory.Stays && (
                <div className="expedia-input-container">
                  <div className="expedia-input-group">
                    <MapPin className="expedia-icon-left" size={18} />
                    <span className="expedia-label">Leaving from</span>
                    <input 
                      type="text" 
                      value={origin} 
                      onChange={(e) => setOrigin(e.target.value)} 
                      placeholder="City or airport"
                      required 
                    />

                  </div>
                </div>
              )}

              {/* Swap Locations Button */}
              {activeTab !== SearchCategory.Stays && (
                <div className="expedia-swap-container">
                  <button 
                    type="button" 
                    className="expedia-swap-btn"
                    onClick={handleSwapLocations}
                    title="Swap locations"
                  >
                    <ArrowLeftRight size={16} />
                  </button>
                </div>
              )}

              {/* Destination Field */}
              <div className="expedia-input-container">
                <div className="expedia-input-group">
                  <MapPin className="expedia-icon-left" size={18} />
                  <span className="expedia-label">Going to</span>
                  <input 
                    type="text" 
                    value={destination} 
                    onChange={(e) => setDestination(e.target.value)} 
                    placeholder={
                      activeTab === SearchCategory.Flights ? "Going to city or airport" :
                      activeTab === SearchCategory.Stays ? "Going to destination" :
                      activeTab === SearchCategory.Cruises ? "Port or destination" :
                      activeTab === SearchCategory.Trains ? "Going to station" :
                      "Destination"
                    }
                    required 
                  />
                  {activeTab === SearchCategory.Stays && (
                    <button
                      type="button"
                      onClick={() => handleGetCurrentLocation(setDestination)}
                      title="Use current location"
                      style={{
                        position: "absolute",
                        right: "8px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                        color: "var(--primary)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "4px"
                      }}
                    >
                      <Locate size={14} />
                    </button>
                  )}
                </div>
              </div>

              {/* Custom Unified Dates Picker container */}
              <div className="expedia-input-container expedia-dates-group">
                <div 
                  className="expedia-input-group expedia-dates-display"
                  onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                >
                  <Calendar className="expedia-icon-left" size={18} />
                  <span className="expedia-label">Dates</span>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "2px" }}>
                    <div style={{ fontSize: "14px", fontWeight: 600, color: "var(--text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {getDatesDisplayLabel()}
                    </div>
                    <ChevronDown size={14} style={{ color: "#5c5e62", marginLeft: "4px", flexShrink: 0 }} />
                  </div>
                </div>

                {isCalendarOpen && (
                  <>
                    <div 
                      style={{ position: "fixed", inset: 0, zIndex: 99, background: "transparent" }} 
                      onClick={() => setIsCalendarOpen(false)} 
                    />
                    {renderCalendarPopover()}
                  </>
                )}
              </div>

              {/* Travelers & Cabin Popover */}
              <div className="expedia-input-container">
                  <div 
                    className="expedia-input-group expedia-travelers-display"
                    onClick={() => setIsPopoverOpen(!isPopoverOpen)}
                  >
                    <User className="expedia-icon-left" size={18} />
                    <span className="expedia-label">
                      {activeTab === SearchCategory.Stays ? "Travelers, rooms" : "Travelers, Cabin class"}
                    </span>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "2px" }}>
                      <div style={{ fontSize: "14px", fontWeight: 600, color: "var(--text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {getTravelersLabel()}
                      </div>
                      <ChevronDown size={14} style={{ color: "#5c5e62", marginLeft: "4px", flexShrink: 0 }} />
                    </div>
                  </div>

                  {isPopoverOpen && (
                    <>
                      {/* Transparent click catcher overlay */}
                      <div 
                        style={{ position: "fixed", inset: 0, zIndex: 99, background: "transparent" }} 
                        onClick={() => setIsPopoverOpen(false)} 
                      />
                      
                      <div className="travelers-popover">
                        <h4 className="popover-header">
                          {activeTab === SearchCategory.Stays ? "Travelers and rooms" : "Travelers and Cabin class"}
                        </h4>
                        
                        {/* Adults Counter */}
                        <div className="popover-row">
                          <div className="popover-row-label">
                            <span className="popover-label-title">Adults</span>
                          </div>
                          <div className="popover-counter">
                            <button 
                              type="button" 
                              className="counter-btn"
                              disabled={adults <= 1}
                              onClick={() => setAdults(adults - 1)}
                            >
                              <Minus size={14} />
                            </button>
                            <span className="counter-value">{adults}</span>
                            <button 
                              type="button" 
                              className="counter-btn"
                              disabled={adults >= 9}
                              onClick={() => setAdults(adults + 1)}
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                        </div>

                        {/* Children Counter */}
                        <div className="popover-row">
                          <div className="popover-row-label">
                            <span className="popover-label-title">Children</span>
                            <span className="popover-label-subtitle">Ages 2 to 17</span>
                          </div>
                          <div className="popover-counter">
                            <button 
                              type="button" 
                              className="counter-btn"
                              disabled={children <= 0}
                              onClick={() => setChildren(children - 1)}
                            >
                              <Minus size={14} />
                            </button>
                            <span className="counter-value">{children}</span>
                            <button 
                              type="button" 
                              className="counter-btn"
                              disabled={children >= 6}
                              onClick={() => setChildren(children + 1)}
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                        </div>

                        {/* Infants on Lap Counter */}
                        <div className="popover-row">
                          <div className="popover-row-label">
                            <span className="popover-label-title">Infants on lap</span>
                            <span className="popover-label-subtitle">Younger than 2</span>
                          </div>
                          <div className="popover-counter">
                            <button 
                              type="button" 
                              className="counter-btn"
                              disabled={infantsOnLap <= 0}
                              onClick={() => setInfantsOnLap(infantsOnLap - 1)}
                            >
                              <Minus size={14} />
                            </button>
                            <span className="counter-value">{infantsOnLap}</span>
                            <button 
                              type="button" 
                              className="counter-btn"
                              disabled={infantsOnLap >= 4}
                              onClick={() => setInfantsOnLap(infantsOnLap + 1)}
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                        </div>

                        {/* Infants in Seat Counter */}
                        <div className="popover-row">
                          <div className="popover-row-label">
                            <span className="popover-label-title">Infants in seat</span>
                            <span className="popover-label-subtitle">Younger than 2</span>
                          </div>
                          <div className="popover-counter">
                            <button 
                              type="button" 
                              className="counter-btn"
                              disabled={infantsInSeat <= 0}
                              onClick={() => setInfantsInSeat(infantsInSeat - 1)}
                            >
                              <Minus size={14} />
                            </button>
                            <span className="counter-value">{infantsInSeat}</span>
                            <button 
                              type="button" 
                              className="counter-btn"
                              disabled={infantsInSeat >= 4}
                              onClick={() => setInfantsInSeat(infantsInSeat + 1)}
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                        </div>

                        {/* Rooms Counter (Stays only) */}
                        {activeTab === SearchCategory.Stays && (
                          <div className="popover-row" style={{ borderTop: "1px solid var(--border)", paddingTop: "16px", marginTop: "8px" }}>
                            <div className="popover-row-label">
                              <span className="popover-label-title">Rooms</span>
                            </div>
                            <div className="popover-counter">
                              <button 
                                type="button" 
                                className="counter-btn"
                                disabled={rooms <= 1}
                                onClick={() => setRooms(rooms - 1)}
                              >
                                <Minus size={14} />
                              </button>
                              <span className="counter-value">{rooms}</span>
                              <button 
                                type="button" 
                                className="counter-btn"
                                disabled={rooms >= 8}
                                onClick={() => setRooms(rooms + 1)}
                              >
                                <Plus size={14} />
                              </button>
                            </div>
                          </div>
                        )}

                        {/* Cabin Class select (Flights only) */}
                        {activeTab === SearchCategory.Flights && (
                          <div className="popover-select-group" style={{ position: "relative" }}>
                            <label style={{ display: "block", marginBottom: "6px" }}>Cabin class</label>
                            <div 
                              className="popover-select" 
                              style={{ cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between" }}
                              onClick={() => setIsCabinClassOpen(!isCabinClassOpen)}
                            >
                              <span>
                                {CABIN_CLASSES.find(c => c.value === cabinClass)?.label || "Economy"}
                              </span>
                              <ChevronDown size={14} style={{ color: "#5c5e62", marginLeft: "4px" }} />
                            </div>

                            {isCabinClassOpen && (
                              <>
                                <div 
                                  style={{ position: "fixed", inset: 0, zIndex: 101, background: "transparent" }} 
                                  onClick={() => setIsCabinClassOpen(false)} 
                                />
                                <div className="custom-select-popover" style={{
                                  bottom: "calc(100% + 4px)",
                                  top: "auto",
                                  backgroundColor: "var(--surface)",
                                  zIndex: 102
                                }}>
                                  {CABIN_CLASSES.map(cabin => (
                                    <div
                                      key={cabin.value}
                                      onClick={() => {
                                        setCabinClass(cabin.value as CabinClass);
                                        setIsCabinClassOpen(false);
                                      }}
                                      className={`custom-select-option ${cabin.value === cabinClass ? "active" : ""}`}
                                    >
                                      {cabin.label}
                                    </div>
                                  ))}
                                </div>
                              </>
                            )}
                          </div>
                        )}

                        {/* Popover footer */}
                        <div className="popover-footer">
                          <button 
                            type="button" 
                            className="popover-done-btn"
                            onClick={() => setIsPopoverOpen(false)}
                          >
                            Done
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>

              {/* Search Pill Button */}
              <button type="submit" className="expedia-btn-search">
                Search
              </button>

            </div>

            {/* Extra context alert message for Multi-city Flights */}
            {activeTab === SearchCategory.Flights && tripType === "multi_city" && (
              <div style={{ 
                background: "var(--primary-light)", 
                border: "1px dashed var(--primary)", 
                borderRadius: "10px", 
                padding: "12px 16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                fontSize: "13px",
                color: "var(--nav)",
                marginTop: "4px"
              }}>
                <span><strong>Multi-stop Discount Active:</strong> Custom complex multi-city routes qualify for call-only promotional rates up to 25% off.</span>
                <a href={`tel:${PHONE_NUMBER}`} style={{ fontWeight: 700, display: "flex", alignItems: "center", gap: "4px", textDecoration: "none" }}>
                  Call {PHONE_NUMBER}
                </a>
              </div>
            )}
            
            {/* Trains specific details */}
            {activeTab === SearchCategory.Trains && (
              <div style={{ display: "flex", gap: "16px", alignItems: "center", marginTop: "4px" }}>
                <div className="expedia-input-container" style={{ maxWidth: "200px", position: "relative" }}>
                  <div 
                    className="expedia-input-group" 
                    style={{ paddingLeft: "14px", minHeight: "44px", cursor: "pointer", display: "flex", flexDirection: "column", justifyContent: "center" }}
                    onClick={() => setIsTrainClassOpen(!isTrainClassOpen)}
                  >
                    <span className="expedia-label">Preferred Class</span>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", marginTop: "2px" }}>
                      <span style={{ fontSize: "14px", fontWeight: 600, color: "var(--text)" }}>
                        {TRAIN_CLASSES.find(c => c.value === trainClass)?.label || "All Classes"}
                      </span>
                      <ChevronDown size={14} style={{ color: "#5c5e62", marginLeft: "4px", flexShrink: 0 }} />
                    </div>
                  </div>

                  {isTrainClassOpen && (
                    <>
                      <div 
                        style={{ position: "fixed", inset: 0, zIndex: 99, background: "transparent" }} 
                        onClick={() => setIsTrainClassOpen(false)} 
                      />
                      <div className="custom-select-popover">
                        {TRAIN_CLASSES.map(cls => (
                          <div
                            key={cls.value}
                            onClick={() => {
                              setTrainClass(cls.value);
                              setIsTrainClassOpen(false);
                            }}
                            className={`custom-select-option ${cls.value === trainClass ? "active" : ""}`}
                          >
                            {cls.label}
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        )}



      </form>
    </div>
  );
}
