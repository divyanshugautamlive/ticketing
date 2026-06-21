"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, MessageSquare } from "lucide-react";
import { nameSchema, emailSchema, phoneSchema } from "@/utils/validation";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "general",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Validate inputs
      const nameParsed = nameSchema.safeParse(formData.name);
      if (!nameParsed.success) {
        throw new Error("Invalid name: " + nameParsed.error.issues[0].message);
      }

      const emailParsed = emailSchema.safeParse(formData.email);
      if (!emailParsed.success) {
        throw new Error("Invalid email: " + emailParsed.error.issues[0].message);
      }

      if (formData.phone) {
        const phoneParsed = phoneSchema.safeParse(formData.phone);
        if (!phoneParsed.success) {
          throw new Error("Invalid phone: " + phoneParsed.error.issues[0].message);
        }
      }

      if (formData.message.length < 10) {
        throw new Error("Message too short (minimum 10 characters).");
      }

      // Simulate secure contact form submission
      setTimeout(() => {
        setSubmitted(true);
        setLoading(false);
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "general",
          message: ""
        });
      }, 800);
    } catch (err: any) {
      setError(err.message || "Validation failed.");
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: "var(--bg)", minHeight: "calc(100vh - 120px)", padding: "48px 0" }}>
      <div className="section-wrap" style={{ padding: "0 24px" }}>
        
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <span style={{ fontSize: "11px", color: "var(--primary)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px" }}>Support Hub</span>
          <h1 style={{ fontSize: "32px", fontWeight: 800, margin: "8px 0 12px" }}>Contact Ticketing Info</h1>
          <p style={{ color: "var(--muted)", maxWidth: "600px", margin: "0 auto", fontSize: "14px" }}>
            Got questions about a booking? Need to adjust your itinerary? We are here to help 24/7.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "32px", alignItems: "start" }}>
          
          {/* Left Column: Direct Contacts */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            
            <div style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px", padding: "28px" }}>
              <h2 style={{ fontSize: "18px", fontWeight: 800, margin: "0 0 20px", borderBottom: "1px solid var(--border)", paddingBottom: "12px", display: "flex", alignItems: "center", gap: "8px" }}>
                <Phone size={18} style={{ color: "var(--primary)" }} />
                <span>Call Center Support</span>
              </h2>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div>
                  <div style={{ fontSize: "11px", color: "var(--muted)", fontWeight: 600 }}>TOLL-FREE NUMBER (USA)</div>
                  <div style={{ fontSize: "18px", fontWeight: 800, color: "var(--primary)", marginTop: "2px" }}>1-800-555-TICKETS</div>
                </div>
                <div>
                  <div style={{ fontSize: "11px", color: "var(--muted)", fontWeight: 600 }}>INTERNATIONAL SUPPORT</div>
                  <div style={{ fontSize: "15px", fontWeight: 700, marginTop: "2px" }}>+1 212-555-0199</div>
                </div>
                <div>
                  <div style={{ fontSize: "11px", color: "var(--muted)", fontWeight: 600 }}>HOURS OF OPERATIONS</div>
                  <div style={{ fontSize: "13px", color: "var(--muted)", marginTop: "2px", display: "flex", alignItems: "center", gap: "6px" }}>
                    <Clock size={14} /> 24 Hours a Day, 7 Days a Week
                  </div>
                </div>
              </div>
            </div>

            <div style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px", padding: "28px" }}>
              <h2 style={{ fontSize: "18px", fontWeight: 800, margin: "0 0 20px", borderBottom: "1px solid var(--border)", paddingBottom: "12px", display: "flex", alignItems: "center", gap: "8px" }}>
                <Mail size={18} style={{ color: "var(--primary)" }} />
                <span>Send Email</span>
              </h2>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div>
                  <div style={{ fontSize: "11px", color: "var(--muted)", fontWeight: 600 }}>GENERAL SUPPORT</div>
                  <div style={{ fontSize: "14px", fontWeight: 700, color: "var(--primary)", marginTop: "2px" }}>support@ticketing.info</div>
                </div>
                <div>
                  <div style={{ fontSize: "11px", color: "var(--muted)", fontWeight: 600 }}>CORPORATE SALES</div>
                  <div style={{ fontSize: "14px", fontWeight: 700, marginTop: "2px" }}>sales@ticketing.info</div>
                </div>
              </div>
            </div>

            <div style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px", padding: "28px" }}>
              <h2 style={{ fontSize: "18px", fontWeight: 800, margin: "0 0 20px", borderBottom: "1px solid var(--border)", paddingBottom: "12px", display: "flex", alignItems: "center", gap: "8px" }}>
                <MapPin size={18} style={{ color: "var(--primary)" }} />
                <span>Corporate Headquarters</span>
              </h2>
              <p style={{ fontSize: "13px", color: "var(--muted)", lineHeight: 1.5, margin: 0 }}>
                Ticketing Info LLC<br />
                500 Fifth Avenue, 24th Floor<br />
                New York, NY 10110, USA
              </p>
            </div>

          </div>

          {/* Right Column: Inquiry Form */}
          <div style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px", padding: "32px", boxShadow: "var(--shadow-sm)" }}>
            
            {submitted ? (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <div style={{ backgroundColor: "var(--green-light)", color: "var(--green)", borderRadius: "50%", padding: "12px", display: "inline-flex", marginBottom: "16px" }}>
                  <MessageSquare size={32} />
                </div>
                <h3 style={{ fontSize: "20px", fontWeight: 800, margin: "0 0 8px" }}>Message Sent Successfully!</h3>
                <p style={{ color: "var(--muted)", fontSize: "13px", marginBottom: "24px" }}>
                  Thank you for contacting us. One of our travel consultants will respond to your inquiry via email within the next 2 hours.
                </p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="btn-primary"
                  style={{ padding: "10px 20px" }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h2 style={{ fontSize: "18px", fontWeight: 800, margin: "0 0 20px" }}>Online Inquiry Form</h2>

                {error && (
                  <div style={{ backgroundColor: "#FEE2E2", border: "1px solid #FCA5A5", color: "#DC2626", padding: "12px", borderRadius: "4px", fontSize: "13px", marginBottom: "16px", lineHeight: 1.4 }}>
                    {error}
                  </div>
                )}

                <div className="form-group">
                  <label>Full Name</label>
                  <input 
                    type="text" 
                    placeholder="Enter your name" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                    style={{ marginTop: "4px" }}
                  />
                </div>

                <div className="form-group">
                  <label>Email Address</label>
                  <input 
                    type="email" 
                    placeholder="ticket@ticketing.info" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                    style={{ marginTop: "4px" }}
                  />
                </div>

                <div className="form-group">
                  <label>Phone Number (Optional)</label>
                  <input 
                    type="tel" 
                    placeholder="e.g. +1 555-0199" 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    style={{ marginTop: "4px" }}
                  />
                </div>

                <div className="form-group">
                  <label>Subject of Inquiry</label>
                  <select 
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    style={{ marginTop: "4px", width: "100%" }}
                  >
                    <option value="general">General Travel Inquiry</option>
                    <option value="billing">Billing & Invoices</option>
                    <option value="change">Trip Cancellations & Dates Changes</option>
                    <option value="feedback">Feedback & Suggestions</option>
                  </select>
                </div>

                <div className="form-group" style={{ marginBottom: "24px" }}>
                  <label>Detailed Message</label>
                  <textarea 
                    placeholder="Write details about your travel dates, route, or issues..." 
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    required
                    style={{ marginTop: "4px", minHeight: "120px" }}
                  />
                </div>

                <button 
                  type="submit" 
                  className="btn-primary" 
                  style={{ width: "100%", padding: "12px", display: "flex", gap: "8px", justifyContent: "center" }}
                >
                  <Send size={16} /> Send Message
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
