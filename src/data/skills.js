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
      "C/C++",
      "SQL",
      "JavaScript",
      "TypeScript",
      "HTML",
      "CSS",
    ],
  },
  {
    title: "Frameworks",
    emoji: "⚙️",
    items: [
      "Spring Boot",
      "FastAPI",
      "Node.js",
      "Express.js",
      "React",
      "Next.js",
      "Angular",
    ],
  },
  {
    title: "Architecture",
    emoji: "🏗️",
    items: [
      "Distributed Systems",
      "Microservices",
      "Event-Driven Architecture",
      "REST API Design",
      "System Design",
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
  {
    title: "Databases",
    emoji: "🗄️",
    items: ["PostgreSQL", "MySQL", "SQL Server", "MongoDB", "Oracle"],
  },
  {
    title: "Cloud / DevOps",
    emoji: "☁️",
    items: [
      "AWS",
      "Azure",
      "Docker",
      "Kubernetes",
      "CI/CD",
      "GitHub Actions",
      "Terraform",
    ],
  },
];

export const getColor = (index) => colors[index % colors.length];