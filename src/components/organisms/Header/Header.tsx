"use client";

import styles from "./Header.module.css";
import Logo from "@/components/atoms/Logo/Logo";
import Button from "@/components/atoms/Button/Button";
import RevealOnScroll from "@/components/atoms/RevealOnScroll/RevealOnScroll";
import NavMenu from "@/components/molecules/NavMenu/NavMenu";
import SocialLinks from "@/components/molecules/SocialLinks/SocialLinks";
import { useElementOutOfView } from "@/hooks/useElementOutOfView";
import { HERO } from "@/constant/hero";

export default function Header() {
  // El CTA del Hero reaparece en el header cuando el Hero sale de pantalla.
  const heroOut = useElementOutOfView("home");
  const { primaryCta } = HERO;

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Logo />
        <NavMenu />
        <div className={styles.actions}>
          {/* Desktop: aparecen al scrollear, cuando el preheader ya se fue. */}
          <div className={styles.socialDesktop}>
            <RevealOnScroll>
              <SocialLinks />
            </RevealOnScroll>
          </div>
          {/* Mobile: el preheader no existe, así que se muestran siempre. */}
          <div className={styles.socialMobile}>
            <SocialLinks />
          </div>
          <div
            className={
              heroOut ? `${styles.cta} ${styles.ctaVisible}` : styles.cta
            }
            aria-hidden={!heroOut}
          >
            <Button text={primaryCta.text} href={primaryCta.href} />
          </div>
        </div>
      </div>
    </header>
  );
}
