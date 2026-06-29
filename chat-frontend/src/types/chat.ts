export type MessageRole = "user" | "assistant" | "system";

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: number;
  isTyping?: boolean;
}

export type UIMsgRole = "user" | "assistant";
export interface UIChatMessage {
  id: string;
  role: UIMsgRole;
  content: string;
  timestamp: number;
}

export interface OpenAIMessage {
  role: MessageRole;
  content: string;
}

export function isUIChatMessage(msg: ChatMessage): msg is UIChatMessage {
  return msg.role === "user" || msg.role === "assistant";
}
