import React from "react";
import Button from "../ui/button/Button";
import "./style.css";

interface WelcomeScreenProps {
  onStartChat: () => void;
  isClosing: boolean;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onStartChat,
  isClosing,
}) => {
  return (
    <div className="welcome-screen-container">
      <div className="content-overlay">
        <h1 className="main-title">The Learning Assistant</h1>
        <p className="subtitle">
          Master complex topics through focused, guided chat.
        </p>
        <Button onClick={onStartChat} variant="glass">
          Start Learning Now
        </Button>
      </div>
    </div>
  );
};

export default WelcomeScreen;
