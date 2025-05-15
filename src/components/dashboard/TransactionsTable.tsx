import { useState } from "react";
import { Transaction, RiskLevel, AlertStatus, TransactionType } from "@/types/transaction";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  XCircle, 
  Eye, 
  ArrowUpRight, 
  ArrowDownLeft, 
  ArrowLeftRight,
  CreditCard
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface TransactionsTableProps {
  transactions: Transaction[];
  onUpdateStatus?: (id: string, status: AlertStatus) => void;
  title: string;
}

export function TransactionsTable({ transactions, onUpdateStatus, title }: TransactionsTableProps) {
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleViewDetails = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsDialogOpen(true);
  };

  const handleUpdateStatus = (id: string, status: AlertStatus) => {
    if (onUpdateStatus) {
      onUpdateStatus(id, status);
      setIsDialogOpen(false);
    }
  };

  const getRiskBadge = (riskLevel: RiskLevel) => {
    switch (riskLevel) {
      case RiskLevel.HIGH:
        return <Badge variant="destructive" className="flex items-center gap-1"><AlertTriangle className="h-3 w-3" /> High Risk</Badge>;
      case RiskLevel.MEDIUM:
        return <Badge variant="outline" className="bg-alert-amber text-white border-alert-amber flex items-center gap-1"><Clock className="h-3 w-3" /> Medium Risk</Badge>;
      case RiskLevel.LOW:
        return <Badge variant="outline" className="bg-alert-green text-white border-alert-green flex items-center gap-1"><CheckCircle className="h-3 w-3" /> Low Risk</Badge>;
    }
  };

  const getAlertStatusBadge = (status: AlertStatus | undefined) => {
    if (!status) return null;
    
    switch (status) {
      case AlertStatus.NEW:
        return <Badge variant="outline" className="bg-alert-red text-white border-alert-red">New Alert</Badge>;
      case AlertStatus.REVIEWING:
        return <Badge variant="outline" className="bg-alert-amber text-white border-alert-amber">Reviewing</Badge>;
      case AlertStatus.RESOLVED_LEGITIMATE:
        return <Badge variant="outline" className="bg-alert-green text-white border-alert-green">Legitimate</Badge>;
      case AlertStatus.RESOLVED_FRAUDULENT:
        return <Badge variant="outline" className="bg-destructive text-white">Fraudulent</Badge>;
      case AlertStatus.CLOSED:
        return <Badge variant="outline">Closed</Badge>;
    }
  };

  const getTransactionTypeIcon = (type: TransactionType) => {
    switch (type) {
      case TransactionType.DEPOSIT:
        return <ArrowDownLeft className="h-4 w-4 text-alert-green" />;
      case TransactionType.WITHDRAWAL:
        return <ArrowUpRight className="h-4 w-4 text-alert-red" />;
      case TransactionType.TRANSFER:
        return <ArrowLeftRight className="h-4 w-4 text-irish-blue" />;
      case TransactionType.LOAN_PAYMENT:
      case TransactionType.LOAN_DISBURSEMENT:
      case TransactionType.FEE:
      case TransactionType.INTEREST:
        return <CreditCard className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <>
      <div className="rounded-md border">
        <div className="bg-muted/50 p-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">{title}</h2>
          <span className="text-sm text-muted-foreground">{transactions.length} transactions</span>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Member</TableHead>
              <TableHead>Transaction</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Risk</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                  No transactions found
                </TableCell>
              </TableRow>
            ) : (
              transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium">
                    <div className="flex flex-col">
                      <span>{transaction.memberName}</span>
                      <span className="text-xs text-muted-foreground">{transaction.accountNumber}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getTransactionTypeIcon(transaction.type)}
                      <span className="capitalize">{transaction.type.replace('_', ' ')}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">€{transaction.amount.toLocaleString()}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {formatDistanceToNow(new Date(transaction.timestamp), { addSuffix: true })}
                  </TableCell>
                  <TableCell>{getRiskBadge(transaction.riskLevel)}</TableCell>
                  <TableCell>{getAlertStatusBadge(transaction.alertStatus)}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" onClick={() => handleViewDetails(transaction)}>
                      <Eye className="h-4 w-4 mr-1" /> View
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Transaction Details Dialog */}
      {selectedTransaction && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Transaction Details</DialogTitle>
              <DialogDescription>
                Review transaction information and update alert status
              </DialogDescription>
            </DialogHeader>
            
            <Tabs defaultValue="details">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="risk">Risk Analysis</TabsTrigger>
                <TabsTrigger value="actions">Actions</TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-muted-foreground">Transaction Info</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <span className="font-medium">ID:</span>
                      <span>{selectedTransaction.id}</span>
                      <span className="font-medium">Type:</span>
                      <span className="capitalize">{selectedTransaction.type.replace('_', ' ')}</span>
                      <span className="font-medium">Amount:</span>
                      <span>€{selectedTransaction.amount.toLocaleString()}</span>
                      <span className="font-medium">Date/Time:</span>
                      <span>{new Date(selectedTransaction.timestamp).toLocaleString()}</span>
                      <span className="font-medium">Description:</span>
                      <span>{selectedTransaction.description}</span>
                      <span className="font-medium">Location:</span>
                      <span>{selectedTransaction.location || 'N/A'}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-muted-foreground">Member Info</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <span className="font-medium">Member ID:</span>
                      <span>{selectedTransaction.memberId}</span>
                      <span className="font-medium">Name:</span>
                      <span>{selectedTransaction.memberName}</span>
                      <span className="font-medium">Account:</span>
                      <span>{selectedTransaction.accountNumber}</span>
                      <span className="font-medium">Device ID:</span>
                      <span>{selectedTransaction.deviceId || 'N/A'}</span>
                      <span className="font-medium">IP Address:</span>
                      <span>{selectedTransaction.ipAddress || 'N/A'}</span>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="risk" className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium">Risk Score: {(selectedTransaction.riskScore * 100).toFixed(0)}%</h3>
                    <p className="text-sm text-muted-foreground">
                      {selectedTransaction.riskLevel === RiskLevel.HIGH 
                        ? 'This transaction has a high risk of fraud' 
                        : selectedTransaction.riskLevel === RiskLevel.MEDIUM
                          ? 'This transaction has some suspicious characteristics'
                          : 'This transaction appears to be legitimate'}
                    </p>
                  </div>
                  <div>
                    {getRiskBadge(selectedTransaction.riskLevel)}
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-sm font-medium mb-2">Risk Factors:</h3>
                  <ScrollArea className="h-[100px] rounded-md border p-2">
                    {selectedTransaction.flaggedReason && selectedTransaction.flaggedReason.length > 0 ? (
                      <ul className="list-disc pl-5 space-y-1">
                        {selectedTransaction.flaggedReason.map((reason, index) => (
                          <li key={index} className="text-sm">{reason}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-muted-foreground">No specific risk factors identified</p>
                    )}
                  </ScrollArea>
                </div>
              </TabsContent>
              
              <TabsContent value="actions" className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Current Status:</h3>
                  <div className="flex items-center space-x-2">
                    {getAlertStatusBadge(selectedTransaction.alertStatus) || <span className="text-muted-foreground">No alert</span>}
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Update Status:</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <Button 
                      variant="outline" 
                      className="border-alert-amber text-alert-amber hover:bg-alert-amber/10"
                      onClick={() => handleUpdateStatus(selectedTransaction.id, AlertStatus.REVIEWING)}
                    >
                      <Clock className="h-4 w-4 mr-2" />
                      Mark as Reviewing
                    </Button>
                    <Button 
                      variant="outline" 
                      className="border-alert-green text-alert-green hover:bg-alert-green/10"
                      onClick={() => handleUpdateStatus(selectedTransaction.id, AlertStatus.RESOLVED_LEGITIMATE)}
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Mark as Legitimate
                    </Button>
                    <Button 
                      variant="outline" 
                      className="border-alert-red text-alert-red hover:bg-alert-red/10"
                      onClick={() => handleUpdateStatus(selectedTransaction.id, AlertStatus.RESOLVED_FRAUDULENT)}
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Mark as Fraudulent
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => handleUpdateStatus(selectedTransaction.id, AlertStatus.CLOSED)}
                    >
                      Close Alert
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}