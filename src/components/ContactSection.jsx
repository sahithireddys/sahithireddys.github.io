import React from "react";
import { ExternalLink, Github, Linkedin, Mail } from "lucide-react";

export default function ContactSection({
  profile,
  formData,
  formStatus,
  handleInputChange,
  handleContactSubmit,
}) {
  return (
    <section
      id="contact"
      className="scroll-mt-40 mx-auto w-full max-w-7xl px-6 py-16 md:py-20"
    >
      <div className="overflow-hidden rounded-[34px] border border-white/10 bg-slate-900 p-8 text-white shadow-[0_20px_80px_rgba(15,23,42,0.25)] md:p-12">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-teal-300">
              Contact
            </p>

            <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
              Let’s build something meaningful.
            </h2>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              I’m currently exploring software engineering opportunities where I
              can contribute to impactful products, solve complex system
              challenges, and continue growing as an engineer.
            </p>

            <div className="mt-8 space-y-4">
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-slate-100 transition hover:bg-white/10"
              >
                <span className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-teal-300" />
                  {profile.email}
                </span>
                <ExternalLink className="h-4 w-4" />
              </a>

              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-slate-100 transition hover:bg-white/10"
              >
                <span className="flex items-center gap-3">
                  <Linkedin className="h-5 w-5 text-teal-300" />
                  LinkedIn
                </span>
                <ExternalLink className="h-4 w-4" />
              </a>

              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-slate-100 transition hover:bg-white/10"
              >
                <span className="flex items-center gap-3">
                  <Github className="h-5 w-5 text-teal-300" />
                  GitHub
                </span>
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>

          <form
            onSubmit={handleContactSubmit}
            className="rounded-[28px] border border-white/10 bg-white/5 p-6 md:p-8"
          >
            <h3 className="text-2xl font-semibold text-white">
              Send me a message
            </h3>

            <div className="mt-6 space-y-5">
              <div>
                <label className="mb-2 block text-sm text-slate-300">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-2xl border border-white/10 bg-slate-800/70 px-4 py-3 text-white placeholder:text-slate-400 outline-none focus:border-teal-400"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-slate-300">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-2xl border border-white/10 bg-slate-800/70 px-4 py-3 text-white placeholder:text-slate-400 outline-none focus:border-teal-400"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-slate-300">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-2xl border border-white/10 bg-slate-800/70 px-4 py-3 text-white placeholder:text-slate-400 outline-none focus:border-teal-400"
                  placeholder="Opportunity / Project / Collaboration"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-slate-300">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full rounded-2xl border border-white/10 bg-slate-800/70 px-4 py-3 text-white placeholder:text-slate-400 outline-none focus:border-teal-400"
                  placeholder="Tell me about your opportunity or project"
                />
              </div>
            </div>

            {formStatus.success && (
              <p className="mt-4 text-sm text-emerald-300">
                {formStatus.success}
              </p>
            )}

            {formStatus.error && (
              <p className="mt-4 text-sm text-rose-300">
                {formStatus.error}
              </p>
            )}

            <button
              type="submit"
              disabled={formStatus.loading}
              className="mt-6 w-full rounded-2xl bg-teal-400 px-6 py-3 text-base font-semibold text-slate-900 transition hover:bg-teal-300 disabled:opacity-70"
            >
              {formStatus.loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}