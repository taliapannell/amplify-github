import { createAsyncThunk } from "@reduxjs/toolkit";
import { addResponseFeedback } from "./api";
import { MessageFeedback } from "../../types/appData/FeedbackData";

// export const fetchUserDataThunk = createAsyncThunk(
//   "data/fetchUserData",
//   async (id: string) => {
//     const data = await getUserData(id);
//     return data;
//   }
// );

// export const updateUserDataThunk = createAsyncThunk(
//   "data/updateUserData",
//   async (newData: UserData) => {
//     // console.log("Updating user data:", newData)
//     const data = await postUserData(newData);
//     return data;
//   }
// );

// Feedback thunks
export const addFeedbackThunk = createAsyncThunk(
  "data/addFeedback",
  async (feedback: MessageFeedback) => {
    console.log("Adding feedback:", feedback);
    const data = await addResponseFeedback(feedback);
    return data;
  }
);