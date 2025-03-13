import AIProfile from "../../../../assets/images/ai-profile-icon.svg";
import LoadingIcons from "react-loading-icons";
import { AgentLoadingMessageProps } from "../../../../types/props/AgentLoadingMessageProps";
import theme_colors from "../../../../types/theme_colors";
import "./AgentLoadingMessage.scss";

const AgentLoadingMessage = ({ response }: AgentLoadingMessageProps) => {
	return (
		<div className="ai-response">
			<div className="ai-profile-container">
				<img src={AIProfile} alt="AI" />
			</div>
			<div className="ai-response-container">
				<div className="ai-response-content">
					<LoadingIcons.Rings stroke={theme_colors.PRIMARY} />
				</div>
				<div className="ai-response-time">
					<p>{response.time}</p>
				</div>
			</div>
		</div>
	);
};

export default AgentLoadingMessage;
