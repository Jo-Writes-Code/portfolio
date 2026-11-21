import { ArrowUpRight } from "lucide-react";
import { CONTACT, OWNER, PROJECTS } from "@/data/projects";

const pad = (n: number) => String(n).padStart(2, "0");

export function WorkIndex() {
  return (
    <section id="work" className="px-5 sm:px-8 lg:px-12 py-20 lg:py-28">
      <div className="flex items-baseline justify-between border-b border-[#1d1c1a] pb-3">
        <h2 className="display italic text-2xl">The Work</h2>
        <p className="text-[13px] text-[#8a8882] tabular-nums">
          {pad(PROJECTS.length)} projects
        </p>
      </div>

      <ul>
        {PROJECTS.map((p, i) => {
          const inner = (
            <>
              <span className="text-[13px] text-[#8a8882] tabular-nums pt-2 lg:pt-4 w-10 shrink-0">
                {pad(i + 1)}
              </span>
              <span className="flex-1 min-w-0">
                <span
                  className={`display block text-[clamp(2rem,6vw,5rem)] transition-all duration-300 ${
                    p.wip ? "text-[#8a8882]" : "text-[#1d1c1a] group-hover:italic"
                  }`}
                >
                  {p.name}
                </span>
                <span className="mt-1 block text-[14px] text-[#8a8882]">
                  {p.kind} &middot; {p.place}
                </span>
              </span>
              <span className="hidden sm:flex items-center gap-1 text-[13px] pt-3 lg:pt-6 shrink-0">
                {p.wip ? (
                  <span className="italic text-[#8a8882]">Work in progress</span>
                ) : (
                  <>
                    {p.url?.replace("https://", "")}
                    <ArrowUpRight className="size-4" aria-hidden />
                  </>
                )}
              </span>
            </>
          );

          return (
            <li key={p.slug} className="border-b border-[#dcdad3]">
              {p.url ? (
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex gap-4 py-6"
                >
                  {inner}
                </a>
              ) : (
                <div className="group flex gap-4 py-6">{inner}</div>
              )}
              {p.wip && (
                <span className="sm:hidden block pb-5 pl-14 italic text-[13px] text-[#8a8882]">
                  Work in progress
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export function About() {
  const hasContact = Boolean(CONTACT.email || CONTACT.whatsapp);

  return (
    <>
      <section
        id="about"
        className="px-5 sm:px-8 lg:px-12 py-20 lg:py-28 grid gap-8 lg:grid-cols-[21vw_1fr] lg:gap-0"
      >
        <h2 className="display italic text-2xl lg:pl-0">About</h2>
        <div className="max-w-3xl">
          <p
            className="text-[clamp(1.6rem,3.4vw,2.75rem)] leading-[1.15]"
            style={{ fontFamily: '"Bodoni Moda", Georgia, serif' }}
          >
            I build simple, working websites for small businesses in Tanzania:
            a grill, a bakery, and the people behind them.
          </p>
          <p className="mt-6 max-w-lg text-[#4a4843]">
            Each site is made to do one job well. Show the food, say when you
            are open, and make it easy to call or message to order.
          </p>

          {hasContact && (
            <div id="contact" className="mt-10 text-[15px]">
              <p className="text-[12px] uppercase tracking-[0.12em] text-[#8a8882] mb-2">
                Contact
              </p>
              <ul className="space-y-1">
                {CONTACT.email && (
                  <li>
                    <a href={`mailto:${CONTACT.email}`} className="ulink">
                      {CONTACT.email}
                    </a>
                  </li>
                )}
                {CONTACT.whatsapp && (
                  <li>
                    <a
                      href={`https://wa.me/${CONTACT.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ulink"
                    >
                      WhatsApp +{CONTACT.whatsapp}
                    </a>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      </section>

      <footer className="px-5 sm:px-8 lg:px-12 pb-10 flex items-center justify-between text-[13px] text-[#8a8882]">
        <span>
          &copy; {new Date().getFullYear()} {OWNER}
        </span>
        <a href="#showcase" className="ulink hover:text-[#1d1c1a]">
          Back to top
        </a>
      </footer>
    </>
  );
}
