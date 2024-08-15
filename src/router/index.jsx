import { useRoutes } from "react-router-dom";
import App from "../App";
import SideBarHeader from "../components/sideBarAndHeader";
import { QuickTest } from "../pages/QuickTest";
import EmptySideBarHeader from "../components/emptySideBarAndHeader.jsx";

const Router = () => {
  let element = useRoutes([
    {
      path: "/",
      element: <EmptySideBarHeader />,
    },
    {
      path: "/Admin",
      element: <App />,
    },
    {
      path: "/quickTest",
      element: <SideBarHeader Page={QuickTest} />,
    },
  ]);

  return element;
};
export default Router;
