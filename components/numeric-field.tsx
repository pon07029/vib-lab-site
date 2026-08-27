const NUMBER_FIELD = Array.from({ length: 80 }, (_, row) =>
  Array.from({ length: 192 }, (_, column) => (row * 7 + column * 3) % 10).join(" "),
).join("\n");

export function NumericField() {
  return <div className="numeric-field" aria-hidden="true">{NUMBER_FIELD}</div>;
}
