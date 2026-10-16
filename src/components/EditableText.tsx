import React, { useState, useRef, useEffect } from 'react';
import { useContent } from '../context/ContentContext';
import { Edit3 } from 'lucide-react';

interface EditableTextProps {
  contentKey: string;
  as?: 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'div' | 'a' | 'li';
  className?: string;
  multiline?: boolean;
  defaultValue?: string;
}

export default function EditableText({ 
  contentKey, 
  as: Tag = 'span', 
  className = '', 
  multiline = false,
  defaultValue = '' 
}: EditableTextProps) {
  const { content, updateContent, isAdmin, isEditMode } = useContent();
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState('');
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  const value = content[contentKey] ?? defaultValue;

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleClick = () => {
    if (isAdmin && isEditMode) {
      setEditValue(value);
      setIsEditing(true);
    }
  };

  const handleSave = () => {
    updateContent(contentKey, editValue);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !multiline) {
      handleSave();
    }
    if (e.key === 'Escape') {
      setIsEditing(false);
    }
  };

  if (isEditing) {
    if (multiline) {
      return (
        <textarea
          ref={inputRef as React.RefObject<HTMLTextAreaElement>}
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          className={`${className} w-full p-2 border-2 border-blue-500 rounded bg-white resize-none`}
          rows={4}
        />
      );
    }
    return (
      <input
        ref={inputRef as React.RefObject<HTMLInputElement>}
        type="text"
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
        onBlur={handleSave}
        onKeyDown={handleKeyDown}
        className={`${className} w-full p-1 border-2 border-blue-500 rounded bg-white`}
      />
    );
  }

  return (
    <Tag 
      className={`${className} relative group ${isAdmin && isEditMode ? 'cursor-pointer hover:outline hover:outline-2 hover:outline-blue-400 hover:outline-offset-2 rounded' : ''}`}
      onClick={handleClick}
    >
      {value}
      {isAdmin && isEditMode && (
        <span className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
          <Edit3 size={12} />
        </span>
      )}
    </Tag>
  );
}
