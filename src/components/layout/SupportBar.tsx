"use client";

import React from "react";
import { Phone } from "lucide-react";
import { PHONE_NUMBER } from "@/utils/constants";

export default function SupportBar() {
  return (
    <div className="support-bar">
      <div className="section-wrap support-bar-content">
        <div className="support-bar-text">
          <span>Need help booking? Speak to a travel expert 24/7</span>
        </div>
        <a href={`tel:${PHONE_NUMBER}`} className="support-bar-link">
          <Phone size={14} className="support-icon" />
          <span>{PHONE_NUMBER}</span>
        </a>
      </div>
    </div>
  );
}
