"use client";

import { useState } from "react";
import { Sidebar } from "./sidebar";
import { MobileNav } from "./mobile-nav";
import { MobileHeader } from "./mobile-header";
import { Sheet, SheetContent } from "@/components/ui/sheet";

interface CommunityLayoutProps {
  children: React.ReactNode;
  rightPanel?: React.ReactNode;
  title?: string;
}

export function CommunityLayout({ children, rightPanel, title }: CommunityLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-[100dvh] bg-gray-50 dark:bg-gray-950">
      {/* Sidebar - Desktop only */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Mobile Sidebar Sheet */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent side="left" className="w-72 p-0">
          <Sidebar className="flex w-full border-r-0" />
        </SheetContent>
      </Sheet>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Mobile Header */}
        <MobileHeader 
          title={title} 
          onMenuClick={() => setMobileMenuOpen(true)} 
        />

        <div className="flex flex-1 overflow-hidden">
          {/* Main Content */}
          <main className="flex-1 overflow-y-auto pb-20 lg:pb-0">
            {children}
          </main>

          {/* Right Panel - Desktop only */}
          {rightPanel && (
            <aside className="hidden xl:block w-72 border-l border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-y-auto">
              {rightPanel}
            </aside>
          )}
        </div>
      </div>

      {/* Mobile Bottom Tab Bar */}
      <MobileNav />
    </div>
  );
}
