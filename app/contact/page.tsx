import { AsciiField } from "../../components/ascii-field";
import { Footer } from "../../components/footer";
import { ViewportSection } from "../../components/viewport-section";
import { site } from "../../content/site";

export default function ContactPage() {
  return <>
    <ViewportSection chapter="Contact" tone="ink" className="page-hero contact-hero">
      <AsciiField words={["VIB LAB", "SEOUL NATIONAL UNIVERSITY", "CONNECT"]} />
      <div className="page-hero__meta"><span>VIB LAB / CONTACT</span><span>SEOUL / KOREA</span></div>
      <div className="page-hero__copy"><p className="eyebrow">START A CONNECTION</p><h1>Questions become<br />research together.</h1></div>
      <a className="contact-email" href={`mailto:${site.email}`}>{site.email} <span>↗</span></a>
    </ViewportSection>
    <ViewportSection chapter="Affiliation" className="contact-chapter"><span className="contact-chapter__index">01 / AFFILIATION</span><h2>{site.affiliation}</h2><p>Veterinary Informatics &amp; Bioinformatics</p></ViewportSection>
    <ViewportSection chapter="Collaboration" tone="signal" className="contact-chapter"><span className="contact-chapter__index">02 / COLLABORATION</span><h2>Bring a dataset.<br />Bring a health question.</h2><p>We work with clinicians, biologists, engineers, and public-health researchers on connected translational problems.</p><a className="text-action" href={`mailto:${site.email}`}>Discuss a collaboration <span>↗</span></a></ViewportSection>
    <ViewportSection chapter="Recruitment" tone="ink" className="contact-chapter"><span className="contact-chapter__index">03 / RECRUITMENT</span><h2>Medicine, data,<br />and AI need each other.</h2><p>Students interested in rigorous, clinically meaningful research can introduce their background and questions by email.</p><a className="text-action text-action--light" href={`mailto:${site.email}`}>Contact VIB Lab <span>↗</span></a></ViewportSection>
    <Footer />
  </>;
}
