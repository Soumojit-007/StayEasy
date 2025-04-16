
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, SquarePen } from "lucide-react";
import NavLinks from "./navbar/NavLinks";
import AuthButtons from "./navbar/AuthButtons";
import MobileMenu from "./navbar/MobileMenu";
import useWalletConnection from "@/hooks/useWalletConnection";
import "@/types/ethereum"; // Import the type definition

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isWalletConnected, walletAddress, connectWallet } = useWalletConnection();

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 text-xl font-bold text-primary">
              <SquarePen className="text-white bg-primary p-1 rounded" size={24} fill="white" />
              <span>StayEasy</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-between w-full ml-8">
            {/* Left side navigation items */}
            <NavLinks />
            
            {/* Right side buttons */}
            <AuthButtons 
              isWalletConnected={isWalletConnected}
              walletAddress={walletAddress}
              handleConnectWallet={connectWallet}
            />
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary focus:outline-none"
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        <MobileMenu 
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          isWalletConnected={isWalletConnected}
          walletAddress={walletAddress}
          handleConnectWallet={connectWallet}
        />
      </div>
    </nav>
  );
};

export default Navbar;
