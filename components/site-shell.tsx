"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "../content/site";
import { activeRoute } from "../lib/route";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [chapter, setChapter] = useState(0);
  const [chapterCount, setChapterCount] = useState(1);
  const current = activeRoute(pathname);
  const isGalleryRoute = pathname === "/notice";

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-chapter]"));
    if (!sections.length) return;
    const updateCount = requestAnimationFrame(() => setChapterCount(sections.length));
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setChapter(Math.max(0, sections.indexOf(visible.target as HTMLElement)));
    }, { threshold: [0.35, 0.6] });
    sections.forEach((section) => observer.observe(section));
    return () => {
      cancelAnimationFrame(updateCount);
      observer.disconnect();
    };
  }, [pathname]);

  return (
    <>
      <header className={`site-nav ${isGalleryRoute ? "site-nav--gallery" : ""} ${menuOpen ? "is-menu-open" : ""}`} aria-label="Primary navigation">
        <div className="site-nav__bar">
          <a className="site-nav__mark" href="/overview" aria-label="VIB Lab home">VIB<span>•</span></a>
          <nav className="site-nav__links" aria-label="Main routes">
            {site.navigation.map((item, index) => (
              <a key={item.label} href={item.href} aria-label={item.label} aria-current={current === item.label ? "page" : undefined} onClick={() => setMenuOpen(false)}>
                <span className="site-nav__number">0{index + 1}</span>
                <span className="site-nav__label" data-label={item.label}>{item.label}</span>
              </a>
            ))}
          </nav>
          <button className="site-nav__menu-toggle" type="button" aria-expanded={menuOpen} aria-label={menuOpen ? "Close menu" : "Open menu"} onClick={() => setMenuOpen((value) => !value)}>
            {menuOpen ? "CLOSE" : "MENU"}
          </button>
        </div>
        <div className="site-nav__ticker">
          <div className="site-nav__ticker-track" aria-hidden="true">
            <span>VETERINARY INFORMATICS &amp; BIOINFORMATICS</span><i>●</i><span>SEOUL NATIONAL UNIVERSITY</span><i>●</i><span>06 ACTIVE PROJECTS</span><i>●</i>
            <span>VETERINARY INFORMATICS &amp; BIOINFORMATICS</span><i>●</i><span>SEOUL NATIONAL UNIVERSITY</span><i>●</i><span>06 ACTIVE PROJECTS</span><i>●</i>
          </div>
        </div>
      </header>
      <div className="page-minimap" aria-label={`Chapter ${chapter + 1} of ${chapterCount}`}>
        <div className="page-minimap__head"><span>0{chapter + 1}</span><span>0{chapterCount}</span></div>
        <div className="page-minimap__map" aria-hidden="true">
          {Array.from({ length: Math.min(chapterCount, 9) }, (_, index) => <i key={index} className={index === chapter ? "is-active" : ""} />)}
        </div>
      </div>
      <main className="site-main" key={pathname}>{children}</main>
    </>
  );
}
