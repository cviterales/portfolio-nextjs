import styles from "./page.module.css";
import Header from "@/components/organisms/Header/Header";
import Footer from "@/components/organisms/Footer/Footer";
import Hero from "@/components/organisms/Hero/Hero";
import PreHeader from "@/components/organisms/PreHeader/PreHeader";
import Section from "@/components/organisms/Section/Section";
import ProcessFlow from "@/components/organisms/ProcessFlow/ProcessFlow";
import { PROCESS_STEPS } from "@/constant/process";
import SkillsTriangle from "@/components/organisms/SkillsTriangle/SkillsTriangle";
import { SKILLS } from "@/constant/skills";
import ProjectCarousel from "@/components/organisms/ProjectCarousel/ProjectCarousel";
import { PROJECTS } from "@/constant/projects";
import {
  PROJECTS_SECTION,
  SKILLS_SECTION,
  WORK_PROCESS_SECTION,
} from "@/constant/sections";

export default function Home() {
  return (
    <div className={styles.page}>
      <PreHeader />
      <Header />
      <main className={styles.main}>
        <Hero />
        <Section content={WORK_PROCESS_SECTION}>
          <ProcessFlow steps={PROCESS_STEPS} />
        </Section>
        <Section content={SKILLS_SECTION}>
          <SkillsTriangle skills={SKILLS} />
        </Section>
        <Section content={PROJECTS_SECTION}>
          <ProjectCarousel projects={PROJECTS} />
        </Section>
      </main>
      <Footer />
    </div>
  );
}
