import Dexie, { type EntityTable } from "dexie";
import type { DayRecord, Target } from "@/lib/types";

export class RamadanDatabase extends Dexie {
  dayRecords!: EntityTable<DayRecord, "id">;
  targets!: EntityTable<Target, "id">;

  constructor() {
    super("RamadanTracker");

    this.version(1).stores({
      dayRecords: "++id, hijri_day, gregorian_date, updated_at",
      targets: "++id",
    });
  }
}
