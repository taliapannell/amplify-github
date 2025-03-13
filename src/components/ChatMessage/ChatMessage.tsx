import "./ChatMessage.scss";
import AgentMessage from "./AgentMessage";
import AgentLoadingMessage from "./AgentLoadingMessage";
import UserMessage from "./UserMessage";
import { Message } from "../../interfaces/Chat";

interface ChatMessageProps {
  response: Message;
}

const ChatMessage = ({ response }: ChatMessageProps) => {
  if (response?.type !== "human" && response?.data?.content !== "") {
    return <AgentMessage response={response} />;
  } else if (response?.type !== "human" && response?.data?.content === "") {
    return <AgentLoadingMessage response={response} />;
  } else {
    return <UserMessage response={response} />;
  }
};

export default ChatMessage;
