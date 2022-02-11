
export function dateFromMinSinceEpoch(minSinceEpoch: number): string {
  const date = new Date(minSinceEpoch * 60000);
  return date.toLocaleDateString();
}
