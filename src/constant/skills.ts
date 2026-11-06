import type { SkillContent } from "@/types/skill";

function skill(id: string, name: string, file: string): SkillContent {
  return { id, name, logo: `/logos/${file}.svg` };
}

/**
 * El orden importa: `toInvertedTriangle` reparte la lista por filas
 * decrecientes. Con 42 logos quedan filas de 12, 10, 8, 6, 4 y 2.
 */
export const SKILLS: readonly SkillContent[] = [
  skill("javascript", "JavaScript", "javascript"),
  skill("typescript", "TypeScript", "typescript"),
  skill("react", "React", "react"),
  skill("nextjs", "Next.js", "nextjs"),
  skill("vitejs", "Vite", "vitejs"),
  skill("remix", "Remix", "remix"),
  skill("angular", "Angular", "angular"),
  skill("reactnative", "React Native", "reactnative"),
  skill("sass", "Sass", "sass"),
  skill("css3", "CSS3", "css3"),
  skill("tailwind", "Tailwind CSS", "tailwind"),
  skill("html5", "HTML5", "html5"),
  skill("redux", "Redux", "redux"),
  skill("zustand", "Zustand", "zustand"),
  skill("nestjs", "NestJS", "nestjs"),
  skill("nodejs", "Node.js", "nodejs"),
  skill("express", "Express", "express"),
  skill("jest", "Jest", "jest"),
  skill("playwright", "Playwright", "playwrite"),
  skill("cypress", "Cypress", "cypress"),
  skill("redis", "Redis", "redis"),
  skill("socketio", "Socket.IO", "socketio"),
  skill("kafka", "Kafka", "kafka"),
  skill("mysql", "MySQL", "mysql"),
  skill("postgres", "PostgreSQL", "postgresSQL"),
  skill("firebase", "Firebase", "firebase"),
  skill("mongodb", "MongoDB", "mongodb"),
  skill("stencil", "Stencil", "stencil"),
  skill("rollupjs", "Rollup", "rollupjs"),
  skill("threejs", "Three.js", "threejs"),
  skill("php", "PHP", "php"),
  skill("yarn", "Yarn", "yarn"),
  skill("npm", "npm", "npm"),
  skill("github", "GitHub", "github"),
  skill("gitlab", "GitLab", "gitlab"),
  skill("git", "Git", "git"),
  skill("jira", "Jira", "jira"),
  skill("aws", "AWS", "aws"),
  skill("argo", "Argo CD", "argo"),
  skill("opentelemetry", "OpenTelemetry", "opentelemetry"),
  skill("docker", "Docker", "docker"),
  skill("figma", "Figma", "figma"),
];
