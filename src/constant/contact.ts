import { ICON_NAME, type IconName } from "@/types/icon";

interface SocialLink {
  icon: IconName;
  href: string;
  label: string;
}

// TODO: reemplazar por las URLs reales de los perfiles.
export const SOCIAL_LINKS: readonly SocialLink[] = [
  {
    icon: ICON_NAME.linkedin,
    href: "https://www.linkedin.com/in/cristian-viterales/",
    label: "LinkedIn",
  },
  {
    icon: ICON_NAME.github,
    href: "https://github.com/cviterales",
    label: "GitHub",
  },
  {
    icon: ICON_NAME.ia,
    href: "/llms.txt",
    label: "IA",
  },
];

export const CONTACT_EMAIL = "cviterales@gmail.com";
export const CONTACT_LOCATION = "Mar del Plata, Buenos Aires, Argentina";
