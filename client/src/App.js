import "./styles/App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { CheckUserExist } from "./helper/helper";

/** import components */
import Main from "./pages/Main";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import StudentDetails from "./pages/StudentDetails";
import QuizzesDashboard from "./pages/QuizzesDashboard";
import AddQuiz from "./pages/Add-quiz";
import AddQuestions from "./pages/add-questions";
import AcademicSubject from "./pages/AcademicSubject";
import AcademicYear from "./pages/AcademicYear";
import QuizzesStudent from "./pages/QuizzesStudent";

/** react routes */
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
  },
  {
    path: "/dashboard",
    element: (
      <CheckUserExist>
        <Dashboard />
      </CheckUserExist>
    ),
  },
  {
    path: "/users-dashboard",
    element: (
      <CheckUserExist>
        <Users />
      </CheckUserExist>
    ),
  },
  {
    path: "/student-details/:_id",
    element: (
      <CheckUserExist>
        <StudentDetails />
      </CheckUserExist>
    ),
  },
  // {
  //   path: "/users-dashboard/user-edit/:_id",
  //   element: (
  //     <CheckUserExist>
  //       <EditStudent />
  //     </CheckUserExist>
  //   ),
  // },

  {
    path: "/quizzes-dashboard",
    element: (
      <CheckUserExist>
        <QuizzesDashboard />
      </CheckUserExist>
    ),
  },
  {
    path: "/add-quiz",
    element: (
      <CheckUserExist>
        <AddQuiz />
      </CheckUserExist>
    ),
  },
  {
    path: "/add-ques/:_id",
    element: (
      <CheckUserExist>
        <AddQuestions />
      </CheckUserExist>
    ),
  },
  {
    path: "/academic-subjects",
    element: (
      <CheckUserExist>
        <AcademicSubject />
      </CheckUserExist>
    ),
  },
  {
    path: "/academic-years",
    element: (
      <CheckUserExist>
        <AcademicYear />
      </CheckUserExist>
    ),
  },
  {
    path: "/quizzes-student",
    element: (
      <CheckUserExist>
        <QuizzesStudent />
      </CheckUserExist>
    ),
  },
  {
    path: "/quiz/:_id",
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
