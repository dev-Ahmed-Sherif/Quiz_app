import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import parse from "html-react-parser";

/** Custom Hook */
import { useFetchQestion } from "../hooks/FetchQuestion";
import { updateResult } from "../hooks/setResult";

export default function Questions({ onChecked, onPrev, onNext }) {
  const [checked, setChecked] = useState(undefined);
  const [ques, setQues] = useState("");
  // console.log(ques);
  const { trace, answers } = useSelector((state) => {
    // console.log(state);
    return state.quiz;
  });

  // console.log(trace);

  const quiz = useSelector((state) => state.quiz);

  // console.log(quiz.time);
  // console.log(typeof quiz.time);

  const result = useSelector((state) => state.user.result);
  const [{ isLoading, apiData, serverError }] = useFetchQestion();

  // console.log(serverError);

  const question = useSelector(
    (state) => state.quiz.questions[state.quiz.trace]
  );

  // console.log("question lenght");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateResult({ trace, checked }));
  }, [checked]);

  useEffect(() => {
    setQues(question !== undefined ? question?.question : "");
  });

  function onSelect(q) {
    onChecked(q);
    setChecked(q);
    dispatch(updateResult({ trace, checked }));
  }
  const [timer, setTimer] = useState(1);

  // console.log(timer);

  useEffect(() => {
    setTimer(quiz.time * 60);
  }, [quiz.time]);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => clearInterval(interval);
    } else {
      console.log("finished");
    }
  }, [timer]);

  if (isLoading) return <h3 className="text-light">isLoading</h3>;
  if (serverError)
    return <h3 className="text-light">{"لايوجد بيانات لعرضها"}</h3>;

  if (timer === 0) {
    return <Navigate to={"/result"} replace={true}></Navigate>;
  }

  let minutes = Math.floor(timer / 60);
  // console.log(minutes);
  let seconds = timer % 60;
  // console.log(seconds);

  return (
    <div className="questions">
      <h3 className="title text-light">{quiz.year}</h3>
      <h3 className="title text-light">{quiz.subject}</h3>
      <h3 className="title text-light">{quiz?.month}</h3>
      <p>
        الوقت المتبقى : {`${minutes}:${seconds.toString().padStart(2, "0")}`}
      </p>
      {/* ? this for access the value when it not null or undefined */}

      {question !== undefined ? (
        <>
          <h3> {parse(ques)} </h3>
          <ul key={question?._id}>
            {question?.options.map((q, i) => {
              // console.log(i);
              return (
                <li key={i}>
                  <input
                    type="radio"
                    value={false}
                    name="options"
                    id={`q${i}-option`}
                    onChange={() => onSelect(q)}
                  />

                  <label className="text-primary" htmlFor={`q${i}-option`}>
                    {q}
                  </label>
                  <div
                    className={`check ${result[trace] === q ? "checked" : ""}`}
                  ></div>
                </li>
              );
            })}
          </ul>
          <div className="grid">
            {trace > 0 ? (
              <button className="btn prev" onClick={() => onPrev()}>
                السابق
              </button>
            ) : (
              <div></div>
            )}
            <button className="btn next" onClick={() => onNext()}>
              {trace === answers.length - 1 ? "أنهاء الاختبار" : "التالى"}
            </button>
          </div>
        </>
      ) : (
        <div style={{ fontSize: "2em", textAlign: "center", padding: "1em" }}>
          لاتوجد أسئلة
        </div>
      )}
    </div>
  );
}
