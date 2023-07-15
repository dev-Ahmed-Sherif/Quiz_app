import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postServerData } from "../helper/helper";

/** redux actions */
import * as Action from "../redux/quiz_reducer";

/** fetch question hook to fetch api data and set value to store */
export const useFetchQestion = () => {
  const dispatch = useDispatch();
  const [getData, setGetData] = useState({
    isLoading: false,
    apiData: [],
    serverError: null,
  });
  const { _id } = useParams();

  useEffect(() => {
    setGetData((prev) => ({ ...prev, isLoading: true }));

    /** async function fetch backend data */
    (async () => {
      try {
        // console.log("loged");
        // const [{ questions, answers }] = await getServerData(
        //   `${process.env.REACT_APP_SERVER_HOSTNAME}/api/questions`,
        //   (data) => data
        // );
        // const _id = "64902d2722b30937aa347722";
        const quiz = await postServerData(
          `${process.env.REACT_APP_SERVER_HOSTNAME}/api/quizzes/quiz-details`,
          { id: _id },
          (data) => {
            return data;
          }
        );
        // console.log(quiz);
        // console.log(quiz.data);
        if (quiz.data) {
          // console.log(quiz);
          setGetData((prev) => ({ ...prev, isLoading: false }));
          setGetData((prev) => ({ ...prev, apiData: quiz.data }));

          /** dispatch an action */
          dispatch(Action.startExamAction({ quiz: quiz.data }));
        } else {
          //   console.log("questions empty");
          throw new Error("No Question Avalibale");
        }
      } catch (error) {
        setGetData((prev) => ({ ...prev, isLoading: false }));
        setGetData((prev) => ({ ...prev, serverError: error }));
      }
    })();
  }, [dispatch]);

  return [getData, setGetData];
};

/** MoveAction Dispatch function */
export const MoveNextQuestion = () => async (dispatch) => {
  try {
    dispatch(Action.moveNextAction()); /** increase trace by 1 */
  } catch (error) {
    console.log(error);
  }
};

/** PrevAction Dispatch function */
export const MovePrevQuestion = () => async (dispatch) => {
  try {
    dispatch(Action.movePrevAction()); /** decrease trace by 1 */
  } catch (error) {
    console.log(error);
  }
};
