import { LuGithub } from "react-icons/lu";

const Navbar = () => {
  return (
    <nav className="flex w-full h-16 items-center justify-between px-5 shadow flex-shrink-0">
      <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-violet-500 to-violet-800 bg-clip-text text-transparent">
        RotaFront
      </h1>
      <a
        href="#"
        target="_blank"
        aria-label="Visitar repositório do projeto no GitHub"
        className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-violet-500 bg-transparent text-violet-500 transition-all duration-300 hover:bg-violet-500 hover:text-slate-50 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2"
      >
        <LuGithub size={16} />
      </a>
    </nav>
  );
};

export default Navbar;
