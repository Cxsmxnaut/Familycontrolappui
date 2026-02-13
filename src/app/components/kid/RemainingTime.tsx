import { Clock, Zap, Moon } from "lucide-react";
import { motion } from "motion/react";

interface RemainingTimeProps {
  remainingMinutes: number;
  dailyLimit: number;
  nextBreak?: {
    type: "bedtime" | "downtime";
    startsIn: number; // minutes
  };
}

export function RemainingTime({ remainingMinutes, dailyLimit, nextBreak }: RemainingTimeProps) {
  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return { hours, minutes: mins };
  };

  const remaining = formatTime(remainingMinutes);
  const percentRemaining = (remainingMinutes / dailyLimit) * 100;

  const getTimeStatus = () => {
    if (percentRemaining > 50) return { color: "green", message: "Plenty of time left" };
    if (percentRemaining > 25) return { color: "amber", message: "Time running low" };
    return { color: "red", message: "Almost out of time" };
  };

  const status = getTimeStatus();

  return (
    <div className="bg-card border border-border rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-6">
        <Clock size={20} />
        <h2>Time Remaining Today</h2>
      </div>

      {/* Large Time Display */}
      <div className="text-center mb-6">
        <motion.div
          className="inline-flex items-baseline gap-2"
          animate={{
            scale: remainingMinutes < 15 ? [1, 1.05, 1] : 1,
          }}
          transition={{
            duration: 1,
            repeat: remainingMinutes < 15 ? Infinity : 0,
          }}
        >
          <span className={`text-6xl font-medium ${
            status.color === "red" ? "text-red-600" :
            status.color === "amber" ? "text-amber-600" :
            "text-green-600"
          }`}>
            {remaining.hours}
          </span>
          <span className="text-3xl text-muted-foreground">h</span>
          <span className={`text-6xl font-medium ${
            status.color === "red" ? "text-red-600" :
            status.color === "amber" ? "text-amber-600" :
            "text-green-600"
          }`}>
            {remaining.minutes.toString().padStart(2, "0")}
          </span>
          <span className="text-3xl text-muted-foreground">m</span>
        </motion.div>
        <p className="text-sm text-muted-foreground mt-2">{status.message}</p>
      </div>

      {/* Progress Circle */}
      <div className="relative w-full h-4 bg-muted rounded-full overflow-hidden mb-6">
        <motion.div
          className={`h-full ${
            status.color === "red" ? "bg-red-500" :
            status.color === "amber" ? "bg-amber-500" :
            "bg-green-500"
          }`}
          initial={{ width: 0 }}
          animate={{ width: `${percentRemaining}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-muted/30 rounded-xl">
          <p className="text-xs text-muted-foreground mb-1">Daily Limit</p>
          <p className="text-xl font-medium">{formatTime(dailyLimit).hours}h {formatTime(dailyLimit).minutes}m</p>
        </div>
        <div className="p-4 bg-muted/30 rounded-xl">
          <p className="text-xs text-muted-foreground mb-1">Used Today</p>
          <p className="text-xl font-medium">
            {formatTime(dailyLimit - remainingMinutes).hours}h {formatTime(dailyLimit - remainingMinutes).minutes}m
          </p>
        </div>
      </div>

      {/* Next Break */}
      {nextBreak && (
        <div className={`p-4 rounded-xl border-2 ${
          nextBreak.type === "bedtime"
            ? "border-purple-200 bg-purple-50 dark:border-purple-800 dark:bg-purple-900/20"
            : "border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-900/20"
        }`}>
          <div className="flex items-center gap-3">
            {nextBreak.type === "bedtime" ? (
              <Moon className="text-purple-600 dark:text-purple-400" size={20} />
            ) : (
              <Zap className="text-amber-600 dark:text-amber-400" size={20} />
            )}
            <div className="flex-1">
              <h4 className="text-sm">
                {nextBreak.type === "bedtime" ? "Bedtime" : "Downtime"} Soon
              </h4>
              <p className="text-xs text-muted-foreground">
                Starts in {formatTime(nextBreak.startsIn).hours}h {formatTime(nextBreak.startsIn).minutes}m
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
