import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, ExternalLink, Globe } from 'lucide-react';
import { manufacturers, products } from '../data/products';

export default function Manufacturers() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeLetter, setActiveLetter] = useState('');

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  const filteredManufacturers = useMemo(() => {
    return manufacturers.filter(m => {
      const matchesSearch = !searchQuery || m.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesLetter = !activeLetter || m.name.toUpperCase().startsWith(activeLetter);
      return matchesSearch && matchesLetter;
    });
  }, [searchQuery, activeLetter]);

  const getProductCount = (manufacturerName: string) => {
    return products.filter(p => p.manufacturer === manufacturerName).length;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <Link to="/" className="hover:text-blue-600">Главная</Link>
        <span>/</span>
        <span className="text-slate-800">Производители</span>
      </nav>

      <h1 className="text-3xl font-bold text-slate-800 mb-8">Производители</h1>

      {/* Search */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 mb-6">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Поиск по названию производителя..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Alphabet */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 mb-8">
        <div className="flex flex-wrap gap-1">
          <button
            onClick={() => setActiveLetter('')}
            className={`px-2.5 py-1.5 rounded text-sm font-medium transition-colors ${
              !activeLetter ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Все
          </button>
          {alphabet.map(letter => (
            <button
              key={letter}
              onClick={() => setActiveLetter(activeLetter === letter ? '' : letter)}
              className={`px-2.5 py-1.5 rounded text-sm font-medium transition-colors ${
                activeLetter === letter ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {letter}
            </button>
          ))}
        </div>
      </div>

      {/* Manufacturers grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredManufacturers.map(m => (
          <div key={m.id} className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 bg-slate-100 rounded-lg flex items-center justify-center text-2xl shrink-0">
                {m.logo}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-slate-800 mb-1">{m.name}</h3>
                <p className="text-sm text-slate-500 mb-2">{m.country}</p>
                <p className="text-sm text-slate-600 mb-3 line-clamp-2">{m.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">
                    В каталоге: {getProductCount(m.name)} поз.
                  </span>
                  <a
                    href={m.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700"
                  >
                    <Globe size={12} /> Сайт
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredManufacturers.length === 0 && (
        <div className="text-center py-12 text-slate-500">
          Производители не найдены
        </div>
      )}
    </div>
  );
}
