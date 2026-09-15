import { AsciiField } from "../../components/ascii-field";
import { ViewportSection } from "../../components/viewport-section";
import { site } from "../../content/site";

export default function ContactPage() {
  return (
    <>
      {/* 1. Hero Section (First Screen) */}
      <ViewportSection chapter="Contact" tone="ink" className="page-hero contact-hero contact-hero--single">
        <AsciiField words={["VIB LAB", "SEOUL NATIONAL UNIVERSITY", "CONNECT"]} />
        <div className="page-hero__meta">
          <span>VIB LAB / CONTACT</span>
          <span>SEOUL / KOREA</span>
        </div>
        <div className="page-hero__copy">
          <p className="eyebrow">Contact us</p>
          <h1>Like what we do?<br />Come do it with us.</h1>
        </div>
        <div className="contact-hero__single-bottom">
          <a className="contact-email" href={`mailto:${site.email}`}>
            {site.email} <span>↗</span>
          </a>
        </div>
      </ViewportSection >

      {/* 2. Details Section (Scroll Down) */}
      < ViewportSection chapter="Information" tone="paper" className="contact-details-section" >
        <div className="contact-details-container">

          {/* Row 1: Two cards (Open Positions & Email Inquiries) */}
          <div className="contact-cards-row">

            {/* Card 01: Open Positions */}
            <article className="contact-card contact-card--dark">
              <div className="contact-card__top">
                <div className="contact-card__badge">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <line x1="19" y1="8" x2="19" y2="14" />
                    <line x1="22" y1="11" x2="16" y2="11" />
                  </svg>
                  <span>Open Positions</span>
                </div>
                <span className="contact-card__number">01</span>
              </div>
              <h2 className="contact-card__title">Who we would like to meet</h2>
              <ul className="contact-card__list">
                <li><span>→</span> Graduate students (Integrated M.S.-Ph.D.)</li>
                <li><span>→</span> Undergraduate researchers</li>
              </ul>
            </article>

            {/* Card 02: Email Inquiries */}
            <article className="contact-card contact-card--light">
              <div className="contact-card__top">
                <div className="contact-card__badge">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  <span>Email Inquiries</span>
                </div>
                <span className="contact-card__number">02</span>
              </div>
              <a href={`mailto:${site.email}`} className="contact-card__email">
                {site.email}
              </a>
              <p className="contact-card__desc">For student applications and general questions.</p>
            </article>

          </div>

          {/* Row 2: Full width card (For Prospective Students) */}
          <article className="contact-card contact-card--wide">
            <div className="contact-card__top">
              <div className="contact-card__badge">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21.42 10.922a1 1 0 0 0-.019-.838L12.83 2.18a2 2 0 0 0-1.66 0L2.6 10.084a1 1 0 0 0 0 1.832l3.4 1.5v4.584a2 2 0 0 0 1.09 1.772l4 2a2 2 0 0 0 1.82 0l4-2a2 2 0 0 0 1.09-1.772v-4.584l3.42-1.5z" />
                  <path d="M6 12v5c3 3 9 3 12 0v-5" />
                </svg>
                <span>For Prospective Students</span>
              </div>
              <span className="contact-card__number">03</span>
            </div>
            <div className="contact-card__prospective-body">
              <div className="contact-card__prospective-title">
                <h2>Our door is open.<br />Let&apos;s start a conversation.</h2>
              </div>
              <div className="contact-card__prospective-content">
                <p>
                  We are actively looking for motivated graduate students (Integrated M.S.-Ph.D.) and
                  Undergraduate researchers. If you are interested in joining our lab or our research,
                  please send your CV and a brief statement of research interests.
                </p>
                <a
                  href={`mailto:${site.email}?subject=Application%20for%20VIB%20Lab`}
                  className="contact-card__cta-btn"
                >
                  Apply to Lab ↗
                </a>
              </div>
            </div>
          </article>

          {/* Row 3: Lab Location & Map */}
          <article className="contact-card contact-card--location">
            <div className="contact-location-layout">
              {/* Left Column: Address Information */}
              <div className="contact-location-info">
                <div className="contact-card__top">
                  <div className="contact-card__badge">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <span>Lab Location</span>
                  </div>
                </div>

                <h2 className="contact-location-title">Visit the lab</h2>

                <div className="contact-location-meta">
                  <p className="contact-location-address">
                    <strong>College of Veterinary Medicine (Bldg 85)</strong><br />
                    Seoul National University<br />
                    1 Gwanak-ro, Gwanak-gu, Seoul, Republic of Korea, 08826
                  </p>
                  <p className="contact-location-rooms">
                    <span>Professor's Rm#: 631호</span><br />
                    <span>Student's Rm#: 413-1호</span>
                  </p>
                </div>

                <a
                  href="https://www.google.com/maps/search/?api=1&query=%EC%84%9C%EC%9A%B8%EB%8C%80%ED%95%99%EA%B5%90+85%EB%8F%99+%EC%88%98%EC%9D%98%EA%B3%BC%EB%8C%80%ED%95%99"
                  target="_blank"
                  rel="noreferrer"
                  className="contact-location-map-link"
                >
                  Open in Google Maps ↗
                </a>
              </div>

              {/* Right Column: Google Map Embed */}
              <div className="contact-map-wrapper">
                <iframe
                  title="Seoul National University College of Veterinary Medicine Bldg 85"
                  src="https://maps.google.com/maps?q=%EC%84%9C%EC%9A%B8%EB%8C%80%ED%95%99%EA%B5%90%2085%EB%8F%99%20%EC%88%98%EC%9D%98%EA%B3%BC%EB%8C%80%ED%95%99&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </article>

        </div >
      </ViewportSection >
    </>
  );
}
