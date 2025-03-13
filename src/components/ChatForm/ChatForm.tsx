import "./ChatForm.scss";
import Form from "react-bootstrap/esm/Form";
import TextArea from "../TextArea/TextArea";
import SendButton from "../SendButton/SendButton";
import { AppDispatch } from "../../redux/store";
import { sendChatRequestThunk } from "../../services/thunks";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import {
  selectAgentResponse,
  selectChatId,
  selectMessages,
  selectPrompt,
  updateChatId,
  updateMessages,
  updatePrompt,
} from "../../redux/app.slice";
import { Message } from "../../interfaces/Chat";
import { getLoadingMessage, getTime } from "../../utils/utils";
import { useParams } from "react-router-dom";

const ChatForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const currentMessages = useSelector(selectMessages);
  const prompt = useSelector(selectPrompt);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const agentResponse = useSelector(selectAgentResponse);
  const chatId = useSelector(selectChatId);
  const { customerId } = useParams();

  useEffect(() => {
    if (agentResponse) {
      const agentMessage: Message = {
        data: {
          id: crypto.randomUUID(),
          name: "response",
          content: agentResponse,
          type: "ai",

          time: getTime(),
          isUser: false
        },
        type: "ai"
      };

      const priorMessages = currentMessages?.slice(0, currentMessages.length - 1);
      if (priorMessages) {
        dispatch(updateMessages([...priorMessages, agentMessage]));
      }
    }
  }, [agentResponse]);

  const handleSubmitMessage = async () => {
    if (prompt.trim() === "" || prompt === undefined) {
      return;
    }

    const message: Message = {
      data: {
        id: crypto.randomUUID(),
        content: prompt,
        name: "request",
        type: "human",

        time: getTime(),
        isUser: true
      },
      type: "human"
    };

    const loadingMessage = getLoadingMessage();
    if (currentMessages) {
      dispatch(updateMessages([...currentMessages, message, loadingMessage]));
    }


    let currentChatId = chatId;

    if (!currentChatId) {
      currentChatId = crypto.randomUUID();
      dispatch(updateChatId(currentChatId));
    }

    dispatch(sendChatRequestThunk({
      chatId: currentChatId,
      customerId: customerId || "",
      request: prompt
    }));

    dispatch(updatePrompt(""));
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

  const handlePromptChange = (data: string) => {
    dispatch(updatePrompt(data));
  };

  return (
    <Form.Group controlId="formControlsTextarea" className="form-group">
      <div className="text-area">
        <TextArea
          ref={textAreaRef}
          hint="Ask something..."
          value={prompt}
          handleChange={handlePromptChange}
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