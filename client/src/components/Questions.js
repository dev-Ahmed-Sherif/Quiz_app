import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import parse from "html-react-parser";

/** Custom Hook */
import { useFetchQestion } from "../hooks/FetchQuestion";
import { updateResult } from "../hooks/setResult";

export default function Questions({ onChecked, onPrev, onNext }) {
  const [checked, setChecked] = useState(undefined);
  const [ques, setQues] = useState("");
  console.log(ques);
  const { trace } = useSelector((state) => {
    console.log(state);
    return state.quiz;
  });

  console.log(trace);

  const quiz = useSelector((state) => state.quiz);

  console.log(quiz);

  const result = useSelector((state) => state.user.result);
  const [{ isLoading, apiData, serverError }] = useFetchQestion();

  console.log(serverError);

  const question = useSelector(
    (state) => state.quiz.questions[state.quiz.trace]
  );

  console.log(question);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateResult({ trace, checked }));
  }, [checked]);

  useEffect(() => {
    setQues(question?.question);
  });

  function onSelect(q) {
    onChecked(q);
    setChecked(q);
    dispatch(updateResult({ trace, checked }));
  }

  if (isLoading) return <h3 className="text-light">isLoading</h3>;
  if (serverError)
    return <h3 className="text-light">{"لايوجد بيانات لعرضها"}</h3>;

  return (
    <div className="questions">
      <h3 className="title text-light">{quiz.year}</h3>
      <h3 className="title text-light">{quiz.subject}</h3>
      <h3 className="title text-light">{quiz?.month}</h3>
      {/* ? this for access the value when it not null or undefined */}

      <h3> {parse(ques)} </h3>
      <h3> {question?.question} </h3>
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
          <button className="btn prev" onClick={onPrev}>
            Prev
          </button>
        ) : (
          <div></div>
        )}
        <button className="btn next" onClick={onNext}>
          Next
        </button>
      </div>
    </div>
  );
}
