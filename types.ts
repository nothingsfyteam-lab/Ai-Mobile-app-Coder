export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
  type?: 'choice';
}
