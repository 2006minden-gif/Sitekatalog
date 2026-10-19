import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, MessageSquare, PhoneCall, FileText } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import EditableText from '../components/EditableText';
import EditableTable from '../components/EditableTable';

export default function Contacts() {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const { content, isAdmin, isEditMode } = useContent();

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
                <EditableText 
                  contentKey="contacts.company.name" 
                  as="div" 
                  className="text-slate-800 font-medium"
                  defaultValue="ООО «ЭлектроОпт»"
                />
              </div>
              <div>
                <div className="text-slate-500 mb-1">ИНН / КПП</div>
                <EditableText 
                  contentKey="contacts.company.inn" 
                  as="div" 
                  className="text-slate-800"
                  defaultValue="7712345678 / 771201001"
                />
              </div>
              <div>
                <div className="text-slate-500 mb-1">ОГРН</div>
                <EditableText 
                  contentKey="contacts.company.ogrn" 
                  as="div" 
                  className="text-slate-800"
                  defaultValue="1157746123456"
                />
              </div>
              <div>
                <div className="text-slate-500 mb-1">Юридический адрес</div>
                <EditableText 
                  contentKey="contacts.company.address" 
                  as="div" 
                  className="text-slate-800"
                  defaultValue="123456, г. Москва, ул. Электронная, д. 15, стр. 2"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h3 className="font-semibold text-slate-800 mb-4">Контактная информация</h3>
            <div className="space-y-4">
              <EditableTable
                contentKey="contacts.phones"
                columns={[
                  { key: 'number', label: 'Телефон' },
                  { key: 'dept', label: 'Отдел' },
                ]}
                className="mb-4"
              />
              <EditableTable
                contentKey="contacts.emails"
                columns={[
                  { key: 'email', label: 'Email' },
                  { key: 'dept', label: 'Отдел' },
                ]}
                className="mb-4"
              />
              <div className="flex items-start gap-3">
                <Clock size={18} className="text-blue-600 mt-0.5 shrink-0" />
                <div>
                  <EditableText 
                    contentKey="contacts.schedule" 
                    as="div" 
                    className="font-medium text-slate-800"
                    defaultValue="Пн-Пт: 9:00 - 18:00"
                  />
                  <EditableText 
                    contentKey="contacts.scheduleNote" 
                    as="div" 
                    className="text-xs text-slate-500"
                    defaultValue="Сб-Вс: выходной"
                  />
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-blue-600 mt-0.5 shrink-0" />
                <div>
                  <EditableText 
                    contentKey="contacts.actualAddress" 
                    as="div" 
                    className="font-medium text-slate-800"
                    defaultValue="г. Москва, ул. Электронная, д. 15"
                  />
                  <EditableText 
                    contentKey="contacts.actualAddressNote" 
                    as="div" 
                    className="text-xs text-slate-500"
                    defaultValue="Офис и склад"
                  />
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
            <EditableText contentKey="contacts.quickActions.callback" as="div" className="font-medium text-slate-800" defaultValue="Заказать звонок" />
            <EditableText contentKey="contacts.quickActions.callbackDesc" as="div" className="text-sm text-slate-500" defaultValue="Перезвоним за 5 минут" />
          </div>
        </button>
        <button className="flex items-center gap-3 p-5 bg-white rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all">
          <MessageSquare size={24} className="text-blue-600" />
          <div>
            <EditableText contentKey="contacts.quickActions.sales" as="div" className="font-medium text-slate-800" defaultValue="Написать в отдел продаж" />
            <EditableText contentKey="contacts.quickActions.salesDesc" as="div" className="text-sm text-slate-500" defaultValue="sales@electroopt.ru" />
          </div>
        </button>
        <button className="flex items-center gap-3 p-5 bg-white rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all">
          <FileText size={24} className="text-blue-600" />
          <div>
            <EditableText contentKey="contacts.quickActions.quote" as="div" className="font-medium text-slate-800" defaultValue="Запросить КП" />
            <EditableText contentKey="contacts.quickActions.quoteDesc" as="div" className="text-sm text-slate-500" defaultValue="Ответ в течение 2 часов" />
          </div>
        </button>
      </div>
    </div>
  );
}
