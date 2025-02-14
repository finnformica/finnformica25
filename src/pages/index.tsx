"use client";

import Footer from "@/components/sections/footer";
import Hero from "@/components/sections/hero";
import Info from "@/components/sections/info";
import Milestones from "@/components/sections/milestones";
import Preloader from "@/components/sections/preloader";
import Projects from "@/components/sections/projects";
import Tech from "@/components/sections/tech";

export default function Home() {
  const sections = [
    <Hero key="hero" />,
    <Info key="info" />,
    <Projects key="projects" />,
    <Tech key="tech" />,
    <Milestones key="milestones" />,
    <Footer key="footer" />,
  ];

  return (
    <>
      <Preloader />

      <div className="h-screen w-screen snap-y snap-mandatory snap-always overflow-y-auto overflow-x-hidden">
        {sections.map((comp, i) => (
          <section
            key={i}
            className="relative flex h-screen w-screen snap-start flex-col rounded-xl border-4 border-[var(--foreground)] bg-[var(--background)] sm:border-8"
            id={comp.key ?? i.toString()}
          >
            {comp}
          </section>
        ))}
      </div>
    </>
  );
}
