export interface Data {
    additional_kwargs?: any;
    content: string;
    example?: boolean;
    id?: string;
    name?: "request" | "response";
    response_metadata?: any;
    type: "ai" | "human" | "system";

    time?: string;
    isUser?: boolean;
    source?: string;
    title?: string;
    pageNumber?: string;
    initials?: string;
}

export interface Message {
    data: Data,
    type: "ai" | "human"
}

export interface Chat {
    userId: string;
    chatId: string;
    History: Message[];
}