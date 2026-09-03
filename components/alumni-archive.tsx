import type { Alumnus } from "../content/people";

type AlumniArchiveProps = { alumni: Alumnus[] };

export function AlumniArchive({ alumni }: AlumniArchiveProps) {
  return (
    <section className="alumni-archive" aria-labelledby="alumni-heading">
      <div className="alumni-archive__intro">
        <p className="eyebrow">PEOPLE / 02</p>
        <h2 id="alumni-heading">Alumni<br />archive</h2>
        <p>The people who carried VIB Lab&apos;s questions forward. A distinct record of the lab&apos;s research community.</p>
        <p className="alumni-archive__count">{String(alumni.length).padStart(2, "0")} RECORDS</p>
      </div>
      <ol className="alumni-archive__list" aria-label="Alumni records" tabIndex={0}>
        {alumni.map((alumnus, index) => (
          <li key={alumnus.id}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h3>{alumnus.name}</h3>
            <p>{alumnus.credential} / Alumni</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
