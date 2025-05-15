import { Button } from "@/components/ui/button";
import { Bell, RefreshCw } from "lucide-react";
import { FraudMetrics } from "@/types/transaction";

interface DashboardHeaderProps {
  metrics: FraudMetrics;
  onRefresh: () => void;
}

export function DashboardHeader({ metrics, onRefresh }: DashboardHeaderProps) {
  return (
    <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 mb-6">
      <div>
        <h1 className="text-2xl font-bold text-irish-blue">Fraud Detection Dashboard</h1>
        <p className="text-muted-foreground">
          Monitor and manage potential fraudulent activities
        </p>
      </div>
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="sm" className="relative" onClick={() => {}}>
          <Bell className="h-4 w-4 mr-2" />
          Alerts
          {metrics.alertsToReview > 0 && (
            <span className="absolute -top-1 -right-1 bg-alert-red text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse-alert">
              {metrics.alertsToReview}
            </span>
          )}
        </Button>
        <Button variant="default" size="sm" onClick={onRefresh}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>
    </div>
  );
}