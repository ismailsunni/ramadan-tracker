// Prayer names
export type PrayerName = "fajr" | "dhuhr" | "asr" | "maghrib" | "isha";

// Individual prayer record
export interface PrayerRecord {
  done: boolean;
  in_mosque: boolean;
  jamaah: boolean;
}

// Sunnah prayers record
export interface SunnahRecord {
  dhuha_rakaat: number;
  tahajjud_rakaat: number;
  tarawih_rakaat: number;
  witir_rakaat: number;
}

// Daily record for one day of Ramadan
export interface DayRecord {
  id?: number;
  hijri_day: number; // 1-30
  gregorian_date: string; // ISO date string
  prayers: {
    fajr: PrayerRecord;
    dhuhr: PrayerRecord;
    asr: PrayerRecord;
    maghrib: PrayerRecord;
    isha: PrayerRecord;
  };
  sunnah: SunnahRecord;
  updated_at: string; // ISO timestamp
}

// User's daily targets
export interface Target {
  id?: number;
  wajib_percentage_target: number; // 0-100
  dhuha_target: number;
  tahajjud_target: number;
  tarawih_target: number;
  witir_target: number;
  ramadan_start_date: string; // ISO date string (YYYY-MM-DD)
}

// Progress calculation result
export interface ProgressResult {
  total_prayers: number;
  prayers_done: number;
  prayers_in_mosque: number;
  prayers_in_jamaah: number;
  total_dhuha: number;
  total_tahajjud: number;
  total_tarawih: number;
  total_witir: number;
  wajib_progress: number; // percentage 0-100
  sunnah_progress: number; // percentage 0-100
  overall_progress: number; // percentage 0-100
}

// Day status for calendar view
export type DayStatus = "complete" | "partial" | "empty";

// Hijri date object
export interface HijriDate {
  year: number;
  month: number;
  day: number;
}
