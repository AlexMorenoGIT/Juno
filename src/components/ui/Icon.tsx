"use client";

import { svgMap } from "lineicons/src/svg-map.js";

type IconType = "regular";

interface IconProps {
  name: string;
  type?: IconType;
  size?: number | string;
  className?: string;
  "aria-label"?: string;
}

/**
 * Composant icône JUNO — Lineicons (606 icônes)
 *
 * Usage :
 *   <Icon name="home" />
 *   <Icon name="arrow-right" size={20} className="text-june-500" />
 *   <Icon name="user" aria-label="Profil utilisateur" />
 *
 * Catalogue complet : https://lineicons.com/icons
 */
export function Icon({
  name,
  type = "regular",
  size = 24,
  className = "",
  "aria-label": ariaLabel,
}: IconProps) {
  const icons = svgMap[type] as Record<string, string> | undefined;
  const svgString = icons?.[name];

  if (!svgString) {
    if (process.env.NODE_ENV === "development") {
      console.warn(`[Icon] Icône introuvable : "${name}" (type: ${type})`);
    }
    return null;
  }

  return (
    <span
      role={ariaLabel ? "img" : "presentation"}
      aria-label={ariaLabel}
      aria-hidden={!ariaLabel}
      className={`inline-flex shrink-0 ${className}`}
      style={{ width: size, height: size }}
      dangerouslySetInnerHTML={{ __html: svgString }}
    />
  );
}
