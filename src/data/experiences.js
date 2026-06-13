export const experiences = [
  {
    company: "Indiana University Bloomington",
    role: "Software Engineer",
    period: "Oct 2024 – May 2026",
    points: [
      "Resolved concurrent enrollment race conditions for a course management system serving 10,000+ students by implementing MySQL transaction-safe enrollment logic with capacity checks, preventing duplicate enrollments and over-enrollment during peak registration load.",
      "Built 8+ Node.js REST API endpoints for enrollment, course, and user-management workflows, implementing role-based middleware to enforce access control across student, instructor, and admin tiers.",
      "Reduced average API response time by 25% by optimizing MySQL queries, adding indexed lookups, and implementing server-side pagination for high-traffic enrollment endpoints.",
    ],
  },
  {
    company: "Indiana University Bloomington",
    role: "Associate Instructor – System Programming with C & UNIX ",
    period: "Aug 2025 – May 2026",
    points: [
      "Mentored 100+ students in C and UNIX process control, reinforcing debugging and time/space complexity concepts.",
    ],
  },
  {
    company: "Isomerous, LLC",
    role: "Software Developer Intern",
    period: "Jun 2025 – Aug 2025",
    points: [
      "Replaced a manual spreadsheet-based product inspection workflow by designing and building a serverless ingestion system using API Gateway, Python Lambda, DynamoDB, and S3, enabling real-time submission of structured metadata and base64-encoded images through a single POST endpoint.",
      "Engineered Lambda processing logic to parse JSON payloads, extract inspection metadata, decode and store product images in product-scoped S3 paths, and persist linked DynamoDB records, eliminating manual data entry and making inspection records traceable and queryable.",
      "Designed a DynamoDB schema with productId as partition key and ISO 8601 timestamp as sort key, supporting efficient time-range lookups and replacing scattered spreadsheet data with a centralized NoSQL store.",
    ],
  },
  {
    company: "Tata Consultancy Services",
    role: "Software Development Engineer",
    period: "Aug 2023 – Jul 2024",
    points: [
      "Improved AML fraud detection true positive rate by 83% by engineering Java/Spring Boot rule engine logic for high-risk transaction patterns, strengthening compliance monitoring across 1M+ daily transactions.",
      "Cut real-time alert notification delays from 12 minutes to 3 minutes by optimizing Oracle SQL queries, adding targeted indexes, and resolving threading bottlenecks in the transaction processing queue.",
      "Automated watchlist updates to import regulatory keywords from external sources, improving daily processing speed by 40% through input validation, deduplication, and optimized Oracle database operations.",
      "Built a real-time monitoring module to ingest AI-generated risk scores, map them to customer profiles, and trigger configurable threshold-based alerts replacing end-of-day batch jobs with instant investigator notifications.",
    ],
  },
  {
    company: "CoreTek Labs",
    role: "Software Engineer Intern",
    period: "Apr 2023 – Jun 2023",
    points: [
      "Built and deployed an Amazon Lex chatbot integrated with AWS Lambda for real-time intent fulfillment, embedded directly into client-facing web interfaces.",
      "Developed a Python NLP classification pipeline to automatically route user questions to matching intents and answers, improving routing efficiency by 45%.",
      "Implemented session-based state management and fallback logic for multi-turn conversation flows, reducing manual query handling by 50%.",
    ],
  },
  {
    company: "ADP (Automatic Data Processing)",
    role: "Software Engineer Intern",
    period: "Jul 2022 – Nov 2022",
    points: [
      "Built reusable React components for a Report Builder dashboard, implementing filtering, pagination, asynchronous data mapping, and internal REST API integration to support large report datasets in production.",
      "Collaborated with backend engineers to align API contracts with frontend requirements, independently navigating a large enterprise React codebase to identify and modify components for new dashboard features.",
    ],
  },
];
