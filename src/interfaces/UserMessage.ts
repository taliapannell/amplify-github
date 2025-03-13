import { ChatMessage } from "./ChatMessage";

export interface UserMessage extends ChatMessage {
	initials: string;
	historyId?: string;
}
