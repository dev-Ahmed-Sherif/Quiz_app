import "../styles/App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { CheckUserExist } from "./helper/helper";

/** import components */
import Main from "./pages/Main";
import Quiz from "./Quiz";
import Result from "./Result";
import Dasboard from "./pages/Dasboard";
import Users from "./pages/Users";
import QuizzesDashboard from "./pages/QuizzesDashboard";

/** react routes */
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
  },
  {
    path: "/",
    element: (
      <CheckUserExist>
        <Dasboard></Dasboard>
      </CheckUserExist>
    ),
  },
  {
    path: "/users-dashboard",
    element: (
      <CheckUserExist>
        <Users></Users>
      </CheckUserExist>
    ),
  },
  {
    path: "/quizzes-dashboard",
    element: (
      <CheckUserExist>
        <QuizzesDashboard></QuizzesDashboard>
      </CheckUserExist>
    ),
  },
  {
    path: "/quiz",
    element: (
      <CheckUserExist>
        <Quiz />
      </CheckUserExist>
    ),
  },
  {
    path: "/result",
    element: (
      <CheckUserExist>
        <Result />
      </CheckUserExist>
    ),
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
