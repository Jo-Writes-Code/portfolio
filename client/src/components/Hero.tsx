import { motion, useReducedMotion } from "framer-motion";
import { CONTACT, OWNER, PROJECTS, type Project } from "@/data/projects";

const EASE = [0.2, 0.7, 0.2, 1] as const;

/** An iPhone in portrait view showing a project's mobile screenshot. */
function Phone({ project }: { project: Project }) {
  return (
    <div className="relative h-full aspect-[585/1266] rounded-[1.2rem] md:rounded-[2.4rem] border-[3px] md:border-[8px] border-[#0a0a0a] bg-[#0a0a0a] shadow-[0_30px_60px_-25px_rgba(0,0,0,0.55)] overflow-hidden">
      {project.mobile ? (
        <img
          src={project.mobile}
          alt={`${project.name} website on an iPhone`}
          width={585}
          height={1266}
          className="h-full w-full object-cover rounded-[0.9rem] md:rounded-[1.8rem]"
        />
      ) : (
        <div className="h-full w-full rounded-[0.9rem] md:rounded-[1.8rem] bg-[#efefef] flex flex-col items-center justify-center text-center px-2">
          <p className="display text-[clamp(1.3rem,4vw,3.4rem)]">Soon</p>
          <p className="mt-2 text-[8px] sm:text-[10px] md:text-[13px] font-bold text-[#6e6e6e] leading-tight">
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

  const phone = (
    <div className="mx-auto h-[min(62vw,100%)] md:h-[min(54vh,42vw)] transition-transform duration-500 group-hover:-translate-y-2">
      <Phone project={project} />
    </div>
  );

  return (
    <motion.li
      className="list-none flex justify-center"
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
          {phone}
        </a>
      ) : (
        <div className="group block" aria-label={`${project.name}, work in progress`}>
          {phone}
        </div>
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
  return (
    <section className="relative px-5 pt-5 pb-16 md:px-8 md:py-0 md:h-screen md:min-h-[700px] md:overflow-hidden">
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
      <div className="mt-14 md:mt-0 md:absolute md:inset-x-0 md:top-[11vh]">
        <Headline />
      </div>

      {/* About (left) */}
      <p className="mt-8 max-w-[17rem] text-[14px] font-semibold leading-snug md:mt-0 md:absolute md:left-8 md:top-[9.5vh] md:z-20 md:max-w-[12rem] md:text-[13px] max-md:hidden">
        I&rsquo;m a freelance web developer based in Tanzania. I build simple,
        working websites for small businesses.
      </p>

      {/* Three iPhones: equal columns, same level, over the text */}
      <ul
        className="relative z-10 mt-8 grid grid-cols-3 items-start md:mt-0 md:absolute md:inset-x-4 md:top-[41vh]"
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
