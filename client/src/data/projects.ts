export type Project = {
  slug: string;
  name: string;
  kind: string;
  place: string;
  blurb: string;
  url?: string;
  /** Landscape (desktop) screenshot */
  desktop?: string;
  /** Portrait (iPhone) screenshot */
  mobile?: string;
  wip?: boolean;
};

export const OWNER = "Jovin Gogadi";

// Add your real contact details. Empty values are hidden.
export const CONTACT = {
  email: "",
  whatsapp: "", // digits only with country code, e.g. 255712345678
};

export const PROJECTS: Project[] = [
  {
    slug: "salama-bbq",
    name: "Salama BBQ",
    kind: "Restaurant website",
    place: "Kahama, Tanzania",
    blurb:
      "Char-grilled chicken, colourful drinks and crisp samosas. A menu, opening hours, directions and one big call button, in English and Swahili.",
    url: "https://salamabbq.com",
    desktop: "/manus-storage/salama_d_2f0f916e.jpg",
    mobile: "/manus-storage/salama_m_58fe8839.jpg",
  },
  {
    slug: "wisks-and-wishes",
    name: "Wisks & Wishes",
    kind: "Bakery website",
    place: "Dodoma, Tanzania",
    blurb:
      "A small-batch bakery of cookies, cakes and warm buns. Bestsellers, pickup times, and a WhatsApp button with the order message already written.",
    url: "https://wisks-and-wishes.vercel.app",
    desktop: "/manus-storage/wisks_d_1cd2f1a4.jpg",
    mobile: "/manus-storage/wisks_m_0e7953b2.jpg",
  },
  {
    slug: "michael-binzi",
    name: "Michael Binzi",
    kind: "Website",
    place: "Work in progress",
    blurb:
      "Still being built. The address (michael-binzi.vercel.app) is not live yet, so there is nothing to visit for now.",
    url: undefined,
    wip: true,
  },
];

export const WIP_ADDRESS = "michael-binzi.vercel.app";
