import axios from "axios";
import { MessageFeedback } from "../../types/appData/FeedbackData";

const api = axios.create({
  baseURL: "https://rgbswwaqcg.execute-api.us-east-1.amazonaws.com/prod",
});

export const addResponseFeedback = async (data: MessageFeedback) => {
  const response = await api.post("add-response-feedback", data);
  return response.data;
}