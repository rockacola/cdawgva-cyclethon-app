import { journeyData } from './journey-data';

export const DAY_COUNT = 15;

export interface CyclethonSeries {
  color: string;
  dailyTotals: (number | null)[];
  label: string;
  year: number;
}

function buildCyclethon5Totals(): (number | null)[] {
  const days = journeyData
    .filter((d) => d.dayKey.startsWith('day-'))
    .sort((a, b) => {
      const n = (key: string) => parseInt(key.replace('day-', ''), 10);
      return n(a.dayKey) - n(b.dayKey);
    });

  return Array.from({ length: DAY_COUNT }, (_, i) => {
    const day = days[i];
    if (!day) {
      return null;
    }
    const total = day.totalAmountRaised ?? day.amountRaised;
    return total ?? null;
  });
}

export const cyclethonHistory: CyclethonSeries[] = [
  {
    color: '#60a5fa', // blue.400
    dailyTotals: [
      23718,
      50055,
      76261,
      101943,
      137561,
      170064,
      207221,
      316469,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
    ],
    label: 'Cyclethon 1',
    year: 2022,
  },
  {
    color: '#34d399', // emerald.400
    dailyTotals: [
      51275,
      102245,
      135555,
      200586,
      237526,
      287320,
      322761,
      381502,
      551375,
      null,
      null,
      null,
      null,
      null,
      null,
    ],
    label: 'Cyclethon 2',
    year: 2023,
  },
  {
    color: '#a78bfa', // violet.400
    dailyTotals: [
      76490,
      126098,
      175901,
      213141,
      263601,
      317561,
      389153,
      422081,
      470136,
      516297,
      578022,
      630318,
      703374,
      1058265,
      null,
    ],
    label: 'Cyclethon 3',
    year: 2024,
  },
  {
    color: '#fb923c', // orange.400
    dailyTotals: [
      56349, 111784, 164275, 211202, 250873, 275000, 368433, 406668, 467671, 526682, 571200, 625507,
      687175, 754545, 1072459,
    ],
    label: 'Cyclethon 4',
    year: 2025,
  },
  {
    color: '#f43f5e', // rose.500
    dailyTotals: buildCyclethon5Totals(),
    label: 'Cyclethon 5',
    year: 2026,
  },
];

export function buildChartRows() {
  return Array.from({ length: DAY_COUNT }, (_, i) => {
    const row: Record<string, number | null | string> = { day: `Day ${i + 1}` };
    for (const series of cyclethonHistory) {
      row[series.label] = series.dailyTotals[i] ?? null;
    }
    return row;
  });
}
