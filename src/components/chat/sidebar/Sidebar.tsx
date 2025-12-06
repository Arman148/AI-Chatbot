import React from "react";
import Section from "../../ui/section/Section";
import TopicItem from "../../ui/topic/TopicItem";
import { TopicData } from "../../../data/topics";
import "./style.css";

interface SidebarProps {
  topics: TopicData[];
  activeTopicId?: string;
  onSelectTopic: (id: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  topics,
  activeTopicId,
  onSelectTopic,
}) => (
  <div className="chat-sidebar">
    <Section title="Topics">
      {topics.length > 0 ? (
        topics.map((topic) => (
          <TopicItem
            key={topic.id}
            label={topic.label}
            isActive={activeTopicId === topic.id}
            onClick={() => onSelectTopic(topic.id)}
          />
        ))
      ) : (
        <div
          style={{
            color: "rgba(255,255,255,0.4)",
            fontSize: "0.9rem",
            paddingLeft: "0.5rem",
          }}
        >
          No topics available.
        </div>
      )}
    </Section>
    <Section title="History">
      <div
        style={{
          color: "rgba(255,255,255,0.4)",
          fontSize: "0.9rem",
          paddingLeft: "0.5rem",
        }}
      >
        There is no history yet.
      </div>
    </Section>
  </div>
);

export default Sidebar;
