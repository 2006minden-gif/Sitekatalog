import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Search, Menu, X, Phone, Mail, ChevronDown, Settings } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useContent } from '../context/ContentContext';
import { categories } from '../data/products';
import EditableText from './EditableText';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [catalogOpen, setCatalogOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { totalItems } = useCart();
  const { isAdmin } = useContent();
  const location = useLocation();

  const navLinks = [
    { to: '/catalog', label: 'Каталог' },
    { to: '/about', label: 'О компании' },
    { to: '/manufacturers', label: 'Производители' },
    { to: '/news', label: 'Новости' },
    { to: '/contacts', label: 'Контакты' },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-slate-800 text-white text-sm">
        <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">
          <div className="hidden md:flex items-center gap-4">
            <EditableText 
              contentKey="header.phone" 
              as="a" 
              className="flex items-center gap-1 hover:text-blue-300"
              defaultValue="+7 (495) 123-45-67"
            />
            <EditableText 
              contentKey="header.email" 
              as="a" 
              className="flex items-center gap-1 hover:text-blue-300"
              defaultValue="info@electroopt.ru"
            />
          </div>
          <div className="flex items-center gap-4">
            <EditableText 
              contentKey="header.schedule" 
              as="span" 
              className="hidden sm:inline"
              defaultValue="Пн-Пт: 9:00 - 18:00"
            />
            <Link to="/account" className="hover:text-blue-300">Личный кабинет</Link>
            {isAdmin && (
              <Link to="/admin" className="flex items-center gap-1 text-blue-300 hover:text-blue-200">
                <Settings size={14} /> Админ
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">Э</span>
            </div>
            <div>
              <EditableText 
                contentKey="header.companyName" 
                as="div" 
                className="font-bold text-slate-800 text-lg leading-tight"
                defaultValue="ЭлектроОпт"
              />
              <EditableText 
                contentKey="header.companyDesc" 
                as="div" 
                className="text-xs text-slate-500"
                defaultValue="Электронные компоненты оптом"
              />
            </div>
          </Link>

          {/* Search */}
          <div className="hidden lg:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Поиск по парт-номеру или наименованию..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                <Search size={16} />
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Link to="/cart" className="relative p-2 hover:bg-slate-100 rounded-lg">
              <ShoppingCart size={24} className="text-slate-700" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            <button
              className="lg:hidden p-2 hover:bg-slate-100 rounded-lg"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="border-t border-slate-200 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="hidden lg:flex items-center gap-1">
            {/* Catalog dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setCatalogOpen(true)}
              onMouseLeave={() => setCatalogOpen(false)}
            >
              <button className="flex items-center gap-1 px-4 py-3 text-sm font-medium text-white bg-blue-600 rounded-t-md hover:bg-blue-700">
                Каталог
                <ChevronDown size={16} />
              </button>
              {catalogOpen && (
                <div className="absolute top-full left-0 w-[800px] bg-white shadow-xl border border-slate-200 rounded-b-lg p-6 grid grid-cols-2 gap-4 z-50">
                  {categories.map(cat => (
                    <div key={cat.id} className="border-b border-slate-100 pb-3">
                      <Link to={`/catalog?category=${cat.id}`} className="font-medium text-slate-800 hover:text-blue-600 block mb-1">
                        {cat.name}
                      </Link>
                      <div className="grid grid-cols-2 gap-1">
                        {cat.subcategories.map(sub => (
                          <Link
                            key={sub.id}
                            to={`/catalog?subcategory=${sub.id}`}
                            className="text-sm text-slate-600 hover:text-blue-600 py-0.5"
                          >
                            {sub.name} ({sub.count})
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {navLinks.slice(1).map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-3 text-sm font-medium transition-colors ${
                  location.pathname === link.to
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-slate-700 hover:text-blue-600'
                }`}
              >
                {link.label}
              </Link>
            ))}

            <div className="ml-auto flex items-center gap-4 text-sm text-slate-600">
              <Link to="/delivery" className="hover:text-blue-600">Доставка</Link>
              <Link to="/payment" className="hover:text-blue-600">Оплата</Link>
              <Link to="/documents" className="hover:text-blue-600">Документы</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200 shadow-lg">
          <div className="px-4 py-3">
            <input
              type="text"
              placeholder="Поиск..."
              className="w-full px-4 py-2 border border-slate-300 rounded-lg mb-3"
            />
          </div>
          <div className="border-t border-slate-100">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className="block px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 border-b border-slate-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/delivery" className="block px-4 py-3 text-sm text-slate-600 hover:bg-slate-50 border-b border-slate-100">Доставка и оплата</Link>
            <Link to="/documents" className="block px-4 py-3 text-sm text-slate-600 hover:bg-slate-50 border-b border-slate-100">Документы</Link>
          </div>
        </div>
      )}
    </header>
  );
}
