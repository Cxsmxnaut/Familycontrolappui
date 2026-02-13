import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { TrendingUp, Activity, Clock } from "lucide-react";

export interface TrustDataPoint {
  date: string;
  trustScore: number;
}

export interface UsageDataPoint {
  day: string;
  screenTime: number;
  productive: number;
  entertainment: number;
}

interface ChartsProps {
  trustData: TrustDataPoint[];
  usageData: UsageDataPoint[];
}

export function TrustChart({ trustData, usageData }: ChartsProps) {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-popover text-popover-foreground px-3 py-2 rounded-lg shadow-lg border border-border">
          <p className="text-sm font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-xs" style={{ color: entry.color }}>
              {entry.name}: {entry.value}
              {entry.dataKey === "trustScore" ? "%" : "h"}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2>Analytics & Reports</h2>
        <div className="flex gap-2">
          <button className="px-3 py-1 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors text-sm">
            7 Days
          </button>
          <button className="px-3 py-1 rounded-lg text-muted-foreground hover:bg-secondary transition-colors text-sm">
            30 Days
          </button>
        </div>
      </div>

      {/* Trust Growth Over Time */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp size={18} className="text-green-600" />
          <h3>Trust Growth</h3>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={trustData}>
            <defs>
              <linearGradient id="trustGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis
              dataKey="date"
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <YAxis
              stroke="var(--color-muted-foreground)"
              fontSize={12}
              domain={[0, 100]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="trustScore"
              stroke="#10b981"
              strokeWidth={2}
              fill="url(#trustGradient)"
              name="Trust Score"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Screen Time Usage */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Clock size={18} className="text-blue-600" />
          <h3>Screen Time Breakdown</h3>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={usageData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis
              dataKey="day"
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <YAxis
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ fontSize: "12px" }}
              iconType="circle"
            />
            <Bar dataKey="productive" stackId="a" fill="#10b981" name="Productive" radius={[0, 0, 0, 0]} />
            <Bar dataKey="entertainment" stackId="a" fill="#3b82f6" name="Entertainment" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-border">
        <div className="text-center">
          <p className="text-2xl font-medium text-foreground">4.2h</p>
          <p className="text-xs text-muted-foreground">Avg Daily</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-medium text-green-600">+12%</p>
          <p className="text-xs text-muted-foreground">Trust Growth</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-medium text-blue-600">85%</p>
          <p className="text-xs text-muted-foreground">Compliance</p>
        </div>
      </div>
    </div>
  );
}
