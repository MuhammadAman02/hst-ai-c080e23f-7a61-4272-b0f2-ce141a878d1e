import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { DashboardHeader } from "./DashboardHeader";
import { MetricsCards } from "./MetricsCards";
import { TransactionsTable } from "./TransactionsTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FraudMetrics, Transaction, AlertStatus } from "@/types/transaction";
import { fraudDetectionService } from "@/services/fraudDetectionService";

export function FraudDashboard() {
  const { toast } = useToast();
  const [metrics, setMetrics] = useState<FraudMetrics | null>(null);
  const [allTransactions, setAllTransactions] = useState<Transaction[]>([]);
  const [highRiskTransactions, setHighRiskTransactions] = useState<Transaction[]>([]);
  const [alertTransactions, setAlertTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadData = () => {
    setIsLoading(true);
    try {
      // In a real app, these would be API calls
      const metricsData = fraudDetectionService.getFraudMetrics();
      const transactions = fraudDetectionService.getAllTransactions();
      const highRisk = fraudDetectionService.getHighRiskTransactions();
      const alerts = fraudDetectionService.getTransactionsForReview();
      
      setMetrics(metricsData);
      setAllTransactions(transactions);
      setHighRiskTransactions(highRisk);
      setAlertTransactions(alerts);
    } catch (error) {
      console.error("Error loading data:", error);
      toast({
        title: "Error",
        description: "Failed to load dashboard data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleRefresh = () => {
    loadData();
    toast({
      title: "Dashboard Refreshed",
      description: "The dashboard data has been updated.",
    });
  };

  const handleUpdateStatus = (id: string, status: AlertStatus) => {
    try {
      // In a real app, this would be an API call
      const updatedTransaction = fraudDetectionService.updateAlertStatus(id, status);
      
      if (updatedTransaction) {
        // Refresh data after update
        loadData();
        
        toast({
          title: "Status Updated",
          description: `Transaction ${id} has been marked as ${status.replace('_', ' ')}.`,
        });
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast({
        title: "Error",
        description: "Failed to update transaction status. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isLoading || !metrics) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6">
      <DashboardHeader metrics={metrics} onRefresh={handleRefresh} />
      
      <MetricsCards metrics={metrics} />
      
      <Tabs defaultValue="alerts" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="alerts">Alerts ({alertTransactions.length})</TabsTrigger>
          <TabsTrigger value="high-risk">High Risk ({highRiskTransactions.length})</TabsTrigger>
          <TabsTrigger value="all">All Transactions ({allTransactions.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="alerts">
          <TransactionsTable 
            transactions={alertTransactions} 
            onUpdateStatus={handleUpdateStatus}
            title="Transactions Requiring Review" 
          />
        </TabsContent>
        
        <TabsContent value="high-risk">
          <TransactionsTable 
            transactions={highRiskTransactions}
            onUpdateStatus={handleUpdateStatus}
            title="High Risk Transactions" 
          />
        </TabsContent>
        
        <TabsContent value="all">
          <TransactionsTable 
            transactions={allTransactions}
            onUpdateStatus={handleUpdateStatus}
            title="All Transactions" 
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}