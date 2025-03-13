import { createSlice } from "@reduxjs/toolkit";
import { CustomerData, CustomerProcessedData } from "../interfaces/CustomerData";
import { Message } from "../interfaces/Chat";
import { processCustomerData, setInitialMessage } from "../utils/utils";
import { RootState } from "./store";
import { sendChatRequestThunk, getDataThunk } from "../services/thunks";

interface AppState {
  userId: string;
  prompt: string;
  requestId: string;
  chatId: string;
  messages: Message[];
  activeChat?: Chat | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  currentAttempt: number;
  agentResponse?: any;
  chatHistory?: Chat[];
  agentResponseError: string;
  
  customerData: CustomerData | null;
  customerProcessedData: CustomerProcessedData[] | null;
}

interface Chat {
  chatId: string;
}


const initialState: AppState = {
  userId: "",
  requestId: "",
  chatId: "",
  messages: setInitialMessage(),
  activeChat: null,
  chatHistory: [],
  agentResponse: null,
  currentAttempt: 0,
  prompt: "",
  status: 'idle',
  agentResponseError: "",
  
  customerData: null,
  customerProcessedData: null,
};

// Create the redux slice
export const appSlice = createSlice({
  name: "app",
  initialState: initialState,
  reducers: {
    updateUserId: (state, action) => {
      state.userId = action.payload;
    },
    updateChatId: (state, action) => {
      state.chatId = action.payload;
    },
    updatePrompt: (state, action) => {
      state.prompt = action.payload;
    },
    updateMessages: (state, action) => {
      state.messages = action.payload;
    },
    resetMessages: (state) => {
      state.agentResponse = "";
      state.messages = setInitialMessage();
    },
    updateActiveChat: (state, action) => {
      const selectedChat: Chat | null = action.payload;
      state.activeChat = state.chatHistory?.find((chat: Chat) => chat.chatId === selectedChat?.chatId) || null;
    },
    updateAgentResponse: (state, action) => {
      state.agentResponse = action.payload;
    },
    incrementAttempt: (state) => {
      state.currentAttempt += 1;
    },
    resetAttempts: (state) => {
      state.currentAttempt = 0;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDataThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getDataThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.customerData = action.payload;
        state.customerProcessedData = processCustomerData(action.payload);
      })
      .addCase(getDataThunk.rejected, (state, action) => {
        state.status = "failed";
        console.error("Error getting data:", action.error);
      })
      .addCase(sendChatRequestThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(sendChatRequestThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.agentResponse = action.payload;
      })
      .addCase(sendChatRequestThunk.rejected, (state, action) => {
        state.status = "failed";
        console.error("Error sending chat request:", action.error);
        // state.agentResponseError = action.payload;
      });
  }
});

export const { 
  updateUserId,
  updateChatId,
  updatePrompt,
  updateMessages,
  updateActiveChat,
  updateAgentResponse,
  incrementAttempt,
  resetAttempts,
  resetMessages,
} = appSlice.actions;

export const selectUserId = (state: RootState) => state.app.userId;
export const selectPrompt = (state: RootState) => state.app.prompt;
export const selectRequestId = (state: RootState) => state.app.requestId;
export const selectAgentResponse = (state: RootState) => state.app.agentResponse;
export const selectAgentResponseError = (state: RootState) => state.app.agentResponseError;
export const selectChatId = (state: RootState) => state.app.chatId;
export const selectMessages = (state: RootState) => state.app.messages;
export const selectCustomerData = (state: RootState) => state.app.customerData;
export const selectCustomerProcessedData = (state: RootState) => state.app.customerProcessedData;
export default appSlice.reducer;