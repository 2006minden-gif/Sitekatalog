import React from 'react';
import { Link } from 'react-router-dom';
import { Truck, Clock, MapPin, Package } from 'lucide-react';

export function Delivery() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <Link to="/" className="hover:text-blue-600">Главная</Link><span>/</span>
        <span className="text-slate-800">Доставка</span>
      </nav>
      <h1 className="text-3xl font-bold text-slate-800 mb-8">Доставка</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2"><Truck size={20} className="text-blue-600" /> Способы доставки</h2>
          <ul className="space-y-3 text-slate-600">
            <li className="flex items-start gap-2"><Package size={16} className="mt-1 text-blue-600 shrink-0" /><div><strong>Курьерская доставка по Москве</strong> — 1 рабочий день, от 500₽</div></li>
            <li className="flex items-start gap-2"><Package size={16} className="mt-1 text-blue-600 shrink-0" /><div><strong>Самовывоз со склада</strong> — бесплатно, г. Москва, ул. Электронная, д. 15</div></li>
            <li className="flex items-start gap-2"><Package size={16} className="mt-1 text-blue-600 shrink-0" /><div><strong>Транспортные компании</strong> — СДЭК, Деловые Линии, ПЭК (2-7 дней)</div></li>
            <li className="flex items-start gap-2"><Package size={16} className="mt-1 text-blue-600 shrink-0" /><div><strong>Почта России</strong> — для мелких отправлений</div></li>
          </ul>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2"><Clock size={20} className="text-blue-600" /> Сроки доставки</h2>
          <table className="w-full text-sm">
            <tbody>
              <tr className="border-b border-slate-100"><td className="py-2 text-slate-600">Москва (в пределах МКАД)</td><td className="py-2 text-right font-medium">1 день</td></tr>
              <tr className="border-b border-slate-100"><td className="py-2 text-slate-600">Московская область</td><td className="py-2 text-right font-medium">1-2 дня</td></tr>
              <tr className="border-b border-slate-100"><td className="py-2 text-slate-600">Санкт-Петербург</td><td className="py-2 text-right font-medium">2-3 дня</td></tr>
              <tr className="border-b border-slate-100"><td className="py-2 text-slate-600">Центральный ФО</td><td className="py-2 text-right font-medium">2-4 дня</td></tr>
              <tr className="border-b border-slate-100"><td className="py-2 text-slate-600">Другие регионы</td><td className="py-2 text-right font-medium">3-7 дней</td></tr>
            </tbody>
          </table>
          <p className="text-xs text-slate-500 mt-4">* Товары «под заказ» — срок поставки от 7 до 30 дней в зависимости от производителя.</p>
        </div>
      </div>
    </div>
  );
}

export function Payment() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <Link to="/" className="hover:text-blue-600">Главная</Link><span>/</span>
        <span className="text-slate-800">Оплата</span>
      </nav>
      <h1 className="text-3xl font-bold text-slate-800 mb-8">Оплата</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">Способы оплаты</h2>
          <ul className="space-y-3 text-slate-600">
            <li><strong>Безналичный расчёт</strong> — оплата по счёту для юридических лиц и ИП</li>
            <li><strong>Наличный расчёт</strong> — при самовывозе со склада</li>
            <li><strong>Отсрочка платежа</strong> — для постоянных клиентов (по согласованию)</li>
          </ul>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">Условия</h2>
          <ul className="space-y-3 text-slate-600">
            <li>• Минимальная сумма заказа: $100 (без НДС)</li>
            <li>• Все цены указаны в долларах США без НДС</li>
            <li>• НДС начисляется отдельно (20%)</li>
            <li>• Отсрочка платежа до 30 дней для проверенных партнёров</li>
            <li>• Кредитный лимит устанавливается индивидуально</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export function Documents() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <Link to="/" className="hover:text-blue-600">Главная</Link><span>/</span>
        <span className="text-slate-800">Документы</span>
      </nav>
      <h1 className="text-3xl font-bold text-slate-800 mb-8">Документы и реквизиты</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">Реквизиты компании</h2>
          <table className="w-full text-sm">
            <tbody>
              <tr className="border-b border-slate-100"><td className="py-2 text-slate-500">Наименование</td><td className="py-2 text-right font-medium">ООО «ЭлектроОпт»</td></tr>
              <tr className="border-b border-slate-100"><td className="py-2 text-slate-500">ИНН</td><td className="py-2 text-right font-medium">7712345678</td></tr>
              <tr className="border-b border-slate-100"><td className="py-2 text-slate-500">КПП</td><td className="py-2 text-right font-medium">771201001</td></tr>
              <tr className="border-b border-slate-100"><td className="py-2 text-slate-500">ОГРН</td><td className="py-2 text-right font-medium">1157746123456</td></tr>
              <tr className="border-b border-slate-100"><td className="py-2 text-slate-500">Юр. адрес</td><td className="py-2 text-right font-medium text-xs">123456, г. Москва, ул. Электронная, д. 15, стр. 2</td></tr>
              <tr className="border-b border-slate-100"><td className="py-2 text-slate-500">Р/с</td><td className="py-2 text-right font-medium">40702810900000012345</td></tr>
              <tr className="border-b border-slate-100"><td className="py-2 text-slate-500">Банк</td><td className="py-2 text-right font-medium text-xs">ПАО «Сбербанк»</td></tr>
              <tr className="border-b border-slate-100"><td className="py-2 text-slate-500">БИК</td><td className="py-2 text-right font-medium">044525225</td></tr>
              <tr><td className="py-2 text-slate-500">К/с</td><td className="py-2 text-right font-medium">30101810400000000225</td></tr>
            </tbody>
          </table>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">Типовые документы</h2>
          <div className="space-y-3">
            {['Договор поставки (шаблон)', 'Карточка предприятия', 'Доверенность на получение ТМЦ', 'Спецификация (шаблон)', 'Заявка на возврат'].map((doc, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <span className="text-sm text-slate-700">{doc}</span>
                <button className="text-sm text-blue-600 hover:text-blue-700">Скачать</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Privacy() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <Link to="/" className="hover:text-blue-600">Главная</Link><span>/</span>
        <span className="text-slate-800">Политика конфиденциальности</span>
      </nav>
      <h1 className="text-3xl font-bold text-slate-800 mb-8">Политика конфиденциальности</h1>
      <div className="bg-white rounded-xl border border-slate-200 p-8 prose prose-slate max-w-none">
        <p className="text-slate-600">Настоящая Политика конфиденциальности определяет порядок обработки и защиты персональных данных пользователей сайта electroopt.ru.</p>
        <h3 className="text-lg font-semibold text-slate-800 mt-6 mb-3">1. Сбор информации</h3>
        <p className="text-slate-600">Мы собираем информацию, которую вы предоставляете при оформлении заказа, регистрации или обращении в службу поддержки: имя, email, телефон, название организации, адрес доставки.</p>
        <h3 className="text-lg font-semibold text-slate-800 mt-6 mb-3">2. Использование информации</h3>
        <p className="text-slate-600">Собранная информация используется для: обработки заказов, связи с клиентами, улучшения качества обслуживания, рассылки информационных материалов (с согласия пользователя).</p>
        <h3 className="text-lg font-semibold text-slate-800 mt-6 mb-3">3. Защита данных</h3>
        <p className="text-slate-600">Мы применяем технические и организационные меры для защиты персональных данных от несанкционированного доступа, изменения, раскрытия или уничтожения.</p>
        <h3 className="text-lg font-semibold text-slate-800 mt-6 mb-3">4. Передача данных третьим лицам</h3>
        <p className="text-slate-600">Мы не передаём персональные данные третьим лицам, за исключением случаев, предусмотренных законодательством РФ, а также для выполнения заказов (транспортным компаниям).</p>
        <h3 className="text-lg font-semibold text-slate-800 mt-6 mb-3">5. Контакты</h3>
        <p className="text-slate-600">По вопросам обработки персональных данных обращайтесь: info@electroopt.ru, +7 (495) 123-45-67</p>
      </div>
    </div>
  );
}

export function Sitemap() {
  const links = [
    { title: 'Основные разделы', items: [
      { to: '/', label: 'Главная' }, { to: '/catalog', label: 'Каталог' }, { to: '/about', label: 'О компании' },
      { to: '/manufacturers', label: 'Производители' }, { to: '/news', label: 'Новости' }, { to: '/contacts', label: 'Контакты' },
    ]},
    { title: 'Информация', items: [
      { to: '/delivery', label: 'Доставка' }, { to: '/payment', label: 'Оплата' }, { to: '/documents', label: 'Документы' },
      { to: '/privacy', label: 'Политика конфиденциальности' },
    ]},
    { title: 'Аккаунт', items: [
      { to: '/account', label: 'Личный кабинет' }, { to: '/cart', label: 'Корзина' },
    ]},
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <Link to="/" className="hover:text-blue-600">Главная</Link><span>/</span>
        <span className="text-slate-800">Карта сайта</span>
      </nav>
      <h1 className="text-3xl font-bold text-slate-800 mb-8">Карта сайта</h1>
      <div className="grid md:grid-cols-3 gap-8">
        {links.map((section, i) => (
          <div key={i} className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="font-semibold text-slate-800 mb-4">{section.title}</h2>
            <ul className="space-y-2">
              {section.items.map((item, j) => (
                <li key={j}>
                  <Link to={item.to} className="text-sm text-blue-600 hover:text-blue-700">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
