import { createFormattedTime } from "../../services/MessageServices";
import { ChatMessage } from "../appData/ChatMessage";

export interface ChatDataMessage extends ChatMessage {
  role: "user" | "assistant";
  source?: string;
  pageNumber?: string;
  initials?: string;
  messageId?: number;
  sessionId?: number;
}

export interface ChatData {
  sessionId?: string;
  chatId?: string;
  messages: ChatDataMessage[];
  prompt: string;
  chatIndex: number;
}

export const createEmptyChatData = (): ChatData => {
  return {
    // Get sessionId later from the server
    messages: [
      {
        role: "assistant",
        time: createFormattedTime(),
        isUser: false,
        content:
          "Hello! How can I help you today?",
        // source: "test.pdf",
        // pageNumber: "1",
        messageId: 0,
        sessionId: 1,
      },
    ],
    prompt: "",
    chatIndex: 0,
    sessionId: null,
    chatId: null,
  };
};
