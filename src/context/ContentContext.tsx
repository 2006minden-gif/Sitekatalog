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
