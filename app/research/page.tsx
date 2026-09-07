import { ResearchConsole } from "../../components/research-console";
import { ViewportSection } from "../../components/viewport-section";
import { projects } from "../../content/projects";

export default function ResearchPage() {
  return <>
    <ViewportSection chapter="Console" className="console-section console-section--full console-section--research"><div className="section-intro"><p className="eyebrow">RESEARCH CONSOLE</p><h2>Explore our research.</h2></div><ResearchConsole projects={projects} /></ViewportSection>
  </>;
}
