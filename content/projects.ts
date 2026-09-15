export type ProjectImage = {
  url: string;
  title: string;
  caption: string;
  tag?: string;
};

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
  images: ProjectImage[];
  image: string;
  imageCaption?: string;
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
      "Veterinary Informatics | CDSS | LLM | RAG",
    description:
      "AIChatVet is a retrieval-augmented multi-agent AI project for veterinary teleconsultation support. Veterinary teleconsultations often rely on incomplete owner-reported information and cannot replace physical examination. AIChatVet aims to generate clearer, more practical, and safety-aware responses for dog and cat owners.",
    methods: ["Retrieval-augmented generation", "Multi-agent orchestration", "Domain adaptation", "Safety evaluation"],
    impact:
      "Improves the structure and usefulness of owner-facing veterinary consultation responses while preserving clear clinical limitations.",
    image: "/research/aichatvet-1.jpg",
    imageCaption: "Clinical teleconsultation and AI diagnostic workflow for companion animal healthcare.",
    images: [
      {
        url: "/research/aichatvet-1.jpg",
        title: "Veterinary Teleconsultation",
        tag: "VET TELECONSULTATION / CLINIC",
        caption: "Veterinarian patient examination and remote teleconsultation workflow for companion animal health.",
      },
      {
        url: "/research/aichatvet-2.jpg",
        title: "Conversational GenAI & CDSS",
        tag: "LLM · RAG · MULTI-AGENT",
        caption: "Retrieval-augmented multi-agent AI providing structured veterinary clinical decision support.",
      },
    ],
  },
  {
    slug: "myhealthmart",
    index: "002",
    name: "On-Device Health Data Visualization (MyHealthMart)",
    descriptor: "Conversational health-data visualization",
    fieldKeywords: ["Mobile Health", "Health Informatics", "Data Visualization", "Personalized Health"],
    technologyKeywords: ["On-device SLM", "NLP", "Intent Extraction", "Chart Mapping"],
    data: ["Natural-language health queries", "Personal health data", "Visualization specifications"],
    participants: ["Arok Choi"],
    summary:
      "Digital Health | Data Visualization | On-Device AI | SLM",
    description:
      "This project develops an on-device small language model (SLM) that turns natural-language health questions into personalized visualizations. By processing personal health and lifelog data directly on the device, the system aims to protect sensitive information while helping users explore their health data more intuitively, with future applications in everyday health management.",
    methods: ["On-device language modeling", "Intent extraction", "Chart recommendation", "Privacy-aware inference"],
    impact:
      "Makes personal health data easier to explore while keeping language processing close to the user's device.",
    image: "/research/myhealthmart-1.jpg",
    imageCaption: "Conversational health-data query exploration and on-device SLM visualization engine.",
    images: [
      {
        url: "/research/myhealthmart-1.jpg",
        title: "Mobile Health Informatics",
        tag: "MOBILE HEALTH · ON-DEVICE SLM",
        caption: "Mobile interface for natural-language health queries and privacy-aware on-device SLM processing.",
      },
      {
        url: "/research/myhealthmart-2.jpg",
        title: "Interactive Data Visualization",
        tag: "DATA VISUALIZATION · INTENT MAPPING",
        caption: "Dynamic chart recommendation and health-data visualization mapping query intent to tailored graphics.",
      },
    ],
  },
  {
    slug: "phr-chronic-disease",
    index: "003",
    name: "PHR-based Chronic Disease Prediction",
    descriptor: "Personal health records & chronic disease risk prediction",
    fieldKeywords: ["Personal Health Records", "Lifestyle Data", "Chronic Disease", "Digital Health"],
    technologyKeywords: ["Machine Learning", "Risk Prediction", "Feature Engineering", "Python"],
    data: ["Health examination records", "Lifestyle information", "Personal health data"],
    participants: ["Minkyung Choi"],
    summary:
      "Personal Health Records | Lifestyle Data | Chronic Disease | Machine Learning",
    description:
      "This project investigates how personal health records can be used to predict chronic disease risk and identify meaningful health-related factors. By combining health examination and lifestyle information, we explore data-driven approaches for early risk assessment and preventive, personalized health management.",
    methods: ["Risk assessment modeling", "Lifestyle factor analysis", "Machine learning prediction", "Personalized health analytics"],
    impact:
      "Supports early risk identification and preventive, personalized management for chronic diseases.",
    image: "/research/phr-chronic-disease-1.jpg",
    imageCaption: "Machine learning prediction of chronic disease trajectories using personal health record time-series.",
    images: [
      {
        url: "/research/phr-chronic-disease-1.jpg",
        title: "Machine Learning Predictive Model",
        tag: "MACHINE LEARNING · PREDICTIVE MODEL",
        caption: "Deep neural network and gradient boosted tree architecture modeling chronic disease trajectories and risk curves.",
      },
      {
        url: "/research/phr-chronic-disease-2.jpg",
        title: "Chronic Disease Risk Analytics",
        tag: "PHR & RISK TRAJECTORY",
        caption: "Data-driven risk assessment models predicting chronic disease onset and preventive management factors.",
      },
    ],
  },
  {
    slug: "splicing-transformer",
    index: "004",
    name: "Splicing Transformer",
    descriptor: "Transformers for gene regulation and multi-omics",
    fieldKeywords: ["Bioinformatics", "Alternative Splicing", "Gene Regulation", "Precision Medicine"],
    technologyKeywords: ["Transformer", "Multi-omics Integration", "Representation Learning", "LLM"],
    data: ["Genomic data", "Transcriptomic data", "Alternative-splicing profiles"],
    participants: ["Jeonghyun Lee"],
    summary:
      "Alternative Splicing | Multi-omics | Alzheimer's Disease | Cancer | Transformer",
    description:
      "Splicing Transformer integrates multi-omics data across different tissues and disease conditions to investigate alternative splicing patterns. Using Transformer-based models, the project aims to identify complex and disease-associated splicing signatures in cancer, Alzheimer's disease, and other biological contexts.",
    methods: ["Transformer modeling", "Multi-omics integration", "Sequence representation learning", "Molecular-pattern analysis"],
    impact:
      "Supports more interpretable links between molecular variation, biological function, and precision medicine.",
    image: "/research/splicing-transformer-1.jpg",
    imageCaption: "Transformer foundation modeling for alternative splicing mechanisms and multi-omics regulation.",
    images: [
      {
        url: "/research/splicing-transformer-1.jpg",
        title: "Alternative Splicing Mechanism",
        tag: "ALTERNATIVE SPLICING · EXONS & INTRONS",
        caption: "Molecular biological pre-mRNA splicing pathways yielding diverse functional mRNA and protein isoforms from a single gene.",
      },
      {
        url: "/research/splicing-transformer-2.jpg",
        title: "Transformer Architecture (LLM)",
        tag: "TRANSFORMER & ATTENTION (LLM)",
        caption: "Multi-Head Self-Attention and encoder-decoder deep learning architecture adapted for multi-omics sequence modeling.",
      },
    ],
  },
  {
    slug: "standardization-terminology-veterinary",
    index: "005",
    name: "Standardization of Clinical Terminology in Veterinary Medicine",
    descriptor: "Standard terminology for veterinary records",
    fieldKeywords: ["Veterinary Informatics", "Clinical Terminology", "Data Standardization", "Interoperability"],
    technologyKeywords: ["SNOMED CT", "LLM", "NLP", "Python"],
    data: ["Veterinary clinical terms", "Clinical records", "SNOMED CT concepts"],
    participants: ["Solhee Hong", "Angela Do Youn Kim"],
    summary:
      "Veterinary Informatics | SNOMED CT | Clinical Terminology | Data Standardization",
    description:
      "This project focuses on standardizing veterinary clinical terminology using SNOMED CT to make health data more consistent, interoperable, and reusable. By mapping locally used veterinary terms to SNOMED CT, we aim to support data integration, clinical research, and future data-driven veterinary applications.",
    methods: ["Terminology mapping", "LLM-assisted normalization", "Expert review", "Mapping evaluation"],
    impact:
      "Improves the consistency and computability of veterinary clinical data across records and systems.",
    image: "/research/standardization-terminology-veterinary-1.jpg",
    imageCaption: "SNOMED CT clinical terminology ontology and cross-hospital veterinary health data standardization.",
    images: [
      {
        url: "/research/standardization-terminology-veterinary-1.jpg",
        title: "Veterinary Clinical Documentation",
        tag: "VET INFORMATICS · MEDICAL RECORDS",
        caption: "Veterinary medical records charting and clinical term collection across animal hospital health systems.",
      },
      {
        url: "/research/standardization-terminology-veterinary-2.jpg",
        title: "SNOMED CT Terminology Hierarchy",
        tag: "SNOMED CT · ONTOLOGY STANDARDIZATION",
        caption: "Standardized biomedical ontology mapping concepts and multi-center veterinary terminology normalization.",
      },
    ],
  },
  {
    slug: "telepet",
    index: "006",
    name: "Telepet",
    descriptor: "Multimodal companion-animal state intelligence",
    fieldKeywords: ["Companion Animal Health", "Animal Behavior", "Affective Computing", "Multimodal AI"],
    technologyKeywords: ["Multimodal Learning", "Computer Vision", "Audio Analysis", "Biosignal Modeling"],
    data: ["Video", "Audio", "Images", "Biosignals"],
    participants: ["Solhee Hong", "Angela Do Youn Kim"],
    summary:
      "Companion Animal | Emotion Prediction | Multimodal AI | Computer Vision",
    description:
      "\"Telepet\" research centers on the development of an artificial intelligence model for predicting the emotional states of companion animals, with a particular focus on canines. This model integrates multimodal data?including video, audio, image, and biosignal inputs?to capture behavioral and physiological indicators of affective states that are difficult to assess through a single data modality alone.",
    methods: ["Multimodal fusion", "Affect recognition", "Biosignal analysis", "Recommendation design"],
    impact:
      "Helps translate complex behavioral and physiological signals into useful, owner-facing information.",
    image: "/research/telepet-1.jpg",
    imageCaption: "Multimodal behavioral and physiological state intelligence for companion animals.",
    images: [
      {
        url: "/research/telepet-1.jpg",
        title: "Multimodal AI System Architecture",
        tag: "MULTIMODAL AI · SENSORY FUSION",
        caption: "Unified fusion transformer neural network combining computer vision pose streams, vocalization acoustics, and biosignal telemetry.",
      },
      {
        url: "/research/telepet-2.jpg",
        title: "Companion Animal Behavioral Observation",
        tag: "AFFECTIVE COMPUTING · BEHAVIOR",
        caption: "Natural behavioral observation and emotional state analysis of companion animals in living environments.",
      },
    ],
  },
  {
    slug: "canine-ccd",
    index: "007",
    name: "Canine CCD",
    descriptor: "Comparative genomics of cognitive dysfunction",
    fieldKeywords: ["Comparative Genomics", "Neurogenomics", "Canine Cognitive Dysfunction", "Translational Neuroscience"],
    technologyKeywords: ["GWAS", "Polygenic Risk Score", "Pathway Analysis", "Bioinformatics"],
    data: ["Dog Aging Project cohort", "Genomic variants", "Cognitive phenotypes"],
    participants: ["Younghan Song"],
    summary:
      "CCD | Alzheimer's Disease | GWAS",
    description:
      "This project investigates Canine Cognitive Dysfunction (CCD), an age-related neurodegenerative disorder that shares important features with human Alzheimer's disease. Using large-scale genomic data, we explore the genetic basis of CCD and identify disease-associated pathways related to neuronal function, calcium signaling, and circadian regulation, providing insights into the shared biology of cognitive aging across species.",
    methods: ["Genome-wide association study", "Polygenic risk modeling", "Candidate-gene analysis", "Pathway interpretation"],
    impact:
      "Connects veterinary aging research with broader questions in human neurodegenerative disease.",
    image: "/research/canine-ccd-1.jpg",
    imageCaption: "Comparative genomics and genome-wide association studies (GWAS) for canine cognitive dysfunction.",
    images: [
      {
        url: "/research/canine-ccd-1.jpg",
        title: "Canine Cognitive Cohort Study",
        tag: "CANINE AGING · COGNITIVE PHENOTYPE",
        caption: "Canine aging cohort evaluation for canine cognitive dysfunction syndrome as a translational human Alzheimer's model.",
      },
      {
        url: "/research/canine-ccd-2.jpg",
        title: "Alzheimer's & Dementia Brain Imaging",
        tag: "ALZHEIMER'S · BRAIN ATROPHY MRI",
        caption: "Comparative clinical MRI scans showing cortical atrophy, ventricular enlargement, and hippocampal reduction in cognitive decline.",
      },
    ],
  },
];
