import "./styles/App.css";

import { useEffect } from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { CheckUserExist } from "./helper/helper";

/** import components */
import Main from "./pages/Main";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import QuizzesDashboard from "./pages/QuizzesDashboard";
import AcademicSubject from "./pages/AcademicSubject";
import AcademicYear from "./pages/AcademicYear";

/** react routes */
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
  },
  {
    path: "/dashboard",
    element: (
      <>
        {/* <CheckUserExist>
           <Dashboard />
        </CheckUserExist> */}
      </>
    ),
  },
  {
    path: "/users-dashboard",
    element: (
      <Users />
      // <CheckUserExist>
      //   <Users />
      // </CheckUserExist>
    ),
  },
  {
    path: "/quizzes-dashboard",
    element: (
      <QuizzesDashboard />
      // <CheckUserExist>
      //   <QuizzesDashboard />
      // </CheckUserExist>
    ),
  },
  {
    path: "/academic-subjects",
    element: (
      <AcademicSubject />
      // <CheckUserExist>
      //   <QuizzesDashboard />
      // </CheckUserExist>
    ),
  },
  {
    path: "/academic-years",
    element: (
      <AcademicYear />
      // <CheckUserExist>
      //   <QuizzesDashboard />
      // </CheckUserExist>
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
  // Try to prevent refresh button

  // useEffect(() => {
  //   window.addEventListener("beforeunload", (e) => {
  //     e.preventDefault();
  //     console.log("loaded");
  //     console.log(e);
  //     // e.returnValue = "hello";
  //     return true;
  //   });
  // });
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
