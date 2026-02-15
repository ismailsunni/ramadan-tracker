"use client";

import type { DayRecord, PrayerName } from "@/lib/types";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PRAYER_NAMES: { key: PrayerName; label: string }[] = [
  { key: "fajr", label: "Fajr" },
  { key: "dhuhr", label: "Dhuhr" },
  { key: "asr", label: "Asr" },
  { key: "maghrib", label: "Maghrib" },
  { key: "isha", label: "Isha" },
];

interface PrayerChecklistProps {
  prayers: DayRecord["prayers"];
  onChange: (prayers: DayRecord["prayers"]) => void;
}

export function PrayerChecklist({ prayers, onChange }: PrayerChecklistProps) {
  const handleCheckboxChange = (
    prayerName: PrayerName,
    field: "done" | "in_mosque" | "jamaah",
    checked: boolean
  ) => {
    const updatedPrayers = {
      ...prayers,
      [prayerName]: {
        ...prayers[prayerName],
        [field]: checked,
      },
    };
    onChange(updatedPrayers);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Daily Prayers</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {PRAYER_NAMES.map(({ key, label }) => (
            <div key={key} className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
              <div className="w-20 font-semibold">{label}</div>
              <div className="flex-1 flex gap-6">
                <div className="flex items-center gap-2 tap-target">
                  <Checkbox
                    id={`${key}-done`}
                    checked={prayers[key].done}
                    onCheckedChange={(checked) =>
                      handleCheckboxChange(key, "done", checked as boolean)
                    }
                  />
                  <Label htmlFor={`${key}-done`} className="cursor-pointer">
                    Done
                  </Label>
                </div>
                <div className="flex items-center gap-2 tap-target">
                  <Checkbox
                    id={`${key}-mosque`}
                    checked={prayers[key].in_mosque}
                    onCheckedChange={(checked) =>
                      handleCheckboxChange(key, "in_mosque", checked as boolean)
                    }
                  />
                  <Label htmlFor={`${key}-mosque`} className="cursor-pointer">
                    In Mosque
                  </Label>
                </div>
                <div className="flex items-center gap-2 tap-target">
                  <Checkbox
                    id={`${key}-jamaah`}
                    checked={prayers[key].jamaah}
                    onCheckedChange={(checked) =>
                      handleCheckboxChange(key, "jamaah", checked as boolean)
                    }
                  />
                  <Label htmlFor={`${key}-jamaah`} className="cursor-pointer">
                    Jamaah
                  </Label>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
