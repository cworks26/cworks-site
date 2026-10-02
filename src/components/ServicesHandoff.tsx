"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/* ==========================================================================
   ServicesHandoff — the black-to-ivory handoff, pinned on the SERVICES section.

   The services band ("What we do") is the stage. Its content is real and
   interactive (five linked service rows), so unlike a decorative stage it must
   fit the viewport or the pin would crop live links. It is therefore only
   pinned when it genuinely fits; on small viewports (measured: ~1700px of
   content in an 844px viewport on a phone) the pin is skipped entirely and the
   section simply scrolls, with the ivory ground never revealed.

   One scrubbed timeline, two beats:

     1. the section's own content slides up and out, fading   (~first 35%)
     2. the ivory ground fades in underneath it               (~remaining 65%)

   A scrub is a pure function of progress, so there is no paused pre-state to
   park and no progress state machine to sync — the content sits at its real
   CSS values until the trigger's progress actually moves, and reverses cleanly.

   The reveal is `autoAlpha` on one absolutely-positioned ground, never a tween
   of `background-color` (repaints a viewport-sized layer every frame) and
   never a `clip-path` string (browsers collapse `inset()` to a shorthand and
   snap).

   The work band that follows is already `.band-ivory` and carries no borderTop,
   so this empty ivory ground flows straight into it with no seam.

   WHY THERE IS NO gsap.context HERE: `build()` also runs from the refreshInit /
   fonts.ready / load callbacks below, and gsap.context only records animations
   created while its own function body is executing — a trigger built from a
   later callback is invisible to `ctx.revert()`, so the pin would outlive the
   component, leaking its pin-spacer and inline styles across route changes.
   Ownership is therefore explicit: kill the trigger and timeline by hand.
   ========================================================================== */

export default function ServicesHandoff({ sectionId = "services" }: { sectionId?: string }) {
  useEffect(() => {
    if (document.documentElement.classList.contains("static")) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const section = document.getElementById(sectionId);
    const ground = section?.querySelector<HTMLElement>(".services-handoff__ground");
    const content = section?.querySelectorAll<HTMLElement>(".container-cw > *");
    if (!section || !ground || !content || content.length === 0) return;

    gsap.registerPlugin(ScrollTrigger);

    let tl: gsap.core.Timeline | null = null;
    let trigger: ScrollTrigger | null = null;

    /* The pin requires the section to fit the viewport — it holds live links,
       and a taller-than-viewport pinned element crops them for the whole hold
       (GSAP's documented failure). Re-checked on every refresh because row
       heights change with fonts and wrapping. If it does not fit, no trigger
       and no timeline are created at all and the ground stays at its CSS
       opacity 0 — phones simply get a hard black→ivory cut, which is the right
       trade against a pin that crops live links. */
    const build = () => {
      const shouldPin = section.offsetHeight <= window.innerHeight;

      trigger?.kill();
      trigger = null;
      tl?.kill();
      tl = null;

      gsap.set(ground, { autoAlpha: 0 });
      gsap.set(content, { clearProps: "all" });

      if (!shouldPin) return;

      tl = gsap
        .timeline({ defaults: { ease: "none" } })
        /* autoAlpha, not opacity: opacity alone leaves the six focusable links
           in the tab order and still hit-testable while invisible, so a keyboard
           user could focus a link with no visible focus ring, and a mouse user
           could click an invisible row straight through to /services#slug.
           visibility:hidden removes both. */
        .to(content, { y: -60, autoAlpha: 0, pointerEvents: "none", duration: 0.35 })
        // the ground beneath it turns ivory
        .to(ground, { autoAlpha: 1, duration: 0.65 }, 0.35);

      trigger = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=100%",
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        scrub: true,
        animation: tl,
      });
    };

    build();

    /* Layout keeps moving after mount — webfonts swap, rows re-wrap. Rebuild
       when it settles so the pin is measured against the real layout and a
       viewport that stops fitting (or starts fitting) is caught. Every listener
       registered here is removed in the cleanup below. */
    ScrollTrigger.addEventListener("refreshInit", build);

    const onLoad = () => ScrollTrigger.refresh();
    if (document.readyState === "complete") ScrollTrigger.refresh();
    else window.addEventListener("load", onLoad);

    /* document.fonts.ready can resolve after unmount; guard it so a late
       refresh cannot touch a torn-down component. */
    let cancelled = false;
    if (document.fonts?.ready) {
      void document.fonts.ready.then(() => {
        if (!cancelled) ScrollTrigger.refresh();
      });
    }

    return () => {
      cancelled = true;
      window.removeEventListener("load", onLoad);
      ScrollTrigger.removeEventListener("refreshInit", build);
      trigger?.kill();
      tl?.kill();
      trigger = null;
      tl = null;
      /* Leave no inline state behind — if the section is ever re-mounted or
         screenshotted it must read as plain black with its content visible. */
      gsap.set(ground, { clearProps: "all" });
      gsap.set(content, { clearProps: "all" });
    };
  }, [sectionId]);

  return null;
}
