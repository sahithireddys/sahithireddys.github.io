// Content pulled from Sahithi's resume. Edit freely.
export const skills = [
  { id: 'kafka', name: 'Kafka', detail: 'Event-driven fraud monitoring, 1M+ txns/day' },
  { id: 'aws', name: 'AWS', detail: 'Serverless ingestion, 20,000+/day, 87% faster' },
  { id: 'spring', name: 'Spring Boot', detail: 'AML rule-engine services, +83% true positives' },
  { id: 'pg', name: 'PostgreSQL', detail: 'Ledger DB, 3,600+ tx/min at 12.6ms p95' },
  { id: 'react', name: 'React', detail: 'Report Builder load time 8.4s to 1.9s' },
  { id: 'docker', name: 'Docker', detail: 'Containerized services and CI/CD pipelines' },
  { id: 'python', name: 'Python', detail: 'Lambda functions and the AI agent' },
  { id: 'playwright', name: 'Playwright', detail: 'Browser automation for the AI agent' },
]

export const projects = [
  { id: 'ledger', name: 'Payment Ledger', detail: '3,600+ tx/min · 12.6ms p95 · 0% failures' },
  { id: 'agent', name: 'AI Agent', detail: 'Learns a task once, replays it deterministically' },
  { id: 'pipeline', name: 'Serverless Pipeline', detail: '87% faster · 20,000+ submissions/day' },
]

export const hero = {
  tag: 'Software Engineer \u00b7 Backend \u00b7 Cloud \u00b7 AI',
  body: 'I build backend systems, cloud pipelines and AI agents that you can trust at 3 a.m.',
}

export const links = {
  github: 'https://github.com/sahithireddys',
  linkedin: 'https://www.linkedin.com/in/sahithireddys/',
  email: 'mailto:ssenagapally@gmail.com',
}

// ---------------------------------------------------------------------------
// About section (drafted from the resume only; edit the wording freely)
// ---------------------------------------------------------------------------
export const about = {
  statement: 'Backend is where I do my best work. Systems that stay fast, correct and calm under real load.',
  paragraphs: [
    'I am a software engineer with a master’s in computer science from Indiana University Bloomington. Across banking, enterprise software, cloud and university platforms, I have built the services behind the screen: Java and Spring Boot rule engines, Kafka event pipelines, Node.js REST APIs and serverless AWS backends.',
    'The pattern is the same everywhere: find the bottleneck, make it measurable, then fix it. That meant cutting alert latency from 12 to 3 minutes, taking a report page from 8.4s to 1.9s, and cutting duplicate enrollment conflicts by about 99%.',
    'Lately I have been pushing into AI: an agent that operates legacy bank back-office UIs through a real browser, learns a task once, and replays it deterministically without calling the LLM again.',
  ],
  counters: [
    { to: 1, suffix: 'M+', label: 'financial transactions monitored daily at TCS' },
    { to: 10000, suffix: '+', label: 'users on the enrollment platform I redesigned', comma: true },
    { to: 20000, suffix: '+', label: 'submissions a day through my serverless pipeline', comma: true },
  ],
  strengths: [
    'Distributed systems',
    'Event-driven architecture',
    'REST API design',
    'SQL and performance tuning',
    'Serverless on AWS',
    'System design',
  ],
  education: [
    {
      degree: 'M.S. Computer Science',
      school: 'Indiana University Bloomington',
      dates: 'Aug 2024 – May 2026',
      gpa: '3.8 / 4.0',
      courses: 'Applied Algorithms, Computer Networks, Software Engineering, Cloud Computing TA: C Programming and Unix',
    },
    {
      degree: 'B.Tech Computer Science and Engineering',
      school: 'Gokaraju Rangaraju Institute of Engineering and Technology',
      dates: 'Aug 2019 – May 2023',
      gpa: '3.7 / 4.0',
      courses: 'Data Structures, Operating Systems, Database Management Systems, Artificial Intelligence, Machine Learning',
    },
  ],
  location: { place: 'Morganville, New Jersey, USA', note: 'Open to relocation' },
}

// ---------------------------------------------------------------------------
// Experience (verbatim from the resume, newest first)
// ---------------------------------------------------------------------------
export const experience = [
  {
    id: 'iu',
    company: 'Indiana University Bloomington',
    role: 'Software Engineer',
    dates: 'Oct 2024 – May 2026',
    place: 'Bloomington, IN',
    metric: { value: '~99%', label: 'fewer duplicate enrollment conflicts' },
    summary: 'Enrollment platform for 10,000+ users',
    bullets: [
      'Redesigned enrollment processing for a course-management platform serving 10,000+ users to handle concurrent requests safely, introducing transactional MySQL capacity checks and concurrency controls that cut duplicate enrollment conflicts by ~99% and prevented inconsistent course-capacity updates.',
      'Delivered 8+ Node.js REST APIs for course and user-management workflows, adding role-based authorization and cutting high-traffic endpoint response time by 25% through SQL query tuning, index optimization, and server-side pagination.',
    ],
    stack: ['Node.js', 'MySQL', 'REST', 'RBAC'],
  },
  {
    id: 'isomerous',
    company: 'Isomerous',
    role: 'Software Developer Intern',
    dates: 'Jun 2025 – Aug 2025',
    place: 'Ashburn, VA',
    metric: { value: '87%', label: 'faster processing turnaround' },
    summary: 'Serverless AWS ingestion pipeline',
    bullets: [
      'Designed and deployed a serverless AWS backend using API Gateway, Python Lambda, DynamoDB, S3, and IAM, replacing a manual product-inspection workflow with an API-driven ingestion pipeline and reducing processing turnaround time by 87%.',
      'Developed Lambda functions for payload validation, metadata transformation, image processing, and coordinated S3/DynamoDB persistence, enabling traceable retrieval and scaling the ingestion pipeline to 20,000+ submissions/day.',
    ],
    stack: ['AWS Lambda', 'API Gateway', 'DynamoDB', 'S3', 'Python'],
  },
  {
    id: 'tcs',
    company: 'Tata Consultancy Services',
    role: 'Software Engineer',
    dates: 'May 2023 – Jul 2024',
    place: 'Bengaluru, India',
    metric: { value: '75%', label: 'lower real-time alert latency (12 to 3 min)' },
    summary: 'AML transaction monitoring, 1M+ transactions a day',
    bullets: [
      'Engineered Java/Spring Boot rule-engine services for AML transaction monitoring across 1M+ financial transactions daily, improving fraud-detection true positives by 83% through configurable risk-pattern evaluation and optimized rule execution.',
      'Cut real-time alert latency by 75%, from 12 to 3 minutes, addressing a critical requirement from 4 banking clients by optimizing Oracle SQL, adding indexes, and resolving multithreading bottlenecks; improvements contributed to onboarding 2 additional clients.',
      'Built a Kafka-based event-driven monitoring service with consumer groups, retry handling, idempotent consumers, and ordering safeguards, replacing batch processing with a fault-tolerant streaming pipeline; validated with JUnit and Spring Boot integration tests.',
      'Automated regulatory watchlist ingestion and reconciliation using validation, deduplication, and optimized Oracle database operations, boosting daily processing throughput by 40%.',
    ],
    stack: ['Java', 'Spring Boot', 'Kafka', 'Oracle'],
  },
  {
    id: 'adp',
    company: 'ADP',
    role: 'Software Engineer',
    dates: 'Jul 2022 – Nov 2022',
    place: 'Hyderabad, India',
    metric: { value: '77%', label: 'faster Report Builder load (8.4s to 1.9s)' },
    summary: 'Reporting APIs for 1,000+ users',
    bullets: [
      'Architected backend reporting APIs that aggregated employee data across internal services, implementing search, sorting, pagination, and response transformations to minimize payload size and support responsive on-demand reporting.',
      'Improved Report Builder load time by 77%, from 8.4s to 1.9s, for 1,000+ users by consolidating redundant API requests, parallelizing downstream calls, and streamlining React rendering and integrations with authentication and payments services.',
    ],
    stack: ['React', 'REST', 'Java'],
  },
]

// ---------------------------------------------------------------------------
// Projects section. Ledger + agent text is verbatim from the resume; Hoosier Hub, Trello CLI and the phishing
// pipeline are from their GitHub READMEs only. Edit freely; nothing here is invented beyond that.
// ---------------------------------------------------------------------------
export const work = [
  {
    id: 'ledger',
    flagship: true,
    name: 'Distributed Payment Processing & Ledger Platform',
    kind: 'Backend platform',
    when: 'Sept 2026',
    summary: 'A distributed payment and double-entry ledger platform, load-tested with k6.',
    bullets: [
      'Built in Java/Spring Boot with Kafka-based async workflows, PostgreSQL and Redis, sustaining 3,600+ transactions/min at 12.6ms p95 latency with 0% failed requests under k6 load testing.',
      'Implemented a transactional outbox pattern with idempotent consumers and consistent lock ordering to prevent duplicate processing and eliminate deadlocks; validated with Testcontainers and Mockito tests, deployed via GitHub Actions CI/CD.',
    ],
    // count-up tiles: numbers are from the resume only
    stats: [
      { to: 3600, decimals: 0, comma: true, suffix: '+', label: 'transactions per minute' },
      { to: 12.6, decimals: 1, prefix: '', suffix: 'ms', label: 'p95 latency' },
      { to: 0, decimals: 0, suffix: '%', label: 'failed requests under k6 load' },
    ],
    flowNote: 'Architecture: how a payment moves through the system. Hover a reason below to light up the part it explains.',
    diagram: 'ledger',
    why: [
      { t: 'Outbox, not a direct Kafka publish', nodes: ['pg', 'pub'], d: 'If the app crashed between the database commit and the Kafka publish, a payment would sit there with no event. Writing an outbox row in the same transaction means a background publisher can always find what is still unpublished.' },
      { t: 'Ordered locks, not optimistic retries', nodes: ['led'], d: 'Under load many payments hit the same popular accounts. Optimistic locking would send most of them back to retry after a version conflict. Locking both accounts in a consistent order serialises access safely, with no retries and no deadlocks.' },
      { t: 'Kafka keyed by source account', nodes: ['kafka'], d: 'Kafka only orders messages within a partition. Keying by the source account keeps each account\'s payments in the order they were submitted.' },
      { t: 'Redis kept off the money path', nodes: ['redis'], d: 'Postgres and Kafka move the money. Redis only makes two things cheap and safe: retried requests (an Idempotency-Key returns the same response for 24h) and fast balance reads (30s cache, cleared when a payment settles).' },
    ],
    stack: ['Java', 'Spring Boot', 'Kafka', 'PostgreSQL', 'Redis', 'k6', 'Testcontainers', 'Mockito', 'GitHub Actions'],
    link: 'https://github.com/sahithireddys/payment-ledger-platform',
  },
  {
    id: 'agent',
    flagship: true,
    name: 'AI Agent for Legacy System Automation',
    kind: 'AI / automation',
    when: 'Aug 2026',
    summary: 'An agent that operates legacy, API-less bank and credit-union back-office UIs.',
    bullets: [
      'Developed an AI agent that operates legacy, API-less bank/credit-union back-office UIs by controlling a real browser via Playwright, using LLM-driven discovery (~12s per run) to convert successful task runs into reusable, typed "capability artifacts."',
      'Designed a deterministic replay engine that executes learned capability artifacts in production with 0 LLM calls (replays in under 4s vs. ~12s for discovery), achieving 100% correct outcome classification across 7 verified runs spanning 5 runtime conditions, including business outcomes, recoverable errors, and live human-escalation handoff.',
    ],
    stats: [
      { to: 0, decimals: 0, suffix: '', label: 'LLM calls when a learned task is replayed' },
      { text: '<4s', label: 'replay time vs. ~12s for LLM discovery' },
      { to: 100, decimals: 0, suffix: '%', label: 'correct outcome classification across 7 verified runs, 5 runtime conditions' },
    ],
    flowNote: 'Architecture: how a task becomes a reusable capability. Hover a reason below to light up the part it explains.',
    diagram: 'agent',
    why: [
      { t: 'Discover once, replay without the LLM', nodes: ['disc', 'rep'], d: 'The LLM works out how to do a task in a real browser one time. Production then replays the saved run with 0 LLM calls: under 4s instead of about 12s, and cheaper to run.' },
      { t: 'Typed artifacts, not ad-hoc scripts', nodes: ['art'], d: 'Each learned task is a Pydantic-validated capability artifact, so the contract is enforceable, versioned and easy for a person to review.' },
      { t: 'A human approves before production', nodes: ['rev'], d: 'Discovery only produces a draft. A person promotes it to approved before it runs for real, and the open-sub-account capability, which writes data, was hand-authored on purpose.' },
      { t: 'Declare outcomes, escalate the rest', nodes: ['rep', 'out'], d: 'Business outcomes and recoverable errors are named in an error taxonomy. Anything undeclared hands the session to a human operator, who can take over and resume the run.' },
    ],
    stack: ['Python', 'Playwright', 'LLM', 'Pydantic'],
    link: 'https://github.com/sahithireddys/computer-use-automation-system',
  },
  {
    id: 'hoosier',
    name: 'Hoosier Hub',
    kind: 'Full-stack platform',
    when: 'Indiana University',
    summary: 'A full-stack platform for Indiana University students and clubs.',
    stats: [
      { value: '50,000+', label: 'students on the platform' },
      { value: '1,000+', label: 'clubs' },
      { value: 'CI/CD', label: 'Docker and GitHub Actions pipelines' },
    ],
    bullets: [
      'Developed and deployed a full-stack platform for 50,000+ students and 1,000+ clubs, building Spring Boot/MongoDB backend services, REST APIs with OpenAPI documentation, React interfaces, and Docker/GitHub Actions CI/CD pipelines for reliable concurrent access.',
    ],
    stack: ['Java', 'Spring Boot', 'MongoDB', 'OpenAPI', 'React', 'Docker', 'GitHub Actions'],
    link: 'https://github.com/sahithireddys/Hoosier-Hub-Student-Community-Platform',
  },
  {
    id: 'trello',
    name: 'Trello API CLI',
    kind: 'Developer tool',
    when: 'Python CLI',
    summary: 'A production-style Python CLI that talks directly to the Trello REST API.',
    stats: [
      { value: '23', label: 'passing tests, HTTP mocked' },
      { value: 'Layered', label: 'architecture with dependency injection' },
      { value: '3.10+', label: 'Python, type-checked with mypy' },
    ],
    bullets: [
      'Built a production-style Python CLI integrating directly with the Trello REST API to create cards with labels and comments, using layered architecture, dependency injection, typed models, environment-based authentication, error handling, pytest/mypy/Ruff quality checks.',
    ],
    stack: ['Python', 'Trello REST API', 'pytest', 'mypy', 'Ruff'],
    link: 'https://github.com/sahithireddys/trello-api-cli',
  },
]

// ---------------------------------------------------------------------------
// Skills: trimmed from the resume's Technical Skills section to what she can be interviewed on (matches her projects and roles).
// ---------------------------------------------------------------------------
export const skillGroups = [
  { name: 'Languages', items: ['Java', 'Python', 'JavaScript', 'TypeScript', 'SQL', 'C'] },
  { name: 'Frameworks', items: ['Spring Boot', 'Node.js', 'React', 'Apache Kafka', 'FastAPI', 'Playwright'] },
  { name: 'Architecture', items: ['RESTful APIs', 'Microservices', 'Distributed Systems', 'Event-Driven Architecture', 'System Design'] },
  { name: 'Databases', items: ['PostgreSQL', 'MySQL', 'Oracle Database', 'DynamoDB', 'MongoDB', 'Redis'] },
  { name: 'Cloud & DevOps', items: ['AWS (Lambda, API Gateway, S3, IAM, EC2)', 'Docker', 'GitHub Actions', 'CI/CD'] },
  { name: 'Testing & Monitoring', items: ['JUnit', 'Mockito', 'Testcontainers', 'PyTest', 'k6'] },
  { name: 'AI / ML', items: ['LangChain', 'RAG', 'OpenAI API', 'Anthropic API', 'Claude Code', 'Codex'] },
]

// ---------------------------------------------------------------------------
// Publications (details supplied by Sahithi). Authors were not given, so none are shown.
// ---------------------------------------------------------------------------
export const papers = [
  {
    title: 'Study of Spam Email Filtering Methods using Supervised Machine Learning Techniques',
    kind: 'Research Project',
    venue: 'IEEE Xplore',
    year: '2023',
    abstract:
      'Developed a supervised machine learning framework for spam email detection, using openly available datasets to classify spam and legitimate emails. Evaluated and compared multiple models to measure classification accuracy and improve filtering of potentially harmful incoming messages.',
    link: 'https://ieeexplore.ieee.org/document/10125624',
    linkLabel: 'Read on IEEE Xplore',
  },
  {
    title: 'Performance Evaluation of Cryptographic Security Algorithms on Cloud',
    kind: 'Research Project',
    venue: 'E3S Web of Conferences',
    year: '2023',
    abstract:
      'Conducted a comparative study of RC4 and AES-256 for securing cloud databases, evaluating encryption performance on MySQL within a distributed cloud security architecture. Explored platform-independent approaches to protecting sensitive cloud data while balancing security, efficiency, and database performance.',
    link: 'https://www.e3s-conferences.org/articles/e3sconf/abs/2023/28/e3sconf_icmed-icmpc2023_01015/e3sconf_icmed-icmpc2023_01015.html',
    linkLabel: 'Read on E3S Web of Conferences',
  },
]

// ---------------------------------------------------------------------------
// Contact (from the resume + profile links)
// ---------------------------------------------------------------------------
export const contact = {
  email: 'ssenagapally@gmail.com',
  phone: '+1 (812) 558-4397',
  phoneHref: 'tel:+18125584397',
  linkedin: 'https://www.linkedin.com/in/sahithireddys/',
  github: 'https://github.com/sahithireddys',
  place: 'Open to full-time software and backend engineering roles. Available immediately on F-1 OPT with STEM extension eligibility through 2029. Open to relocation.',
}
