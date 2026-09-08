import styles from "./styles.module.scss";

const Technology = ({ tech }) => {
  return (
    <div className={`${styles.technology} hoverScale`}>
      <img
        src={`/logos/${tech}.svg`}
        alt={tech}
        width={40}
        height={40}
        loading="lazy"
        decoding="async"
      />
    </div>
  );
};

export default Technology;
