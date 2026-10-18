import React from 'react';
import { Link } from 'react-router-dom';
import { Truck, Clock, MapPin, Package } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import EditableText from '../components/EditableText';
import EditableList from '../components/EditableList';
import EditableTable from '../components/EditableTable';
import EditableFile from '../components/EditableFile';

export function Delivery() {
  const { isAdmin, isEditMode } = useContent();
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <Link to="/" className="hover:text-blue-600">Главная</Link><span>/</span>
        <span className="text-slate-800">Доставка</span>
      </nav>
      <EditableText contentKey="delivery.title" as="h1" className="text-3xl font-bold text-slate-800 mb-8 block" defaultValue="Доставка" />
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <EditableText 
            contentKey="delivery.methods.title" 
            as="h2" 
            className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2"
            defaultValue="Способы доставки"
          />
          <EditableList
            contentKey="delivery.methods"
            defaultItem={{ title: 'Новый способ', desc: 'Описание' }}
            className="space-y-3 text-slate-600"
            renderItem={(item, index, isEditing, onChange) => (
              <li className="flex items-start gap-2">
                <Package size={16} className="mt-1 text-blue-600 shrink-0" />
                {isEditing ? (
                  <div className="flex-1 space-y-2">
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => onChange({ ...item, title: e.target.value })}
                      className="w-full px-2 py-1 border border-blue-300 rounded font-medium"
                    />
                    <input
                      type="text"
                      value={item.desc}
                      onChange={(e) => onChange({ ...item, desc: e.target.value })}
                      className="w-full px-2 py-1 border border-blue-300 rounded text-sm"
                    />
                  </div>
                ) : (
                  <div><strong>{item.title}</strong> — {item.desc}</div>
                )}
              </li>
            )}
          />
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <EditableText 
            contentKey="delivery.schedule.title" 
            as="h2" 
            className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2"
            defaultValue="Сроки доставки"
          />
          <EditableTable
            contentKey="delivery.schedule"
            columns={[
              { key: 'region', label: 'Регион' },
              { key: 'time', label: 'Срок' },
            ]}
            className="text-sm"
          />
          <EditableText 
            contentKey="delivery.note" 
            as="p" 
            className="text-xs text-slate-500 mt-4 block"
            defaultValue="* Товары «под заказ» — срок поставки от 7 до 30 дней в зависимости от производителя."
          />
        </div>
      </div>
    </div>
  );
}

export function Payment() {
  const { isAdmin, isEditMode } = useContent();
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <Link to="/" className="hover:text-blue-600">Главная</Link><span>/</span>
        <span className="text-slate-800">Оплата</span>
      </nav>
      <EditableText contentKey="payment.title" as="h1" className="text-3xl font-bold text-slate-800 mb-8 block" defaultValue="Оплата" />
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <EditableText 
            contentKey="payment.methods.title" 
            as="h2" 
            className="text-xl font-semibold text-slate-800 mb-4 block"
            defaultValue="Способы оплаты"
          />
          <EditableList
            contentKey="payment.methods"
            defaultItem={{ title: 'Новый способ', desc: 'Описание' }}
            className="space-y-3 text-slate-600"
            renderItem={(item, index, isEditing, onChange) => (
              <li>
                {isEditing ? (
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => onChange({ ...item, title: e.target.value })}
                      className="w-full px-2 py-1 border border-blue-300 rounded font-medium"
                    />
                    <input
                      type="text"
                      value={item.desc}
                      onChange={(e) => onChange({ ...item, desc: e.target.value })}
                      className="w-full px-2 py-1 border border-blue-300 rounded text-sm"
                    />
                  </div>
                ) : (
                  <><strong>{item.title}</strong> — {item.desc}</>
                )}
              </li>
            )}
          />
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <EditableText 
            contentKey="payment.conditions.title" 
            as="h2" 
            className="text-xl font-semibold text-slate-800 mb-4 block"
            defaultValue="Условия"
          />
          <EditableList
            contentKey="payment.conditions"
            defaultItem="Новое условие"
            className="space-y-3 text-slate-600"
            renderItem={(item, index, isEditing, onChange) => (
              <li>
                {isEditing ? (
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full px-2 py-1 border border-blue-300 rounded"
                  />
                ) : (
                  <>• {item}</>
                )}
              </li>
            )}
          />
        </div>
      </div>
    </div>
  );
}

function DocumentsList() {
  const { content, updateContent, isAdmin, isEditMode } = useContent();
  const templates = content['documents.templates'] || [];

  const handleAdd = () => {
    const newDoc = { id: `doc-${Date.now()}`, label: 'Новый документ' };
    updateContent('documents.templates', [...templates, newDoc]);
  };

  const handleDelete = (id: string) => {
    updateContent('documents.templates', templates.filter((t: any) => t.id !== id));
  };

  const handleLabelChange = (id: string, newLabel: string) => {
    updateContent('documents.templates', templates.map((t: any) => 
      t.id === id ? { ...t, label: newLabel } : t
    ));
  };

  return (
    <div>
      <div className="space-y-3">
        {templates.map((doc: any) => (
          <div key={doc.id} className="relative group">
            <EditableFile
              contentKey={`documents.file.${doc.id}`}
              label={doc.label}
              className=""
            />
            {isAdmin && isEditMode && (
              <div className="flex gap-1 mt-2">
                <input
                  type="text"
                  value={doc.label}
                  onChange={(e) => handleLabelChange(doc.id, e.target.value)}
                  className="flex-1 px-2 py-1 border border-blue-300 rounded text-sm"
                  placeholder="Название документа"
                />
                <button
                  onClick={() => handleDelete(doc.id)}
                  className="px-2 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                >
                  Удалить
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
      {isAdmin && isEditMode && (
        <button
          onClick={handleAdd}
          className="mt-4 w-full py-2 border-2 border-dashed border-blue-300 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors text-sm"
        >
          + Добавить документ
        </button>
      )}
    </div>
  );
}

export function Documents() {
  const { isAdmin, isEditMode } = useContent();
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <Link to="/" className="hover:text-blue-600">Главная</Link><span>/</span>
        <span className="text-slate-800">Документы</span>
      </nav>
      <EditableText contentKey="documents.title" as="h1" className="text-3xl font-bold text-slate-800 mb-8 block" defaultValue="Документы и реквизиты" />
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <EditableText 
            contentKey="documents.requisites.title" 
            as="h2" 
            className="text-xl font-semibold text-slate-800 mb-4 block"
            defaultValue="Реквизиты компании"
          />
          <EditableTable
            contentKey="documents.requisites"
            columns={[
              { key: 'label', label: 'Параметр' },
              { key: 'value', label: 'Значение' },
            ]}
            className="text-sm"
          />
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <EditableText 
            contentKey="documents.templates.title" 
            as="h2" 
            className="text-xl font-semibold text-slate-800 mb-4 block"
            defaultValue="Типовые документы"
          />
          <DocumentsList />
        </div>
      </div>
    </div>
  );
}

export function Privacy() {
  const { isAdmin, isEditMode } = useContent();
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <Link to="/" className="hover:text-blue-600">Главная</Link><span>/</span>
        <span className="text-slate-800">Политика конфиденциальности</span>
      </nav>
      <EditableText contentKey="privacy.title" as="h1" className="text-3xl font-bold text-slate-800 mb-8 block" defaultValue="Политика конфиденциальности" />
      <div className="bg-white rounded-xl border border-slate-200 p-8 prose prose-slate max-w-none">
        <EditableText 
          contentKey="privacy.intro" 
          as="p" 
          className="text-slate-600 block mb-6"
          multiline
          defaultValue="Настоящая Политика конфиденциальности определяет порядок обработки и защиты персональных данных пользователей сайта electroopt.ru."
        />
        <EditableList
          contentKey="privacy.sections"
          defaultItem={{ title: 'Новый раздел', text: 'Текст раздела' }}
          className="space-y-6"
          renderItem={(item, index, isEditing, onChange) => (
            <div>
              {isEditing ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => onChange({ ...item, title: e.target.value })}
                    className="w-full px-2 py-1 border border-blue-300 rounded text-lg font-semibold"
                  />
                  <textarea
                    value={item.text}
                    onChange={(e) => onChange({ ...item, text: e.target.value })}
                    className="w-full px-2 py-1 border border-blue-300 rounded text-slate-600"
                    rows={3}
                  />
                </div>
              ) : (
                <>
                  <h3 className="text-lg font-semibold text-slate-800 mb-3">{item.title}</h3>
                  <p className="text-slate-600">{item.text}</p>
                </>
              )}
            </div>
          )}
        />
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
