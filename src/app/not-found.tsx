import Link from "next/link";
import { IconArrowRight } from "@/components/Icons";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden pt-[132px]">
      <div className="grid-lines" aria-hidden />
      <div className="container-cw relative z-10">
        <p className="t-mono" style={{ color: "var(--color-acid)" }}>
          404
        </p>
        <h1 className="t-display mt-5 max-w-[18ch]">This page isn&apos;t here.</h1>
        <p className="t-body mt-6 max-w-[50ch]" style={{ color: "var(--color-fog)" }}>
          The link may be old or mistyped. Head back to the home page, or tell us
          what you were looking for and we&apos;ll point you at it.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-5">
          <Link href="/" className="btn btn-acid">
            Back to home
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 transition-colors hover:text-[var(--color-paper)]"
            style={{ fontSize: 14, color: "var(--color-mist)" }}
          >
            Contact us
            <IconArrowRight width={15} height={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
