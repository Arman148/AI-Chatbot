import React, { useState } from "react";
import Button from "../../ui/button/Button";
import "./style.css";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend, disabled }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSend = () => {
    if (inputValue.trim() && !disabled) {
      onSend(inputValue);
      setInputValue("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chat-input-container">
      <button className="attach-btn-floating">📎</button>
      <div className="input-field-floating">
        <textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your math question..."
          rows={1}
          disabled={disabled}
          className="chat-textarea"
        />
      </div>
      <Button
        onClick={handleSend}
        variant="glass"
        className="send-btn-floating"
      >
        ➤
      </Button>
    </div>
  );
};

export default ChatInput;
