export const colors = [
  "skill-color-1",
  "skill-color-2",
  "skill-color-3",
  "skill-color-4",
  "skill-color-5",
  "skill-color-6",
];

export const categoryColors = {
  Languages: "skill-color-1",
  Frameworks: "skill-color-2",
  Architecture: "skill-color-3",
  "AI / LLM": "skill-color-4",
  Databases: "skill-color-5",
  "Cloud / DevOps": "skill-color-6",
};

export const skills = [
  {
    title: "Languages",
    emoji: "💻",
    items: [
      "Java",
      "Python",
      "JavaScript",
      "TypeScript",
      "SQL",
      "C/C++",
      "HTML",
      "CSS",
    ],
  },
  {
    title: "Frameworks",
    emoji: "⚙️",
    items: [
      "Spring Boot",
      "Node.js",
      "React",
      "Next.js",
      "FastAPI",
    ],
  },
  {
    title: "Architecture",
    emoji: "🏗️",
    items: [
      "Distributed Systems",
      "Microservices",
      "REST API Design",
      "System Design",
    ],
  },
  {
    title: "Databases",
    emoji: "🗄️",
    items: ["MySQL", "OracleDB", "PostgreSQL",  "DynamoDB", "MongoDB"],
  },
  {
    title: "Cloud / DevOps",
    emoji: "☁️",
    items: [
      "AWS",
      "Azure",
      "Docker",
      "GitHub Actions",
      "CI/CD",
    ],
  },
  {
    title: "AI / LLM",
    emoji: "🧠",
    items: [
      "LangChain",
      "RAG Pipelines",
      "OpenAI API",
      "Prompt Engineering",
      "ChatGPT",
      "Claude",
    ],
  },
];

export const getColor = (index) => colors[index % colors.length];
