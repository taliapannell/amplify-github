import "./ChatMessage.scss";
import { ChatMessageProps } from "../../../../types/props/ChatMessageProps";
import { AgentMessage as _AgentMessage } from "../../../../types/appData/AgentMessage";
import { UserMessage as _UserMessage } from "../../../../types/appData/UserMessage";
import { AgentLoadingMessage as _AgentLoadingResponse } from "../../../../types/appData/AgentLoadingMessage";
import AgentMessage from "./AgentMessage";
import AgentLoadingMessage from "./AgentLoadingMessage";
import UserMessage from "./UserMessage";

const ChatMessage = ({ response }: ChatMessageProps) => {
  if (response?.isUser === false && response?.content !== "") {
    return <AgentMessage response={response as _AgentMessage} />;
  } else if (response?.isUser === false && response?.content === "") {
    return <AgentLoadingMessage response={response as _AgentLoadingResponse} />;
  } else {
    return <UserMessage response={response as _UserMessage} />;
  }
};

export default ChatMessage;
