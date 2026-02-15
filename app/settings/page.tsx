"use client";

import { useLiveQuery } from "dexie-react-hooks";
import { getTarget, updateTarget } from "@/lib/db/operations";
import { TargetForm } from "@/components/settings/TargetForm";
import type { Target } from "@/lib/types";

export default function SettingsPage() {
  const target = useLiveQuery(() => getTarget(), []);

  if (!target) {
    return (
      <main className="flex min-h-screen items-center justify-center p-4">
        <p className="text-muted-foreground">Loading...</p>
      </main>
    );
  }

  const handleSave = async (newTarget: Target) => {
    await updateTarget(newTarget);
  };

  return (
    <main className="min-h-screen p-4 pb-24">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Settings</h1>
          <p className="text-muted-foreground">
            Configure your daily prayer targets for Ramadan
          </p>
        </div>

        <TargetForm initialTarget={target} onSave={handleSave} />
      </div>
    </main>
  );
}
