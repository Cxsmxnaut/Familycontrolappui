import { ChildCard, type ChildData } from "../components/parent/ChildCard";
import { ScheduleTimeline, type DaySchedule } from "../components/parent/ScheduleTimeline";
import { AppControls, type AppControl } from "../components/parent/AppControls";
import { WebControls, type WebsiteRule } from "../components/parent/WebControls";
import { AlertsList, type Alert } from "../components/parent/AlertsList";
import { TrustChart, type TrustDataPoint, type UsageDataPoint } from "../components/parent/TrustChart";
import { useState } from "react";

// Mock data - in a real app, this would come from API/backend
const mockChildren: ChildData[] = [
  {
    id: "1",
    name: "Emma",
    isOnline: true,
    remainingTime: 125,
    trustLevel: "good",
    trustScore: 78,
    isLocked: false,
    isPaused: false,
  },
  {
    id: "2",
    name: "Noah",
    isOnline: false,
    remainingTime: 45,
    trustLevel: "warning",
    trustScore: 45,
    isLocked: false,
    isPaused: true,
  },
];

const mockSchedules: DaySchedule[] = [
  {
    day: "Mon-Fri",
    blocks: [
      { start: "07:00", end: "08:00", type: "free", label: "Morning" },
      { start: "08:00", end: "15:00", type: "school", label: "School Hours" },
      { start: "15:00", end: "17:00", type: "free", label: "Afternoon" },
      { start: "17:00", end: "18:00", type: "downtime", label: "Dinner" },
      { start: "18:00", end: "20:00", type: "free", label: "Evening" },
      { start: "20:00", end: "07:00", type: "bedtime", label: "Bedtime" },
    ],
  },
  {
    day: "Weekend",
    blocks: [
      { start: "08:00", end: "12:00", type: "free", label: "Morning" },
      { start: "12:00", end: "13:00", type: "downtime", label: "Lunch" },
      { start: "13:00", end: "20:00", type: "free", label: "Afternoon/Evening" },
      { start: "20:00", end: "08:00", type: "bedtime", label: "Bedtime" },
    ],
  },
];

const mockApps: AppControl[] = [
  {
    id: "1",
    name: "YouTube",
    category: "Entertainment",
    isAllowed: true,
    isPaused: false,
    timeLimit: 60,
    timeUsed: 35,
  },
  {
    id: "2",
    name: "Khan Academy",
    category: "Education",
    isAllowed: true,
    isPaused: false,
    timeLimit: 120,
    timeUsed: 45,
  },
  {
    id: "3",
    name: "Instagram",
    category: "Social Media",
    isAllowed: false,
    isPaused: true,
    timeLimit: 30,
    timeUsed: 30,
  },
  {
    id: "4",
    name: "Minecraft",
    category: "Gaming",
    isAllowed: true,
    isPaused: false,
    timeLimit: 90,
    timeUsed: 20,
  },
];

const mockAllowedWebsites: WebsiteRule[] = [
  { id: "1", domain: "wikipedia.org", isAllowed: true, category: "Education" },
  { id: "2", domain: "khanacademy.org", isAllowed: true, category: "Education" },
  { id: "3", domain: "scratch.mit.edu", isAllowed: true, category: "Creative" },
];

const mockBlockedWebsites: WebsiteRule[] = [
  { id: "4", domain: "tiktok.com", isAllowed: false, category: "Social Media" },
  { id: "5", domain: "reddit.com", isAllowed: false, category: "Forums" },
];

const mockAlerts: Alert[] = [
  {
    id: "1",
    type: "bypass",
    title: "Bypass Attempt Detected",
    description: "Emma tried to access Instagram during restricted hours",
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    severity: "medium",
    childName: "Emma",
    isRead: false,
  },
  {
    id: "2",
    type: "time-limit",
    title: "Time Limit Reached",
    description: "Noah reached his daily screen time limit",
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
    severity: "low",
    childName: "Noah",
    isRead: true,
  },
];

const mockTrustData: TrustDataPoint[] = [
  { date: "Mon", trustScore: 65 },
  { date: "Tue", trustScore: 70 },
  { date: "Wed", trustScore: 68 },
  { date: "Thu", trustScore: 75 },
  { date: "Fri", trustScore: 78 },
  { date: "Sat", trustScore: 80 },
  { date: "Sun", trustScore: 78 },
];

const mockUsageData: UsageDataPoint[] = [
  { day: "Mon", screenTime: 4, productive: 2.5, entertainment: 1.5 },
  { day: "Tue", screenTime: 5, productive: 3, entertainment: 2 },
  { day: "Wed", screenTime: 3.5, productive: 2, entertainment: 1.5 },
  { day: "Thu", screenTime: 4.5, productive: 2.8, entertainment: 1.7 },
  { day: "Fri", screenTime: 5.5, productive: 2, entertainment: 3.5 },
  { day: "Sat", screenTime: 6, productive: 1, entertainment: 5 },
  { day: "Sun", screenTime: 4, productive: 1.5, entertainment: 2.5 },
];

export function ParentDashboard() {
  const [children] = useState(mockChildren);
  const [apps] = useState(mockApps);
  const [allowedWebsites] = useState(mockAllowedWebsites);
  const [blockedWebsites] = useState(mockBlockedWebsites);
  const [alerts] = useState(mockAlerts);
  const [safeSearchEnabled, setSafeSearchEnabled] = useState(true);

  // Handlers - in real app, these would call backend APIs
  const handleLockToggle = (id: string) => {
    console.log("Toggle lock for child:", id);
    // API call would go here
  };

  const handlePauseToggle = (id: string) => {
    console.log("Toggle pause for child:", id);
    // API call would go here
  };

  const handleApproveAccess = (id: string) => {
    console.log("Approve temporary access for child:", id);
    // API call would go here
  };

  const handleAppToggleAllow = (id: string) => {
    console.log("Toggle allow for app:", id);
    // API call would go here
  };

  const handleAppTogglePause = (id: string) => {
    console.log("Toggle pause for app:", id);
    // API call would go here
  };

  const handleSetTimeLimit = (id: string, minutes: number) => {
    console.log("Set time limit for app:", id, minutes);
    // API call would go here
  };

  const handleAddWebRule = (domain: string, isAllowed: boolean) => {
    console.log("Add web rule:", domain, isAllowed);
    // API call would go here
  };

  const handleRemoveWebRule = (id: string) => {
    console.log("Remove web rule:", id);
    // API call would go here
  };

  const handleMarkAlertRead = (id: string) => {
    console.log("Mark alert as read:", id);
    // API call would go here
  };

  const handleDismissAlert = (id: string) => {
    console.log("Dismiss alert:", id);
    // API call would go here
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-[1400px] mx-auto p-6 space-y-6">
        {/* Header */}
        <header className="mb-8">
          <h1 className="mb-2">Parent Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor and manage your family's screen time and digital wellbeing
          </p>
        </header>

        {/* Children Cards */}
        <section>
          <h2 className="mb-4">Children</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {children.map((child) => (
              <ChildCard
                key={child.id}
                child={child}
                onLockToggle={handleLockToggle}
                onPauseToggle={handlePauseToggle}
                onApproveAccess={handleApproveAccess}
              />
            ))}
          </div>
        </section>

        {/* Schedule */}
        <section>
          <ScheduleTimeline schedules={mockSchedules} />
        </section>

        {/* Controls Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AppControls
            apps={apps}
            onToggleAllow={handleAppToggleAllow}
            onTogglePause={handleAppTogglePause}
            onSetTimeLimit={handleSetTimeLimit}
          />
          <WebControls
            allowList={allowedWebsites}
            blockList={blockedWebsites}
            safeSearchEnabled={safeSearchEnabled}
            onToggleSafeSearch={() => setSafeSearchEnabled(!safeSearchEnabled)}
            onAddRule={handleAddWebRule}
            onRemoveRule={handleRemoveWebRule}
          />
        </div>

        {/* Alerts and Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AlertsList
            alerts={alerts}
            onMarkRead={handleMarkAlertRead}
            onDismiss={handleDismissAlert}
          />
          <TrustChart trustData={mockTrustData} usageData={mockUsageData} />
        </div>
      </div>
    </div>
  );
}
