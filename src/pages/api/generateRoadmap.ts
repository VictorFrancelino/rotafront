import type { APIRoute } from "astro";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const { mastered, studying, learningGoals, unselectedTechs } =
      await request.json();

    const genAI = new GoogleGenerativeAI(import.meta.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash-lite",
      generationConfig: {
        temperature: 0.5,
        responseMimeType: "application/json",
      },
    });

    const prompt = `
      Você é um especialista em Front-End. Analise o conhecimento do usuário e crie um roadmap de estudos focado em suas metas, priorizando as tecnologias que ele deseja aprender.

      Instruções:
      1. Sequência Lógica: Organize os passos de forma sequencial (ex: fundamentos antes de frameworks).
      2. Pré-requisitos: Se a meta do usuário depender de uma tecnologia não dominada, o primeiro passo deve ser focado no pré-requisito.
      3. Tecnologias Complementares: Inclua tecnologias relevantes que o usuário não selecionou, se fizerem sentido para o roadmap.

      Dados do usuário:
      - Dominadas: ${mastered || "Nenhuma"}
      - Em Estudo: ${studying || "Nenhuma"}
      - Metas: ${learningGoals || "Nenhuma"}
      - Não Selecionadas: ${unselectedTechs || "Nenhuma"}


      Formato de Saída (JSON):
      {
        "steps": [
          {
            "step": 1,
            "title": "Nome do passo (ex: 'Fundamentos de JavaScript')",
            "description": "Explicação do porquê e como aplicar",
            "resources": [
              {
                "title": "Título do recurso",
                "url": "https://exemplo.com"
              }
            ]
          }
        ]
      }

      Restrições:
      - A saída deve ser APENAS o JSON.
      - O JSON deve conter a tecnologia principal do passo e suas dependências.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const roadmapContent = response.text().trim();

    try {
      const parsedRoadmap = JSON.parse(roadmapContent);

      if (!parsedRoadmap.steps || !Array.isArray(parsedRoadmap.steps)) {
        throw new Error("A IA retornou uma estrutura de roadmap inválida");
      }

      return Response.json(parsedRoadmap);
    } catch (e) {
      console.error("Conteúdo inválido:", roadmapContent);
      throw new Error("A IA retornou uma resposta em formato inválido.");
    }
  } catch (error) {
    console.error("Erro no endpoint:", error);

    let errorMessage = "Erro interno no servidor";
    if (error instanceof Error) {
      if (error.message.includes("resposta em formato inválido")) {
        errorMessage = "Resposta da IA em formato inesperado";
      } else if (error.message.includes("estrutura de roadmap inválida")) {
        errorMessage = "A estrutura do roadmap retornado é inválida";
      } else {
        errorMessage = error.message;
      }
    }

    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
