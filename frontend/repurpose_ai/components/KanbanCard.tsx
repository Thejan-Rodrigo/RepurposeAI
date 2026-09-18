'use client';

import { useState } from 'react';
import CopyButton from './CopyButton';

export interface CardItem {
  id: string;
  platform: 'Twitter Thread' | 'LinkedIn Post' | 'Newsletter Summary';
  content: string;
  status: 'draft' | 'reviewed' | 'ready';
}

interface KanbanCardProps {
  card: CardItem;
  onUpdateContent: (id: string, content: string) => void;
  onMove: (id: string, nextStatus: 'draft' | 'reviewed' | 'ready') => void;
}

export default function KanbanCard({ card, onUpdateContent, onMove }: KanbanCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(card.content);

  const handleBlur = () => {
    setIsEditing(false);
    onUpdateContent(card.id, text);
  };

  return (
    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm space-y-3">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
          {card.platform}
        </span>
        <CopyButton text={text} />
      </div>

      {isEditing ? (
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onBlur={handleBlur}
          autoFocus
          rows={6}
          className="w-full text-sm p-2 border border-blue-400 rounded-lg focus:outline-none"
        />
      ) : (
        <div
          onClick={() => setIsEditing(true)}
          className="text-sm text-gray-800 whitespace-pre-wrap hover:bg-gray-50 p-2 rounded cursor-pointer border border-transparent hover:border-gray-200 transition"
        >
          {text}
        </div>
      )}

      {/* Workflow Controls */}
      <div className="flex justify-between items-center pt-2 border-t border-gray-100 text-xs">
        {card.status !== 'draft' && (
          <button
            onClick={() => onMove(card.id, card.status === 'ready' ? 'reviewed' : 'draft')}
            className="text-gray-500 hover:text-gray-800"
          >
            ← Move Back
          </button>
        )}
        <div className="flex-1" />
        {card.status !== 'ready' && (
          <button
            onClick={() => onMove(card.id, card.status === 'draft' ? 'reviewed' : 'ready')}
            className="font-semibold text-blue-600 hover:text-blue-800"
          >
            Advance →
          </button>
        )}
      </div>
    </div>
  );
}