"use client";

import { createContext, useContext, useState, useCallback } from "react";
import { communityMembers } from "@/lib/data";
import { UserProfilePanel } from "./user-profile-panel";

type Member = (typeof communityMembers)[0];

interface ProfileContextValue {
  openProfile: (user: Member) => void;
}

const ProfileContext = createContext<ProfileContextValue | null>(null);

export function useProfile() {
  const ctx = useContext(ProfileContext);
  if (!ctx) {
    throw new Error("useProfile must be used within ProfileProvider");
  }
  return ctx;
}

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Member | null>(null);
  const [open, setOpen] = useState(false);

  const openProfile = useCallback((member: Member) => {
    setUser(member);
    setOpen(true);
  }, []);

  return (
    <ProfileContext.Provider value={{ openProfile }}>
      {children}
      <UserProfilePanel user={user} open={open} onOpenChange={setOpen} />
    </ProfileContext.Provider>
  );
}
