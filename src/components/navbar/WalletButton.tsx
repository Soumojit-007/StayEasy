
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";

interface WalletButtonProps {
  isWalletConnected: boolean;
  walletAddress: string | null;
  handleConnectWallet: () => Promise<void>;
}

const WalletButton = ({ 
  isWalletConnected, 
  walletAddress, 
  handleConnectWallet 
}: WalletButtonProps) => {
  return (
    <Button 
      onClick={handleConnectWallet} 
      variant="outline" 
      className={`flex items-center gap-2 ${isWalletConnected ? 'bg-green-50 text-green-600 border-green-300' : 'border-indigo-300 text-indigo-600'}`}
    >
      <Wallet size={18} />
      {isWalletConnected ? walletAddress || 'Connected' : 'Connect Wallet'}
    </Button>
  );
};

export default WalletButton;
