import React, { useEffect, useMemo, useState } from "react";

import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import ExperienceSection from "./components/ExperienceSection";
import SkillsSection from "./components/SkillsSection";
import ProjectsSection from "./components/ProjectsSection";
import PublicationsSection from "./components/PublicationsSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

import { profile } from "./data/profile";
import { skills, categoryColors, getColor } from "./data/skills";
import { experiences } from "./data/experiences";
import { projects } from "./data/projects";
import { education } from "./data/education";
import { publications } from "./data/publications";
import { navItems } from "./data/navItems";

const roles = [
  "Backend Engineer",
  "Platform Builder",
  "Cloud & AI Enthusiast",
  "Application Engineer",
  "Full-Stack Developer",
];

export default function PortfolioOnePage() {
  const [activeSection, setActiveSection] = useState("home");

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState({
    loading: false,
    success: "",
    error: "",
  });

  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const sectionIds = useMemo(() => navItems.map((item) => item.id), []);

  useEffect(() => {
    const handleScroll = () => {
      const headerOffset = 220;
      let currentSection = "home";

      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;

        const top = el.getBoundingClientRect().top;

        if (top <= headerOffset) {
          currentSection = id;
        }
      });

      setActiveSection(currentSection);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionIds]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    const typingSpeed = isDeleting ? 50 : 90;
    const pauseTime = 1200;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        const nextText = currentRole.slice(0, displayText.length + 1);
        setDisplayText(nextText);

        if (nextText === currentRole) {
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        const nextText = currentRole.slice(0, displayText.length - 1);
        setDisplayText(nextText);

        if (nextText === "") {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex]);

  const scrollToSection = (id) => {
    setActiveSection(id);
    const section = document.getElementById(id);
    if (!section) return;
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();

    setFormStatus({
      loading: true,
      success: "",
      error: "",
    });

    try {
      const response = await fetch("https://formspree.io/f/xqeynryv", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Something went wrong. Please try again.");
      }

      setFormStatus({
        loading: false,
        success: "Thanks for reaching out! I’ll get back to you soon.",
        error: "",
      });

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      setFormStatus({
        loading: false,
        success: "",
        error: error.message || "Unable to send message.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f8f6] text-slate-800 selection:bg-teal-100 selection:text-teal-900">
      <div className="pointer-events-none fixed inset-0 opacity-50">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(15,23,42,0.10) 1px, transparent 0)",
            backgroundSize: "26px 26px",
            maskImage:
              "linear-gradient(to bottom, rgba(0,0,0,0.55), rgba(0,0,0,0.12))",
            WebkitMaskImage:
              "linear-gradient(to bottom, rgba(0,0,0,0.55), rgba(0,0,0,0.12))",
          }}
        />
      </div>

      <Header
        profile={profile}
        navItems={navItems}
        activeSection={activeSection}
        scrollToSection={scrollToSection}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <main className="relative z-10">
        <HeroSection profile={profile} displayText={displayText} />

        <AboutSection education={education} getColor={getColor} />

        <ExperienceSection experiences={experiences} />

        <SkillsSection skills={skills} categoryColors={categoryColors} />

        <ProjectsSection projects={projects} getColor={getColor} />

        <PublicationsSection publications={publications} />

        <ContactSection
          profile={profile}
          formData={formData}
          formStatus={formStatus}
          handleInputChange={handleInputChange}
          handleContactSubmit={handleContactSubmit}
        />

        <Footer profile={profile} />
      </main>
    </div>
  );
}
