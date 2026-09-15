import type { SVGProps } from "react";

/* ==========================================================================
   CWorks icon set — custom linear SVG marks, single-colour, 1.5 stroke.
   No icon fonts, no image files: these inherit currentColor so they sit in
   any surface without an optimiser step.
   ========================================================================== */

type P = SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

/* ---- Brand mark ---------------------------------------------------------- */

/** CWorks glyph — angled frame with a monogram core, drawn as pure geometry. */
export function LogoMark(props: P) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden {...props}>
      {/* outer angled frame */}
      <path
        d="M3 27V7.5L8.5 5v19.5"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinejoin="miter"
      />
      <path
        d="M3 5h20.5l-3 3H6"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinejoin="miter"
      />
      {/* inner monogram */}
      <path d="M12 24 20 8" stroke="currentColor" strokeWidth="2.6" />
      <path d="M20 8v16" stroke="currentColor" strokeWidth="2.6" />
      <path d="M20 24l6-16" stroke="currentColor" strokeWidth="2.6" />
    </svg>
  );
}

/* ---- Service icons ------------------------------------------------------- */

export function IconWeb(props: P) {
  return (
    <svg {...base} {...props}>
      <rect x="2.5" y="4" width="19" height="14" rx="2" />
      <path d="M2.5 8h19" />
      <circle cx="5.5" cy="6" r=".6" fill="currentColor" stroke="none" />
      <circle cx="7.7" cy="6" r=".6" fill="currentColor" stroke="none" />
      <path d="M8 21h8M12 18v3" />
    </svg>
  );
}

export function IconDesign(props: P) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3v18M3 12h18" opacity=".35" />
      <circle cx="12" cy="12" r="3.2" />
      <path d="M12 2.5 14 5h-4l2-2.5ZM21.5 12 19 14v-4l2.5 2ZM12 21.5 10 19h4l-2 2.5ZM2.5 12 5 10v4l-2.5-2Z" />
    </svg>
  );
}

export function IconBrand(props: P) {
  return (
    <svg {...base} {...props}>
      <path d="M12 2.5 14.6 9l6.9.4-5.3 4.4 1.7 6.7L12 16.7 6.1 20.5l1.7-6.7L2.5 9.4 9.4 9 12 2.5Z" />
    </svg>
  );
}

export function IconDatabase(props: P) {
  return (
    <svg {...base} {...props}>
      <ellipse cx="12" cy="5.5" rx="7.5" ry="3" />
      <path d="M4.5 5.5v6c0 1.66 3.36 3 7.5 3s7.5-1.34 7.5-3v-6" />
      <path d="M4.5 11.5v6c0 1.66 3.36 3 7.5 3s7.5-1.34 7.5-3v-6" />
    </svg>
  );
}

export function IconSystem(props: P) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="3.5" width="7" height="7" rx="1.6" />
      <rect x="14" y="3.5" width="7" height="7" rx="1.6" />
      <rect x="3" y="13.5" width="7" height="7" rx="1.6" />
      <path d="M14 17h7M17.5 13.5V21" />
    </svg>
  );
}

export function IconMobile(props: P) {
  return (
    <svg {...base} {...props}>
      <rect x="6" y="2.5" width="12" height="19" rx="2.4" />
      <path d="M10.5 5.5h3" />
      <path d="M12 10v6M9.6 13.6 12 16l2.4-2.4" />
    </svg>
  );
}

/* ---- Product / feature icons -------------------------------------------- */

export function IconCart(props: P) {
  return (
    <svg {...base} {...props}>
      <path d="M2.5 3.5h2.2l2.1 9.9h10.4l1.8-7.4H6" />
      <circle cx="9" cy="19" r="1.4" />
      <circle cx="17" cy="19" r="1.4" />
    </svg>
  );
}

export function IconPulse(props: P) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="3.5" width="18" height="14" rx="2" />
      <path d="M6.5 12h2.2l1.3-3 2 6 1.4-3h4.1" />
      <path d="M9 20.5h6" />
    </svg>
  );
}

export function IconPhone(props: P) {
  return (
    <svg {...base} {...props}>
      <path d="M6.6 3.5h2.2l1.5 3.6-1.8 1.3a11 11 0 0 0 5.1 5.1l1.3-1.8 3.6 1.5v2.2a2 2 0 0 1-2.2 2A14.5 14.5 0 0 1 4.6 5.7a2 2 0 0 1 2-2.2Z" />
    </svg>
  );
}

export function IconGraduation(props: P) {
  return (
    <svg {...base} {...props}>
      <path d="M2.5 8.5 12 4.5l9.5 4-9.5 4-9.5-4Z" />
      <path d="M6.5 10.6v4.2c0 1.6 2.5 2.7 5.5 2.7s5.5-1.1 5.5-2.7v-4.2" />
      <path d="M21 9v5" />
    </svg>
  );
}

export function IconHouse(props: P) {
  return (
    <svg {...base} {...props}>
      <path d="M3.5 10.5 12 4l8.5 6.5V20a1 1 0 0 1-1 1h-15a1 1 0 0 1-1-1v-9.5Z" />
      <circle cx="11.5" cy="13.5" r="2.4" />
      <path d="M13.3 15.3 15.5 17.5" />
    </svg>
  );
}

export function IconHeart(props: P) {
  return (
    <svg {...base} {...props}>
      <path d="M12 20s-7.5-4.4-7.5-9.3A4.2 4.2 0 0 1 12 7.9a4.2 4.2 0 0 1 7.5 2.8C19.5 15.6 12 20 12 20Z" />
      <path d="M8.5 12h2l1-1.6 1.4 2.8 1-1.2h2.1" />
    </svg>
  );
}

export function IconDashboard(props: P) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="3.5" width="18" height="17" rx="2" />
      <path d="M3 8.5h18M8.5 20.5v-8M15.5 20.5v-5" />
    </svg>
  );
}

export function IconLayers(props: P) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3 21 7.5 12 12 3 7.5 12 3Z" />
      <path d="M3 12l9 4.5L21 12M3 16.5 12 21l9-4.5" />
    </svg>
  );
}

/* ---- Utility icons ------------------------------------------------------- */

export function IconArrowRight(props: P) {
  return (
    <svg {...base} {...props}>
      <path d="M4.5 12h15M13.5 6l6 6-6 6" />
    </svg>
  );
}

export function IconArrowUpRight(props: P) {
  return (
    <svg {...base} {...props}>
      <path d="M7 17 17 7M8.5 7H17v8.5" />
    </svg>
  );
}

export function IconCheck(props: P) {
  return (
    <svg {...base} {...props}>
      <path d="m4.5 12.5 5 5 10-11" />
    </svg>
  );
}

export function IconMail(props: P) {
  return (
    <svg {...base} {...props}>
      <rect x="2.5" y="5" width="19" height="14" rx="2" />
      <path d="m3.5 6.5 8.5 6.5 8.5-6.5" />
    </svg>
  );
}

export function IconPin(props: P) {
  return (
    <svg {...base} {...props}>
      <path d="M12 21s6.5-6 6.5-11a6.5 6.5 0 1 0-13 0C5.5 15 12 21 12 21Z" />
      <circle cx="12" cy="10" r="2.4" />
    </svg>
  );
}

export function IconClock(props: P) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5.3l3.4 2" />
    </svg>
  );
}

export function IconWhatsApp(props: P) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M12.04 2C6.6 2 2.2 6.4 2.2 11.84c0 1.74.46 3.44 1.32 4.94L2.2 22l5.36-1.4c1.44.78 3.06 1.2 4.72 1.2h.01c5.43 0 9.84-4.4 9.84-9.84C22.13 6.4 17.73 2 12.3 2h-.26Zm5.76 14a2.4 2.4 0 0 1-1.7.68c-.4 0-.9-.13-1.7-.47-.7-.3-1.5-.83-2.36-1.68-.86-.86-1.5-1.72-1.8-2.4-.4-.86-.5-1.4-.5-1.8 0-.7.28-1.32.68-1.72.2-.2.4-.3.6-.3h.44c.14 0 .33 0 .5.4l.62 1.5c.05.12.08.24.02.38-.06.14-.16.3-.28.44l-.28.32c-.1.1-.2.22-.08.44.12.22.5.86 1.08 1.4.74.7 1.36.94 1.58 1.04.22.1.34.08.46-.04.12-.12.5-.6.64-.8.14-.2.28-.16.46-.1l1.46.7c.18.1.3.14.34.22.04.08.04.5-.18.9Z" />
    </svg>
  );
}

export function IconLinkedIn(props: P) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95C21.3 8.75 22 11 22 14.1V21h-4v-6.1c0-1.45-.52-2.44-1.8-2.44-.98 0-1.56.66-1.82 1.3-.1.23-.12.55-.12.87V21h-4V9Z" />
    </svg>
  );
}

export function IconBlog(props: P) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3.6 9h16.8M3.6 15h16.8M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18Z" />
    </svg>
  );
}

export function IconGitHub(props: P) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.36 1.09 2.93.83.09-.65.35-1.09.64-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .26.18.58.69.48A10 10 0 0 0 12 2Z" />
    </svg>
  );
}

export function IconInstagram(props: P) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r=".9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconMenu(props: P) {
  return (
    <svg {...base} {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function IconClose(props: P) {
  return (
    <svg {...base} {...props}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function IconPlay(props: P) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M8 5.5v13l11-6.5-11-6.5Z" />
    </svg>
  );
}

/* ---- Service icon map ---------------------------------------------------- */

export const serviceIcons: Record<
  string,
  (p: P) => React.ReactElement
> = {
  "web-development": IconWeb,
  "ui-ux-design": IconDesign,
  "graphic-design": IconBrand,
  "database-management": IconDatabase,
  "system-building": IconSystem,
};
