"use client";

import Link from "next/link";
import type { DayRecord, DayStatus } from "@/lib/types";
import { getDayStatus } from "@/lib/calculations/progress";
import { cn } from "@/lib/utils";

interface DayCellProps {
  hijriDay: number;
  record?: DayRecord;
}

export function DayCell({ hijriDay, record }: DayCellProps) {
  const status: DayStatus = getDayStatus(record);

  const statusColors = {
    complete: "bg-emerald-500/20 border-emerald-500 text-emerald-300",
    partial: "bg-yellow-500/20 border-yellow-500 text-yellow-300",
    empty: "bg-slate-700/20 border-slate-600 text-slate-400",
  };

  return (
    <Link
      href="/"
      className={cn(
        "flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all hover:scale-105 tap-target",
        statusColors[status]
      )}
    >
      <div className="text-2xl font-bold">{hijriDay}</div>
      <div className="text-xs mt-1 capitalize">{status}</div>
    </Link>
  );
}
