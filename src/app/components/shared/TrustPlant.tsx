import { motion } from "motion/react";
import { Sprout, Flower2, Droplets, AlertTriangle } from "lucide-react";

export type TrustLevel = "low" | "warning" | "good" | "excellent";

interface TrustPlantProps {
  trustLevel: TrustLevel;
  trustScore: number; // 0-100
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  animated?: boolean;
}

export function TrustPlant({
  trustLevel,
  trustScore,
  size = "md",
  showLabel = false,
  animated = true,
}: TrustPlantProps) {
  const sizeClasses = {
    sm: "w-12 h-12",
    md: "w-24 h-24",
    lg: "w-32 h-32",
  };

  const iconSize = {
    sm: 24,
    md: 48,
    lg: 64,
  };

  const colors = {
    low: {
      primary: "#dc2626",
      secondary: "#fca5a5",
      glow: "rgba(220, 38, 38, 0.2)",
    },
    warning: {
      primary: "#f59e0b",
      secondary: "#fcd34d",
      glow: "rgba(245, 158, 11, 0.2)",
    },
    good: {
      primary: "#10b981",
      secondary: "#6ee7b7",
      glow: "rgba(16, 185, 129, 0.2)",
    },
    excellent: {
      primary: "#059669",
      secondary: "#34d399",
      glow: "rgba(5, 150, 105, 0.2)",
    },
  };

  const getPlantStage = () => {
    if (trustScore < 25) return { icon: AlertTriangle, stage: "wilted", label: "Needs Care" };
    if (trustScore < 50) return { icon: Sprout, stage: "sprout", label: "Growing" };
    if (trustScore < 75) return { icon: Droplets, stage: "growing", label: "Thriving" };
    return { icon: Flower2, stage: "blooming", label: "Blooming" };
  };

  const plant = getPlantStage();
  const PlantIcon = plant.icon;
  const color = colors[trustLevel];

  return (
    <div className="flex flex-col items-center gap-2">
      <motion.div
        className={`${sizeClasses[size]} relative flex items-center justify-center rounded-full`}
        style={{
          background: `radial-gradient(circle, ${color.glow} 0%, transparent 70%)`,
        }}
        animate={animated ? {
          scale: [1, 1.05, 1],
        } : {}}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <motion.div
          animate={animated ? {
            y: [0, -4, 0],
          } : {}}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <PlantIcon
            size={iconSize[size]}
            style={{ color: color.primary }}
            strokeWidth={1.5}
          />
        </motion.div>
        
        {/* Trust score ring */}
        <svg
          className="absolute inset-0"
          viewBox="0 0 100 100"
          style={{ transform: "rotate(-90deg)" }}
        >
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke={color.secondary}
            strokeWidth="3"
            opacity="0.2"
          />
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke={color.primary}
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ strokeDasharray: "0 283" }}
            animate={{ strokeDasharray: `${(trustScore / 100) * 283} 283` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </svg>
      </motion.div>
      
      {showLabel && (
        <div className="text-center">
          <p className="text-sm text-muted-foreground">{plant.label}</p>
          <p className="text-xs text-muted-foreground">{trustScore}% Trust</p>
        </div>
      )}
    </div>
  );
}
