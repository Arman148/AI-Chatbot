import React from "react";
import WelcomeScreen from "../../components/welcome/WelcomeScreen";
import AuthButtons from "../../components/auth/AuthButtons";
import "./style.css";

interface HomePageProps {
  onStartChat: () => void;
  isClosing: boolean;
  isReturning: boolean;
  isVisible: boolean;
}

const HomePage: React.FC<HomePageProps> = ({
  onStartChat,
  isClosing,
  isReturning,
  isVisible,
}) => {
  const rootClassName = [
    "home-page-container",
    isClosing ? "page-exit" : "",
    isReturning ? "page-enter" : "",
    !isVisible ? "page-hidden" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={rootClassName}>
      <div className="auth-header-btn">
        <AuthButtons />
      </div>
      <WelcomeScreen onStartChat={onStartChat} isClosing={isClosing} />
    </div>
  );
};

export default HomePage;
