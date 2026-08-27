export type Notice = {
  id: string;
  date: string;
  category: "Lab" | "Recruitment" | "Publication" | "Seminar";
  title: string;
  body: string;
};

export const notices: Notice[] = [
  {
    id: "notice-01",
    date: "2026.08.19",
    category: "Lab",
    title: "VIB Lab website preview opens",
    body: "This preview uses replaceable sample records while the laboratory verifies final people, publication, and notice content.",
  },
  {
    id: "notice-02",
    date: "2026.08.08",
    category: "Recruitment",
    title: "Interest in graduate research",
    body: "Students interested in veterinary medicine, data science, genomics, or AI may introduce their research interests by email.",
  },
  {
    id: "notice-03",
    date: "2026.07.21",
    category: "Seminar",
    title: "Reading group: responsible generative AI in medicine",
    body: "Sample notice for a laboratory reading session covering retrieval, evaluation, safety, and human oversight.",
  },
  {
    id: "notice-04",
    date: "2026.06.30",
    category: "Publication",
    title: "New research record added",
    body: "Replace this sample with a verified paper title, authors, journal, publication date, and DOI.",
  },
];
