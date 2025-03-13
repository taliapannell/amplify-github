import { useSelector } from "react-redux";
import { Message } from "../../interfaces/Chat";
import { selectMessages } from "../../redux/app.slice";
import ChatMessage from "../ChatMessage/ChatMessage";
import "./ChatWindow.scss";

const ChatWindow = () => {
  const messages = useSelector(selectMessages);

  function displayMessage(message: any) {
    const randomKey = Math.random().toString(36) + Math.random().toString(36);  // Combine two random values
    return (
      <div key={randomKey}>
        <div className="chat-message-container">
          <ChatMessage response={message} />
        </div>
      </div>
    );
  }

  return <div className="chat-window">{messages.map((message: Message) => displayMessage(message)).reverse()}</div>;
};

export default ChatWindow;
