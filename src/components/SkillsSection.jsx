import React from "react";
import SectionTitle from "./SectionTitle";

export default function SkillsSection({ skills, categoryColors }) {
  return (
    <section
      id="skills"
      className="scroll-mt-32 mx-auto w-full max-w-7xl px-6 py-12 md:py-16"
    >
      <SectionTitle
        eyebrow="Skills"
        title="Core technologies and frameworks powering my work"
        description="My stack reflects the kind of software I enjoy building: backend services, data-intensive applications, cloud-based workflows, polished web experiences, and resilient systems built with modern frameworks and databases."
      />

      <div className="rounded-3xl border border-slate-200 bg-white/60 p-6 shadow-sm backdrop-blur">
        <h2 className="mb-6 text-2xl font-semibold text-slate-800 md:text-3xl">
          Technical Skills
        </h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {skills.map((category) => (
            <div
              key={category.title}
              className="rounded-2xl border border-slate-200 bg-white/50 p-4"
            >
              <p className="mb-3 flex items-center gap-2 text-sm font-semibold tracking-widest text-slate-500 md:text-base">
                <span className="text-xl">{category.emoji}</span>
                <span>{category.title.toUpperCase()}</span>
              </p>

              <div className="flex flex-wrap gap-2">
                {category.items.map((item) => (
                  <span
                    key={item}
                    className={`rounded-xl px-4 py-2 text-base font-medium transition-all duration-200 hover:scale-105 md:text-lg ${
                      categoryColors[category.title]
                    }`}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}