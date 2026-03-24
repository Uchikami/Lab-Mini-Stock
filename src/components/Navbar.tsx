import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Package } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <span className="text-xl font-bold text-indigo-600 mr-10">StockMaster</span>
            <div className="flex space-x-8 h-full">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `inline-flex items-center px-1 border-b-2 text-sm font-medium transition-colors cursor-pointer h-full ${
                    isActive
                      ? 'border-indigo-600 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`
                }
              >
                <LayoutDashboard className="w-4 h-4 mr-2" />
                Dashboard
              </NavLink>
              <NavLink
                to="/products"
                className={({ isActive }) =>
                  `inline-flex items-center px-1 border-b-2 text-sm font-medium transition-colors cursor-pointer h-full ${
                    isActive
                      ? 'border-indigo-600 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`
                }
              >
                <Package className="w-4 h-4 mr-2" />
                Manage Products
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
