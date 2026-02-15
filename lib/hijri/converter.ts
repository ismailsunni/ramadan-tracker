import type { HijriDate } from "@/lib/types";

// Default Ramadan 1447 start date (can be overridden)
const DEFAULT_RAMADAN_START = "2026-02-18"; // 1 Ramadan 1447
const RAMADAN_YEAR = 1447;

/**
 * Parse date string to Date object
 */
function parseDate(dateString: string): Date {
  const date = new Date(dateString);
  // Set to start of day to avoid timezone issues
  date.setHours(0, 0, 0, 0);
  return date;
}

/**
 * Convert Gregorian date to Hijri
 * @param date - Gregorian date to convert
 * @param ramadanStartDate - Optional custom Ramadan start date (YYYY-MM-DD)
 */
export function gregorianToHijri(date: Date, ramadanStartDate?: string): HijriDate {
  const startDate = parseDate(ramadanStartDate || DEFAULT_RAMADAN_START);
  const targetDate = new Date(date);
  targetDate.setHours(0, 0, 0, 0);

  const daysDiff = Math.floor(
    (targetDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  // If within Ramadan period (30 days)
  if (daysDiff >= 0 && daysDiff < 30) {
    return {
      year: RAMADAN_YEAR,
      month: 9, // Ramadan is month 9
      day: daysDiff + 1,
    };
  }

  // For dates outside Ramadan, return approximate values
  const totalDaysFromStart = daysDiff;
  const hijriMonth = 9 + Math.floor(totalDaysFromStart / 29.5);
  const hijriDay = (totalDaysFromStart % 29) + 1;

  return {
    year: RAMADAN_YEAR,
    month: ((hijriMonth - 1) % 12) + 1,
    day: Math.min(hijriDay, 30),
  };
}

/**
 * Convert Hijri date to Gregorian
 * @param year - Hijri year
 * @param month - Hijri month
 * @param day - Hijri day
 * @param ramadanStartDate - Optional custom Ramadan start date (YYYY-MM-DD)
 */
export function hijriToGregorian(
  year: number,
  month: number,
  day: number,
  ramadanStartDate?: string
): Date {
  const startDate = parseDate(ramadanStartDate || DEFAULT_RAMADAN_START);

  // For Ramadan 1447
  if (year === RAMADAN_YEAR && month === 9) {
    const resultDate = new Date(startDate);
    resultDate.setDate(startDate.getDate() + day - 1);
    return resultDate;
  }

  // For other dates, return approximate
  const daysOffset = (month - 9) * 29.5 + (day - 1);
  const resultDate = new Date(startDate);
  resultDate.setDate(startDate.getDate() + daysOffset);
  return resultDate;
}

/**
 * Get current Hijri year
 */
export function getCurrentRamadanYear(): number {
  return RAMADAN_YEAR;
}

/**
 * Generate array of Gregorian dates for all 30 days of Ramadan
 * @param hijriYear - Hijri year
 * @param ramadanStartDate - Optional custom Ramadan start date (YYYY-MM-DD)
 */
export function generateRamadanDates(hijriYear: number, ramadanStartDate?: string): Date[] {
  const dates: Date[] = [];

  for (let day = 1; day <= 30; day++) {
    const gregorianDate = hijriToGregorian(hijriYear, 9, day, ramadanStartDate);
    dates.push(gregorianDate);
  }

  return dates;
}

/**
 * Format Hijri date as string
 */
export function formatHijriDate(hijriDate: HijriDate): string {
  const monthNames = [
    "Muharram",
    "Safar",
    "Rabi' al-Awwal",
    "Rabi' al-Thani",
    "Jumada al-Awwal",
    "Jumada al-Thani",
    "Rajab",
    "Sha'ban",
    "Ramadan",
    "Shawwal",
    "Dhu al-Qi'dah",
    "Dhu al-Hijjah",
  ];

  const monthName = monthNames[hijriDate.month - 1] || "Unknown";

  return `${hijriDate.day} ${monthName} ${hijriDate.year}`;
}

/**
 * Get Ramadan day number (1-30) from a Hijri date
 * Returns null if the date is not in Ramadan
 */
export function getRamadanDayNumber(hijriDate: HijriDate): number | null {
  if (hijriDate.month === 9 && hijriDate.year === RAMADAN_YEAR) {
    return hijriDate.day;
  }
  return null;
}
