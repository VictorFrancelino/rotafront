import { useState, useCallback } from "react";
import type { Tech } from "../types/tech";
import type { RoadmapStep } from "../types/roadmap";
import type { CardType } from "../types/card";

export const ERROR_TYPES = {
  NETWORK: "Falha na conexão com o servidor. Verifique sua internet.",
  IA_RESPONSE: "Problema na geração do roadmap. Tente ajustar suas seleções.",
  INVALID_FORMAT:
    "Formato inválido de resposta. Contate o administrador do site.",
  INVALID_API_KEY: "Chave de API inválida. Contate o administrador do site.",
  DEFAULT: "Erro ao gerar roadmap. Tente novamente mais tarde.",
};

const useRoadmapGenerator = (initialTechs: Tech[]) => {
  const [techs, setTechs] = useState<Tech[]>(initialTechs);
  const [roadmapSteps, setRoadmapSteps] = useState<RoadmapStep[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpdateTechCard = useCallback(
    (techTitle: string, cardTitle: CardType) => {
      setTechs((prevTechs) =>
        prevTechs.map((tech) =>
          tech.title === techTitle
            ? { ...tech, card: tech.card === cardTitle ? "" : cardTitle }
            : tech
        )
      );
    },
    []
  );

  const getTechsByCard = useCallback(
    (cardTitle: CardType) => {
      return techs
        .filter((tech) => tech.card === cardTitle)
        .map((tech) => tech.title);
    },
    [techs]
  );

  const handleGenerateRoadmap = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const mastered = getTechsByCard("Tecnologias que já domino");
      const studying = getTechsByCard(
        "Tecnologias que estou estudando atualmente"
      );
      const learningGoals = getTechsByCard("Tecnologias que quero aprender");
      const unselectedTechs = techs
        .filter((tech) => !tech.card)
        .map((tech) => tech.title);

      const response = await fetch("/api/generateRoadmap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mastered: mastered.length ? mastered.join(", ") : "Nenhuma",
          studying: studying.length ? studying.join(", ") : "Nenhuma",
          learningGoals: learningGoals.length
            ? learningGoals.join(", ")
            : "Nenhuma",
          unselectedTechs: unselectedTechs.length
            ? unselectedTechs.join(", ")
            : "Nenhuma",
        }),
      });

      if (!response.ok) {
        let errorMessage = "Falha na geração do roadmap";

        try {
          const errorData = await response.json();
          if (errorData.error) {
            if (errorData.error.includes("resposta em formato inválido")) {
              errorMessage =
                "A IA retornou uma resposta inesperada. Por favor, tente novamente.";
            } else if (errorData.error.includes("Falha na geração")) {
              errorMessage =
                "Não foi possível gerar o roadmap com os dados fornecidos.";
            } else {
              errorMessage = errorData.error;
            }
          }
        } catch {
          errorMessage =
            "Ocorreu um erro inesperado. Tente novamente mais tarde.";
        }

        throw new Error(errorMessage);
      }

      const data = await response.json();

      if (!data.steps || !Array.isArray(data.steps)) {
        throw new Error("Resposta inválida do servidor");
      }

      setRoadmapSteps(data.steps);
    } catch (err) {
      let errorMsg = ERROR_TYPES.DEFAULT;

      if (err instanceof Error) {
        if (err.message.includes("Failed to fetch")) {
          errorMsg = ERROR_TYPES.NETWORK;
        } else if (
          err.message.includes("IA") ||
          err.message.includes("resposta")
        ) {
          errorMsg = ERROR_TYPES.IA_RESPONSE;
        } else if (err.message.includes("Resposta inválida")) {
          errorMsg = ERROR_TYPES.INVALID_FORMAT;
        } else {
          errorMsg = err.message;
        }
      }

      setError(errorMsg);
      console.error("Erro ao gerar roadmap:", err);
    } finally {
      setIsLoading(false);
    }
  }, [techs, getTechsByCard]);

  return {
    techs,
    roadmapSteps,
    isLoading,
    error,
    handleUpdateTechCard,
    handleGenerateRoadmap,
    setRoadmapSteps,
  };
};

export default useRoadmapGenerator;
