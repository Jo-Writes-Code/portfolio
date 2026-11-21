import { motion, useReducedMotion } from "framer-motion";
import { CONTACT, OWNER, PROJECTS, type Project } from "@/data/projects";

// Gentle ease-out; no overshoot.
const EASE = [0.25, 0.1, 0.25, 1] as const;

/** An iPhone in portrait view showing a project's mobile screenshot. */
function Phone({ project }: { project: Project }) {
  return (
    <div className="relative w-full aspect-[585/1266] rounded-[1.2rem] md:rounded-[3rem] border-[3px] md:border-[10px] border-[#0a0a0a] bg-[#0a0a0a] shadow-[0_30px_60px_-25px_rgba(0,0,0,0.45)] overflow-hidden">
      {project.mobile ? (
        <img
          src={project.mobile}
          alt={`${project.name} website on an iPhone`}
          width={585}
          height={1266}
          className="h-full w-full object-cover rounded-[0.9rem] md:rounded-[2.3rem]"
        />
      ) : (
        <div className="h-full w-full rounded-[0.9rem] md:rounded-[2.3rem] bg-[#efefef] flex flex-col items-center justify-start pt-[45%] text-center px-2">
          <p className="display text-[clamp(1.3rem,5.5vw,5rem)]">Soon</p>
          <p className="mt-2 text-[8px] sm:text-[10px] md:text-[14px] font-bold text-[#6e6e6e] leading-tight">
            Work in progress
          </p>
        </div>
      )}
      {/* Dynamic Island */}
      <span className="absolute left-1/2 -translate-x-1/2 top-[1.4%] h-[2.2%] w-[27%] rounded-full bg-[#0a0a0a]" />
    </div>
  );
}

function PhoneSlot({ project, index }: { project: Project; index: number }) {
  const reduce = useReducedMotion();

  return (
    <motion.li
      className="list-none"
      initial={reduce ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.15 + index * 0.1, ease: EASE }}
    >
      {project.url ? (
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Visit ${project.name}`}
          className="block transition-opacity duration-300 hover:opacity-90"
        >
          <Phone project={project} />
        </a>
      ) : (
        <div aria-label={`${project.name}, work in progress`}>
          <Phone project={project} />
        </div>
      )}
    </motion.li>
  );
}

const LINES = ["My", "Portfolio"];

function Headline() {
  const reduce = useReducedMotion();
  return (
    <h1 className="display text-center text-[length:var(--fs)]">
      <span className="sr-only">My portfolio, by {OWNER}</span>
      {LINES.map((line, i) => (
        <motion.span
          key={line}
          aria-hidden
          className="block"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: i * 0.12, ease: EASE }}
        >
          {line}
        </motion.span>
      ))}
    </h1>
  );
}

export default function Hero() {
  return (
    <section className="relative px-5 pt-5 pb-16 md:px-0 md:pt-0 md:pb-[10vh] [--fs:15vw] md:[--fs:min(16vw,23vh)]">
      {/* Header */}
      <header className="flex items-start justify-between gap-4 md:absolute md:inset-x-8 md:top-6 md:z-30">
        <p className="text-[18px] md:text-[20px] font-extrabold tracking-[-0.04em] uppercase">
          {OWNER}
        </p>
        <p className="text-[13px] md:text-[14px] font-semibold text-right">
          Contact:{" "}
          <a href={`tel:${CONTACT.phoneTel}`} className="underline underline-offset-2">
            {CONTACT.phone}
          </a>
        </p>
      </header>

      {/* Big text */}
      <div className="mt-14 md:mt-0 md:pt-[11vh]">
        <Headline />
      </div>

      {/* About (top left, desktop) */}
      <p className="hidden md:block md:absolute md:left-8 md:top-[9.5vh] md:z-20 md:max-w-[12rem] text-[13px] font-semibold leading-snug">
        I&rsquo;m a freelance web developer based in Tanzania. I build simple,
        working websites for small businesses.
      </p>

      {/* Three iPhones: equal columns, same level, shown in full */}
      <ul
        className="relative z-10 mt-8 -mx-5 grid grid-cols-3 items-start gap-[3vw] px-[5vw] md:mx-0 md:mt-[calc(var(--fs)*-0.4)] md:gap-[5vw] md:px-[8vw]"
        aria-label="Projects on iPhone"
      >
        {PROJECTS.map((p, i) => (
          <PhoneSlot key={p.slug} project={p} index={i} />
        ))}
      </ul>

      {/* About on small screens (below the phones) */}
      <p className="mt-8 max-w-[20rem] text-[14px] font-semibold leading-snug md:hidden">
        I&rsquo;m a freelance web developer based in Tanzania. I build simple,
        working websites for small businesses.
      </p>
    </section>
  );
}
