# Minute - Component Hierarchy & Documentation

## 🏗️ Architecture Overview

```
App.tsx (Main entry point with view switching)
├── ParentDashboard (Parent view)
│   ├── ChildCard × N
│   │   ├── TrustPlant (shared)
│   │   └── TrustBadge (shared)
│   ├── ScheduleTimeline
│   ├── AppControls
│   ├── WebControls
│   ├── AlertsList
│   └── TrustChart
│
└── KidView (Child view)
    ├── KidTrustPlant
    │   └── TrustPlant (shared)
    ├── RemainingTime
    ├── AllowedAppsWebsites
    └── LockScreen (conditional)
```

---

## 📂 File Structure

```
/src/app/
├── App.tsx                          # Main app with navigation
├── views/
│   ├── ParentDashboard.tsx         # Parent's main view
│   └── KidView.tsx                 # Child's main view
│
├── components/
│   ├── shared/                     # Reusable across views
│   │   ├── TrustPlant.tsx         # Animated plant visualization
│   │   └── TrustBadge.tsx         # Trust level indicator
│   │
│   ├── parent/                     # Parent dashboard components
│   │   ├── ChildCard.tsx          # Individual child overview
│   │   ├── ScheduleTimeline.tsx   # Daily schedule visualization
│   │   ├── AppControls.tsx        # App management interface
│   │   ├── WebControls.tsx        # Website allow/block lists
│   │   ├── AlertsList.tsx         # Recent alerts & notifications
│   │   └── TrustChart.tsx         # Analytics & reports
│   │
│   └── kid/                        # Kid view components
│       ├── KidTrustPlant.tsx      # Trust plant with privileges
│       ├── RemainingTime.tsx      # Time tracking display
│       ├── AllowedAppsWebsites.tsx # What kid can access
│       └── LockScreen.tsx         # Full-screen lock UI
│
└── data/
    └── mockData.ts                 # All placeholder data & types
```

---

## 🎨 Design System

### Colors & Trust Levels

| Trust Level | Color | Score Range | Plant Stage |
|------------|-------|-------------|-------------|
| Low | Red (#dc2626) | 0-24 | Wilted |
| Warning | Amber (#f59e0b) | 25-49 | Sprout |
| Good | Green (#10b981) | 50-74 | Growing |
| Excellent | Emerald (#059669) | 75-100 | Blooming |

### Typography
- Follows macOS design principles
- System font stack with clean hierarchy
- Consistent spacing (Tailwind v4)
- Dark/light mode support

### Spacing
- Card padding: `p-6`
- Section gaps: `gap-6`
- Grid layouts: responsive (1-col mobile, 2-col desktop)

---

## 🔧 Component Props Reference

### Shared Components

#### TrustPlant
```typescript
interface TrustPlantProps {
  trustLevel: "low" | "warning" | "good" | "excellent";
  trustScore: number; // 0-100
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  animated?: boolean;
}
```

#### TrustBadge
```typescript
interface TrustBadgeProps {
  level: TrustLevel;
  label?: string;
  trend?: "up" | "down" | "stable";
  size?: "sm" | "md";
}
```

### Parent Components

#### ChildCard
```typescript
interface ChildCardProps {
  child: ChildData;
  onLockToggle: (id: string) => void;
  onPauseToggle: (id: string) => void;
  onApproveAccess: (id: string) => void;
}
```

#### ScheduleTimeline
```typescript
interface ScheduleTimelineProps {
  schedules: DaySchedule[];
}
```

#### AppControls
```typescript
interface AppControlsProps {
  apps: AppControl[];
  onToggleAllow: (id: string) => void;
  onTogglePause: (id: string) => void;
  onSetTimeLimit: (id: string, minutes: number) => void;
}
```

#### WebControls
```typescript
interface WebControlsProps {
  allowList: WebsiteRule[];
  blockList: WebsiteRule[];
  safeSearchEnabled: boolean;
  onToggleSafeSearch: () => void;
  onAddRule: (domain: string, isAllowed: boolean) => void;
  onRemoveRule: (id: string) => void;
}
```

#### AlertsList
```typescript
interface AlertsListProps {
  alerts: Alert[];
  onMarkRead: (id: string) => void;
  onDismiss: (id: string) => void;
}
```

### Kid Components

#### KidTrustPlant
```typescript
interface KidTrustPlantProps {
  trustLevel: TrustLevel;
  trustScore: number;
  privileges: Privilege[];
}
```

#### RemainingTime
```typescript
interface RemainingTimeProps {
  remainingMinutes: number;
  dailyLimit: number;
  nextBreak?: {
    type: "bedtime" | "downtime";
    startsIn: number;
  };
}
```

#### LockScreen
```typescript
interface LockScreenProps {
  reason: string;
  lockUntil?: Date;
  allowEmergency?: boolean;
  onEmergencyAccess?: () => void;
}
```

---

## 🔌 Backend Integration Points

All components are **UI-only** with placeholder handlers. To connect to a backend:

### 1. Replace Mock Data
- File: `/src/app/data/mockData.ts`
- Replace with API calls using fetch/axios

### 2. Update Event Handlers
Example in `ParentDashboard.tsx`:
```typescript
// Current (placeholder)
const handleLockToggle = (id: string) => {
  console.log("Toggle lock for child:", id);
};

// Production (with API)
const handleLockToggle = async (id: string) => {
  try {
    await api.toggleChildLock(id);
    // Update state/refetch data
  } catch (error) {
    // Handle error
  }
};
```

### 3. Add State Management
Consider adding:
- React Query / SWR for data fetching
- Zustand / Redux for global state
- WebSocket for real-time updates

---

## ✨ Features & Interactivity

### Animations (Motion)
- Trust plant grows/shrinks smoothly
- Progress bars animate on load
- Hover states on all interactive elements
- Lock screen has floating background elements

### Tooltips (Radix UI)
- Used throughout for explanatory text
- Consistent styling via theme
- Accessible keyboard navigation

### Responsive Design
- Mobile-first approach
- Grid layouts adapt: 1-col → 2-col
- Touch-friendly targets (min 44px)

### Dark Mode
- Toggle in top navigation
- CSS variables for theme tokens
- Smooth transitions

---

## 🎯 Key User Flows

### Parent Flow
1. View all children at a glance (ChildCards)
2. See schedules, alerts, and analytics
3. Quick actions: lock, pause, approve
4. Manage apps and websites
5. Review trust growth over time

### Kid Flow
1. See trust plant and current score
2. View remaining time for the day
3. Check allowed apps/websites
4. Understand how to improve trust
5. Lock screen during restricted times

---

## 🚀 Next Steps for Production

### Must-Have Features
- [ ] Real authentication (parent vs child login)
- [ ] Backend API integration
- [ ] Real-time sync across devices
- [ ] Push notifications
- [ ] Local storage for offline support

### Nice-to-Have Features
- [ ] Multi-language support
- [ ] Export reports (PDF)
- [ ] Custom plant themes
- [ ] Achievements system
- [ ] Parent-child chat

### Technical Improvements
- [ ] Add error boundaries
- [ ] Implement loading states
- [ ] Add form validation
- [ ] Write unit tests
- [ ] Add E2E tests
- [ ] Performance optimization

---

## 📚 Dependencies

### Core
- React 18.3.1
- TypeScript (via Vite)
- Tailwind CSS v4

### UI Libraries
- Radix UI (Tooltips, Tabs, Switches, etc.)
- Lucide React (Icons)
- Motion (Animations)
- Recharts (Charts/Analytics)

### Utilities
- date-fns (Date formatting)
- clsx (Class utilities)

---

## 💡 Design Principles

1. **Clarity First**: Every element has a clear purpose
2. **Trust-Centric**: Plant visualization makes trust tangible
3. **Positive Reinforcement**: Focus on growth, not punishment
4. **Transparency**: Kids see what parents see (mostly)
5. **Fail-Safe**: Lock screen protects during downtime
6. **Responsive**: Works on iPad, future Windows support
7. **Accessible**: Keyboard navigation, screen reader support

---

## 📞 Support & Questions

This is a **UI skeleton** - all interactions are placeholders.

**To customize:**
1. Modify components in `/src/app/components/`
2. Update mock data in `/src/app/data/mockData.ts`
3. Adjust theme in `/src/styles/theme.css`
4. Connect to your backend via the handler functions

**Component Props:**
- All props are TypeScript-typed
- Check interfaces at top of each component file
- Mock data shows expected data shapes
