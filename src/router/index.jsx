import { useRoutes } from "react-router-dom";
import App from "../App";
import SideBarHeader from "../components/sideBarAndHeader";
import { QuickTest } from "../pages/QuickTest";

const Router = () => {
  let element = useRoutes([
    {
      path: "/",
      element: <SideBarHeader Page={QuickTest} />,
    },
    {
      path: "/Admin",
      element: <App />,
    },
  ]);

  return element;
};
export default Router;
