import { ChatSession, ChatMessage } from '@/types/chat';

const STORAGE_KEY = 'historychatwaibnu_sessions';

function serializeSessions(sessions: ChatSession[]): string {
  return JSON.stringify(sessions.map(s => ({
    ...s,
    messages: s.messages.map(m => ({
      ...m,
      timestamp: m.timestamp.toISOString(),
    })),
    createdAt: s.createdAt.toISOString(),
    updatedAt: s.updatedAt.toISOString(),
  })));
}

function deserializeSessions(data: string): ChatSession[] {
  const parsed = JSON.parse(data);
  return parsed.map((s: any) => ({
    ...s,
    messages: s.messages.map((m: any) => ({
      ...m,
      timestamp: new Date(m.timestamp),
    })),
    createdAt: new Date(s.createdAt),
    updatedAt: new Date(s.updatedAt),
  }));
}

export function getSessions(): ChatSession[] {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return [];
  try {
    return deserializeSessions(data);
  } catch {
    return [];
  }
}

export function saveSession(session: ChatSession): void {
  const sessions = getSessions();
  const existingIndex = sessions.findIndex(s => s.id === session.id);
  if (existingIndex >= 0) {
    sessions[existingIndex] = session;
  } else {
    sessions.push(session);
  }
  localStorage.setItem(STORAGE_KEY, serializeSessions(sessions));
}

export function deleteSession(id: string): void {
  const sessions = getSessions().filter(s => s.id !== id);
  localStorage.setItem(STORAGE_KEY, serializeSessions(sessions));
}

export function clearAllSessions(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export function exportSessionToJson(session: ChatSession): string {
  return JSON.stringify(session, null, 2);
}
