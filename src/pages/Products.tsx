import React, { useState } from 'react';
import { useInventory } from '../hooks/useInventory';
import { Plus, Minus, Trash2, Search, PackagePlus } from 'lucide-react';

export default function Products() {
  const { products, addProduct, updateQuantity, deleteProduct } = useInventory();
  const [searchTerm, setSearchTerm] = useState('');
  const [newName, setNewName] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newQty, setNewQty] = useState('');

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newPrice || !newQty) return;
    addProduct(newName, parseFloat(newPrice), parseInt(newQty));
    setNewName('');
    setNewPrice('');
    setNewQty('');
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header>
        <h1 className="text-3xl font-bold text-gray-900">Manage Inventory</h1>
        <p className="mt-2 text-gray-600">Add new products and update stock levels.</p>
      </header>

      {/* Add Product Form */}
      <section className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <PackagePlus className="w-5 h-5 mr-2 text-indigo-600" />
          Add New Product
        </h2>
        <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Product Name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
            required
          />
          <input
            type="number"
            placeholder="Price (฿)"
            value={newPrice}
            onChange={(e) => setNewPrice(e.target.value)}
            className="px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
            required
            min="0"
            step="0.01"
          />
          <input
            type="number"
            placeholder="Initial Quantity"
            value={newQty}
            onChange={(e) => setNewQty(e.target.value)}
            className="px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
            required
            min="0"
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white px-6 py-2 rounded-xl font-medium hover:bg-indigo-700 transition-colors shadow-sm active:scale-95 cursor-pointer"
          >
            Add Product
          </button>
        </form>
      </section>

      {/* Search and List */}
      <section className="space-y-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search products by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-2xl border border-gray-100 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all bg-white"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className={`p-6 rounded-2xl border transition-all duration-300 ${
                product.quantity === 0
                  ? 'bg-rose-50 border-rose-100 shadow-rose-100/50'
                  : 'bg-white border-gray-100 shadow-sm hover:shadow-md'
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{product.name}</h3>
                  <p className="text-indigo-600 font-semibold">฿{product.price.toLocaleString()}</p>
                </div>
                {product.quantity === 0 && (
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 bg-rose-600 text-white rounded-full">
                    Out of Stock
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between mt-6">
                <div className="flex items-center space-x-3 bg-gray-50 p-1 rounded-xl border border-gray-100">
                  <button
                    onClick={() => updateQuantity(product.id, -1)}
                    className="p-2 hover:bg-white rounded-lg transition-colors text-gray-600 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
                    disabled={product.quantity === 0}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center font-bold text-gray-900">{product.quantity}</span>
                  <button
                    onClick={() => updateQuantity(product.id, 1)}
                    className="p-2 hover:bg-white rounded-lg transition-colors text-gray-600 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={() => deleteProduct(product.id)}
                  className="p-3 text-rose-500 hover:bg-rose-100 rounded-xl transition-colors cursor-pointer"
                  title="Delete product"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
            <PackagePlus className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 font-medium">No products found.</p>
          </div>
        )}
      </section>
    </div>
  );
}
