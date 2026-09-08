"use client";

import { useEffect, useState } from "react";

const CurrentYear = () => {
  // Valor inicial: año del build (usado en SSR/prerender). Tras el montaje se
  // corrige al año real del visitante para reflejar siempre el año actual.
  const [year, setYear] = useState(() => new Date().getFullYear());

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return <>{year}</>;
};

export default CurrentYear;
