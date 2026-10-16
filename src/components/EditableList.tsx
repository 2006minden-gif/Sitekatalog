import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { Edit3, Plus, Trash2, GripVertical, Save, X } from 'lucide-react';

interface EditableListProps {
  contentKey: string;
  renderItem: (item: any, index: number, isEditing: boolean, onChange: (value: any) => void) => React.ReactNode;
  defaultItem: any;
  className?: string;
  itemClassName?: string;
}

export default function EditableList({ 
  contentKey, 
  renderItem,
  defaultItem,
  className = '',
  itemClassName = ''
}: EditableListProps) {
  const { content, updateContent, isAdmin, isEditMode } = useContent();
  const items = content[contentKey] || [];
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState<any>(null);

  const handleAdd = () => {
    const newItems = [...items, defaultItem];
    updateContent(contentKey, newItems);
    setEditIndex(newItems.length - 1);
    setEditValue(defaultItem);
  };

  const handleDelete = (index: number) => {
    const newItems = items.filter((_item: any, i: number) => i !== index);
    updateContent(contentKey, newItems);
    setEditIndex(null);
  };

  const handleSave = () => {
    if (editIndex !== null && editValue !== null) {
      const newItems = [...items];
      newItems[editIndex] = editValue;
      updateContent(contentKey, newItems);
      setEditIndex(null);
      setEditValue(null);
    }
  };

  const handleCancel = () => {
    setEditIndex(null);
    setEditValue(null);
  };

  const handleEdit = (index: number) => {
    setEditIndex(index);
    setEditValue({ ...items[index] });
  };

  const handleItemChange = (value: any) => {
    setEditValue(value);
  };

  return (
    <div className={className}>
      {items.map((item: any, index: number) => (
        <div key={index} className={`relative ${itemClassName} ${isAdmin && isEditMode ? 'group' : ''}`}>
          {editIndex === index ? (
            <div className="border-2 border-blue-500 rounded-lg p-4 bg-blue-50">
              {renderItem(editValue, index, true, handleItemChange)}
              <div className="flex gap-2 mt-3">
                <button
                  onClick={handleSave}
                  className="px-3 py-1.5 bg-blue-600 text-white rounded text-sm flex items-center gap-1 hover:bg-blue-700"
                >
                  <Save size={14} /> Сохранить
                </button>
                <button
                  onClick={handleCancel}
                  className="px-3 py-1.5 bg-slate-200 text-slate-700 rounded text-sm flex items-center gap-1 hover:bg-slate-300"
                >
                  <X size={14} /> Отмена
                </button>
              </div>
            </div>
          ) : (
            <>
              {renderItem(item, index, false, () => {})}
              {isAdmin && isEditMode && (
                <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleEdit(index)}
                    className="p-1.5 bg-blue-500 text-white rounded hover:bg-blue-600"
                    title="Редактировать"
                  >
                    <Edit3 size={14} />
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="p-1.5 bg-red-500 text-white rounded hover:bg-red-600"
                    title="Удалить"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      ))}
      {isAdmin && isEditMode && (
        <button
          onClick={handleAdd}
          className="w-full py-3 border-2 border-dashed border-blue-300 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
        >
          <Plus size={18} /> Добавить элемент
        </button>
      )}
    </div>
  );
}
