import { ChatMessage, ChatSession } from '@/types/chat';

function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

function detectMessageType(content: string): ChatMessage['type'] {
  const lower = content.toLowerCase().trim();
  if (lower.includes('image omitted') || lower.includes('foto tidak ditampilkan') || lower.includes('<media omitted>')) return 'image';
  if (lower.includes('document omitted') || lower.includes('dokumen tidak ditampilkan')) return 'document';
  if (lower.includes('audio omitted') || lower.includes('pesan suara tidak ditampilkan') || lower.includes('voice message')) return 'audio';
  if (lower.includes('video omitted') || lower.includes('video tidak ditampilkan')) return 'video';
  if (lower.includes('this message was deleted') || lower.includes('pesan ini telah dihapus') || lower.includes('this message was deleted')) return 'deleted';
  if (content.includes('created group') || content.includes('changed the subject') || content.includes('added') || content.includes('left') || content.includes('removed')) return 'system';
  return 'text';
}

export function parseWhatsAppChat(text: string, title: string = 'Chat Baru'): ChatSession {
  const lines = text.split('\n');
  const messages: ChatMessage[] = [];
  const sendersSet = new Set<string>();
  let isGroup = false;

  // Regex patterns for different date formats
  const patterns = [
    /^\[(\d{1,2}[\/\.\-]\d{1,2}[\/\.\-]\d{2,4}),?\s*(\d{1,2}:\d{2}(?::\d{2})?)\]\s*(.+?)\s*:\s*(.+)$/, // [DD/MM/YY, HH:MM] Name: Message
    /^(\d{1,2}[\/\.\-]\d{1,2}[\/\.\-]\d{2,4}),?\s*(\d{1,2}:\d{2}(?::\d{2})?)\s*-\s*(.+?)\s*:\s*(.+)$/, // DD/MM/YY, HH:MM - Name: Message
    /^(\d{1,2}\/\d{1,2}\/\d{2,4}),?\s*(\d{1,2}:\d{2}\s*[APap][Mm])\s*-\s*(.+?)\s*:\s*(.+)$/, // DD/MM/YY, HH:MM AM/PM - Name: Message
  ];

  let currentMessage: Partial<ChatMessage> | null = null;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    let matched = false;
    for (const pattern of patterns) {
      const match = trimmed.match(pattern);
      if (match) {
        // Save previous message if exists
        if (currentMessage && currentMessage.content) {
          messages.push(currentMessage as ChatMessage);
        }

        const [, dateStr, timeStr, sender, content] = match;
        const dateTimeStr = `${dateStr} ${timeStr}`;
        let timestamp: Date;
        
        // Try parsing with various formats
        timestamp = new Date(dateTimeStr);
        if (isNaN(timestamp.getTime())) {
          // Fallback: try DD/MM/YYYY format
          const parts = dateStr.split(/[\/\.\-]/);
          if (parts.length === 3) {
            const [d, m, y] = parts;
            const year = y.length === 2 ? `20${y}` : y;
            timestamp = new Date(`${year}-${m.padStart(2, '0')}-${d.padStart(2, '0')}T${timeStr}`);
          }
        }

        sendersSet.add(sender.trim());
        currentMessage = {
          id: generateId(),
          timestamp: isNaN(timestamp.getTime()) ? new Date() : timestamp,
          sender: sender.trim(),
          content: content.trim(),
          type: detectMessageType(content.trim()),
          isGroup: false,
        };
        matched = true;
        break;
      }
    }

    if (!matched && currentMessage) {
      // This line is a continuation of the previous message
      currentMessage.content += '\n' + trimmed;
    }
  }

  // Don't forget the last message
  if (currentMessage && currentMessage.content) {
    messages.push(currentMessage as ChatMessage);
  }

  const participants = Array.from(sendersSet);
  // Detect group chat (more than 2 participants usually indicates a group)
  if (participants.length > 2) {
    isGroup = true;
    messages.forEach(m => m.isGroup = true);
  }

  const now = new Date();
  return {
    id: generateId(),
    title: title || (isGroup ? 'Group Chat' : participants.join(' & ')),
    participants,
    messages,
    createdAt: now,
    updatedAt: now,
    messageCount: messages.length,
  };
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date);
}

export function formatTime(date: Date): string {
  return new Intl.DateTimeFormat('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}
