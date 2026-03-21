import React from "react";
import SectionTitle from "./SectionTitle";

export default function ExperienceSection({ experiences }) {
  return (
    <section
      id="experience"
      className="scroll-mt-32 mx-auto w-full max-w-7xl px-6 py-16 md:py-20"
    >
      <SectionTitle
        eyebrow="Experience"
        title="Where I’ve built, improved, and supported production software."
        description="Hands-on experience in API development, cloud services, application reliability, and performance-focused engineering across enterprise and production environments."
      />

      <div className="relative ml-2 border-l border-slate-200 pl-8 md:ml-6 md:pl-12">
        {experiences.map((job, index) => (
          <div
            key={`${job.company}-${job.role}`}
            className={`${index !== experiences.length - 1 ? "mb-10" : ""} relative`}
          >
            <div
              className={`absolute top-6 -left-[41px] rounded-full border-4 border-[#f7f8f6] md:-left-[57px] ${
                index < 2
                  ? "h-5 w-5 bg-teal-500 shadow-[0_0_12px_rgba(20,184,166,0.8)]"
                  : "h-4 w-4 bg-teal-400"
              }`}
            />

            <div className="rounded-[28px] border border-white/80 bg-white p-9 shadow-[0_14px_50px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-2 hover:scale-[1.01] hover:border hover:border-teal-200 hover:shadow-xl hover:shadow-teal-100/50 md:p-10">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <h3 className="text-2xl font-semibold text-slate-900 md:text-3xl">
                    {job.role}
                  </h3>
                  <p className="mt-2 text-lg font-medium text-slate-600 md:text-xl">
                    {job.company}
                  </p>
                </div>

                <div className="rounded-full bg-slate-100 px-5 py-2 text-base font-medium text-slate-500">
                  {job.period}
                </div>
              </div>

              <ul className="mt-6 space-y-4 text-base leading-relaxed text-slate-600 md:text-lg">
                {job.points.map((point) => (
                  <li key={point} className="flex gap-3">
                    <span className="mt-2 h-2.5 w-2.5 rounded-full bg-teal-500" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}