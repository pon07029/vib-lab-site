export type Project = {
  slug: string;
  index: string;
  name: string;
  descriptor: string;
  fieldKeywords: string[];
  technologyKeywords: string[];
  data: string[];
  participants: string[];
  summary: string;
  description: string;
  methods: string[];
  impact: string;
};

export const projects: Project[] = [
  {
    slug: "aichatvet",
    index: "001",
    name: "AIChatVet",
    descriptor: "Veterinary AI assistant & consultation",
    fieldKeywords: [
      "Vet Informatics",
      "Vet Teleconsultation",
      "CDSS",
      "Companion Animal Health",
      "GenAI in Vet Med",
    ],
    technologyKeywords: ["LLM", "RAG", "MAS", "LoRA", "NLP"],
    data: [
      "Veterinary teleconsultation cases",
      "Veterinary terminology",
      "Web evidence",
    ],
    participants: ["Hyeongjin Ju", "Wongyung Choi", "Byungwook Oh"],
    summary:
      "A retrieval-augmented multi-agent system for practical, safety-aware veterinary teleconsultation support.",
    description:
      "AIChatVet is a retrieval-augmented multi-agent AI project for veterinary teleconsultation support. It connects domain terminology, curated evidence, and task-specific agents to produce structured responses while keeping clinical limitations explicit.",
    methods: ["Retrieval-augmented generation", "Multi-agent orchestration", "Domain adaptation", "Safety evaluation"],
    impact:
      "Improves the structure and usefulness of owner-facing veterinary consultation responses while preserving clear clinical limitations.",
  },
  {
    slug: "clinicallens",
    index: "002",
    name: "ClinicalLens",
    descriptor: "Longitudinal veterinary record intelligence",
    fieldKeywords: ["Clinical Records", "Phenotyping", "Decision Support", "Outcome Research"],
    technologyKeywords: ["NLP", "Temporal Models", "Weak Supervision", "Knowledge Graph"],
    data: ["De-identified visit notes", "Laboratory observations", "Medication timelines"],
    participants: ["VIB Lab Clinical Informatics Group"],
    summary:
      "A computational framework for tracing clinical signals across fragmented veterinary records.",
    description:
      "ClinicalLens explores how longitudinal animal-health records can be transformed into reliable phenotypes and interpretable clinical trajectories.",
    methods: ["Temporal information extraction", "Clinical entity linking", "Trajectory clustering"],
    impact:
      "Creates a stronger evidence layer for retrospective clinical studies and future decision-support systems.",
  },
  {
    slug: "canine-atlas",
    index: "003",
    name: "Canine Atlas",
    descriptor: "Comparative genomics for precision health",
    fieldKeywords: ["Comparative Genomics", "Cancer Biology", "Precision Medicine", "One Health"],
    technologyKeywords: ["WGS", "RNA-seq", "Variant Calling", "Network Biology"],
    data: ["Tumor-normal genomes", "Transcriptomes", "Clinical annotations"],
    participants: ["VIB Lab Genomics Group"],
    summary:
      "An integrated view of genomic variation and disease biology across canine cohorts.",
    description:
      "Canine Atlas links molecular profiles with clinical context to study disease heterogeneity and shared mechanisms across species.",
    methods: ["Multi-omics integration", "Somatic variant analysis", "Pathway inference"],
    impact:
      "Supports comparative discoveries that can inform companion-animal care and translational human-health research.",
  },
  {
    slug: "pathogen-watch",
    index: "004",
    name: "Pathogen Watch",
    descriptor: "Genomic surveillance across animal populations",
    fieldKeywords: ["Epidemiology", "Zoonoses", "Surveillance", "Public Health"],
    technologyKeywords: ["Phylogenetics", "Metagenomics", "Geospatial Analysis", "Dashboards"],
    data: ["Pathogen sequences", "Sampling metadata", "Spatiotemporal observations"],
    participants: ["VIB Lab Epidemiology Group"],
    summary:
      "A surveillance workflow that connects pathogen genomes with place, time, host, and exposure.",
    description:
      "Pathogen Watch investigates reproducible computational pipelines for monitoring transmission patterns and emerging genomic signals.",
    methods: ["Phylogenomic reconstruction", "Cluster detection", "Spatiotemporal modeling"],
    impact:
      "Helps research teams move from isolated sequence records to interpretable surveillance evidence.",
  },
  {
    slug: "multi-modal-vet",
    index: "005",
    name: "MultiModal Vet",
    descriptor: "Images, signals, and notes in one model",
    fieldKeywords: ["Diagnostic Imaging", "Multimodal AI", "Representation Learning", "Clinical AI"],
    technologyKeywords: ["Vision Transformer", "Contrastive Learning", "Fusion", "Calibration"],
    data: ["Radiographs", "Ultrasound clips", "Clinical notes"],
    participants: ["VIB Lab AI Group"],
    summary:
      "A multimodal research program for learning clinically meaningful representations across veterinary data types.",
    description:
      "MultiModal Vet studies how imaging, text, and structured observations can be fused without obscuring uncertainty or clinical context.",
    methods: ["Multimodal pretraining", "Cross-attention", "Uncertainty calibration"],
    impact:
      "Explores diagnostic systems that communicate evidence and uncertainty rather than returning an isolated prediction.",
  },
  {
    slug: "phenotype-link",
    index: "006",
    name: "Phenotype Link",
    descriptor: "From genotype to observable veterinary traits",
    fieldKeywords: ["Rare Disease", "Phenome", "Functional Genomics", "Translational Research"],
    technologyKeywords: ["Ontology", "Graph Learning", "Variant Prioritization", "Causal Inference"],
    data: ["Phenotype profiles", "Pedigrees", "Candidate variants"],
    participants: ["VIB Lab Bioinformatics Group"],
    summary:
      "A phenotype-first framework for connecting observable traits with candidate molecular mechanisms.",
    description:
      "Phenotype Link organizes veterinary observations with computable ontologies and integrates them with genomic evidence.",
    methods: ["Ontology alignment", "Graph representation learning", "Variant ranking"],
    impact:
      "Makes cross-case comparison more systematic and helps surface testable hypotheses for rare and inherited disease.",
  },
];
