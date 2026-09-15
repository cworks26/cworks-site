import {
  IconDashboard,
  IconCart,
  IconSystem,
  IconLayers,
  IconCheck,
} from "./Icons";

/* ==========================================================================
   Product frame — a product-screenshot-first surface.
   Linear's imagery rule: the visual content is the product UI itself, never
   stock photography. These mocks are drawn in code so they stay crisp,
   theme-consistent, and impossible to date.
   ========================================================================== */

export function Chrome({ url }: { url: string }) {
  return (
    <div className="chrome">
      <span className="chrome-dot" />
      <span className="chrome-dot" />
      <span className="chrome-dot" />
      <span
        className="t-mono ml-2 truncate"
        style={{ color: "var(--color-ash)", fontSize: 11 }}
      >
        {url}
      </span>
    </div>
  );
}

const NAV_ROWS = [
  { icon: IconDashboard, label: "Overview", active: true },
  { icon: IconCart, label: "Sales" },
  { icon: IconSystem, label: "Inventory" },
  { icon: IconLayers, label: "Reports" },
];

const KPIS = [
  { label: "Tickets sold", value: "8,412", delta: "+18.4%" },
  { label: "Revenue", value: "UGX 61.2M", delta: "+22.1%" },
  { label: "Checked in", value: "6,940", delta: "82.5%" },
];

/** Ticketing / sales operations dashboard — the CWorks product language. */
export function DashboardFrame() {
  return (
    <div className="frame">
      <Chrome url="app.cworksug.com/overview" />
      <div className="flex" style={{ minHeight: 340 }}>
        {/* Sidebar */}
        <aside
          className="hidden w-[190px] shrink-0 flex-col gap-1 p-3 sm:flex"
          style={{ background: "var(--color-void)", borderRight: "1px solid var(--hairline)" }}
        >
          <div className="mb-3 flex items-center gap-2 px-2 py-1">
            <span
              style={{
                width: 18,
                height: 18,
                borderRadius: 5,
                background: "var(--color-acid)",
                display: "inline-block",
              }}
            />
            <span style={{ fontSize: 12, fontWeight: 510, color: "var(--color-mist)" }}>
              Vybent
            </span>
          </div>
          {NAV_ROWS.map((r) => (
            <div
              key={r.label}
              className="flex items-center gap-2 rounded-md px-2 py-[7px]"
              style={{
                background: r.active ? "rgba(255,255,255,0.05)" : "transparent",
                color: r.active ? "var(--color-paper)" : "var(--color-ash)",
                fontSize: 12,
              }}
            >
              <r.icon width={13} height={13} />
              {r.label}
            </div>
          ))}
        </aside>

        {/* Main */}
        <div className="min-w-0 flex-1 p-4">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <p style={{ fontSize: 12, color: "var(--color-ash)" }}>Live sales</p>
              <p style={{ fontSize: 15, fontWeight: 510, color: "var(--color-paper)" }}>
                Kampala Arena · Sat 14 Sep
              </p>
            </div>
            <span className="pill">
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: 9999,
                  background: "var(--color-pulse)",
                  display: "inline-block",
                }}
              />
              Live
            </span>
          </div>

          <div className="mb-3 grid grid-cols-3 gap-2">
            {KPIS.map((k) => (
              <div
                key={k.label}
                className="rounded-md p-2"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  boxShadow: "rgba(255,255,255,0.06) 0 0 0 1px inset",
                }}
              >
                <p style={{ fontSize: 10, color: "var(--color-ash)" }}>{k.label}</p>
                <p
                  style={{
                    fontSize: 15,
                    fontWeight: 510,
                    color: "var(--color-paper)",
                    letterSpacing: "-0.011em",
                  }}
                >
                  {k.value}
                </p>
                <p style={{ fontSize: 10, color: "var(--color-pulse)" }}>{k.delta}</p>
              </div>
            ))}
          </div>

          {/* Chart */}
          <div
            className="rounded-md p-3"
            style={{
              background: "rgba(255,255,255,0.02)",
              boxShadow: "rgba(255,255,255,0.06) 0 0 0 1px inset",
            }}
          >
            <div className="mb-2 flex items-center justify-between">
              <span style={{ fontSize: 11, color: "var(--color-ash)" }}>
                Sales by day
              </span>
              <span className="t-mono" style={{ fontSize: 10, color: "var(--color-ash)" }}>
                UGX
              </span>
            </div>
            <div className="flex h-[74px] items-end gap-[6px]">
              {[34, 52, 41, 68, 57, 79, 88, 71, 94, 62, 83, 96].map((h, i) => (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    height: `${h}%`,
                    borderRadius: 2,
                    background:
                      i === 11 ? "var(--color-acid)" : "rgba(208,214,224,0.16)",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Rows */}
          <div className="mt-3 flex flex-col gap-[6px]">
            {[
              ["VIP · Table 4", "UGX 1,200,000", "Paid"],
              ["General · Gate B", "UGX 45,000", "Paid"],
              ["Early bird", "UGX 30,000", "Pending"],
            ].map((r) => (
              <div
                key={r[0]}
                className="flex items-center justify-between rounded-md px-2 py-[6px]"
                style={{ background: "rgba(255,255,255,0.02)" }}
              >
                <span style={{ fontSize: 11, color: "var(--color-mist)" }}>{r[0]}</span>
                <span className="flex items-center gap-3">
                  <span className="t-mono" style={{ fontSize: 10, color: "var(--color-ash)" }}>
                    {r[1]}
                  </span>
                  <span className="badge">{r[2]}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/** Inventory system mock — used on the services / work pages. */
export function InventoryFrame() {
  const rows = [
    ["Cement 50kg", "1,240", "In stock"],
    ["Iron sheets 3m", "318", "Low"],
    ["Paint — white 20L", "76", "In stock"],
    ["Nails 4in (box)", "12", "Reorder"],
  ];
  const tone: Record<string, string> = {
    "In stock": "var(--color-pulse)",
    Low: "var(--color-acid)",
    Reorder: "var(--color-coral)",
  };

  return (
    <div className="frame">
      <Chrome url="app.cworksug.com/inventory" />
      <div className="p-4">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <p style={{ fontSize: 12, color: "var(--color-ash)" }}>Stock levels</p>
            <p style={{ fontSize: 15, fontWeight: 510, color: "var(--color-paper)" }}>
              Main store · Kampala
            </p>
          </div>
          <span className="pill">Sync 2m ago</span>
        </div>

        <div
          className="overflow-hidden rounded-md"
          style={{ boxShadow: "rgba(255,255,255,0.06) 0 0 0 1px inset" }}
        >
          <div
            className="grid grid-cols-[1.6fr_0.7fr_0.9fr] px-3 py-2"
            style={{ background: "rgba(255,255,255,0.03)" }}
          >
            {["Item", "Qty", "Status"].map((h) => (
              <span key={h} style={{ fontSize: 10, color: "var(--color-ash)" }}>
                {h}
              </span>
            ))}
          </div>
          {rows.map((r, i) => (
            <div
              key={r[0]}
              className="grid grid-cols-[1.6fr_0.7fr_0.9fr] items-center px-3 py-[9px]"
              style={{
                borderTop: i === 0 ? "none" : "1px solid var(--hairline)",
                background: "rgba(255,255,255,0.01)",
              }}
            >
              <span style={{ fontSize: 11, color: "var(--color-mist)" }}>{r[0]}</span>
              <span className="t-mono" style={{ fontSize: 10, color: "var(--color-fog)" }}>
                {r[1]}
              </span>
              <span className="flex items-center gap-[6px]" style={{ fontSize: 10, color: tone[r[2]] }}>
                <span
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: 9999,
                    background: tone[r[2]],
                    display: "inline-block",
                  }}
                />
                {r[2]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Deployment / handover mock — the "we ship it" panel. */
export function DeployFrame() {
  const steps = [
    ["Design approved", true],
    ["Build complete", true],
    ["Browser QA passed", true],
    ["Domain + SSL connected", true],
    ["Handover & source code", false],
  ];
  return (
    <div className="frame">
      <Chrome url="app.cworksug.com/deployments" />
      <div className="p-4">
        <p style={{ fontSize: 12, color: "var(--color-ash)" }}>Project pipeline</p>
        <p className="mb-3" style={{ fontSize: 15, fontWeight: 510, color: "var(--color-paper)" }}>
          Client portal · standard build
        </p>
        <div className="flex flex-col gap-[7px]">
          {steps.map(([label, done]) => (
            <div
              key={String(label)}
              className="flex items-center gap-3 rounded-md px-3 py-[9px]"
              style={{
                background: "rgba(255,255,255,0.02)",
                boxShadow: "rgba(255,255,255,0.05) 0 0 0 1px inset",
              }}
            >
              <span
                className="flex shrink-0 items-center justify-center"
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: 9999,
                  background: done ? "rgba(39,166,68,0.15)" : "rgba(255,255,255,0.04)",
                  color: done ? "var(--color-pulse)" : "var(--color-ash)",
                }}
              >
                {done ? (
                  <IconCheck width={10} height={10} />
                ) : (
                  <span style={{ width: 4, height: 4, borderRadius: 9999, background: "currentColor" }} />
                )}
              </span>
              <span style={{ fontSize: 11.5, color: done ? "var(--color-mist)" : "var(--color-ash)" }}>
                {label}
              </span>
              {done && (
                <span className="t-mono ml-auto" style={{ fontSize: 10, color: "var(--color-ash)" }}>
                  done
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export const productFrames = {
  dashboard: DashboardFrame,
  inventory: InventoryFrame,
  deploy: DeployFrame,
};
