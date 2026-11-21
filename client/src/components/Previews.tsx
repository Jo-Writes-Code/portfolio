import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { CONTACT, OWNER, PROJECTS, WIP_ADDRESS, type Project } from "@/data/projects";

const pad = (n: number) => String(n).padStart(2, "0");

/** A landscape website preview inside a simple browser window. */
function Browser({ project }: { project: Project }) {
  const address = project.url
    ? project.url.replace("https://", "")
    : WIP_ADDRESS;

  return (
    <div className="overflow-hidden rounded-xl border border-[#e6e6e6] bg-white shadow-[0_40px_80px_-40px_rgba(0,0,0,0.35)]">
      <div className="flex items-center gap-3 border-b border-[#e6e6e6] bg-[#f5f5f5] px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden>
          <i className="block size-2.5 rounded-full bg-[#d4d4d4]" />
          <i className="block size-2.5 rounded-full bg-[#d4d4d4]" />
          <i className="block size-2.5 rounded-full bg-[#d4d4d4]" />
        </span>
        <span className="mx-auto w-full max-w-sm truncate rounded-md bg-white px-3 py-1 text-center text-[12px] font-semibold text-[#6e6e6e]">
          {address}
        </span>
        <span className="hidden sm:block w-[3.2rem]" aria-hidden />
      </div>

      {project.desktop ? (
        <img
          src={project.desktop}
          alt={`${project.name} website on a computer screen`}
          width={1440}
          height={900}
          loading="lazy"
          className="block w-full aspect-[16/10] object-cover"
        />
      ) : (
        <div className="flex aspect-[16/10] w-full flex-col items-center justify-center bg-[#efefef] text-center">
          <p className="display text-[clamp(3rem,12vw,10rem)]">Soon</p>
          <p className="mt-4 text-[13px] md:text-[15px] font-bold text-[#6e6e6e]">
            Work in progress. This site is not live yet.
          </p>
        </div>
      )}
    </div>
  );
}

function Item({ project, index }: { project: Project; index: number }) {
  const reduce = useReducedMotion();

  const frame = project.url ? (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Visit ${project.name}`}
      className="block transition-transform duration-500 hover:-translate-y-1.5"
    >
      <Browser project={project} />
    </a>
  ) : (
    <Browser project={project} />
  );

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.2, 0.7, 0.2, 1] }}
      className="mt-16 md:mt-24 first:mt-0"
    >
      <div className="mb-5 flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
        <div className="flex items-end gap-4 md:gap-6">
          <span className="text-[13px] font-bold tabular-nums pb-1 md:pb-3">
            {pad(index + 1)}
          </span>
          <h3 className="display text-[clamp(2.4rem,8.5vw,8rem)]">
            {project.name}
          </h3>
        </div>
        <div className="max-w-sm text-[14px] font-semibold leading-snug pb-1 md:pb-3">
          <p className="text-[#6e6e6e]">
            {project.kind}
            {project.wip ? "" : `, ${project.place}`}
          </p>
          <p className="mt-1">{project.blurb}</p>
          {project.url ? (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1 rounded-full bg-[#0a0a0a] px-4 py-2 text-[13px] text-white"
            >
              Visit {project.url.replace("https://", "")}
              <ArrowUpRight className="size-4" aria-hidden />
            </a>
          ) : (
            <span className="mt-3 inline-block rounded-full border border-[#0a0a0a] px-4 py-1.5 text-[13px]">
              Work in progress
            </span>
          )}
        </div>
      </div>
      {frame}
    </motion.article>
  );
}

export default function Previews() {

  return (
    <section id="previews" className="px-5 pt-16 pb-10 md:px-8 md:pt-28">
      <div className="mb-10 flex items-baseline justify-between border-b border-[#0a0a0a] pb-3 md:mb-14">
        <h2 className="text-[18px] md:text-[20px] font-extrabold tracking-[-0.03em] uppercase">
          The full previews
        </h2>
        <p className="text-[13px] font-bold tabular-nums">
          {pad(PROJECTS.length)} websites
        </p>
      </div>

      {PROJECTS.map((p, i) => (
        <Item key={p.slug} project={p} index={i} />
      ))}

      <footer className="mt-24 flex flex-wrap items-center justify-between gap-3 border-t border-[#0a0a0a] pt-4 text-[13px] font-bold">
        <span>
          &copy; {new Date().getFullYear()} {OWNER}
        </span>
        <span className="flex gap-5">
          {CONTACT.email && <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>}
          {CONTACT.whatsapp && (
            <a
              href={`https://wa.me/${CONTACT.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp +{CONTACT.whatsapp}
            </a>
          )}
          <a href="#top">Back to top</a>
        </span>
      </footer>
    </section>
  );
}
