import ChatForm from "./Chatbot/ChatForm/ChatForm";
import ChatWindow from "./Chatbot/ChatWindow/ChatWindow";
import Sidebar from "./Sidebar/Sidebar";
import "./MainPage.scss";
import SidebarIcon from "../../assets/images/sidebar-arrow.svg";
import { useEffect, useRef, useState } from "react";
import { useWebSocket } from "../../services/WebSocket";
import { useDispatch, useSelector } from "react-redux";
import { selectSessionId, selectSub, selectUserId, updateSessionId } from "../../services/redux/app.slice";
import { createSession } from "../../services/SessionServices";

const MainPage = () => {
  const {webSocket, readyState, data} = useWebSocket();
  const dispatch = useDispatch();
  const userId = useSelector(selectSub);
  const sessionId = useSelector(selectSessionId);
  const [isVisible, setIsVisible] = useState(true);
  const [isSessionCreationInProgress, setIsSessionCreationInProgress] = useState(false);
  const prevDataRef = useRef();

  useEffect(() =>{
    // Create a new session if a session is not already created and the websocket is ready
    const isWebSocketReady = webSocket && webSocket.readyState === 1;
    const isSessionNotCreated = !sessionId && !isSessionCreationInProgress && userId;
    const canCreateSession = isWebSocketReady && isSessionNotCreated;
    if (canCreateSession) {
      // console.log("Main Page creating session...");
      setIsSessionCreationInProgress(true);
      createSession(webSocket, userId);
    }
  }), [readyState, userId];

  // Listen for a session creation response
  useEffect(() => {
    if (data && data !== prevDataRef.current && !sessionId) {
      prevDataRef.current = data;
      if (data.sessionId) {
        console.log("Main Page received sessionId response: ", data);
        dispatch(updateSessionId(data.sessionId));
      }
    }
  }), [data];

  return (
    <div className="main-page">
      <div className="chat-components-container">
        <div className={`main-page-sidebar ${isVisible ? 'visible' : 'hidden'}`}>
          <Sidebar />
        </div>
        <div className="main-page-divider" onClick={() => setIsVisible(!isVisible)}>
          <img src={SidebarIcon} className={`divider-icon ${isVisible ? 'rotated' : ''}`} alt="" />
        </div>
        <div className="main-page-chat">
          <ChatWindow />
          <div className="chat-form">
            <ChatForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
