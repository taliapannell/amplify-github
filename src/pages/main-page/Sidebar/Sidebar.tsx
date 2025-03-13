import "./Sidebar.scss";
import { useState } from "react";
import Chats from "./Chats";
import Favorites from "./Favorites";
import SidebarChats from "../../../assets/images/sidebar-chats.svg";
import SidebarChatsActive from "../../../assets/images/sidebar-chats-active.svg";
import SidebarDocument from "../../../assets/images/sidebar-document.svg";
import SidebarDocumentActive from "../../../assets/images/sidebar-document-active.svg";
import SidebarFavorites from "../../../assets/images/sidebar-favorites.svg";
import SidebarFavoritesActive from "../../../assets/images/sidebar-favorites-active.svg";
import SidebarSuggested from "../../../assets/images/sidebar-suggested.svg";
import SidebarSuggestedActive from "../../../assets/images/sidebar-suggested-active.svg";
import SuggestedPrompts from "./SuggestedPrompts";

enum SidebarSectionOptions {
  Chats,
  Favorites,
  SuggestedPrompts,
  // KnowledgeBase
}

const Sidebar = () => {
  const [activeSection, setActiveSection] = useState<SidebarSectionOptions>(SidebarSectionOptions.SuggestedPrompts);

  const section = () => {
    switch (activeSection) {
      case SidebarSectionOptions.Chats:
        return <Chats />
      case SidebarSectionOptions.Favorites:
        return <Favorites />
      case SidebarSectionOptions.SuggestedPrompts:
        return <SuggestedPrompts />
    }
  };

  return (
    <>
      <div className="sidebar-buttons">
        {/* <img
          alt=""
          onClick={() => setActiveSection(SidebarSectionOptions.Chats)}
          src={activeSection === SidebarSectionOptions.Chats ? SidebarChatsActive : SidebarChats}
        />
        <img
          alt=""
          onClick={() => setActiveSection(SidebarSectionOptions.Favorites)}
          src={activeSection === SidebarSectionOptions.Favorites ? SidebarFavoritesActive : SidebarFavorites}
        />
        <img
          alt=""
          onClick={() => setActiveSection(SidebarSectionOptions.SuggestedPrompts)}
          src={activeSection === SidebarSectionOptions.SuggestedPrompts ? SidebarSuggestedActive : SidebarSuggested}
        /> */}
      </div>
      <div className="sidebar-container">
        {section()}
      </div>
    </>
  );
};

export default Sidebar;
