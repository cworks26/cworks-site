"use client";

import { Children, useMemo, useState } from "react";
import { IconCheck, IconWhatsApp, IconMail } from "./Icons";

/* Interactive Pricing Deck + 4th-Tier Custom Package Builder.
   Replaces the old 100svh-per-card scroll lock with an instant, lag-free
   layout: users can view all 4 tiers stacked cleanly or filter by clicking
   tier tabs, and mix-and-match features in the 4th "Custom" tier card to
   send directly to WhatsApp (0788368997). */

export type PricingTier = {
  tier: string;
  price: string;
  price_note: string;
  desc: string;
  features: string[];
  popular: boolean;
};

export function CustomTierCard({
  serviceName,
  tiers,
  whatsappUrl = "https://wa.me/256788368997",
  email = "contact@cworksug.com",
}: {
  serviceName: string;
  tiers: PricingTier[];
  whatsappUrl?: string;
  email?: string;
}) {
  // Collect unique selectable features across the service's tiers
  const selectableFeatures = useMemo(() => {
    const map = new Map<string, string>();
    for (const t of tiers) {
      for (const f of t.features) {
        const lower = f.toLowerCase();
        if (lower.includes("timeline agreed") || lower.includes("delivery")) continue;
        if (!map.has(f)) {
          map.set(f, t.tier);
        }
      }
    }
    return Array.from(map.entries()).map(([feature, sourceTier]) => ({
      feature,
      sourceTier,
    }));
  }, [tiers]);

  const [selected, setSelected] = useState<string[]>(() =>
    selectableFeatures.slice(0, 2).map((x) => x.feature)
  );
  const [notes, setNotes] = useState("");

  const toggleFeature = (feat: string) => {
    setSelected((prev) =>
      prev.includes(feat) ? prev.filter((item) => item !== feat) : [...prev, feat]
    );
  };

  const messageBody = useMemo(() => {
    const lines = [
      `Hello CWorks, I'd like a custom quote for ${serviceName}.`,
      "",
      "Selected parts from packages:",
      ...(selected.length > 0
        ? selected.map((s) => `• ${s}`)
        : ["• Custom scope (let's discuss)"]),
    ];
    if (notes.trim()) {
      lines.push("", "Additional details:", notes.trim());
    }
    return lines.join("\n");
  }, [serviceName, selected, notes]);

  const waHref = `${whatsappUrl}?text=${encodeURIComponent(messageBody)}`;
  const mailHref = `mailto:${email}?subject=${encodeURIComponent(
    `Custom ${serviceName} Quote Request`
  )}&body=${encodeURIComponent(messageBody)}`;

  return (
    <div
      className="card card-lift spotlight"
      style={{
        boxShadow: "rgba(63, 185, 236, 0.45) 0 0 0 1px inset",
        background:
          "linear-gradient(180deg, rgba(63, 185, 236, 0.05) 0%, rgba(15, 16, 17, 1) 100%)",
      }}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p
            style={{
              fontSize: 15,
              fontWeight: 510,
              color: "var(--color-paper)",
            }}
          >
            Custom
          </p>
          <p className="t-label mt-1">mix &amp; match from any package</p>
        </div>
        <span
          className="badge"
          style={{
            background: "rgba(63, 185, 236, 0.14)",
            color: "var(--color-cwblue)",
          }}
        >
          Build your own
        </span>
      </div>

      <p
        className="mt-4"
        style={{
          fontSize: 26,
          fontWeight: 510,
          letterSpacing: "-0.022em",
          color: "var(--color-paper)",
        }}
      >
        Custom Quote
      </p>

      <p className="t-body-sm mt-3">
        Want different parts from each package? Tick the exact features you need
        below and we&apos;ll send you a tailored quote on WhatsApp.
      </p>

      <div className="mt-5">
        <p className="t-label mb-3">
          Select the parts you want ({selected.length} selected):
        </p>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {selectableFeatures.map(({ feature, sourceTier }) => {
            const isChecked = selected.includes(feature);
            return (
              <button
                key={feature}
                type="button"
                onClick={() => toggleFeature(feature)}
                aria-pressed={isChecked}
                className="flex items-start gap-2.5 rounded-lg p-2.5 text-left transition-colors"
                style={{
                  background: isChecked
                    ? "rgba(63, 185, 236, 0.12)"
                    : "rgba(255, 255, 255, 0.02)",
                  border: `1px solid ${
                    isChecked ? "rgba(63, 185, 236, 0.45)" : "var(--hairline)"
                  }`,
                  cursor: "pointer",
                }}
              >
                <span
                  className="mt-[2px] flex h-4 w-4 shrink-0 items-center justify-center rounded"
                  style={{
                    background: isChecked
                      ? "var(--color-cwblue)"
                      : "transparent",
                    border: isChecked
                      ? "1px solid var(--color-cwblue)"
                      : "1px solid var(--color-smoke)",
                    color: "var(--color-void)",
                  }}
                >
                  {isChecked && <IconCheck width={11} height={11} />}
                </span>
                <span className="min-w-0 flex-1">
                  <span
                    className="block text-[12.5px] leading-[1.35]"
                    style={{
                      color: isChecked
                        ? "var(--color-paper)"
                        : "var(--color-mist)",
                    }}
                  >
                    {feature}
                  </span>
                  <span
                    className="t-mono mt-0.5 block"
                    style={{ fontSize: 10, color: "var(--color-ash)" }}
                  >
                    from {sourceTier}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-4">
        <label className="flex flex-col gap-1.5">
          <span className="t-label">
            Any specific requirements or features to add? (optional)
          </span>
          <input
            type="text"
            className="input"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="e.g. 4 pages from Standard + priority support from Super..."
          />
        </label>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-acid flex-1"
        >
          <IconWhatsApp width={16} height={16} />
          Get quote on WhatsApp
        </a>
        <a
          href={mailHref}
          className="btn btn-ghost inline-flex items-center justify-center gap-2"
        >
          <IconMail width={14} height={14} />
          Email quote
        </a>
      </div>
    </div>
  );
}

export default function PinnedDeck({
  children,
  labels,
}: {
  children: React.ReactNode;
  labels?: string[];
}) {
  const items = Children.toArray(children);
  const [filter, setFilter] = useState<"all" | number>("all");

  if (items.length === 0) return null;

  return (
    <div className="flex flex-col gap-4">
      {labels && labels.length > 1 && (
        <div
          className="flex flex-wrap items-center gap-1.5 pb-1"
          role="tablist"
          aria-label="Filter pricing tiers"
        >
          <button
            type="button"
            role="tab"
            aria-selected={filter === "all"}
            onClick={() => setFilter("all")}
            className="pill pill-link"
            style={{
              cursor: "pointer",
              background:
                filter === "all"
                  ? "rgba(63, 185, 236, 0.16)"
                  : "rgba(255, 255, 255, 0.04)",
              color:
                filter === "all" ? "var(--color-paper)" : "var(--color-mist)",
              border: `1px solid ${
                filter === "all"
                  ? "rgba(63, 185, 236, 0.45)"
                  : "var(--hairline)"
              }`,
            }}
          >
            All tiers ({items.length})
          </button>
          {labels.map((label, idx) => {
            const active = filter === idx;
            return (
              <button
                key={label}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(idx)}
                className="pill pill-link"
                style={{
                  cursor: "pointer",
                  background: active
                    ? "rgba(63, 185, 236, 0.16)"
                    : "rgba(255, 255, 255, 0.04)",
                  color: active ? "var(--color-paper)" : "var(--color-mist)",
                  border: `1px solid ${
                    active ? "rgba(63, 185, 236, 0.45)" : "var(--hairline)"
                  }`,
                }}
              >
                {label}
              </button>
            );
          })}
        </div>
      )}

      <div className="flex flex-col gap-4">
        {items.map((child, idx) => {
          if (filter !== "all" && filter !== idx) return null;
          return <div key={idx}>{child}</div>;
        })}
      </div>
    </div>
  );
}
