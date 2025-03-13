import React, { useEffect, useState } from 'react';
import NewChatIcon from "../../../assets/images/new-chat-icon.svg";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../services/redux/store";
import { selectUserData, updateChatId, updateChatIndex, updateMessages, updatePrompt } from '../../../services/redux/app.slice';
import { SavedChat, UserData } from "../../../types/stateData/UserData";
import PromptArrow from "../../../assets/images/prompt-arrow.svg";
import moment from "moment";

interface ChatItemsProps {
  label: string;
  chats: SavedChat[];
  onClick: Function;
}

const ChatItems = ({ label, chats, onClick }: ChatItemsProps) => {
  const labelStyles: React.CSSProperties = {
    fontWeight: 600,
    fontSize: "16px",
    color: "#828282"
  };

  return (
    <>
      {chats?.length > 0 &&
        <>
          <div className="chat-section-label" style={labelStyles}>{label}</div>
          {chats && chats.map((item, index) => (
            <div key={index} className="item" onClick={() => onClick(item)}>
              <div className="text">
                {item.messages[0].content}
              </div>
              <img src={PromptArrow} alt="" />
            </div>
          ))
          }
        </>
      }
    </>
  );
}

const Chats = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userData: UserData = useSelector(selectUserData);
  const [todayChats, setTodayChats] = useState<SavedChat[]>(null);
  const [yesterdayChats, setYesterdayChats] = useState<SavedChat[]>(null);
  const [sevenDaysAgoChats, setSevenDaysAgoChats] = useState<SavedChat[]>(null);
  const [previousChats, setPreviousChats] = useState<SavedChat[]>(null);

  useEffect(() => {
    if (userData?.savedChats?.length) {
      const savedChats = userData.savedChats;
  
      const todayChats = savedChats.filter((chat: SavedChat) => {
        const chatDate = moment(chat.datetime);
        return chatDate.isSame(moment(), "day");
      });
      setTodayChats(todayChats);

      const yesterdayChats = savedChats.filter((chat: SavedChat) => {
        const chatDate = moment(chat.datetime);
        const yesterday = moment().subtract(1, "day");
        return chatDate.isSame(yesterday, "day");
      });
      setYesterdayChats(yesterdayChats);

      const sevenDaysAgoChats = savedChats.filter((chat: SavedChat) => {
        const chatDate = moment(chat.datetime);
        const beforeYesterday = moment().subtract(2, "days");
        const daysAgo = moment().subtract(7, "days");
        const validation = chatDate.isBetween(daysAgo, beforeYesterday, "day", "[]");
        return validation;
      });
      setSevenDaysAgoChats(sevenDaysAgoChats);

      const previousChats = savedChats.filter((chat: SavedChat) => {
        const chatDate = moment(chat.datetime);
        const eightDaysOrMore = moment().subtract(8, "days");
        const validation = chatDate.isBefore(eightDaysOrMore, "day")
        return validation;
      });
      setPreviousChats(previousChats);
    }
  }, [userData])

  const handleChatClick = (chat: SavedChat) => {
    let chatIndex = 0;
    userData.savedChats.map((item: SavedChat, index) => {
      if (item.datetime === chat.datetime) {
        chatIndex = index;
      }
    });
    dispatch(updateChatIndex(chatIndex));
    dispatch(updateMessages(chat.messages));
  };

  const handleNewChat = () => {
    dispatch(updatePrompt(""));
    dispatch(updateChatId(null));
    dispatch(updateMessages([]));
  }

  return (
    <div className="sidebar-top-section">
      <div className="sidebar-header">
        <div className="header">Chats</div>
        <div className="new-chat-button" onClick={handleNewChat}><img src={NewChatIcon} alt="" />&nbsp;New Chat</div>
      </div>
      <div className="sidebar-content">

        <ChatItems onClick={handleChatClick} label="Today" chats={todayChats} />
        <ChatItems onClick={handleChatClick} label="Yesterday" chats={yesterdayChats} />
        <ChatItems onClick={handleChatClick} label="Previous 7 Days" chats={sevenDaysAgoChats} />
        <ChatItems onClick={handleChatClick} label="Previous" chats={previousChats} />

      </div>
    </div>
  )
}

export default Chats;