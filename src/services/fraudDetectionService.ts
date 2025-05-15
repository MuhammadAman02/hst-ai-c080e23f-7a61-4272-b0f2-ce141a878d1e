import { Transaction, TransactionType, RiskLevel, AlertStatus, FraudMetrics } from "@/types/transaction";

// Mock data for demonstration purposes
const mockTransactions: Transaction[] = [
  {
    id: "tx-001",
    memberId: "m-1001",
    memberName: "Sean O'Connor",
    accountNumber: "1001-2345",
    amount: 5000,
    type: TransactionType.DEPOSIT,
    timestamp: new Date(Date.now() - 15 * 60000).toISOString(), // 15 minutes ago
    description: "Cash deposit",
    location: "Dublin Branch",
    deviceId: "ATM-001",
    ipAddress: null,
    riskScore: 0.82,
    riskLevel: RiskLevel.HIGH,
    alertStatus: AlertStatus.NEW,
    flaggedReason: ["Unusual large deposit", "Multiple deposits in short time"]
  },
  {
    id: "tx-002",
    memberId: "m-1002",
    memberName: "Mary Ryan",
    accountNumber: "1002-3456",
    amount: 1200,
    type: TransactionType.WITHDRAWAL,
    timestamp: new Date(Date.now() - 45 * 60000).toISOString(), // 45 minutes ago
    description: "ATM withdrawal",
    location: "Cork Branch",
    deviceId: "ATM-002",
    ipAddress: null,
    riskScore: 0.35,
    riskLevel: RiskLevel.MEDIUM,
    alertStatus: AlertStatus.REVIEWING,
    flaggedReason: ["Withdrawal location differs from usual pattern"]
  },
  {
    id: "tx-003",
    memberId: "m-1003",
    memberName: "Patrick Murphy",
    accountNumber: "1003-4567",
    amount: 750,
    type: TransactionType.TRANSFER,
    timestamp: new Date(Date.now() - 120 * 60000).toISOString(), // 2 hours ago
    description: "Online transfer to external account",
    location: "Online",
    deviceId: null,
    ipAddress: "192.168.1.1",
    riskScore: 0.15,
    riskLevel: RiskLevel.LOW,
    alertStatus: null,
    flaggedReason: []
  },
  {
    id: "tx-004",
    memberId: "m-1004",
    memberName: "Siobhan Kelly",
    accountNumber: "1004-5678",
    amount: 2500,
    type: TransactionType.LOAN_PAYMENT,
    timestamp: new Date(Date.now() - 180 * 60000).toISOString(), // 3 hours ago
    description: "Loan payment",
    location: "Galway Branch",
    deviceId: null,
    ipAddress: null,
    riskScore: 0.05,
    riskLevel: RiskLevel.LOW,
    alertStatus: null,
    flaggedReason: []
  },
  {
    id: "tx-005",
    memberId: "m-1005",
    memberName: "Liam Byrne",
    accountNumber: "1005-6789",
    amount: 3000,
    type: TransactionType.WITHDRAWAL,
    timestamp: new Date(Date.now() - 240 * 60000).toISOString(), // 4 hours ago
    description: "Counter withdrawal",
    location: "Limerick Branch",
    deviceId: null,
    ipAddress: null,
    riskScore: 0.65,
    riskLevel: RiskLevel.MEDIUM,
    alertStatus: AlertStatus.NEW,
    flaggedReason: ["Unusual withdrawal amount", "Account opened recently"]
  },
  {
    id: "tx-006",
    memberId: "m-1006",
    memberName: "Aoife Walsh",
    accountNumber: "1006-7890",
    amount: 10000,
    type: TransactionType.LOAN_DISBURSEMENT,
    timestamp: new Date(Date.now() - 300 * 60000).toISOString(), // 5 hours ago
    description: "Loan disbursement",
    location: "Waterford Branch",
    deviceId: null,
    ipAddress: null,
    riskScore: 0.12,
    riskLevel: RiskLevel.LOW,
    alertStatus: null,
    flaggedReason: []
  },
  {
    id: "tx-007",
    memberId: "m-1007",
    memberName: "Conor Doyle",
    accountNumber: "1007-8901",
    amount: 4500,
    type: TransactionType.TRANSFER,
    timestamp: new Date(Date.now() - 360 * 60000).toISOString(), // 6 hours ago
    description: "Online transfer to new beneficiary",
    location: "Online",
    deviceId: null,
    ipAddress: "192.168.1.2",
    riskScore: 0.78,
    riskLevel: RiskLevel.HIGH,
    alertStatus: AlertStatus.REVIEWING,
    flaggedReason: ["New beneficiary", "Unusual transfer amount", "Multiple transfers in short time"]
  },
  {
    id: "tx-008",
    memberId: "m-1008",
    memberName: "Niamh McCarthy",
    accountNumber: "1008-9012",
    amount: 50,
    type: TransactionType.FEE,
    timestamp: new Date(Date.now() - 420 * 60000).toISOString(), // 7 hours ago
    description: "Overdraft fee",
    location: null,
    deviceId: null,
    ipAddress: null,
    riskScore: 0.02,
    riskLevel: RiskLevel.LOW,
    alertStatus: null,
    flaggedReason: []
  },
  {
    id: "tx-009",
    memberId: "m-1009",
    memberName: "Eoin Fitzgerald",
    accountNumber: "1009-0123",
    amount: 1800,
    type: TransactionType.WITHDRAWAL,
    timestamp: new Date(Date.now() - 480 * 60000).toISOString(), // 8 hours ago
    description: "ATM withdrawal",
    location: "Dublin Airport",
    deviceId: "ATM-003",
    ipAddress: null,
    riskScore: 0.45,
    riskLevel: RiskLevel.MEDIUM,
    alertStatus: AlertStatus.NEW,
    flaggedReason: ["Unusual location", "Multiple withdrawals in short time"]
  },
  {
    id: "tx-010",
    memberId: "m-1010",
    memberName: "Ciara O'Sullivan",
    accountNumber: "1010-1234",
    amount: 7500,
    type: TransactionType.DEPOSIT,
    timestamp: new Date(Date.now() - 540 * 60000).toISOString(), // 9 hours ago
    description: "Check deposit",
    location: "Cork Branch",
    deviceId: null,
    ipAddress: null,
    riskScore: 0.72,
    riskLevel: RiskLevel.HIGH,
    alertStatus: AlertStatus.RESOLVED_LEGITIMATE,
    flaggedReason: ["Large check deposit", "Account has recent suspicious activity"]
  }
];

// Calculate fraud metrics based on transactions
const calculateFraudMetrics = (): FraudMetrics => {
  const highRiskCount = mockTransactions.filter(t => t.riskLevel === RiskLevel.HIGH).length;
  const mediumRiskCount = mockTransactions.filter(t => t.riskLevel === RiskLevel.MEDIUM).length;
  const lowRiskCount = mockTransactions.filter(t => t.riskLevel === RiskLevel.LOW).length;
  const alertsToReview = mockTransactions.filter(t => 
    t.alertStatus === AlertStatus.NEW || t.alertStatus === AlertStatus.REVIEWING
  ).length;
  
  // For demo purposes, assume 2 fraudulent transactions today
  const fraudulentTransactionsToday = 2;
  
  // Calculate average transaction amount
  const totalAmount = mockTransactions.reduce((sum, t) => sum + t.amount, 0);
  const averageAmount = totalAmount / mockTransactions.length;
  
  return {
    totalTransactions: mockTransactions.length,
    highRiskCount,
    mediumRiskCount,
    lowRiskCount,
    alertsToReview,
    fraudulentTransactionsToday,
    fraudRatePercentage: (fraudulentTransactionsToday / mockTransactions.length) * 100,
    averageTransactionAmount: averageAmount
  };
};

// Service functions
export const fraudDetectionService = {
  // Get all transactions
  getAllTransactions: (): Transaction[] => {
    return [...mockTransactions].sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  },
  
  // Get high risk transactions
  getHighRiskTransactions: (): Transaction[] => {
    return mockTransactions
      .filter(t => t.riskLevel === RiskLevel.HIGH)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  },
  
  // Get transactions that need review
  getTransactionsForReview: (): Transaction[] => {
    return mockTransactions
      .filter(t => t.alertStatus === AlertStatus.NEW || t.alertStatus === AlertStatus.REVIEWING)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  },
  
  // Get transaction by ID
  getTransactionById: (id: string): Transaction | undefined => {
    return mockTransactions.find(t => t.id === id);
  },
  
  // Update transaction alert status
  updateAlertStatus: (id: string, status: AlertStatus): Transaction | undefined => {
    const transaction = mockTransactions.find(t => t.id === id);
    if (transaction) {
      transaction.alertStatus = status;
    }
    return transaction;
  },
  
  // Get fraud metrics
  getFraudMetrics: (): FraudMetrics => {
    return calculateFraudMetrics();
  }
};