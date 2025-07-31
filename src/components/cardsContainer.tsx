import type { CardsContainerProps } from "../types/card";
import Card from "./card";
import { cardsList } from "../data/cardsList";

const CardsContainer = ({ techs, onTechUpdate }: CardsContainerProps) => (
  <section className="flex flex-wrap justify-center gap-5">
    {cardsList.map((card) => (
      <Card key={card.id} {...card} techs={techs} onTechUpdate={onTechUpdate} />
    ))}
  </section>
);

export default CardsContainer;
