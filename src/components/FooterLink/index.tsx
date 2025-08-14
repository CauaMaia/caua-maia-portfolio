import React from "react";
import "./styles.css";

export interface FooterLinkProps {
  href: string;
  label: string;
  className?: string;
  target?: React.HTMLAttributeAnchorTarget;
  rel?: string;
  current?: boolean; 
}

export const FooterLink: React.FC<FooterLinkProps> = ({
  href,
  label,
  className = "",
  target,
  rel,
  current = false,
}) => {
  return (
    <a
      href={href}
      className={`f-link ${current ? "is-active" : ""} ${className}`}
      aria-current={current ? "page" : undefined}
      target={target}
      rel={rel}
    >
      {label}
    </a>
  );
};
