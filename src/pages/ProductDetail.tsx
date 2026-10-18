import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, FileText, ArrowLeft, Package, Truck, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useCatalog } from '../context/CatalogContext';

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { products } = useCatalog();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const product = products.find((p: any) => p.id === id);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-slate-800 mb-4">Товар не найден</h1>
        <Link to="/catalog" className="text-blue-600 hover:text-blue-700">← Вернуться в каталог</Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const relatedProducts = products
    .filter((p: any) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6 flex-wrap">
        <Link to="/" className="hover:text-blue-600">Главная</Link>
        <span>/</span>
        <Link to="/catalog" className="hover:text-blue-600">Каталог</Link>
        <span>/</span>
        <span className="text-slate-800">{product.name}</span>
      </nav>

      <Link to="/catalog" className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 mb-6">
        <ArrowLeft size={16} /> Вернуться в каталог
      </Link>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main info */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="font-mono text-sm text-blue-600 mb-1">{product.partNumber}</div>
                <h1 className="text-2xl font-bold text-slate-800">{product.name}</h1>
                <div className="text-slate-500 mt-1">{product.manufacturer}</div>
              </div>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                В наличии
              </span>
            </div>

            <p className="text-slate-600 mb-6">{product.description}</p>

            {/* Specs table */}
            <h3 className="font-semibold text-slate-800 mb-3">Характеристики</h3>
            <div className="border border-slate-200 rounded-lg overflow-hidden mb-6">
              <table className="w-full text-sm">
                <tbody>
                  {Object.entries(product.specs).map(([key, value], i) => (
                    <tr key={key} className={i % 2 === 0 ? 'bg-slate-50' : 'bg-white'}>
                      <td className="py-2.5 px-4 text-slate-600 font-medium w-1/3">{key}</td>
                      <td className="py-2.5 px-4 text-slate-800">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Datasheet */}
            {product.datasheet && (
              <a href={product.datasheet} className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 mb-6">
                <FileText size={16} /> Скачать PDF-документацию (Datasheet)
              </a>
            )}
          </div>
        </div>

        {/* Sidebar - Order */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-slate-200 p-6 sticky top-32">
            <div className="text-center mb-6">
              <div className="text-3xl font-bold text-slate-800">${product.price.toFixed(4)}</div>
              <div className="text-sm text-slate-500">за 1 шт</div>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3 text-sm">
                <Package size={18} className="text-green-600" />
                <div>
                  <div className="font-medium text-slate-800">В наличии: {product.stock.toLocaleString()} шт</div>
                  <div className="text-slate-500">Склад Москва</div>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Truck size={18} className="text-blue-600" />
                <div>
                  <div className="font-medium text-slate-800">Срок поставки: {product.deliveryDays} дня</div>
                  <div className="text-slate-500">По Москве и МО</div>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-200 pt-4">
              <label className="text-sm text-slate-600 mb-2 block">Количество (шт)</label>
              <div className="flex gap-2 mb-4">
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="text-sm text-slate-500 mb-4">
                Сумма: <span className="font-bold text-slate-800">${(product.price * quantity).toFixed(2)}</span>
              </div>
              <button
                onClick={handleAddToCart}
                className={`w-full py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors ${
                  added ? 'bg-green-600 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {added ? (
                  <><Check size={18} /> Добавлено!</>
                ) : (
                  <><ShoppingCart size={18} /> Добавить в корзину</>
                )}
              </button>
              <Link to="/contacts" className="block w-full mt-3 py-3 border border-slate-300 rounded-lg font-medium text-center text-slate-700 hover:bg-slate-50 transition-colors">
                Запросить КП
              </Link>
            </div>

            {product.note && (
              <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-800">
                {product.note}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Related products */}
      {relatedProducts.length > 0 && (
        <div className="mt-12">
          <h2 className="text-xl font-bold text-slate-800 mb-6">Похожие товары</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedProducts.map(p => (
              <Link key={p.id} to={`/product/${p.id}`} className="bg-white rounded-xl border border-slate-200 p-4 hover:shadow-md transition-shadow">
                <div className="font-mono text-xs text-blue-600 mb-1">{p.partNumber}</div>
                <h3 className="font-medium text-slate-800 text-sm mb-1">{p.name}</h3>
                <div className="text-xs text-slate-500">{p.manufacturer}</div>
                <div className="text-lg font-bold text-slate-800 mt-2">${p.price.toFixed(4)}</div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
