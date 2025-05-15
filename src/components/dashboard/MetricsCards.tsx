import { FraudMetrics } from "@/types/transaction";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, AlertTriangle, CreditCard, DollarSign, BarChart3 } from "lucide-react";

interface MetricsCardsProps {
  metrics: FraudMetrics;
}

export function MetricsCards({ metrics }: MetricsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardContent className="p-4 flex flex-col">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">High Risk Transactions</span>
            <AlertTriangle className="h-4 w-4 text-alert-red" />
          </div>
          <div className="mt-2">
            <span className="text-2xl font-bold">{metrics.highRiskCount}</span>
            <div className="flex items-center mt-1 text-xs">
              <ArrowUpRight className="h-3 w-3 text-alert-red mr-1" />
              <span className="text-alert-red">+12% from yesterday</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 flex flex-col">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Alerts to Review</span>
            <Bell className="h-4 w-4 text-alert-amber" />
          </div>
          <div className="mt-2">
            <span className="text-2xl font-bold">{metrics.alertsToReview}</span>
            <div className="flex items-center mt-1 text-xs">
              <ArrowUpRight className="h-3 w-3 text-alert-amber mr-1" />
              <span className="text-alert-amber">+3 new alerts</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 flex flex-col">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Fraud Rate</span>
            <BarChart3 className="h-4 w-4 text-irish-blue" />
          </div>
          <div className="mt-2">
            <span className="text-2xl font-bold">{metrics.fraudRatePercentage.toFixed(2)}%</span>
            <div className="flex items-center mt-1 text-xs">
              <ArrowDownRight className="h-3 w-3 text-alert-green mr-1" />
              <span className="text-alert-green">-0.5% from last week</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 flex flex-col">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Avg. Transaction</span>
            <DollarSign className="h-4 w-4 text-irish-green" />
          </div>
          <div className="mt-2">
            <span className="text-2xl font-bold">€{metrics.averageTransactionAmount.toFixed(2)}</span>
            <div className="flex items-center mt-1 text-xs">
              <ArrowUpRight className="h-3 w-3 text-muted-foreground mr-1" />
              <span className="text-muted-foreground">+€120 from last month</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Missing import
import { Bell } from "lucide-react";