export function AsciiField({ words, compact = false }: { words: string[]; compact?: boolean }) {
  const line = words.join("  •  ").toUpperCase();
  return (
    <div className={`ascii-field ${compact ? "ascii-field--compact" : ""}`} aria-hidden="true">
      {Array.from({ length: compact ? 8 : 18 }, (_, index) => (
        <div key={index} style={{ transform: `translateX(${(index % 3) * -7}ch)` }}>{line}  {line}  {line}</div>
      ))}
    </div>
  );
}
