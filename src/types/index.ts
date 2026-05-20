export interface YearlyFinancialData {
  fiscalYear: string;
  revenue: number | null;
  netIncome: number | null;
  grossProfit: number | null;
  operatingIncome: number | null;
  eps: number | null;
  grossMargin: number | null;
  operatingMargin: number | null;
  netMargin: number | null;
  totalAssets: number | null;
  totalLiabilities: number | null;
  cashFlow: number | null;
  workingCapital: number | null;
  inventory: number | null;
  accountsReceivable: number | null;
  peRatio: number | null;
  psRatio: number | null;
  pbRatio: number | null;
  revenueGrowth: number | null;
  netIncomeGrowth: number | null;
  marketShare: number | null;
  rdExpenses: number | null;
  marketingExpenses: number | null;
}

export interface FinancialData {
  companyName: string;
  ticker: string;
  currency: string;
  yearlyData: YearlyFinancialData[];
}

export interface StrategyInsight {
  companyName: string;
  keyInitiatives: string[];
  marketPosition: string;
  competitiveAdvantages: string[];
  futureOutlook: string;
  risks: string[];
  productCategories: string[];
  keyMarkets: string[];
  brandPortfolio: string[];
}

export interface CompetitorAnalysis {
  companyName: string;
  ticker: string;
  financialData: FinancialData;
  strategy: StrategyInsight;
}

export interface ComparisonMetrics {
  companyName: string;
  ticker: string;
  latestYear: YearlyFinancialData;
}

export interface AnalysisReport {
  competitors: CompetitorAnalysis[];
  generatedAt: string;
  summary: string;
}
