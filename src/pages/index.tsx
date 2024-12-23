import Hero from "@/components/sections/hero";
import Info from "@/components/sections/info";

export default function Home() {
  const sections = [<Hero key="hero" />, <Info key="info" />];

  return (
    <div className="h-screen w-screen snap-y snap-mandatory snap-always overflow-y-auto overflow-x-hidden">
      {sections.map((comp, i) => (
        <section
          key={i}
          className="relative flex h-screen w-screen snap-start flex-col items-center justify-center rounded-xl border-8 bg-[var(--background)]"
        >
          {comp}
        </section>
      ))}
    </div>
  );
}
