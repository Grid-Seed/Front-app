// src/components/DataDisplay.tsx
import { BMSData } from '../types';
import './DataDisplay.css';

interface DataDisplayProps {
  data: BMSData;
}

const DataDisplay = ({ data }: DataDisplayProps) => {
  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleString();
  };

  const formatCurrent = (current: number) => {
    return current >= 0 
      ? `${current.toFixed(2)}A (Charging)` 
      : `${Math.abs(current).toFixed(2)}A (Discharging)`;
  };

  const formatVoltage = (voltage: number) => {
    return `${voltage.toFixed(2)}V`;
  };

  // Calculate min, max and average cell voltage
  const minCellVoltage = Math.min(...data.cell_voltages);
  const maxCellVoltage = Math.max(...data.cell_voltages);
  const avgCellVoltage = data.cell_voltages.reduce((sum, v) => sum + v, 0) / data.cell_voltages.length;

  // Calculate min, max and average temperature
  const minTemp = Math.min(...data.temperatures);
  const maxTemp = Math.max(...data.temperatures);
  const avgTemp = data.temperatures.reduce((sum, t) => sum + t, 0) / data.temperatures.length;

  // Check for any protection flags
  const hasProtectionActive = Object.values(data.protection_status).some(status => status === true);

  return (
    <div className="bms-data-display">
      <div className="overview-section">
        <div className="data-item large">
          <div className="data-label">State of Charge</div>
          <div className="data-value soc-value">
            <div className="soc-progress" style={{ width: `${data.soc}%` }}></div>
            <span>{data.soc}%</span>
          </div>
        </div>

        <div className="data-item">
          <div className="data-label">Pack Voltage</div>
          <div className="data-value">{formatVoltage(data.total_voltage)}</div>
        </div>

        <div className="data-item">
          <div className="data-label">Current</div>
          <div className="data-value">{formatCurrent(data.current)}</div>
        </div>

        <div className="data-item">
          <div className="data-label">Cycle Count</div>
          <div className="data-value">{data.cycles}</div>
        </div>

        <div className="data-item">
          <div className="data-label">Status</div>
          <div className="data-value">
            <span className={`badge ${hasProtectionActive ? 'badge-error' : 'badge-success'}`}>
              {hasProtectionActive ? 'Protection Active' : 'Normal'}
            </span>
          </div>
        </div>
      </div>

      <div className="detail-sections">
        <div className="detail-section">
          <h3 className="section-title">Cell Voltages</h3>
          <div className="cell-stats">
            <div className="stat-item">
              <span>Min:</span> {formatVoltage(minCellVoltage)}
            </div>
            <div className="stat-item">
              <span>Avg:</span> {formatVoltage(avgCellVoltage)}
            </div>
            <div className="stat-item">
              <span>Max:</span> {formatVoltage(maxCellVoltage)}
            </div>
            <div className="stat-item">
              <span>Diff:</span> {formatVoltage(maxCellVoltage - minCellVoltage)}
            </div>
          </div>
          <div className="cells-grid">
            {data.cell_voltages.map((voltage, index) => (
              <div key={index} className={`cell-item ${data.balancing_status[index] ? 'balancing' : ''}`}>
                <div className="cell-label">Cell {index + 1}</div>
                <div className="cell-value">{formatVoltage(voltage)}</div>
                {data.balancing_status[index] && <div className="balancing-indicator">Balancing</div>}
              </div>
            ))}
          </div>
        </div>

        <div className="detail-section">
          <h3 className="section-title">Temperatures</h3>
          <div className="cell-stats">
            <div className="stat-item">
              <span>Min:</span> {minTemp.toFixed(1)}°C
            </div>
            <div className="stat-item">
              <span>Avg:</span> {avgTemp.toFixed(1)}°C
            </div>
            <div className="stat-item">
              <span>Max:</span> {maxTemp.toFixed(1)}°C
            </div>
          </div>
          <div className="temperature-grid">
            {data.temperatures.map((temp, index) => (
              <div key={index} className="temp-item">
                <div className="temp-label">Sensor {index + 1}</div>
                <div className="temp-value">{temp.toFixed(1)}°C</div>
              </div>
            ))}
          </div>
        </div>

        <div className="detail-section">
          <h3 className="section-title">Protection Status</h3>
          <div className="protection-grid">
            {Object.entries(data.protection_status).map(([key, active]) => (
              <div key={key} className={`protection-item ${active ? 'active' : ''}`}>
                <div className="protection-label">
                  {key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ')}
                </div>
                <div className="protection-value">
                  <span className={`badge ${active ? 'badge-error' : 'badge-success'}`}>
                    {active ? 'Active' : 'Normal'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="timestamp">
        Data timestamp: {formatTimestamp(data.timestamp)}
      </div>
    </div>
  );
};

export default DataDisplay;