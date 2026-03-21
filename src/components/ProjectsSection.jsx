import React from "react";
import { ExternalLink, FolderKanban } from "lucide-react";
import SectionTitle from "./SectionTitle";

export default function ProjectsSection({ projects, getColor }) {
  return (
    <section
      id="projects"
      className="scroll-mt-32 mx-auto w-full max-w-7xl px-6 py-16 md:py-20"
    >
      <SectionTitle
        eyebrow="Projects"
        title="A closer look at the systems and applications I’ve built."
        description="These projects highlight how I approach architecture, implementation, and delivery across backend services, cloud workflows, and product-facing development."
      />

      <div className="grid gap-8 lg:grid-cols-2">
        {projects.map((project) => (
          <article
            key={project.title}
            className="group rounded-[30px] border border-white/80 bg-white p-10 shadow-[0_14px_50px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-2 hover:scale-[1.01] hover:border hover:border-teal-200 hover:shadow-xl hover:shadow-teal-100/50 md:p-12"
          >
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <h3 className="text-3xl font-semibold leading-tight tracking-tight text-slate-900 md:text-4xl">
                  {project.title}
                </h3>
                <p className="mt-2 text-base font-medium text-slate-500 md:text-lg">
                  {project.period}
                </p>
              </div>

              <div className="rounded-2xl bg-teal-50 p-3 text-teal-500">
                <FolderKanban className="h-5 w-5" />
              </div>
            </div>

            <p className="text-lg leading-relaxed text-slate-600 md:text-xl">
              {project.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {project.stack.map((tech, index) => (
                <span
                  key={tech}
                  className={`skill-color rounded-full px-4 py-2 text-base font-medium md:text-lg ${getColor(
                    index,
                  )}`}
                >
                  {tech}
                </span>
              ))}
            </div>

            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-2 text-base font-semibold text-slate-800 transition group-hover:text-teal-600 md:text-lg"
            >
              View Project <ExternalLink className="h-4 w-4" />
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}