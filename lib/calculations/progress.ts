import type { DayRecord, Target, ProgressResult, DayStatus, PrayerName } from "@/lib/types";

const PRAYER_NAMES: PrayerName[] = ["fajr", "dhuhr", "asr", "maghrib", "isha"];
const TOTAL_PRAYERS_IN_RAMADAN = 150; // 5 prayers × 30 days
const RAMADAN_DAYS = 30;

/**
 * Calculate overall progress from all day records and target
 */
export function calculateProgress(
  records: DayRecord[],
  target: Target
): ProgressResult {
  // Initialize counters
  let prayers_done = 0;
  let prayers_in_mosque = 0;
  let prayers_in_jamaah = 0;
  let total_dhuha = 0;
  let total_tahajjud = 0;
  let total_tarawih = 0;
  let total_witir = 0;

  // Count prayers and sunnah
  for (const record of records) {
    for (const prayerName of PRAYER_NAMES) {
      const prayer = record.prayers[prayerName];
      if (prayer.done) {
        prayers_done++;
      }
      if (prayer.in_mosque) {
        prayers_in_mosque++;
      }
      if (prayer.jamaah) {
        prayers_in_jamaah++;
      }
    }

    total_dhuha += record.sunnah.dhuha_rakaat;
    total_tahajjud += record.sunnah.tahajjud_rakaat;
    total_tarawih += record.sunnah.tarawih_rakaat;
    total_witir += record.sunnah.witir_rakaat;
  }

  // Calculate wajib progress (percentage of prayers completed)
  const wajib_progress = (prayers_done / TOTAL_PRAYERS_IN_RAMADAN) * 100;

  // Calculate sunnah progress (actual vs target × 30 days)
  const target_dhuha = target.dhuha_target * RAMADAN_DAYS;
  const target_tahajjud = target.tahajjud_target * RAMADAN_DAYS;
  const target_tarawih = target.tarawih_target * RAMADAN_DAYS;
  const target_witir = target.witir_target * RAMADAN_DAYS;

  const total_sunnah_actual =
    total_dhuha + total_tahajjud + total_tarawih + total_witir;
  const total_sunnah_target =
    target_dhuha + target_tahajjud + target_tarawih + target_witir;

  const sunnah_progress =
    total_sunnah_target > 0
      ? (total_sunnah_actual / total_sunnah_target) * 100
      : 0;

  // Calculate overall progress (50% wajib + 50% sunnah)
  const overall_progress = (wajib_progress * 0.5 + sunnah_progress * 0.5);

  return {
    total_prayers: TOTAL_PRAYERS_IN_RAMADAN,
    prayers_done,
    prayers_in_mosque,
    prayers_in_jamaah,
    total_dhuha,
    total_tahajjud,
    total_tarawih,
    total_witir,
    wajib_progress: Math.min(wajib_progress, 100),
    sunnah_progress: Math.min(sunnah_progress, 100),
    overall_progress: Math.min(overall_progress, 100),
  };
}

/**
 * Get the status of a day (complete, partial, or empty)
 */
export function getDayStatus(record: DayRecord | undefined): DayStatus {
  if (!record) {
    return "empty";
  }

  let prayersDone = 0;

  for (const prayerName of PRAYER_NAMES) {
    if (record.prayers[prayerName].done) {
      prayersDone++;
    }
  }

  if (prayersDone === 5) {
    return "complete";
  } else if (prayersDone > 0) {
    return "partial";
  } else {
    return "empty";
  }
}

/**
 * Get day progress percentage (0-100)
 */
export function getDayProgress(record: DayRecord | undefined): number {
  if (!record) {
    return 0;
  }

  let prayersDone = 0;

  for (const prayerName of PRAYER_NAMES) {
    if (record.prayers[prayerName].done) {
      prayersDone++;
    }
  }

  return (prayersDone / 5) * 100;
}
