import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Calendar, ArrowLeft, BarChart3 } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import EditableText from '../components/EditableText';
import EditableList from '../components/EditableList';

export function NewsList() {
  const { content, isAdmin, isEditMode } = useContent();
  const newsItems = content['news.items'] || [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <Link to="/" className="hover:text-blue-600">Главная</Link>
        <span>/</span>
        <span className="text-slate-800">Новости</span>
      </nav>

      <EditableText contentKey="news.title" as="h1" className="text-3xl font-bold text-slate-800 mb-8 block" defaultValue="Новости" />

      <EditableList
        contentKey="news.items"
        defaultItem={{ id: Date.now().toString(), title: 'Новая новость', date: new Date().toISOString().split('T')[0], excerpt: 'Краткое описание', content: 'Полный текст новости' }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        renderItem={(item, index, isEditing, onChange) => (
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow group">
            <div className="h-48 bg-gradient-to-br from-blue-100 to-slate-100 flex items-center justify-center">
              <BarChart3 size={48} className="text-blue-300" />
            </div>
            <div className="p-5">
              {isEditing ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => onChange({ ...item, title: e.target.value })}
                    className="w-full px-2 py-1 border border-blue-300 rounded font-semibold"
                    placeholder="Заголовок"
                  />
                  <input
                    type="date"
                    value={item.date}
                    onChange={(e) => onChange({ ...item, date: e.target.value })}
                    className="w-full px-2 py-1 border border-blue-300 rounded text-sm"
                  />
                  <textarea
                    value={item.excerpt}
                    onChange={(e) => onChange({ ...item, excerpt: e.target.value })}
                    className="w-full px-2 py-1 border border-blue-300 rounded text-sm"
                    rows={2}
                    placeholder="Краткое описание"
                  />
                  <textarea
                    value={item.content}
                    onChange={(e) => onChange({ ...item, content: e.target.value })}
                    className="w-full px-2 py-1 border border-blue-300 rounded text-sm"
                    rows={3}
                    placeholder="Полный текст"
                  />
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                    <Calendar size={14} />
                    {new Date(item.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </div>
                  <h3 className="font-semibold text-slate-800 group-hover:text-blue-600 transition-colors mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-600 line-clamp-3">{item.excerpt}</p>
                  <Link to={`/news/${item.id}`} className="mt-4 text-sm text-blue-600 font-medium inline-block">Читать далее →</Link>
                </>
              )}
            </div>
          </div>
        )}
      />
    </div>
  );
}

export function NewsDetail() {
  const { id } = useParams();
  const { content, isAdmin, isEditMode, updateContent } = useContent();
  const newsItems = content['news.items'] || [];
  const article = newsItems.find((n: any) => n.id === id);

  if (!article) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-slate-800 mb-4">Новость не найдена</h1>
        <Link to="/news" className="text-blue-600 hover:text-blue-700">← Вернуться к новостям</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <Link to="/" className="hover:text-blue-600">Главная</Link>
        <span>/</span>
        <Link to="/news" className="hover:text-blue-600">Новости</Link>
        <span>/</span>
        <span className="text-slate-800">{article.title}</span>
      </nav>

      <Link to="/news" className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 mb-6">
        <ArrowLeft size={16} /> Все новости
      </Link>

      <article>
        <div className="h-64 bg-gradient-to-br from-blue-100 to-slate-100 rounded-2xl flex items-center justify-center mb-8">
          <BarChart3 size={64} className="text-blue-300" />
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
          <Calendar size={14} />
          {new Date(article.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}
        </div>
        <EditableText 
          contentKey={`news.item.${id}.title`}
          as="h1" 
          className="text-3xl font-bold text-slate-800 mb-6 block"
          defaultValue={article.title}
        />
        <div className="prose prose-slate max-w-none">
          <EditableText 
            contentKey={`news.item.${id}.excerpt`}
            as="p" 
            className="text-lg text-slate-600 leading-relaxed mb-4 block"
            multiline
            defaultValue={article.excerpt}
          />
          <EditableText 
            contentKey={`news.item.${id}.content`}
            as="p" 
            className="text-slate-600 leading-relaxed block"
            multiline
            defaultValue={article.content}
          />
        </div>
      </article>
    </div>
  );
}
