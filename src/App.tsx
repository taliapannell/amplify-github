import "./App.scss";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginPage from "./pages/login-page/LoginPage";
import MainPage from "./pages/main-page/MainPage";
import { selectUserId } from "./services/redux/app.slice";
import { AppDispatch } from "./services/redux/store";

function App() {

  const dispatch = useDispatch<AppDispatch>();
  const userId = useSelector(selectUserId);

  // Fetch user data on app load and on sign in (when userId changes)
  useEffect(() => {
    if (userId) {
      // dispatch(fetchUserDataThunk(userId));
    }
  }, [dispatch, userId]);

  return (
    <>
      <LoginPage>
        <div className="app">
          <div className="content-wrapper">
            <Routes>
              <Route path="/" element={<MainPage />} />
            </Routes>
          </div>
        </div>
      </LoginPage>
    </>
  );
}

export default App;