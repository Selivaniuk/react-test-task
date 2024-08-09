import Loader from "components/Loader/Loader";
import { FC, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { routeConfig } from "./routeConfig";

const AppRouter: FC = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {routeConfig.map((route) => (
          <Route {...route} key={route.path} />
        ))}
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
