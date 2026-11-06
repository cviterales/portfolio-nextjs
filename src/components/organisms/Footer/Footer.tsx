import styles from "./Footer.module.css";
import Copyright from "@/components/molecules/Copyright/Copyright";
import { FOOTER_HANDLE } from "@/constant/footer";
import { getCurrentYear } from "@/utils/year";

export default async function Footer() {
  const year = await getCurrentYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <Copyright year={year} handle={FOOTER_HANDLE} />
      </div>
    </footer>
  );
}
