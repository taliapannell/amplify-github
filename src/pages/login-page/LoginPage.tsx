import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./LoginPage.css";
import "@aws-amplify/ui-react/styles.css";
import { Amplify } from "aws-amplify";
import { Authenticator, ThemeProvider } from "@aws-amplify/ui-react";
import { LoginPageProps } from "../../types/props/LoginPageProps.tsx";
import HeaderBar from "../../components/HeaderBar/HeaderBar.tsx";
import theme_colors from "../../types/theme_colors.ts";

// amplify settings
import "@aws-amplify/ui-react/styles.css";
import { amplify } from "../../amplify_settings.ts";
import { Hub } from "aws-amplify/utils";
import { getCurrentUser } from "aws-amplify/auth";
import {
  updateChatData,
  updateSub,
  updateSuggestedPrompts,
  updateUserData,
  updateUserId,
} from "../../services/redux/app.slice.ts";
import { SuggestedPrompts } from "../../services/dummydata.tsx";
import { createEmptyUserData } from "../../types/stateData/UserData.tsx";
import { createEmptyChatData } from "../../types/stateData/ChatData.tsx";
Amplify.configure(amplify);

const LoginPage: React.FC<LoginPageProps> = ({ children }) => {
  const dispatch = useDispatch();
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const [userName, setUserName] = useState("Chan, Jack");

  useEffect(() => {
    Hub.listen("auth", ({ payload }) => {
      const { event } = payload;
      if (event === "signedIn") {
        console.log("User signed in");
        // Store user info on login for app-wide consumption
        loadCurrentUser();
      }
      if (event === "signedOut") {
        // console.log("User signed out");
        // Clear user info on logout
        setIsUserAuthenticated(false);
        dispatch(updateUserData(createEmptyUserData()));
        dispatch(updateChatData(createEmptyChatData()));
      }
    });
    // Initialize the current user and persona's prompts on page load
    loadCurrentUser();
    setSuggestedPrompts();
  }, []);

  const loadCurrentUser = async () => {
    try {
      const { username, signInDetails } = await getCurrentUser();
      dispatch(updateSub(username));
      const loginId = signInDetails?.loginId;
      dispatch(updateUserId(loginId));
      const id = loginId?.substring(0, loginId?.indexOf("@")).split(".");
      setUserName(`${id ? `${id[2] || id[1]}, ${id[0]}` : ""}`);
      setIsUserAuthenticated(true);
    } catch (error) {
      console.log("Error loading current user: ", error);
    }
  };

  const setSuggestedPrompts = () => {
    dispatch(updateSuggestedPrompts(SuggestedPrompts["example_1"]));
  };

  // A theme with custom blue colors for the tabs and buttons
  const theme = {
    name: "accenture-theme",
    tokens: {
      colors: {
        primary: {
          10: { value: theme_colors.PRIMARY_LIGHT },
          80: { value: theme_colors.PRIMARY },
          90: { value: theme_colors.PRIMARY_DARK },
        },
      },
    },
  };

  return (
    <div className="auth-container">
      <HeaderBar
        userName={userName}
        isUserAuthenticated={isUserAuthenticated}
      />
      <ThemeProvider theme={theme}>
        {amplify ? (
          <Authenticator className="authenticator">
            {({ signOut, user }) => <div>{children}</div>}
          </Authenticator>
        ) : (
          <div>{children}</div>
        )}
      </ThemeProvider>
    </div>
  );
};

export default LoginPage;
