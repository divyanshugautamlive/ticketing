"use client";

import React, { useState } from "react";
import SupportBar from "./SupportBar";
import Navbar from "./Navbar";
import MobileDrawer from "./MobileDrawer";
import BottomNav from "./BottomNav";
import Footer from "./Footer";
import { SearchProvider } from "@/context/SearchContext";
import { AuthProvider } from "@/context/AuthContext";
import { BookingProvider } from "@/context/BookingContext";
import { SavedProvider } from "@/context/SavedContext";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <AuthProvider>
      <SearchProvider>
        <BookingProvider>
          <SavedProvider>
            <div className="app-layout" style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
              <SupportBar />
              
              <Navbar onMenuClick={() => setMobileMenuOpen(true)} />
              
              <MobileDrawer isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
              
              {/* Main content area */}
              <main className="main-content">
                {children}
              </main>
              
              <Footer />
              
              <BottomNav />
            </div>
          </SavedProvider>
        </BookingProvider>
      </SearchProvider>
    </AuthProvider>
  );
}
