import React from "react";
import { Github, Linkedin, Mail, FileText } from "lucide-react";

export default function HeroSection({ profile, displayText }) {
  return (
    <section
      id="home"
      className="relative z-10 flex min-h-[92vh] w-full items-center justify-center overflow-hidden px-6 py-20 lg:px-10"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {[...Array(25)].map((_, i) => (
          <span key={i} className={`hero-orb hero-orb-${i + 1}`} />
        ))}
      </div>

      <div className="fixed left-4 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-center gap-5 xl:flex">
        {[
          {
            icon: <FileText className="h-5 w-5" />,
            href: profile.resume,
            label: "Resume",
          },
          {
            icon: <Github className="h-5 w-5" />,
            href: profile.github,
            label: "GitHub",
          },
          {
            icon: <Linkedin className="h-5 w-5" />,
            href: profile.linkedin,
            label: "LinkedIn",
          },
          {
            icon: <Mail className="h-5 w-5" />,
            href: `mailto:${profile.email}`,
            label: "Email",
          },
        ].map((item) => (
          <a
            key={item.label}
            href={item.href}
            target="_blank"
            rel="noreferrer"
            className="flex h-14 w-14 items-center justify-center rounded-3xl border border-slate-200 bg-white/80 text-slate-700 shadow-md transition hover:-translate-y-0.5 hover:text-teal-500"
            aria-label={item.label}
          >
            {item.icon}
          </a>
        ))}
      </div>

      <div className="relative flex w-full flex-col items-center overflow-visible px-6 text-center">
        <p className="relative z-10 text-[22px] font-medium text-slate-500 md:text-[28px]">
          Hello, I'm
        </p>

        <h1
          className="relative z-10 mt-4 pb-4 text-center text-[clamp(3.2rem,8.2vw,8rem)] font-semibold leading-[1.08] tracking-[-0.04em]"
          style={{
            backgroundImage:
              "linear-gradient(90deg, #5eead4 0%, #93c5fd 55%, #c4b5fd 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            color: "transparent",
            overflow: "visible",
          }}
        >
          {profile.heroName}
        </h1>

        <p className="relative z-10 mt-6 max-w-[1100px] px-6 text-center text-xl font-semibold leading-snug text-slate-600 md:text-[1.9rem]">
          Software Engineer{" "}
          <span className="font-normal text-slate-500">
            building scalable platforms, cloud-native systems, and impactful applications
          </span>
        </p>

        <p className="relative z-10 mt-4 min-h-[2.5rem] text-2xl font-semibold text-teal-500 md:min-h-[3rem] md:text-[2rem]">
          {displayText}
          <span className="ml-1 inline-block animate-pulse">|</span>
        </p>

        <div className="relative z-10 mt-10 flex flex-wrap items-center justify-center gap-6">
          {[
            {
              icon: <FileText className="h-6 w-6" />,
              href: profile.resume,
              label: "Resume",
            },
            {
              icon: <Github className="h-6 w-6" />,
              href: profile.github,
              label: "GitHub",
            },
            {
              icon: <Linkedin className="h-6 w-6" />,
              href: profile.linkedin,
              label: "LinkedIn",
            },
            {
              icon: <Mail className="h-6 w-6" />,
              href: `mailto:${profile.email}`,
              label: "Email",
            },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className="flex h-16 w-16 items-center justify-center rounded-3xl border border-slate-200 bg-white/90 text-slate-700 shadow-md transition hover:-translate-y-1 hover:text-teal-500 hover:shadow-lg"
              aria-label={item.label}
            >
              {item.icon}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}