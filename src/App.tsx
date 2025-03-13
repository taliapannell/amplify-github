import "./App.scss";
import { AppDispatch } from "./redux/store";
import { getDataThunk } from "./services/thunks";
import { Routes, Route } from "react-router-dom";
import { selectUserId } from "./redux/app.slice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import ChatPage from "./pages/ChatPage/ChatPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import MainPage from "./pages/MainPage/MainPage";

function App() {

  const dispatch = useDispatch<AppDispatch>();
  const userId = useSelector(selectUserId);

  // Fetch user data on app load and on sign in (when userId changes)
  useEffect(() => {
    if (userId) {
      dispatch(getDataThunk(userId));
    }
  }, [dispatch, userId]);

  return (
    <>
      <LoginPage>
        <div className="app">
          <div className="content-wrapper">
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/chat/:customerId" element={<ChatPage />} />
            </Routes>
          </div>
        </div>
      </LoginPage>
    </>
  );
}

export default App;
