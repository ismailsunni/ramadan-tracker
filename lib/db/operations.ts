import { db } from "./client";
import type { DayRecord, Target, PrayerRecord } from "@/lib/types";

// Create empty day record factory
export function createEmptyDayRecord(
  hijriDay: number,
  gregorianDate: string
): Omit<DayRecord, "id"> {
  const emptyPrayer: PrayerRecord = {
    done: false,
    in_mosque: false,
    jamaah: false,
  };

  return {
    hijri_day: hijriDay,
    gregorian_date: gregorianDate,
    prayers: {
      fajr: { ...emptyPrayer },
      dhuhr: { ...emptyPrayer },
      asr: { ...emptyPrayer },
      maghrib: { ...emptyPrayer },
      isha: { ...emptyPrayer },
    },
    sunnah: {
      dhuha_rakaat: 0,
      tahajjud_rakaat: 0,
      tarawih_rakaat: 0,
      witir_rakaat: 0,
    },
    updated_at: new Date().toISOString(),
  };
}

// Upsert day record (create or update)
export async function upsertDayRecord(record: DayRecord): Promise<number> {
  try {
    // Update timestamp
    record.updated_at = new Date().toISOString();

    // Check if record exists for this hijri day
    const existing = await db.dayRecords
      .where("hijri_day")
      .equals(record.hijri_day)
      .first();

    if (existing && existing.id) {
      // Update existing record
      await db.dayRecords.update(existing.id, record);
      return existing.id;
    } else {
      // Create new record
      const id = await db.dayRecords.add(record);
      return id as number;
    }
  } catch (error) {
    console.error("Failed to upsert day record:", error);
    throw error;
  }
}

// Get day record by hijri day
export async function getDayRecord(hijriDay: number): Promise<DayRecord | undefined> {
  try {
    return await db.dayRecords.where("hijri_day").equals(hijriDay).first();
  } catch (error) {
    console.error("Failed to get day record:", error);
    throw error;
  }
}

// Get all day records
export async function getAllDayRecords(): Promise<DayRecord[]> {
  try {
    return await db.dayRecords.orderBy("hijri_day").toArray();
  } catch (error) {
    console.error("Failed to get all day records:", error);
    throw error;
  }
}

// Delete day record
export async function deleteDayRecord(hijriDay: number): Promise<void> {
  try {
    const record = await getDayRecord(hijriDay);
    if (record && record.id) {
      await db.dayRecords.delete(record.id);
    }
  } catch (error) {
    console.error("Failed to delete day record:", error);
    throw error;
  }
}

// Get target
export async function getTarget(): Promise<Target | undefined> {
  try {
    return await db.targets.toCollection().first();
  } catch (error) {
    console.error("Failed to get target:", error);
    throw error;
  }
}

// Update target
export async function updateTarget(target: Target): Promise<void> {
  try {
    const existing = await db.targets.toCollection().first();

    if (existing && existing.id) {
      await db.targets.update(existing.id, target);
    } else {
      await db.targets.add(target);
    }
  } catch (error) {
    console.error("Failed to update target:", error);
    throw error;
  }
}

// Export all data as JSON
export async function exportData(): Promise<string> {
  try {
    const records = await getAllDayRecords();
    const target = await getTarget();

    const exportData = {
      version: 1,
      exported_at: new Date().toISOString(),
      records,
      target,
    };

    return JSON.stringify(exportData, null, 2);
  } catch (error) {
    console.error("Failed to export data:", error);
    throw error;
  }
}

// Import data from JSON
export async function importData(jsonString: string): Promise<void> {
  try {
    const data = JSON.parse(jsonString);

    if (!data.version || !data.records) {
      throw new Error("Invalid import data format");
    }

    // Clear existing data
    await db.dayRecords.clear();

    // Import records
    if (Array.isArray(data.records)) {
      for (const record of data.records) {
        // Remove id to let Dexie auto-generate
        const { id, ...recordWithoutId } = record;
        await db.dayRecords.add(recordWithoutId);
      }
    }

    // Import target
    if (data.target) {
      await updateTarget(data.target);
    }

    console.log("Data imported successfully");
  } catch (error) {
    console.error("Failed to import data:", error);
    throw error;
  }
}
