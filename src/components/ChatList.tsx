'use client';

import { ChatSession } from '@/types/chat';
import { formatDate } from '@/lib/parser';

interface ChatListProps {
  sessions: ChatSession[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  searchQuery: string;
}

export default function ChatList({ sessions, selectedId, onSelect, searchQuery }: ChatListProps) {
  const filtered = sessions.filter(s =>
    s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.participants.some(p => p.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (filtered.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-slate-400 dark:text-slate-500 px-4">
        <svg className="w-12 h-12 mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        <p className="text-sm">{searchQuery ? 'Tidak ada chat yang cocok' : 'Belum ada history chat'}</p>
        <p className="text-xs mt-1">Tambah chat baru untuk mulai</p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-slate-100 dark:divide-slate-700">
      {filtered.map(session => (
        <button
          key={session.id}
          onClick={() => onSelect(session.id)}
          className={`w-full text-left p-4 transition-colors hover:bg-slate-50 dark:hover:bg-slate-700/50 ${
            selectedId === session.id
              ? 'bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500'
              : 'border-l-4 border-transparent'
          }`}
        >
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-slate-900 dark:text-white truncate">{session.title}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                {session.participants.length} orang &middot; {session.messageCount} pesan
              </p>
            </div>
            <span className="text-xs text-slate-400 dark:text-slate-500 shrink-0">
              {formatDate(session.updatedAt)}
            </span>
          </div>
          {session.messages.length > 0 && (
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 truncate">
              {session.messages[session.messages.length - 1].content.substring(0, 60)}
              {session.messages[session.messages.length - 1].content.length > 60 ? '...' : ''}
            </p>
          )}
        </button>
      ))}
    </div>
  );
}
