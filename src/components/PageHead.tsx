import { Reveal } from "./Motion";
import type { ReactNode } from "react";

/** Shared page header — eyebrow, oversized display headline, body, optional children. */
export default function PageHead({
  eyebrow,
  title,
  body,
  children,
}: {
  eyebrow: string;
  title: string;
  body: string;
  children?: ReactNode;
}) {
  return (
    <header className="snap-block relative flex min-h-[100svh] flex-col justify-center overflow-hidden pt-[132px] pb-16 md:pt-[168px]">
      <div className="grid-lines" aria-hidden />
      <div className="container-cw relative z-10">
        <Reveal delay={0.05}>
          <h1 className="t-display mt-5 max-w-[20ch]">
          {title.split(" ").map((w, i, arr) =>
            i === arr.length - 1 ? (
              <span key={i} className="serif-accent">
                {" "}
                {w}
              </span>
            ) : (
              (i > 0 ? " " : "") + w + " "
            )
          )}
        </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="t-body mt-6 max-w-[58ch]" style={{ color: "var(--color-fog)" }}>
            {body}
          </p>
        </Reveal>
        {children && <Reveal delay={0.15}>{children}</Reveal>}
      </div>
    </header>
  );
}
