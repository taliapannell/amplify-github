import React from 'react'
import { AppDispatch } from '../../../services/redux/store';
import { selectSuggestedPrompts, updateChatId, updateMessages, updatePrompt } from '../../../services/redux/app.slice';
import NewChatIcon from "../../../assets/images/new-chat-icon.svg";
import { useDispatch, useSelector } from "react-redux";
import PromptArrow from "../../../assets/images/prompt-arrow.svg";

const SuggestedPrompts = () => {
  const dispatch = useDispatch<AppDispatch>();
  const suggestedPrompts = useSelector(selectSuggestedPrompts);

  const selectPrompt = (prompt: string) => {
    dispatch(updatePrompt(prompt));
  };

  const handleNewChat = () => {
    dispatch(updatePrompt(""));
    dispatch(updateChatId(null))
    dispatch(updateMessages([]));
  }

  return (
    <div className="sidebar-top-section">
      <div className="sidebar-header">
      <div className="header">Suggestions</div>
        <div className="new-chat-button" onClick={handleNewChat}><img src={NewChatIcon} alt="" />&nbsp;New Chat</div>
      </div>
      <div className="sidebar-content">

        {suggestedPrompts && suggestedPrompts.map((item, index) => (
          <div key={index} className="item" onClick={() => selectPrompt(item)}>
            <div className="text">
              {item}
            </div>
            <img src={PromptArrow} alt="" />
          </div>
        ))}

      </div>
    </div>
  )
}

export default SuggestedPrompts;