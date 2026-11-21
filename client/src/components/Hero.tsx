import { ArrowDown } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { CONTACT, OWNER, PROJECTS, type Project } from "@/data/projects";

const EASE = [0.2, 0.7, 0.2, 1] as const;
const pad = (n: number) => String(n).padStart(2, "0");

/** Live local time for the header, in East Africa Time. */
function useClock() {
  const read = () =>
    new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Africa/Dar_es_Salaam",
    }).format(new Date());
  const [time, setTime] = useState(read);
  useEffect(() => {
    const id = setInterval(() => setTime(read()), 15000);
    return () => clearInterval(id);
  }, []);
  return time;
}

/** An iPhone in portrait view showing a project's mobile screenshot. */
export function Phone({ project }: { project: Project }) {
  return (
    <div className="relative h-full aspect-[585/1266] rounded-[1.1rem] md:rounded-[2.1rem] border-[3px] md:border-[7px] border-[#0a0a0a] bg-[#0a0a0a] shadow-[0_30px_60px_-25px_rgba(0,0,0,0.55)] overflow-hidden">
      {project.mobile ? (
        <img
          src={project.mobile}
          alt={`${project.name} website on an iPhone`}
          width={585}
          height={1266}
          className="h-full w-full object-cover rounded-[0.8rem] md:rounded-[1.6rem]"
        />
      ) : (
        <div className="h-full w-full rounded-[0.8rem] md:rounded-[1.6rem] bg-[#efefef] flex flex-col items-center justify-center text-center px-3">
          <p className="display text-[clamp(1.4rem,3.2vw,2.8rem)]">Soon</p>
          <p className="mt-2 text-[9px] md:text-[12px] font-bold text-[#6e6e6e]">
            Work in progress
          </p>
        </div>
      )}
      {/* Dynamic Island */}
      <span className="absolute left-1/2 -translate-x-1/2 top-[1.6%] h-[2.3%] w-[27%] rounded-full bg-[#0a0a0a]" />
    </div>
  );
}

function PhoneSlot({ project, index }: { project: Project; index: number }) {
  const reduce = useReducedMotion();
  // middle phone sits a little higher than the outer two
  const lift = index === 1 ? "md:-translate-y-6" : "md:translate-y-5";

  const inner = (
    <>
      <div className="h-[62vw] md:h-[min(46vh,36vw)] transition-transform duration-500 group-hover:-translate-y-2">
        <Phone project={project} />
      </div>
      <p className="mt-3 md:mt-4 text-[11px] md:text-[13px] font-bold leading-tight">
        <span className="tabular-nums">{pad(index + 1)}</span>{" "}
        <span className="hidden sm:inline">{project.name}</span>
        {project.url && " \u2197"}
      </p>
    </>
  );

  return (
    <motion.li
      className={`list-none ${lift}`}
      initial={reduce ? false : { opacity: 0, y: 80 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.3 + index * 0.12, ease: EASE }}
    >
      {project.url ? (
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Visit ${project.name}`}
          className="group block"
        >
          {inner}
        </a>
      ) : (
        <div className="group block">{inner}</div>
      )}
    </motion.li>
  );
}

const LINES = ["The work", "on the web"];

function Headline() {
  const reduce = useReducedMotion();
  return (
    <h1 className="display text-center text-[clamp(3.4rem,17vw,5.5rem)] md:text-[min(13.4vw,23vh)]">
      <span className="sr-only">The work on the web, by {OWNER}</span>
      {LINES.map((line, i) => (
        <span
          key={line}
          aria-hidden
          className="block overflow-hidden pb-[0.08em] -mb-[0.08em]"
        >
          <motion.span
            className="block"
            initial={reduce ? false : { y: "110%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 0.9, delay: i * 0.1, ease: EASE }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}

export default function Hero() {
  const time = useClock();
  const hasContact = Boolean(CONTACT.email || CONTACT.whatsapp);
  const contactHref = CONTACT.email
    ? `mailto:${CONTACT.email}`
    : `https://wa.me/${CONTACT.whatsapp}`;

  return (
    <section className="relative px-5 pt-5 pb-16 md:px-8 md:py-0 md:h-screen md:min-h-[700px] md:overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between md:absolute md:inset-x-8 md:top-6 md:z-30">
        <p className="text-[18px] md:text-[20px] font-extrabold tracking-[-0.04em] uppercase">
          {OWNER}
        </p>
        <div className="flex items-center gap-4 text-[13px] font-semibold">
          <span className="hidden sm:inline">
            <span className="text-[#6e6e6e]">/</span> Tanzania &ndash; {time}
          </span>
          <a
            href="#previews"
            className="inline-flex items-center gap-2 rounded-full bg-[#0a0a0a] px-4 py-2 text-white"
          >
            <ArrowDown className="size-3.5" aria-hidden />
            work
          </a>
        </div>
      </header>

      {/* Big text */}
      <div className="mt-14 md:mt-0 md:absolute md:inset-x-0 md:top-[11vh]">
        <Headline />
      </div>

      {/* Intro (left) */}
      <p className="mt-8 max-w-[15rem] text-[14px] font-semibold leading-snug md:mt-0 md:absolute md:left-8 md:top-[47vh] md:z-20 md:max-w-[14rem]">
        Websites for small businesses in Tanzania: a grill, a bakery, and one
        more on the way.
        {hasContact && (
          <>
            {" "}
            <a href={contactHref} className="underline underline-offset-2">
              Say hello.
            </a>
          </>
        )}
      </p>

      {/* Three iPhones, side by side, over the text */}
      <ul
        className="relative z-10 flex justify-center gap-[3vw] md:mt-0 md:gap-[1.4vw] md:absolute md:inset-x-0 md:top-[38vh] max-md:mt-6"
        aria-label="Projects on iPhone"
      >
        {PROJECTS.map((p, i) => (
          <PhoneSlot key={p.slug} project={p} index={i} />
        ))}
      </ul>
    </section>
  );
}
