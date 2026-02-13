import { TrustPlant, type TrustLevel } from "../shared/TrustPlant";
import { Sparkles, Heart, Star, Award } from "lucide-react";
import * as Tooltip from "@radix-ui/react-tooltip";

interface Privilege {
  id: string;
  name: string;
  icon: typeof Sparkles;
  unlocked: boolean;
  requiredScore: number;
}

interface KidTrustPlantProps {
  trustLevel: TrustLevel;
  trustScore: number;
  privileges: Privilege[];
}

export function KidTrustPlant({ trustLevel, trustScore, privileges }: KidTrustPlantProps) {
  const messages = {
    low: "Keep trying! Positive behavior helps your plant grow.",
    warning: "You're making progress! Keep it up!",
    good: "Great job! Your plant is thriving!",
    excellent: "Amazing work! Your plant is blooming beautifully!",
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-8">
      <div className="text-center mb-6">
        <h1 className="mb-2">Your Trust Plant</h1>
        <p className="text-muted-foreground">{messages[trustLevel]}</p>
      </div>

      {/* Large Trust Plant */}
      <div className="flex justify-center mb-8">
        <TrustPlant
          trustLevel={trustLevel}
          trustScore={trustScore}
          size="lg"
          showLabel={true}
          animated={true}
        />
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-muted-foreground">Progress</span>
          <span className="font-medium">{trustScore}%</span>
        </div>
        <div className="h-3 bg-muted rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-500 ${
              trustScore < 25
                ? "bg-red-500"
                : trustScore < 50
                ? "bg-amber-500"
                : trustScore < 75
                ? "bg-green-500"
                : "bg-emerald-500"
            }`}
            style={{ width: `${trustScore}%` }}
          />
        </div>
      </div>

      {/* Privileges/Badges */}
      <div>
        <h3 className="mb-4">Earned Privileges</h3>
        <div className="grid grid-cols-2 gap-3">
          {privileges.map((privilege) => {
            const Icon = privilege.icon;
            return (
              <Tooltip.Provider key={privilege.id}>
                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <div
                      className={`p-4 rounded-xl border-2 transition-all ${
                        privilege.unlocked
                          ? "border-green-300 bg-green-50 dark:border-green-700 dark:bg-green-900/20"
                          : "border-border bg-muted/30 opacity-50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            privilege.unlocked
                              ? "bg-green-200 text-green-700 dark:bg-green-800 dark:text-green-300"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          <Icon size={20} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{privilege.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {privilege.unlocked ? "Unlocked!" : `${privilege.requiredScore}% needed`}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Tooltip.Trigger>
                  <Tooltip.Portal>
                    <Tooltip.Content
                      className="bg-popover text-popover-foreground px-3 py-2 rounded-lg text-sm shadow-lg max-w-xs"
                      sideOffset={5}
                    >
                      {privilege.unlocked
                        ? `You've unlocked ${privilege.name}!`
                        : `Reach ${privilege.requiredScore}% trust to unlock ${privilege.name}`}
                    </Tooltip.Content>
                  </Tooltip.Portal>
                </Tooltip.Root>
              </Tooltip.Provider>
            );
          })}
        </div>
      </div>

      {/* Tips */}
      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
        <div className="flex gap-3">
          <Sparkles size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm text-blue-900 dark:text-blue-300 mb-1">How to Grow Your Plant</h4>
            <ul className="text-xs text-blue-700 dark:text-blue-400 space-y-1">
              <li>• Follow your daily schedule</li>
              <li>• Stay within your time limits</li>
              <li>• Use approved apps and websites</li>
              <li>• Ask permission when needed</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
