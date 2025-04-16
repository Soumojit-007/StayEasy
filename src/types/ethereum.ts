
export interface EthereumProvider {
  request: (args: { method: string }) => Promise<string[]>;
  isMetaMask?: boolean;
  on: (eventName: string, callback: (...args: any[]) => void) => void;
  removeListener: (eventName: string, callback: (...args: any[]) => void) => void;
}

declare global {
  interface Window {
    ethereum?: EthereumProvider;
  }
}
