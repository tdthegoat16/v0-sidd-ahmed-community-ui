"use client";

import { useState, useEffect } from "react";
import { Onboarding } from "./onboarding";

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const [showOnboarding, setShowOnboarding] = useState<boolean | null>(null);

  useEffect(() => {
    const completed = localStorage.getItem("onboarding_complete");
    setShowOnboarding(completed !== "true");
  }, []);

  // Avoid flash while checking localStorage
  if (showOnboarding === null) {
    return null;
  }

  if (showOnboarding) {
    return <Onboarding onComplete={() => setShowOnboarding(false)} />;
  }

  return <>{children}</>;
}
