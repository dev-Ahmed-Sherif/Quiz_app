import React, { useEffect, useState } from "react";
import Questions from "../components/Questions";

import { MoveNextQuestion, MovePrevQuestion } from "../hooks/FetchQuestion";
import { PushAnswer } from "../hooks/setResult";

/** redux store import */
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";

export default function Quiz() {
  const [check, setChecked] = useState(undefined);
  console.log(check);
  const [error, setError] = useState("");

  const result = useSelector((state) => state.user.result);
  console.log(result);
  const { questions, trace } = useSelector((state) => state.quiz);
  console.log(questions);
  const dispatch = useDispatch();

  useEffect(() => {
    function preback() {
      window.history.forward();
    }
    setTimeout(preback(), 0);
    window.onunload = function () {
      return null;
    };
  });

  useEffect(() => {
    setChecked(result[trace]);
  }, [trace]);

  /** next button event handler */
  function onNext() {
    if (trace < questions.length && check !== undefined) {
      /** increase the trace value by one using MoveNextAction */
      dispatch(MoveNextQuestion());

      /** insert a new result in the array.  */
      if (result.length <= trace) {
        /* Access value of selected answer */
        console.log(check);
        dispatch(PushAnswer(check));
      }
      setError("");
    } else {
      setError("يجب الاجابة على السؤال");
    }

    /** reset the value of the checked variable */
    setChecked(undefined);
  }

  /** Prev button event handler */
  function onPrev() {
    if (trace > 0) {
      /** decrease the trace value by one using MovePrevQuestion */
      dispatch(MovePrevQuestion());
      setError("");
    }
  }

  function onChecked(check) {
    setChecked(check);
  }

  /** finished exam after the last question */
  if (
    result.length &&
    result.length >= questions.length &&
    questions.length !== 0
  ) {
    return <Navigate to={"/result"} replace={true}></Navigate>;
  }

  return (
    <div className="container">
      {/* display questions */}
      <Questions
        onChecked={onChecked}
        trace={trace}
        onPrev={onPrev}
        onNext={onNext}
      />
      <p> {error} </p>
    </div>
  );
}
