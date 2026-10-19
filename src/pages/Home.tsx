import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Package, Truck, Shield, Clock, Search, BarChart3, Users } from 'lucide-react';
import { news } from '../data/products';
import { useCart } from '../context/CartContext';
import { useContent } from '../context/ContentContext';
import { useCatalog } from '../context/CatalogContext';
import EditableText from '../components/EditableText';
import EditableList from '../components/EditableList';

export default function Home() {
  const { addToCart } = useCart();
  const { content, isAdmin, isEditMode } = useContent();
  const { products, categories } = useCatalog();
  const featuredProducts = products.slice(0, 6);
  const latestNews = news.slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                <EditableText contentKey="home.hero.title" as="span" className="inline" />
              </h1>
              <EditableText 
                contentKey="home.hero.subtitle" 
                as="p" 
                className="text-lg text-slate-300 mb-8 leading-relaxed block" 
                multiline 
              />
              <div className="flex flex-wrap gap-4">
                <Link to="/catalog" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors flex items-center gap-2">
                  Перейти в каталог <ArrowRight size={18} />
                </Link>
                <Link to="/contacts" className="px-6 py-3 border border-white/30 hover:bg-white/10 rounded-lg font-medium transition-colors">
                  Запросить КП
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <EditableText contentKey="home.stats.products" as="div" className="text-3xl font-bold text-blue-400" />
                <EditableText contentKey="home.stats.productsLabel" as="div" className="text-sm text-slate-300 mt-1" />
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <EditableText contentKey="home.stats.manufacturers" as="div" className="text-3xl font-bold text-blue-400" />
                <EditableText contentKey="home.stats.manufacturersLabel" as="div" className="text-sm text-slate-300 mt-1" />
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <EditableText contentKey="home.stats.years" as="div" className="text-3xl font-bold text-blue-400" />
                <EditableText contentKey="home.stats.yearsLabel" as="div" className="text-sm text-slate-300 mt-1" />
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <EditableText contentKey="home.stats.support" as="div" className="text-3xl font-bold text-blue-400" />
                <EditableText contentKey="home.stats.supportLabel" as="div" className="text-sm text-slate-300 mt-1" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <EditableText 
            contentKey="home.advantages.title" 
            as="h2" 
            className="text-3xl font-bold text-center text-slate-800 mb-12 block" 
          />
          <EditableList
            contentKey="home.advantages"
            defaultItem={{ title: 'Новое преимущество', desc: 'Описание преимущества' }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            itemClassName=""
            renderItem={(item, index, isEditing, onChange) => {
              const icons = [Package, Truck, Shield, Clock];
              const Icon = icons[index % icons.length];
              return (
                <div className="p-6 rounded-xl border border-slate-200 hover:border-blue-200 hover:shadow-lg transition-all">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <Icon size={24} className="text-blue-600" />
                  </div>
                  {isEditing ? (
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => onChange({ ...item, title: e.target.value })}
                        className="w-full px-2 py-1 border border-blue-300 rounded font-semibold"
                        placeholder="Заголовок"
                      />
                      <textarea
                        value={item.desc}
                        onChange={(e) => onChange({ ...item, desc: e.target.value })}
                        className="w-full px-2 py-1 border border-blue-300 rounded text-sm"
                        rows={3}
                        placeholder="Описание"
                      />
                    </div>
                  ) : (
                    <>
                      <h3 className="font-semibold text-slate-800 mb-2">{item.title}</h3>
                      <p className="text-sm text-slate-600">{item.desc}</p>
                    </>
                  )}
                </div>
              );
            }}
          />
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-slate-800">Каталог продукции</h2>
            <Link to="/catalog" className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
              Весь каталог <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map((cat: any) => (
              <Link
                key={cat.id}
                to={`/catalog?category=${cat.id}`}
                className="bg-white p-5 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all group"
              >
                <h3 className="font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">{cat.name}</h3>
                <p className="text-sm text-slate-500 mt-1">{cat.subcategories.length} подкатегорий</p>
                <p className="text-sm text-blue-600 mt-2">
                  {cat.subcategories.reduce((s: number, sub: any) => s + sub.count, 0).toLocaleString()} позиций
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-slate-800">Популярные позиции</h2>
            <Link to="/catalog" className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
              Все товары <ArrowRight size={16} />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Парт-номер</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Наименование</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Производитель</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Наличие</th>
                  <th className="text-right py-3 px-4 font-medium text-slate-600">Цена, $</th>
                  <th className="text-right py-3 px-4 font-medium text-slate-600"></th>
                </tr>
              </thead>
              <tbody>
                {featuredProducts.map((product: any) => (
                  <tr key={product.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-3 px-4">
                      <Link to={`/product/${product.id}`} className="text-blue-600 hover:text-blue-700 font-mono text-xs">
                        {product.partNumber}
                      </Link>
                    </td>
                    <td className="py-3 px-4">
                      <Link to={`/product/${product.id}`} className="text-slate-800 hover:text-blue-600">
                        {product.name}
                      </Link>
                    </td>
                    <td className="py-3 px-4 text-slate-600">{product.manufacturer}</td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {product.stock.toLocaleString()} шт
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right font-medium">${product.price.toFixed(4)}</td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => addToCart(product)}
                        className="px-3 py-1.5 bg-blue-600 text-white text-xs rounded-md hover:bg-blue-700 transition-colors"
                      >
                        В корзину
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* News */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-slate-800">Новости</h2>
            <Link to="/news" className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
              Все новости <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestNews.map(item => (
              <Link key={item.id} to={`/news/${item.id}`} className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow group">
                <div className="h-40 bg-gradient-to-br from-blue-100 to-slate-100 flex items-center justify-center">
                  <BarChart3 size={48} className="text-blue-300" />
                </div>
                <div className="p-5">
                  <div className="text-xs text-slate-500 mb-2">{new Date(item.date).toLocaleDateString('ru-RU')}</div>
                  <h3 className="font-semibold text-slate-800 group-hover:text-blue-600 transition-colors mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-600">{item.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <EditableText 
            contentKey="home.cta.title" 
            as="h2" 
            className="text-3xl font-bold text-white mb-4 block" 
          />
          <EditableText 
            contentKey="home.cta.subtitle" 
            as="p" 
            className="text-blue-100 mb-8 max-w-2xl mx-auto block" 
            multiline 
          />
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contacts" className="px-6 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors">
              Отправить запрос
            </Link>
            <a href="tel:+74951234567" className="px-6 py-3 border border-white text-white rounded-lg font-medium hover:bg-white/10 transition-colors">
              +7 (495) 123-45-67
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
