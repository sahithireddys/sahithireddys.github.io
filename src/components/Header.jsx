import React from "react";

export default function Header({
  profile,
  navItems,
  activeSection,
  scrollToSection,
  mobileMenuOpen,
  setMobileMenuOpen,
}) {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/60 bg-[#f7f8f6]/80 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
        <button
          onClick={() => scrollToSection("home")}
          className="rounded-[24px] border border-white/70 bg-white/60 px-7 py-5 text-xl font-semibold shadow-sm backdrop-blur transition hover:bg-white"
        >
          <span
            className="text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(90deg, #34d399 0%, #93c5fd 55%, #c4b5fd 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
            }}
          >
            {profile.heroName}
          </span>
        </button>

        <nav className="hidden items-center gap-2 rounded-[24px] border border-white/70 bg-white/60 px-3 py-2 shadow-sm backdrop-blur md:flex">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`rounded-2xl px-5 py-3 text-lg font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-slate-100 text-teal-500 shadow-sm"
                    : "text-slate-500 hover:bg-white hover:text-slate-900"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        <button
          type="button"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white/70 text-slate-600 shadow-sm backdrop-blur md:hidden"
          aria-label="Toggle menu"
        >
          <span className="text-lg">{mobileMenuOpen ? "✕" : "☰"}</span>
        </button>

        <div className="hidden h-12 w-12 md:flex" />
      </div>

      {mobileMenuOpen ? (
        <div className="border-t border-slate-200/60 bg-[#f7f8f6]/95 px-6 py-4 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-2 rounded-2xl border border-white/70 bg-white/70 p-3 shadow-sm">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    scrollToSection(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`rounded-xl px-4 py-3 text-left text-base font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-slate-100 text-teal-500 shadow-sm"
                      : "text-slate-500 hover:bg-white hover:text-slate-900"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
    </header>
  );
}
