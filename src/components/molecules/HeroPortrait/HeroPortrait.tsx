import Image from "next/image";
import styles from "./HeroPortrait.module.css";
import { HERO } from "@/constant/hero";

export default function HeroPortrait() {
  const { image } = HERO;

  return (
    <div className={styles.portrait}>
      <Image
        className={styles.image}
        src={image.src}
        alt={image.alt}
        fill
        priority
        sizes="(max-width: 768px) 100vw, 520px"
      />
    </div>
  );
}
