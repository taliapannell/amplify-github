import ChatForm from "../../components/ChatForm/ChatForm";
import ChatWindow from "../../components/ChatWindow/ChatWindow";
import Sidebar from "../../components/Sidebar/Sidebar";
import SidebarIcon from "../../assets/images/sidebar-arrow.svg";
import { useState } from "react";
import "./ChatPage.scss";

const ChatPage = () => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div className="chat-page">
      <div className="chat-components-container">
        <div className={`chat-page-sidebar ${isVisible ? 'visible' : 'hidden'}`}>
          <Sidebar />
        </div>
        <div className="chat-page-divider" onClick={() => setIsVisible(!isVisible)}>
          <img src={SidebarIcon} className={`divider-icon ${isVisible ? '' : 'rotated'}`} alt="" />
        </div>
        <div className="chat-page-chat">
          <ChatWindow />
          <div className="chat-form">
            <ChatForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
