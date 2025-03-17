import { useRoutes } from "react-router-dom";
import Task from "src/pages/Task";

export const AppRoutes = () => {
  const element = useRoutes([{ path: "/", element: <Task /> }]);
  return <>{element} </>;
};
