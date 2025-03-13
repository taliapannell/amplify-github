import axios, { AxiosError } from "axios";
import { ChatRequest } from "../interfaces/ChatRequest";
import { CustomerData } from "../interfaces/CustomerData";

const api = axios.create({
  baseURL: "https://8r67k6webb.execute-api.us-east-1.amazonaws.com/prod",
});

export const getData = async (id: any) => {
  const params = { id };
  const response = await api.get("/data", { params });
  return response.data as CustomerData;
}


// export const getAgentMessage = async (requestId: any) => {
//   const params = { requestId };
//   const response = await api.get("agent/message", { params });
//   return response.data;
// }


export const sendChatRequest = async (request: ChatRequest) => {
  try {
    const payload = {
      chatId: request.chatId,
      customerId: request.customerId,
      request: request.request
    };
    const response = await api.post('/chat', payload);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const axiosError = error as AxiosError;
      console.log("Axios Error: \n", (error as AxiosError).toJSON());
      return {
        chatId: request.chatId,
        customerId: request.customerId,
        response: `There was a problem, please try again. [${axiosError.message}]`
      }
    }
  }
}