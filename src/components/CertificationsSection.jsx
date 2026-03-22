import { ExternalLink } from "lucide-react";

export default function CertificationsSection({ certifications = [] }) {
  return (
    <section
      id="certifications"
      className="scroll-mt-32 mx-auto w-full max-w-7xl px-6 py-12 md:py-16"
    >
      {/* TITLE */}
      <div className="mb-12">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-teal-500">
          Certifications
        </p>

        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-slate-900">
          Certifications and continuous learning
        </h2>

        <p className="mt-5 max-w-3xl text-base md:text-lg text-slate-600">
          Certifications and courses that reflect my commitment to learning modern
          technologies and staying up to date with industry practices.
        </p>
      </div>

      {/* CARDS */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {certifications.map((cert) => (
          <div
            key={cert.title}
            className="group rounded-[30px] border border-white/80 bg-white p-8 md:p-10 shadow-[0_14px_50px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-2 hover:scale-[1.01] hover:border-teal-200 hover:shadow-xl hover:shadow-teal-100/50"
          >
            {/* HEADER */}
            <div className="flex items-start gap-3">
              <span className="text-3xl">{cert.emoji}</span>

              <div>
                <h3 className="text-lg md:text-xl font-semibold text-slate-900 leading-snug">
                  {cert.title}
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  {cert.issuer} · {cert.year}
                </p>
              </div>
            </div>

            {/* LINK */}
            {cert.link && (
              <a
                href={cert.link}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-teal-600 hover:underline"
              >
                View Certificate
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}