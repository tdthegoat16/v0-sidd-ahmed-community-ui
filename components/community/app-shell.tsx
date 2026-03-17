"use client";

import { useState, useEffect } from "react";
import { Onboarding } from "./onboarding";
import { ProfileProvider } from "./profile-context";
import { AppStateProvider } from "@/lib/app-state";
import { AcademyProvider } from "@/lib/academy-state";
import { BookmarksPanel } from "./bookmarks-panel";

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

  return (
    <AppStateProvider>
      <AcademyProvider>
        <ProfileProvider>
          {children}
          <BookmarksPanel />
        </ProfileProvider>
      </AcademyProvider>
    </AppStateProvider>
  );
}
