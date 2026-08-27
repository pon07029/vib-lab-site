export type Publication = {
  id: string;
  year: number;
  area: "Veterinary AI" | "Genomics" | "Computational Health";
  title: string;
  authors: string;
  journal: string;
  contribution: string;
  doi?: string;
};

export const publications: Publication[] = [
  {
    id: "pub-01",
    year: 2026,
    area: "Veterinary AI",
    title: "Safety-aware retrieval for veterinary teleconsultation support",
    authors: "H. Ju, W. Choi, B. Oh, and collaborators",
    journal: "Research record — replace with verified citation",
    contribution: "Structures owner-facing answers around evidence, uncertainty, and clear clinical limits.",
  },
  {
    id: "pub-02",
    year: 2026,
    area: "Computational Health",
    title: "Temporal phenotyping from longitudinal companion-animal records",
    authors: "VIB Lab Clinical Informatics Group",
    journal: "Research record — replace with verified citation",
    contribution: "Connects visits separated in time into interpretable clinical trajectories.",
  },
  {
    id: "pub-03",
    year: 2025,
    area: "Genomics",
    title: "Integrative molecular profiles in canine disease cohorts",
    authors: "VIB Lab Genomics Group",
    journal: "Research record — replace with verified citation",
    contribution: "Links genomic variation to pathways and clinically meaningful subgroups.",
  },
  {
    id: "pub-04",
    year: 2025,
    area: "Computational Health",
    title: "A reproducible framework for veterinary pathogen surveillance",
    authors: "VIB Lab Epidemiology Group",
    journal: "Research record — replace with verified citation",
    contribution: "Combines sequence, host, time, and location into one surveillance workflow.",
  },
  {
    id: "pub-05",
    year: 2024,
    area: "Veterinary AI",
    title: "Calibrated multimodal learning for companion-animal imaging",
    authors: "VIB Lab AI Group",
    journal: "Research record — replace with verified citation",
    contribution: "Pairs multimodal predictions with evidence and uncertainty estimates.",
  },
  {
    id: "pub-06",
    year: 2024,
    area: "Genomics",
    title: "Phenotype graph alignment for inherited veterinary disease",
    authors: "VIB Lab Bioinformatics Group",
    journal: "Research record — replace with verified citation",
    contribution: "Makes phenotype-to-variant comparison systematic across cases and species.",
  },
];
