import { motion, useReducedMotion } from "framer-motion";
import { CONTACT, OWNER, PROJECTS, type Project } from "@/data/projects";

const pad = (n: number) => String(n).padStart(2, "0");
const EASE = [0.2, 0.7, 0.2, 1] as const;

/** Content of one white preview panel. */
function PanelArt({ project }: { project: Project }) {
  if (project.wip || !project.desktop) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
        <div className="absolute inset-4 border border-dashed border-[#cfcdc6]" />
        <p className="display italic text-[#1d1c1a] text-5xl">Soon.</p>
        <p className="mt-3 text-[13px] text-[#8a8882] italic max-w-[12rem]">
          Work in progress. Not live yet.
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
        className="absolute left-[7%] top-[7%] w-[86%] aspect-[16/10] object-cover shadow-[0_18px_40px_-20px_rgba(0,0,0,0.5)] ring-1 ring-black/10"
      />
      <img
        src={project.mobile}
        alt={`${project.name} website on a phone`}
        width={585}
        height={1266}
        className="absolute right-[9%] bottom-[5%] w-[40%] aspect-[585/1266] object-cover rounded-[0.9rem] border-4 border-[#1d1c1a] shadow-[0_20px_40px_-16px_rgba(0,0,0,0.6)]"
      />
    </>
  );
}

function Preview({
  project,
  index,
  offset,
}: {
  project: Project;
  index: number;
  offset: string;
}) {
  const reduce = useReducedMotion();

  const panel = (
    <div className="relative bg-white w-full aspect-[3/4] overflow-hidden transition-transform duration-500 group-hover:-translate-y-1.5">
      <PanelArt project={project} />
    </div>
  );

  const caption = (
    <div className="mt-3">
      <p className="inline-block border-b border-[#1d1c1a] font-medium text-[15px] leading-tight tabular-nums">
        {pad(index + 1)} / {pad(PROJECTS.length)}
      </p>
      <p className="mt-2 ulink italic font-medium leading-snug">{project.name}</p>
      <p className="text-[13px] text-[#8a8882] leading-snug mt-0.5">
        {project.wip ? "Work in progress" : `${project.kind}, ${project.place}`}
      </p>
      <p className="mt-2 text-[13px] text-[#8a8882] group-hover:text-[#1d1c1a] transition-colors">
        {project.url
          ? `\u2014 ${project.url.replace("https://", "")}`
          : "\u2014 Not live yet"}
      </p>
    </div>
  );

  const body = (
    <>
      {panel}
      {caption}
    </>
  );

  return (
    <motion.li
      initial={reduce ? false : { opacity: 0, y: 36 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.25 + index * 0.12, ease: EASE }}
      className={`list-none ${offset}`}
    >
      {project.url ? (
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Visit ${project.name}`}
          className="group block"
        >
          {body}
        </a>
      ) : (
        <div className="group block">{body}</div>
      )}
    </motion.li>
  );
}

const HEADLINE: { text: string; italic?: boolean }[] = [
  { text: "The" },
  { text: "Work" },
  { text: "Of/" },
  { text: "Jovin", italic: true },
  { text: "Gogadi", italic: true },
];

function Headline() {
  const reduce = useReducedMotion();
  return (
    <h1 className="display text-[clamp(3.4rem,16vw,6.5rem)] lg:text-[min(7.4vw,12vh)]">
      <span className="sr-only">The work of {OWNER}</span>
      {HEADLINE.map((l, i) => (
        <span
          key={l.text}
          aria-hidden
          className="block overflow-hidden pb-[0.06em] -mb-[0.06em]"
        >
          <motion.span
            className={`block ${l.italic ? "italic text-[#1d1c1a]" : "text-[#8a8882]"}`}
            initial={reduce ? false : { y: "105%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 0.8, delay: i * 0.07, ease: EASE }}
          >
            {l.text}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}

export default function Hero() {
  const hasContact = Boolean(CONTACT.email || CONTACT.whatsapp);
  const contactHref = CONTACT.email
    ? `mailto:${CONTACT.email}`
    : `https://wa.me/${CONTACT.whatsapp}`;

  const offsets = ["lg:mt-0", "lg:mt-20", "lg:mt-8"];

  return (
    <section className="relative px-5 pt-6 pb-16 sm:px-8 lg:px-0 lg:py-0 lg:h-screen lg:min-h-[680px] lg:overflow-hidden">
      {/* Wordmark */}
      <p
        className="ulink inline-block uppercase tracking-[0.02em] text-[15px] font-medium lg:absolute lg:left-12 lg:top-8"
        style={{ fontFamily: '"Bodoni Moda", Georgia, serif' }}
      >
        {OWNER}
      </p>

      {/* Top right */}
      <p className="hidden lg:block absolute right-12 top-8 text-[13px] text-[#8a8882]">
        {hasContact ? (
          <a href={contactHref} className="hover:text-[#1d1c1a]">
            Contact
          </a>
        ) : (
          "Three websites"
        )}
      </p>

      {/* Headline */}
      <div className="mt-10 lg:mt-0 lg:absolute lg:left-12 lg:top-[19vh] lg:z-20 lg:pointer-events-none">
        <Headline />
      </div>

      {/* Intro */}
      <p className="mt-6 max-w-xs text-[15px] text-[#4a4843] lg:mt-0 lg:absolute lg:left-12 lg:bottom-9 lg:w-[18vw] lg:min-w-[14rem] lg:text-[14px]">
        Websites for small businesses in Tanzania: a grill, a bakery, and one
        more on the way.
        {hasContact && (
          <>
            {" "}
            <a href={contactHref} className="ulink text-[#1d1c1a]">
              Say hello.
            </a>
          </>
        )}
      </p>

      {/* Previews */}
      <ul
        className="mt-12 grid gap-12 sm:grid-cols-2 sm:gap-x-6 lg:mt-0 lg:gap-0 lg:absolute lg:right-12 lg:top-[6.5rem] lg:grid-cols-[repeat(3,min(21.5vw,33vh))] lg:gap-x-[1.2vw] lg:items-start"
        aria-label="Projects"
      >
        {PROJECTS.map((p, i) => (
          <Preview key={p.slug} project={p} index={i} offset={offsets[i]} />
        ))}
      </ul>
    </section>
  );
}
