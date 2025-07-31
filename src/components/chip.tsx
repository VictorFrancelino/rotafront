import { cva, type VariantProps } from "class-variance-authority";
import { ColorEnum } from "../constants/theme";

const chipVariants = cva(
  "flex justify-center items-center gap-x-2 rounded-full border-2 px-4 py-2 transition-all duration-300 transform hover:scale-105 hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2",
  {
    variants: {
      color: {
        [ColorEnum.GREEN]: `border-green-500 focus:ring-green-500`,
        [ColorEnum.BLUE]: `border-blue-500 focus:ring-blue-500`,
        [ColorEnum.ORANGE]: `border-orange-500 focus:ring-orange-500`,
      },
      selected: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      {
        color: ColorEnum.GREEN,
        selected: true,
        className: "bg-green-500 text-slate-50",
      },
      { color: ColorEnum.GREEN, selected: false, className: "text-green-500" },
      {
        color: ColorEnum.BLUE,
        selected: true,
        className: "bg-blue-500 text-slate-50",
      },
      { color: ColorEnum.BLUE, selected: false, className: "text-blue-500" },
      {
        color: ColorEnum.ORANGE,
        selected: true,
        className: "bg-orange-500 text-slate-50",
      },
      {
        color: ColorEnum.ORANGE,
        selected: false,
        className: "text-orange-500",
      },
    ],
    defaultVariants: {
      color: ColorEnum.GREEN,
      selected: false,
    },
  }
);

type ChipProps = VariantProps<typeof chipVariants> & {
  icon: React.ReactNode;
  title: string;
  onClick: () => void;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Chip = ({
  icon,
  title,
  color,
  onClick,
  selected,
  ...props
}: ChipProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={chipVariants({ color, selected })}
      {...props}
    >
      {icon}
      <span>{title}</span>
    </button>
  );
};

export default Chip;
