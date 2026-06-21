"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { ShieldCheck, Mail, Lock, ArrowRight, Chrome } from "lucide-react";

export default function SignInPage() {
  const router = useRouter();
  const { signIn, isAuthenticated } = useAuth();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // If already logged in, redirect
  React.useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email || !password) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      await signIn(email, password);
      router.push("/");
    } catch (err) {
      setError("Failed to sign in. Please verify your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: "var(--bg)", minHeight: "calc(100vh - 120px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 0" }}>
      <div className="section-wrap" style={{ padding: "0 24px", maxWidth: "800px" }}>
        
        <div 
          style={{ 
            backgroundColor: "var(--card)", 
            borderRadius: "16px", 
            overflow: "hidden", 
            border: "1px solid var(--border)",
            boxShadow: "var(--shadow-xl)",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))"
          }}
        >
          {/* Brand Left Banner */}
          <div 
            style={{ 
              background: "linear-gradient(135deg, var(--nav) 0%, var(--primary) 100%)", 
              color: "#fff", 
              padding: "48px 32px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              position: "relative",
              overflow: "hidden"
            }}
            className="signin-left-panel"
          >
            <div>
              <div style={{ fontSize: "22px", fontWeight: 800, color: "#fff", marginBottom: "32px", display: "flex", gap: "8px", alignItems: "center" }}>
                <span>🛫 Ticketing</span>
                <span style={{ color: "#93C5FD" }}>Info</span>
              </div>
              
              <h2 style={{ fontSize: "28px", fontWeight: 800, color: "#fff", marginBottom: "16px", lineHeight: 1.25 }}>
                Fly Further, Stay Longer
              </h2>
              <p style={{ fontSize: "13.5px", color: "#93C5FD", lineHeight: 1.5, margin: 0 }}>
                Unlock member-only discounts, access your itineraries, and secure 24/7 priority agent support for all flight and hotel routes.
              </p>
            </div>

            <div style={{ zIndex: 2 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "11px", color: "#93C5FD", fontWeight: 600 }}>
                <ShieldCheck size={14} style={{ color: "var(--green-border)" }} />
                <span>100% Encrypted Login Gateway</span>
              </div>
            </div>

            {/* Graphic Circle */}
            <div 
              style={{ 
                position: "absolute", 
                width: "240px", 
                height: "240px", 
                borderRadius: "50%", 
                backgroundColor: "rgba(255, 255, 255, 0.03)", 
                bottom: "-60px", 
                left: "-60px",
                zIndex: 1 
              }}
            />
          </div>

          {/* Form Right Container */}
          <div style={{ padding: "40px 32px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: 800, margin: "0 0 4px" }}>Welcome Back</h2>
            <p style={{ fontSize: "13px", color: "var(--muted)", marginBottom: "24px" }}>
              Sign in to manage bookings & access member pricing.
            </p>

            {error && (
              <div 
                style={{ 
                  backgroundColor: "var(--error-light)", 
                  border: "1.5px solid var(--error)", 
                  color: "var(--error)", 
                  padding: "10px 14px", 
                  borderRadius: "6px", 
                  fontSize: "12px", 
                  fontWeight: 600, 
                  marginBottom: "20px" 
                }}
              >
                {error}
              </div>
            )}

            <form onSubmit={handleSignIn} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label>Email Address</label>
                <div style={{ position: "relative", marginTop: "4px" }}>
                  <Mail 
                    size={16} 
                    style={{ 
                      position: "absolute", 
                      left: "12px", 
                      top: "50%", 
                      transform: "translateY(-50%)", 
                      color: "var(--subtle)" 
                    }} 
                  />
                  <input 
                    type="email" 
                    placeholder="e.g. john.doe@example.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{ paddingLeft: "38px" }}
                  />
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <label>Password</label>
                  <a href="#" style={{ fontSize: "11px", fontWeight: 600 }}>Forgot Password?</a>
                </div>
                <div style={{ position: "relative", marginTop: "4px" }}>
                  <Lock 
                    size={16} 
                    style={{ 
                      position: "absolute", 
                      left: "12px", 
                      top: "50%", 
                      transform: "translateY(-50%)", 
                      color: "var(--subtle)" 
                    }} 
                  />
                  <input 
                    type="password" 
                    placeholder="••••••••" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{ paddingLeft: "38px" }}
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="btn-primary"
                style={{ width: "100%", padding: "12px", fontSize: "14px", display: "flex", gap: "6px", justifyContent: "center", marginTop: "8px" }}
              >
                {loading ? "Signing in..." : "Sign In to Account"} <ArrowRight size={16} />
              </button>
            </form>

            <div style={{ display: "flex", alignItems: "center", margin: "20px 0", gap: "12px" }}>
              <hr style={{ flex: 1, border: "none", borderTop: "1px solid var(--border)" }} />
              <span style={{ fontSize: "11px", color: "var(--subtle)", textTransform: "uppercase", fontWeight: 700 }}>Or Continue With</span>
              <hr style={{ flex: 1, border: "none", borderTop: "1px solid var(--border)" }} />
            </div>

            {/* Social Logins */}
            <button 
              onClick={() => signIn("google.user@gmail.com", "google").then(() => router.push("/"))}
              className="btn-outline-primary"
              style={{ width: "100%", borderColor: "var(--border)", color: "var(--text)", padding: "10px 16px", display: "flex", gap: "8px", justifyContent: "center", fontSize: "13px" }}
            >
              <Chrome size={16} style={{ color: "#EA4335" }} /> Google Account
            </button>

            <div style={{ marginTop: "24px", textAlign: "center", fontSize: "12.5px", color: "var(--muted)" }}>
              Don't have an account? <Link href="#" style={{ fontWeight: 700 }}>Sign Up Now</Link>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
