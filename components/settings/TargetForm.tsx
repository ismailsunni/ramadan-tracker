"use client";

import { useState } from "react";
import type { Target } from "@/lib/types";
import { validateTarget } from "@/lib/calculations/validation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Save } from "lucide-react";

interface TargetFormProps {
  initialTarget: Target;
  onSave: (target: Target) => Promise<void>;
}

export function TargetForm({ initialTarget, onSave }: TargetFormProps) {
  const [target, setTarget] = useState<Target>(initialTarget);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  const handleChange = (field: keyof Target, value: number) => {
    setTarget((prev) => ({
      ...prev,
      [field]: value,
    }));
    setErrors([]);
    setSaveMessage("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate
    const validation = validateTarget(target);
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    setIsSaving(true);
    setErrors([]);
    setSaveMessage("");

    try {
      await onSave(target);
      setSaveMessage("Settings saved successfully!");
      setTimeout(() => setSaveMessage(""), 3000);
    } catch (error) {
      console.error("Failed to save settings:", error);
      setErrors(["Failed to save settings. Please try again."]);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Wajib Prayer Target</CardTitle>
          <CardDescription>
            Set your target for completing daily obligatory prayers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="wajib_target">Completion Target (%)</Label>
            <Input
              id="wajib_target"
              type="number"
              min="0"
              max="100"
              value={target.wajib_percentage_target}
              onChange={(e) =>
                handleChange("wajib_percentage_target", parseInt(e.target.value) || 0)
              }
            />
            <p className="text-xs text-muted-foreground">
              Percentage of prayers you aim to complete (0-100%)
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Daily Sunnah Prayer Targets</CardTitle>
          <CardDescription>
            Set your daily targets for Sunnah prayers (in rakaat)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dhuha">Dhuha (Rakaat per day)</Label>
              <Input
                id="dhuha"
                type="number"
                min="0"
                step="2"
                value={target.dhuha_target}
                onChange={(e) =>
                  handleChange("dhuha_target", parseInt(e.target.value) || 0)
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tahajjud">Tahajjud (Rakaat per day)</Label>
              <Input
                id="tahajjud"
                type="number"
                min="0"
                step="2"
                value={target.tahajjud_target}
                onChange={(e) =>
                  handleChange("tahajjud_target", parseInt(e.target.value) || 0)
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tarawih">Tarawih (Rakaat per day)</Label>
              <Input
                id="tarawih"
                type="number"
                min="0"
                step="2"
                value={target.tarawih_target}
                onChange={(e) =>
                  handleChange("tarawih_target", parseInt(e.target.value) || 0)
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="witir">Witir (Rakaat per day)</Label>
              <Input
                id="witir"
                type="number"
                min="0"
                value={target.witir_target}
                onChange={(e) =>
                  handleChange("witir_target", parseInt(e.target.value) || 0)
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {errors.length > 0 && (
        <div className="p-4 bg-destructive/10 border border-destructive rounded-lg">
          <ul className="list-disc list-inside text-sm text-destructive">
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      <Button
        type="submit"
        disabled={isSaving}
        className="w-full tap-target"
        size="lg"
      >
        <Save className="mr-2 h-5 w-5" />
        {isSaving ? "Saving..." : "Save Settings"}
      </Button>

      {saveMessage && (
        <p className="text-center text-sm text-green-500">{saveMessage}</p>
      )}
    </form>
  );
}
