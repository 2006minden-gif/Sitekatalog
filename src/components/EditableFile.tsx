import React, { useRef, useState } from 'react';
import { useContent } from '../context/ContentContext';
import { Upload, Download, FileText, X, Trash2 } from 'lucide-react';

interface EditableFileProps {
  contentKey: string;
  label: string;
  className?: string;
}

interface FileData {
  name: string;
  data: string; // base64
  size: number;
  type: string;
  uploadedAt: string;
}

export default function EditableFile({ contentKey, label, className = '' }: EditableFileProps) {
  const { content, updateContent, isAdmin, isEditMode } = useContent();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const fileData: FileData | null = content[contentKey] || null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (max 5MB for localStorage)
    if (file.size > 5 * 1024 * 1024) {
      alert('Файл слишком большой. Максимум 5 МБ.');
      return;
    }

    setIsUploading(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      const newFileData: FileData = {
        name: file.name,
        data: result,
        size: file.size,
        type: file.type,
        uploadedAt: new Date().toISOString(),
      };
      updateContent(contentKey, newFileData);
      setIsUploading(false);
    };
    reader.readAsDataURL(file);

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemove = () => {
    if (confirm('Удалить файл?')) {
      updateContent(contentKey, null);
    }
  };

  const handleDownload = () => {
    if (!fileData) return;
    const link = document.createElement('a');
    link.href = fileData.data;
    link.download = fileData.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' Б';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' КБ';
    return (bytes / (1024 * 1024)).toFixed(1) + ' МБ';
  };

  // Admin edit mode
  if (isAdmin && isEditMode) {
    return (
      <div className={`${className} p-3 border-2 border-dashed border-blue-300 rounded-lg bg-blue-50`}>
        <div className="text-xs font-medium text-blue-700 mb-2">{label}</div>
        {fileData ? (
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <FileText size={16} className="text-blue-600 shrink-0" />
              <div className="min-w-0">
                <div className="text-sm font-medium text-slate-800 truncate">{fileData.name}</div>
                <div className="text-xs text-slate-500">{formatSize(fileData.size)}</div>
              </div>
            </div>
            <div className="flex gap-1 shrink-0">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="p-1.5 bg-blue-500 text-white rounded hover:bg-blue-600"
                title="Заменить файл"
              >
                <Upload size={14} />
              </button>
              <button
                onClick={handleRemove}
                className="p-1.5 bg-red-500 text-white rounded hover:bg-red-600"
                title="Удалить файл"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full py-2 text-sm text-blue-600 hover:text-blue-700 flex items-center justify-center gap-2"
          >
            <Upload size={16} />
            {isUploading ? 'Загрузка...' : 'Загрузить файл'}
          </button>
        )}
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileUpload}
          className="hidden"
          accept=".pdf,.doc,.docx,.xls,.xlsx,.zip,.rar"
        />
      </div>
    );
  }

  // View mode
  if (!fileData) {
    return null;
  }

  return (
    <div className={`${className} flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors`}>
      <div className="flex items-center gap-3 min-w-0">
        <FileText size={20} className="text-slate-400 shrink-0" />
        <div className="min-w-0">
          <div className="text-sm font-medium text-slate-700 truncate">{label}</div>
          <div className="text-xs text-slate-500">{fileData.name} • {formatSize(fileData.size)}</div>
        </div>
      </div>
      <button
        onClick={handleDownload}
        className="shrink-0 px-3 py-1.5 text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
      >
        <Download size={14} /> Скачать
      </button>
    </div>
  );
}
