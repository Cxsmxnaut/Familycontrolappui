/**
 * Mock Data for Minute Family Control App
 * 
 * This file contains all placeholder data used throughout the app.
 * In production, this would be replaced with actual API calls and backend integration.
 */

import type { TrustLevel } from "../components/shared/TrustPlant";

// ============================================
// TYPE DEFINITIONS
// ============================================

export interface ChildData {
  id: string;
  name: string;
  avatar?: string;
  isOnline: boolean;
  remainingTime: number;
  trustLevel: TrustLevel;
  trustScore: number;
  isLocked: boolean;
  isPaused: boolean;
}

export interface TimeBlock {
  start: string;
  end: string;
  type: "school" | "bedtime" | "downtime" | "free";
  label: string;
}

export interface DaySchedule {
  day: string;
  blocks: TimeBlock[];
}

export interface AppControl {
  id: string;
  name: string;
  icon?: string;
  isAllowed: boolean;
  isPaused: boolean;
  timeLimit?: number;
  timeUsed: number;
  category: string;
}

export interface WebsiteRule {
  id: string;
  domain: string;
  isAllowed: boolean;
  category?: string;
}

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

// ============================================
// PARENT DASHBOARD DATA
// ============================================

export const MOCK_CHILDREN: ChildData[] = [
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
  {
    id: "3",
    name: "Olivia",
    isOnline: true,
    remainingTime: 200,
    trustLevel: "excellent",
    trustScore: 92,
    isLocked: false,
    isPaused: false,
  },
];

export const MOCK_SCHEDULES: DaySchedule[] = [
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

export const MOCK_APPS: AppControl[] = [
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
  {
    id: "5",
    name: "Spotify",
    category: "Music",
    isAllowed: true,
    isPaused: false,
    timeUsed: 0,
  },
];

export const MOCK_ALLOWED_WEBSITES: WebsiteRule[] = [
  { id: "1", domain: "wikipedia.org", isAllowed: true, category: "Education" },
  { id: "2", domain: "khanacademy.org", isAllowed: true, category: "Education" },
  { id: "3", domain: "scratch.mit.edu", isAllowed: true, category: "Creative" },
  { id: "4", domain: "coolmathgames.com", isAllowed: true, category: "Games" },
];

export const MOCK_BLOCKED_WEBSITES: WebsiteRule[] = [
  { id: "5", domain: "tiktok.com", isAllowed: false, category: "Social Media" },
  { id: "6", domain: "reddit.com", isAllowed: false, category: "Forums" },
  { id: "7", domain: "twitter.com", isAllowed: false, category: "Social Media" },
];

export const MOCK_ALERTS: Alert[] = [
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
  {
    id: "3",
    type: "risky-message",
    title: "Risky Content Detected",
    description: "Potential inappropriate message detected in chat app",
    timestamp: new Date(Date.now() - 1000 * 60 * 120),
    severity: "high",
    childName: "Emma",
    isRead: false,
  },
];

export const MOCK_TRUST_DATA = [
  { date: "Mon", trustScore: 65 },
  { date: "Tue", trustScore: 70 },
  { date: "Wed", trustScore: 68 },
  { date: "Thu", trustScore: 75 },
  { date: "Fri", trustScore: 78 },
  { date: "Sat", trustScore: 80 },
  { date: "Sun", trustScore: 78 },
];

export const MOCK_USAGE_DATA = [
  { day: "Mon", screenTime: 4, productive: 2.5, entertainment: 1.5 },
  { day: "Tue", screenTime: 5, productive: 3, entertainment: 2 },
  { day: "Wed", screenTime: 3.5, productive: 2, entertainment: 1.5 },
  { day: "Thu", screenTime: 4.5, productive: 2.8, entertainment: 1.7 },
  { day: "Fri", screenTime: 5.5, productive: 2, entertainment: 3.5 },
  { day: "Sat", screenTime: 6, productive: 1, entertainment: 5 },
  { day: "Sun", screenTime: 4, productive: 1.5, entertainment: 2.5 },
];

// ============================================
// KID VIEW DATA
// ============================================

export const MOCK_KID_DATA = {
  name: "Emma",
  trustLevel: "good" as TrustLevel,
  trustScore: 78,
  remainingMinutes: 125,
  dailyLimit: 240,
  isLocked: false,
  nextBreak: {
    type: "bedtime" as const,
    startsIn: 180,
  },
};

// ============================================
// HELPER FUNCTIONS
// ============================================

export function formatTime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours > 0) return `${hours}h ${mins}m`;
  return `${mins}m`;
}

export function formatTimeDetailed(minutes: number): { hours: number; minutes: number } {
  return {
    hours: Math.floor(minutes / 60),
    minutes: minutes % 60,
  };
}

export function getTrustLevelColor(level: TrustLevel): string {
  const colors = {
    low: "text-red-600",
    warning: "text-amber-600",
    good: "text-green-600",
    excellent: "text-emerald-600",
  };
  return colors[level];
}

export function getTrustLevelMessage(level: TrustLevel): string {
  const messages = {
    low: "Keep trying! Positive behavior helps your plant grow.",
    warning: "You're making progress! Keep it up!",
    good: "Great job! Your plant is thriving!",
    excellent: "Amazing work! Your plant is blooming beautifully!",
  };
  return messages[level];
}
