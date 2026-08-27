export type NavigationItem = {
  label: string;
  href: string;
};

export const site = {
  name: "VIB Lab",
  longName: "Veterinary Informatics & Bioinformatics",
  affiliation: "College of Veterinary Medicine, Seoul National University",
  statement: "Connecting animal health, biological data, and AI.",
  introduction:
    "We translate genomics, clinical records, and intelligent systems into research that benefits companion animals and human health.",
  email: "amazon@snu.ac.kr",
  navigation: [
    { label: "Overview", href: "/" },
    { label: "Research", href: "/research" },
    { label: "Publications", href: "/publications" },
    { label: "People", href: "/people" },
    { label: "Gallery", href: "/notice" },
    { label: "Contact", href: "/contact" },
  ] satisfies NavigationItem[],
} as const;

export const labIndex = [
  {
    id: "about",
    label: "About",
    heading: "A connected view of animal health",
    body: "VIB Lab brings veterinary medicine, biological data, and computational intelligence into one research environment.",
  },
  {
    id: "recruitment",
    label: "Recruitment",
    heading: "Work across medicine, data, and AI",
    body: "We welcome students who want to ask clinically meaningful questions and build rigorous computational methods.",
  },
  {
    id: "collaboration",
    label: "Collaboration",
    heading: "Connect a dataset to a health question",
    body: "We collaborate with clinicians, biologists, engineers, and public-health researchers on translational projects.",
  },
] as const;
