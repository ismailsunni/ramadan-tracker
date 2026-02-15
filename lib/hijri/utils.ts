import { gregorianToHijri, getRamadanDayNumber } from "./converter";

/**
 * Check if a Gregorian date is in Ramadan
 */
export function isRamadan(date: Date): boolean {
  const hijriDate = gregorianToHijri(date);
  return hijriDate.month === 9;
}

/**
 * Get current Ramadan day (1-30) if today is in Ramadan, otherwise null
 */
export function getCurrentRamadanDay(): number | null {
  const today = new Date();
  const hijriDate = gregorianToHijri(today);
  return getRamadanDayNumber(hijriDate);
}

/**
 * Get Hijri date for a specific Ramadan day
 */
export function getHijriDateForRamadanDay(
  ramadanYear: number,
  ramadanDay: number
): { year: number; month: number; day: number } {
  return {
    year: ramadanYear,
    month: 9, // Ramadan is the 9th month
    day: ramadanDay,
  };
}

/**
 * Check if we're currently in a specific Ramadan year
 */
export function isCurrentRamadanYear(hijriYear: number): boolean {
  const today = new Date();
  const hijriDate = gregorianToHijri(today);
  return hijriDate.year === hijriYear;
}
