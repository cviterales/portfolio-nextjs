import type { SectionContent } from "@/types/section";

// TODO: reemplazar las descripciones por los textos definitivos.
export const SKILLS_SECTION: SectionContent = {
  id: "skills",
  heading: {
    eyebrow: "Skills",
    title: { text: "My", highlight: "tech stack" },
    description:
      "Some of the languages, frameworks, and tools I use daily to design, build, and launch reliable software.",
  },
};

export const PROJECTS_SECTION: SectionContent = {
  id: "projects",
  heading: {
    eyebrow: "Projects",
    title: { text: "Selected", highlight: "work" },
    description:
      "A few problems I solved. Some are less about the screen and more about the architecture behind it, so I show them as animated diagrams.",
  },
};

export const WORK_PROCESS_SECTION: SectionContent = {
  id: "about",
  heading: {
    eyebrow: "About me",
    title: { text: "My", highlight: "work process" },
    description:
      "A look at how I approach each project, from the first conversation to a solution running in production.",
  },
};
