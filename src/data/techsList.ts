import type { Tech } from "../types/tech";
import {
  FaHtml5,
  FaCss3Alt,
  FaReact,
  FaVuejs,
  FaAngular,
  FaBootstrap,
  FaGitAlt,
} from "react-icons/fa";
import { FiFigma } from "react-icons/fi";
import { IoLogoJavascript } from "react-icons/io5";
import { BiLogoTypescript } from "react-icons/bi";
import {
  SiSass,
  SiWebpack,
  SiRedux,
  SiNextdotjs,
  SiVite,
  SiAstro,
  SiNuxtdotjs,
  SiJest,
  SiMui,
  SiChakraui,
} from "react-icons/si";
import { RiTailwindCssFill, RiSvelteFill } from "react-icons/ri";
import { DiJqueryLogo } from "react-icons/di";
import { TbBrandSolidjs } from "react-icons/tb";

export const techsList: Tech[] = [
  { title: "HTML5", icon: FaHtml5, card: "" },
  { title: "CSS3", icon: FaCss3Alt, card: "" },
  { title: "Sass/SCSS", icon: SiSass, card: "" },
  { title: "Tailwind CSS", icon: RiTailwindCssFill, card: "" },
  { title: "BootStrap", icon: FaBootstrap, card: "" },
  { title: "JavaScript", icon: IoLogoJavascript, card: "" },
  { title: "TypeScript", icon: BiLogoTypescript, card: "" },
  { title: "jQuery", icon: DiJqueryLogo, card: "" },
  { title: "React", icon: FaReact, card: "" },
  { title: "Vue", icon: FaVuejs, card: "" },
  { title: "Angular", icon: FaAngular, card: "" },
  { title: "Astro", icon: SiAstro, card: "" },
  { title: "Svelte", icon: RiSvelteFill, card: "" },
  { title: "SolidJS", icon: TbBrandSolidjs, card: "" },
  { title: "NextJS", icon: SiNextdotjs, card: "" },
  { title: "NuxtJS", icon: SiNuxtdotjs, card: "" },
  { title: "Vite", icon: SiVite, card: "" },
  { title: "Webpack", icon: SiWebpack, card: "" },
  { title: "Redux", icon: SiRedux, card: "" },
  { title: "Jest", icon: SiJest, card: "" },
  { title: "Git", icon: FaGitAlt, card: "" },
  { title: "Figma", icon: FiFigma, card: "" },
  { title: "Material UI", icon: SiMui, card: "" },
  { title: "Chakra UI", icon: SiChakraui, card: "" },
];
