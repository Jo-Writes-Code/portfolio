import { ArrowUpRight } from "lucide-react";

const OWNER = "Jovin Gogadi";

// Put your real contact details here. Leave a value empty to hide it.
const CONTACT = {
  email: "",
  whatsapp: "", // digits only, with country code, e.g. 255712345678
};

type Project = {
  name: string;
  description: string;
  detail: string;
  url?: string;
  image?: string;
  wip?: boolean;
};

const PROJECTS: Project[] = [
  {
    name: "Salama BBQ",
    description:
      "A website for a charcoal grill restaurant in Kahama, Tanzania.",
    detail:
      "Menu highlights, opening hours, directions and a call button, so customers can order by phone. Available in English and Swahili.",
    url: "https://salamabbq.com",
    image: "/manus-storage/salama_56b458e8.jpg",
  },
  {
    name: "Wisks & Wishes",
    description: "A website for a small-batch bakery in Dodoma, Tanzania.",
    detail:
      "Bestsellers, pickup times and a WhatsApp button with the order message already filled in. No cart, no checkout.",
    url: "https://wisks-and-wishes.vercel.app",
    image: "/manus-storage/wisks_1a1d1259.jpg",
  },
  {
    name: "Michael Binzi",
    description: "A third site, still being built.",
    detail:
      "The domain (michael-binzi.vercel.app) is not live yet, so there is nothing to visit for now.",
    wip: true,
  },
];

function ProjectCard({ project }: { project: Project }) {
  const { name, description, detail, url, image, wip } = project;

  const media = image ? (
    <img
      src={image}
      alt={`Screenshot of the ${name} website`}
      width={1280}
      height={800}
      loading="lazy"
      className="w-full aspect-[16/10] object-cover rounded-md border border-border"
    />
  ) : (
    <div
      className="w-full aspect-[16/10] rounded-md border border-dashed border-border flex items-center justify-center text-muted-foreground text-sm"
      aria-hidden="true"
    >
      Preview coming soon
    </div>
  );

  return (
    <article className="py-10 border-t border-border">
      {url ? (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${name}`}
          className="block hover:opacity-90 transition-opacity"
        >
          {media}
        </a>
      ) : (
        media
      )}

      <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1">
        <h3 className="text-2xl">{name}</h3>
        {wip && (
          <span className="text-xs font-medium uppercase tracking-wide rounded-full border border-border bg-white px-2.5 py-0.5 text-muted-foreground">
            Work in progress
          </span>
        )}
      </div>

      <p className="mt-2 font-medium">{description}</p>
      <p className="mt-1 text-muted-foreground">{detail}</p>

      {url && (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-1 text-primary font-medium underline underline-offset-4 hover:no-underline"
        >
          {url.replace("https://", "")}
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </a>
      )}
    </article>
  );
}

export default function Home() {
  const hasContact = CONTACT.email || CONTACT.whatsapp;

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-2xl px-5 sm:px-6">
        <header className="pt-16 pb-12 sm:pt-24">
          <p className="text-sm text-muted-foreground">Web projects</p>
          <h1 className="mt-2 text-4xl sm:text-5xl">{OWNER}</h1>
          <p className="mt-4 text-lg sm:text-xl max-w-xl">
            I build simple, working websites for small businesses in Tanzania.
            Three of them are below.
          </p>
        </header>

        <main>
          <h2 className="sr-only">Projects</h2>
          {PROJECTS.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </main>

        <footer className="border-t border-border py-12 mb-8">
          <h2 className="text-2xl">Get in touch</h2>
          <p className="mt-2 text-muted-foreground">
            Need a website for your business? Send me a message.
          </p>

          {hasContact && (
            <ul className="mt-4 space-y-1">
              {CONTACT.email && (
                <li>
                  Email:{" "}
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="text-primary underline underline-offset-4 hover:no-underline"
                  >
                    {CONTACT.email}
                  </a>
                </li>
              )}
              {CONTACT.whatsapp && (
                <li>
                  WhatsApp:{" "}
                  <a
                    href={`https://wa.me/${CONTACT.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline underline-offset-4 hover:no-underline"
                  >
                    +{CONTACT.whatsapp}
                  </a>
                </li>
              )}
            </ul>
          )}

          <p className="mt-10 text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} {OWNER}
          </p>
        </footer>
      </div>
    </div>
  );
}
