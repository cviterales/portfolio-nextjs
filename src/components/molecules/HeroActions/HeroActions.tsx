import styles from "./HeroActions.module.css";
import Button from "@/components/atoms/Button/Button";
import TextLink from "@/components/atoms/TextLink/TextLink";
import { HERO } from "@/constant/hero";

export default function HeroActions() {
  const { primaryCta, secondaryCta } = HERO;

  return (
    <div className={styles.actions}>
      <Button text={primaryCta.text} href={primaryCta.href} />
      {secondaryCta  && <TextLink text={secondaryCta.text} href={secondaryCta.href} />}
    </div>
  );
}
