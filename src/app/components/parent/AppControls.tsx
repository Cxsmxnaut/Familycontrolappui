import { Play, Pause, Lock, Clock, MoreVertical } from "lucide-react";
import * as Switch from "@radix-ui/react-switch";

export interface AppControl {
  id: string;
  name: string;
  icon?: string;
  isAllowed: boolean;
  isPaused: boolean;
  timeLimit?: number; // minutes per day
  timeUsed: number; // minutes used today
  category: string;
}

interface AppControlsProps {
  apps: AppControl[];
  onToggleAllow: (id: string) => void;
  onTogglePause: (id: string) => void;
  onSetTimeLimit: (id: string, minutes: number) => void;
}

export function AppControls({
  apps,
  onToggleAllow,
  onTogglePause,
  onSetTimeLimit,
}: AppControlsProps) {
  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) return `${hours}h ${mins}m`;
    return `${mins}m`;
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2>App Controls</h2>
        <button className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400">
          Add App
        </button>
      </div>

      <div className="space-y-3">
        {apps.map((app) => (
          <div
            key={app.id}
            className="flex items-center gap-4 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
          >
            {/* App Icon/Name */}
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white flex-shrink-0">
                {app.icon ? (
                  <img src={app.icon} alt={app.name} className="w-10 h-10 rounded-xl" />
                ) : (
                  <span className="text-sm">{app.name[0]}</span>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="truncate">{app.name}</h4>
                <p className="text-xs text-muted-foreground">{app.category}</p>
              </div>
            </div>

            {/* Time Usage */}
            {app.timeLimit && (
              <div className="flex items-center gap-2 text-sm">
                <Clock size={14} className="text-muted-foreground" />
                <span>
                  {formatTime(app.timeUsed)}
                  <span className="text-muted-foreground"> / {formatTime(app.timeLimit)}</span>
                </span>
              </div>
            )}

            {/* Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => onTogglePause(app.id)}
                className={`p-2 rounded-lg transition-colors ${
                  app.isPaused
                    ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
                title={app.isPaused ? "Resume" : "Pause"}
              >
                {app.isPaused ? <Play size={16} /> : <Pause size={16} />}
              </button>

              <Switch.Root
                checked={app.isAllowed}
                onCheckedChange={() => onToggleAllow(app.id)}
                className="w-11 h-6 bg-muted rounded-full relative data-[state=checked]:bg-green-500 transition-colors"
              >
                <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[22px] shadow-sm" />
              </Switch.Root>

              <button
                className="p-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
                title="More options"
              >
                <MoreVertical size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="flex gap-2 mt-6 pt-6 border-t border-border">
        <button className="flex-1 px-4 py-2 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400 transition-colors text-sm flex items-center justify-center gap-2">
          <Lock size={16} />
          Block All
        </button>
        <button className="flex-1 px-4 py-2 rounded-lg bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400 transition-colors text-sm flex items-center justify-center gap-2">
          <Play size={16} />
          Allow All
        </button>
      </div>
    </div>
  );
}
