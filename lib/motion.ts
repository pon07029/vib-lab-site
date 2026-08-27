export function motionAllowed(query: Pick<MediaQueryList, "matches"> | null) {
  return query ? !query.matches : true;
}
