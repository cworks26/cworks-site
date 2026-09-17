"use client";

import dynamic from "next/dynamic";
import { Component, type ReactNode } from "react";

const Beams = dynamic(() => import("./Beams"), { ssr: false });

class BeamsBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? null : this.props.children; }
}

/** Client wrapper so server components can embed Beams safely. */
export default function BeamsLayer(props: Record<string, unknown>) {
  return (
    <BeamsBoundary>
      <div aria-hidden className="absolute inset-0 opacity-[0.55]">
        <Beams {...props} />
      </div>
    </BeamsBoundary>
  );
}
