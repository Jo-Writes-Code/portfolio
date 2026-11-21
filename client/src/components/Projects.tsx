import { motion, useReducedMotion } from "framer-motion";
import { PROJECTS, type Project } from "@/data/projects";

function Preview({ project }: { project: Project }) {
  if (project.desktop) {
    return (
      <img
        src={project.desktop}
        alt={`${project.name} website preview`}
        width={1440}
        height={900}
        loading="lazy"
        className="block w-full aspect-[16/10] object-cover"
      />
    );
  }
  return (
    <div className="flex aspect-[16/10] w-full flex-col items-center justify-center bg-[#efefef] text-center">
      <p className="display text-[clamp(3rem,12vw,10rem)]">Soon</p>
      <p className="mt-4 text-[13px] md:text-[15px] font-bold text-[#6e6e6e]">
        Work in progress
      </p>
    </div>
  );
}

function Item({ project }: { project: Project }) {
  const reduce = useReducedMotion();

  const image = project.url ? (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Visit ${project.name}`}
      className="block overflow-hidden transition-opacity duration-300 hover:opacity-90"
    >
      <Preview project={project} />
    </a>
  ) : (
    <Preview project={project} />
  );

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.2, 0.7, 0.2, 1] }}
      className="mt-14 md:mt-24 first:mt-0"
    >
      <h3 className="display mb-4 md:mb-6 text-[clamp(2.4rem,8.5vw,8rem)]">
        {project.name}
      </h3>
      {image}
    </motion.article>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="px-5 pt-16 pb-24 md:px-8 md:pt-28 md:pb-32">
      <h2 className="mb-10 md:mb-14 border-b border-[#0a0a0a] pb-3 text-[18px] md:text-[20px] font-extrabold tracking-[-0.03em] uppercase">
        Projects
      </h2>

      {PROJECTS.map((p) => (
        <Item key={p.slug} project={p} />
      ))}
    </section>
  );
}
