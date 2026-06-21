"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Compass, Users, Award, ShieldCheck, Heart, PhoneCall } from "lucide-react";

export default function AboutPage() {
  return (
    <div style={{ backgroundColor: "var(--bg)", minHeight: "calc(100vh - 120px)", padding: "48px 0" }}>
      <div className="section-wrap" style={{ padding: "0 24px" }}>
        
        {/* Breadcrumb / Title */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <span style={{ fontSize: "11px", color: "var(--primary)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px" }}>Our Story</span>
          <h1 style={{ fontSize: "32px", fontWeight: 800, margin: "8px 0 16px" }}>About Ticketing Info</h1>
          <p style={{ color: "var(--muted)", maxWidth: "600px", margin: "0 auto", fontSize: "14px", lineHeight: 1.5 }}>
            We are a premium global travel booking portal dedicated to simplifying international itineraries with secure payments and 24/7 expert agent backing.
          </p>
        </div>

        {/* Hero Image / Content Split */}
        <div 
          style={{ 
            backgroundColor: "var(--card)", 
            border: "1px solid var(--border)", 
            borderRadius: "12px", 
            overflow: "hidden", 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", 
            boxShadow: "var(--shadow-md)",
            marginBottom: "48px"
          }}
        >
          <div style={{ height: "340px", position: "relative" }}>
            <Image 
              src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80" 
              alt="Travel Planning" 
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
              style={{ objectFit: "cover" }}
            />
          </div>
          <div style={{ padding: "40px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <h2 style={{ fontSize: "22px", fontWeight: 800, marginBottom: "16px" }}>Your Journey, Our Priority</h2>
            <p style={{ fontSize: "13.5px", color: "var(--muted)", marginBottom: "16px", lineHeight: 1.6 }}>
              Founded in 2021, Ticketing Info set out to build a search-first, comparison-friendly booking platform that doesn't sacrifice human touch. We recognize that while automated bookings are fast, international itineraries often require personalized assistance.
            </p>
            <p style={{ fontSize: "13.5px", color: "var(--muted)", marginBottom: "20px", lineHeight: 1.6 }}>
              Our hybrid booking model gives you the speed of immediate search results combined with a direct line to seasoned flight and stay experts. On every page, our travel assistants are ready to finalize payments or offer custom fares.
            </p>
            <div>
              <Link href="/call-agent" className="btn-primary" style={{ textDecoration: "none" }}>
                Speak to a Travel Agent
              </Link>
            </div>
          </div>
        </div>

        {/* Value Grid */}
        <h3 style={{ textAlign: "center", fontSize: "20px", fontWeight: 800, marginBottom: "28px" }}>Why Travel With Us?</h3>
        
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "24px", marginBottom: "48px" }}>
          {/* Card 1 */}
          <div style={{ backgroundColor: "var(--card)", padding: "28px", borderRadius: "8px", border: "1px solid var(--border)" }}>
            <div style={{ backgroundColor: "var(--primary-light)", color: "var(--primary)", width: "40px", height: "40px", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px" }}>
              <Compass size={20} />
            </div>
            <h4 style={{ fontSize: "15px", fontWeight: 700, marginBottom: "8px" }}>Global Integrations</h4>
            <p style={{ fontSize: "12.5px", color: "var(--muted)", lineHeight: 1.5 }}>
              Compare schedules and fares from 500+ airlines, 1 million hotels, and multiple train lines globally in one interface.
            </p>
          </div>

          {/* Card 2 */}
          <div style={{ backgroundColor: "var(--card)", padding: "28px", borderRadius: "8px", border: "1px solid var(--border)" }}>
            <div style={{ backgroundColor: "var(--primary-light)", color: "var(--primary)", width: "40px", height: "40px", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px" }}>
              <PhoneCall size={20} />
            </div>
            <h4 style={{ fontSize: "15px", fontWeight: 700, marginBottom: "8px" }}>Agent-Assisted Booking</h4>
            <p style={{ fontSize: "12.5px", color: "var(--muted)", lineHeight: 1.5 }}>
              Finalize payment or configure complex multi-city schedules over the phone with qualified travel experts.
            </p>
          </div>

          {/* Card 3 */}
          <div style={{ backgroundColor: "var(--card)", padding: "28px", borderRadius: "8px", border: "1px solid var(--border)" }}>
            <div style={{ backgroundColor: "var(--primary-light)", color: "var(--primary)", width: "40px", height: "40px", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px" }}>
              <ShieldCheck size={20} />
            </div>
            <h4 style={{ fontSize: "15px", fontWeight: 700, marginBottom: "8px" }}>Secure Checkout</h4>
            <p style={{ fontSize: "12.5px", color: "var(--muted)", lineHeight: 1.5 }}>
              Verify secure SSL encryption on all card bookings, or secure your itinerary using offline bank transfers.
            </p>
          </div>

          {/* Card 4 */}
          <div style={{ backgroundColor: "var(--card)", padding: "28px", borderRadius: "8px", border: "1px solid var(--border)" }}>
            <div style={{ backgroundColor: "var(--primary-light)", color: "var(--primary)", width: "40px", height: "40px", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px" }}>
              <Award size={20} />
            </div>
            <h4 style={{ fontSize: "15px", fontWeight: 700, marginBottom: "8px" }}>Award Winning Quality</h4>
            <p style={{ fontSize: "12.5px", color: "var(--muted)", lineHeight: 1.5 }}>
              Voted Best Premium Travel Platform for customer service reliability and comparative search accuracy.
            </p>
          </div>
        </div>

        {/* Quick Numbers Banner */}
        <div 
          style={{ 
            backgroundColor: "var(--nav)", 
            color: "#fff", 
            borderRadius: "12px", 
            padding: "32px", 
            textAlign: "center",
            boxShadow: "var(--shadow-sm)" 
          }}
        >
          <h3 style={{ color: "#fff", fontSize: "18px", fontWeight: 800, marginBottom: "8px" }}>Have Questions About Your Travel Route?</h3>
          <p style={{ color: "#93C5FD", fontSize: "13px", margin: "0 0 20px" }}>
            Our agents are online right now. Speak with a live customer care assistant.
          </p>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "8px", fontSize: "24px", fontWeight: 800, color: "var(--green-border)" }}>
            <PhoneCall size={24} style={{ color: "var(--green-border)" }} />
            <span>1-800-555-TICKETS</span>
          </div>
        </div>

      </div>
    </div>
  );
}
