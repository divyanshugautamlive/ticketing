"use client";

import React from "react";
import Link from "next/link";
import { X, Phone, LogOut, User, BookOpen, Heart, Sparkles } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { PHONE_NUMBER, NAV_LINKS } from "@/utils/constants";

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
  const { user, isAuthenticated, signOut } = useAuth();

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 200
        }}
      />

      {/* Drawer Panel */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          width: "280px",
          backgroundColor: "var(--card)",
          boxShadow: "-4px 0 16px rgba(0,0,0,0.15)",
          zIndex: 201,
          display: "flex",
          flexDirection: "column",
          padding: "20px",
          overflowY: "auto"
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "between",
            width: "100%",
            marginBottom: "24px"
          }}
        >
          <span style={{ fontWeight: 800, fontSize: "18px", color: "var(--text)" }}>
            Ticketing <span style={{ color: "var(--primary)" }}>Info</span>
          </span>
          <button
            onClick={onClose}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              marginLeft: "auto",
              padding: "4px"
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* User profile banner if authenticated */}
        {isAuthenticated ? (
          <div
            style={{
              backgroundColor: "var(--primary-light)",
              padding: "16px",
              borderRadius: "8px",
              marginBottom: "20px",
              display: "flex",
              alignItems: "center",
              gap: "12px"
            }}
          >
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                backgroundColor: "var(--primary)",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                fontSize: "14px"
              }}
            >
              {user?.firstName.charAt(0)}
              {user?.lastName.charAt(0)}
            </div>
            <div>
              <p style={{ fontWeight: 600, fontSize: "14px", margin: 0, color: "var(--text)" }}>
                Hi, {user?.firstName}
              </p>
              <p style={{ fontSize: "11px", color: "var(--muted)", margin: 0 }}>
                Traveler Account
              </p>
            </div>
          </div>
        ) : (
          <Link
            href="/signin"
            onClick={onClose}
            className="btn-primary"
            style={{
              textAlign: "center",
              padding: "12px",
              textDecoration: "none",
              marginBottom: "20px",
              fontWeight: 600
            }}
          >
            Sign In / Register
          </Link>
        )}

        {/* Navigation Links */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            borderBottom: "1px solid var(--border)",
            paddingBottom: "20px",
            marginBottom: "20px"
          }}
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              style={{
                padding: "10px 8px",
                fontSize: "14px",
                fontWeight: 500,
                color: "var(--text)",
                textDecoration: "none",
                display: "block",
                borderRadius: "4px"
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Support Section */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <p style={{ fontSize: "12px", color: "var(--muted)", margin: 0, fontWeight: 600, textTransform: "uppercase" }}>
            24/7 CUSTOMER SUPPORT
          </p>
          <a
            href={`tel:${PHONE_NUMBER}`}
            className="btn-outline-green"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              padding: "10px",
              textDecoration: "none",
              fontSize: "14px",
              fontWeight: 600
            }}
          >
            <Phone size={14} />
            Call Agent: {PHONE_NUMBER}
          </a>
        </div>

        {/* Sign Out (bottom) */}
        {isAuthenticated && (
          <button
            onClick={() => {
              signOut();
              onClose();
            }}
            style={{
              marginTop: "auto",
              padding: "12px",
              background: "transparent",
              border: "none",
              color: "#DC2626",
              textAlign: "left",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "14px",
              fontWeight: 500,
              cursor: "pointer",
              borderTop: "1px solid var(--border)",
              paddingTop: "20px"
            }}
          >
            <LogOut size={16} />
            Sign Out
          </button>
        )}
      </div>
    </>
  );
}
