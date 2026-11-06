interface HeroLink {
  text: string;
  href: string;
}

interface HeroContent {
  title: string;
  name: string;
  description: string;
  primaryCta: HeroLink;
  secondaryCta?: HeroLink;
  image: {
    src: string;
    alt: string;
  };
}

export const HERO: HeroContent = {
  title: "Sr Software Engineer",
  // TODO: confirmar el apellido.
  name: "Cristian Viterales",
  description:
    "Since 2009, collaborating on challenging solutions that make people’s daily lives happier.",
  primaryCta: { text: "Let's talk", href: "mailto:cviterales@gmail.com" },
  image: {
    src: "/images/1b2.jpg",
    alt: "Portrait of Cristian Viterales",
  },
};
