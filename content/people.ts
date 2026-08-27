export type Person = {
  id: string;
  name: string;
  role: "Researcher" | "Student" | "Lab Member";
  focus: string;
  projects: string[];
  bio: string;
  image: string;
};

export const people: Person[] = [
  { id: "arok-choi", name: "Arok Choi", role: "Student", focus: "Mobile health, on-device SLM, and health-data visualization", projects: ["MyHealthMart"], bio: "Develops chat-based interfaces that use on-device small language models to turn natural-language health questions into useful charts.", image: "/people/Arok_Choi.jpg" },
  { id: "minkyung-choi", name: "Minkyung Choi", role: "Lab Member", focus: "Bioinformatics, health informatics, and machine learning", projects: [], bio: "Interested in translating large-scale lifestyle, clinical, and genomic data into predictive models for disease prevention and personalized care.", image: "/people/Minkyung_Choi.jpg" },
  { id: "jeonghyun-lee", name: "Jeonghyun Lee", role: "Student", focus: "Bioinformatics, transformers, multi-omics, and alternative splicing", projects: ["Splicing Transformer"], bio: "Builds transformer-based approaches to study gene regulation and disease-related molecular patterns through multi-omics data integration.", image: "/people/Jeonghyun_Lee.jpg" },
  { id: "younghan-song", name: "Younghan Song", role: "Student", focus: "Comparative genomics, GWAS, and neurogenomics", projects: ["Canine CCD"], bio: "Studies the genetic architecture of canine cognitive dysfunction as a comparative model for Alzheimer's disease.", image: "/people/Younghan_Song.jpg" },
  { id: "younghee-lee", name: "Younghee Lee", role: "Lab Member", focus: "VIB Lab", projects: [], bio: "Profile details will be added when approved member information is available.", image: "/people/Younghee_Lee.jpg" },
  { id: "hyeongjin-ju", name: "Hyeongjin Ju", role: "Student", focus: "Veterinary informatics, LLMs, animal health, and CDSS", projects: ["AIChatVet"], bio: "Develops LLM-based clinical decision-support systems for veterinary practice and teleconsultation.", image: "/people/Hyeongjin_Ju.jpg" },
  { id: "solhee-hong", name: "Solhee Hong", role: "Researcher", focus: "Veterinary informatics, SNOMED CT, LLMs, and Python", projects: ["Veterinary SNOMED CT Mapping", "Telepet"], bio: "Standardizes veterinary clinical data with manual and LLM-assisted SNOMED CT mapping and contributes to multimodal companion-animal AI.", image: "/people/Solhee_Hong.jpg" },
  { id: "angela-do-youn-kim", name: "Angela Do Youn Kim", role: "Student", focus: "Bioinformatics, LLMs, SNOMED CT, and AI agents", projects: ["Telepet", "Veterinary SNOMED CT Mapping"], bio: "Develops multimodal AI for companion-animal emotion prediction and veterinary clinical terminology systems based on SNOMED CT.", image: "/people/Angeladoyoun_Kim.jpg" },
];

export type Alumnus = {
  id: string;
  name: string;
  credential: string;
};

export const alumni: Alumnus[] = [
  { id: "soo-ah-cho", name: "Soo-ah Cho", credential: "M.S. Student" },
  { id: "byungwook-oh", name: "Byungwook Oh", credential: "M.S. Student" },
  { id: "wongyung-choi", name: "Wongyung Choi", credential: "Undergraduate Researcher" },
  { id: "ingi-song", name: "Ingi Song", credential: "Undergraduate Student" },
  { id: "nahyun-kim", name: "Nahyun Kim", credential: "Undergraduate Student" },
  { id: "seonggyun-han", name: "Seonggyun Han", credential: "M.S. Student" },
  { id: "youngjoo-jin", name: "Youngjoo Jin", credential: "MD, Ph.D" },
  { id: "habtamu-minassie-aycheh", name: "Habtamu Minassie Aycheh", credential: "Ph.D" },
  { id: "john-chamberlin", name: "John Chamberlin", credential: "Ph.D" },
  { id: "juhyun-park", name: "Juhyun Park", credential: "MSc. Student" },
  { id: "jaehang-shin", name: "Jaehang Shin", credential: "MSc. Student" },
];
