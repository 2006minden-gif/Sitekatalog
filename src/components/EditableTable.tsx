import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { Edit3, Plus, Trash2, Save, X } from 'lucide-react';

interface EditableTableProps {
  contentKey: string;
  columns: { key: string; label: string; type?: 'text' | 'number' }[];
  className?: string;
}

export default function EditableTable({ contentKey, columns, className = '' }: EditableTableProps) {
  const { content, updateContent, isAdmin, isEditMode } = useContent();
  const rows = content[contentKey] || [];
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editRow, setEditRow] = useState<any>(null);

  const handleAdd = () => {
    const newRow = columns.reduce((acc, col) => {
      acc[col.key] = '';
      return acc;
    }, {} as any);
    const newRows = [...rows, newRow];
    updateContent(contentKey, newRows);
    setEditIndex(newRows.length - 1);
    setEditRow(newRow);
  };

  const handleDelete = (index: number) => {
    const newRows = rows.filter((_row: any, i: number) => i !== index);
    updateContent(contentKey, newRows);
    setEditIndex(null);
  };

  const handleSave = () => {
    if (editIndex !== null && editRow !== null) {
      const newRows = [...rows];
      newRows[editIndex] = editRow;
      updateContent(contentKey, newRows);
      setEditIndex(null);
      setEditRow(null);
    }
  };

  const handleCancel = () => {
    setEditIndex(null);
    setEditRow(null);
  };

  const handleEdit = (index: number) => {
    setEditIndex(index);
    setEditRow({ ...rows[index] });
  };

  return (
    <div className={className}>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              {columns.map(col => (
                <th key={col.key} className="text-left py-3 px-4 font-medium text-slate-600">
                  {col.label}
                </th>
              ))}
              {isAdmin && isEditMode && (
                <th className="py-3 px-4 w-20"></th>
              )}
            </tr>
          </thead>
          <tbody>
            {rows.map((row: any, index: number) => (
              <tr key={index} className="border-b border-slate-100 hover:bg-slate-50 group">
                {columns.map(col => (
                  <td key={col.key} className="py-3 px-4">
                    {editIndex === index ? (
                      <input
                        type={col.type || 'text'}
                        value={editRow[col.key] || ''}
                        onChange={(e) => setEditRow({ ...editRow, [col.key]: e.target.value })}
                        className="w-full px-2 py-1 border border-blue-300 rounded"
                      />
                    ) : (
                      row[col.key]
                    )}
                  </td>
                ))}
                {isAdmin && isEditMode && (
                  <td className="py-3 px-4">
                    {editIndex === index ? (
                      <div className="flex gap-1">
                        <button
                          onClick={handleSave}
                          className="p-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                          title="Сохранить"
                        >
                          <Save size={14} />
                        </button>
                        <button
                          onClick={handleCancel}
                          className="p-1 bg-slate-300 text-slate-700 rounded hover:bg-slate-400"
                          title="Отмена"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ) : (
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleEdit(index)}
                          className="p-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                          title="Редактировать"
                        >
                          <Edit3 size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(index)}
                          className="p-1 bg-red-500 text-white rounded hover:bg-red-600"
                          title="Удалить"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isAdmin && isEditMode && (
        <button
          onClick={handleAdd}
          className="mt-4 w-full py-2 border-2 border-dashed border-blue-300 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
        >
          <Plus size={16} /> Добавить строку
        </button>
      )}
    </div>
  );
}
