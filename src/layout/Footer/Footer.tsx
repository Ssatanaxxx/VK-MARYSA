import styles from "./Footer.module.css";

export const Footer = () => {
  return (
    <>
      <footer className={styles.footer}>
        <div className="container">
          <div className={styles.footer__content}>
            <ul
              className={`${styles.footer__list} ${styles.socials} list-reset`}
            >
              <li className={styles.footer__item}>
                <a className={styles.footer__link} href="#">
                  <svg width="36" height="36" aria-hidden="true">
                    <use href="/sprites.svg#icon-vk"></use>
                  </svg>
                </a>
              </li>
              <li className={styles.footer__item}>
                <a className={styles.footer__link} href="#">
                  <svg width="36" height="36" aria-hidden="true">
                    <use href="/sprites.svg#icon-youtube"></use>
                  </svg>
                </a>
              </li>
              <li className={styles.footer__item}>
                <a className={styles.footer__link} href="#">
                  <svg width="36" height="36" aria-hidden="true">
                    <use href="/sprites.svg#icon-ok"></use>
                  </svg>
                </a>
              </li>
              <li className={styles.footer__item}>
                <a className={styles.footer__link} href="#">
                  <svg width="36" height="36" aria-hidden="true">
                    <use href="/sprites.svg#icon-telegram"></use>
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
