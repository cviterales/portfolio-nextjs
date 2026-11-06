type DiagramDotsProps = {
  /** id único del pattern (evita colisiones entre diagramas en la página). */
  id: string;
  width: number;
  height: number;
};

/** Fondo de puntos tenue para los diagramas. */
export default function DiagramDots({ id, width, height }: DiagramDotsProps) {
  return (
    <>
      <defs>
        <pattern id={id} width="24" height="24" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="#ffffff" opacity="0.05" />
        </pattern>
      </defs>
      <rect width={width} height={height} fill={`url(#${id})`} />
    </>
  );
}
