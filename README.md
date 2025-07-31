# RotaFront 🧭

**RotaFront** é o seu copiloto na jornada de desenvolvimento Front-End. Esta aplicação interativa permite que você selecione as tecnologias que já domina, as que está estudando e as que deseja aprender. Com base nessas informações, a IA, integrada com o **Google Gemini**, gera um roadmap de estudos personalizado e lógico para acelerar sua carreira.

---

## ✨ Funcionalidades

- **Seleção Interativa:** Escolha tecnologias em três categorias: "Já domino", "Estou estudando" e "Quero aprender".
- **Geração com IA:** Utilize o poder do Google Gemini para criar um plano de estudos inteligente e adaptado ao seu perfil.
- **Roadmap Personalizado:** Receba um passo a passo claro, com descrição, pré-requisitos e sugestões de recursos para cada etapa.
- **Interface Moderna:** Uma UI limpa e responsiva construída com React e TailwindCSS, rodando em um projeto Astro.
- **Feedback de Carregamento e Erros:** A interface informa o usuário durante a geração do roadmap e exibe mensagens de erro claras.

---

## 💻 Tecnologias Utilizadas

- **Framework:** [**Astro**](https://astro.build/) - Para o ambiente de desenvolvimento e build do site, permitindo a renderização de componentes de UI no servidor ou cliente.
- **Biblioteca de UI:** [**React**](https://react.dev/) - Para criar os componentes interativos da aplicação (client:load).
- **Linguagem:** [**TypeScript**](https://www.typescriptlang.org/) - Para adicionar tipagem estática e aumentar a robustez do código.
- **Estilização:** [**TailwindCSS**](https://tailwindcss.com/) - Para a criação de uma interface moderna e responsiva de forma utilitária.
- **IA Generativa:** [**Google Gemini**](https://ai.google.dev/) - Para a lógica de geração do roadmap através de sua API.
- **Ícones:** [**React Icons**](https://react-icons.github.io/react-icons/) - Para a utilização de ícones vetoriais de diversas bibliotecas.

---

## 🚀 Rodando o Projeto Localmente

Siga os passos abaixo para executar o RotaFront em seu ambiente de desenvolvimento.

### Pré-requisitos

- [**Node.js**](https://nodejs.org/) (versão 18 ou superior)
- [**npm**](https://www.npmjs.com/) (ou qualquer outro gerenciador de pacotes de sua preferência)

### Instalação

1. Clone o repositório:

```bash
git clone https://github.com/VictorFrancelino/rotafront.git
```

2. Navegue até o diretório do projeto:

```bash
cd rotafront
```

3. Instale as dependências:

```bash
npm install
```

### Variáveis de Ambiente

Para que a integração com a IA do Gemini funcione, você precisa de uma chave de API.

1. Crie um arquivo chamado `.env` na raiz do projeto.

1. Adicione sua chave da API do Google Gemini a este arquivo:

```env
GEMINI_API_KEY="SUA_CHAVE_DE_API_AQUI"
```

> Você pode obter uma chave de API gratuitamente no [Google AI Studio](https://aistudio.google.com/app/apikey).

### Executando

Com tudo configurado, inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Abra seu navegador e acesse `http://localhost:4321` para ver a aplicação em funcionamento.

---

## Como Funciona

A lógica da aplicação é dividida entre o client-side (interação do usuário) e o server-side (geração do roadmap).

1. **Interface do Usuário (Client-side):**

- O componente principal `TechsSection.tsx` é renderizado no cliente (`client:load`).
- Ele utiliza o hook customizado `useRoadmapGenerator.ts` para gerenciar o estado das tecnologias selecionadas, o status de carregamento e o roadmap gerado.
- O usuário clica nos `Chip`s dentro dos `Card`s, e a função `handleUpdateTechCard` atualiza o estado, associando cada tecnologia a uma categoria (domino, estudando, quero aprender).

2. **Geração do Roadmap (Server-side):**

- Ao clicar em "Criar meu Roadmap", a função `handleGenerateRoadmap` é acionada.
- Ela agrupa as tecnologias selecionadas e envia uma requisição `POST` para o endpoint `/api/generateRoadmap.ts`.
- Este endpoint (Astro API Route) recebe os dados, constrói um prompt detalhado e o envia para a API do Google Gemini.
- O prompt instrui a IA a agir como um especialista Front-End e retornar um roadmap em um formato JSON estrito.
- A API do Gemini processa o pedido e retorna o roadmap estruturado.
- O endpoint valida o JSON recebido e o envia de volta para o cliente.

3. **Exibição do Resultado:**

- O hook `useRoadmapGenerator` recebe o JSON do roadmap e atualiza seu estado.
- A interface re-renderiza, exibindo o componente `RoadmapView.tsx`, que formata os passos em uma linha do tempo (`RoadmapTimeline.tsx`).

---

## Estrutura do Projeto

A estrutura de pastas do projeto foi organizada para manter o código modular e escalável.

```
src/
├── assets/         # Imagens, fontes e outros arquivos estáticos
├── components/     # Componentes React reutilizáveis (Card, Chip, Button)
├── constants/      # Constantes globais (ex: cores do tema)
├── data/           # Dados estáticos da aplicação (lista de techs e cards)
├── hooks/          # Hooks customizados do React (ex: useRoadmapGenerator)
├── layouts/        # Layouts base do Astro (ex: Layout.astro)
├── pages/          # Páginas e endpoints da API do Astro
│   ├── api/
│   │   └── generateRoadmap.ts # Endpoint que se comunica com a IA
│   └── index.astro            # Página principal da aplicação
├── sections/       # Seções maiores da página, que agrupam componentes
├── styles/         # Arquivos de estilização globais
└── types/          # Definições de tipos do TypeScript
```

---

## Autor

**Victor Francelino**

- Portfólio: [victorfrancelino.netlify.app](https://victorfrancelino.netlify.app)
- GitHub: [@VictorFrancelino](https://github.com/VictorFrancelino)
- LinkedIn: [/in/victorfrancelino/](https://www.linkedin.com/in/victorfrancelino/)

---

## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](https://github.com/VictorFrancelino/rotafront?tab=MIT-1-ov-file) para mais detalhes.
