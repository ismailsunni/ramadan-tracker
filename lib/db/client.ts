import { RamadanDatabase } from "./schema";
import type { Target } from "@/lib/types";

export const db = new RamadanDatabase();

// Initialize database with default target
export async function initializeDatabase(): Promise<void> {
  try {
    // Check if target exists
    const existingTarget = await db.targets.toCollection().first();

    if (!existingTarget) {
      // Create default target
      const defaultTarget: Target = {
        wajib_percentage_target: 100,
        dhuha_target: 8,
        tahajjud_target: 8,
        tarawih_target: 20,
        witir_target: 3,
      };
      await db.targets.add(defaultTarget);
      console.log("Default target created");
    }
  } catch (error) {
    console.error("Failed to initialize database:", error);
  }
}
