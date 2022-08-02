import { Fragment } from 'react';
import { Outlet } from "react-router-dom";

import CategoryMenu from "../../components/category-menu/category-menu.component";

const Home = () => {
  return (
    <Fragment>
      <Outlet />
      <CategoryMenu />
    </Fragment>
  );
}

export default Home;
