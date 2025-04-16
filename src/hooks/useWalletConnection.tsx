
import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";

const useWalletConnection = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  // Format address to make it more readable
  const formatAddress = (address: string): string => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  // Handle account changes
  const handleAccountsChanged = useCallback((accounts: string[]) => {
    if (accounts.length === 0) {
      setIsWalletConnected(false);
      setWalletAddress(null);
      toast.info("Wallet disconnected");
    } else {
      setIsWalletConnected(true);
      const formattedAddress = formatAddress(accounts[0]);
      setWalletAddress(formattedAddress);
      toast.success("Wallet account changed");
    }
  }, []);

  // Check if wallet is already connected
  useEffect(() => {
    const checkWalletConnection = async () => {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          if (accounts && accounts.length > 0) {
            setIsWalletConnected(true);
            const formattedAddress = formatAddress(accounts[0]);
            setWalletAddress(formattedAddress);
          }
        } catch (error) {
          console.error("Error checking wallet connection:", error);
        }
      }
    };
    
    checkWalletConnection();
    
    // Listen for account changes
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
    }
    
    return () => {
      // Remove event listener
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      }
    };
  }, [handleAccountsChanged]);

  // Connect wallet function
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        // Request account access
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        console.log("Connected to wallet:", accounts[0]);
        setIsWalletConnected(true);
        
        // Format the address for display
        const formattedAddress = formatAddress(accounts[0]);
        setWalletAddress(formattedAddress);
        
        toast.success("Wallet connected successfully!");
      } catch (error) {
        console.error("User denied account access");
        toast.error("Wallet connection was denied");
      }
    } else {
      console.log("Please install MetaMask!");
      toast.error("Please install MetaMask to connect your wallet");
    }
  };

  return {
    isWalletConnected,
    walletAddress,
    connectWallet
  };
};

export default useWalletConnection;
