import React, { useState, useCallback } from "react";
import Sidebar from "../../components/chat/sidebar/Sidebar";
import ChatWindow from "../../components/chat/window/ChatWindow";
import { useChat } from "../../hooks/useChat";
import { useAuth0 } from "@auth0/auth0-react";
import "./style.css";
import Button from "../../components/ui/button/Button";

interface ChatPageProps {
  onBackToHome: () => void;
  isHomeVisible: boolean;
}

const ChatPage: React.FC<ChatPageProps> = ({ onBackToHome, isHomeVisible }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();

  const apiClient = useCallback(
    async (input: RequestInfo, init?: RequestInit) => {
      const token = await getAccessTokenSilently();
      return fetch(input, {
        ...(init || {}),
        headers: {
          ...(init?.headers || {}),
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
    },
    [getAccessTokenSilently]
  );

  const { topics, currentTopic, messages, isTyping, selectTopic, sendMessage } =
    useChat(apiClient, { isAuthenticated, isAuthLoading: isLoading });

  if (isLoading) return null;

  return (
    <div className="chat-page-layout">
      {!isHomeVisible && (
        <div className="chat-top-bar">
          <Button
            variant="glass"
            onClick={onBackToHome}
            className="chat-top-bar-btn"
          >
            ˅
          </Button>
        </div>
      )}

      <div className={`layout-sidebar ${isSidebarOpen ? "sidebar-open" : ""}`}>
        <Sidebar
          topics={topics}
          activeTopicId={currentTopic?.id}
          onSelectTopic={selectTopic}
        />
      </div>

      <div className="layout-main">
        <ChatWindow
          topicName={currentTopic?.label || ""}
          messages={messages}
          isTyping={isTyping}
          onSendMessage={sendMessage}
          onToggleSidebar={() => setIsSidebarOpen((v) => !v)}
          isSidebarOpen={isSidebarOpen}
        />
      </div>

      {isSidebarOpen && (
        <div
          className="mobile-overlay"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default ChatPage;
