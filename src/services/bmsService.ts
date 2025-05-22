// src/services/bmsService.ts
import { BMSData } from '../types';

class BMSService {
  private baseUrl: string | null = null;

  public setBaseUrl(url: string): void {
    // Ensure URL doesn't end with a slash
    this.baseUrl = url.endsWith('/') ? url.slice(0, -1) : url;
  }

  public getBaseUrl(): string | null {
    return this.baseUrl;
  }

  public async checkConnection(): Promise<boolean> {
    if (!this.baseUrl) {
      throw new Error('API URL not set');
    }

    try {
      const response = await fetch(`${this.baseUrl}/status`);
      
      if (!response.ok) {
        throw new Error('Failed to connect to BMS API');
      }
      
      const data = await response.json();
      return data.bms_connected === true;
    } catch (error) {
      console.error('Connection check failed:', error);
      throw error;
    }
  }

  public async fetchBMSData(forceRefresh: boolean = false): Promise<BMSData> {
    if (!this.baseUrl) {
      throw new Error('API URL not set');
    }

    try {
      const endpoint = forceRefresh ? '/data/refresh' : '/data';
      const response = await fetch(`${this.baseUrl}${endpoint}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch BMS data');
      }
      
      const data = await response.json();
      return data as BMSData;
    } catch (error) {
      console.error('Data fetch failed:', error);
      throw error;
    }
  }
}

// Singleton instance
export const bmsService = new BMSService();