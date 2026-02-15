"use client";

import type { SunnahRecord } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Minus } from "lucide-react";

const SUNNAH_FIELDS: {
  key: keyof SunnahRecord;
  label: string;
}[] = [
  { key: "dhuha_rakaat", label: "Dhuha" },
  { key: "tahajjud_rakaat", label: "Tahajjud" },
  { key: "tarawih_rakaat", label: "Tarawih" },
  { key: "witir_rakaat", label: "Witir" },
];

interface SunnahCounterProps {
  sunnah: SunnahRecord;
  onChange: (sunnah: SunnahRecord) => void;
}

export function SunnahCounter({ sunnah, onChange }: SunnahCounterProps) {
  const handleChange = (field: keyof SunnahRecord, value: number) => {
    // Ensure non-negative
    const validValue = Math.max(0, value);
    onChange({
      ...sunnah,
      [field]: validValue,
    });
  };

  const increment = (field: keyof SunnahRecord) => {
    handleChange(field, sunnah[field] + 2); // Increment by 2 rakaat
  };

  const decrement = (field: keyof SunnahRecord) => {
    handleChange(field, sunnah[field] - 2); // Decrement by 2 rakaat
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sunnah Prayers (Rakaat)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {SUNNAH_FIELDS.map(({ key, label }) => (
            <div key={key} className="space-y-2">
              <Label htmlFor={key}>{label}</Label>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="tap-target"
                  onClick={() => decrement(key)}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Input
                  id={key}
                  type="number"
                  min="0"
                  step="2"
                  value={sunnah[key]}
                  onChange={(e) => handleChange(key, parseInt(e.target.value) || 0)}
                  className="text-center"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="tap-target"
                  onClick={() => increment(key)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
