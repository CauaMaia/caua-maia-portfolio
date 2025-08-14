import React from "react";
import "./styles.css";

interface TagProps {
  label: string;
  variant?: "yellow" | "dark";
}

export const Tag: React.FC<TagProps> = ({ label, variant = "yellow" }) => {
  return (
    <span className={`tag tag--${variant}`}>{label}</span>
  );
};
