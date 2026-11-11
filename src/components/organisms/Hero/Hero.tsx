import styles from "./Hero.module.css";
import HeroActions from "@/components/molecules/HeroActions/HeroActions";
import { HERO } from "@/constant/hero";

export default function Hero() {
  return (
    <section id="home" className={styles.hero}>
      <div className={styles.stage}>
        <span className={styles.band} aria-hidden="true" />
        <div className={styles.content}>
          <h1 className={styles.title}>
            {HERO.title}
            <span className={styles.name}>{HERO.name}</span>
          </h1>
          <p className={styles.description}>{HERO.description}</p>
          <HeroActions />
        </div>
      </div>
    </section>
  );
}
