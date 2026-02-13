import { Globe, Shield, Plus, X } from "lucide-react";
import * as Switch from "@radix-ui/react-switch";
import { useState } from "react";

export interface WebsiteRule {
  id: string;
  domain: string;
  isAllowed: boolean;
  category?: string;
}

interface WebControlsProps {
  allowList: WebsiteRule[];
  blockList: WebsiteRule[];
  safeSearchEnabled: boolean;
  onToggleSafeSearch: () => void;
  onAddRule: (domain: string, isAllowed: boolean) => void;
  onRemoveRule: (id: string) => void;
}

export function WebControls({
  allowList,
  blockList,
  safeSearchEnabled,
  onToggleSafeSearch,
  onAddRule,
  onRemoveRule,
}: WebControlsProps) {
  const [activeTab, setActiveTab] = useState<"allowed" | "blocked">("allowed");
  const [newDomain, setNewDomain] = useState("");

  const handleAddDomain = () => {
    if (newDomain.trim()) {
      onAddRule(newDomain.trim(), activeTab === "allowed");
      setNewDomain("");
    }
  };

  const currentList = activeTab === "allowed" ? allowList : blockList;

  return (
    <div className="bg-card border border-border rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2>Web Controls</h2>
        <div className="flex items-center gap-2">
          <Shield size={16} className="text-muted-foreground" />
          <span className="text-sm text-muted-foreground">SafeSearch</span>
          <Switch.Root
            checked={safeSearchEnabled}
            onCheckedChange={onToggleSafeSearch}
            className="w-11 h-6 bg-muted rounded-full relative data-[state=checked]:bg-green-500 transition-colors"
          >
            <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[22px] shadow-sm" />
          </Switch.Root>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setActiveTab("allowed")}
          className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
            activeTab === "allowed"
              ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
              : "bg-muted text-muted-foreground hover:bg-muted/80"
          }`}
        >
          Allowed ({allowList.length})
        </button>
        <button
          onClick={() => setActiveTab("blocked")}
          className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
            activeTab === "blocked"
              ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
              : "bg-muted text-muted-foreground hover:bg-muted/80"
          }`}
        >
          Blocked ({blockList.length})
        </button>
      </div>

      {/* Add Domain */}
      <div className="flex gap-2 mb-4">
        <div className="flex-1 relative">
          <Globe size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="example.com"
            value={newDomain}
            onChange={(e) => setNewDomain(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddDomain()}
            className="w-full pl-10 pr-4 py-2 bg-input-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <button
          onClick={handleAddDomain}
          className="px-4 py-2 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400 transition-colors flex items-center gap-2"
        >
          <Plus size={16} />
          Add
        </button>
      </div>

      {/* Domain List */}
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {currentList.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground text-sm">
            No {activeTab} websites yet
          </div>
        ) : (
          currentList.map((rule) => (
            <div
              key={rule.id}
              className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Globe size={16} className="text-muted-foreground" />
                <div>
                  <p className="text-sm">{rule.domain}</p>
                  {rule.category && (
                    <p className="text-xs text-muted-foreground">{rule.category}</p>
                  )}
                </div>
              </div>
              <button
                onClick={() => onRemoveRule(rule.id)}
                className="p-1.5 rounded-lg hover:bg-destructive/10 text-destructive transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Category Filters Info */}
      <div className="mt-6 pt-6 border-t border-border">
        <button className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400">
          Configure Category Filters
        </button>
      </div>
    </div>
  );
}
