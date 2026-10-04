export type PersonRole =
  | "Professor"
  | "Graduate Students"
  | "Research Staff"
  | "Undergraduate"
  | "Developer"
  | "Alumni";

export type Person = {
  id: string;
  name: string;
  role: PersonRole;
  displayRole?: string;
  email?: string;
  focus: string;
  projects: string[];
  bio: string;
  image: string;
};

export const people: Person[] = [
  { id: "younghee-lee", name: "Younghee Lee", role: "Professor", displayRole: "Principal Investigator", email: "amazon@snu.ac.kr", focus: "Bioinformatics, Veterinary Informatics, Artificial Intelligence", projects: [], bio: "Professor Younghee Lee leads the SNU VM BI Lab, dedicated to pioneering data-driven discoveries at the intersection of bioinformatics, veterinary informatics, and artificial intelligence.", image: "/people/Younghee_Lee.jpg" },
  { id: "minkyung-choi", name: "Minkyung Choi", role: "Graduate Students", displayRole: "Integrated M.S.-Ph.D. Student", focus: "Bioinformatics, Health Informatics, Medical Informatics, Machine Learning", projects: ["PHR-based Chronic Disease Prediction"], bio: "Interested in translating large-scale lifestyle, clinical, and genomic data into predictive models for disease prevention and personalized care.", image: "/people/Minkyung_Choi.jpg" },
  { id: "jeonghyun-lee", name: "Jeonghyun Lee", role: "Graduate Students", displayRole: "Integrated M.S.-Ph.D. Student", focus: "Bioinformatics, LLM, Transformer, Multi-omics, Alternative Splicing", projects: ["Splicing Transformer"], bio: "Builds transformer-based approaches to study gene regulation and disease-related molecular patterns through multi-omics data integration.", image: "/people/Jeonghyun_Lee.jpg" },
  { id: "angela-do-youn-kim", name: "Angela Do Youn Kim", role: "Graduate Students", displayRole: "M.S. Student", focus: "Bioinformatics, LLM, SNOMED CT, AI Agent", projects: ["Telepet", "Standardization of Clinical Terminology in Veterinary Medicine"], bio: "Develops multimodal AI for companion-animal emotion prediction and veterinary clinical terminology systems based on SNOMED CT.", image: "/people/Angeladoyoun_Kim.jpg" },
  { id: "arok-choi", name: "Arok Choi", role: "Graduate Students", displayRole: "M.S. Student", focus: "Mobile Health, On-device SLM, Health Data Visualization", projects: ["MyHealthMart"], bio: "Develops chat-based interfaces that use on-device small language models to turn natural-language health questions into useful charts.", image: "/people/Arok_Choi.jpg" },
  { id: "younghan-song", name: "Younghan Song", role: "Graduate Students", displayRole: "M.S. Student", focus: "Comparative Genomics, GWAS, Neurogenomics", projects: ["Canine CCD"], bio: "Studies the genetic architecture of canine cognitive dysfunction as a comparative model for Alzheimer's disease.", image: "/people/Younghan_Song.jpg" },
  { id: "solhee-hong", name: "Solhee Hong", role: "Research Staff", displayRole: "Assistant Researcher", focus: "Veterinary Informatics, SNOMED CT, LLM", projects: ["Standardization of Clinical Terminology in Veterinary Medicine", "Telepet"], bio: "Standardizes veterinary clinical data with manual and LLM-assisted SNOMED CT mapping and contributes to multimodal companion-animal AI.", image: "/people/Solhee_Hong.jpg" },
  { id: "hyeongjin-ju", name: "Hyeongjin Ju", role: "Undergraduate", displayRole: "Undergraduate Student", focus: "Veterinary Informatics, LLM, Animal Health, CDSS", projects: ["AIChatVet"], bio: "Develops LLM-based clinical decision-support systems for veterinary practice and teleconsultation.", image: "/people/Hyeongjin_Ju.jpg" },
  { id: "chaehojun-jeong", name: "Chaehojun Jeong", role: "Undergraduate", displayRole: "Undergraduate Student", focus: "", projects: [], bio: "", image: "/people/Chaehojun_Jeong.jpg" },
  { id: "rokdam-choi", name: "Rokdam Choi", role: "Developer", displayRole: "Developer", focus: "", projects: [], bio: "", image: "/people/Rokdam_Choi.jpg" },
];

export type AlumnusAffiliation = "SNU" | "University of Utah";

export type Alumnus = {
  id: string;
  name: string;
  credential: string;
  affiliation: AlumnusAffiliation;
};

export const alumni: Alumnus[] = [
  { id: "soo-ah-cho", name: "Soo-ah Cho", credential: "M.S. Student", affiliation: "SNU" },
  { id: "byungwook-oh", name: "Byungwook Oh", credential: "M.S. Student", affiliation: "SNU" },
  { id: "wongyung-choi", name: "Wongyung Choi", credential: "Undergraduate Researcher", affiliation: "SNU" },
  { id: "ingi-song", name: "Ingi Song", credential: "Undergraduate Student", affiliation: "SNU" },
  { id: "nahyun-kim", name: "Nahyun Kim", credential: "Undergraduate Student", affiliation: "SNU" },
  { id: "seonggyun-han", name: "Seonggyun Han", credential: "M.S. Student", affiliation: "University of Utah" },
  { id: "youngjoo-jin", name: "Youngjoo Jin", credential: "MD, Ph.D", affiliation: "University of Utah" },
  { id: "habtamu-minassie-aycheh", name: "Habtamu Minassie Aycheh", credential: "Ph.D", affiliation: "University of Utah" },
  { id: "john-chamberlin", name: "John Chamberlin", credential: "Ph.D", affiliation: "University of Utah" },
  { id: "juhyun-park", name: "Juhyun Park", credential: "MSc. Student", affiliation: "University of Utah" },
  { id: "jaehang-shin", name: "Jaehang Shin", credential: "MSc. Student", affiliation: "University of Utah" },
];
