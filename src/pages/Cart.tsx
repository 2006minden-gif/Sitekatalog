import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingCart, ArrowLeft, CheckCircle, FileText } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { items, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice } = useCart();
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '', contactPerson: '', phone: '', email: '', deliveryAddress: '', comment: ''
  });

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderSubmitted(true);
    clearCart();
  };

  if (orderSubmitted) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <CheckCircle size={64} className="text-green-600 mx-auto mb-6" />
        <h1 className="text-3xl font-bold text-slate-800 mb-4">Заявка отправлена!</h1>
        <p className="text-slate-600 mb-8">
          Ваша заявка принята. Менеджер свяжется с вами в течение 2 часов для подтверждения заказа.
        </p>
        <Link to="/catalog" className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors inline-block">
          Вернуться в каталог
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <ShoppingCart size={64} className="text-slate-300 mx-auto mb-6" />
        <h1 className="text-2xl font-bold text-slate-800 mb-4">Корзина пуста</h1>
        <p className="text-slate-600 mb-8">Добавьте товары из каталога для оформления заявки</p>
        <Link to="/catalog" className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors inline-block">
          Перейти в каталог
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <Link to="/" className="hover:text-blue-600">Главная</Link>
        <span>/</span>
        <span className="text-slate-800">Корзина</span>
      </nav>

      <h1 className="text-3xl font-bold text-slate-800 mb-8">Корзина / Оформление заявки</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden mb-6">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="text-left py-3 px-4 font-medium text-slate-600">Товар</th>
                    <th className="text-center py-3 px-4 font-medium text-slate-600">Кол-во</th>
                    <th className="text-right py-3 px-4 font-medium text-slate-600">Цена</th>
                    <th className="text-right py-3 px-4 font-medium text-slate-600">Сумма</th>
                    <th className="py-3 px-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {items.map(item => (
                    <tr key={item.product.id} className="border-b border-slate-100">
                      <td className="py-4 px-4">
                        <Link to={`/product/${item.product.id}`} className="text-blue-600 hover:text-blue-700 font-mono text-xs block mb-1">
                          {item.product.partNumber}
                        </Link>
                        <div className="font-medium text-slate-800">{item.product.name}</div>
                        <div className="text-xs text-slate-500">{item.product.manufacturer}</div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="w-7 h-7 rounded border border-slate-300 flex items-center justify-center hover:bg-slate-50"
                          >
                            <Minus size={14} />
                          </button>
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.product.id, Math.max(1, parseInt(e.target.value) || 1))}
                            className="w-16 text-center py-1 border border-slate-300 rounded"
                          />
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="w-7 h-7 rounded border border-slate-300 flex items-center justify-center hover:bg-slate-50"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-right">${item.product.price.toFixed(4)}</td>
                      <td className="py-4 px-4 text-right font-medium">${(item.product.price * item.quantity).toFixed(2)}</td>
                      <td className="py-4 px-4">
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="p-1.5 text-slate-400 hover:text-red-600 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Order form */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Данные для оформления заявки</h3>
            <form onSubmit={handleSubmitOrder} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Название организации *</label>
                  <input
                    type="text"
                    required
                    value={formData.companyName}
                    onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="ООО «Компания»"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Контактное лицо *</label>
                  <input
                    type="text"
                    required
                    value={formData.contactPerson}
                    onChange={(e) => setFormData({...formData, contactPerson: e.target.value})}
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Иванов Иван Иванович"
                  />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Телефон *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="+7 (___) ___-__-__"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="email@company.ru"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Адрес доставки</label>
                <input
                  type="text"
                  value={formData.deliveryAddress}
                  onChange={(e) => setFormData({...formData, deliveryAddress: e.target.value})}
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="г. Москва, ул. ..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Комментарий к заказу</label>
                <textarea
                  rows={3}
                  value={formData.comment}
                  onChange={(e) => setFormData({...formData, comment: e.target.value})}
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Дополнительная информация..."
                />
              </div>
              <div className="flex items-start gap-2">
                <input type="checkbox" required className="mt-1" id="cart-privacy" />
                <label htmlFor="cart-privacy" className="text-sm text-slate-600">
                  Согласен на обработку персональных данных
                </label>
              </div>
              <button
                type="submit"
                className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <FileText size={16} /> Оформить заявку
              </button>
            </form>
          </div>
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-slate-200 p-6 sticky top-32">
            <h3 className="font-semibold text-slate-800 mb-4">Итого</h3>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Позиций:</span>
                <span className="font-medium">{items.length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Общее кол-во:</span>
                <span className="font-medium">{totalItems} шт</span>
              </div>
              <div className="border-t border-slate-200 pt-3">
                <div className="flex justify-between">
                  <span className="font-medium text-slate-800">Сумма:</span>
                  <span className="text-xl font-bold text-slate-800">${totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>
            <div className="text-xs text-slate-500 space-y-1">
              <p>• Цены указаны без НДС</p>
              <p>• Точная стоимость будет рассчитана менеджером</p>
              <p>• Минимальная сумма заказа: $100</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
