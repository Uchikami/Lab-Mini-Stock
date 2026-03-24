import { useInventory } from '../hooks/useInventory';
import { Package, DollarSign, AlertCircle } from 'lucide-react';

export default function Dashboard() {
  const { products } = useInventory();

  const totalItems = products.length;
  const totalValue = products.reduce((acc, p) => acc + p.price * p.quantity, 0);
  const outOfStockCount = products.filter((p) => p.quantity === 0).length;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header>
        <h1 className="text-3xl font-bold text-gray-900">Inventory Overview</h1>
        <p className="mt-2 text-gray-600">Summary of your current stock levels and value.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-indigo-50 rounded-xl text-indigo-600">
              <Package className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Total Products</p>
              <p className="text-2xl font-bold text-gray-900">{totalItems}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600">
              <DollarSign className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Total Value</p>
              <p className="text-2xl font-bold text-gray-900">฿{totalValue.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-rose-50 rounded-xl text-rose-600">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Out of Stock</p>
              <p className="text-2xl font-bold text-gray-900">{outOfStockCount}</p>
            </div>
          </div>
        </div>
      </div>

      {outOfStockCount > 0 && (
        <div className="bg-rose-50 border border-rose-100 rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-rose-800 mb-4 flex items-center">
            <AlertCircle className="w-5 h-5 mr-2" />
            Critical Stock Alerts
          </h2>
          <div className="space-y-3">
            {products
              .filter((p) => p.quantity === 0)
              .map((p) => (
                <div key={p.id} className="flex justify-between items-center bg-white/50 p-3 rounded-lg border border-rose-200">
                  <span className="font-medium text-gray-800">{p.name}</span>
                  <span className="text-xs font-bold uppercase px-2 py-1 bg-rose-100 text-rose-700 rounded">Out of Stock</span>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
