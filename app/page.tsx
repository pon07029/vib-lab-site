import { DataTunnel } from "../components/data-tunnel";
import { ResearchPulse } from "../components/research-pulse";
import { ViewportSection } from "../components/viewport-section";
import { projects } from "../content/projects";
import { site } from "../content/site";

export default function Home() {
  return <div className="overview-page">
    <ViewportSection chapter="Overview" className="hero-section">
      <div className="hero-copy">
        <div className="hero-copy__main">
          <p className="hero-copy__kicker">Seoul National University</p>
          <h1>{site.statement}</h1>
          <p className="hero-copy__subtitle">Veterinary Informatics <span className="hero-copy__cross">✕</span> Bioinformatics</p>
          <p className="hero-copy__intro">{site.introduction}</p>
          <div className="hero-copy__actions">
            <a href="/research">OUR RESEARCH</a>
            <a href="/people">MEET THE LAB <span>●</span></a>
          </div>
        </div>
        <div className="hero-metrics" aria-label="Lab metrics">
          <div><strong>07</strong><span>ACTIVE PROJECTS</span></div>
          <div><strong>03</strong><span>CONNECTED FIELDS</span></div>
          <div><strong>VIB</strong><span>SNU CVM</span></div>
          <div><strong>AI</strong><span>CLINICAL + BIO</span></div>
          <div><strong>VM</strong><span>ONE HEALTH VIEW</span></div>
        </div>
      </div>
      <DataTunnel words={["ANIMAL HEALTH", "BIOLOGICAL DATA", "VIB LAB", "AI"]} />
      <a className="hero-scroll-cue" href="#research-gaps" aria-label="Scroll to research gaps"><span>SCROLL</span><i>↓</i></a>
    </ViewportSection>

    <ViewportSection id="research-gaps" chapter="Research gaps" className="pipeline-section">
      <div className="pipeline-terminal">
        <div className="pipeline-terminal__bar"><span><i /><i /><i /></span><span>VIB://RESEARCH-OVERVIEW</span><span>RUNNING</span></div>
        <div className="pipeline-terminal__flow">
          <div><span>DATA / 01</span><strong>Veterinary<br />Informatics</strong><small>clinical records · snomed ct · emr</small></div>
          <b>→</b><div><span>DATA / 02</span><strong>Multi-omics &<br />Lifestyle data</strong><small>genomics · transcriptomics · personal data</small></div>
          <b>→</b><div className="is-active"><span>MODEL / 03</span><strong>Artificial<br />Intelligence</strong><small>multi-agent · deep learning · llm</small></div>
        </div>
        <div className="pipeline-terminal__log"><span>12:01:06</span><p>VM BI LAB is a research group at the College of Veterinary Medicine, Seoul National University.</p><i>● LIVE</i></div>
      </div>
      <div className="pipeline-statement"><p className="eyebrow">RESEARCH OVERVIEW</p><h2>Understanding health across species through data and AI.</h2><p>We integrate biological, clinical, and real-world health data with bioinformatics and artificial intelligence to better understand health and disease across species. Our research develops data-driven approaches spanning veterinary medicine, biology, and personal health.</p></div>
    </ViewportSection>

    <ViewportSection chapter="Research field" tone="ink" className="research-pulse-section">
      <ResearchPulse projects={projects} />
    </ViewportSection>

  </div>;
}
