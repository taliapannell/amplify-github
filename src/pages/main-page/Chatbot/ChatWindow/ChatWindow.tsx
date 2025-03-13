import ChatMessage from "../ChatMessage/ChatMessage";
import { useDispatch, useSelector } from "react-redux";
import {
  selectChatId,
  selectChatIndex,
  selectMessages,
  updateChatId,
  updateMessages,
} from "../../../../services/redux/app.slice";
import "./ChatWindow.scss";
import { useEffect, useRef } from "react";
import { useWebSocket } from "../../../../services/WebSocket";
import { formatAgentMessage } from "../../../../services/MessageServices";
import { AppDispatch } from "../../../../services/redux/store";
import { addMessageToSavedChat } from "../../../../services/ChatServices";
import { createFormattedTime } from "../../../../services/MessageServices";
import { ChatDataMessage } from "../../../../types/stateData/ChatData";

const ChatWindow = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data } = useWebSocket();
  const chatIndex: number = useSelector(selectChatIndex);
  const chatId: string = useSelector(selectChatId);
  const messages = useSelector(selectMessages);
  const prevDataRef = useRef();

  useEffect(() => {
    if (data && data !== prevDataRef.current) {
      prevDataRef.current = data;
      // This is a chat message if there's a "responseContent" field
      if (data.responseContent) {
        console.log("Chat Window received agent response: ", data);
        processMessage(data);
      }
    }
  }), [data];

  const processMessage = (response: any) => {
    const priorMessages = messages.slice(0, messages.length - 1);
    try {
      const agentMessage = formatAgentMessage(response);
      console.log("Agent Message: ", agentMessage);
      dispatch(updateMessages([...priorMessages, agentMessage]));
      if (response.chatId !== chatId) {
        console.log("Updating chatId: ", response.chatId);
        dispatch(updateChatId(response.chatId));
      }
      // Save the new message to chat history
      const currentTime = createFormattedTime();
      dispatch(
        addMessageToSavedChat(chatIndex, {
          role: "assistant",
          content: agentMessage.content,
          time: currentTime,
          isUser: false,
          source: agentMessage.source,
          pageNumber: agentMessage.pageNumber,
        })
      );
    } catch (error) {
      console.error("Error parsing response: ", error);
      // We received a malformed chat response
      const errorMessage: ChatDataMessage = {
        role: "assistant",
        time: createFormattedTime(),
        isUser: false,
        content: "I'm sorry, I encountered an error.",
      };
      dispatch(updateMessages([...priorMessages, errorMessage]));
    }
  };

  function displayMessage(message: any) {
    const randomKey = Math.random().toString(36) + Math.random().toString(36); // Combine two random values
    return (
      <div key={randomKey}>
        <div className="chat-message-container">
          <ChatMessage response={message} />
        </div>
      </div>
    );
  }

  return (
    <div className="chat-window">{messages.map(displayMessage).reverse()}</div>
  );
};

export default ChatWindow;
