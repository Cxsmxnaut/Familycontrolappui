import { Lock, Unlock, Pause, Play, MoreVertical, Clock } from "lucide-react";
import { TrustPlant, type TrustLevel } from "../shared/TrustPlant";
import { TrustBadge } from "../shared/TrustBadge";
import * as Tooltip from "@radix-ui/react-tooltip";

export interface ChildData {
  id: string;
  name: string;
  avatar?: string;
  isOnline: boolean;
  remainingTime: number; // minutes
  trustLevel: TrustLevel;
  trustScore: number;
  isLocked: boolean;
  isPaused: boolean;
}

interface ChildCardProps {
  child: ChildData;
  onLockToggle: (id: string) => void;
  onPauseToggle: (id: string) => void;
  onApproveAccess: (id: string) => void;
}

export function ChildCard({
  child,
  onLockToggle,
  onPauseToggle,
  onApproveAccess,
}: ChildCardProps) {
  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) return `${hours}h ${mins}m`;
    return `${mins}m`;
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-all duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white">
              {child.avatar ? (
                <img src={child.avatar} alt={child.name} className="rounded-full" />
              ) : (
                <span className="text-lg">{child.name[0]}</span>
              )}
            </div>
            <div
              className={`absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full border-2 border-card ${
                child.isOnline ? "bg-green-500" : "bg-gray-400"
              }`}
            />
          </div>
          <div>
            <h3 className="text-lg">{child.name}</h3>
            <p className="text-sm text-muted-foreground">
              {child.isOnline ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        <TrustBadge level={child.trustLevel} size="sm" />
      </div>

      {/* Trust Plant & Time */}
      <div className="flex items-center justify-between mb-6 py-4 px-4 bg-muted/50 rounded-xl">
        <TrustPlant
          trustLevel={child.trustLevel}
          trustScore={child.trustScore}
          size="sm"
          showLabel
        />
        
        <div className="flex flex-col items-end gap-1">
          <div className="flex items-center gap-2 text-foreground">
            <Clock size={16} />
            <span className="text-2xl font-medium">{formatTime(child.remainingTime)}</span>
          </div>
          <p className="text-xs text-muted-foreground">Remaining Today</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex gap-2">
        <Tooltip.Provider>
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <button
                onClick={() => onLockToggle(child.id)}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg transition-colors ${
                  child.isLocked
                    ? "bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400"
                    : "bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400"
                }`}
              >
                {child.isLocked ? <Lock size={16} /> : <Unlock size={16} />}
                <span className="text-sm">{child.isLocked ? "Locked" : "Unlocked"}</span>
              </button>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content
                className="bg-popover text-popover-foreground px-3 py-2 rounded-lg text-sm shadow-lg"
                sideOffset={5}
              >
                {child.isLocked ? "Unlock device" : "Lock device now"}
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>

        <Tooltip.Provider>
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <button
                onClick={() => onPauseToggle(child.id)}
                className={`flex items-center justify-center px-4 py-2.5 rounded-lg transition-colors ${
                  child.isPaused
                    ? "bg-amber-100 text-amber-700 hover:bg-amber-200 dark:bg-amber-900/30 dark:text-amber-400"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {child.isPaused ? <Play size={16} /> : <Pause size={16} />}
              </button>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content
                className="bg-popover text-popover-foreground px-3 py-2 rounded-lg text-sm shadow-lg"
                sideOffset={5}
              >
                {child.isPaused ? "Resume apps" : "Pause all apps"}
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>

        <button
          onClick={() => onApproveAccess(child.id)}
          className="px-4 py-2.5 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400 transition-colors text-sm"
        >
          Approve
        </button>

        <button className="px-3 py-2.5 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors">
          <MoreVertical size={16} />
        </button>
      </div>
    </div>
  );
}
