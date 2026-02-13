import { CheckCircle2, Globe, Smartphone, Clock } from "lucide-react";
import * as Tabs from "@radix-ui/react-tabs";

interface AllowedApp {
  id: string;
  name: string;
  icon?: string;
  timeLimit?: number;
  timeRemaining?: number;
}

interface AllowedWebsite {
  id: string;
  domain: string;
  category: string;
}

interface AllowedAppsWebsitesProps {
  apps: AllowedApp[];
  websites: AllowedWebsite[];
}

export function AllowedAppsWebsites({ apps, websites }: AllowedAppsWebsitesProps) {
  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) return `${hours}h ${mins}m`;
    return `${mins}m`;
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-6">
      <h2 className="mb-6">What You Can Use</h2>

      <Tabs.Root defaultValue="apps">
        <Tabs.List className="flex gap-2 mb-6 p-1 bg-muted/50 rounded-lg">
          <Tabs.Trigger
            value="apps"
            className="flex-1 px-4 py-2 rounded-md data-[state=active]:bg-card data-[state=active]:shadow-sm transition-all text-sm flex items-center justify-center gap-2"
          >
            <Smartphone size={16} />
            Apps ({apps.length})
          </Tabs.Trigger>
          <Tabs.Trigger
            value="websites"
            className="flex-1 px-4 py-2 rounded-md data-[state=active]:bg-card data-[state=active]:shadow-sm transition-all text-sm flex items-center justify-center gap-2"
          >
            <Globe size={16} />
            Websites ({websites.length})
          </Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="apps" className="space-y-2">
          {apps.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground text-sm">
              No apps available
            </div>
          ) : (
            apps.map((app) => (
              <div
                key={app.id}
                className="flex items-center gap-4 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white flex-shrink-0">
                  {app.icon ? (
                    <img src={app.icon} alt={app.name} className="w-12 h-12 rounded-xl" />
                  ) : (
                    <span className="text-lg">{app.name[0]}</span>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="truncate">{app.name}</h4>
                  {app.timeLimit && app.timeRemaining !== undefined && (
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-green-500"
                          style={{
                            width: `${(app.timeRemaining / app.timeLimit) * 100}%`,
                          }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {formatTime(app.timeRemaining)} left
                      </span>
                    </div>
                  )}
                </div>

                <CheckCircle2 size={20} className="text-green-600 flex-shrink-0" />
              </div>
            ))
          )}
        </Tabs.Content>

        <Tabs.Content value="websites" className="space-y-2">
          {websites.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground text-sm">
              No websites available
            </div>
          ) : (
            websites.map((website) => (
              <div
                key={website.id}
                className="flex items-center gap-4 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                  <Globe size={20} className="text-blue-600 dark:text-blue-400" />
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="truncate">{website.domain}</h4>
                  <p className="text-xs text-muted-foreground">{website.category}</p>
                </div>

                <CheckCircle2 size={20} className="text-green-600 flex-shrink-0" />
              </div>
            ))
          )}
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
}
