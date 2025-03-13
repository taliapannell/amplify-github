import "./AgentMessage.scss";
import { Message } from "../../interfaces/Chat";
import AIProfile from "../../assets/images/chat-agent-icon.svg";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface AgentMessageProps {
  response: Message;
}

const AgentMessage = ({ response }: AgentMessageProps) => {
  return (
    <div className="ai-response">
      <div className="ai-profile-container">
        <img src={AIProfile} alt="AI" />
      </div>
      <div className="ai-response-container">
        <div className="ai-response-content">
          {response?.data?.content !== undefined && (
            <>
              <ReactMarkdown children={`${response?.data.content}`} remarkPlugins={[remarkGfm]} />
            </>
          )}
        </div>
        <div className="ai-response-toolbar">
          <div className="ai-response-time">
            <p>{response?.data?.time}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentMessage;
