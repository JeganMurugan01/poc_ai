import { useRoutes } from "react-router-dom";
import App from "../App";

const Router = () => {
  let element = useRoutes([
    {
      path: "/",
      element: <App />,
    },
  ]);

  return element;
};
export default Router;
