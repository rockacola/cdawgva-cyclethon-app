/**
 * Returns `singular` when count is 1, otherwise `plural`
 * (defaults to singular + "s").
 */
export function pluralize(count: number, singular: string, plural?: string): string {
  return count === 1 ? singular : (plural ?? `${singular}s`);
}
