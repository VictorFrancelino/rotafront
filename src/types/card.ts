import type { IconType } from "react-icons";
import type { ColorEnum } from "../constants/theme";
import type { Tech } from "./tech";

export type UpdateHandler = (target: string, cardId: CardType) => void;

export type CardType =
  | "Tecnologias que já domino"
  | "Tecnologias que estou estudando atualmente"
  | "Tecnologias que quero aprender";

export type CardProps = {
  id: string;
  title: CardType;
  description: string;
  icon: IconType;
  color: ColorEnum;
  techs: Tech[];
  onTechUpdate: UpdateHandler;
};

export type CardTitleProps = {
  icon: IconType;
  iconColor: string;
  title: CardType;
  description: string;
};

export type CardContentProps = {
  techs: Tech[];
  title: CardType;
  color: ColorEnum;
  onTechUpdate: UpdateHandler;
};

export type CardsContainerProps = {
  techs: Tech[];
  onTechUpdate: (techTitle: string, cardTitle: CardType) => void;
};
