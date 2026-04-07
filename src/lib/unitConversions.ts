export const KM_TO_MI = 0.621371;
export const MS_TO_KMH = 3.6;
export const MS_TO_MPH = 2.237;
export const KCAL_TO_KJ = 4.184;

export const celsiusToFahrenheit = (c: number): number => (c * 9) / 5 + 32;

export function formatMinutesToCyclingTime(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}h ${m}m`;
}
