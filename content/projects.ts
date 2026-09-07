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
    slug: "myhealthmart",
    index: "002",
    name: "MyHealthMart",
    descriptor: "Conversational health-data visualization",
    fieldKeywords: ["Mobile Health", "Health Informatics", "Data Visualization", "Personalized Health"],
    technologyKeywords: ["On-device SLM", "NLP", "Intent Extraction", "Chart Mapping"],
    data: ["Natural-language health queries", "Personal health data", "Visualization specifications"],
    participants: ["Arok Choi"],
    summary:
      "A chat-based interface that turns natural-language health questions into clear, device-generated visualizations.",
    description:
      "MyHealthMart uses an on-device small language model to identify visualization intent in natural-language queries and connect each request to an appropriate chart output.",
    methods: ["On-device language modeling", "Intent extraction", "Chart recommendation", "Privacy-aware inference"],
    impact:
      "Makes personal health data easier to explore while keeping language processing close to the user's device.",
  },
  {
    slug: "veterinary-snomed-ct",
    index: "003",
    name: "Veterinary SNOMED CT Mapping",
    descriptor: "Standard terminology for veterinary records",
    fieldKeywords: ["Veterinary Informatics", "Clinical Terminology", "Data Standardization", "Interoperability"],
    technologyKeywords: ["SNOMED CT", "LLM", "NLP", "Python"],
    data: ["Veterinary clinical terms", "Clinical records", "SNOMED CT concepts"],
    participants: ["Solhee Hong", "Angela Do Youn Kim"],
    summary:
      "A manual and LLM-assisted workflow for mapping veterinary clinical language to SNOMED CT.",
    description:
      "Veterinary SNOMED CT Mapping develops a standardized terminology layer for veterinary hospitals through expert-reviewed manual mapping and AI-assisted automated mapping.",
    methods: ["Terminology mapping", "LLM-assisted normalization", "Expert review", "Mapping evaluation"],
    impact:
      "Improves the consistency and computability of veterinary clinical data across records and systems.",
  },
  {
    slug: "telepet",
    index: "004",
    name: "Telepet",
    descriptor: "Multimodal companion-animal state intelligence",
    fieldKeywords: ["Companion Animal Health", "Animal Behavior", "Affective Computing", "Multimodal AI"],
    technologyKeywords: ["Multimodal Learning", "Computer Vision", "Audio Analysis", "Biosignal Modeling"],
    data: ["Video", "Audio", "Images", "Biosignals"],
    participants: ["Solhee Hong", "Angela Do Youn Kim"],
    summary:
      "A multimodal AI project for understanding companion-animal health, behavior, and emotional states.",
    description:
      "Telepet combines video, audio, images, and biosignals to estimate an animal's emotional and behavioral state and support tailored guidance for pet owners.",
    methods: ["Multimodal fusion", "Affect recognition", "Biosignal analysis", "Recommendation design"],
    impact:
      "Helps translate complex behavioral and physiological signals into useful, owner-facing information.",
  },
  {
    slug: "canine-ccd",
    index: "005",
    name: "Canine CCD",
    descriptor: "Comparative genomics of cognitive dysfunction",
    fieldKeywords: ["Comparative Genomics", "Neurogenomics", "Canine Cognitive Dysfunction", "Translational Neuroscience"],
    technologyKeywords: ["GWAS", "Polygenic Risk Score", "Pathway Analysis", "Bioinformatics"],
    data: ["Dog Aging Project cohort", "Genomic variants", "Cognitive phenotypes"],
    participants: ["Younghan Song"],
    summary:
      "A comparative-genomics study of canine cognitive dysfunction as a model for Alzheimer's disease.",
    description:
      "Canine CCD investigates the genetic architecture of canine cognitive dysfunction using the Dog Aging Project cohort, genome-wide association studies, and polygenic risk modeling.",
    methods: ["Genome-wide association study", "Polygenic risk modeling", "Candidate-gene analysis", "Pathway interpretation"],
    impact:
      "Connects veterinary aging research with broader questions in human neurodegenerative disease.",
  },
  {
    slug: "splicing-transformer",
    index: "006",
    name: "Splicing Transformer",
    descriptor: "Transformers for gene regulation and multi-omics",
    fieldKeywords: ["Bioinformatics", "Alternative Splicing", "Gene Regulation", "Precision Medicine"],
    technologyKeywords: ["Transformer", "Multi-omics Integration", "Representation Learning", "LLM"],
    data: ["Genomic data", "Transcriptomic data", "Alternative-splicing profiles"],
    participants: ["Jeonghyun Lee"],
    summary:
      "Transformer-based modeling of genomic and transcriptomic data to study gene regulation and disease-related molecular patterns.",
    description:
      "Splicing Transformer explores biomedical foundation models that integrate multi-omics evidence to interpret gene regulation, alternative splicing, and disease-related molecular patterns.",
    methods: ["Transformer modeling", "Multi-omics integration", "Sequence representation learning", "Molecular-pattern analysis"],
    impact:
      "Supports more interpretable links between molecular variation, biological function, and precision medicine.",
  },
];
