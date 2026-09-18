'use client';

import { CardItem } from './KanbanCard';
import KanbanCard from './KanbanCard';

interface KanbanBoardProps {
  cards: CardItem[];
  setCards: React.Dispatch<React.SetStateAction<CardItem[]>>;
}

export default function KanbanBoard({ cards, setCards }: KanbanBoardProps) {
  const updateContent = (id: string, content: string) => {
    setCards((prev) => prev.map((c) => (c.id === id ? { ...c, content } : c)));
  };

  const moveCard = (id: string, nextStatus: 'draft' | 'reviewed' | 'ready') => {
    setCards((prev) => prev.map((c) => (c.id === id ? { ...c, status: nextStatus } : c)));
  };

  const columns: { title: string; status: 'draft' | 'reviewed' | 'ready' }[] = [
    { title: '📝 Drafts', status: 'draft' },
    { title: '👀 In Review', status: 'reviewed' },
    { title: '🚀 Ready to Publish', status: 'ready' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
      {columns.map((col) => {
        const colCards = cards.filter((c) => c.status === col.status);
        return (
          <div key={col.status} className="bg-gray-100/70 p-4 rounded-2xl space-y-4">
            <div className="flex justify-between items-center font-bold text-gray-700 px-1">
              <h3>{col.title}</h3>
              <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full">
                {colCards.length}
              </span>
            </div>

            <div className="space-y-4">
              {colCards.map((card) => (
                <KanbanCard
                  key={card.id}
                  card={card}
                  onUpdateContent={updateContent}
                  onMove={moveCard}
                />
              ))}
              {colCards.length === 0 && (
                <div className="text-center py-8 text-xs text-gray-400 border-2 border-dashed border-gray-200 rounded-xl">
                  No posts here
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}