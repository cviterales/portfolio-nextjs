import styles from "./styles.module.scss";

const Title = ({ text, color }) => {
    return <h1 className={styles.title} style={{color: color}}>{text}</h1>
}

export default Title;