"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";

export function CapacitorProvider({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    // Dynamically import to avoid SSR issues
    import("@/lib/capacitor").then(({ initCapacitor }) => {
      initCapacitor();
    });
  }, []);

  // Update status bar when theme changes
  useEffect(() => {
    if (resolvedTheme) {
      import("@/lib/capacitor").then(({ updateStatusBarTheme }) => {
        updateStatusBarTheme(resolvedTheme === "dark");
      });
    }
  }, [resolvedTheme]);

  return <>{children}</>;
}
