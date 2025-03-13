// import { Chat } from "../../interfaces/Chat";
// import PromptArrow from "../../assets/images/prompt-arrow.svg";
// import { fetchChatHistoryThunk } from "../../services/thunks";
// interface ChatItemsProps {
//   chats: Chat[] | null;
//   onClick: Function
// }

import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "../../assets/images/arrow_back_icon.svg"
import { useDispatch } from "react-redux";
import { resetMessages } from "../../redux/app.slice";
import Table from "./Table";
import Transactions from "./Transactions";  

// const ChatItems = ({ chats, onClick }: ChatItemsProps) => {
// // const labelStyles: React.CSSProperties = {
// //   fontWeight: 600,
// //   fontSize: "16px",
// //   color: "#828282"
// // };

//   return (
//     <>
//       {chats && chats.length > 0 && chats.map((item: Chat, index: number) => (
//         item?.History?.length > 0 && (
//           <div key={index} className="item" onClick={() => onClick(item)}>
//             <div className="text">
//               {item?.History[0]?.data.content}
//             </div>
//             <img src={PromptArrow} alt="" />
//           </div>
//         )
//       ))}
//     </>
//   );
// }

const Chats = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const chats: Chat[] = useSelector(selectChatHistory);
  // const userId = useSelector(selectUserId);

  // const handleChatSelection = (chat: Chat) => {
  //   dispatch(updateChatId(chat.chatId));
  //   dispatch(updateActiveChat(chat));
  //   // dispatch(updateMessages(chat.History));
  // };

  const handleGoBack = () => {
    dispatch(resetMessages());
    navigate("/");
  }

  return (
    <div className="sidebar-top-section">
      <div className="sidebar-header" onClick={handleGoBack}>
        <img className="back-icon" src={ArrowBackIcon} alt="Back" />
        Home
      </div>
      <div className="sidebar-content">
        <div className="subheader">Customer</div>
        <div className="subheader-2">Transactions</div>
        <Table />
        <Transactions/>

        {/* <ChatItems onClick={handleChatSelection} chats={chats} /> */}

      </div>
    </div>
  )
}

export default Chats;