export default function SectionTitle({ eyebrow, title, description }) {
  return (
    <div className="mb-12">
      <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-teal-500 md:text-base">
        {eyebrow}
      </p>

      <h2 className="text-4xl font-semibold leading-tight tracking-tight text-slate-900 md:text-5xl">
        {title}
      </h2>

      {description ? (
        <p className="mt-5 max-w-3xl text-base leading-relaxed text-slate-600 md:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}