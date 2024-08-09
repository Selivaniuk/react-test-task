import { Link, useLocation } from "react-router-dom";
import styles from "./Header.module.scss";
import { routes } from "components/AppRouter/routeConfig";

const Header = () => {
  const location = useLocation();
  return (
    <header className={styles.header}>
      <ul className={styles.links}>
        {Object.values(routes).map(
          ({ name, path, showHeader }) =>
            showHeader && (
              <Link
                key={path}
                to={path}
                className={
                  path === location.pathname
                    ? [styles.link, styles.activeLink].join(" ")
                    : styles.link
                }
              >
                {name}
              </Link>
            )
        )}
      </ul>
    </header>
  );
};

export default Header;
