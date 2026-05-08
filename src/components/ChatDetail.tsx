'use client';

import { useState, useMemo } from 'react';
import { ChatSession, ChatFilter } from '@/types/chat';
import { formatDateTime, formatDate } from '@/lib/parser';

interface ChatDetailProps {
  session: ChatSession;
  onBack?: () => void;
}

export default function ChatDetail({ session, onBack }: ChatDetailProps) {
  const [filter, setFilter] = useState<ChatFilter>({ search: '', sender: '', dateFrom: '', dateTo: '' });
  const [showFilters, setShowFilters] = useState(false);

  const senders = useMemo(() => {
    const set = new Set(session.messages.map(m => m.sender));
    return Array.from(set).sort();
  }, [session]);

  const filteredMessages = useMemo(() => {
    return session.messages.filter(m => {
      if (filter.search && !m.content.toLowerCase().includes(filter.search.toLowerCase()) && !m.sender.toLowerCase().includes(filter.search.toLowerCase())) return false;
      if (filter.sender && m.sender !== filter.sender) return false;
      if (filter.dateFrom && new Date(m.timestamp) < new Date(filter.dateFrom)) return false;
      if (filter.dateTo && new Date(m.timestamp) > new Date(filter.dateTo + 'T23:59:59')) return false;
      return true;
    });
  }, [session.messages, filter]);

  const groupedMessages = useMemo(() => {
    const groups: { date: string; messages: typeof filteredMessages }[] = [];
    let currentGroup: typeof groups[0] | null = null;

    for (const msg of filteredMessages) {
      const dateStr = formatDate(msg.timestamp);
      if (!currentGroup || currentGroup.date !== dateStr) {
        currentGroup = { date: dateStr, messages: [] };
        groups.push(currentGroup);
      }
      currentGroup.messages.push(msg);
    }
    return groups;
  }, [filteredMessages]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'image': return '📷 Foto';
      case 'document': return '📄 Dokumen';
      case 'audio': return '🎵 Audio';
      case 'video': return '🎬 Video';
      case 'deleted': return '🗑️ Pesan dihapus';
      case 'system': return '⚙️ Sistem';
      default: return null;
    }
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-900">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-700 p-4">
        <div className="flex items-center gap-3">
          {onBack && (
            <button onClick={onBack} className="p-2 -ml-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white truncate">{session.title}</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {session.participants.join(', ')} &middot; {session.messageCount} pesan
            </p>
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`p-2 rounded-lg transition-colors ${showFilters ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600' : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
          </button>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="mt-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-xl space-y-2">
            <input
              type="text"
              placeholder="Cari pesan..."
              value={filter.search}
              onChange={(e) => setFilter(f => ({ ...f, search: e.target.value }))}
              className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <div className="flex gap-2">
              <select
                value={filter.sender}
                onChange={(e) => setFilter(f => ({ ...f, sender: e.target.value }))}
                className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="">Semua pengirim</option>
                {senders.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              <input
                type="date"
                value={filter.dateFrom}
                onChange={(e) => setFilter(f => ({ ...f, dateFrom: e.target.value }))}
                className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <input
                type="date"
                value={filter.dateTo}
                onChange={(e) => setFilter(f => ({ ...f, dateTo: e.target.value }))}
                className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {groupedMessages.length === 0 ? (
          <div className="text-center text-slate-400 dark:text-slate-500 py-12">
            <p>Tidak ada pesan yang cocok dengan filter</p>
          </div>
        ) : (
          groupedMessages.map(group => (
            <div key={group.date}>
              <div className="flex items-center justify-center mb-4">
                <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs text-slate-500 dark:text-slate-400 font-medium">
                  {group.date}
                </span>
              </div>
              <div className="space-y-3">
                {group.messages.map(msg => {
                  const typeLabel = getTypeIcon(msg.type);
                  return (
                    <div key={msg.id} className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                        {msg.sender.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline gap-2 mb-0.5">
                          <span className="font-semibold text-sm text-slate-800 dark:text-slate-200">{msg.sender}</span>
                          <span className="text-xs text-slate-400 dark:text-slate-500">{formatDateTime(msg.timestamp)}</span>
                        </div>
                        {typeLabel && msg.type !== 'text' ? (
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-sm italic">
                            {typeLabel}
                          </span>
                        ) : (
                          <p className="text-sm text-slate-700 dark:text-slate-300 whitespace-pre-wrap break-words leading-relaxed">{msg.content}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
