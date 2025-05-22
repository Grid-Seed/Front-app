// src/components/ConnectionForm.tsx
import { useState } from 'react';
import './ConnectionForm.css';
import { ConnectionStatus } from '../types';

interface ConnectionFormProps {
  apiUrl: string;
  onConnect: (url: string) => Promise<void>;
  isLoading: boolean;
  connectionStatus: ConnectionStatus;
}

const ConnectionForm = ({ 
  apiUrl, 
  onConnect, 
  isLoading, 
  connectionStatus 
}: ConnectionFormProps) => {
  const [inputUrl, setInputUrl] = useState<string>(apiUrl || 'http://localhost:8000');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputUrl.trim()) {
      onConnect(inputUrl.trim());
    }
  };

  const getStatusBadgeClass = () => {
    if (connectionStatus.isConnected) {
      return 'badge-success';
    }
    return 'badge-error';
  };

  return (
    <div className="connection-form">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="api-url">BMS API URL:</label>
          <div className="input-group">
            <input
              type="url"
              id="api-url"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              placeholder="http://localhost:8000"
              required
              disabled={isLoading}
            />
            <button 
              type="submit" 
              className="btn-primary"
              disabled={isLoading}
            >
              {connectionStatus.isConnected ? 'Reconnect' : 'Connect'}
            </button>
          </div>
        </div>
      </form>
      
      <div className="connection-status">
        <span className={`badge ${getStatusBadgeClass()}`}>
          {connectionStatus.isConnected ? 'Connected' : 'Disconnected'}
        </span>
        <span className="status-message">{connectionStatus.message}</span>
      </div>
    </div>
  );
};

export default ConnectionForm;