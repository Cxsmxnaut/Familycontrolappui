import { Clock, Moon, Book, Coffee } from "lucide-react";

export interface TimeBlock {
  start: string; // "08:00"
  end: string;
  type: "school" | "bedtime" | "downtime" | "free";
  label: string;
}

export interface DaySchedule {
  day: string;
  blocks: TimeBlock[];
}

interface ScheduleTimelineProps {
  schedules: DaySchedule[];
}

export function ScheduleTimeline({ schedules }: ScheduleTimelineProps) {
  const blockColors = {
    school: "bg-blue-500",
    bedtime: "bg-purple-500",
    downtime: "bg-amber-500",
    free: "bg-green-500",
  };

  const blockIcons = {
    school: Book,
    bedtime: Moon,
    downtime: Coffee,
    free: Clock,
  };

  // Convert time string to percentage of day (0-100)
  const timeToPercent = (time: string) => {
    const [hours, minutes] = time.split(":").map(Number);
    return ((hours * 60 + minutes) / (24 * 60)) * 100;
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2>Daily Schedule</h2>
        <button className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400">
          Edit Schedule
        </button>
      </div>

      <div className="space-y-4">
        {schedules.map((schedule) => (
          <div key={schedule.day} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground w-20">{schedule.day}</span>
              
              {/* Timeline */}
              <div className="flex-1 h-8 bg-muted/30 rounded-lg relative overflow-hidden">
                {schedule.blocks.map((block, idx) => {
                  const Icon = blockIcons[block.type];
                  const left = timeToPercent(block.start);
                  const width = timeToPercent(block.end) - left;

                  return (
                    <div
                      key={idx}
                      className={`absolute top-0 bottom-0 ${blockColors[block.type]} flex items-center justify-center group cursor-pointer transition-opacity hover:opacity-90`}
                      style={{
                        left: `${left}%`,
                        width: `${width}%`,
                      }}
                    >
                      <Icon size={14} className="text-white opacity-80" />
                      
                      {/* Tooltip */}
                      <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-popover text-popover-foreground px-3 py-1.5 rounded-lg text-xs shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                        {block.label}
                        <br />
                        {block.start} - {block.end}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex gap-4 mt-6 pt-6 border-t border-border flex-wrap">
        {Object.entries(blockColors).map(([type, color]) => {
          const Icon = blockIcons[type as keyof typeof blockIcons];
          return (
            <div key={type} className="flex items-center gap-2">
              <div className={`w-4 h-4 rounded ${color} flex items-center justify-center`}>
                <Icon size={10} className="text-white" />
              </div>
              <span className="text-xs text-muted-foreground capitalize">{type}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
