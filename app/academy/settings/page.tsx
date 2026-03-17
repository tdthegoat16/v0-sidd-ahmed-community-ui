"use client";

import { CommunityLayout } from "@/components/community/community-layout";
import { useAcademy } from "@/lib/academy-state";
import {
  ChevronLeft,
  Crown,
  Shield,
  RotateCcw,
  Info,
  Check,
} from "lucide-react";
import Link from "next/link";

export default function AcademySettingsPage() {
  const { purchases, restorePurchases, privacyMode, togglePrivacyMode, catalog } =
    useAcademy();

  return (
    <CommunityLayout title="Academy Settings">
      <div className="mx-auto max-w-2xl px-4 py-6">
        <Link
          href="/academy"
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-300 mb-4"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Academy
        </Link>

        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Academy Settings
        </h1>

        <div className="mt-6 space-y-4">
          {/* Subscription Status */}
          <div className="rounded-xl border border-gray-100 dark:border-gray-700/50 bg-white dark:bg-gray-800/50 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 dark:bg-amber-900/30">
                <Crown className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                  Subscription
                </h3>
                {purchases.isPro ? (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                      Pro Active
                    </span>
                    {purchases.plan && (
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        ({purchases.plan} plan)
                      </span>
                    )}
                  </div>
                ) : (
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Free plan
                  </span>
                )}
              </div>
              {purchases.isPro && (
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500 text-white">
                  <Check className="h-3 w-3" />
                </div>
              )}
            </div>
          </div>

          {/* Restore Purchases */}
          <button
            onClick={restorePurchases}
            className="flex w-full items-center gap-3 rounded-xl border border-gray-100 dark:border-gray-700/50 bg-white dark:bg-gray-800/50 p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-900/30">
              <RotateCcw className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                Restore Purchases
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Restore your Pro subscription from a previous purchase
              </p>
            </div>
          </button>

          {/* Privacy Toggle */}
          <div className="flex items-center justify-between rounded-xl border border-gray-100 dark:border-gray-700/50 bg-white dark:bg-gray-800/50 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 dark:bg-purple-900/30">
                <Shield className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                  Privacy Mode
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Hide your learning progress from other members
                </p>
              </div>
            </div>
            <button
              onClick={togglePrivacyMode}
              className={`relative h-6 w-11 rounded-full transition-colors ${
                privacyMode
                  ? "bg-tribe-600"
                  : "bg-gray-200 dark:bg-gray-600"
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
                  privacyMode ? "translate-x-5" : ""
                }`}
              />
            </button>
          </div>

          {/* Version Info */}
          <div className="rounded-xl border border-gray-100 dark:border-gray-700/50 bg-white dark:bg-gray-800/50 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-700">
                <Info className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                  Version Info
                </h3>
                <div className="mt-1 space-y-0.5">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Catalog Version: {catalog.version}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Last Updated:{" "}
                    {new Date(catalog.updatedAt).toLocaleDateString()}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Total Courses:{" "}
                    {catalog.pillars.reduce(
                      (sum, p) => sum + p.courses.length,
                      0
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CommunityLayout>
  );
}
