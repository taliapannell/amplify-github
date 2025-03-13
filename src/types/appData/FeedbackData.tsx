import { AgentMessage } from "./AgentMessage";
import { Source } from "./WebsocketMessage";

interface Feedback {
  request: string,
  source?: Source,
  response: string,
  isPositive: boolean,
  comment?: string,
}

export interface MessageFeedback {
  sessionId: string,
  messageId: number,
  feedback: Feedback,
}

interface QuestionResponse {
  rating: 1 | 2 | 3 | 4 | 5,
  comment: string,
}
export interface SessionFeedback {
  sessionId: number,
  userId: string,
  feedback: {
    question1: QuestionResponse,
    question2: string,
    question3: string,
    question4: QuestionResponse,
    question5: QuestionResponse,
    question6: QuestionResponse
  }
}

export const createMessageFeedback = (response: AgentMessage, correspondingPrompt: string, isPositive: boolean): MessageFeedback => {
  const sourceExists =
  response.source && !isNaN(Number(response.pageNumber));
  const messageFeedback: MessageFeedback = {
    sessionId: response.sessionId,
    messageId: response.messageId,
    feedback: {
      request: correspondingPrompt,
      response: response.content,
      isPositive: isPositive,
      comment: "",
      source: {source: response.source, page: response.pageNumber, title: response.title},
    },
  };
  if (sourceExists) {
    messageFeedback.feedback.source = {
      source: response.source,
      page: response.pageNumber,
      title: response.title,
    };
  }
  return messageFeedback;
}

export const createSessionFeedback = (sessionId: number, userId: string): SessionFeedback => {
  return {
    sessionId: sessionId,
    userId: userId,
    feedback: {
      question1: {
        rating: 1,
        comment: "",
      },
      question2: "",
      question3: "",
      question4: {
        rating: 1,
        comment: "",
      },
      question5: {
        rating: 1,
        comment: "",
      },
      question6: {
        rating: 1,
        comment: "",
      },
    },
  };
};