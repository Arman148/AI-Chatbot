import React, { ReactNode } from "react";
import "./style.css";

interface SectionProps {
  title: string;
  children: ReactNode;
  className?: string;
}

const Section: React.FC<SectionProps> = ({
  title,
  children,
  className = "",
}) => {
  return (
    <div className={`ui-section ${className}`}>
      <h4 className="ui-section-title">{title}</h4>
      <div className="ui-section-content">{children}</div>
    </div>
  );
};

export default Section;
