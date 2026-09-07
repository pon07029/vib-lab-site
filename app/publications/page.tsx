import { PublicationBrowser } from "../../components/publication-browser";
import { publications } from "../../content/publications";

export default function PublicationsPage() {
  return <>
    <section className="publication-browser-section" data-chapter="Archive"><div className="section-heading-row"><div><p className="eyebrow">PUBLICATION ARCHIVE</p><h2>Browse the record.</h2></div><p>Filter by year or publication type. Hover, focus, or tap a title to read its details.</p></div><PublicationBrowser publications={publications} /></section>
  </>;
}
