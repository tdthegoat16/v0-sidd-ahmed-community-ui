"use client";

import { useState } from "react";
// Icon rail removed for simpler navigation
import { Sidebar } from "./sidebar";
import { TopNav } from "./top-nav";
import { MobileNav } from "./mobile-nav";
import { Sheet, SheetContent } from "@/components/ui/sheet";

interface CommunityLayoutProps {
  children: React.ReactNode;
  rightPanel?: React.ReactNode;
}

export function CommunityLayout({ children, rightPanel }: CommunityLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar - Desktop */}
      <Sidebar />

      {/* Mobile Sidebar */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent side="left" className="w-72 p-0">
          <Sidebar className="flex w-full border-r-0" />
        </SheetContent>
      </Sheet>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <TopNav onMenuClick={() => setMobileMenuOpen(true)} />

        <div className="flex flex-1 overflow-hidden">
          {/* Main Content */}
          <main className="flex-1 overflow-y-auto pb-16 md:pb-0">
            {children}
          </main>

          {/* Right Panel - Desktop */}
          {rightPanel && (
            <aside className="hidden xl:block w-72 border-l border-gray-100 bg-white overflow-y-auto">
              {rightPanel}
            </aside>
          )}
        </div>
      </div>

      {/* Mobile Bottom Nav */}
      <MobileNav />
    </div>
  );
}
