import { AlumniArchive } from "../../components/alumni-archive";
import { MentorsSection } from "../../components/ui/mentors-section";
import { ViewportSection } from "../../components/viewport-section";
import { alumni, people } from "../../content/people";

export default function PeoplePage() {
  return <>
    <ViewportSection chapter="People" tone="ink" className="page-hero people-hero">
      <div className="page-hero__meta"><span>VIB LAB / PEOPLE</span><span>MEDICINE × DATA × AI</span></div>
      <div className="page-hero__copy"><p className="eyebrow">THE LAB IS A NETWORK</p><h1>Different fields.<br />Shared questions.</h1><p>We bring veterinary knowledge, biology, and computation into the same room. Meet the people behind the work.</p></div>
      <div className="page-hero__index">08 PROFILES <span>SELECT A PERSON</span></div>
    </ViewportSection>
    <ViewportSection chapter="Directory" className="mentors-viewport"><MentorsSection people={people} /></ViewportSection>
    <ViewportSection chapter="Alumni" className="alumni-viewport">
      <AlumniArchive alumni={alumni} />
    </ViewportSection>
  </>;
}
