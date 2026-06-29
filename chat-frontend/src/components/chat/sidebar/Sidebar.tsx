import React, { useState } from "react";
import Section from "../../ui/section/Section";
import TopicItem from "../../ui/topic/TopicItem";
import Button from "../../ui/button/Button";
import { TopicData } from "../../../data/topics";
import "./style.css";

interface SidebarProps {
  topics: TopicData[];
  activeTopicId?: string;
  activeSubthemeId?: string;
  onSelectTopic: (id: string) => void;
  onSelectSubtheme: (id: string) => void;
  onRequestTest: () => void;
  isTestMode?: boolean; // ← added
}

const Sidebar: React.FC<SidebarProps> = ({
  topics,
  activeTopicId,
  activeSubthemeId,
  onSelectTopic,
  onSelectSubtheme,
  onRequestTest,
  isTestMode = false, // ← added with default
}) => {
  const [expandedTopicId, setExpandedTopicId] = useState<string | null>(
    activeTopicId ?? null,
  );

  const handleTopicClick = (topic: TopicData) => {
    if (topic.id !== activeTopicId) {
      onSelectTopic(topic.id);
      setExpandedTopicId(topic.id);
    } else {
      setExpandedTopicId((prev) => (prev === topic.id ? null : topic.id));
    }
  };

  const handleSubthemeClick = (subId: string) => {
    onSelectSubtheme(subId);
  };

  return (
    <div className="chat-sidebar">
      <Section title="Topics">
        {topics.length > 0 ? (
          topics.map((topic) => {
            const isActiveTopic = activeTopicId === topic.id;
            const isExpanded = expandedTopicId === topic.id;

            return (
              <div key={topic.id} className="topic-block">
                <TopicItem
                  label={topic.label}
                  isActive={isActiveTopic}
                  onClick={() => handleTopicClick(topic)}
                />

                {topic.subthemes.length > 0 && (
                  <div
                    className={
                      "subtheme-list" +
                      (isExpanded ? " subtheme-list--open" : "")
                    }
                  >
                    {topic.subthemes.map((sub) => (
                      <TopicItem
                        key={sub.id}
                        label={sub.label}
                        isActive={activeSubthemeId === sub.id}
                        onClick={() => handleSubthemeClick(sub.id)}
                      />
                    ))}

                    {isActiveTopic && (
                      <div className="subtheme-test-button-wrapper">
                        <Button
                          variant={
                            isTestMode ? "test-button-active" : "test-button"
                          }
                          onClick={onRequestTest}
                        >
                          {isTestMode ? "In test mode" : "Test yourself"}
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="sidebar-empty-text">No topics available.</div>
        )}
      </Section>
    </div>
  );
};

export default Sidebar;
