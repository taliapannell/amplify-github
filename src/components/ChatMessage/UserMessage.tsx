import "./UserMessage.scss";
import { Message } from "../../interfaces/Chat";
import UserIconImage from "../../assets/images/user-icon.png";

const UserIcon = () => {
  return (
    <div className="user-profile-container">
      <img src={UserIconImage} alt="User" />
    </div>
  );
};

interface UserMessageProps {
  response: Message;
}

const UserMessage = ({ response }: UserMessageProps) => {
  return (
    <div className="user-response">
      <div className="user-response-container">
        <div className="user-response-content-container">
          <div className="user-response-button">
          </div>
          <div className="user-response-content">
            <p>{response?.data?.content}</p>
          </div>
        </div>
        <div className="user-response-time">
          <p>{response?.data?.time}</p>
        </div>
      </div>
      <UserIcon />
    </div>
  );
};

export default UserMessage;
