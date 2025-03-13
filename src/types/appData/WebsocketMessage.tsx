
export interface WebsocketChatMessage {
  action: "ask-question";
  sessionId: number;
  messageId: number;
  request: string;
  chatId: null | string;
}

export interface Source {
  source: string;
  page: string;
  title: string;
}

export interface WebsocketChatResponse {
  sessionId: string;
  messageId: number;
  chatId: string;
  responseContent: {
    response: string;
    sources: Source[];
    title: string;
  }
}