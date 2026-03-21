import React from "react";
import { Briefcase, GraduationCap } from "lucide-react";
import SectionTitle from "./SectionTitle";

export default function AboutSection({ education, getColor }) {
  return (
    <section
      id="about"
      className="scroll-mt-32 mx-auto w-full max-w-7xl px-6 py-16 md:py-20"
    >
      <SectionTitle
        eyebrow="About"
        title="Building scalable systems that power real-world applications."
        description=""
      />

      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[28px] border border-white/80 bg-white p-8 shadow-[0_14px_50px_rgba(15,23,42,0.06)]">
          <div className="mb-5 flex items-center gap-3">
            <div className="rounded-2xl bg-teal-50 p-3 text-teal-500">
              <Briefcase className="h-5 w-5" />
            </div>
            <h3 className="text-2xl font-semibold text-slate-900 md:text-3xl">
              My work
            </h3>
          </div>

          <div className="space-y-5 text-lg leading-relaxed text-slate-600 md:text-xl">
            <p>
              I’m a Software Engineer who enjoys turning complex requirements
              into reliable software that people can actually use. My experience
              spans enterprise platforms, university systems, and cloud-based
              applications, with a strong focus on backend development, platform
              reliability, and application performance.
            </p>

            <p>
              I work across APIs, databases, microservices, and modern web
              technologies, and I’m especially drawn to problems that require
              both strong engineering fundamentals and practical product
              thinking. Whether I’m building backend integrations, improving
              data access patterns, or shaping user-facing functionality, I like
              systems that are clean, efficient, and maintainable.
            </p>

            <p>
              What excites me most is building software that holds up in
              production—systems that are fast, dependable, and thoughtfully
              designed. I’m motivated by the details: reducing latency,
              simplifying workflows, debugging edge cases, and creating
              solutions that scale without becoming hard to operate.
            </p>
          </div>

          <p className="mt-6 text-sm font-semibold tracking-wide text-slate-500">
            Core Expertise
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            {[
              "Java",
              "Distributed Systems",
              "Microservices",
              "AWS",
              "Azure",
              "SQL Optimization",
              "REST APIs",
              "React",
            ].map((skill, index) => (
              <span
                key={skill}
                className={`skill-color rounded-xl px-4 py-2 text-base font-medium md:text-lg ${getColor(
                  index,
                )}`}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-[28px] border border-white/80 bg-white p-10 shadow-[0_14px_50px_rgba(15,23,42,0.06)] md:p-12">
          <div className="mb-6 grid grid-cols-2 gap-4">
            <div className="rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <p className="text-3xl font-semibold text-teal-500">3+</p>
              <p className="mt-1 text-xl font-medium text-slate-500">
                Years Experience
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <p className="text-3xl font-semibold text-teal-500">15+</p>
              <p className="mt-1 text-xl font-medium text-slate-500">
                Projects Built
              </p>
            </div>
          </div>

          <div className="mb-6 grid grid-cols-2 gap-4">
            <div className="rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <p className="text-3xl font-semibold text-teal-500">40%+</p>
              <p className="mt-1 text-xl font-medium text-slate-500">
                Performance Improvement
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <p className="text-3xl font-semibold text-teal-500">50K+</p>
              <p className="mt-1 text-xl font-medium text-slate-500">
                Users Impacted
              </p>
            </div>
          </div>

          <div className="mb-5 flex items-center gap-3">
            <div className="rounded-2xl bg-teal-50 p-3 text-teal-500">
              <GraduationCap className="h-5 w-5" />
            </div>
            <h3 className="text-2xl font-semibold text-slate-900 md:text-3xl">
              Education
            </h3>
          </div>

          <div className="space-y-5">
            {education.map((item) => (
              <div key={item.school} className="rounded-2xl bg-slate-50 p-5">
                <h4 className="text-lg font-semibold text-slate-900 md:text-xl">
                  {item.school}
                </h4>
                <p className="mt-2 text-base text-slate-600 md:text-lg">
                  {item.degree}
                </p>
                <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-base text-slate-500">
                  <span>{item.period}</span>
                  <span>{item.location}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-teal-500">
                📍
              </div>

              <div>
                <p className="text-lg font-semibold text-slate-900">
                  United States
                </p>
                <p className="text-lg text-slate-500">Open to relocation</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-teal-500"></span>
              <span className="text-sm font-medium text-teal-600">
                Available
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}