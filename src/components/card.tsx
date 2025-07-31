import Chip from "./chip";
import { colorPalette } from "../constants/theme";
import type {
  CardContentProps,
  CardProps,
  CardTitleProps,
} from "../types/card";

const CardTitle = ({
  icon: Icon,
  iconColor,
  title,
  description,
}: CardTitleProps) => (
  <div className="flex flex-col items-center space-y-3 text-center md:flex-row md:space-y-0 md:space-x-5 md:text-left">
    <Icon size="40px" className={iconColor} />
    <div>
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="text-sm text-slate-500">{description}</p>
    </div>
  </div>
);

const CardContent = ({
  techs,
  title,
  color,
  onTechUpdate,
}: CardContentProps) => (
  <div className="flex flex-wrap gap-2">
    {techs
      .filter((tech) => !tech.card || tech.card === title)
      .map((tech) => (
        <Chip
          key={`${title}-${tech.title}`}
          title={tech.title}
          icon={<tech.icon size="20px" className={color} />}
          color={color}
          onClick={() => onTechUpdate(tech.title, title)}
          selected={tech.card === title}
        />
      ))}
  </div>
);

const Card = ({
  id,
  color,
  description,
  icon,
  onTechUpdate,
  techs,
  title,
}: CardProps) => {
  const baseColor = colorPalette[color];
  const iconColor = `text-${baseColor}-500`;

  return (
    <div
      id={id}
      className={`
        w-full lg:w-[450px] xl:w-[500px]
        bg-white
        shadow hover:shadow-lg
        transition-all duration-300
        p-5 rounded-xl space-y-5
      `}
    >
      <CardTitle
        icon={icon}
        iconColor={iconColor}
        title={title}
        description={description}
      />
      <CardContent
        techs={techs}
        title={title}
        color={color}
        onTechUpdate={onTechUpdate}
      />
    </div>
  );
};

export default Card;
