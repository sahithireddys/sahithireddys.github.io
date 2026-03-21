import React from "react";
import SectionTitle from "./SectionTitle";

export default function PublicationsSection({ publications }) {
  return (
    <section
      id="publications"
      className="scroll-mt-32 mx-auto w-full max-w-7xl px-6 py-12 md:py-16"
    >
      <SectionTitle
        eyebrow="Publications"
        title="Research, technical exploration, and applied problem-solving."
        description="A selection of work that reflects how I investigate ideas, evaluate approaches, and turn technical concepts into practical outcomes."
      />

      <div className="space-y-6">
        {publications.map((pub) => (
          <div
            key={`${pub.title}-${pub.year}`}
            className="rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-[0_14px_50px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-2 hover:scale-[1.01] hover:border hover:border-teal-200 hover:shadow-xl hover:shadow-teal-100/50"
          >
            <h3 className="text-2xl font-semibold text-slate-900 md:text-3xl">
              {pub.title}
            </h3>

            <p className="mt-2 text-base text-slate-500 md:text-lg">
              {pub.type} · {pub.year}
            </p>

            <p className="mt-4 text-lg leading-8 text-slate-700 md:text-xl">
              {pub.description}
            </p>

            <div className="mt-4 flex gap-6">
              {pub.link && (
                <a
                  href={pub.link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-lg font-medium text-teal-600 hover:underline"
                >
                  Link
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}