import { Lock, AlertCircle, Phone } from "lucide-react";
import { motion } from "motion/react";

interface LockScreenProps {
  reason: string;
  lockUntil?: Date;
  allowEmergency?: boolean;
  onEmergencyAccess?: () => void;
}

export function LockScreen({
  reason,
  lockUntil,
  allowEmergency = true,
  onEmergencyAccess,
}: LockScreenProps) {
  const formatLockTime = (date: Date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const displayHours = hours % 12 || 12;
    return `${displayHours}:${minutes.toString().padStart(2, "0")} ${ampm}`;
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-purple-900 flex items-center justify-center p-8 z-50">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ top: "20%", left: "10%" }}
        />
        <motion.div
          className="absolute w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ bottom: "20%", right: "10%" }}
        />
      </div>

      {/* Lock Screen Content */}
      <div className="relative max-w-md w-full text-center">
        {/* Lock Icon */}
        <motion.div
          className="inline-flex items-center justify-center w-32 h-32 mb-8"
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-white/20 rounded-full blur-2xl" />
            <div className="relative w-32 h-32 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/30">
              <Lock size={64} className="text-white" />
            </div>
          </div>
        </motion.div>

        {/* Message */}
        <h1 className="text-white mb-4">Device Locked</h1>
        <p className="text-white/80 text-lg mb-2">{reason}</p>
        
        {lockUntil && (
          <p className="text-white/60 mb-8">
            Available again at {formatLockTime(lockUntil)}
          </p>
        )}

        {/* Time Display */}
        <div className="mb-12">
          <p className="text-7xl font-light text-white mb-2">
            {new Date().toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
          <p className="text-white/60">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        {/* Emergency Access */}
        {allowEmergency && (
          <div className="space-y-4">
            <div className="p-4 bg-amber-500/20 backdrop-blur-sm rounded-2xl border border-amber-500/30">
              <div className="flex items-start gap-3 text-left">
                <AlertCircle size={20} className="text-amber-300 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm text-amber-200 mb-1">Need Access?</h4>
                  <p className="text-xs text-amber-300/80">
                    Emergency access will notify your parents and may affect your trust score.
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={onEmergencyAccess}
              className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white rounded-2xl border border-white/30 transition-all flex items-center justify-center gap-3"
            >
              <Phone size={20} />
              Request Emergency Access
            </button>
          </div>
        )}

        {/* Footer */}
        <p className="mt-8 text-white/40 text-sm">
          Questions? Ask your parents for help
        </p>
      </div>
    </div>
  );
}
