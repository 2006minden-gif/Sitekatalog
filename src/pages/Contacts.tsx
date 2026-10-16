import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, MessageSquare, PhoneCall, FileText } from 'lucide-react';

export default function Contacts() {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [honeypot, setHoneypot] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return; // honeypot check
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setFormData({ name: '', phone: '', email: '', message: '' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <Link to="/" className="hover:text-blue-600">Главная</Link>
        <span>/</span>
        <span className="text-slate-800">Контакты</span>
      </nav>

      <h1 className="text-3xl font-bold text-slate-800 mb-8">Контакты</h1>

      <div className="grid lg:grid-cols-3 gap-8 mb-12">
        {/* Contact info */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h3 className="font-semibold text-slate-800 mb-4">Компания</h3>
            <div className="space-y-4 text-sm">
              <div>
                <div className="text-slate-500 mb-1">Юридическое название</div>
                <div className="text-slate-800 font-medium">ООО «ЭлектроОпт»</div>
              </div>
              <div>
                <div className="text-slate-500 mb-1">ИНН / КПП</div>
                <div className="text-slate-800">7712345678 / 771201001</div>
              </div>
              <div>
                <div className="text-slate-500 mb-1">ОГРН</div>
                <div className="text-slate-800">1157746123456</div>
              </div>
              <div>
                <div className="text-slate-500 mb-1">Юридический адрес</div>
                <div className="text-slate-800">123456, г. Москва, ул. Электронная, д. 15, стр. 2</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h3 className="font-semibold text-slate-800 mb-4">Контактная информация</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Phone size={18} className="text-blue-600 mt-0.5 shrink-0" />
                <div>
                  <div className="font-medium text-slate-800">+7 (495) 123-45-67</div>
                  <div className="text-xs text-slate-500">Отдел продаж</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone size={18} className="text-blue-600 mt-0.5 shrink-0" />
                <div>
                  <div className="font-medium text-slate-800">+7 (495) 123-45-68</div>
                  <div className="text-xs text-slate-500">Бухгалтерия</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone size={18} className="text-blue-600 mt-0.5 shrink-0" />
                <div>
                  <div className="font-medium text-slate-800">+7 (495) 123-45-69</div>
                  <div className="text-xs text-slate-500">Склад</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail size={18} className="text-blue-600 mt-0.5 shrink-0" />
                <div>
                  <div className="font-medium text-slate-800">info@electroopt.ru</div>
                  <div className="text-xs text-slate-500">Общие вопросы</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail size={18} className="text-blue-600 mt-0.5 shrink-0" />
                <div>
                  <div className="font-medium text-slate-800">sales@electroopt.ru</div>
                  <div className="text-xs text-slate-500">Отдел продаж</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock size={18} className="text-blue-600 mt-0.5 shrink-0" />
                <div>
                  <div className="font-medium text-slate-800">Пн-Пт: 9:00 - 18:00</div>
                  <div className="text-xs text-slate-500">Сб-Вс: выходной</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-blue-600 mt-0.5 shrink-0" />
                <div>
                  <div className="font-medium text-slate-800">г. Москва, ул. Электронная, д. 15</div>
                  <div className="text-xs text-slate-500">Офис и склад</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
            <h3 className="font-semibold text-slate-800 mb-4">Обратная связь</h3>
            {submitted ? (
              <div className="text-center py-8">
                <CheckCircle size={48} className="text-green-600 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-slate-800 mb-2">Сообщение отправлено!</h4>
                <p className="text-slate-600">Мы свяжемся с вами в ближайшее время.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Honeypot */}
                <input
                  type="text"
                  name="website"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Имя *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Ваше имя"
                    />
                  </div>
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
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Сообщение</label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Опишите ваш запрос..."
                  />
                </div>
                <div className="flex items-start gap-2">
                  <input type="checkbox" required className="mt-1" id="privacy" />
                  <label htmlFor="privacy" className="text-sm text-slate-600">
                    Я согласен на обработку персональных данных в соответствии с <Link to="/privacy" className="text-blue-600">политикой конфиденциальности</Link>
                  </label>
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <Send size={16} /> Отправить сообщение
                </button>
              </form>
            )}
          </div>

          {/* Map placeholder */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="h-64 bg-slate-100 flex items-center justify-center">
              <div className="text-center">
                <MapPin size={32} className="text-slate-400 mx-auto mb-2" />
                <p className="text-sm text-slate-500">г. Москва, ул. Электронная, д. 15, стр. 2</p>
                <p className="text-xs text-slate-400 mt-1">Интерактивная карта</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <button className="flex items-center gap-3 p-5 bg-white rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all">
          <PhoneCall size={24} className="text-blue-600" />
          <div>
            <div className="font-medium text-slate-800">Заказать звонок</div>
            <div className="text-sm text-slate-500">Перезвоним за 5 минут</div>
          </div>
        </button>
        <button className="flex items-center gap-3 p-5 bg-white rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all">
          <MessageSquare size={24} className="text-blue-600" />
          <div>
            <div className="font-medium text-slate-800">Написать в отдел продаж</div>
            <div className="text-sm text-slate-500">sales@electroopt.ru</div>
          </div>
        </button>
        <button className="flex items-center gap-3 p-5 bg-white rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all">
          <FileText size={24} className="text-blue-600" />
          <div>
            <div className="font-medium text-slate-800">Запросить КП</div>
            <div className="text-sm text-slate-500">Ответ в течение 2 часов</div>
          </div>
        </button>
      </div>
    </div>
  );
}
