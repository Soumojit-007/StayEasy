
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import WalletButton from "./WalletButton";

interface AuthButtonsProps {
  isWalletConnected: boolean;
  walletAddress: string | null;
  handleConnectWallet: () => Promise<void>;
}

const AuthButtons = ({ 
  isWalletConnected, 
  walletAddress, 
  handleConnectWallet 
}: AuthButtonsProps) => {
  return (
    <div className="flex items-center space-x-3">
      <Button variant="outline" asChild>
        <Link to="/login">Login</Link>
      </Button>
      <Button asChild>
        <Link to="/signup">Sign Up</Link>
      </Button>
      <WalletButton 
        isWalletConnected={isWalletConnected}
        walletAddress={walletAddress}
        handleConnectWallet={handleConnectWallet}
      />
    </div>
  );
};

export default AuthButtons;
