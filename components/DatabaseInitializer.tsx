"use client";

import { useEffect } from "react";
import { initializeDatabase } from "@/lib/db/client";

export function DatabaseInitializer() {
  useEffect(() => {
    initializeDatabase();
  }, []);

  return null;
}
