import { KidTrustPlant } from "../components/kid/KidTrustPlant";
import { RemainingTime } from "../components/kid/RemainingTime";
import { AllowedAppsWebsites } from "../components/kid/AllowedAppsWebsites";
import { LockScreen } from "../components/kid/LockScreen";
import { useState } from "react";
import { Sparkles, Heart, Star, Award, Crown, Zap } from "lucide-react";

// Mock data for kid view
const mockKidData = {
  name: "Emma",
  trustLevel: "good" as const,
  trustScore: 78,
  remainingMinutes: 125,
  dailyLimit: 240,
  isLocked: false,
  nextBreak: {
    type: "bedtime" as const,
    startsIn: 180,
  },
};

const mockPrivileges = [
  {
    id: "1",
    name: "Weekend Bonus",
    icon: Star,
    unlocked: true,
    requiredScore: 50,
  },
  {
    id: "2",
    name: "App Approval",
    icon: Sparkles,
    unlocked: true,
    requiredScore: 60,
  },
  {
    id: "3",
    name: "Extra Hour",
    icon: Award,
    unlocked: true,
    requiredScore: 70,
  },
  {
    id: "4",
    name: "Premium Access",
    icon: Crown,
    unlocked: false,
    requiredScore: 85,
  },
];

const mockAllowedApps = [
  {
    id: "1",
    name: "YouTube",
    timeLimit: 60,
    timeRemaining: 25,
  },
  {
    id: "2",
    name: "Khan Academy",
    timeLimit: 120,
    timeRemaining: 75,
  },
  {
    id: "3",
    name: "Minecraft",
    timeLimit: 90,
    timeRemaining: 70,
  },
  {
    id: "4",
    name: "Spotify",
  },
];

const mockAllowedWebsites = [
  { id: "1", domain: "wikipedia.org", category: "Education" },
  { id: "2", domain: "khanacademy.org", category: "Education" },
  { id: "3", domain: "scratch.mit.edu", category: "Creative" },
  { id: "4", domain: "coolmathgames.com", category: "Games" },
];

export function KidView() {
  const [isLocked, setIsLocked] = useState(mockKidData.isLocked);

  const handleEmergencyAccess = () => {
    console.log("Emergency access requested - notifying parents");
    // In real app, this would notify parents
    alert("Emergency access request sent to your parents!");
  };

  // Show lock screen if device is locked
  if (isLocked) {
    return (
      <LockScreen
        reason="Bedtime - Sweet dreams!"
        lockUntil={new Date(Date.now() + 8 * 60 * 60 * 1000)} // 8 hours from now
        allowEmergency={true}
        onEmergencyAccess={handleEmergencyAccess}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto p-6 space-y-6">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="mb-2">Hi, {mockKidData.name}! 👋</h1>
          <p className="text-muted-foreground">
            Keep up the great work and watch your trust plant grow!
          </p>
        </header>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Trust Plant */}
          <KidTrustPlant
            trustLevel={mockKidData.trustLevel}
            trustScore={mockKidData.trustScore}
            privileges={mockPrivileges}
          />

          {/* Remaining Time */}
          <RemainingTime
            remainingMinutes={mockKidData.remainingMinutes}
            dailyLimit={mockKidData.dailyLimit}
            nextBreak={mockKidData.nextBreak}
          />
        </div>

        {/* Allowed Apps & Websites */}
        <AllowedAppsWebsites apps={mockAllowedApps} websites={mockAllowedWebsites} />

        {/* Tips Section */}
        <div className="bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/20 dark:to-blue-900/20 border border-purple-200 dark:border-purple-800 rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-purple-200 dark:bg-purple-800 rounded-full flex items-center justify-center flex-shrink-0">
              <Zap className="text-purple-600 dark:text-purple-300" size={24} />
            </div>
            <div>
              <h3 className="mb-2">Quick Tips</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 dark:text-purple-400">•</span>
                  <span>Take breaks every hour to rest your eyes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 dark:text-purple-400">•</span>
                  <span>Balance your screen time with outdoor activities</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 dark:text-purple-400">•</span>
                  <span>Ask your parents if you need more time for homework</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Debug: Toggle Lock Screen */}
        <div className="text-center pt-6 border-t border-border">
          <button
            onClick={() => setIsLocked(!isLocked)}
            className="px-6 py-3 bg-muted hover:bg-muted/80 text-muted-foreground rounded-lg text-sm transition-colors"
          >
            Toggle Lock Screen (Demo)
          </button>
        </div>
      </div>
    </div>
  );
}
