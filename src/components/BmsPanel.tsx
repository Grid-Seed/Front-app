// src/components/BmsPanel.tsx
import { useState, useEffect } from 'react';
import './BmsPanel.css';
import { bmsService } from '../services/bmsService';
import { BMSData, ConnectionStatus } from '../types';
import ConnectionForm from './ConnectionForm';
import DataDisplay from './DataDisplay';

const BmsPanel = () => {
  const [apiUrl, setApiUrl] = useState<string>(() => {
    return localStorage.getItem('bmsApiUrl') || '';
  });
  
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>({
    isConnected: false,
    message: 'Not connected',
    lastUpdated: null
  });
  
  const [bmsData, setBmsData] = useState<BMSData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [autoRefresh, setAutoRefresh] = useState<boolean>(false);
  const [refreshInterval, setRefreshInterval] = useState<number>(5); // seconds

  // Connect to BMS API
  const handleConnect = async (url: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      bmsService.setBaseUrl(url);
      const isConnected = await bmsService.checkConnection();
      
      if (isConnected) {
        setConnectionStatus({
          isConnected: true,
          message: 'Connected successfully',
          lastUpdated: Date.now()
        });
        
        // Save URL to localStorage
        localStorage.setItem('bmsApiUrl', url);
        setApiUrl(url);
        
        // Fetch initial data
        await fetchData(true);
      } else {
        setConnectionStatus({
          isConnected: false,
          message: 'BMS is not connected to the API server',
          lastUpdated: null
        });
      }
    } catch (err) {
      setConnectionStatus({
        isConnected: false,
        message: err instanceof Error ? err.message : 'Unknown error',
        lastUpdated: null
      });
      setError(err instanceof Error ? err.message : 'Failed to connect');
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch BMS data
  const fetchData = async (forceRefresh: boolean = false) => {
    if (!connectionStatus.isConnected) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await bmsService.fetchBMSData(forceRefresh);
      setBmsData(data);
      setConnectionStatus({
        ...connectionStatus,
        lastUpdated: Date.now()
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
      if (err instanceof Error && err.message.includes('API URL not set')) {
        setConnectionStatus({
          isConnected: false,
          message: 'Connection lost',
          lastUpdated: null
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Handle auto-refresh toggle
  const toggleAutoRefresh = () => {
    setAutoRefresh(!autoRefresh);
  };

  // Update refresh interval
  const handleIntervalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setRefreshInterval(value);
    }
  };

  // Set up auto-refresh effect
  useEffect(() => {
    let intervalId: number | undefined;
    
    if (autoRefresh && connectionStatus.isConnected) {
      intervalId = window.setInterval(() => {
        fetchData(false);
      }, refreshInterval * 1000);
    }
    
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [autoRefresh, refreshInterval, connectionStatus.isConnected]);

  // Try to connect with stored URL on component mount
  useEffect(() => {
    const storedUrl = localStorage.getItem('bmsApiUrl');
    if (storedUrl) {
      handleConnect(storedUrl);
    }
  }, []);

  return (
    <div className="bms-panel">
      <div className="card connection-card">
        <h2 className="card-title">BMS Connection</h2>
        
        <ConnectionForm 
          apiUrl={apiUrl} 
          onConnect={handleConnect}
          isLoading={isLoading}
          connectionStatus={connectionStatus}
        />
        
        {error && <div className="error-message">{error}</div>}
      </div>

      {connectionStatus.isConnected && (
        <div className="card data-card">
          <div className="data-header">
            <h2 className="card-title">BMS Data</h2>
            
            <div className="refresh-controls">
              <div className="auto-refresh-toggle">
                <input
                  type="checkbox"
                  id="auto-refresh"
                  checked={autoRefresh}
                  onChange={toggleAutoRefresh}
                />
                <label htmlFor="auto-refresh">Auto-refresh</label>
              </div>
              
              {autoRefresh && (
                <div className="refresh-interval">
                  <label htmlFor="refresh-interval">Interval (s):</label>
                  <input
                    type="number"
                    id="refresh-interval"
                    min="1"
                    value={refreshInterval}
                    onChange={handleIntervalChange}
                  />
                </div>
              )}
              
              <button 
                className="btn-primary refresh-button" 
                onClick={() => fetchData(true)}
                disabled={isLoading}
              >
                {isLoading ? 'Refreshing...' : 'Refresh Now'}
              </button>
            </div>
          </div>
          
          {bmsData ? (
            <DataDisplay data={bmsData} />
          ) : (
            <div className="loading-placeholder">
              {isLoading ? 'Loading data...' : 'No data available'}
            </div>
          )}
          
          {connectionStatus.lastUpdated && (
            <div className="last-updated">
              Last updated: {new Date(connectionStatus.lastUpdated).toLocaleTimeString()}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BmsPanel;