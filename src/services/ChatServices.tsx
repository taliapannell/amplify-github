import { MessageFeedback } from "../types/appData/FeedbackData.tsx";
import { ChatDataMessage } from "../types/stateData/ChatData.tsx";
import {
  SavedChat,
  UserData,
} from "../types/stateData/UserData.tsx";
import { addFeedbackThunk } from "./api/thunks.ts";
// import { updateUserDataThunk } from '../api/thunks.ts';
import { updateUserData } from "./redux/app.slice.ts";

// Add a new saved chat
export const addSavedChat = (savedChat: SavedChat) => {
  return (dispatch, getState) => {
    const state = getState();
    const userData = state.app.userData;
    const newSavedChats = [...userData.savedChats, savedChat];
    const newUserData = {
      ...userData,
      savedChats: newSavedChats,
    };
    // dispatch(updateUserDataThunk(newUserData));
    dispatch(updateUserData(newUserData));
  };
};

// Edit saved chat by index
export const editSavedChat = (index: number, savedChat: SavedChat) => {
  return (dispatch, getState) => {
    const state = getState();
    const userData = state.app.userData;
    const newSavedChats = userData.savedChats.map((chat, i) => {
      if (i === index) {
        return savedChat;
      }
      return chat;
    });
    const newUserData = {
      ...userData,
      savedChats: newSavedChats,
    };
    // dispatch(updateUserDataThunk(newUserData));
    dispatch(updateUserData(newUserData));
  };
};

// Add message to saved chat with index
export const addMessageToSavedChat = (
  index: number,
  message: ChatDataMessage
) => {
  return (dispatch, getState) => {
    const state = getState();
    const userData = state.app.userData;
    const newSavedChats = userData.savedChats.map((chat, i) => {
      if (i === index) {
        return {
          ...chat,
          messages: [...chat.messages, message],
        };
      }
      return chat;
    });
    const newUserData = {
      ...userData,
      savedChats: newSavedChats,
    };
    // dispatch(updateUserDataThunk(newUserData));
    dispatch(updateUserData(newUserData));
  };
};

// Remove saved chat by index
export const removeSavedChat = (index: number) => {
  return (dispatch, getState) => {
    const state = getState();
    const userData = state.app.userData;
    const newSavedChats = userData.savedChats.filter((chat, i) => i !== index);
    const newUserData = {
      ...userData,
      savedChats: newSavedChats,
    };
    // dispatch(updateUserDataThunk(newUserData));
    dispatch(updateUserData(newUserData));
  };
};

// Add feedback
export const addFeedback = (feedback: MessageFeedback) => {
  return (dispatch, getState) => {
    const state = getState();
    const userData = state.app.userData;
    const filteredFeedback = userData.feedback.filter(
      (fb) => fb.feedback.response !== feedback.feedback.response
    );
    const newFeedback = [...filteredFeedback, feedback];
    const newUserData = {
      ...userData,
      feedback: newFeedback,
    };
    dispatch(addFeedbackThunk(feedback)); // Add feedback to the server
    dispatch(updateUserData(newUserData));
  };
};

// Edit the comment on the feedback for the provided ai response
export const editFeedbackComment = (aiResponse: string, comment: string) => {
  return (dispatch, getState) => {
    const state = getState();
    const userData: UserData = state.app.userData;
    let editedFeedback = null;
    const newFeedback = userData.feedback.map((fb) => {
      if (fb.feedback.response === aiResponse) {
        editedFeedback = { ...fb, feedback: { ...fb.feedback, comment } };
        return editedFeedback;
      }
      return fb;
    });
    const newUserData = {
      ...userData,
      feedback: newFeedback,
    };
    if (editedFeedback) {
      dispatch(addFeedbackThunk(editedFeedback));
    }
    dispatch(updateUserData(newUserData));
  };
};

// Remove feedback for provided ai response
export const removeFeedback = (aiResponse: string) => {
  return (dispatch, getState) => {
    const state = getState();
    const userData: UserData = state.app.userData;
    const newFeedback = userData.feedback.filter(
      (feedback) => feedback.feedback.response !== aiResponse
    );
    const newUserData = {
      ...userData,
      feedback: newFeedback,
    };
    // Nothing to do on the backend for now
    dispatch(updateUserData(newUserData));
  };
};
