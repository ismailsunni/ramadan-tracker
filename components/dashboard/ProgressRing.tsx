"use client";

import { useLiveQuery } from "dexie-react-hooks";
import { getAllDayRecords, getTarget } from "@/lib/db/operations";
import { calculateProgress } from "@/lib/calculations/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ProgressRing() {
  const records = useLiveQuery(() => getAllDayRecords(), []);
  const target = useLiveQuery(() => getTarget(), []);

  if (!records || !target) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Overall Progress</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center p-8">
          <p className="text-muted-foreground">Loading...</p>
        </CardContent>
      </Card>
    );
  }

  const progress = calculateProgress(records, target);
  const percentage = Math.round(progress.overall_progress);

  // SVG circle parameters
  const size = 200;
  const strokeWidth = 16;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Overall Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center gap-6">
          {/* Progress Ring SVG */}
          <div className="relative">
            <svg width={size} height={size} className="transform -rotate-90">
              {/* Background circle */}
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke="hsl(var(--muted))"
                strokeWidth={strokeWidth}
              />
              {/* Progress circle with emerald gradient */}
              <defs>
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#059669" />
                </linearGradient>
              </defs>
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke="url(#progressGradient)"
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                className="transition-all duration-500"
              />
            </svg>
            {/* Percentage text in center */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary">{percentage}%</div>
                <div className="text-sm text-muted-foreground">Complete</div>
              </div>
            </div>
          </div>

          {/* Progress Details */}
          <div className="w-full space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Wajib Prayers:</span>
              <span className="text-sm font-semibold">
                {Math.round(progress.wajib_progress)}%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Sunnah Prayers:</span>
              <span className="text-sm font-semibold">
                {Math.round(progress.sunnah_progress)}%
              </span>
            </div>
            <div className="pt-3 border-t border-border">
              <div className="flex justify-between items-center text-xs text-muted-foreground">
                <span>Prayers Done:</span>
                <span>{progress.prayers_done} / {progress.total_prayers}</span>
              </div>
              <div className="flex justify-between items-center text-xs text-muted-foreground mt-1">
                <span>In Mosque:</span>
                <span>{progress.prayers_in_mosque}</span>
              </div>
              <div className="flex justify-between items-center text-xs text-muted-foreground mt-1">
                <span>In Jamaah:</span>
                <span>{progress.prayers_in_jamaah}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
