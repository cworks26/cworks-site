import { Reveal } from "./Motion";
import BeamsLayer from "./BeamsLayer";
import type { ReactNode } from "react";

/** Shared page header — eyebrow, oversized display headline, body, optional children. */
export default function PageHead({
  eyebrow,
  title,
  body,
  children,
  beams = false,
}: {
  eyebrow: string;
  title: string;
  body: string;
  children?: ReactNode;
  beams?: boolean;
}) {
  return (
    <header className="snap-block relative flex min-h-[100svh] flex-col justify-center overflow-hidden pt-[132px] pb-16 md:pt-[168px]">
      {beams && (
        <BeamsLayer
          beamWidth={2.6}
          beamHeight={16}
          beamNumber={14}
          lightColor="#3fb9ec"
          beamColor="#06121c"
          backgroundColor="#08090a"
          speed={1.9}
          noiseIntensity={1.4}
          scale={0.26}
          rotation={14}
        />
      )}
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
