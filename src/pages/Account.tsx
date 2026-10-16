import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Package, FileText, Settings, LogOut, Bell, ChevronRight } from 'lucide-react';

export default function Account() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [activeTab, setActiveTab] = useState('orders');

  if (!isLoggedIn) {
    return (
      <div className="max-w-md mx-auto px-4 py-16">
        <div className="bg-white rounded-xl border border-slate-200 p-8">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <User size={32} className="text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold text-slate-800">Личный кабинет</h1>
            <p className="text-sm text-slate-500 mt-1">Войдите для доступа к заказам и персональным условиям</p>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); setIsLoggedIn(true); }} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
              <input
                type="email"
                value={loginData.email}
                onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="email@company.ru"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Пароль</label>
              <input
                type="password"
                value={loginData.password}
                onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Войти
            </button>
          </form>
          <div className="mt-4 text-center">
            <button className="text-sm text-blue-600 hover:text-blue-700">Забыли пароль?</button>
          </div>
          <div className="mt-6 pt-6 border-t border-slate-200 text-center">
            <p className="text-sm text-slate-500 mb-2">Нет аккаунта?</p>
            <Link to="/contacts" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              Зарегистрироваться →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'orders', label: 'Мои заказы', icon: Package },
    { id: 'documents', label: 'Документы', icon: FileText },
    { id: 'notifications', label: 'Уведомления', icon: Bell },
    { id: 'settings', label: 'Настройки', icon: Settings },
  ];

  const mockOrders = [
    { id: 'ORD-2026-001', date: '2026-01-15', status: 'Доставлен', total: 1250.00, items: 5 },
    { id: 'ORD-2026-002', date: '2026-01-20', status: 'В обработке', total: 3420.50, items: 12 },
    { id: 'ORD-2026-003', date: '2026-01-22', status: 'Отгружен', total: 890.00, items: 3 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <Link to="/" className="hover:text-blue-600">Главная</Link>
        <span>/</span>
        <span className="text-slate-800">Личный кабинет</span>
      </nav>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-slate-200">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <User size={20} className="text-blue-600" />
              </div>
              <div>
                <div className="font-medium text-slate-800 text-sm">ООО «ТехноПром»</div>
                <div className="text-xs text-slate-500">Иванов И.И.</div>
              </div>
            </div>
            <nav className="space-y-1">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                    activeTab === tab.id ? 'bg-blue-50 text-blue-600 font-medium' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <tab.icon size={18} />
                  {tab.label}
                </button>
              ))}
              <button
                onClick={() => setIsLoggedIn(false)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut size={18} />
                Выйти
              </button>
            </nav>
          </div>
        </aside>

        {/* Content */}
        <div className="lg:col-span-3">
          {activeTab === 'orders' && (
            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-6">Мои заказы</h2>
              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <th className="text-left py-3 px-4 font-medium text-slate-600">Номер</th>
                      <th className="text-left py-3 px-4 font-medium text-slate-600">Дата</th>
                      <th className="text-left py-3 px-4 font-medium text-slate-600">Позиций</th>
                      <th className="text-right py-3 px-4 font-medium text-slate-600">Сумма</th>
                      <th className="text-left py-3 px-4 font-medium text-slate-600">Статус</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockOrders.map(order => (
                      <tr key={order.id} className="border-b border-slate-100 hover:bg-slate-50">
                        <td className="py-3 px-4 font-medium text-blue-600">{order.id}</td>
                        <td className="py-3 px-4 text-slate-600">{new Date(order.date).toLocaleDateString('ru-RU')}</td>
                        <td className="py-3 px-4 text-slate-600">{order.items}</td>
                        <td className="py-3 px-4 text-right font-medium">${order.total.toFixed(2)}</td>
                        <td className="py-3 px-4">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                            order.status === 'Доставлен' ? 'bg-green-100 text-green-800' :
                            order.status === 'Отгружен' ? 'bg-blue-100 text-blue-800' :
                            'bg-amber-100 text-amber-800'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'documents' && (
            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-6">Документы</h2>
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <p className="text-slate-600 mb-4">Здесь отображаются закрывающие документы по вашим заказам.</p>
                <div className="space-y-3">
                  {mockOrders.map(order => (
                    <div key={order.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText size={20} className="text-slate-400" />
                        <div>
                          <div className="font-medium text-slate-800 text-sm">Счёт на оплату {order.id}</div>
                          <div className="text-xs text-slate-500">от {new Date(order.date).toLocaleDateString('ru-RU')}</div>
                        </div>
                      </div>
                      <button className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1">
                        Скачать <ChevronRight size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-6">Уведомления</h2>
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="space-y-4">
                  {[
                    { text: 'Заказ ORD-2026-003 отгружен. Ожидайте доставку.', time: '2 часа назад', type: 'info' },
                    { text: 'Новое поступление: микроконтроллеры STM32 на складе.', time: '1 день назад', type: 'success' },
                    { text: 'Счёт на оплату ORD-2026-002 сформирован.', time: '3 дня назад', type: 'info' },
                  ].map((n, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                      <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${n.type === 'success' ? 'bg-green-500' : 'bg-blue-500'}`} />
                      <div>
                        <p className="text-sm text-slate-800">{n.text}</p>
                        <p className="text-xs text-slate-500 mt-1">{n.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-6">Настройки профиля</h2>
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Название организации</label>
                    <input type="text" defaultValue="ООО «ТехноПром»" className="w-full px-4 py-2.5 border border-slate-300 rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Контактное лицо</label>
                    <input type="text" defaultValue="Иванов Иван Иванович" className="w-full px-4 py-2.5 border border-slate-300 rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                    <input type="email" defaultValue="ivanov@technoprom.ru" className="w-full px-4 py-2.5 border border-slate-300 rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Телефон</label>
                    <input type="tel" defaultValue="+7 (495) 987-65-43" className="w-full px-4 py-2.5 border border-slate-300 rounded-lg" />
                  </div>
                  <button className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                    Сохранить изменения
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
