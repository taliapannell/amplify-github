import "./AgentLoadingMessage.scss";
import { Message } from "../../interfaces/Chat";
import { useState, useEffect } from "react";
import AIProfile from "../../assets/images/chat-agent-icon.svg";
import SpinningIcon from "../../assets/images/spinning-icon.svg";
import VectorIcon from "../../assets/images/vector.svg";

interface AgentLoadingMessageProps {
    response: Message;
}

const AgentLoadingMessage = ({ response }: AgentLoadingMessageProps) => {
    const [loadingState, setLoadingState] = useState("sent");

    useEffect(() => {
        const timer1 = setTimeout(() => setLoadingState("running"), 3000);
        const timer2 = setTimeout(() => setLoadingState("complete"), 240000);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
        };
    }, []);

    const renderMessage = () => {
        switch (loadingState) {
            case "running":
                return "Running query. This may take a few minutes...";
            case "complete":
                return response?.data?.content;
            default:
                return "";
        }
    };

    return (
        <div className="ai-response">
            <div className="ai-profile-container">
                <img src={AIProfile} alt="AI" />
            </div>
            <div className="ai-response-container">
                <div className="ai-response-content">
                    <div className="sent-to-agent">
                        <p>Sent to agent.</p>
                        <img className="vector-icon" src={VectorIcon} alt="Vector Icon" />
                    </div>
                    <div className="message-with-icon">
                        <p>{renderMessage()}</p>
                        {loadingState === "running" && (
                            <div className="spinning-icon-container">
                                <img className="spinning-icon" src={SpinningIcon} alt="Spinning Icon" />
                            </div>
                        )}
                    </div>
                </div>
                {loadingState === "complete" && (
                    <div className="ai-response-time">
                        <p>{response?.data?.time}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AgentLoadingMessage;