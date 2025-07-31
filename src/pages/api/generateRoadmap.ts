import type { APIRoute } from "astro";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const { mastered, studying, learningGoals, unselectedTechs } =
      await request.json();

    const genAI = new GoogleGenerativeAI(import.meta.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-pro",
      generationConfig: {
        temperature: 0.5,
        responseMimeType: "application/json",
      },
    });

    const prompt = `
      Você é um especialista em Front-End, quero que você crie um roadmap na ordem que o usuário precisa aprender de acordo com as tecnologias que ele informou que já domina, que está estudando e que quer aprender. Analise todas essas tecnologias e monte um roadmap para que o usuário novato em desenvolvimento Front-End saiba o que estudar e quando estudar. Também leve em consideração as tecnologias que o usuário não selecionou e veja se faz sentido o usuário estudar algumas das tecnologias que não foram selecionadas de acordo com as tecnologias que ele selecionou.

      Considere:
      1. Priorize as tecnologias que o usuário deseja aprender
      2. Organize em uma sequência lógica (ex: fundamentos antes de frameworks)
      3. Relacione tecnologias complementares
      4. Considere o conhecimento atual do usuário (tecnologias dominadas e em estudo)

      Dados do usuário:
      - Tecnologias que já domina: ${mastered || "Nenhuma"}
      - Tecnologias que está estudando: ${studying || "Nenhuma"}
      - Tecnologias que deseja aprender: ${learningGoals || "Nenhuma"}
      - Tecnologias que não foram selecionadas: ${unselectedTechs || "Nenhuma"}

      FORMATO DE SAÍDA EXIGIDO (APENAS JSON):
      {
        "steps": [
          {
            "step": 1,
            "title": "Nome desse passo",
            "dependencies": ["Lista", "de", "pré-requisitos"],
            "description": "Por que aprender e como aplicar no contexto front-end",
            "resources": [
              {
                "title": "Título do recurso",
                "url": "https://exemplo.com"
              }
            ]
          },
        ]
      }

      Regras estritas:
      - Se o usuário quiser aprender uma tecnologia (ex: React) mas não dominar seus pré-requisitos essenciais (ex: JavaScript), o primeiro passo do roadmap DEVE ser focado em fortalecer esses pré-requisitos antes de introduzir a tecnologia desejada.
      - Não inclua nenhum texto adicional além do JSON
      - Formate cada etapa com tecnologia principal e suas dependências
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
