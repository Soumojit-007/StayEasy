
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";

interface MobileMenuProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
  isWalletConnected: boolean;
  walletAddress: string | null;
  handleConnectWallet: () => Promise<void>;
}

const MobileMenu = ({
  isMenuOpen,
  setIsMenuOpen,
  isWalletConnected,
  walletAddress,
  handleConnectWallet
}: MobileMenuProps) => {
  if (!isMenuOpen) return null;
  
  return (
    <div className="md:hidden py-3 pb-4">
      <div className="flex flex-col space-y-3">
        <Link 
          to="/explore" 
          className="text-gray-700 hover:text-primary px-3 py-2"
          onClick={() => setIsMenuOpen(false)}
        >
          Explore
        </Link>
        <Link 
          to="/about" 
          className="text-gray-700 hover:text-primary px-3 py-2"
          onClick={() => setIsMenuOpen(false)}
        >
          About
        </Link>
        <Link 
          to="/contact" 
          className="text-gray-700 hover:text-primary px-3 py-2"
          onClick={() => setIsMenuOpen(false)}
        >
          Contact
        </Link>
        <div className="pt-2 flex flex-col space-y-2">
          <Button variant="outline" asChild>
            <Link to="/login" onClick={() => setIsMenuOpen(false)}>Login</Link>
          </Button>
          <Button asChild>
            <Link to="/signup" onClick={() => setIsMenuOpen(false)}>Sign Up</Link>
          </Button>
          <Button 
            onClick={() => {
              handleConnectWallet();
              setIsMenuOpen(false);
            }} 
            variant="outline" 
            className={`flex items-center justify-center gap-2 ${isWalletConnected ? 'bg-green-50 text-green-600 border-green-300' : 'border-indigo-300 text-indigo-600'}`}
          >
            <Wallet size={18} />
            {isWalletConnected ? walletAddress || 'Connected' : 'Connect Wallet'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
