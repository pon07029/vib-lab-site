import { site } from "../content/site";
import { AsciiField } from "./ascii-field";

export function Footer() {
  return (
    <footer className="site-footer">
      <AsciiField compact words={["VIB LAB", "SNU", "ANIMAL HEALTH", "DATA", "AI"]} />
      <div className="site-footer__content">
        <div><p className="eyebrow">Veterinary Informatics &amp; Bioinformatics</p><a href={`mailto:${site.email}`}>{site.email} ↗</a></div>
        <nav aria-label="Footer navigation">{site.navigation.map((item) => <a key={item.label} href={item.href}>{item.label}</a>)}</nav>
        <p className="site-footer__affiliation">{site.affiliation}</p>
        <p className="site-footer__copyright">© 2026 VIB Lab</p>
      </div>
    </footer>
  );
}
