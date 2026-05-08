export interface ChatMessage {
  id: string;
  timestamp: Date;
  sender: string;
  content: string;
  type: 'text' | 'image' | 'document' | 'audio' | 'video' | 'deleted' | 'system';
  isGroup: boolean;
  groupName?: string;
}

export interface ChatSession {
  id: string;
  title: string;
  participants: string[];
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
  messageCount: number;
}

export interface ChatFilter {
  search: string;
  sender: string;
  dateFrom: string;
  dateTo: string;
}
