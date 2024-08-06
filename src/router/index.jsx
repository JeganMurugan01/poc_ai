import { useRoutes } from "react-router-dom";
import App from "../App";
import SideBarHeader from "../components/sideBarAndHeader";
import { QuickTest } from "../pages/QuickTest";

const Router = () => {
  let element = useRoutes([
    {
      path: "/",
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
