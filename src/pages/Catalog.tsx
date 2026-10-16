import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, Filter, ChevronDown, Grid, List } from 'lucide-react';
import { products, categories } from '../data/products';
import { useCart } from '../context/CartContext';

export default function Catalog() {
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get('category') || '';
  const subcategoryFilter = searchParams.get('subcategory') || '';
  
  const [searchQuery, setSearchQuery] = useState('');
  const [manufacturerFilter, setManufacturerFilter] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categoryFilter);
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [showFilters, setShowFilters] = useState(true);
  const { addToCart } = useCart();

  const manufacturers = useMemo(() => {
    const unique = [...new Set(products.map(p => p.manufacturer))];
    return unique.sort();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesSearch = !searchQuery || 
        p.partNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.note.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesManufacturer = !manufacturerFilter || p.manufacturer === manufacturerFilter;
      const matchesCategory = !selectedCategory || p.category === selectedCategory;
      const matchesSubcategory = !subcategoryFilter || p.subcategory === subcategoryFilter;
      
      return matchesSearch && matchesManufacturer && matchesCategory && matchesSubcategory;
    });
  }, [searchQuery, manufacturerFilter, selectedCategory, subcategoryFilter]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <Link to="/" className="hover:text-blue-600">Главная</Link>
        <span>/</span>
        <span className="text-slate-800">Каталог</span>
      </nav>

      <h1 className="text-3xl font-bold text-slate-800 mb-6">Каталог электронных компонентов</h1>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <aside className="lg:w-64 shrink-0">
          <div className="bg-white rounded-xl border border-slate-200 p-4 sticky top-32">
            <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
              <Filter size={16} /> Категории
            </h3>
            <div className="space-y-1">
              <button
                onClick={() => setSelectedCategory('')}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                  !selectedCategory ? 'bg-blue-50 text-blue-600 font-medium' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                Все категории
              </button>
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    selectedCategory === cat.id ? 'bg-blue-50 text-blue-600 font-medium' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1">
          {/* Search and filters */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 mb-6">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Поиск по парт-номеру или наименованию..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <select
                value={manufacturerFilter}
                onChange={(e) => setManufacturerFilter(e.target.value)}
                className="px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              >
                <option value="">Все производители</option>
                {manufacturers.map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode('table')}
                  className={`p-2.5 rounded-lg border ${viewMode === 'table' ? 'bg-blue-50 border-blue-300 text-blue-600' : 'border-slate-300 text-slate-500'}`}
                >
                  <List size={18} />
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2.5 rounded-lg border ${viewMode === 'grid' ? 'bg-blue-50 border-blue-300 text-blue-600' : 'border-slate-300 text-slate-500'}`}
                >
                  <Grid size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Results count */}
          <div className="text-sm text-slate-500 mb-4">
            Найдено: {filteredProducts.length} позиций
          </div>

          {/* Table view */}
          {viewMode === 'table' ? (
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <th className="text-left py-3 px-4 font-medium text-slate-600">Парт-номер</th>
                      <th className="text-left py-3 px-4 font-medium text-slate-600">Наименование</th>
                      <th className="text-left py-3 px-4 font-medium text-slate-600 hidden md:table-cell">Производитель</th>
                      <th className="text-left py-3 px-4 font-medium text-slate-600 hidden lg:table-cell">Описание</th>
                      <th className="text-left py-3 px-4 font-medium text-slate-600 hidden xl:table-cell">Примечание</th>
                      <th className="text-left py-3 px-4 font-medium text-slate-600">Наличие</th>
                      <th className="text-right py-3 px-4 font-medium text-slate-600">Цена, $</th>
                      <th className="text-right py-3 px-4 font-medium text-slate-600"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map(product => (
                      <tr key={product.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                        <td className="py-3 px-4">
                          <Link to={`/product/${product.id}`} className="text-blue-600 hover:text-blue-700 font-mono text-xs">
                            {product.partNumber}
                          </Link>
                        </td>
                        <td className="py-3 px-4">
                          <Link to={`/product/${product.id}`} className="text-slate-800 hover:text-blue-600 font-medium">
                            {product.name}
                          </Link>
                        </td>
                        <td className="py-3 px-4 text-slate-600 hidden md:table-cell">{product.manufacturer}</td>
                        <td className="py-3 px-4 text-slate-500 text-xs hidden lg:table-cell max-w-[200px] truncate">{product.description}</td>
                        <td className="py-3 px-4 text-slate-500 text-xs hidden xl:table-cell">{product.note}</td>
                        <td className="py-3 px-4">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {product.stock.toLocaleString()} шт
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right font-medium">${product.price.toFixed(4)}</td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => addToCart(product)}
                            className="px-3 py-1.5 bg-blue-600 text-white text-xs rounded-md hover:bg-blue-700 transition-colors whitespace-nowrap"
                          >
                            В корзину
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {filteredProducts.length === 0 && (
                <div className="text-center py-12 text-slate-500">
                  По вашему запросу ничего не найдено
                </div>
              )}
            </div>
          ) : (
            /* Grid view */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProducts.map(product => (
                <div key={product.id} className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-shadow">
                  <Link to={`/product/${product.id}`}>
                    <div className="font-mono text-xs text-blue-600 mb-1">{product.partNumber}</div>
                    <h3 className="font-medium text-slate-800 mb-2">{product.name}</h3>
                    <p className="text-sm text-slate-500 mb-3">{product.manufacturer}</p>
                  </Link>
                  <div className="flex justify-between items-end">
                    <div>
                      <div className="text-xs text-slate-500">Наличие</div>
                      <div className="text-sm font-medium text-green-700">{product.stock.toLocaleString()} шт</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-slate-500">Цена</div>
                      <div className="text-lg font-bold text-slate-800">${product.price.toFixed(4)}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => addToCart(product)}
                    className="w-full mt-4 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    В корзину
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
