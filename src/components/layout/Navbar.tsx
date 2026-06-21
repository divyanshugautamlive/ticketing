"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, Menu, User, LogOut, ChevronDown, BookOpen } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { PHONE_NUMBER, NAV_LINKS } from "@/utils/constants";

interface NavbarProps {
  onMenuClick: () => void;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  const pathname = usePathname();
  const { user, isAuthenticated, signOut } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const getInitials = () => {
    if (!user) return "GU";
    return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <header className="navbar">
      <div className="navbar-inner">
        {/* Left Side: Logo & Navigation */}
        <div style={{ display: "flex", alignItems: "center", gap: "36px" }}>
          <Link href="/" className="navbar-logo">
            Ticketing <span>Info</span>
          </Link>

          <nav className="navbar-nav">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={active ? "active" : ""}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right Side: Support phone & User Menu / Actions */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          {/* Phone (Hidden on small screens via CSS or simple media rules, but we can make it display inline) */}
          <a href={`tel:${PHONE_NUMBER}`} className="navbar-phone">
            <Phone size={14} />
            <span style={{ display: "inline" }}>{PHONE_NUMBER}</span>
          </a>

          {/* User Section */}
          {isAuthenticated ? (
            <div style={{ position: "relative" }}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  background: "transparent",
                  border: "none",
                  color: "#fff",
                  cursor: "pointer",
                  padding: "4px 8px",
                  borderRadius: "20px"
                }}
              >
                <div
                  className="nav-avatar"
                  style={{
                    width: "34px",
                    height: "34px",
                    borderRadius: "50%",
                    backgroundColor: "var(--primary)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--nav)",
                    fontSize: "12px",
                    fontWeight: 700
                  }}
                >
                  {getInitials()}
                </div>
                <ChevronDown size={14} />
              </button>
 
              {dropdownOpen && (
                <>
                  <div
                    onClick={() => setDropdownOpen(false)}
                    style={{
                      position: "fixed",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      zIndex: 99
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      right: 0,
                      top: "44px",
                      backgroundColor: "var(--card)",
                      color: "var(--text)",
                      borderRadius: "8px",
                      boxShadow: "var(--shadow-md)",
                      border: "1px solid var(--border)",
                      width: "200px",
                      padding: "8px 0",
                      zIndex: 100,
                      display: "flex",
                      flexDirection: "column"
                    }}
                  >
                    <div style={{ padding: "8px 16px", borderBottom: "1px solid var(--border)" }}>
                      <p style={{ fontWeight: 600, fontSize: "14px", margin: 0 }}>
                        {user?.firstName} {user?.lastName}
                      </p>
                      <p style={{ fontSize: "12px", color: "var(--muted)", margin: 0, overflow: "hidden", textOverflow: "ellipsis" }}>
                        {user?.email}
                      </p>
                    </div>
                    <Link
                      href="/my-trips"
                      onClick={() => setDropdownOpen(false)}
                      style={{
                        padding: "10px 16px",
                        fontSize: "13px",
                        textDecoration: "none",
                        color: "var(--text)",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        cursor: "pointer"
                      }}
                    >
                      <BookOpen size={14} />
                      My Bookings
                    </Link>
                    <button
                      onClick={() => {
                        setDropdownOpen(false);
                        signOut();
                      }}
                      style={{
                        padding: "10px 16px",
                        fontSize: "13px",
                        background: "transparent",
                        border: "none",
                        color: "#DC2626",
                        textAlign: "left",
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        cursor: "pointer",
                        borderTop: "1px solid var(--border)"
                      }}
                    >
                      <LogOut size={14} />
                      Sign Out
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <Link
              href="/signin"
              className="btn-select"
              style={{
                fontSize: "12px",
                padding: "8px 16px",
                textDecoration: "none",
                display: "inline-block"
              }}
            >
              Sign In
            </Link>
          )}

          {/* Hamburger Menu (Mobile Only) */}
          <button onClick={onMenuClick} className="navbar-hamburger">
            <Menu size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}
