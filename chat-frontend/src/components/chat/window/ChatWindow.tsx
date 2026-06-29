import React, { useRef, useEffect, useState } from "react";
import Button from "../../ui/button/Button";
import Message from "../../ui/message/Message";
import ChatInput from "../input/ChatInput";
import { ChatMessage, isUIChatMessage } from "../../../types/chat";
import "./style.css";
import MathNoteOverlay from "../note/MathNoteOverlay";

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
  const messagesAreaRef = useRef<HTMLDivElement>(null);
  const prevLengthRef = useRef(0);
  const [isNoteOpen, setIsNoteOpen] = useState(false);
  const [noteLatex, setNoteLatex] = useState<string>("");
  const [chatPreset, setChatPreset] = useState<string | undefined>(undefined);

  // Scroll the messages area only when new messages are added (not on clear)
  useEffect(() => {
    const area = messagesAreaRef.current;
    if (!area) return;

    if (messages.length > prevLengthRef.current) {
      area.scrollTop = area.scrollHeight;
    }

    prevLengthRef.current = messages.length;
  }, [messages]);

  // Also scroll down when AI starts typing
  useEffect(() => {
    const area = messagesAreaRef.current;
    if (!area || !isTyping) return;
    area.scrollTop = area.scrollHeight;
  }, [isTyping]);

  const handleToggleNote = () => {
    setIsNoteOpen((prev) => !prev);
  };

  const handleInsertFromNote = () => {
    if (!noteLatex) return;
    // For now we just drop the LaTeX into the chat input.
    // Later we can transform it if needed.
    setChatPreset(noteLatex);
  };

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

      <div className="messages-area" ref={messagesAreaRef}>
        <div className="messages-inner">
          {messages.filter(isUIChatMessage).map((msg) => (
            <Message key={msg.id} role={msg.role} content={msg.content} />
          ))}

          {isTyping && (
            <div className="typing-row">
              <div className="typing-avatar">AI</div>
              <div className="typing-bubble">
                <span className="typing-dot" />
                <span className="typing-dot" />
                <span className="typing-dot" />
              </div>
            </div>
          )}
        </div>
      </div>

      <ChatInput
        onSend={onSendMessage}
        disabled={isTyping}
        onToggleNote={handleToggleNote}
        isNoteOpen={isNoteOpen}
        presetValue={chatPreset}
      />

      {isNoteOpen && (
        <MathNoteOverlay
          onClose={handleToggleNote}
          onChangeLatex={setNoteLatex}
          onInsertIntoChat={handleInsertFromNote}
        />
      )}
    </div>
  );
};

export default ChatWindow;
