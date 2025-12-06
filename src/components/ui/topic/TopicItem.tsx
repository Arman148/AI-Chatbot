import React from "react";
import Button from "../button/Button";
import "./style.css";

interface TopicItemProps {
  label: string;
  onClick: () => void;
  isActive?: boolean;
}

const TopicItem: React.FC<TopicItemProps> = ({ label, onClick, isActive }) => {
  return (
    <Button
      onClick={onClick}
      variant="glass"
      className={`ui-topic-item ${isActive ? "active" : ""}`}
    >
      {label}
    </Button>
  );
};

export default TopicItem;
