import React, { useRef, useEffect } from "react";
import Button from "../../ui/button/Button";
import Message from "../../ui/message/Message";
import ChatInput from "../input/ChatInput";
import { ChatMessage, isUIChatMessage } from "../../../types/chat";
import "./style.css";

interface ChatWindowProps {
  topicName: string;
  messages: ChatMessage[];
  isTyping: boolean;
  onSendMessage: (msg: string) => void;
  onToggleSidebar?: () => void;
  isSidebarOpen?: boolean;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  topicName,
  messages,
  isTyping,
  onSendMessage,
  onToggleSidebar,
  isSidebarOpen,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  return (
    <div className="chat-window-container">
      <div className="chat-header">
        <div className="mobile-toggle-wrapper">
          <Button
            onClick={onToggleSidebar || (() => {})}
            variant="glass"
            className="icon-btn"
          >
            {isSidebarOpen ? "✕" : "☰"}
          </Button>
        </div>
        <h3 className="topic-title">
          Current Topic: {topicName || "None selected"}
        </h3>
      </div>
      <div className="messages-area">
        {messages.filter(isUIChatMessage).map((msg) => (
          <Message key={msg.id} role={msg.role} content={msg.content} />
        ))}
        {isTyping && (
          <div className="opacity-50 ml-4 mb-4 text-white text-sm">
            AI is thinking...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <ChatInput onSend={onSendMessage} disabled={isTyping} />
    </div>
  );
};

export default ChatWindow;
