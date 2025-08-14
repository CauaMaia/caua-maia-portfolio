import React from "react";
import "./styles.css";
import { FaTwitter, FaLinkedinIn, FaInstagram, FaGithub } from "react-icons/fa";
import type { IconType } from "react-icons";

type SocialType = "x" | "linkedin" | "instagram" | "github";

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

const ICONS: Record<SocialType, IconType> = {
  x: FaTwitter,
  linkedin: FaLinkedinIn,
  instagram: FaInstagram,
  github: FaGithub,
};

const Icon = ({ type }: { type: SocialType }): React.ReactElement => {
  const Comp = ICONS[type] as unknown as React.ComponentType; 
  return <Comp />;
};

export const SocialLinks: React.FC<SocialLinksProps> = ({
  items,
  size = "md",
  variant = "yellow",
  className = "",
}) => {
  return (
    <div className={`socials ${className}`}>
      {items.map(({ type, href, label }, i) => (
        <a
          key={`${type}-${i}`}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`social-btn ${variant} ${size}`}
          aria-label={label ?? type}
          title={label ?? type}
        >
          <Icon type={type} />
        </a>
      ))}
    </div>
  );
};
