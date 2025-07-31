import { techsList as initialTechs } from "../data/techsList";
import useRoadmapGenerator from "../hooks/useRoadmapGenerator";
import RoadmapView from "../components/roadmapView";
import LoadingButton from "../components/loadingButton";
import CardsContainer from "../components/cardsContainer";

const TechsSection = () => {
  const {
    techs,
    roadmapSteps,
    isLoading,
    error,
    handleUpdateTechCard,
    handleGenerateRoadmap,
    setRoadmapSteps,
  } = useRoadmapGenerator(initialTechs);

  if (roadmapSteps) {
    return (
      <RoadmapView steps={roadmapSteps} onReset={() => setRoadmapSteps(null)} />
    );
  }

  return (
    <>
      <CardsContainer techs={techs} onTechUpdate={handleUpdateTechCard} />

      <div className="flex flex-col items-center w-full mt-5">
        <LoadingButton onClick={handleGenerateRoadmap} isLoading={isLoading}>
          Criar meu Roadmap
        </LoadingButton>

        {error && (
          <div className="mt-4 p-4 bg-red-50 rounded-lg border border-red-500 max-w-2xl text-center">
            <p className="text-red-600 mt-2">{error}</p>
            <p className="text-red-600 mt-2">
              Por favor, tente novamente mais tarde.
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default TechsSection;
