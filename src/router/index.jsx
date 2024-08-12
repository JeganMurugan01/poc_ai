import { useLocation, useRoutes } from "react-router-dom";
import App from "../App";
import SideBarHeader from "../components/sideBarAndHeader";
import { QuickTest } from "../pages/QuickTest";
import { useState } from "react";
import { Admin } from "../pages/Admin/admin";

const Router = () => {
  const [newTagName, setNewTagName] = useState("");
  const [tempTagId, setTempTagId] = useState("");
  const [tagImages, setTagImages] = useState([]);
  console.log(tagImages, "tagImages from router");
  const location = useLocation();
  localStorage.setItem("location", location.pathname);
  let element = useRoutes([
    {
      path: "/",
      element: <App tagImages={tagImages} setTagImages={setTagImages} />,
    },
    {
      path: "/quickTest",
      element: (
        <SideBarHeader
          Page={QuickTest}
          setNewTagName={setNewTagName}
          newTagName={newTagName}
          tempTagId={tempTagId}
          setTempTagId={setTempTagId}
        />
      ),
    },
    {
      path: "/admin",
      element: (
        <SideBarHeader
          Page={Admin}
          tempTagId={tempTagId}
          setTempTagId={setTempTagId}
          tagImages={tagImages}
        />
      ),
    },
  ]);

  return element;
};
export default Router;
