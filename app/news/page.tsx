import { NewsBrowser } from "../../components/news-browser";
import { ViewportSection } from "../../components/viewport-section";
import { newsItems } from "../../content/news";

export default function NewsPage() {
  return (
    <>
      <ViewportSection chapter="News" tone="ink" className="page-hero news-hero">
        <div className="page-hero__meta">
          <span>VIB LAB / NEWS &amp; MEDIA</span>
        </div>
        <div className="page-hero__copy">
          <p className="eyebrow">LABORATORY UPDATES</p>
          <h1>What’s happening in VIB Lab.</h1>
          <p>Recent news, press features, and announcements from our research group.</p>
        </div>
        <div className="page-hero__index">
          {String(newsItems.length).padStart(2, "0")} ARTICLES
        </div>
      </ViewportSection>

      <ViewportSection chapter="Articles" tone="paper" className="news-viewport">
        <NewsBrowser items={newsItems} />
      </ViewportSection>
    </>
  );
}
