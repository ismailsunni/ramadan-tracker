import { RamadanDatabase } from "./schema";
import type { Target } from "@/lib/types";

export const db = new RamadanDatabase();

// Initialize database with default target
export async function initializeDatabase(): Promise<void> {
  try {
    // Check if target exists
    const existingTarget = await db.targets.toCollection().first();

    if (!existingTarget) {
      // Create default target with Ramadan 1447 start date
      const defaultTarget: Target = {
        wajib_percentage_target: 100,
        dhuha_target: 8,
        tahajjud_target: 8,
        tarawih_target: 20,
        witir_target: 3,
        ramadan_start_date: "2026-02-18", // 1 Ramadan 1447
      };
      await db.targets.add(defaultTarget);
      console.log("Default target created");
    }
  } catch (error) {
    console.error("Failed to initialize database:", error);
  }
}
