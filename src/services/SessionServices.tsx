// Helpers for creating and closing sessions over a websocket

import { SessionFeedback } from "../types/appData/FeedbackData";

export const createSession = (websocket: WebSocket, userId: string) => {
  const body = {
    action: "new-session",
    userId: userId,
  };
  console.log("Creating session: ", body);
  websocket.send(JSON.stringify(body));
};

export const endSession = (
  websocket: WebSocket,
  sessionFeedback: SessionFeedback
) => {
  const body = {
    ...sessionFeedback,
    action: "end-session",
  };
  console.log("Ending session: ", body);
  websocket.send(JSON.stringify(body));
};
