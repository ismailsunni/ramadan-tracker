import type { DayRecord, Target } from "@/lib/types";

/**
 * Validate day record
 */
export function validateDayRecord(record: DayRecord): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  // Validate hijri_day range
  if (record.hijri_day < 1 || record.hijri_day > 30) {
    errors.push("Hijri day must be between 1 and 30");
  }

  // Validate sunnah rakaat (non-negative)
  if (record.sunnah.dhuha_rakaat < 0) {
    errors.push("Dhuha rakaat cannot be negative");
  }
  if (record.sunnah.tahajjud_rakaat < 0) {
    errors.push("Tahajjud rakaat cannot be negative");
  }
  if (record.sunnah.tarawih_rakaat < 0) {
    errors.push("Tarawih rakaat cannot be negative");
  }
  if (record.sunnah.witir_rakaat < 0) {
    errors.push("Witir rakaat cannot be negative");
  }

  // Validate gregorian_date is a valid date string
  if (!isValidISODate(record.gregorian_date)) {
    errors.push("Invalid gregorian date format");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Validate target
 */
export function validateTarget(target: Target): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  // Validate wajib_percentage_target range
  if (
    target.wajib_percentage_target < 0 ||
    target.wajib_percentage_target > 100
  ) {
    errors.push("Wajib percentage target must be between 0 and 100");
  }

  // Validate sunnah targets (non-negative)
  if (target.dhuha_target < 0) {
    errors.push("Dhuha target cannot be negative");
  }
  if (target.tahajjud_target < 0) {
    errors.push("Tahajjud target cannot be negative");
  }
  if (target.tarawih_target < 0) {
    errors.push("Tarawih target cannot be negative");
  }
  if (target.witir_target < 0) {
    errors.push("Witir target cannot be negative");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Check if a string is a valid ISO date
 */
function isValidISODate(dateString: string): boolean {
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date.getTime());
}
