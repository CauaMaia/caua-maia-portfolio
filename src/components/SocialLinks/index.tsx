import React from "react";
import "./styles.css";
import { FaLinkedinIn, FaGithub, FaFigma } from "react-icons/fa";
import { SiFigma } from "react-icons/si";

type SocialType = "linkedin" | "github" | "figma";

export interface SocialItem {
  type: SocialType;
  href: string;
  label?: string;
}

interface SocialLinksProps {
  items: SocialItem[];
  size?: "sm" | "md" | "lg";
  variant?: "yellow" | "outline";
  className?: string;
}

const SIZE_PX = { sm: 16, md: 20, lg: 24 } as const;

function getIcon(type: SocialType): any {
  switch (type) {
    case "linkedin":
      return FaLinkedinIn as any;
    case "github":
      return FaGithub as any;
    case "figma":
      return (FaFigma as any) ?? (SiFigma as any);
  }
}

export const SocialLinks: React.FC<SocialLinksProps> = ({
  items,
  size = "md",
  variant = "yellow",
  className = "",
}) => {
  const px = SIZE_PX[size];

  return (
    <div className={`socials ${className}`}>
      {items.map(({ type, href, label }, i) => {
        const Icon = getIcon(type);
        return (
          <a
            key={`${type}-${i}`}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`social-btn ${variant} ${size}`}
            aria-label={label ?? type}
            title={label ?? type}
          >
            {React.createElement(Icon as any, {
              size: px,
              "aria-hidden": true,
              focusable: "false",
            })}
          </a>
        );
      })}
    </div>
  );
};
