import { useState } from "react";
import { ParentDashboard } from "./views/ParentDashboard";
import { KidView } from "./views/KidView";
import { Users, User, Settings, Moon, Sun } from "lucide-react";
import * as Tooltip from "@radix-ui/react-tooltip";

type View = "parent" | "kid";

export default function App() {
  const [currentView, setCurrentView] = useState<View>("parent");
  const [isDark, setIsDark] = useState(false);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className={`min-h-screen bg-background ${isDark ? "dark" : ""}`}>
      {/* Top Navigation Bar */}
      <nav className="sticky top-0 z-40 bg-card/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-[1400px] mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
              <span className="text-white text-xl font-bold">M</span>
            </div>
            <div>
              <h1 className="text-xl">Minute</h1>
              <p className="text-xs text-muted-foreground">Family Control</p>
            </div>
          </div>

          {/* View Switcher */}
          <div className="flex items-center gap-2 p-1 bg-muted/50 rounded-lg">
            <button
              onClick={() => setCurrentView("parent")}
              className={`px-4 py-2 rounded-md transition-all flex items-center gap-2 ${
                currentView === "parent"
                  ? "bg-card shadow-sm text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Users size={18} />
              <span className="text-sm">Parent</span>
            </button>
            <button
              onClick={() => setCurrentView("kid")}
              className={`px-4 py-2 rounded-md transition-all flex items-center gap-2 ${
                currentView === "kid"
                  ? "bg-card shadow-sm text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <User size={18} />
              <span className="text-sm">Kid</span>
            </button>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Tooltip.Provider>
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <button
                    onClick={toggleDarkMode}
                    className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
                  >
                    {isDark ? <Sun size={18} /> : <Moon size={18} />}
                  </button>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                  <Tooltip.Content
                    className="bg-popover text-popover-foreground px-3 py-2 rounded-lg text-sm shadow-lg"
                    sideOffset={5}
                  >
                    Toggle {isDark ? "Light" : "Dark"} Mode
                  </Tooltip.Content>
                </Tooltip.Portal>
              </Tooltip.Root>
            </Tooltip.Provider>

            <Tooltip.Provider>
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <button className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors">
                    <Settings size={18} />
                  </button>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                  <Tooltip.Content
                    className="bg-popover text-popover-foreground px-3 py-2 rounded-lg text-sm shadow-lg"
                    sideOffset={5}
                  >
                    Settings
                  </Tooltip.Content>
                </Tooltip.Portal>
              </Tooltip.Root>
            </Tooltip.Provider>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        {currentView === "parent" ? <ParentDashboard /> : <KidView />}
      </main>

      {/* Footer */}
      <footer className="bg-card/50 border-t border-border mt-12">
        <div className="max-w-[1400px] mx-auto px-6 py-6 text-center">
          <p className="text-sm text-muted-foreground">
            Minute - macOS Family Control App • UI/UX Skeleton Demo
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            All interactions are UI-only placeholders. Backend integration ready.
          </p>
        </div>
      </footer>
    </div>
  );
}
