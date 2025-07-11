import { checkHealth } from './pansouApi';
import type { ApiStatus, ApiStatusHistory, StatusPageData } from '../types/status';

const HISTORY_KEY = 'api_status_history';
const MAX_HISTORY_ITEMS = 100;

class StatusService {
  private history: ApiStatusHistory[] = [];
  private isMonitoring = false;
  private intervalId: number | null = null;

  constructor() {
    this.loadHistory();
  }

  private loadHistory(): void {
    try {
      const saved = localStorage.getItem(HISTORY_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        this.history = parsed.map((item: { timestamp: string; responseTime: number; isHealthy: boolean; error?: string }) => ({
          ...item,
          timestamp: new Date(item.timestamp)
        }));
      }
    } catch (error) {
      console.error('Failed to load status history:', error);
      this.history = [];
    }
  }

  private saveHistory(): void {
    try {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(this.history));
    } catch (error) {
      console.error('Failed to save status history:', error);
    }
  }

  private addToHistory(status: ApiStatus): void {
    const historyItem: ApiStatusHistory = {
      timestamp: new Date(),
      responseTime: status.responseTime,
      isHealthy: status.isHealthy,
      error: status.error
    };

    this.history.unshift(historyItem);
    
    // 保持历史记录数量限制
    if (this.history.length > MAX_HISTORY_ITEMS) {
      this.history = this.history.slice(0, MAX_HISTORY_ITEMS);
    }

    this.saveHistory();
  }

  async checkApiHealth(): Promise<ApiStatus> {
    const startTime = Date.now();
    
    try {
      const isHealthy = await checkHealth();
      const responseTime = Date.now() - startTime;
      
      const status: ApiStatus = {
        isHealthy,
        responseTime,
        lastChecked: new Date()
      };

      this.addToHistory(status);
      return status;
    } catch (error) {
      const responseTime = Date.now() - startTime;
      const status: ApiStatus = {
        isHealthy: false,
        responseTime,
        lastChecked: new Date(),
        error: error instanceof Error ? error.message : 'Unknown error'
      };

      this.addToHistory(status);
      return status;
    }
  }

  getStatusData(): StatusPageData {
    const currentStatus = this.history[0] ? {
      isHealthy: this.history[0].isHealthy,
      responseTime: this.history[0].responseTime,
      lastChecked: this.history[0].timestamp,
      error: this.history[0].error
    } : {
      isHealthy: false,
      responseTime: 0,
      lastChecked: new Date(),
      error: 'No status data available'
    };

    // 计算在线率（最近24小时）
    const now = new Date();
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const recentHistory = this.history.filter(item => item.timestamp > oneDayAgo);
    
    const uptime = recentHistory.length > 0 
      ? (recentHistory.filter(item => item.isHealthy).length / recentHistory.length) * 100
      : 0;

    return {
      currentStatus,
      history: this.history,
      uptime
    };
  }

  startMonitoring(intervalMs: number = 30000): void {
    if (this.isMonitoring) return;
    
    this.isMonitoring = true;
    this.intervalId = window.setInterval(() => {
      this.checkApiHealth();
    }, intervalMs);
  }

  stopMonitoring(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.isMonitoring = false;
  }

  clearHistory(): void {
    this.history = [];
    this.saveHistory();
  }
}

export const statusService = new StatusService(); 