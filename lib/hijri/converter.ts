import type { HijriDate } from "@/lib/types";

// Ramadan 1447 dates (2026)
// Ramadan starts approximately on February 17, 2026
const RAMADAN_1447_START = new Date(2026, 1, 17); // Month is 0-indexed (1 = February)
const RAMADAN_YEAR = 1447;

/**
 * Convert Gregorian date to Hijri
 * Simplified implementation for Ramadan tracking
 */
export function gregorianToHijri(date: Date): HijriDate {
  const daysDiff = Math.floor(
    (date.getTime() - RAMADAN_1447_START.getTime()) / (1000 * 60 * 60 * 24)
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
  // This is a simplified calculation
  const totalDaysFromStart = Math.floor(
    (date.getTime() - RAMADAN_1447_START.getTime()) / (1000 * 60 * 60 * 24)
  );
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
 */
export function hijriToGregorian(
  year: number,
  month: number,
  day: number
): Date {
  // For Ramadan 1447
  if (year === RAMADAN_YEAR && month === 9) {
    const resultDate = new Date(RAMADAN_1447_START);
    resultDate.setDate(RAMADAN_1447_START.getDate() + day - 1);
    return resultDate;
  }

  // For other dates, return approximate
  const daysOffset = (month - 9) * 29.5 + (day - 1);
  const resultDate = new Date(RAMADAN_1447_START);
  resultDate.setDate(RAMADAN_1447_START.getDate() + daysOffset);
  return resultDate;
}

/**
 * Get current Hijri year
 */
export function getCurrentRamadanYear(): number {
  return RAMADAN_YEAR;
}

/**
 * Generate array of Gregorian dates for all 30 days of Ramadan in a given Hijri year
 */
export function generateRamadanDates(hijriYear: number): Date[] {
  const dates: Date[] = [];

  for (let day = 1; day <= 30; day++) {
    const gregorianDate = hijriToGregorian(hijriYear, 9, day);
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
