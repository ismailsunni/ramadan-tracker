"use client";

import { useState, useEffect } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { getCurrentRamadanDay } from "@/lib/hijri/utils";
import { getCurrentRamadanYear } from "@/lib/hijri/converter";
import { getDayRecord, upsertDayRecord, createEmptyDayRecord } from "@/lib/db/operations";
import { hijriToGregorian } from "@/lib/hijri/converter";
import type { DayRecord } from "@/lib/types";
import { HijriDateDisplay } from "@/components/dashboard/HijriDateDisplay";
import { PrayerChecklist } from "@/components/dashboard/PrayerChecklist";
import { SunnahCounter } from "@/components/dashboard/SunnahCounter";
import { ProgressRing } from "@/components/dashboard/ProgressRing";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  const [currentDay, setCurrentDay] = useState(1);
  const [currentYear, setCurrentYear] = useState(1447);

  // Only run Hijri calculations on client side after mount
  useEffect(() => {
    setCurrentDay(getCurrentRamadanDay() || 1);
    setCurrentYear(getCurrentRamadanYear());
    setIsMounted(true);
  }, []);

  // Load day record from database
  const dayRecord = useLiveQuery(
    () => isMounted ? getDayRecord(currentDay) : undefined,
    [currentDay, isMounted]
  );

  const [localRecord, setLocalRecord] = useState<DayRecord | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  // Initialize local record when dayRecord loads
  useEffect(() => {
    if (!isMounted) return;

    if (dayRecord) {
      setLocalRecord(dayRecord);
    } else if (currentDay && currentYear) {
      // Create empty record if doesn't exist
      const gregorianDate = hijriToGregorian(currentYear, 9, currentDay);
      const emptyRecord = createEmptyDayRecord(
        currentDay,
        gregorianDate.toISOString().split("T")[0]
      );
      setLocalRecord(emptyRecord as DayRecord);
    }
  }, [dayRecord, currentDay, currentYear, isMounted]);

  const handleSave = async () => {
    if (!localRecord) return;

    setIsSaving(true);
    setSaveMessage("");

    try {
      await upsertDayRecord(localRecord);
      setSaveMessage("Saved successfully!");
      setTimeout(() => setSaveMessage(""), 2000);
    } catch (error) {
      console.error("Failed to save:", error);
      setSaveMessage("Failed to save");
    } finally {
      setIsSaving(false);
    }
  };

  if (!isMounted || !localRecord) {
    return (
      <main className="flex min-h-screen items-center justify-center p-4">
        <p className="text-muted-foreground">Loading...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-4 pb-24">
      <div className="max-w-4xl mx-auto space-y-6">
        <HijriDateDisplay hijriDay={currentDay} ramadanYear={currentYear} />

        <ProgressRing />

        <PrayerChecklist
          prayers={localRecord.prayers}
          onChange={(prayers) =>
            setLocalRecord({ ...localRecord, prayers })
          }
        />

        <SunnahCounter
          sunnah={localRecord.sunnah}
          onChange={(sunnah) =>
            setLocalRecord({ ...localRecord, sunnah })
          }
        />

        <div className="flex flex-col items-center gap-2">
          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="w-full max-w-sm tap-target"
            size="lg"
          >
            <Save className="mr-2 h-5 w-5" />
            {isSaving ? "Saving..." : "Save Progress"}
          </Button>
          {saveMessage && (
            <p className={`text-sm ${saveMessage.includes("success") ? "text-green-500" : "text-destructive"}`}>
              {saveMessage}
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
