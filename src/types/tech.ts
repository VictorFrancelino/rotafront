import type { IconType } from "react-icons";
import type { CardType } from "./card";

export type Tech = {
  title: string;
  icon: React.ComponentType<{ size?: string; className?: string }> | IconType;
  card: CardType | "";
};
