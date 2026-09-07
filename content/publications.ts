import sourcePublications from "./publications.json";

type SourcePublication = {
  id: string;
  title: string;
  authors: string[];
  year: number;
  date: string;
  journal: string;
  type: string;
  doi: string;
  pmid: string;
  url: string;
  keywords: string[];
};

export type Publication = {
  id: string;
  year: number;
  date: string;
  area: string;
  type: string;
  title: string;
  authors: string;
  journal: string;
  contribution: string;
  keywords: string[];
  doi?: string;
  pmid?: string;
  url?: string;
};

const formatType = (value: string) => value
  .split("-")
  .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
  .join(" ");

const stripMarkup = (value: string) => value.replace(/<\/?[^>]+>/g, "");

export const publications: Publication[] = (sourcePublications as SourcePublication[]).map((item) => {
  const type = formatType(item.type);
  return {
    id: item.id,
    year: item.year,
    date: item.date,
    area: type,
    type,
    title: stripMarkup(item.title),
    authors: item.authors.join(", "),
    journal: item.journal,
    contribution: item.keywords.slice(0, 5).join(" · ") || type,
    keywords: item.keywords,
    doi: item.doi || undefined,
    pmid: item.pmid || undefined,
    url: /^https:\/\//.test(item.url) ? item.url : undefined,
  };
});
