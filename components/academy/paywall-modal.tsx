"use client";

import { useState } from "react";
import { useAcademy } from "@/lib/academy-state";
import { X, Crown, Check, Sparkles } from "lucide-react";

interface PaywallModalProps {
  open: boolean;
  onClose: () => void;
}

const plans = [
  {
    id: "monthly" as const,
    name: "Monthly",
    price: "$9.99/mo",
    description: "Full access, cancel anytime",
  },
  {
    id: "yearly" as const,
    name: "Yearly",
    price: "$79.99/yr",
    description: "Save 33% — best value",
    recommended: true,
  },
  {
    id: "lifetime" as const,
    name: "Lifetime",
    price: "$199.99",
    description: "One-time, forever access",
  },
];

const features = [
  "All courses across 4 pillars",
  "Video lessons, exercises & quizzes",
  "Action checklists & reflection prompts",
  "Exclusive Pro-only content",
  "Early access to new courses",
  "Certificates of completion",
];

export function PaywallModal({ open, onClose }: PaywallModalProps) {
  const { unlockPro } = useAcademy();
  const [selectedPlan, setSelectedPlan] = useState<"monthly" | "yearly" | "lifetime">("yearly");

  if (!open) return null;

  const handlePurchase = () => {
    unlockPro(selectedPlan);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-lg rounded-2xl bg-white dark:bg-gray-900 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-500 p-6 text-center">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-full bg-black/20 p-1.5 text-white hover:bg-black/30"
          >
            <X className="h-4 w-4" />
          </button>
          <Crown className="mx-auto h-12 w-12 text-white" />
          <h2 className="mt-3 text-2xl font-bold text-white">
            Unlock Sid Academy Pro
          </h2>
          <p className="mt-1 text-amber-100">
            Get unlimited access to all courses and content
          </p>
        </div>

        {/* Features */}
        <div className="p-6">
          <div className="grid grid-cols-1 gap-2">
            {features.map((feature) => (
              <div key={feature} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {feature}
                </span>
              </div>
            ))}
          </div>

          {/* Plan Selection */}
          <div className="mt-6 space-y-2">
            {plans.map((plan) => (
              <button
                key={plan.id}
                onClick={() => setSelectedPlan(plan.id)}
                className={`flex w-full items-center justify-between rounded-xl border-2 p-4 transition-all ${
                  selectedPlan === plan.id
                    ? "border-amber-500 bg-amber-50 dark:bg-amber-900/20"
                    : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${
                      selectedPlan === plan.id
                        ? "border-amber-500 bg-amber-500"
                        : "border-gray-300 dark:border-gray-600"
                    }`}
                  >
                    {selectedPlan === plan.id && (
                      <Check className="h-3 w-3 text-white" />
                    )}
                  </div>
                  <div className="text-left">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        {plan.name}
                      </span>
                      {plan.recommended && (
                        <span className="rounded-full bg-amber-500 px-2 py-0.5 text-[10px] font-bold text-white">
                          BEST VALUE
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {plan.description}
                    </span>
                  </div>
                </div>
                <span className="text-sm font-bold text-gray-900 dark:text-white">
                  {plan.price}
                </span>
              </button>
            ))}
          </div>

          {/* Purchase Button */}
          <button
            onClick={handlePurchase}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 py-3.5 text-sm font-bold text-white shadow-lg hover:from-amber-600 hover:to-yellow-600 transition-all"
          >
            <Sparkles className="h-4 w-4" />
            Subscribe & Unlock All Content
          </button>

          <p className="mt-3 text-center text-xs text-gray-400 dark:text-gray-500">
            Cancel anytime. Restore purchases available in Settings.
          </p>
        </div>
      </div>
    </div>
  );
}
