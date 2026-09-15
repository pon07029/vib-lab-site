import { AlumniArchive } from "../../components/alumni-archive";
import { MentorsSection } from "../../components/ui/mentors-section";
import { ViewportSection } from "../../components/viewport-section";
import { alumni, people } from "../../content/people";

export default function PeoplePage() {
  return <>
    <ViewportSection chapter="People" tone="ink" className="page-hero people-hero">
      <div className="page-hero__meta"><span>VIB LAB / PEOPLE</span></div>
      <div className="page-hero__copy"><p className="eyebrow">THE LAB IS A NETWORK</p><h1>One lab, plenty of interests.</h1><p>Meet our members and see what each of them is exploring.</p></div>
      <div className="page-hero__index">08 PROFILES</div>
    </ViewportSection>
    <ViewportSection chapter="Directory" className="mentors-viewport"><MentorsSection people={people} /></ViewportSection>
    <ViewportSection chapter="Alumni" className="alumni-viewport">
      <AlumniArchive alumni={alumni} />
    </ViewportSection>
  </>;
}
