import UserProfile from "../../../../assets/images/user-profile-icon.svg";
import "./UserMessage.scss";
import {
  UserMessageProps,
  ProfileIconProps,
} from "../../../../types/appData/UserMessageProps";
// import { addFavorite, removeFavorite } from "../../services/redux/userDataActions";

const UserIcon = ({ initials }: ProfileIconProps) => {
  return (
    <div className="user-profile-container">
      <img src={UserProfile} alt="User" />
      <h3>{initials}</h3>
    </div>
  );
};

const UserMessage = ({ response }: UserMessageProps) => {

  return (
    <div className="user-response">
      <div className="user-response-container">
        <div className="user-response-content-container">
          <div className="user-response-content">
            <p>{response?.content}</p>
          </div>
        </div>
        <div className="user-response-time">
          <p>{response?.time}</p>
        </div>
      </div>
      <UserIcon initials={response?.initials} />
    </div>
  );
};

export default UserMessage;
