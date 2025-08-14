import React from "react";
import "./styles.css";
import { Carousel } from "../../components/Carousel";
import { WorkCard } from "../../components/WorkCard";

type Locale = "en" | "pt";
const TITLES: Record<Locale, string> = {
  en: "My work",
  pt: "Meus trabalhos",
};

interface MyWorkProps {
  locale?: Locale;
}

const works = [
  { title: "Clean Pet",  subtitle: "A petshop landing page",  href: "#", tags:[{label:"Design",variant:"yellow" as const},{label:"Code",variant:"yellow" as const}]},
  { title: "Vibe",       subtitle: "Startup landing page",    href: "#", tags:[{label:"Design",variant:"yellow" as const},{label:"Code",variant:"yellow" as const}]},
  { title: "Cineguess",  subtitle: "A guess based game",      href: "#", tags:[{label:"Design",variant:"yellow" as const},{label:"Code",variant:"yellow" as const}]},
  { title: "NovaPay",    subtitle: "Fintech dashboard UI",    href: "#", tags:[{label:"Design",variant:"yellow" as const}]},
  { title: "Arc Home",   subtitle: "Smart home controller",   href: "#", tags:[{label:"Design",variant:"yellow" as const}]},
  { title: "Wayfinder",  subtitle: "Travel planner app",      href: "#", tags:[{label:"Design",variant:"yellow" as const},{label:"Code",variant:"yellow" as const}]},
  { title: "Flowchart",  subtitle: "SaaS marketing site",     href: "#", tags:[{label:"Design",variant:"yellow" as const}]},
  { title: "Nimbus UI",  subtitle: "Component library demo",  href: "#", tags:[{label:"Design",variant:"yellow" as const},{label:"Code",variant:"yellow" as const}]},
];

const MyWork: React.FC<MyWorkProps> = ({ locale = "en" }) => {
  return (
    <section className="mywork">
      <div className="mywork__wrap">
        <h2 className="mywork__title">{TITLES[locale]}</h2>

        <Carousel showDots className="mywork__carousel">
          {works.map((w) => (
            <WorkCard
              key={w.title}
              title={w.title}
              subtitle={w.subtitle}
              tags={w.tags}
              href={w.href}
            />
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export default MyWork;
