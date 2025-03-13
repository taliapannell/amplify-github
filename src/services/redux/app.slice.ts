// Import the createSlice function from Redux Toolkit
import { createSlice } from "@reduxjs/toolkit";
import { ChatData, createEmptyChatData } from "../../types/stateData/ChatData";
import { UserData, createEmptyUserData } from "../../types/stateData/UserData";

// Define initial slice state
interface AppState {
  suggestedPrompts: string[];
  chatData: ChatData;
  userData: UserData;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: AppState = {
  suggestedPrompts: [],
  chatData: createEmptyChatData(),
  userData: createEmptyUserData(),
  status: 'idle',
};

// Create the redux slice
export const appSlice = createSlice({
  name: "app",
  initialState: initialState,
  reducers: {
    updatePrompt: (state, action) => {
      state.chatData.prompt = action.payload;
    },
    updateMessages: (state, action) => {
			state.chatData.messages = action.payload;
		},
		updateChatIndex: (state, action) => {
			state.chatData.chatIndex = action.payload;
		},
    updateSessionId: (state, action) => {
      state.chatData.sessionId = action.payload;
    },
    updateChatId: (state, action) => {
      state.chatData.chatId = action.payload;
    },
    updateChatData: (state, action) => {
      state.chatData = action.payload;
    },
    updateSuggestedPrompts: (state, action) => {
      state.suggestedPrompts = action.payload;
    },
    updateUserId: (state, action) => {
      state.userData.id = action.payload;
    },
    updateSub : (state, action) => {
      state.userData.sub = action.payload;
    },
    updateUserData: (state, action) => {
      state.userData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
  }
});

export const { 
  // List the action creators here, e.g. updateExampleValue
  updatePrompt,
  updateMessages,
  updateChatIndex,
  updateChatId,
  updateChatData,
  updateSuggestedPrompts,
  updateUserId,
  updateSub,
  updateSessionId,
  updateUserData,
} = appSlice.actions;

// Export selectors
export const selectMessages = (state) => state.app.chatData.messages;
export const selectPrompt = (state) => state.app.chatData.prompt;
export const selectChatIndex = (state) => state.app.chatData.chatIndex;
export const selectSessionId = (state) => state.app.chatData.sessionId;
export const selectChatId = (state) => state.app.chatData.chatId;
export const selectSuggestedPrompts = (state) => state.app.suggestedPrompts;
export const selectUserId = (state) => state.app.userData.userId;
export const selectSub = (state) => state.app.userData.sub;
export const selectUserData = (state) => state.app.userData;

export default appSlice.reducer;