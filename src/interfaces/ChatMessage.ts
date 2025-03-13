export interface ChatMessage {
  content: string;
  time: string;
  isUser: boolean;

  source?: string;
  pageNumber?: string;
  title?: string;

  initials?: string;
}
