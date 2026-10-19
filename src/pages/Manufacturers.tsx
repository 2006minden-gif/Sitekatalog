import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Globe } from 'lucide-react';
import { products } from '../data/products';
import { useContent } from '../context/ContentContext';
import EditableText from '../components/EditableText';
import EditableList from '../components/EditableList';

export default function Manufacturers() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeLetter, setActiveLetter] = useState('');
  const { content, isAdmin, isEditMode } = useContent();

  const manufacturers = content['manufacturers.items'] || [];
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  const filteredManufacturers = useMemo(() => {
    return manufacturers.filter((m: any) => {
      const matchesSearch = !searchQuery || m.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesLetter = !activeLetter || m.name.toUpperCase().startsWith(activeLetter);
      return matchesSearch && matchesLetter;
    });
  }, [searchQuery, activeLetter, manufacturers]);

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

      <EditableText contentKey="manufacturers.title" as="h1" className="text-3xl font-bold text-slate-800 mb-8 block" defaultValue="Производители" />

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
      <EditableList
        contentKey="manufacturers.items"
        defaultItem={{ id: Date.now().toString(), name: 'Новый производитель', logo: '🏭', country: 'Страна', website: 'https://', description: 'Описание производителя' }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        renderItem={(item, index, isEditing, onChange) => {
          // If filtering, only show matching
          if (!isEditing && (searchQuery || activeLetter)) {
            const matchesSearch = !searchQuery || item.name.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesLetter = !activeLetter || item.name.toUpperCase().startsWith(activeLetter);
            if (!matchesSearch || !matchesLetter) return null;
          }

          return (
            <div className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                {isEditing ? (
                  <input
                    type="text"
                    value={item.logo}
                    onChange={(e) => onChange({ ...item, logo: e.target.value })}
                    className="w-14 h-14 bg-slate-100 rounded-lg flex items-center justify-center text-2xl shrink-0 text-center"
                    placeholder="🏭"
                  />
                ) : (
                  <div className="w-14 h-14 bg-slate-100 rounded-lg flex items-center justify-center text-2xl shrink-0">
                    {item.logo}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  {isEditing ? (
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={item.name}
                        onChange={(e) => onChange({ ...item, name: e.target.value })}
                        className="w-full px-2 py-1 border border-blue-300 rounded font-semibold"
                        placeholder="Название"
                      />
                      <input
                        type="text"
                        value={item.country}
                        onChange={(e) => onChange({ ...item, country: e.target.value })}
                        className="w-full px-2 py-1 border border-blue-300 rounded text-sm"
                        placeholder="Страна"
                      />
                      <input
                        type="text"
                        value={item.website}
                        onChange={(e) => onChange({ ...item, website: e.target.value })}
                        className="w-full px-2 py-1 border border-blue-300 rounded text-sm"
                        placeholder="https://..."
                      />
                      <textarea
                        value={item.description}
                        onChange={(e) => onChange({ ...item, description: e.target.value })}
                        className="w-full px-2 py-1 border border-blue-300 rounded text-sm"
                        rows={2}
                        placeholder="Описание"
                      />
                    </div>
                  ) : (
                    <>
                      <h3 className="font-semibold text-slate-800 mb-1">{item.name}</h3>
                      <p className="text-sm text-slate-500 mb-2">{item.country}</p>
                      <p className="text-sm text-slate-600 mb-3 line-clamp-2">{item.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-500">
                          В каталоге: {getProductCount(item.name)} поз.
                        </span>
                        <a
                          href={item.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700"
                        >
                          <Globe size={12} /> Сайт
                        </a>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        }}
      />

      {filteredManufacturers.length === 0 && (
        <div className="text-center py-12 text-slate-500">
          Производители не найдены
        </div>
      )}
    </div>
  );
}
