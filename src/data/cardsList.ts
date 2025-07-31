import { LuCircleCheckBig, LuBookOpen, LuTarget } from "react-icons/lu";
import { ColorEnum } from "../constants/theme";
import type { CardType } from "../types/card";

export const cardsList = [
  {
    id: "card-mastered",
    icon: LuCircleCheckBig,
    title: "Tecnologias que já domino" as CardType,
    description:
      "Selecione as tecnologias com as quais você tem experiência sólida e confiança.",
    color: ColorEnum.GREEN,
  },
  {
    id: "card-studying",
    icon: LuBookOpen,
    title: "Tecnologias que estou estudando atualmente" as CardType,
    description:
      "Tecnologias que você está aprendendo ou aprimorando no momento.",
    color: ColorEnum.BLUE,
  },
  {
    id: "card-learning-goals",
    icon: LuTarget,
    title: "Tecnologias que quero aprender" as CardType,
    description:
      "Suas próximas metas de aprendizado e tecnologias de interesse futuro.",
    color: ColorEnum.ORANGE,
  },
];
