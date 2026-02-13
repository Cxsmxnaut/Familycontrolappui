import { Award, TrendingUp, TrendingDown } from "lucide-react";
import type { TrustLevel } from "./TrustPlant";

interface TrustBadgeProps {
  level: TrustLevel;
  label?: string;
  trend?: "up" | "down" | "stable";
  size?: "sm" | "md";
}

export function TrustBadge({ level, label, trend, size = "md" }: TrustBadgeProps) {
  const colors = {
    low: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    warning: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    good: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    excellent: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  };

  const labels = {
    low: "Low Trust",
    warning: "Building Trust",
    good: "Good Trust",
    excellent: "Excellent Trust",
  };

  const sizeClasses = size === "sm" ? "text-xs px-2 py-0.5" : "text-sm px-3 py-1";

  return (
    <div className={`inline-flex items-center gap-1.5 rounded-full ${colors[level]} ${sizeClasses}`}>
      <Award size={size === "sm" ? 12 : 14} />
      <span>{label || labels[level]}</span>
      {trend === "up" && <TrendingUp size={size === "sm" ? 12 : 14} />}
      {trend === "down" && <TrendingDown size={size === "sm" ? 12 : 14} />}
    </div>
  );
}
