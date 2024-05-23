import "../styles/App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

/** import components */
import Main from "./Main";
import Quiz from "./Quiz";
import Result from "./Result";
import { CheckUserExist } from "../helper/helper";

/** react routes */
import { useRoutes } from "react-router-dom";

function AppRoutes() {
  const routes = [
    {
      path: "/",
      element: <Main />,
    },
  ];

  return useRoutes(routes);
}

function QuizDisplay() {
  return <AppRoutes />;
}
export default QuizDisplay;
