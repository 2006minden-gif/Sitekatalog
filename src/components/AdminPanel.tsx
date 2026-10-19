import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useContent } from '../context/ContentContext';
import { Settings, Edit3, Eye, LogOut, X, ChevronDown, ChevronUp, Package } from 'lucide-react';

export default function AdminPanel() {
  const { isAdmin, isEditMode, toggleEditMode, logout } = useContent();
  const [isExpanded, setIsExpanded] = useState(true);

  if (!isAdmin) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[100]">
      {isExpanded ? (
        <div className="bg-white rounded-xl shadow-2xl border border-slate-200 p-4 w-72">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Settings size={18} className="text-blue-600" />
              <span className="font-semibold text-slate-800">Админ-панель</span>
            </div>
            <button
              onClick={() => setIsExpanded(false)}
              className="p-1 hover:bg-slate-100 rounded"
            >
              <ChevronDown size={16} />
            </button>
          </div>

          <div className="space-y-2">
            <button
              onClick={toggleEditMode}
              className={`w-full py-2.5 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors ${
                isEditMode 
                  ? 'bg-green-600 text-white hover:bg-green-700' 
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {isEditMode ? (
                <>
                  <Eye size={16} /> Режим просмотра
                </>
              ) : (
                <>
                  <Edit3 size={16} /> Режим редактирования
                </>
              )}
            </button>

            {isEditMode && (
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-xs text-green-800">
                  <strong>Режим редактирования активен</strong><br />
                  Кликайте на текст, изображения и таблицы для редактирования. 
                  Все изменения сохраняются автоматически.
                </p>
              </div>
            )}

            <Link
              to="/admin/catalog"
              className="w-full py-2.5 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
            >
              <Package size={16} /> Управление каталогом
            </Link>

            <button
              onClick={logout}
              className="w-full py-2.5 bg-red-50 text-red-600 rounded-lg font-medium hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
            >
              <LogOut size={16} /> Выйти
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsExpanded(true)}
          className="bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition-colors"
          title="Админ-панель"
        >
          <Settings size={24} />
        </button>
      )}
    </div>
  );
}
