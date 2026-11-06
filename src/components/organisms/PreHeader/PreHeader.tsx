import styles from "./PreHeader.module.css";
import SocialLinks from "@/components/molecules/SocialLinks/SocialLinks";
import ContactItem from "@/components/molecules/ContactItem/ContactItem";
import Icon from "@/components/atoms/Icon/Icon";
import { CONTACT_EMAIL, CONTACT_LOCATION } from "@/constant/contact";
import { ICON_NAME } from "@/types/icon";

export default function PreHeader() {
  return (
    <div className={styles.preHeader}>
      <div className={styles.inner}>
        <SocialLinks />
        <div className={styles.contact}>
          <ContactItem
            icon={ICON_NAME.mail}
            text={CONTACT_EMAIL}
            href={`mailto:${CONTACT_EMAIL}`}
          />
          <ContactItem
            icon={ICON_NAME.pin}
            text={CONTACT_LOCATION}
            trailing={<Icon name={ICON_NAME.flagAr} size={14} />}
          />
        </div>
      </div>
    </div>
  );
}
