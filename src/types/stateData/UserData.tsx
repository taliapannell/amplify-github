import { MessageFeedback } from "../appData/FeedbackData";
import { Source } from "../appData/WebsocketMessage";
import { ChatDataMessage } from "./ChatData";

export interface SavedChat {
  messages: ChatDataMessage[];
  datetime: string;
}

export interface UserData {
  id: string;
  sub?: string;
  favorites: string[]; // Not a current feature for this PoC but can be used to store favorite chat messages
  savedChats: SavedChat[]; // Not a current feature for this PoC but can be used to store chat history
  feedback: MessageFeedback[];
}

export const createEmptyUserData = (
  id: string = "",
  sub: string = null,
  favorites: string[] = [],
  savedChats: SavedChat[] = [],
  feedback: MessageFeedback[] = []
) => ({
  id: id,
  sub: sub,
  favorites: favorites,
  savedChats: savedChats,
  feedback: feedback,
});
