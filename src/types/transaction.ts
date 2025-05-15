export enum TransactionType {
  DEPOSIT = "deposit",
  WITHDRAWAL = "withdrawal",
  TRANSFER = "transfer",
  LOAN_PAYMENT = "loan_payment",
  LOAN_DISBURSEMENT = "loan_disbursement",
  FEE = "fee",
  INTEREST = "interest"
}

export enum RiskLevel {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high"
}

export enum AlertStatus {
  NEW = "new",
  REVIEWING = "reviewing",
  RESOLVED_LEGITIMATE = "resolved_legitimate",
  RESOLVED_FRAUDULENT = "resolved_fraudulent",
  CLOSED = "closed"
}

export interface Transaction {
  id: string;
  memberId: string;
  memberName: string;
  accountNumber: string;
  amount: number;
  type: TransactionType;
  timestamp: string;
  description: string;
  location?: string;
  deviceId?: string;
  ipAddress?: string;
  riskScore: number;
  riskLevel: RiskLevel;
  alertStatus?: AlertStatus;
  flaggedReason?: string[];
}

export interface FraudMetrics {
  totalTransactions: number;
  highRiskCount: number;
  mediumRiskCount: number;
  lowRiskCount: number;
  alertsToReview: number;
  fraudulentTransactionsToday: number;
  fraudRatePercentage: number;
  averageTransactionAmount: number;
}