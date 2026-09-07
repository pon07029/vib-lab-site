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
          <p className="hero-copy__kicker">BUILT FOR CONNECTED ANIMAL HEALTH.</p>
          <h1>{site.statement}</h1>
          <p className="hero-copy__intro">{site.introduction}</p>
          <div className="hero-copy__actions">
            <a href="/research">OUR RESEARCH</a>
            <a href="/people">MEET THE LAB <span>●</span></a>
          </div>
        </div>
        <div className="hero-metrics" aria-label="Lab metrics">
          <div><strong>06</strong><span>ACTIVE PROJECTS</span></div>
          <div><strong>03</strong><span>CONNECTED FIELDS</span></div>
          <div><strong>VIB</strong><span>SNU CVM</span></div>
          <div><strong>AI</strong><span>CLINICAL + BIO</span></div>
          <div><strong>01</strong><span>ONE HEALTH VIEW</span></div>
        </div>
      </div>
      <DataTunnel words={["ANIMAL HEALTH", "BIOLOGICAL DATA", "VIB LAB", "AI"]} />
      <a className="hero-scroll-cue" href="#research-gaps" aria-label="Scroll to research gaps"><span>SCROLL</span><i>↓</i></a>
    </ViewportSection>

    <ViewportSection id="research-gaps" chapter="Research gaps" className="pipeline-section">
      <div className="pipeline-terminal">
        <div className="pipeline-terminal__bar"><span><i /><i /><i /></span><span>VIB://CONNECTED-EVIDENCE</span><span>RUNNING</span></div>
        <div className="pipeline-terminal__flow">
          <div><span>INPUT / 01</span><strong>CLINICAL<br />RECORDS</strong><small>notes · visits · outcomes</small></div>
          <b>→</b><div><span>INPUT / 02</span><strong>GENOMIC<br />SIGNALS</strong><small>variants · expression · pathways</small></div>
          <b>→</b><div className="is-active"><span>SYSTEM / 03</span><strong>INTELLIGENT<br />MODELS</strong><small>retrieve · reason · evaluate</small></div>
        </div>
        <div className="pipeline-terminal__log"><span>12:01:06</span><p>Linking evidence across species and scales</p><i>● LIVE</i></div>
      </div>
      <div className="pipeline-statement"><p className="eyebrow">RESEARCH GAPS / CONNECTED PURPOSE</p><h2>Three data worlds.<br />One health question.</h2><p>We design methods around the relationship between an animal, its biology, and its care—not around a single file format.</p></div>
    </ViewportSection>

    <ViewportSection chapter="Research field" tone="ink" className="research-pulse-section">
      <ResearchPulse projects={projects} />
    </ViewportSection>

  </div>;
}
