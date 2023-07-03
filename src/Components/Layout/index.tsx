import styles from "./styles.module.scss";
import Header from "../Header";
import Footer from "../Footer";
import { Outlet } from "react-router-dom";
import AsideMenu from "../AsideMenu";

const Layout = () => {
  return (

    <div className={styles.app}>
      <Header />
      <div className={styles.content}>
        <Outlet />
      </div>
      <AsideMenu />
      <Footer />
    </div>

  );
};

export default Layout;
