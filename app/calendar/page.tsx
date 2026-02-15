"use client";

import { useLiveQuery } from "dexie-react-hooks";
import { getAllDayRecords } from "@/lib/db/operations";
import { CalendarGrid } from "@/components/calendar/CalendarGrid";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CalendarPage() {
  const records = useLiveQuery(() => getAllDayRecords(), []);

  if (!records) {
    return (
      <main className="flex min-h-screen items-center justify-center p-4">
        <p className="text-muted-foreground">Loading...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-4 pb-24">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Ramadan Calendar</CardTitle>
            <p className="text-sm text-muted-foreground">
              Track your progress for all 30 days of Ramadan
            </p>
          </CardHeader>
          <CardContent>
            <CalendarGrid records={records} />
          </CardContent>
        </Card>

        {/* Legend */}
        <Card>
          <CardHeader>
            <CardTitle>Legend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-emerald-500/20 border-2 border-emerald-500 rounded"></div>
                <span className="text-sm">Complete (5/5 prayers)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-yellow-500/20 border-2 border-yellow-500 rounded"></div>
                <span className="text-sm">Partial (1-4 prayers)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-slate-700/20 border-2 border-slate-600 rounded"></div>
                <span className="text-sm">Empty (0 prayers)</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
