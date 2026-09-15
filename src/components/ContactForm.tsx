"use client";

import { useMemo, useState } from "react";
import site from "@/content/site.json";
import { IconArrowRight, IconCheck } from "./Icons";

/* ==========================================================================
   Enquiry form.
   There is no backend on this site by design — the form composes a complete,
   pre-filled brief and hands it to the user's own mail client (or WhatsApp).
   Nothing is silently swallowed into a void.
   ========================================================================== */

const BUDGETS = [
  "Under UGX 500,000",
  "UGX 500,000 – 1,000,000",
  "UGX 1,000,000 – 3,000,000",
  "Above UGX 3,000,000",
  "Not sure yet",
];

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState(site.services[0].name);
  const [budget, setBudget] = useState(BUDGETS[2]);
  const [brief, setBrief] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const body = useMemo(
    () =>
      [
        `Name: ${name}`,
        `Email: ${email}`,
        phone ? `Phone: ${phone}` : null,
        `Service: ${service}`,
        `Budget: ${budget}`,
        "",
        "Project brief:",
        brief,
      ]
        .filter(Boolean)
        .join("\n"),
    [name, email, phone, service, budget, brief]
  );

  const mailto = `mailto:${site.brand.email}?subject=${encodeURIComponent(
    `Project enquiry — ${name || "New enquiry"}`
  )}&body=${encodeURIComponent(body)}`;

  const waLink = `${site.brand.whatsapp}?text=${encodeURIComponent(
    `Hello CWorks, I'd like to start a project.\n\n${body}`
  )}`;

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!name.trim() || !brief.trim()) {
      setError("Please add your name and a short brief so we know what you need.");
      return;
    }
    setError("");
    window.location.href = mailto;
    setSent(true);
  }

  return (
    <div className="card" style={{ padding: 32 }}>
      {sent ? (
        <div className="flex flex-col items-start">
          <span
            className="flex items-center justify-center"
            style={{
              width: 40,
              height: 40,
              borderRadius: 9999,
              background: "rgba(39,166,68,0.12)",
              color: "var(--color-pulse)",
            }}
          >
            <IconCheck width={18} height={18} />
          </span>
          <p
            className="mt-5"
            style={{ fontSize: 20, fontWeight: 510, color: "var(--color-paper)" }}
          >
            Your mail client should be open.
          </p>
          <p className="t-body-sm mt-3 max-w-[46ch]">
            We&apos;ve pre-filled the whole brief. Send it and we&apos;ll come back
            with a proposal. If nothing opened, use one of the direct channels on
            this page instead.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <a href={mailto} className="btn-acid btn">
              Open the email again
            </a>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              Send it on WhatsApp instead
            </a>
          </div>
          <button
            className="t-caption mt-6 underline decoration-[var(--color-ash)] underline-offset-4"
            onClick={() => setSent(false)}
          >
            Edit the brief
          </button>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="flex flex-col gap-5">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <label className="flex flex-col gap-2">
              <span className="t-label">Your name *</span>
              <input
                className="input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Sarah Nakato"
                required
              />
            </label>
            <label className="flex flex-col gap-2">
              <span className="t-label">Email *</span>
              <input
                className="input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                required
              />
            </label>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <label className="flex flex-col gap-2">
              <span className="t-label">Phone / WhatsApp</span>
              <input
                className="input"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+256 ..."
              />
            </label>
            <label className="flex flex-col gap-2">
              <span className="t-label">What do you need?</span>
              <select
                className="input"
                value={service}
                onChange={(e) => setService(e.target.value)}
                style={{ background: "var(--color-carbon)" }}
              >
                {site.services.map((s) => (
                  <option key={s.slug} value={s.name}>
                    {s.name}
                  </option>
                ))}
                <option value="Not sure yet">Not sure yet — let&apos;s talk</option>
              </select>
            </label>
          </div>

          <label className="flex flex-col gap-2">
            <span className="t-label">Rough budget</span>
            <select
              className="input"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              style={{ background: "var(--color-carbon)" }}
            >
              {BUDGETS.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-2">
            <span className="t-label">Tell us about the project *</span>
            <textarea
              className="input resize-none"
              rows={5}
              value={brief}
              onChange={(e) => setBrief(e.target.value)}
              placeholder="What are you building, what does success look like, and when do you need it?"
              required
            />
          </label>

          {error && (
            <p className="t-caption" style={{ color: "var(--color-coral)" }}>
              {error}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-5 pt-1">
            <button type="submit" className="btn btn-acid">
              Send enquiry
              <IconArrowRight width={15} height={15} />
            </button>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="t-caption transition-colors hover:text-[var(--color-paper)]"
            >
              or message us on WhatsApp
            </a>
          </div>

          <p className="t-label">
            We reply within one working day. Nothing here is shared with anyone
            else.
          </p>
        </form>
      )}
    </div>
  );
}
