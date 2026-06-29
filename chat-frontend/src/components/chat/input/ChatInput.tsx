import React, { useEffect, useState } from "react";
import Button from "../../ui/button/Button";
import "./style.css";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  onToggleNote: () => void;
  isNoteOpen?: boolean;
  presetValue?: string;
}

const ChatInput: React.FC<ChatInputProps> = ({
  onSend,
  disabled,
  onToggleNote,
  isNoteOpen,
  presetValue,
}) => {
  const [inputValue, setInputValue] = useState("");

  // When presetValue changes (e.g. from Math note), put it into the input
  useEffect(() => {
    if (presetValue !== undefined) {
      setInputValue(presetValue);
    }
  }, [presetValue]);

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
        onClick={onToggleNote}
        variant="glass"
        className="note-btn-floating"
      >
        {isNoteOpen ? "✕" : "Note"}
      </Button>

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
