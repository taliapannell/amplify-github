import AIProfile from "../../../../assets/images/ai-profile-icon.svg";
import thumbUpIcon from "../../../../assets/images/thumb_up.svg";
import thumbUpIconFilled from "../../../../assets/images/thumb_up_fill.svg";
import thumbDownIcon from "../../../../assets/images/thumb_down.svg";
import thumbDownIconFilled from "../../../../assets/images/thumb_down_fill.svg";
import "./AgentMessage.scss";
import { useDispatch, useSelector } from "react-redux";
import { AgentMessageProps } from "../../../../types/props/AgentMessageProps";
import { useState } from "react";
import { AppDispatch } from "../../../../services/redux/store";
import {
  addFeedback,
  editFeedbackComment,
  removeFeedback,
} from "../../../../services/ChatServices";
import { selectMessages } from "../../../../services/redux/app.slice";
import ClearableInput from "./ClearableInput";
import { ChatDataMessage } from "../../../../types/stateData/ChatData";
import {
  createMessageFeedback,
} from "../../../../types/appData/FeedbackData";

const AgentMessage = ({ response }: AgentMessageProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const messages = useSelector(selectMessages);
  const [feedback, setFeedback] = useState<"positive" | "negative" | "neutral">(
    "neutral"
  );

  // Find user message that prompted the agent response
  const findCorrespondingPrompt = (
    aiResponse: string,
    messages: ChatDataMessage[]
  ) => {
    const aiResponseIndex = messages.findIndex(
      (message) => message.content === aiResponse
    );
    if (aiResponseIndex === -1 || aiResponseIndex === 0) {
      // The ai response is the first message or not found, so there is no corresponding prompt
      return "";
    }
    const userMessage = messages[aiResponseIndex - 1];
    return userMessage ? userMessage.content : "";
  };

  const thumbUpHandler = () => {
    if (feedback === "positive") {
      setFeedback("neutral");
      dispatch(removeFeedback(response.content));
    } else {
      const prompt = findCorrespondingPrompt(response.content, messages);
      const feedbackData = createMessageFeedback(response, prompt, true);
      dispatch(addFeedback(feedbackData));
      setFeedback("positive");
    }
  };

  const thumbDownHandler = () => {
    if (feedback === "negative") {
      setFeedback("neutral");
      dispatch(removeFeedback(response.content));
    } else {
      const prompt = findCorrespondingPrompt(response.content, messages);
      const feedbackData = createMessageFeedback(response, prompt, false);
      dispatch(addFeedback(feedbackData));
      setFeedback("negative");
    }
  };

  const submitComment = (comment: string) => {
    if (comment !== "") {
      dispatch(editFeedbackComment(response.content, comment));
    }
  };

  return (
    <div className="ai-response">
      <div className="ai-profile-container">
        <img src={AIProfile} alt="AI" />
      </div>
      <div className="ai-response-container">
        <div className="ai-response-content">
          {response.content !== undefined && (
            <>
              <p>{response.content}</p>

              {response.source && (
                <>
                  <hr />
                  <div className="source-page-container">
                    <div>
                      <span className="label">Source:</span>
                      <span className="text">{response?.source}</span>
                    </div>
                    <div>
                      <span className="label">Page Number:</span>
                      <span className="text">{response?.pageNumber}</span>
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </div>
        <div className="ai-response-toolbar">
          <div className="ai-response-time">
            <p>{response.time}</p>
          </div>
          <div className="ai-response-buttons">
            <button onClick={thumbDownHandler}>
              <img
                src={
                  feedback === "negative" ? thumbDownIconFilled : thumbDownIcon
                }
                alt="Thumb Down"
              />
            </button>
            <button onClick={thumbUpHandler}>
              <img
                src={feedback === "positive" ? thumbUpIconFilled : thumbUpIcon}
                alt="Thumb Up"
              />
            </button>
          </div>
        </div>
        {feedback === "negative" && (
          <ClearableInput
            placeholder="Please let us know how we can improve..."
            onSubmit={submitComment}
          />
        )}
      </div>
    </div>
  );
};

export default AgentMessage;
