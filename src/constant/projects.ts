import { PROJECT_MEDIA, type ProjectContent } from "@/types/project";

// TODO: completar summary y tags reales de los proyectos de Personal (las
// entradas con media image). Los textos actuales son provisionales.
export const PROJECTS: readonly ProjectContent[] = [
  {
    id: "microfrontend-runtime",
    title: "Runtime component sharing with microfrontends",
    summary:
      "A host app exposes shared components through a module federation bundle. Every consumer loads them at runtime, so a new version ships from a single deploy without touching any consumer repo or pipeline.",
    tags: ["Microfrontends", "Module Federation", "Design System", "Runtime"],
    media: PROJECT_MEDIA.microfrontend,
  },
  {
    id: "personal-home",
    title: "Personal — Home & e-commerce",
    summary:
      "Work on personal.com.ar: the home and store experience, with promotions, product listings and plan selection.",
    tags: ["Next.js", "React", "Sass", "Zustand", "Typescript", "Personalization", "E-commerce", "Microfrontend"],
    media: PROJECT_MEDIA.image,
    image: {
      src: "/images/personal.jpg",
      alt: "Full-page capture of the personal.com.ar home and store",
    },
  },
  {
    id: "library-pipeline",
    title: "Versioned design system shared across teams",
    summary:
      "A UI library lives in its own repo, builds with Rollup and publishes to a private JFrog registry. The host installs it and re-exposes its components at runtime, so every consumer app picks up new versions with no changes or deploys on their side.",
    tags: ["Design System", "Rollup", "JFrog Artifactory", "npm registry", "CI/CD"],
    media: PROJECT_MEDIA.libraryPipeline,
  },
  {
    id: "personal-internet",
    title: "Personal — Internet",
    summary: "Internet plans landing on personal.com.ar.",
    tags: ["Next.js", "React", "Sass", "Zustand", "Typescript", "Personalization", "Microfrontend"],
    media: PROJECT_MEDIA.image,
    image: {
      src: "/images/internet.png",
      alt: "Full-page capture of the personal.com.ar internet section",
    },
  },
  // TODO: revisar el texto del proyecto; lo redacté a partir del diagrama.
  {
    id: "landing-personalization",
    title: "Personalized landing on a static page",
    summary:
      "A headless CMS feeds the landing with content and every Hero variant at build time, and ISR refreshes it when an editor publishes. A third-party script detects the visitor and tells the page which variant to show through a browser event, so the page stays static and fast.",
    tags: ["ISR", "Headless CMS", "Personalization", "Browser events"],
    media: PROJECT_MEDIA.personalization,
  },
  {
    id: "personal-pymes",
    title: "Personal — Pymes",
    summary: "Landing for the small-business (pymes) offering on personal.com.ar.",
    tags: ["Next.js", "Landing"],
    media: PROJECT_MEDIA.image,
    image: {
      src: "/images/pymes.png",
      alt: "Full-page capture of the personal.com.ar pymes section",
    },
  },
  {
    id: "auth-sso",
    title: "One login across landings on different domains",
    summary:
      "Many landings live on separate domains, yet a user who signs in once stays signed in as they move between them. Every landing talks to one OIDC provider through the standard login, SSO, refresh token and logout flows. That logic lives in a JS library built with Rollup and published to JFrog, so each team installs it and calls its methods instead of rebuilding the flow, which saved a lot of rework across teams.",
    tags: ["OIDC", "SSO", "Refresh token", "Rollup", "JFrog Artifactory", "Shared library"],
    media: PROJECT_MEDIA.authSso,
  },
  {
    id: "personal-smarthome",
    title: "Personal — Smart Home",
    summary: "Smart Home products landing on personal.com.ar.",
    tags: ["Next.js", "React", "Sass", "Zustand", "Typescript", "Personalization", "Microfrontend"],
    media: PROJECT_MEDIA.image,
    image: {
      src: "/images/smarfthome.png",
      alt: "Full-page capture of the personal.com.ar smart home section",
    },
  },
  {
    id: "personal-contacto",
    title: "Personal — Contact",
    summary: "Contact experience on personal.com.ar.",
    tags: ["Next.js", "React", "Sass", "Zustand", "Typescript", "Personalization", "Microfrontend"],
    media: PROJECT_MEDIA.image,
    image: {
      src: "/images/contacto.png",
      alt: "Full-page capture of the personal.com.ar contact section",
    },
  },
  {
    id: "personal-flow",
    title: "Flow",
    summary: "Flow streaming experience.",
    tags: ["Next.js", "React", "Sass", "Zustand", "Typescript", "Personalization", "Microfrontend"],
    media: PROJECT_MEDIA.image,
    image: {
      src: "/images/flow.png",
      alt: "Full-page capture of the Flow landing",
    },
  },
];
