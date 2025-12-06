import React from "react";
import "./style.css";

interface MessageProps {
  role: "user" | "assistant";
  content: string;
}

const Message: React.FC<MessageProps> = ({ role, content }) => {
  const isUser = role === "user";
  return (
    <div className={`message-wrapper ${isUser ? "msg-user" : "msg-ai"}`}>
      {!isUser && <div className="msg-avatar">AI</div>}
      <div className="message-bubble">{content}</div>
    </div>
  );
};

export default Message;
