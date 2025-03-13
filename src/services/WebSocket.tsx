import { fetchAuthSession } from "aws-amplify/auth";
import { useEffect, useState, createContext, useContext, FC, ReactNode, useRef } from "react";
import { useSelector } from "react-redux";
import { selectSub } from "./redux/app.slice";
const wssUrl = "wss://7tani1p7m4.execute-api.us-east-1.amazonaws.com/dev/";

export interface WebSocketContextProps {
  webSocket: WebSocket | null; // The websocket object
  data: any; // The most recent data received
  sendMessage: (message: any) => void; // A function to send messages
  readyState: number; // The ready state of the websocket
}

// Create a context
const WebSocketContext = createContext<WebSocketContextProps | null>(null);

export function useWebSocket() {
  const context = useContext(WebSocketContext)
  if (!context) {
    throw new Error('useWebSocket must be used within a WebSocketProvider');
  }
  return context as WebSocketContextProps;
}

const RECONNECT_INTERVAL = 1000;

// This component creates the WebSocket and provides it to the application
export const WebSocketProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const userSub = useSelector(selectSub);
  const [webSocket, setWebSocket] = useState<WebSocket | null>(null);
  const [readyState, setReadyState] = useState<number>(WebSocket.CONNECTING);
  const [data, setData] = useState<any>(null);
  const [jwtToken, setJwtToken] = useState<string | null>(null);
  const reconnectTimeout = useRef<number | null>(null);
  const userSubRef = useRef(userSub);
  
  useEffect(() => {
    userSubRef.current = userSub;
    if (userSub) {
      fetchToken();
    }
  }), [userSub];

  useEffect(() => {
    if (jwtToken && userSub) {
      connectWebSocket();
    }
    if (!userSub) {
      if (webSocket) {
        webSocket.close();
      }
      setWebSocket(null);
    }
    return () => {
      if (webSocket) {
        webSocket.close();
      }
      if (reconnectTimeout.current) {
        clearTimeout(reconnectTimeout.current);
      }
    };
  }, [jwtToken, userSub]);

  const fetchToken = async () => {
    // console.log("Websocket: ", webSocket);
    const session = await fetchAuthSession();
    setJwtToken(session.tokens.idToken.toString());
  }

  const connectWebSocket = () => {
    const authToken = jwtToken;
    // console.log("Connecting to WebSocket...", authToken);
    const socket = new WebSocket(`${wssUrl}?idToken=${authToken}`);

    socket.onopen = () => {
      console.log('WebSocket connection opened');
      setReadyState(socket.readyState);
      if (reconnectTimeout.current) {
        clearTimeout(reconnectTimeout.current);
        reconnectTimeout.current = null;
      }
    };
    
    socket.onmessage = (event) => {
      let message = JSON.parse(event.data);
      if (typeof message === 'string') {
        message = JSON.parse(message);
      }
      console.log('WebSocket message received:', message);
      const timestampedMessage = {...message, timestamp: new Date().toISOString()};
      setData(timestampedMessage);
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    socket.onclose = () => {
      console.log('WebSocket connection closed');
      reconnectWebSocket();
    };

    setWebSocket(socket);
  };

  const reconnectWebSocket = () => {
    if (!reconnectTimeout.current && userSubRef.current) {
      reconnectTimeout.current = window.setTimeout(() => {
        if (userSubRef.current) {
          console.log('Reconnecting to WebSocket...', userSubRef.current);
          connectWebSocket();
        }
      }, RECONNECT_INTERVAL);
    }
  };

  const sendMessage = (message: any) => {
    if (webSocket && webSocket.readyState === WebSocket.OPEN) {
        console.log('Sending message:', message);
        webSocket.send(JSON.stringify(message));
    }
};

  return (
    <WebSocketContext.Provider value={{ webSocket, data, sendMessage, readyState }}>
      {children}
    </WebSocketContext.Provider>
  );
};
