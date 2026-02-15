"use client";

import type { DayRecord } from "@/lib/types";
import { DayCell } from "./DayCell";

interface CalendarGridProps {
  records: DayRecord[];
}

export function CalendarGrid({ records }: CalendarGridProps) {
  // Create a map of records by hijri_day for quick lookup
  const recordMap = new Map<number, DayRecord>();
  records.forEach((record) => {
    recordMap.set(record.hijri_day, record);
  });

  // Generate all 30 days
  const days = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <div className="grid grid-cols-5 sm:grid-cols-6 gap-3">
      {days.map((day) => (
        <DayCell key={day} hijriDay={day} record={recordMap.get(day)} />
      ))}
    </div>
  );
}
