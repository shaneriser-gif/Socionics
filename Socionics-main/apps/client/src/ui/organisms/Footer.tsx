import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.root}>
      <span className={styles.label}>НАПИСАТЬ АВТОРУ</span>
      <div className={styles.links}>
        <a
          href="https://vk.com/shaneri"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          VK
        </a>
        <a
          href="https://t.me/SergeyShaneri"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          TG
        </a>
        <a
          href="https://new.shaneri.ru/socionic-typing#/start"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          О живом типировании
        </a>
      </div>
    </footer>
  );
}
