import type { Metadata } from "next";
import site from "@/content/site.json";
import PageHead from "@/components/PageHead";
import { Reveal, RevealGroup, RevealItem } from "@/components/Motion";
import { CTABand } from "@/components/sections";
import { IconGitHub, IconLinkedIn, IconBlog } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Team",
  description:
    "The CWorks team — developers, designers, and builders in Kampala, Uganda.",
};

export default function TeamPage() {
  const team = site.team;

  return (
    <>
      <PageHead
        beams
        eyebrow="Team"
        title="A small team that ships."
        body="We're a group of developers and designers from different backgrounds, working out of Kampala on software we care about. No account managers between you and the people writing the code."
      >
        <div className="mt-10 flex flex-wrap gap-2">
          <span className="pill">{team.length} people</span>
          <span className="pill">Kampala, Uganda 🇺🇬</span>
          <span className="pill">Design + engineering in one team</span>
        </div>
      </PageHead>

      <section className="section" style={{ borderTop: "1px solid var(--hairline)" }}>
        <div className="container-cw">
          <RevealGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4" stagger={0.05}>
            {team.map((m) => {
              const initials = m.name
                .split(" ")
                .map((n) => n[0])
                .slice(0, 2)
                .join("");

              return (
                <RevealItem key={m.name}>
                  <div className="card card-lift spotlight flex h-full flex-col">
                    {/* Avatar — real GitHub portrait over the monogram tile;
                        the monogram doubles as the loading/fallback state */}
                    <div
                      className="monogram relative overflow-hidden"
                    >
                      <span aria-hidden>{initials}</span>
                      {"avatar" in m && m.avatar ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                          src={m.avatar}
                          alt=""
                          loading="lazy"
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                      ) : null}
                    </div>

                    <div className="mt-5 flex items-center gap-3">
                      <p
                        style={{
                          fontSize: 17,
                          fontWeight: 510,
                          letterSpacing: "-0.011em",
                          color: "var(--color-paper)",
                        }}
                      >
                        {m.name}
                      </p>
                      {"tag" in m && m.tag ? (
                        <span className="badge" style={{ fontSize: 10 }}>
                          {m.tag}
                        </span>
                      ) : null}
                    </div>
                    <p className="t-label mt-1">{m.role}</p>
                    {"meta" in m && m.meta ? (
                      <p className="t-caption mt-3" style={{ color: "var(--color-ash)" }}>
                        {m.meta}
                      </p>
                    ) : null}
                    {m.bio && <p className="t-body-sm mt-4 flex-1">{m.bio}</p>}

                    <div className="mt-6 flex items-center gap-3">
                      {m.github && (
                        <a
                          href={m.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${m.name} on GitHub`}
                          className="transition-colors hover:text-[var(--color-paper)]"
                          style={{ color: "var(--color-ash)" }}
                        >
                          <IconGitHub width={16} height={16} />
                        </a>
                      )}
                      {m.linkedin && (
                        <a
                          href={m.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${m.name} on LinkedIn`}
                          className="transition-colors hover:text-[var(--color-paper)]"
                          style={{ color: "var(--color-ash)" }}
                        >
                          <IconLinkedIn width={16} height={16} />
                        </a>
                      )}
                      {"blog" in m && m.blog ? (
                        <a
                          href={m.blog}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${m.name}'s site`}
                          className="transition-colors hover:text-[var(--color-paper)]"
                          style={{ color: "var(--color-ash)" }}
                        >
                          <IconBlog width={16} height={16} />
                        </a>
                      ) : null}
                    </div>
                  </div>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </section>

      {/* Values */}
      <section className="section" style={{ borderTop: "1px solid var(--hairline)" }}>
        <div className="container-cw">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <Reveal>
                <p className="t-label" >
                  How we operate
                </p>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="t-heading mt-4 max-w-[14ch]">Principles we don&apos;t trade away.</h2>
              </Reveal>
            </div>

            <RevealGroup className="flex flex-col">
              {[
                ["Show the work", "You see the design before we write code and a preview link before launch. Nothing appears for the first time on launch day."],
                ["Say the real number", "Scope, cost, and timeline are agreed upfront. If something changes the price, you hear it from us before it happens."],
                ["Build for the handover", "You get the full source code and a walkthrough. The goal is a site your team can run, not one only we can touch."],
                ["Local, and proud of it", "We build in Uganda, for Ugandan businesses, with the constraints and realities that come with that."],
              ].map(([t, b]) => (
                <RevealItem key={t}>
                  <div className="py-6" style={{ borderTop: "1px solid var(--hairline)" }}>
                    <p style={{ fontSize: 17, fontWeight: 510, color: "var(--color-paper)" }}>{t}</p>
                    <p className="t-body-sm mt-3 max-w-[62ch]">{b}</p>
                  </div>
                </RevealItem>
              ))}
              <div className="rule" />
            </RevealGroup>
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
