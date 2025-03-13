import { ChatRequest } from "../interfaces/ChatRequest";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getData, sendChatRequest } from "./api";


export const getDataThunk = createAsyncThunk(
  "data/getData",
  async (id: string) => {
      const data = await getData(id);
      return data;
  }
);
    
export const sendChatRequestThunk = createAsyncThunk(
  "chat/sendChatRequest",
  async (chatRequest: ChatRequest, {rejectWithValue}) => {
    try {
      const response = await sendChatRequest(chatRequest);
      return response.response;
    } catch (error) {
      rejectWithValue(`There was a problem with the chat request. ${error}`)
    }
  }
);