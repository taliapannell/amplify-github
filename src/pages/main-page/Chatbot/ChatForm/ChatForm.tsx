import Form from "react-bootstrap/esm/Form";
import TextArea from "../../../../components/TextArea/TextArea";
import SendButton from "../../../../components/Buttons/SendButton/SendButton";
import "./ChatForm.scss";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useWebSocket } from "../../../../services/WebSocket";
import {
  selectChatId,
  selectChatIndex,
  selectMessages,
  selectPrompt,
  selectSessionId,
  selectUserData,
  updateChatIndex,
  updateMessages,
  updatePrompt,
} from "../../../../services/redux/app.slice";
import { UserData } from "../../../../types/stateData/UserData";
import {
  addMessageToSavedChat,
  addSavedChat,
} from "../../../../services/ChatServices";
import { AppDispatch } from "../../../../services/redux/store";
import { createFormattedTime, getLoadingMessage, prepareMessage } from "../../../../services/MessageServices";
import { WebsocketChatMessage } from "../../../../types/appData/WebsocketMessage";

const ChatForm = () => {
  const { sendMessage } = useWebSocket();
  const { user } = useAuthenticator((context) => [context.user]);
  const dispatch = useDispatch<AppDispatch>();
  const chatIndex: number = useSelector(selectChatIndex);
  const currentMessages = useSelector(selectMessages);
  const prompt = useSelector(selectPrompt);
  const userData: UserData = useSelector(selectUserData);
  const sessionId = useSelector(selectSessionId);
  const chatId = useSelector(selectChatId)
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmitMessage = async () => {
    if (prompt.trim() === "" || prompt === undefined) {
      return;
    }
    const message = prepareMessage(user, prompt);
    const loadingMessage = getLoadingMessage();
    dispatch(updateMessages([...currentMessages, message, loadingMessage]));

    const userMessage : WebsocketChatMessage = {
      action: "ask-question",
      sessionId: sessionId,
      messageId: currentMessages.length,
      chatId: chatId,
      request: prompt,
    };

    // Update the chat history
    // If there are currently no active messages, then the user is starting a new chat
    const currentTime = createFormattedTime();
    if (currentMessages.length === 0) {
      dispatch(
        addSavedChat({
          messages: [{ role: "user", content: prompt, isUser: true, time: currentTime, initials: message.initials }],
          datetime: new Date().toISOString(),
        })
      );
      // Update the chat index to the new chat
      dispatch(updateChatIndex(userData.savedChats.length));
    } else {
      // Continuing an existing chat
      dispatch(
        addMessageToSavedChat(chatIndex, { role: "user", content: prompt, isUser: true, time: currentTime, initials: message.initials })
      );
    }
    
    dispatch(updatePrompt(""));
    
    // websocket: send message
    sendMessage(userMessage);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.shiftKey && event.key === "Enter") {
      event.preventDefault();
      dispatch(updatePrompt(prompt + "\n"));
      setTimeout(() => {
        if (textAreaRef.current) {
          textAreaRef.current.scrollTop = textAreaRef.current.scrollHeight;
        }
      }, 0);
    } else if (event.key === "Enter" && prompt.trim() !== "") {
      event.preventDefault(); // Prevent adding newline character
      handleSubmitMessage();
    }
  };

  return (
    <Form.Group controlId="formControlsTextarea" className="form-group">
      <div className="text-area">
        <TextArea
          ref={textAreaRef}
          hint="Tell me what do you want?"
          value={prompt}
          handleChange={(data) => {
            dispatch(updatePrompt(data));
          }}
          onKeyDown={handleKeyDown}
        />
      </div>
      <div className="send-button">
        <SendButton text="Send" handleClick={handleSubmitMessage} />
      </div>
    </Form.Group>
  );
};

export default ChatForm;
