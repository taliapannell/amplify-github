import React from "react";
import { AppDispatch } from "../../../services/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { selectUserData, updatePrompt } from "../../../services/redux/app.slice";
import PromptArrow from "../../../assets/images/prompt-arrow.svg";

const Favorites = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userData = useSelector(selectUserData);

  const selectFavorite = (favorite: string) => {
    setTimeout(() => {
      console.log("timeout")
      // Force the update to happen after the click event, even if it's the same prompt
      dispatch(updatePrompt(favorite));
    }, 2);
  };

  return (
    <div className="sidebar-top-section">
      <div className="sidebar-header">Favorites</div>
      <div className="sidebar-content">
        {userData.favorites &&
          userData.favorites.map((item, index) => (
            <div
              key={index}
              className="item"
              onClick={() => selectFavorite(item)}
            >
              <div className="text">{item}</div>
              <img src={PromptArrow} alt="" />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Favorites;
