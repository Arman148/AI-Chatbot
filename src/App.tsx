import React, { useState, useEffect } from "react";
import HomePage from "./pages/home/HomePage";
import ChatPage from "./pages/chat/ChatPage";
import "./index.css";

const APP_PAGE_KEY = "app-current-page";

const App: React.FC = () => {
  const [isHomeVisible, setIsHomeVisible] = useState(() => {
    const saved = localStorage.getItem(APP_PAGE_KEY);
    return saved !== "chat";
  });

  const [isClosing, setIsClosing] = useState(false); // home -> chat
  const [isReturning, setIsReturning] = useState(false); // chat -> home

  useEffect(() => {
    localStorage.setItem(APP_PAGE_KEY, isHomeVisible ? "home" : "chat");
  }, [isHomeVisible]);

  const handleStartChat = () => {
    setIsClosing(true);
    setIsHomeVisible(true);
    setTimeout(() => {
      setIsClosing(false);
      setIsHomeVisible(false);
    }, 1000);
  };

  const handleBackToHome = () => {
    setIsReturning(true);
    setIsHomeVisible(true);
    setTimeout(() => {
      setIsReturning(false);
      // stay on home
    }, 1000);
  };

  return (
    <div className="app-root">
      <ChatPage onBackToHome={handleBackToHome} isHomeVisible={isHomeVisible} />
      <HomePage
        onStartChat={handleStartChat}
        isClosing={isClosing}
        isReturning={isReturning}
        isVisible={isHomeVisible}
      />
    </div>
  );
};

export default App;
