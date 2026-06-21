"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, Calendar, User } from "lucide-react";

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { label: "Home", href: "/", icon: Home },
    { label: "Search", href: "/search", icon: Search },
    { label: "My Trips", href: "/my-trips", icon: Calendar },
    { label: "Account", href: "/signin", icon: User }
  ];

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        height: "56px",
        backgroundColor: "var(--card)",
        borderTop: "1px solid var(--border)",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        zIndex: 100,
        paddingBottom: "env(safe-area-inset-bottom, 0px)"
      }}
      className="mobile-only-flex"
    >
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));

        return (
          <Link
            key={item.href}
            href={item.href}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
              height: "100%",
              textDecoration: "none",
              color: isActive ? "var(--primary)" : "var(--muted)",
              gap: "4px"
            }}
          >
            <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
            <span style={{ fontSize: "10px", fontWeight: isActive ? 600 : 500 }}>
              {item.label}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
