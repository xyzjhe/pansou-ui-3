export interface ApiStatus {
  isHealthy: boolean;
  responseTime: number;
  lastChecked: Date;
  error?: string;
}

export interface ApiStatusHistory {
  timestamp: Date;
  responseTime: number;
  isHealthy: boolean;
  error?: string;
}

export interface StatusPageData {
  currentStatus: ApiStatus;
  history: ApiStatusHistory[];
  uptime: number; // 百分比
} 