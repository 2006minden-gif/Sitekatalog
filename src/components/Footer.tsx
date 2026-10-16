import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">Э</span>
              </div>
              <div>
                <div className="font-bold text-lg">ЭлектроОпт</div>
                <div className="text-xs text-slate-400">Электронные компоненты</div>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Оптовые поставки электронных компонентов от ведущих мировых производителей. 
              Более 50 000 наименований на складе.
            </p>
          </div>

          {/* Catalog */}
          <div>
            <h3 className="font-semibold mb-4">Каталог</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link to="/catalog?category=resistors" className="hover:text-white">Резисторы</Link></li>
              <li><Link to="/catalog?category=capacitors" className="hover:text-white">Конденсаторы</Link></li>
              <li><Link to="/catalog?category=ics" className="hover:text-white">Микросхемы</Link></li>
              <li><Link to="/catalog?category=transistors" className="hover:text-white">Транзисторы</Link></li>
              <li><Link to="/catalog?category=connectors" className="hover:text-white">Коннекторы</Link></li>
              <li><Link to="/catalog?category=diodes" className="hover:text-white">Диоды</Link></li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="font-semibold mb-4">Информация</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link to="/about" className="hover:text-white">О компании</Link></li>
              <li><Link to="/manufacturers" className="hover:text-white">Производители</Link></li>
              <li><Link to="/news" className="hover:text-white">Новости</Link></li>
              <li><Link to="/delivery" className="hover:text-white">Доставка</Link></li>
              <li><Link to="/payment" className="hover:text-white">Оплата</Link></li>
              <li><Link to="/privacy" className="hover:text-white">Политика конфиденциальности</Link></li>
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h3 className="font-semibold mb-4">Контакты</h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2">
                <Phone size={16} className="mt-0.5 shrink-0" />
                <div>
                  <div>+7 (495) 123-45-67</div>
                  <div className="text-xs text-slate-500">Отдел продаж</div>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Mail size={16} className="mt-0.5 shrink-0" />
                <div>
                  <div>info@electroopt.ru</div>
                  <div className="text-xs text-slate-500">Общие вопросы</div>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 shrink-0" />
                <div>г. Москва, ул. Электронная, д. 15, стр. 2</div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-400">© 2026 ЭлектроОпт. Все права защищены.</p>
          <div className="flex gap-4 text-sm text-slate-400">
            <Link to="/sitemap" className="hover:text-white">Карта сайта</Link>
            <Link to="/privacy" className="hover:text-white">Политика конфиденциальности</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
