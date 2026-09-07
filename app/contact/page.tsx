import { AsciiField } from "../../components/ascii-field";
import { ViewportSection } from "../../components/viewport-section";
import { site } from "../../content/site";

export default function ContactPage() {
  return <>
    <ViewportSection chapter="Contact" tone="ink" className="page-hero contact-hero contact-hero--single">
      <AsciiField words={["VIB LAB", "SEOUL NATIONAL UNIVERSITY", "CONNECT"]} />
      <div className="page-hero__meta"><span>VIB LAB / CONTACT</span><span>SEOUL / KOREA</span></div>
      <div className="page-hero__copy"><p className="eyebrow">START A CONNECTION</p><h1>Let&apos;s work<br />together.</h1></div>
      <div className="contact-hero__single-bottom">
        <a className="contact-email" href={`mailto:${site.email}`}>{site.email} <span>↗</span></a>
        <div className="contact-hero__single-info">
          <p><span>AFFILIATION</span>{site.affiliation}</p>
          <div><a href={`mailto:${site.email}`}>Discuss a collaboration ↗</a><a href={`mailto:${site.email}`}>Research opportunities ↗</a></div>
        </div>
      </div>
    </ViewportSection>
  </>;
}
