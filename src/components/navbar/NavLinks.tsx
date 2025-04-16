
import { Link } from "react-router-dom";

const NavLinks = () => {
  return (
    <div className="flex items-center space-x-6">
      <Link to="/explore" className="text-gray-700 hover:text-primary">
        Explore
      </Link>
      <Link to="/about" className="text-gray-700 hover:text-primary">
        About
      </Link>
      <Link to="/contact" className="text-gray-700 hover:text-primary">
        Contact
      </Link>
    </div>
  );
};

export default NavLinks;
