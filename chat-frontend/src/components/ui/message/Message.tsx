import React from "react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "./style.css";

interface MessageProps {
  role: "user" | "assistant";
  content: string;
}

const Message: React.FC<MessageProps> = ({ role, content }) => {
  const isUser = role === "user";

  return (
    <div className={`msg-row ${isUser ? "msg-row--user" : "msg-row--ai"}`}>
      <div className={`msg-body ${isUser ? "msg-body--user" : "msg-body--ai"}`}>
        <div className="msg-content">
          <ReactMarkdown
            remarkPlugins={[remarkMath]}
            rehypePlugins={[rehypeKatex]}
          >
            {content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default Message;
