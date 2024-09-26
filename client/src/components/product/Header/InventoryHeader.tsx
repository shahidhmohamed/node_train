import { Link } from "react-router-dom";
import "./InventoryHeader.css";

const InventoryHeader = () => {
  return (
    <nav className="navbar p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-xl">Inventory</div>
        <div>
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="text-white hover:text-yellow-500">
                Products
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-white hover:text-yellow-500">
                Reporting
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-white hover:text-yellow-500">
                Configuration
              </Link>
            </li>
          </ul>
          {/* Multiple Water Drops */}
          <div className="drop"></div>
          <div className="drop"></div>
          <div className="drop"></div>
          <div className="drop"></div>
          <div className="drop"></div>
          <div className="drop"></div>
        </div>
      </div>
    </nav>
  );
};

export default InventoryHeader;
