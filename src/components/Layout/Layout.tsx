import { FC, PropsWithChildren } from "react";
import styles from "./Layout.module.scss";
import Header from "./Header/Header";

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Header />
      <div className={styles.page}>{children}</div>
    </>
  );
};

export default Layout;
