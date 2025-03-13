import { ChatMessage } from "./ChatMessage";

export interface AgentLoadingMessage extends ChatMessage {
	isUser: false;
}
