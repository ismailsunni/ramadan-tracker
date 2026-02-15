import dayjs from "dayjs";
// @ts-expect-error - dayjs-hijri doesn't have type definitions
import dayjsHijri from "dayjs-hijri";
import type { HijriDate } from "@/lib/types";

// Extend dayjs with hijri plugin
dayjs.extend(dayjsHijri);

/**
 * Convert Gregorian date to Hijri
 */
export function gregorianToHijri(date: Date): HijriDate {
  const dayjsDate = dayjs(date) as any;

  return {
    year: dayjsDate.iYear(),
    month: dayjsDate.iMonth() + 1, // iMonth() returns 0-11, we want 1-12
    day: dayjsDate.iDate(),
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
  // Create hijri date using iYear, iMonth (0-based), iDate
  const hijriDate = (dayjs() as any)
    .iYear(year)
    .iMonth(month - 1) // Convert 1-12 to 0-11
    .iDate(day);

  return hijriDate.toDate();
}

/**
 * Get current Hijri year
 */
export function getCurrentRamadanYear(): number {
  const today = new Date();
  const hijriToday = gregorianToHijri(today);

  // If we're in Ramadan or later in the year, return current year
  // If we're before Ramadan, return current year (assuming we want to track this year's Ramadan)
  return hijriToday.year;
}

/**
 * Generate array of Gregorian dates for all 30 days of Ramadan in a given Hijri year
 */
export function generateRamadanDates(hijriYear: number): Date[] {
  const dates: Date[] = [];

  for (let day = 1; day <= 30; day++) {
    const gregorianDate = hijriToGregorian(hijriYear, 9, day); // Month 9 is Ramadan
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
  if (hijriDate.month === 9) {
    return hijriDate.day;
  }
  return null;
}
