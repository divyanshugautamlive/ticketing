"use client";

import React, { useState } from "react";
import Link from "next/link";
import { HelpCircle, ChevronDown, ChevronUp, Search, Phone, Mail, Clock, ShieldCheck } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
  isOpen?: boolean;
}

interface FAQGroup {
  title: string;
  items: FAQItem[];
}

const faqData: FAQGroup[] = [
  {
    title: "Booking & Payments",
    items: [
      {
        question: "How do I make a payment on Ticketing Info?",
        answer: "We support two primary secure payment options: paying directly online using a credit/debit card (Visa, Mastercard, American Express, etc.) through our encrypted checkout gateway, or submitting your booking details for 'Agent Assist' where a live travel specialist will call you to finalize the payment details securely."
      },
      {
        question: "Can I book a ticket for someone else?",
        answer: "Yes, you can book on behalf of other passengers. Simply enter their correct names, passport details (for international flights/cruises), and dates of birth in the Traveler Information section, then enter your details in the Contact section to receive the invoice."
      },
      {
        question: "What does the 'Pending Agent Payment' status mean?",
        answer: "This status indicates that you selected the 'Agent Call' payment method during checkout. Your itinerary is secured, and a travel advisor will call you within 15–30 minutes to collect your payment and issue the official ticket vouchers."
      }
    ]
  },
  {
    title: "Cancellations & Refunds",
    items: [
      {
        question: "How do I cancel my reservation?",
        answer: "You can cancel bookings directly from the 'My Trips' dashboard by clicking the 'Cancel Booking' button on any upcoming reservation. Alternatively, call our support experts at 1-800-555-TICKETS with your reference number (e.g. TI-XXXXXX)."
      },
      {
        question: "Will I get a refund if I cancel my booking?",
        answer: "Refund eligibility depends on the carrier/hotel policy and the fare class selected (e.g., Refundable vs. Non-Refundable). Refunds are processed back to the original form of payment and typically take 5–10 business days to reflect."
      },
      {
        question: "What is the deadline for cancelling a trip?",
        answer: "For flights, cancellations must generally be made at least 24 hours prior to departure. For hotels and stays, check the specific cancellation deadline listed on your voucher details in the 'My Trips' portal."
      }
    ]
  },
  {
    title: "Baggage & Check-In",
    items: [
      {
        question: "Is baggage included in my flight ticket?",
        answer: "Baggage allowance varies depending on the airline and cabin class. Most international flights include one check-in bag (up to 23kg/50lbs) and one carry-on. You can view the baggage allowance details in the receipt invoice in the 'My Trips' modal."
      },
      {
        question: "How do I check in for my flight?",
        answer: "Online check-in typically opens 24 hours before flight departure. You can check in directly on the airline's official website using the carrier locator code (PNR) listed on your Ticketing Info invoice."
      }
    ]
  }
];

export default function SupportPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeGroupIndex, setActiveGroupIndex] = useState<number | null>(0);
  const [openFaqs, setOpenFaqs] = useState<{ [key: string]: boolean }>({});

  const toggleFaq = (groupIndex: number, itemIndex: number) => {
    const key = `${groupIndex}-${itemIndex}`;
    setOpenFaqs((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Filter FAQs based on query
  const getFilteredFaqs = () => {
    if (!searchQuery.trim()) return faqData;
    
    return faqData.map((group) => {
      const filteredItems = group.items.filter(
        (item) =>
          item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.answer.toLowerCase().includes(searchQuery.toLowerCase())
      );
      return {
        ...group,
        items: filteredItems
      };
    }).filter(group => group.items.length > 0);
  };

  const filteredFaqs = getFilteredFaqs();

  return (
    <div style={{ backgroundColor: "var(--bg)", minHeight: "calc(100vh - 120px)", padding: "48px 0" }}>
      <div className="section-wrap" style={{ padding: "0 24px" }}>
        
        {/* Header Support Search banner */}
        <div 
          style={{ 
            textAlign: "center", 
            marginBottom: "40px",
            backgroundColor: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: "12px",
            padding: "40px 24px",
            boxShadow: "var(--shadow-sm)"
          }}
        >
          <HelpCircle size={40} style={{ color: "var(--primary)", margin: "0 auto 16px" }} />
          <h1 style={{ fontSize: "28px", fontWeight: 800, margin: "0 0 8px" }}>How can we help you?</h1>
          <p style={{ color: "var(--muted)", fontSize: "14px", margin: "0 0 24px" }}>
            Search our Help Center FAQs or contact our dedicated booking experts.
          </p>

          <div style={{ maxWidth: "480px", margin: "0 auto", position: "relative" }}>
            <Search 
              size={18} 
              style={{ 
                position: "absolute", 
                left: "14px", 
                top: "50%", 
                transform: "translateY(-50%)", 
                color: "var(--subtle)" 
              }} 
            />
            <input 
              type="text" 
              placeholder="Search booking rules, refunds, baggage..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ 
                paddingLeft: "42px", 
                borderRadius: "24px", 
                backgroundColor: "var(--bg)",
                border: "1.5px solid var(--border)"
              }}
            />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: "32px", alignItems: "start" }} className="booking-layout">
          
          {/* FAQ Accordion List */}
          <div>
            <h2 style={{ fontSize: "20px", fontWeight: 800, marginBottom: "20px" }}>Frequently Asked Questions</h2>
            
            {filteredFaqs.length === 0 ? (
              <div style={{ backgroundColor: "var(--card)", padding: "32px", borderRadius: "8px", border: "1px solid var(--border)", textAlign: "center" }}>
                <p style={{ color: "var(--muted)", margin: 0 }}>No FAQs matches "{searchQuery}"</p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                {filteredFaqs.map((group, groupIdx) => (
                  <div key={groupIdx}>
                    <h3 style={{ fontSize: "15px", fontWeight: 800, color: "var(--primary)", marginBottom: "12px", borderBottom: "1px solid var(--border)", paddingBottom: "6px" }}>
                      {group.title}
                    </h3>
                    
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                      {group.items.map((item, itemIdx) => {
                        const isOpen = !!openFaqs[`${groupIdx}-${itemIdx}`] || (searchQuery.trim() !== "");
                        return (
                          <div 
                            key={itemIdx}
                            style={{ 
                              backgroundColor: "var(--card)", 
                              border: "1px solid var(--border)", 
                              borderRadius: "6px",
                              overflow: "hidden" 
                            }}
                          >
                            <button
                              onClick={() => toggleFaq(groupIdx, itemIdx)}
                              style={{
                                display: "flex",
                                width: "100%",
                                justifyContent: "space-between",
                                alignItems: "center",
                                padding: "16px 20px",
                                background: "none",
                                border: "none",
                                textAlign: "left",
                                fontWeight: 700,
                                fontSize: "14px",
                                cursor: "pointer",
                                borderRadius: 0
                              }}
                            >
                              <span>{item.question}</span>
                              {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            </button>
                            
                            {isOpen && (
                              <div 
                                style={{ 
                                  padding: "0 20px 16px", 
                                  fontSize: "13px", 
                                  color: "var(--muted)", 
                                  lineHeight: 1.5,
                                  borderTop: "1px solid #f3f4f6",
                                  paddingTop: "12px"
                                }}
                              >
                                {item.answer}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Contact options */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            
            <div style={{ backgroundColor: "var(--nav)", color: "#fff", borderRadius: "8px", padding: "24px" }}>
              <h3 style={{ fontSize: "16px", fontWeight: 800, color: "#fff", margin: "0 0 12px" }}>Still Need Help?</h3>
              <p style={{ fontSize: "12px", color: "#93C5FD", lineHeight: 1.5, margin: "0 0 16px" }}>
                Our experienced ticketing agents are available round-the-clock to manage itinerary adjustments, cancellations, and special bookings.
              </p>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <Link 
                  href="/call-agent" 
                  className="btn-book"
                  style={{ width: "100%", textAlign: "center", textDecoration: "none", display: "block", fontSize: "13px" }}
                >
                  Request a Callback
                </Link>
                
                <a 
                  href="tel:1-800-555-TICKETS" 
                  className="btn-outline-primary"
                  style={{ 
                    width: "100%", 
                    textAlign: "center", 
                    textDecoration: "none", 
                    display: "block", 
                    fontSize: "13px",
                    color: "#fff",
                    borderColor: "#fff"
                  }}
                >
                  Dial 1-800-555-TICKETS
                </a>
              </div>
            </div>

            <div style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px", padding: "20px" }}>
              <h4 style={{ fontSize: "13px", fontWeight: 700, margin: "0 0 12px" }}>Support Stats</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "12px" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--muted)" }}>Avg. Agent Call Queue</span>
                  <strong>Under 2 Mins</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--muted)" }}>Callback Response Time</span>
                  <strong>15 Minutes</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--muted)" }}>Customer Rating</span>
                  <strong>4.8 / 5.0 ★</strong>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
