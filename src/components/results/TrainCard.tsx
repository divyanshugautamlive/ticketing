"use client";

import React from "react";
import Link from "next/link";
import { Train, Clock, ArrowRight, Check } from "lucide-react";
import type { TrainResult } from "@/types/train";
import { formatDuration, formatPrice } from "@/utils/format";

interface TrainCardProps {
  train: TrainResult;
}

export default function TrainCard({ train }: TrainCardProps) {
  return (
    <div className="train-card">
      {/* Train Info Column */}
      <div className="train-info">
        <div className="train-name" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <Train size={14} className="icon-blue" style={{ color: "var(--primary)" }} />
          <span>{train.name}</span>
        </div>
        <div className="train-number">#{train.trainNumber}</div>
        <div style={{ fontSize: "10px", color: "var(--muted)", marginTop: "4px" }}>
          {train.trainType} &bull; Runs: {train.runsOn.slice(0, 3).join(", ")}
        </div>
      </div>

      {/* Train Route Progress Column */}
      <div className="train-route" style={{ display: "flex", alignItems: "center", gap: "16px", flex: 1 }}>
        <div style={{ textAlign: "left" }}>
          <div className="train-time">{train.departureTime}</div>
          <div className="train-station">{train.origin.code || train.origin.city}</div>
        </div>

        <div className="train-duration">
          <div>{formatDuration(train.durationMinutes)}</div>
          <div style={{ height: "2px", backgroundColor: "var(--border)", margin: "4px 0", position: "relative" }}>
            <div style={{ position: "absolute", top: "-4px", left: "50%", transform: "translateX(-50%)", fontSize: "10px", color: "var(--primary)" }}>&bull;</div>
          </div>
          <div style={{ fontSize: "10px", color: "var(--muted)" }}>Direct</div>
        </div>

        <div style={{ textAlign: "right" }}>
          <div className="train-time">{train.arrivalTime}</div>
          <div className="train-station">{train.destination.code || train.destination.city}</div>
        </div>
      </div>

      {/* Classes badging */}
      <div className="train-classes" style={{ display: "flex", flexDirection: "column", gap: "4px", minWidth: "160px" }}>
        <span style={{ fontSize: "10px", fontWeight: 700, color: "var(--muted)", textTransform: "uppercase" }}>Available Classes</span>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
          {train.classes.map((cls) => (
            <div
              key={cls.id}
              className={`train-class-badge ${cls.isAvailable ? "available" : ""}`}
              title={cls.name}
            >
              {cls.shortName}: {cls.isAvailable ? `${cls.available} Left` : "WL"}
            </div>
          ))}
        </div>
      </div>

      {/* Price Column */}
      <div className="train-price-block">
        <span style={{ fontSize: "11px", color: "var(--muted)" }}>From</span>
        <div className="train-price" style={{ fontSize: "20px", fontWeight: 800, color: "var(--primary)", lineHeight: 1 }}>
          {formatPrice(train.startingPrice)}
        </div>
        
        <Link
          href={`/trains/${train.id}`}
          className="btn-select"
          style={{
            marginTop: "12px",
            textDecoration: "none",
            display: "inline-block",
            textAlign: "center",
            padding: "6px 12px",
            fontSize: "11px"
          }}
        >
          Book Ticket
        </Link>
      </div>
    </div>
  );
}
