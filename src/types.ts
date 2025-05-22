// src/types.ts
export interface BMSData {
    total_voltage: number;
    current: number;
    soc: number;  // State of Charge (%)
    cell_voltages: number[];
    temperatures: number[];
    balancing_status: boolean[];
    protection_status: {
      overvoltage: boolean;
      undervoltage: boolean;
      overcurrent: boolean;
      overtemperature: boolean;
      undertemperature: boolean;
      cell_imbalance: boolean;
    };
    cycles: number;
    timestamp: number;
  }
  
  export interface ConnectionStatus {
    isConnected: boolean;
    message: string;
    lastUpdated: number | null;
  }