import { ChatMessage } from "./ChatMessage";

export interface DataFrame {
  values: Array<any>;
  columns: Array<string>;
}

export interface ChartResponse {
  columns: Array<string>;
  values: any;
  x_axis: string;
  y_axis: string;
}

export interface AgentMessage extends ChatMessage {}
