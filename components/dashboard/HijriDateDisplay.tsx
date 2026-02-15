import { formatHijriDate, getCurrentRamadanYear } from "@/lib/hijri/converter";
import { getHijriDateForRamadanDay } from "@/lib/hijri/utils";

interface HijriDateDisplayProps {
  hijriDay: number;
  ramadanYear?: number;
}

export function HijriDateDisplay({ hijriDay, ramadanYear }: HijriDateDisplayProps) {
  const year = ramadanYear || getCurrentRamadanYear();
  const hijriDate = getHijriDateForRamadanDay(year, hijriDay);
  const formattedDate = formatHijriDate(hijriDate);

  return (
    <div className="text-center mb-6">
      <h2 className="text-3xl font-bold text-primary mb-2">
        Day {hijriDay} of Ramadan
      </h2>
      <p className="text-lg text-muted-foreground">{formattedDate}</p>
    </div>
  );
}
