"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import gsap from "gsap";
import "./AccordionGallery.css";

/* AccordionGallery — React Bits (reactbits.dev), TS-adapted for CWorks.
   Horizontal gallery of product panels: hover/Enter expands the pointed panel
   and the rest collapse to strips.

   Additions over the pasted original:
   - `fit` / `position` per item, because the real product art is mixed aspect
     (Vybent 1.78, OAE 1.60 landscape; What About Anime 0.97, Kaizoq 0.75
     portrait) and one crop rule cannot serve all four.
   - prefers-reduced-motion collapses every tween to duration 0 (state still
     changes, nothing animates).
   - timelines are tracked and reverted on unmount.
   - the original's media parallax drift is gone: the media window is exactly as
     wide as its panel here, so any lateral drift exposed an empty band and
     dragged the panel caption out of frame (the caption lives inside the media).
   Panel ground stays dark by design (it is a device plate, not body copy), so
   the type inside the panel is deliberately set to white, not band tokens. */

export type AccordionItem = {
  image: string;
  label: string;
  link?: string;
  alt?: string;
  /** How the art sits in the panel window. */
  fit?: "cover" | "contain";
  /** CSS object-position / background-position for the art. */
  position?: string;
  /** Keep the panel out of the row. */
  hidden?: boolean;
};

type AccordionGalleryProps = {
  items: AccordionItem[];
  /** Panel index expanded on load. */
  defaultIndex?: number;
  /** Panel height in px (CSS also sets 70vh below 900px). */
  height?: number;
  gap?: number;
  /** Share of the row the expanded panel takes, before the media ratio. */
  expandRatio?: number;
  trigger?: "hover" | "focus";
  ease?: string;
  className?: string;
};

const MOBILE_QUERY = "(max-width: 520px)";

export default function AccordionGallery({
  items,
  defaultIndex = 0,
  height = 470,
  gap = 12,
  expandRatio = 0.62,
  trigger = "hover",
  ease = "power3.out",
  className = "",
}: AccordionGalleryProps) {
  const visible = items.filter((item) => !item.hidden);

  const galleryRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLElement | null)[]>([]);
  const mediaRefs = useRef<(HTMLElement | null)[]>([]);
  const timelines = useRef<gsap.core.Timeline[]>([]);
  const expandedRef = useRef<number | null>(defaultIndex);
  const [expanded, setExpanded] = useState<number | null>(defaultIndex);

  const killTimelines = useCallback(() => {
    for (const tl of timelines.current) tl.kill();
    timelines.current = [];
  }, []);

  const closedVars = useCallback(() => {
    const gallery = galleryRef.current;
    const count = visible.length;
    if (!gallery || count === 0) return null;

    const styles = getComputedStyle(gallery);
    const usable = gallery.clientWidth - parseFloat(styles.paddingLeft || "0") * 2;
    // read the gap the browser is actually laying out (it changes on mobile),
    // so the width math can never disagree with the flex row
    const effGap = parseFloat(styles.columnGap || styles.gap || "0") || 0;
    const gaps = effGap * (count - 1);
    if (usable <= 0 || gaps >= usable) return null;

    // The row is filled exactly: expanded + (count-1) collapsed + gaps === usable.
    // (The original divided the row evenly and then grew the expanded panel on
    // top of that, which overflowed the row.)
    const expandedWidth = (usable - gaps) * expandRatio;
    const collapsedWidth =
      count > 1 ? (usable - gaps - expandedWidth) / (count - 1) : expandedWidth;

    // no `+ gap` here: the flex gap already spaces the panels, so adding it to
    // each width would overflow the row by (count - 1) * gap
    return { count, expandedWidth, collapsedWidth };
  }, [expandRatio, visible.length]);

  const resetPanels = useCallback(
    (skipIndex: number) => {
      const duration = reduced() ? 0 : 1;
      const vars = closedVars();
      if (!vars) return;

      visible.forEach((item, i) => {
        const panel = panelRefs.current[i];
        const media = mediaRefs.current[i];
        if (!panel || !media) return;

        /* Grow is a constant, never animated: letting width and flex-grow
           animate together adds free space while the widths are still wide, so
           the row overflowed its container for the length of the tween. Pin the
           width first (so zeroing grow cannot collapse the panel), then let the
           widths alone carry the row: the panels' deltas cancel exactly —
           expanded gains what the collapsed ones lose — so the row sums to the
           container on every frame. */
        const from = panel.getBoundingClientRect().width;
        gsap.set(panel, { flexGrow: 0, width: from });
        gsap.set(media, { width: from });

        const inX = reduced() ? 1 : 0.6;
        const inY = reduced() ? 1 : 0.6;

        const tl = gsap
          .timeline()
          .to(
            media,
            {
              x: 0,
              duration,
              ease,
            },
            0
          )
          .to(
            [panel, media],
            {
              width: vars.collapsedWidth,
              duration,
              ease,
            },
            0
          );

        if (i !== skipIndex) {
          const textInner = panel.querySelector<HTMLElement>(".ag-panel__text-inner");
          if (textInner && item.label) {
            tl.to(
              textInner,
              {
                opacity: 0,
                duration,
                ease,
              },
              0
            ).to(
              textInner,
              {
                x: (1 - inX) * 100,
                y: (1 - inY) * 100,
                scaleX: inX,
                scaleY: inY,
                duration: duration * 0.8,
                transformOrigin: "left top",
                ease,
              },
              0
            );
          }
        }

        timelines.current.push(tl);
      });
    },
    [closedVars, ease, visible]
  );

  const expandPanel = useCallback(
    (index: number) => {
      const panel = panelRefs.current[index];
      const media = mediaRefs.current[index];
      const vars = closedVars();
      if (!panel || !media || !vars) return;

      const duration = reduced() ? 0 : 1;
      killTimelines();
      resetPanels(index);

      const textInner = panel.querySelector<HTMLElement>(".ag-panel__text-inner");

      const tl = gsap
        .timeline()
        .to(
          [media, panel],
          {
            width: vars.expandedWidth,
            duration,
            ease,
          },
          0
        );

      if (textInner) {
        tl.fromTo(
          textInner,
          {
            opacity: 0,
            x: -50,
            y: 50,
            scaleX: 1.2,
            scaleY: 1.2,
            transformOrigin: "left top",
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            scaleX: 1,
            scaleY: 1,
            duration: duration * 0.8,
            ease,
          },
          duration * 0.2
        );
      }

      timelines.current.push(tl);
      expandedRef.current = index;
      setExpanded(index);
    },
    [closedVars, ease, killTimelines, resetPanels]
  );

  const hoverExpand = trigger === "hover";

  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery) return;

    const reducedMotion = reduced();
    const mobile = window.matchMedia(MOBILE_QUERY);

    const applyVars = () => {
      // height and gap are JS-owned so the stylesheet default (which the media
      // query can override) and the flex math can never disagree
      const narrow = window.innerWidth <= 900;
      if (narrow) {
        gallery.style.removeProperty("--ag-height");
        gallery.style.setProperty("--ag-gap", "8px");
      } else {
        gallery.style.setProperty("--ag-height", `${height}px`);
        gallery.style.setProperty("--ag-gap", `${gap}px`);
      }

      /* Deliberately NOT setting --ag-media-size here: the stylesheet default is
         100%, so the media never exceeds its own panel, and GSAP's width tweens
         own the real geometry from the first frame. A stale pixel value in that
         var was letting a 576px media sit inside a 118px panel. */
      closedVars();
    };

    /* On resize the pixel widths GSAP left inline go stale, so re-apply the
       whole row instantly (no tween) and let the row add up again. */
    const relayout = () => {
      const vars = closedVars();
      if (!vars) return;
      applyVars();
      const open = expandedRef.current ?? defaultIndex;
      visible.forEach((_, i) => {
        const panel = panelRefs.current[i];
        const media = mediaRefs.current[i];
        const isOpen = i === open;
        const width = isOpen ? vars.expandedWidth : vars.collapsedWidth;
        if (panel) gsap.set(panel, { width, flexGrow: 0 });
        if (media) gsap.set(media, { width, x: 0 });
      });
    };

    applyVars();
    if (!reducedMotion) expandPanel(defaultIndex);

    const onMobile = () => {
      if (mobile.matches) killTimelines();
    };

    mobile.addEventListener("change", onMobile);
    window.addEventListener("resize", relayout);

    return () => {
      mobile.removeEventListener("change", onMobile);
      window.removeEventListener("resize", relayout);
      killTimelines();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [closedVars, defaultIndex]);

  const wrapperStyle = {
    "--ag-expand-ratio": expandRatio,
  } as CSSProperties;

  return (
    <div
      ref={galleryRef}
      className={`accordion-gallery ${className}`.trim()}
      style={wrapperStyle}
      role="list"
    >
      {visible.map((item, index) => {
        const isExpanded = expanded === index;
        const panelClass = `ag-panel${isExpanded ? " is-expanded" : ""}`;

        const media = (
          <div
            ref={(el) => {
              mediaRefs.current[index] = el;
            }}
            className="ag-panel__media"
            role="img"
            aria-label={item.alt ?? item.label}
            style={{
              backgroundImage: `url(${item.image})`,
              backgroundSize: item.fit ?? "cover",
              backgroundPosition: item.position ?? "center",
            }}
          >
            <div className="ag-panel__overlay">
              <div className="ag-panel__text">
                <div className="ag-panel__text-inner">
                  <h3 className="ag-panel__title">{item.label}</h3>
                  {item.alt ? <p className="ag-panel__subtitle">{item.alt}</p> : null}
                </div>
              </div>
            </div>
            <span className="ag-panel__tap-toggle" aria-hidden="true">
              View
            </span>
          </div>
        );

        const inner = item.link ? (
          <a
            className="ag-panel__base"
            href={item.link}
            target="_blank"
            rel="noopener"
            aria-label={item.label}
          >
            {media}
          </a>
        ) : (
          <div className="ag-panel__base">{media}</div>
        );

        return (
          <div
            key={item.label}
            ref={(el) => {
              panelRefs.current[index] = el;
            }}
            className={panelClass}
            role="listitem"
            onMouseEnter={hoverExpand ? () => expandPanel(index) : undefined}
            onFocus={trigger === "focus" ? () => expandPanel(index) : undefined}
            tabIndex={item.link ? -1 : 0}
          >
            {inner}
          </div>
        );
      })}
    </div>
  );
}

function reduced() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
