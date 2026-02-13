import { AlertTriangle, Shield, MessageSquare, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export interface Alert {
  id: string;
  type: "bypass" | "fail-closed" | "risky-message" | "time-limit";
  title: string;
  description: string;
  timestamp: Date;
  severity: "low" | "medium" | "high";
  childName: string;
  isRead: boolean;
}

interface AlertsListProps {
  alerts: Alert[];
  onMarkRead: (id: string) => void;
  onDismiss: (id: string) => void;
}

export function AlertsList({ alerts, onMarkRead, onDismiss }: AlertsListProps) {
  const severityColors = {
    low: "border-blue-200 bg-blue-50 dark:border-blue-900/30 dark:bg-blue-900/10",
    medium: "border-amber-200 bg-amber-50 dark:border-amber-900/30 dark:bg-amber-900/10",
    high: "border-red-200 bg-red-50 dark:border-red-900/30 dark:bg-red-900/10",
  };

  const severityIcons = {
    low: Shield,
    medium: AlertTriangle,
    high: AlertTriangle,
  };

  const typeIcons = {
    bypass: Shield,
    "fail-closed": Shield,
    "risky-message": MessageSquare,
    "time-limit": Clock,
  };

  const unreadCount = alerts.filter((a) => !a.isRead).length;

  return (
    <div className="bg-card border border-border rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <h2>Recent Alerts</h2>
          {unreadCount > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-red-500 text-white text-xs">
              {unreadCount}
            </span>
          )}
        </div>
        <button className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400">
          View All
        </button>
      </div>

      <div className="space-y-3">
        {alerts.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground text-sm">
            No alerts to display
          </div>
        ) : (
          alerts.map((alert) => {
            const SeverityIcon = severityIcons[alert.severity];
            const TypeIcon = typeIcons[alert.type];

            return (
              <div
                key={alert.id}
                className={`relative p-4 rounded-xl border-2 transition-all ${
                  severityColors[alert.severity]
                } ${!alert.isRead ? "shadow-md" : "opacity-75"}`}
                onClick={() => !alert.isRead && onMarkRead(alert.id)}
              >
                {!alert.isRead && (
                  <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-blue-500" />
                )}

                <div className="flex gap-3">
                  <div className="flex-shrink-0">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        alert.severity === "high"
                          ? "bg-red-200 text-red-700 dark:bg-red-900/50 dark:text-red-400"
                          : alert.severity === "medium"
                          ? "bg-amber-200 text-amber-700 dark:bg-amber-900/50 dark:text-amber-400"
                          : "bg-blue-200 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400"
                      }`}
                    >
                      <TypeIcon size={18} />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h4 className="text-sm">{alert.title}</h4>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {formatDistanceToNow(alert.timestamp, { addSuffix: true })}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{alert.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        Child: {alert.childName}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDismiss(alert.id);
                        }}
                        className="text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400"
                      >
                        Dismiss
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
