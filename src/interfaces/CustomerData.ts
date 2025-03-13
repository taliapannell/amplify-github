export interface ProviderInfo {
  provider_id: string;
  provider_name: string;
  provider_type: string;
  electrical_service: string;
  gas_service: string;
  provider_status: string;
  active_customer_count: string;
}

export interface BillingInfo {
  billing_id: string;
  transaction_id: string;
  bill_amount: string;
  bill_status: string;
  bill_usage_transaction_id: string;
  bill_issue_date: string;
  bill_due_date: string;
}

export interface Transaction {
  transaction_id: string;
  transaction_received_date: string;
  transaction_type: string;
  transaction_direction: string;
  change_type: string;
  current_value: string;
  future_value: string;
  effective_date: string;
  transaction_status: string;
  provider_id: string;
  provider_info: ProviderInfo;
  billing_info?: BillingInfo;
}

export interface Customer {
  customer_id: string;
  customer_name: string;
  customer_borough: string;
  trip_number: string;
  service_type: string;
  bill_option: string;
  last_bill_date: string;
  next_bill_date: string;
  cycle_read_data: string;
  last_cycle_read_data: string;
  provider_id: string;
  transactions: Transaction[];
}

export interface TransactionProcessedData {
  id: string;
  receivedDate: string;
  type: string;
  direction: string;
  effectiveDate: string;
  providerId: string;
  providerName: string;
  providerType: string;
  service: string;
  providerStatus: string;
  status: string;
}

export interface CustomerProcessedData {
  customerId: string;
  customerName: string;
  borough: string;
  lastBillDate: string;
  nextBillDate: string;
  serviceType: string;
  cycleReadDate: string;
  lastCycleReadDate: string;
  billOption: string;
  
  // value coming from Transaction > ProviderInfo > provider_name
  provider?: string;
  // value coming from Transaction > BillingInfo > bill_status
  billStatus?: string;

  transactions?: TransactionProcessedData[]
}

export interface ChartData {
  id: number;
  value: number;
  label: string;
}

export interface CustomerData {
  customers: Customer[];
  pie_chart_data: ChartData[];
  bar_chart_data: ChartData[];
}