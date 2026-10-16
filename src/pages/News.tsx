import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Calendar, ArrowLeft, BarChart3 } from 'lucide-react';
import { news } from '../data/products';

export function NewsList() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <Link to="/" className="hover:text-blue-600">Главная</Link>
        <span>/</span>
        <span className="text-slate-800">Новости</span>
      </nav>

      <h1 className="text-3xl font-bold text-slate-800 mb-8">Новости</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map(item => (
          <Link key={item.id} to={`/news/${item.id}`} className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow group">
            <div className="h-48 bg-gradient-to-br from-blue-100 to-slate-100 flex items-center justify-center">
              <BarChart3 size={48} className="text-blue-300" />
            </div>
            <div className="p-5">
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                <Calendar size={14} />
                {new Date(item.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}
              </div>
              <h3 className="font-semibold text-slate-800 group-hover:text-blue-600 transition-colors mb-2">{item.title}</h3>
              <p className="text-sm text-slate-600 line-clamp-3">{item.excerpt}</p>
              <div className="mt-4 text-sm text-blue-600 font-medium">Читать далее →</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export function NewsDetail() {
  const { id } = useParams();
  const article = news.find(n => n.id === id);

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
        <h1 className="text-3xl font-bold text-slate-800 mb-6">{article.title}</h1>
        <div className="prose prose-slate max-w-none">
          <p className="text-lg text-slate-600 leading-relaxed mb-4">{article.excerpt}</p>
          <p className="text-slate-600 leading-relaxed">{article.content}</p>
        </div>
      </article>
    </div>
  );
}
