export interface ProcessStepContent {
  id: string;
  label: string;
  description: string;
  /** Trazos `d` del ícono SVG (viewBox 24x24, stroke). */
  iconPaths: readonly string[];
}
