import React, { useRef } from 'react';
import { useContent } from '../context/ContentContext';
import { Image, Upload, X } from 'lucide-react';

interface EditableImageProps {
  contentKey: string;
  className?: string;
  alt?: string;
  placeholder?: React.ReactNode;
  defaultImage?: string;
}

export default function EditableImage({ 
  contentKey, 
  className = '', 
  alt = '',
  placeholder,
  defaultImage = ''
}: EditableImageProps) {
  const { content, updateContent, isAdmin, isEditMode } = useContent();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const imageSrc = content[contentKey] || defaultImage;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        updateContent(contentKey, result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    updateContent(contentKey, '');
  };

  const handleClick = () => {
    if (isAdmin && isEditMode && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className={`relative group ${className}`}>
      {imageSrc ? (
        <img 
          src={imageSrc} 
          alt={alt} 
          className={`w-full h-full object-cover ${isAdmin && isEditMode ? 'cursor-pointer' : ''}`}
          onClick={handleClick}
        />
      ) : (
        <div 
          className={`w-full h-full bg-slate-100 flex items-center justify-center ${isAdmin && isEditMode ? 'cursor-pointer hover:bg-slate-200' : ''}`}
          onClick={handleClick}
        >
          {placeholder || <Image size={48} className="text-slate-300" />}
        </div>
      )}
      
      {isAdmin && isEditMode && (
        <>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <div className="bg-white rounded-lg p-3 flex items-center gap-2">
              <Upload size={16} className="text-blue-600" />
              <span className="text-sm font-medium">Заменить изображение</span>
            </div>
          </div>
          {imageSrc && (
            <button
              onClick={handleRemoveImage}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
            >
              <X size={16} />
            </button>
          )}
        </>
      )}
    </div>
  );
}
