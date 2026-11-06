export interface SectionHeadingContent {
  eyebrow: string;
  title: {
    text: string;
    /** Parte del título que se resalta con el degradé. */
    highlight: string;
  };
  description: string;
}

export interface SectionContent {
  id: string;
  heading: SectionHeadingContent;
}
