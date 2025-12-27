import type { ComponentType } from "react";
import * as Icons from "lucide-react";

const iconList = Icons as unknown as Record<
  string,
  ComponentType<{ size?: number; className?: string }>
>;

type IconName = keyof typeof iconList;

type IconProps = {
  className?: string;
  name: IconName;
  size?: number; // in pixels
};

function Icon({ name, size = 16, className }: IconProps) {
  const LucideIcon = iconList[name];
  if (typeof LucideIcon !== "function" && typeof LucideIcon !== "object")
    return null;

  // For lucide-react, some exports are { default, ... }, etc. Handle if LucideIcon has a 'default' property which is a component.
  const IconComponent =
    typeof LucideIcon === "function" || (LucideIcon && "render" in LucideIcon)
      ? LucideIcon
      : LucideIcon &&
          typeof LucideIcon === "object" &&
          "default" in LucideIcon &&
          typeof (LucideIcon as Record<string, unknown>).default === "function"
        ? ((LucideIcon as Record<string, unknown>).default as ComponentType<{
            size?: number;
            className?: string;
          }>)
        : null;

  if (!IconComponent) return null;
  const ValidIconComponent = IconComponent as ComponentType<{
    size?: number;
    className?: string;
  }>;

  return <ValidIconComponent size={size} className={className} />;
}

export { Icon, type IconProps, type IconName, iconList };
