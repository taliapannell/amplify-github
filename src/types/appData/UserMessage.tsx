import { ChatMessage } from "./ChatMessage";

export interface UserMessage extends ChatMessage {
	isUser: true;
	historyId?: string;
	initials?: string;
}
