import React, { useEffect } from "react";
import "../styles/Result.css";
import { Link } from "react-router-dom";

import ResultTable from "../components/ResultTable";
import { useDispatch, useSelector } from "react-redux";
import {
  attempts_Number,
  earnPoints_Number,
  flagResult,
} from "../helper/helper";

/** import actions  */
import { resetAllAction } from "../redux/quiz_reducer";
import { resetResultAction } from "../redux/user_reducer";
import { usePublishResult } from "../hooks/setResult";

export default function Result() {
  const dispatch = useDispatch();
  const {
    quiz: { questions, answers, id },
    user: { result, userId, userName },
  } = useSelector((state) => state);

  const ques_point = 10;
  const totalPoints = questions.length * ques_point;
  const attempts = attempts_Number(result);
  const earnPoints = earnPoints_Number(result, answers, ques_point);
  const flag = flagResult(totalPoints, earnPoints);

  /** store user result */
  usePublishResult({
    quizId: id,
    result,
    user: userId,
    attempts,
    points: earnPoints,
    achived: flag ? "ناجح" : "راسب",
  });

  function onRestart() {
    dispatch(resetAllAction());
    dispatch(resetResultAction());
  }

  return (
    <div className="container">
      <h1 className="title text-light">نتيجة الأمتحان</h1>

      <div className="result flex-center">
        <div className="flex">
          <span>الأسم :</span>
          <span className="bold">{userName || ""}</span>
        </div>
        <div className="flex">
          <span> درجة الامتحان الكلية : </span>
          <span className="bold">{totalPoints || 0}</span>
        </div>
        <div className="flex">
          <span>عدد الأسئلة المجابة : </span>
          <span className="bold">{questions.length || 0}</span>
        </div>
        {/* <div className="flex">
          <span>Total Attempts : </span>
          <span className="bold">{attempts || 0}</span>
        </div> */}
        <div className="flex">
          <span>الدرجة النهائية للطالب : </span>
          <span className="bold">{earnPoints || 0}</span>
        </div>
        <div className="flex">
          <span>نتيجة الاختبار</span>
          <span
            style={{ color: `${flag ? "#2aff95" : "#ff2a66"}` }}
            className="bold"
          >
            {flag ? "ناجح" : "راسب"}
          </span>
        </div>
      </div>

      <div className="start">
        <Link className="btn" to={"/"} onClick={onRestart}>
          الذهاب الى صفحة البداية
        </Link>
      </div>

      <div className="container">
        {/* result table */}
        <ResultTable></ResultTable>
      </div>
    </div>
  );
}
