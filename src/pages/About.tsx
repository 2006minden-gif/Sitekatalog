import React from 'react';
import { Link } from 'react-router-dom';
import { Award, Users, Target, CheckCircle, Building2, Globe } from 'lucide-react';

export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <Link to="/" className="hover:text-blue-600">Главная</Link>
        <span>/</span>
        <span className="text-slate-800">О компании</span>
      </nav>

      <h1 className="text-3xl font-bold text-slate-800 mb-8">О компании ЭлектроОпт</h1>

      {/* Hero section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 lg:p-12 text-white mb-12">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl font-bold mb-4">Надёжный поставщик электронных компонентов с 2011 года</h2>
            <p className="text-blue-100 leading-relaxed">
              Компания «ЭлектроОпт» специализируется на оптовых поставках электронных компонентов 
              от ведущих мировых производителей. За 15 лет работы мы стали надёжным партнёром 
              для более чем 2000 предприятий по всей России.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold">15</div>
              <div className="text-sm text-blue-200">лет на рынке</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold">2000+</div>
              <div className="text-sm text-blue-200">клиентов</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold">50 000+</div>
              <div className="text-sm text-blue-200">наименований</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold">200+</div>
              <div className="text-sm text-blue-200">брендов</div>
            </div>
          </div>
        </div>
      </div>

      {/* Mission */}
      <div className="grid lg:grid-cols-2 gap-12 mb-12">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Наша миссия</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            Обеспечивать предприятия электронной промышленности качественными компонентами 
            по конкурентным ценам с минимальными сроками поставки.
          </p>
          <p className="text-slate-600 leading-relaxed">
            Мы стремимся быть не просто поставщиком, а технологическим партнёром, 
            помогая клиентам оптимизировать закупки и находить лучшие решения для их проектов.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Ключевые компетенции</h2>
          <ul className="space-y-3">
            {[
              'Прямые контракты с производителями и авторизованными дистрибьюторами',
              'Техническая поддержка и помощь в подборе аналогов',
              'Собственный склад 5000 м² с системой управления запасами',
              'Оперативная логистика по всей России и СНГ',
              'Гибкие условия оплаты для постоянных клиентов',
              'Гарантия подлинности каждой поставки',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle size={20} className="text-green-600 shrink-0 mt-0.5" />
                <span className="text-slate-600">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Advantages */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-slate-800 mb-8 text-center">Преимущества работы с нами</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: Award, title: 'Оригинальная продукция', desc: 'Работаем только с официальными дистрибьюторами. Каждая партия проходит входной контроль качества.' },
            { icon: Users, title: 'Персональный менеджер', desc: 'За каждым клиентом закреплён персональный менеджер, знающий специфику вашего производства.' },
            { icon: Target, title: 'Подбор аналогов', desc: 'Помогаем найти замену дефицитным компонентам. Инженеры подберут оптимальный аналог.' },
            { icon: Building2, title: 'Собственный склад', desc: 'Более 50 000 наименований в наличии на складе в Москве. Отгрузка в день заказа.' },
            { icon: Globe, title: 'Доставка по всей России', desc: 'Собственная логистическая служба и партнёрство с транспортными компаниями.' },
            { icon: CheckCircle, title: 'Гибкие условия', desc: 'Отсрочка платежа, кредитные лимиты, индивидуальные условия для крупных заказов.' },
          ].map((item, i) => (
            <div key={i} className="bg-white p-6 rounded-xl border border-slate-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <item.icon size={24} className="text-blue-600" />
              </div>
              <h3 className="font-semibold text-slate-800 mb-2">{item.title}</h3>
              <p className="text-sm text-slate-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* History */}
      <div className="bg-slate-50 rounded-2xl p-8 mb-12">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">История компании</h2>
        <div className="space-y-6">
          {[
            { year: '2011', text: 'Основание компании. Начало работы на рынке электронных компонентов.' },
            { year: '2014', text: 'Открытие собственного склада. Подписание прямых контрактов с Yageo и Murata.' },
            { year: '2017', text: 'Расширение ассортимента до 20 000 наименований. Запуск онлайн-каталога.' },
            { year: '2019', text: 'Партнёрство с STMicroelectronics и Texas Instruments. Открытие филиала в Санкт-Петербурге.' },
            { year: '2022', text: 'Преодоление отметки в 1000 постоянных клиентов. Автоматизация складских процессов.' },
            { year: '2025', text: 'Обновление онлайн-платформы. Внедрение системы электронного документооборота.' },
          ].map((item, i) => (
            <div key={i} className="flex gap-4">
              <div className="shrink-0 w-16 text-right">
                <span className="text-blue-600 font-bold">{item.year}</span>
              </div>
              <div className="border-l-2 border-blue-200 pl-4 pb-4">
                <p className="text-slate-600">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Certificates */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Сертификаты и лицензии</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['Сертификат дистрибьютора ST', 'Авторизация Infineon', 'ISO 9001:2015', 'Сертификат TI'].map((cert, i) => (
            <div key={i} className="bg-white border border-slate-200 rounded-xl p-6 text-center hover:shadow-md transition-shadow">
              <Award size={32} className="text-blue-600 mx-auto mb-3" />
              <div className="text-sm font-medium text-slate-700">{cert}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-blue-600 rounded-2xl p-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-4">Станьте нашим партнёром</h2>
        <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
          Мы всегда открыты для сотрудничества. Свяжитесь с нами для обсуждения условий работы.
        </p>
        <Link to="/contacts" className="inline-block px-6 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors">
          Связаться с нами
        </Link>
      </div>
    </div>
  );
}
