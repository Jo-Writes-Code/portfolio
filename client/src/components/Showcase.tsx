import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { CONTACT, OWNER, PROJECTS, type Project } from "@/data/projects";

const pad = (n: number) => String(n).padStart(2, "0");

/** White panel holding the website previews (desktop + phone). */
function Panel({ project }: { project: Project }) {
  if (project.wip || !project.desktop) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
        <div className="absolute inset-5 border border-dashed border-[#cfcdc6]" />
        <p className="display italic text-[#1d1c1a] text-5xl sm:text-6xl">
          Soon.
        </p>
        <p className="mt-4 text-sm text-[#8a8882] italic max-w-[16rem]">
          Work in progress. This site is not live yet.
        </p>
      </div>
    );
  }

  return (
    <>
      <img
        src={project.desktop}
        alt={`${project.name} website on a computer screen`}
        width={1440}
        height={900}
        className="absolute left-[8%] top-[8%] w-[84%] lg:left-[30%] lg:w-[62%] aspect-[16/10] object-cover shadow-[0_24px_50px_-24px_rgba(0,0,0,0.45)] ring-1 ring-black/10"
      />
      <img
        src={project.mobile}
        alt={`${project.name} website on a phone`}
        width={585}
        height={1266}
        className="absolute right-[8%] bottom-[5%] w-[34%] lg:w-[32%] aspect-[585/1266] object-cover rounded-[1.1rem] border-[5px] border-[#1d1c1a] shadow-[0_24px_50px_-18px_rgba(0,0,0,0.55)]"
      />
    </>
  );
}

function Headline({ project }: { project: Project }) {
  const reduce = useReducedMotion();
  const rise = (i: number) =>
    reduce
      ? {}
      : {
          initial: { y: "105%" },
          animate: { y: "0%" },
          transition: { duration: 0.7, delay: i * 0.08, ease: [0.2, 0.7, 0.2, 1] as const },
        };

  return (
    <h1 className="display text-[clamp(3.6rem,19vw,7.5rem)] lg:text-[min(8.6vw,15.5vh)]">
      <span className="sr-only">{project.name}</span>
      <span aria-hidden className="block overflow-hidden pb-[0.06em]">
        <motion.span className="block text-[#8a8882]" {...rise(0)}>
          {project.lines[0]}
        </motion.span>
      </span>
      <span aria-hidden className="block overflow-hidden pb-[0.06em] -mt-[0.06em]">
        <motion.span className="block italic text-[#1d1c1a]" {...rise(1)}>
          {project.lines[1]}
        </motion.span>
      </span>
    </h1>
  );
}

export default function Showcase() {
  const [index, setIndex] = useState(() => {
    const n = Number(new URLSearchParams(window.location.search).get("slide"));
    return Number.isInteger(n) && n >= 1 && n <= PROJECTS.length ? n - 1 : 0;
  });
  const reduce = useReducedMotion();
  const project = PROJECTS[index];
  const total = PROJECTS.length;
  const hasContact = Boolean(CONTACT.email || CONTACT.whatsapp);

  const go = useCallback(
    (dir: 1 | -1) => setIndex((i) => (i + dir + total) % total),
    [total],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  const fade = reduce
    ? {}
    : {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.5 },
      };

  const contactHref = CONTACT.email
    ? `mailto:${CONTACT.email}`
    : CONTACT.whatsapp
      ? `https://wa.me/${CONTACT.whatsapp}`
      : "#contact";

  return (
    <section
      id="showcase"
      className="relative px-5 pt-6 pb-14 sm:px-8 lg:px-0 lg:py-0 lg:h-screen lg:min-h-[640px] lg:overflow-hidden"
    >
      {/* Wordmark */}
      <a
        href="#showcase"
        className="ulink font-[500] text-[15px] tracking-[0.02em] uppercase lg:absolute lg:left-12 lg:top-8"
        style={{ fontFamily: '"Bodoni Moda", Georgia, serif' }}
      >
        {OWNER}
      </a>

      {/* Nav */}
      <nav
        aria-label="Sections"
        className="mt-3 flex gap-5 text-[13px] text-[#8a8882] lg:mt-0 lg:absolute lg:left-[21vw] lg:top-8 lg:flex-col lg:gap-0.5 lg:leading-[1.25]"
      >
        <a href="#showcase" className="ulink text-[#1d1c1a] font-medium">
          Showcase
        </a>
        <a href="#work" className="hover:text-[#1d1c1a]">
          The Work
        </a>
        <a href="#about" className="hover:text-[#1d1c1a]">
          About
        </a>
        {hasContact && (
          <a href="#contact" className="hover:text-[#1d1c1a]">
            Contact
          </a>
        )}
      </nav>

      {/* Top right */}
      <div className="hidden lg:flex absolute right-12 top-8 gap-5 text-[13px] text-[#8a8882]">
        {project.url && (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#1d1c1a]"
          >
            Visit site
          </a>
        )}
        <a href={contactHref} className="hover:text-[#1d1c1a]">
          {hasContact ? "Contact" : "About"}
        </a>
      </div>

      {/* Prev / Next */}
      <div className="mt-8 flex items-center gap-1 text-[13px] lg:mt-0 lg:absolute lg:left-[44vw] lg:top-8 lg:z-20 lg:bg-[#f4f3ef] lg:pr-3 lg:pb-1">
        <button
          type="button"
          onClick={() => go(-1)}
          className="text-[#8a8882] hover:text-[#1d1c1a]"
          aria-label="Previous project"
        >
          Prev
        </button>
        <span className="text-[#8a8882]">/</span>
        <button
          type="button"
          onClick={() => go(1)}
          className="text-[#1d1c1a]"
          aria-label="Next project"
        >
          Next
        </button>
      </div>

      {/* Panel */}
      <div className="mt-3 lg:mt-0 lg:absolute lg:left-[44vw] lg:top-[4.1rem] lg:h-[calc(100%-4.1rem-2.25rem)] lg:aspect-[4/5]">
        <AnimatePresence mode="wait">
          <motion.div
            key={project.slug}
            {...fade}
            exit={reduce ? undefined : { opacity: 0, transition: { duration: 0.2 } }}
            className="relative bg-white w-full aspect-[4/5] lg:aspect-auto lg:h-full overflow-hidden"
          >
            {project.url ? (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${project.name}`}
                className="absolute inset-0 z-10"
              />
            ) : null}
            <Panel project={project} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Headline (overlaps the panel on desktop) */}
      <div
        key={project.slug}
        className="relative z-10 -mt-[9vw] lg:mt-0 lg:absolute lg:left-[21vw] lg:top-[30vh]"
      >
        <Headline project={project} />
      </div>

      {/* Counter + title */}
      <div className="mt-6 lg:mt-0 lg:absolute lg:left-12 lg:top-[37vh] lg:w-[14rem]">
        <p className="inline-block border-b border-[#1d1c1a] font-medium text-[17px] leading-tight tabular-nums">
          {pad(index + 1)} / {pad(total)}
        </p>
        <motion.div key={project.slug} {...fade} className="mt-3">
          <p className="ulink italic font-medium leading-snug">{project.name}</p>
          <p className="ulink italic font-medium leading-snug">
            {project.wip ? "In progress" : project.kind}
          </p>
          {project.url ? (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-block text-[13px] text-[#8a8882] hover:text-[#1d1c1a]"
            >
              &mdash; Visit site
            </a>
          ) : (
            <p className="mt-5 text-[13px] text-[#8a8882]">&mdash; Not live yet</p>
          )}
        </motion.div>
      </div>

      {/* Blurb */}
      <motion.p
        key={`${project.slug}-blurb`}
        {...fade}
        className="mt-6 max-w-sm text-[15px] text-[#4a4843] lg:mt-0 lg:absolute lg:left-12 lg:bottom-9 lg:w-[16vw] lg:min-w-[14rem] lg:max-w-[17rem] lg:text-[14px]"
      >
        <span className="block text-[12px] uppercase tracking-[0.12em] text-[#8a8882] mb-2">
          {project.place}
        </span>
        {project.blurb}
      </motion.p>
    </section>
  );
}
