import type { RoadmapStep } from "../types/roadmap";
import RoadmapTimeline from "./roadmapTimeline";

const RoadmapView = ({
  steps,
  onReset,
}: {
  steps: RoadmapStep[];
  onReset: () => void;
}) => (
  <>
    <div className="flex flex-col items-center pb-5">
      <div className="flex flex-col items-center w-full max-w-4xl p-6 rounded-lg bg-slate-50 transition-all duration-300 space-y-5 border-2 border-violet-500">
        <h3 className="text-2xl text-center font-bold">
          Seu Roadmap Personalizado
        </h3>
        <RoadmapTimeline steps={steps} />
      </div>
    </div>
    <button
      onClick={onReset}
      className="w-full max-w-96 mx-auto rounded-lg px-8 py-4 transition-all duration-300 text-white font-bold bg-gradient-to-r from-violet-500 to-violet-800 hover:cursor-pointer hover:shadow-lg"
    >
      Gerar Novo Roadmap
    </button>
  </>
);

export default RoadmapView;
