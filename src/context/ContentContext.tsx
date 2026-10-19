import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ContentData {
  [key: string]: any;
}

interface ContentContextType {
  content: ContentData;
  updateContent: (key: string, value: any) => void;
  isAdmin: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  isEditMode: boolean;
  toggleEditMode: () => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

// Default content that can be edited
const defaultContent: ContentData = {
  // Home page
  'home.hero.title': 'Электронные компоненты оптом',
  'home.hero.subtitle': 'Более 50 000 наименований от ведущих мировых производителей. Прямые поставки, конкурентные цены, доставка по всей России.',
  'home.stats.products': '50 000+',
  'home.stats.productsLabel': 'Наименований в каталоге',
  'home.stats.manufacturers': '200+',
  'home.stats.manufacturersLabel': 'Производителей',
  'home.stats.years': '15 лет',
  'home.stats.yearsLabel': 'На рынке',
  'home.stats.support': '24/7',
  'home.stats.supportLabel': 'Приём заказов',
  'home.advantages.title': 'Почему выбирают нас',
  'home.advantages': [
    { title: 'Широкий ассортимент', desc: 'Более 50 000 наименований электронных компонентов в наличии и под заказ' },
    { title: 'Быстрая доставка', desc: 'Доставка по Москве за 1 день, по России — от 2 дней' },
    { title: 'Гарантия качества', desc: 'Только оригинальная продукция от официальных дистрибьюторов' },
    { title: 'Оперативность', desc: 'Обработка заказов в течение 2 часов, персональный менеджер' },
  ],
  'home.cta.title': 'Нужен подбор компонентов?',
  'home.cta.subtitle': 'Отправьте нам спецификацию или BOM-лист, и наши инженеры подберут оптимальные компоненты для вашего проекта.',

  // About page
  'about.hero.title': 'Надёжный поставщик электронных компонентов с 2011 года',
  'about.hero.text': 'Компания «ЭлектроОпт» специализируется на оптовых поставках электронных компонентов от ведущих мировых производителей. За 15 лет работы мы стали надёжным партнёром для более чем 2000 предприятий по всей России.',
  'about.stats.years': '15',
  'about.stats.yearsLabel': 'лет на рынке',
  'about.stats.clients': '2000+',
  'about.stats.clientsLabel': 'клиентов',
  'about.stats.products': '50 000+',
  'about.stats.productsLabel': 'наименований',
  'about.stats.brands': '200+',
  'about.stats.brandsLabel': 'брендов',
  'about.mission.title': 'Наша миссия',
  'about.mission.text': 'Обеспечивать предприятия электронной промышленности качественными компонентами по конкурентным ценам с минимальными сроками поставки. Мы стремимся быть не просто поставщиком, а технологическим партнёром, помогая клиентам оптимизировать закупки и находить лучшие решения для их проектов.',
  'about.competencies': [
    'Прямые контракты с производителями и авторизованными дистрибьюторами',
    'Техническая поддержка и помощь в подборе аналогов',
    'Собственный склад 5000 м² с системой управления запасами',
    'Оперативная логистика по всей России и СНГ',
    'Гибкие условия оплаты для постоянных клиентов',
    'Гарантия подлинности каждой поставки',
  ],
  'about.advantages': [
    { title: 'Оригинальная продукция', desc: 'Работаем только с официальными дистрибьюторами. Каждая партия проходит входной контроль качества.' },
    { title: 'Персональный менеджер', desc: 'За каждым клиентом закреплён персональный менеджер, знающий специфику вашего производства.' },
    { title: 'Подбор аналогов', desc: 'Помогаем найти замену дефицитным компонентам. Инженеры подберут оптимальный аналог.' },
    { title: 'Собственный склад', desc: 'Более 50 000 наименований в наличии на складе в Москве. Отгрузка в день заказа.' },
    { title: 'Доставка по всей России', desc: 'Собственная логистическая служба и партнёрство с транспортными компаниями.' },
    { title: 'Гибкие условия', desc: 'Отсрочка платежа, кредитные лимиты, индивидуальные условия для крупных заказов.' },
  ],
  'about.history': [
    { year: '2011', text: 'Основание компании. Начало работы на рынке электронных компонентов.' },
    { year: '2014', text: 'Открытие собственного склада. Подписание прямых контрактов с Yageo и Murata.' },
    { year: '2017', text: 'Расширение ассортимента до 20 000 наименований. Запуск онлайн-каталога.' },
    { year: '2019', text: 'Партнёрство с STMicroelectronics и Texas Instruments. Открытие филиала в Санкт-Петербурге.' },
    { year: '2022', text: 'Преодоление отметки в 1000 постоянных клиентов. Автоматизация складских процессов.' },
    { year: '2025', text: 'Обновление онлайн-платформы. Внедрение системы электронного документооборота.' },
  ],

  // Contacts
  'contacts.company.name': 'ООО «ЭлектроОпт»',
  'contacts.company.inn': '7712345678 / 771201001',
  'contacts.company.ogrn': '1157746123456',
  'contacts.company.address': '123456, г. Москва, ул. Электронная, д. 15, стр. 2',
  'contacts.phones': [
    { number: '+7 (495) 123-45-67', dept: 'Отдел продаж' },
    { number: '+7 (495) 123-45-68', dept: 'Бухгалтерия' },
    { number: '+7 (495) 123-45-69', dept: 'Склад' },
  ],
  'contacts.emails': [
    { email: 'info@electroopt.ru', dept: 'Общие вопросы' },
    { email: 'sales@electroopt.ru', dept: 'Отдел продаж' },
  ],
  'contacts.schedule': 'Пн-Пт: 9:00 - 18:00',
  'contacts.scheduleNote': 'Сб-Вс: выходной',
  'contacts.actualAddress': 'г. Москва, ул. Электронная, д. 15',
  'contacts.actualAddressNote': 'Офис и склад',

  // Header/Footer
  'header.companyName': 'ЭлектроОпт',
  'header.companyDesc': 'Электронные компоненты оптом',
  'header.phone': '+7 (495) 123-45-67',
  'header.email': 'info@electroopt.ru',
  'header.schedule': 'Пн-Пт: 9:00 - 18:00',

  // Footer
  'footer.description': 'Оптовые поставки электронных компонентов от ведущих мировых производителей. Более 50 000 наименований на складе.',
  'footer.copyright': '© 2026 ЭлектроОпт. Все права защищены.',

  // Delivery
  'delivery.title': 'Доставка',
  'delivery.methods.title': 'Способы доставки',
  'delivery.methods': [
    { title: 'Курьерская доставка по Москве', desc: '1 рабочий день, от 500₽' },
    { title: 'Самовывоз со склада', desc: 'бесплатно, г. Москва, ул. Электронная, д. 15' },
    { title: 'Транспортные компании', desc: 'СДЭК, Деловые Линии, ПЭК (2-7 дней)' },
    { title: 'Почта России', desc: 'для мелких отправлений' },
  ],
  'delivery.schedule.title': 'Сроки доставки',
  'delivery.schedule': [
    { region: 'Москва (в пределах МКАД)', time: '1 день' },
    { region: 'Московская область', time: '1-2 дня' },
    { region: 'Санкт-Петербург', time: '2-3 дня' },
    { region: 'Центральный ФО', time: '2-4 дня' },
    { region: 'Другие регионы', time: '3-7 дней' },
  ],
  'delivery.note': '* Товары «под заказ» — срок поставки от 7 до 30 дней в зависимости от производителя.',

  // Payment
  'payment.title': 'Оплата',
  'payment.methods.title': 'Способы оплаты',
  'payment.methods': [
    { title: 'Безналичный расчёт', desc: 'оплата по счёту для юридических лиц и ИП' },
    { title: 'Наличный расчёт', desc: 'при самовывозе со склада' },
    { title: 'Отсрочка платежа', desc: 'для постоянных клиентов (по согласованию)' },
  ],
  'payment.conditions.title': 'Условия',
  'payment.conditions': [
    'Минимальная сумма заказа: $100 (без НДС)',
    'Все цены указаны в долларах США без НДС',
    'НДС начисляется отдельно (20%)',
    'Отсрочка платежа до 30 дней для проверенных партнёров',
    'Кредитный лимит устанавливается индивидуально',
  ],

  // Documents
  'documents.title': 'Документы и реквизиты',
  'documents.requisites.title': 'Реквизиты компании',
  'documents.requisites': [
    { label: 'Наименование', value: 'ООО «ЭлектроОпт»' },
    { label: 'ИНН', value: '7712345678' },
    { label: 'КПП', value: '771201001' },
    { label: 'ОГРН', value: '1157746123456' },
    { label: 'Юр. адрес', value: '123456, г. Москва, ул. Электронная, д. 15, стр. 2' },
    { label: 'Р/с', value: '40702810900000012345' },
    { label: 'Банк', value: 'ПАО «Сбербанк»' },
    { label: 'БИК', value: '044525225' },
    { label: 'К/с', value: '30101810400000000225' },
  ],
  'documents.templates.title': 'Типовые документы',
  'documents.templates': [
    { id: 'contract', label: 'Договор поставки (шаблон)' },
    { id: 'card', label: 'Карточка предприятия' },
    { id: 'power-of-attorney', label: 'Доверенность на получение ТМЦ' },
    { id: 'specification', label: 'Спецификация (шаблон)' },
    { id: 'return', label: 'Заявка на возврат' },
  ],

  // Privacy
  'privacy.title': 'Политика конфиденциальности',
  'privacy.intro': 'Настоящая Политика конфиденциальности определяет порядок обработки и защиты персональных данных пользователей сайта electroopt.ru.',
  'privacy.sections': [
    { title: '1. Сбор информации', text: 'Мы собираем информацию, которую вы предоставляете при оформлении заказа, регистрации или обращении в службу поддержки: имя, email, телефон, название организации, адрес доставки.' },
    { title: '2. Использование информации', text: 'Собранная информация используется для: обработки заказов, связи с клиентами, улучшения качества обслуживания, рассылки информационных материалов (с согласия пользователя).' },
    { title: '3. Защита данных', text: 'Мы применяем технические и организационные меры для защиты персональных данных от несанкционированного доступа, изменения, раскрытия или уничтожения.' },
    { title: '4. Передача данных третьим лицам', text: 'Мы не передаём персональные данные третьим лицам, за исключением случаев, предусмотренных законодательством РФ, а также для выполнения заказов (транспортным компаниям).' },
    { title: '5. Контакты', text: 'По вопросам обработки персональных данных обращайтесь: info@electroopt.ru, +7 (495) 123-45-67' },
  ],

  // News
  'news.title': 'Новости',
  'news.items': [
    { id: '1', title: 'Расширение ассортимента микроконтроллеров STM32', date: '2026-01-15', excerpt: 'Мы добавили в каталог более 50 новых моделей микроконтроллеров STM32, включая серии H7 и U5.', content: 'Рады сообщить о значительном расширении ассортимента микроконтроллеров STM32. В каталог добавлены модели серий H7, U5 и G4, которые отличаются высокой производительностью и энергоэффективностью.' },
    { id: '2', title: 'Новые условия для постоянных клиентов', date: '2026-01-10', excerpt: 'С января 2026 года введена накопительная система скидок для постоянных партнёров.', content: 'С января 2026 года мы вводим новую программу лояльности для постоянных клиентов. Накопительные скидки от 5% до 15% в зависимости от объёма закупок.' },
    { id: '3', title: 'Открытие нового склада в Санкт-Петербурге', date: '2025-12-20', excerpt: 'Для ускорения доставки на Северо-Запад открыт новый складской комплекс.', content: 'Открыт новый складской комплекс в Санкт-Петербурге площадью 2000 кв.м. Это позволит сократить сроки доставки для клиентов Северо-Западного региона до 1 рабочего дня.' },
    { id: '4', title: 'Партнёрство с Infineon Technologies', date: '2025-12-15', excerpt: 'Подписан прямой контракт с Infineon, обеспечивающий лучшие цены на силовые компоненты.', content: 'Мы рады сообщить о подписании прямого контракта с Infineon Technologies. Это гарантирует нашим клиентам оригинальную продукцию по лучшим ценам.' },
    { id: '5', title: 'Обновление онлайн-каталога', date: '2025-12-01', excerpt: 'Запущена обновлённая версия каталога с расширенным поиском и фильтрацией.', content: 'Представляем обновлённую версию онлайн-каталога. Новые возможности: расширенный поиск по параметрам, сравнение товаров, быстрое формирование заявки из каталога.' },
  ],

  // Manufacturers
  'manufacturers.title': 'Производители',
  'manufacturers.items': [
    { id: '1', name: 'STMicroelectronics', logo: '🔵', country: 'Швейцария', website: 'https://www.st.com', description: 'Полупроводниковые компоненты и решения для электроники' },
    { id: '2', name: 'Texas Instruments', logo: '🔴', country: 'США', website: 'https://www.ti.com', description: 'Аналоговые и встраиваемые процессоры' },
    { id: '3', name: 'Infineon', logo: '🟢', country: 'Германия', website: 'https://www.infineon.com', description: 'Силовые полупроводники и системы безопасности' },
    { id: '4', name: 'Murata', logo: '🟡', country: 'Япония', website: 'https://www.murata.com', description: 'Электронные компоненты и модули связи' },
    { id: '5', name: 'Yageo', logo: '🟠', country: 'Тайвань', website: 'https://www.yageo.com', description: 'Пассивные компоненты: резисторы, конденсаторы' },
    { id: '6', name: 'Microchip', logo: '🟣', country: 'США', website: 'https://www.microchip.com', description: 'Микроконтроллеры, память и аналоговые ИС' },
    { id: '7', name: 'onsemi', logo: '⚪', country: 'США', website: 'https://www.onsemi.com', description: 'Силовые и сенсорные решения' },
    { id: '8', name: 'Vishay', logo: '🔵', country: 'США', website: 'https://www.vishay.com', description: 'Дискретные компоненты и пассивные элементы' },
    { id: '9', name: 'Molex', logo: '🟤', country: 'США', website: 'https://www.molex.com', description: 'Коннекторы и интерконнект-решения' },
    { id: '10', name: 'Winbond', logo: '⚫', country: 'Тайвань', website: 'https://www.winbond.com', description: 'Память и специализированные ИС' },
    { id: '11', name: 'IXYS', logo: '🔶', country: 'США', website: 'https://www.ixys.com', description: 'Силовые полупроводники и оптоэлектроника' },
    { id: '12', name: 'NXP', logo: '🔷', country: 'Нидерланды', website: 'https://www.nxp.com', description: 'Встраиваемые процессоры и IoT решения' },
  ],

  // Certificates (About page)
  'about.certificates.title': 'Сертификаты и лицензии',
  'about.certificates': [
    { title: 'Сертификат дистрибьютора ST', icon: '🏆' },
    { title: 'Авторизация Infineon', icon: '📜' },
    { title: 'ISO 9001:2015', icon: '✅' },
    { title: 'Сертификат TI', icon: '🎖' },
  ],

  // Cart texts
  'cart.title': 'Корзина / Оформление заявки',
  'cart.empty.title': 'Корзина пуста',
  'cart.empty.subtitle': 'Добавьте товары из каталога для оформления заявки',
  'cart.form.title': 'Данные для оформления заявки',
  'cart.summary.title': 'Итого',
  'cart.summary.items': 'Позиций:',
  'cart.summary.quantity': 'Общее кол-во:',
  'cart.summary.total': 'Сумма:',
  'cart.summary.note1': '• Цены указаны без НДС',
  'cart.summary.note2': '• Точная стоимость будет рассчитана менеджером',
  'cart.summary.note3': '• Минимальная сумма заказа: $100',
  'cart.success.title': 'Заявка отправлена!',
  'cart.success.subtitle': 'Ваша заявка принята. Менеджер свяжется с вами в течение 2 часов для подтверждения заказа.',

  // Account texts
  'account.login.title': 'Личный кабинет',
  'account.login.subtitle': 'Войдите для доступа к заказам и персональным условиям',
  'account.register.text': 'Нет аккаунта?',
  'account.register.link': 'Зарегистрироваться →',

  // Contacts quick actions
  'contacts.quickActions.callback': 'Заказать звонок',
  'contacts.quickActions.callbackDesc': 'Перезвоним за 5 минут',
  'contacts.quickActions.sales': 'Написать в отдел продаж',
  'contacts.quickActions.salesDesc': 'sales@electroopt.ru',
  'contacts.quickActions.quote': 'Запросить КП',
  'contacts.quickActions.quoteDesc': 'Ответ в течение 2 часов',
  'contacts.form.title': 'Обратная связь',
  'contacts.form.success': 'Сообщение отправлено!',
  'contacts.form.successText': 'Мы свяжемся с вами в ближайшее время.',
  'contacts.map.title': 'Схема проезда',

  // Header navigation
  'header.nav.catalog': 'Каталог',
  'header.nav.about': 'О компании',
  'header.nav.manufacturers': 'Производители',
  'header.nav.news': 'Новости',
  'header.nav.contacts': 'Контакты',
  'header.nav.account': 'Личный кабинет',
  'header.nav.delivery': 'Доставка',
  'header.nav.payment': 'Оплата',
  'header.nav.documents': 'Документы',

  // Product detail
  'product.characteristics': 'Характеристики',
  'product.datasheet': 'Скачать PDF-документацию (Datasheet)',
  'product.inStock': 'В наличии',
  'product.warehouse': 'Склад Москва',
  'product.deliveryLabel': 'Срок поставки:',
  'product.deliveryDays': 'дня',
  'product.deliveryRegion': 'По Москве и МО',
  'product.quantityLabel': 'Количество (шт)',
  'product.totalLabel': 'Сумма:',
  'product.addToCart': 'Добавить в корзину',
  'product.added': 'Добавлено!',
  'product.requestQuote': 'Запросить КП',
  'product.related': 'Похожие товары',

  // Footer
  'footer.catalog.title': 'Каталог',
  'footer.info.title': 'Информация',
  'footer.contacts.title': 'Контакты',

  // Images
  'home.hero.image': '',
  'about.hero.image': '',
};

// Admin password (in real app this would be server-side)
const ADMIN_PASSWORD = 'admin123';

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<ContentData>(() => {
    const saved = localStorage.getItem('site_content');
    return saved ? { ...defaultContent, ...JSON.parse(saved) } : defaultContent;
  });
  const [isAdmin, setIsAdmin] = useState(() => {
    return sessionStorage.getItem('admin_logged_in') === 'true';
  });
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    localStorage.setItem('site_content', JSON.stringify(content));
  }, [content]);

  useEffect(() => {
    if (isAdmin) {
      sessionStorage.setItem('admin_logged_in', 'true');
    } else {
      sessionStorage.removeItem('admin_logged_in');
      setIsEditMode(false);
    }
  }, [isAdmin]);

  const updateContent = (key: string, value: any) => {
    setContent(prev => ({ ...prev, [key]: value }));
  };

  const login = (password: string): boolean => {
    if (password === ADMIN_PASSWORD) {
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    setIsEditMode(false);
  };

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  return (
    <ContentContext.Provider value={{ content, updateContent, isAdmin, login, logout, isEditMode, toggleEditMode }}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const context = useContext(ContentContext);
  if (!context) throw new Error('useContent must be used within ContentProvider');
  return context;
}
