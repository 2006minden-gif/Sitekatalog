import React from 'react';
import { Link } from 'react-router-dom';
import { Award, Users, Target, CheckCircle, Building2, Globe } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import EditableText from '../components/EditableText';
import EditableList from '../components/EditableList';

export default function About() {
  const { content, isAdmin, isEditMode } = useContent();
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
            <EditableText 
              contentKey="about.hero.title" 
              as="h2" 
              className="text-2xl font-bold mb-4 block" 
            />
            <EditableText 
              contentKey="about.hero.text" 
              as="p" 
              className="text-blue-100 leading-relaxed block" 
              multiline 
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <EditableText contentKey="about.stats.years" as="div" className="text-3xl font-bold" />
              <EditableText contentKey="about.stats.yearsLabel" as="div" className="text-sm text-blue-200" />
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <EditableText contentKey="about.stats.clients" as="div" className="text-3xl font-bold" />
              <EditableText contentKey="about.stats.clientsLabel" as="div" className="text-sm text-blue-200" />
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <EditableText contentKey="about.stats.products" as="div" className="text-3xl font-bold" />
              <EditableText contentKey="about.stats.productsLabel" as="div" className="text-sm text-blue-200" />
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <EditableText contentKey="about.stats.brands" as="div" className="text-3xl font-bold" />
              <EditableText contentKey="about.stats.brandsLabel" as="div" className="text-sm text-blue-200" />
            </div>
          </div>
        </div>
      </div>

      {/* Mission */}
      <div className="grid lg:grid-cols-2 gap-12 mb-12">
        <div>
          <EditableText 
            contentKey="about.mission.title" 
            as="h2" 
            className="text-2xl font-bold text-slate-800 mb-4 block" 
          />
          <EditableText 
            contentKey="about.mission.text" 
            as="p" 
            className="text-slate-600 leading-relaxed block" 
            multiline 
          />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Ключевые компетенции</h2>
          <EditableList
            contentKey="about.competencies"
            defaultItem="Новый пункт компетенции"
            className="space-y-3"
            renderItem={(item, index, isEditing, onChange) => (
              <li className="flex items-start gap-3">
                <CheckCircle size={20} className="text-green-600 shrink-0 mt-0.5" />
                {isEditing ? (
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => onChange(e.target.value)}
                    className="flex-1 px-2 py-1 border border-blue-300 rounded text-slate-600"
                  />
                ) : (
                  <span className="text-slate-600">{item}</span>
                )}
              </li>
            )}
          />
        </div>
      </div>

      {/* Advantages */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-slate-800 mb-8 text-center">Преимущества работы с нами</h2>
        <EditableList
          contentKey="about.advantages"
          defaultItem={{ title: 'Новое преимущество', desc: 'Описание преимущества' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          renderItem={(item, index, isEditing, onChange) => {
            const icons = [Award, Users, Target, Building2, Globe, CheckCircle];
            const Icon = icons[index % icons.length];
            return (
              <div className="bg-white p-6 rounded-xl border border-slate-200 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Icon size={24} className="text-blue-600" />
                </div>
                {isEditing ? (
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => onChange({ ...item, title: e.target.value })}
                      className="w-full px-2 py-1 border border-blue-300 rounded font-semibold"
                      placeholder="Заголовок"
                    />
                    <textarea
                      value={item.desc}
                      onChange={(e) => onChange({ ...item, desc: e.target.value })}
                      className="w-full px-2 py-1 border border-blue-300 rounded text-sm"
                      rows={3}
                      placeholder="Описание"
                    />
                  </div>
                ) : (
                  <>
                    <h3 className="font-semibold text-slate-800 mb-2">{item.title}</h3>
                    <p className="text-sm text-slate-600">{item.desc}</p>
                  </>
                )}
              </div>
            );
          }}
        />
      </div>

      {/* History */}
      <div className="bg-slate-50 rounded-2xl p-8 mb-12">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">История компании</h2>
        <EditableList
          contentKey="about.history"
          defaultItem={{ year: '2026', text: 'Новое событие в истории компании' }}
          className="space-y-6"
          renderItem={(item, index, isEditing, onChange) => (
            <div className="flex gap-4">
              <div className="shrink-0 w-16 text-right">
                {isEditing ? (
                  <input
                    type="text"
                    value={item.year}
                    onChange={(e) => onChange({ ...item, year: e.target.value })}
                    className="w-full px-1 py-0.5 border border-blue-300 rounded text-blue-600 font-bold text-center"
                  />
                ) : (
                  <span className="text-blue-600 font-bold">{item.year}</span>
                )}
              </div>
              <div className="border-l-2 border-blue-200 pl-4 pb-4 flex-1">
                {isEditing ? (
                  <textarea
                    value={item.text}
                    onChange={(e) => onChange({ ...item, text: e.target.value })}
                    className="w-full px-2 py-1 border border-blue-300 rounded text-slate-600"
                    rows={2}
                  />
                ) : (
                  <p className="text-slate-600">{item.text}</p>
                )}
              </div>
            </div>
          )}
        />
      </div>

      {/* Certificates */}
      <div className="mb-12">
        <EditableText 
          contentKey="about.certificates.title" 
          as="h2" 
          className="text-2xl font-bold text-slate-800 mb-6 block"
          defaultValue="Сертификаты и лицензии"
        />
        <EditableList
          contentKey="about.certificates"
          defaultItem={{ title: 'Новый сертификат', icon: '🏆' }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
          renderItem={(item, index, isEditing, onChange) => (
            <div className="bg-white border border-slate-200 rounded-xl p-6 text-center hover:shadow-md transition-shadow">
              {isEditing ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={item.icon}
                    onChange={(e) => onChange({ ...item, icon: e.target.value })}
                    className="w-full text-4xl text-center px-2 py-1 border border-blue-300 rounded"
                    placeholder="🏆"
                  />
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => onChange({ ...item, title: e.target.value })}
                    className="w-full px-2 py-1 border border-blue-300 rounded text-sm"
                    placeholder="Название сертификата"
                  />
                </div>
              ) : (
                <>
                  <div className="text-4xl mb-3">{item.icon}</div>
                  <div className="text-sm font-medium text-slate-700">{item.title}</div>
                </>
              )}
            </div>
          )}
        />
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
