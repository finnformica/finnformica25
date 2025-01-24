import Projects from "@/components/sections/projects";
import Hero from "@/components/sections/hero";
import Info from "@/components/sections/info";
import Tech from "@/components/sections/tech";
import Milestones from "@/components/sections/milestones";
import Footer from "@/components/sections/footer";

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
    <div className="h-screen w-screen snap-y snap-mandatory snap-always overflow-y-auto overflow-x-hidden">
      {sections.map((comp, i) => (
        <section
          key={i}
          className="relative flex h-screen w-screen snap-start flex-col rounded-xl border-4 bg-[var(--background)] sm:border-8 sm:border-[var(--foreground)]"
          id={comp.key ?? ""}
        >
          {comp}
        </section>
      ))}
    </div>
  );
}
