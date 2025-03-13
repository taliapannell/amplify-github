import { AuthUser } from "aws-amplify/auth";
import { getInitials } from "./UserServices";
import { UserMessage } from "../types/appData/UserMessage";
import { AgentLoadingMessage } from "../types/appData/AgentLoadingMessage";
import { AgentMessage } from "../types/appData/AgentMessage";
import { WebsocketChatResponse } from "../types/appData/WebsocketMessage";

export const dateFormat = new Intl.DateTimeFormat("en", {
  hour: "numeric",
  minute: "numeric",
  hour12: true,
});

export const createFormattedTime = (): string => {
  return dateFormat.format(new Date().getTime()).toLocaleUpperCase();
}

export const formatUserMessage = (question: string, user: AuthUser): UserMessage => {
  const time = dateFormat.format(new Date().getTime()).toLocaleUpperCase();
  return {
    content: question,
    initials: getInitials(user),
    time: time,
    historyId: "",
    isUser: true,
  };
}

export const getLoadingMessage = (): AgentLoadingMessage => {
  const time = dateFormat.format(new Date().getTime()).toLocaleUpperCase();
  return {
    time: time,
    isUser: false,
    content: "",
  };
}

 export const prepareMessage = (user: AuthUser, question: string) => {
  if (
    // user !== undefined &&
    // "attributes" in user &&
    // user.attributes !== undefined &&
    // "email" in user.attributes &&
    // user.attributes.email !== undefined
    user !== undefined &&
    user.userId !== undefined
  ) {
    return formatUserMessage(question, user);
  }
  throw new Error("User is not logged in");
}
export function formatAgentMessage(response: WebsocketChatResponse): AgentMessage {
  const time = createFormattedTime();
  const sessionId = response["sessionId"];
  const messageId = response["messageId"];
  const chatId = response["chatId"];
  const responseContent = response["responseContent"];
  const sources = responseContent ? responseContent["sources"] : [];
  const responseText = responseContent["response"];
  return {
    content: responseText,
    time: time,
    isUser: false,
    sessionId: sessionId,
    messageId: messageId,
    chatId: chatId,
    source: getMetaValue(sources, "title"),
    pageNumber: getMetaValue(sources, "page"),
  };
}export function getMetaValue(sources: any[], metaKey: string): string {
  if (!sources?.length || !metaKey) {
    return;
  }

  return sources.map(item => item[metaKey])
    .filter((value, index, self) => self.indexOf(value) === index)
    .join(", ");
}

