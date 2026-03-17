"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Sparkles, ArrowRight, Check } from "lucide-react";

const interests = [
  { id: "career", label: "Career Growth", emoji: "🎯" },
  { id: "entrepreneurship", label: "Entrepreneurship & Business", emoji: "💼" },
  { id: "mindset", label: "Mindset & Personal Growth", emoji: "🧠" },
  { id: "leadership", label: "Leadership & Management", emoji: "👑" },
  { id: "networking", label: "Networking & Community", emoji: "🤝" },
];

const goals = [
  { id: "dream-job", label: "Land my dream job" },
  { id: "start-business", label: "Start or grow a business" },
  { id: "leadership-skills", label: "Develop leadership skills" },
  { id: "mindset-shift", label: "Build a success-oriented mindset" },
  { id: "learn-from-sidd", label: "Learn from Sidd's experience" },
];

const journeyStages = [
  { id: "starting", label: "Just starting out", description: "Exploring my path" },
  { id: "building", label: "Building momentum", description: "Making progress toward my goals" },
  { id: "scaling", label: "Scaling up", description: "Ready to take things to the next level" },
  { id: "pivoting", label: "Looking for a change", description: "Seeking a new direction" },
];

interface OnboardingProps {
  onComplete: () => void;
}

export function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(0);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [selectedStage, setSelectedStage] = useState<string | null>(null);

  const toggleInterest = (id: string) => {
    setSelectedInterests((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Store anonymous responses
      const responses = {
        interests: selectedInterests,
        goal: selectedGoal,
        stage: selectedStage,
        completedAt: new Date().toISOString(),
      };
      localStorage.setItem("onboarding_responses", JSON.stringify(responses));
      localStorage.setItem("onboarding_complete", "true");
      onComplete();
    }
  };

  const canProceed = () => {
    switch (step) {
      case 0:
        return true; // Welcome screen
      case 1:
        return selectedInterests.length > 0;
      case 2:
        return selectedGoal !== null;
      case 3:
        return selectedStage !== null;
      default:
        return false;
    }
  };

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-gradient-to-b from-tribe-50 to-white px-4">
      <div className="w-full max-w-md">
        {/* Progress Dots */}
        {step > 0 && (
          <div className="mb-8 flex items-center justify-center gap-2">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={cn(
                  "h-2 rounded-full transition-all",
                  s <= step ? "w-8 bg-tribe-600" : "w-2 bg-gray-200"
                )}
              />
            ))}
          </div>
        )}

        {/* Step 0: Welcome */}
        {step === 0 && (
          <div className="text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-tribe-600 text-white">
              <Sparkles className="h-8 w-8" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome to the Positive Tribe
            </h1>
            <p className="mt-3 text-gray-600">
              A community of dreamers building purpose-driven lives alongside Sidd Ahmed.
            </p>
            <p className="mt-6 text-sm text-gray-500">
              Answer a few quick questions so we can tailor your experience.
            </p>
          </div>
        )}

        {/* Step 1: Interests */}
        {step === 1 && (
          <div>
            <h2 className="text-center text-xl font-bold text-gray-900">
              What are you most interested in?
            </h2>
            <p className="mt-2 text-center text-sm text-gray-500">
              Select all that apply
            </p>
            <div className="mt-6 space-y-3">
              {interests.map((interest) => (
                <button
                  key={interest.id}
                  onClick={() => toggleInterest(interest.id)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-xl border-2 px-4 py-3.5 text-left transition-all",
                    selectedInterests.includes(interest.id)
                      ? "border-tribe-600 bg-tribe-50"
                      : "border-gray-100 bg-white hover:border-gray-200"
                  )}
                >
                  <span className="text-xl">{interest.emoji}</span>
                  <span className="flex-1 text-sm font-medium text-gray-900">
                    {interest.label}
                  </span>
                  {selectedInterests.includes(interest.id) && (
                    <Check className="h-5 w-5 text-tribe-600" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Primary Goal */}
        {step === 2 && (
          <div>
            <h2 className="text-center text-xl font-bold text-gray-900">
              What&apos;s your primary goal?
            </h2>
            <p className="mt-2 text-center text-sm text-gray-500">
              Choose one that resonates most
            </p>
            <div className="mt-6 space-y-3">
              {goals.map((goal) => (
                <button
                  key={goal.id}
                  onClick={() => setSelectedGoal(goal.id)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-xl border-2 px-4 py-3.5 text-left transition-all",
                    selectedGoal === goal.id
                      ? "border-tribe-600 bg-tribe-50"
                      : "border-gray-100 bg-white hover:border-gray-200"
                  )}
                >
                  <span className="flex-1 text-sm font-medium text-gray-900">
                    {goal.label}
                  </span>
                  {selectedGoal === goal.id && (
                    <Check className="h-5 w-5 text-tribe-600" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Journey Stage */}
        {step === 3 && (
          <div>
            <h2 className="text-center text-xl font-bold text-gray-900">
              Where are you in your journey?
            </h2>
            <p className="mt-2 text-center text-sm text-gray-500">
              This helps us show you the right content
            </p>
            <div className="mt-6 space-y-3">
              {journeyStages.map((stage) => (
                <button
                  key={stage.id}
                  onClick={() => setSelectedStage(stage.id)}
                  className={cn(
                    "flex w-full flex-col rounded-xl border-2 px-4 py-3.5 text-left transition-all",
                    selectedStage === stage.id
                      ? "border-tribe-600 bg-tribe-50"
                      : "border-gray-100 bg-white hover:border-gray-200"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">
                      {stage.label}
                    </span>
                    {selectedStage === stage.id && (
                      <Check className="h-5 w-5 text-tribe-600" />
                    )}
                  </div>
                  <span className="mt-0.5 text-xs text-gray-500">
                    {stage.description}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Action Button */}
        <button
          onClick={handleNext}
          disabled={!canProceed()}
          className={cn(
            "mt-8 flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-sm font-semibold transition-all",
            canProceed()
              ? "bg-tribe-600 text-white hover:bg-tribe-700"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          )}
        >
          {step === 0 ? "Get Started" : step === 3 ? "Enter the Tribe" : "Continue"}
          <ArrowRight className="h-4 w-4" />
        </button>

        {/* Skip option */}
        {step > 0 && (
          <button
            onClick={onComplete}
            className="mt-3 w-full text-center text-sm text-gray-400 hover:text-gray-600"
          >
            Skip for now
          </button>
        )}
      </div>
    </div>
  );
}
